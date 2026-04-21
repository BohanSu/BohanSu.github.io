# PEARL 项目总览

**PEARL = Peircean Extraction via Abstraction and Repair Learning**

**论文题目（已锁定）**：*PEARL: Decoupling Generation from Verification for Small-Model Scientific Reasoning Graph Extraction*

**目标投稿**：EMNLP Findings（备选 Main / Industry）

**当前日期**：2026-04-22

---

## 零、这是一份什么文档

本文档把 `arche_student_framework_release/docs/` 下 15+ 份设计、路线、评测、运维文档汇总成一份可以**从头读到尾**的项目总览。读完之后你应该能回答：

1. 这个项目到底在做什么？
2. 为什么它值得做？
3. 它用什么方法做？
4. 当前做到哪一步？
5. 对外交付什么？

读者不需要再去翻原始 docs 才能理解全貌。如需细节，文末的 §十一 给出源文档索引。

---

## 一、一句话项目定义

> **PEARL 训练一个 4B 参数的 Qwen 小模型，从 Nature Communications 论文的 Introduction 中抽取结构化的 Peircean 推理图（Reasoning Logic Tree, RLT），并把这件事重构成一个 schema-first、validator-centered、可训练可修复的 framework。**

不是"再做一个 ARCHE benchmark 的复现"，而是要**补上 ARCHE 之后缺失的统一训练框架**——让科学推理图抽取从"模仿 teacher DOT 表层形式"升级为"迁移 graph 的结构规则"。

---

## 二、项目背景：ARCHE 任务与它留下的 Gap

### 2.1 ARCHE 任务最小定义（来自 arXiv:2511.12485）

- **输入**：一篇 Nature Communications 论文的 Introduction（约 2,000–5,000 words）+ sentence-level viewpoints + 每句引用的 reference opinions
- **输出**：Graphviz DOT 格式的推理树
  - **节点**：`(source_triple, text)` 二元组；`source` 是 `(X, Y, Z)` 四类之一：sentence / viewpoint / reference opinion / implicit
  - **边**：Peirce 定义的 **6 种推理类型**
    - `deduction-rule` / `deduction-case`
    - `induction-common` / `induction-case`
    - `abduction-phenomenon` / `abduction-knowledge`
  - **结构约束**：
    - 单 root
    - 无孤立点
    - 严格配对（deduction 必须 rule+case 成对，induction 必须 common+case，abduction 必须 phenomenon+knowledge）
    - 无自环

### 2.2 ARCHE 解决了什么，没解决什么

ARCHE 给了**任务定义 + 数据 + 评测协议**，但**没有给训练框架**。与此同时：

- **IR / scaffold structured generation** 工作（IRCoder / NL2FLOW / REFINER / Abstraction-of-Thought）表明，复杂结构输出不应被直接当成原始序列学。
- **Validator-guided refinement** 工作（RefineBench / CGI / DVR / SAGA）表明，generation 与 verification、diagnosis 与 repair 最好解耦。

这三条前人工作线共同指向一个空缺：**如何把 benchmark-defined 的科学推理图抽取，重构成一个 schema-first 的训练框架问题？** 这就是 PEARL 想补的位置。

### 2.3 为什么这件事在 AI-for-Science 中有意义

一旦这件事做成，它不只是方法论论文，还对齐 4 类真实下游应用（这些是 secondary motivation，不是论文前门）：

| 应用 | 为什么需要结构化推理图 |
|---|---|
| 文献综述自动化 | 10K 篇论文找 research gap，必须对齐推理链条 |
| 科研想法生成 | 新 idea 的每条 premise 需能追溯到已有 support |
| 同行评审 / 假设验证辅助 | 检查 abduction 合不合理、induction case 是否充分 |
| Citation grounding | 每条推理边绑定具体 sentence / reference，才能做可审计 AI-for-Science |

---

## 三、核心 scientific hook：Structural Transfer，而不是 Deployment

论文的前门**不是**"frontier API 贵 → 蒸馏小模型省钱"，也**不是**"小模型做不到所以要努力"。真正的 hook 是：

> **当 scientific reasoning graph 被 distill 到 4B decoder-only 时，模型学到的是结构规则，还是只学到 teacher DOT 的表层 token 形式？**

### 3.1 Canonical Failure Mode：Phase 0 DOT-first 的现象

直接把 teacher `final_clean_graph.dot` 作 SFT target，student 被迫**同时**学三件事：

```
Content layer   : 从 17K tokens 筛出正确节点内容
Structure layer : 单 root / pairing / 无孤立点
Syntax layer    : Graphviz DOT 大括号、属性、边语法
```

Phase 0 的实测结果非常清晰：

```
adapter loss → 1.43（收敛）
parseable_ratio > 0.5       ← DOT 语法会一点
structure_ok_ratio ≈ 0      ← 结构约束完全没学到
```

这不是"模型不会输出 graph"，而是更具体的失败模式：

> **模型会模仿 teacher DOT 的表层形式，却不会稳定转移其底层结构规则。**

### 3.2 为什么这不是普通的 structured output bug

真正坏掉的不是语法，而是：

- root 不唯一
- deduction / induction / abduction pairing 缺边
- isolated node
- self-loop

也就是说，模型**不会验证自己生成的 graph 是否满足结构语义**——**generation 与 verification 在模型内部没有解耦**。

### 3.3 Literature 预言这个失败是必然的

这个 failure mode 不是拍脑袋想出来的，它被两条独立 literature 预言：

1. **Small Model Learnability Gap** (Li et al., ACL 2025 Findings, arXiv:2502.12143)——3B 级小模型从 long-CoT strong teacher 学习反而变差，content + structure + syntax 三目标同时压给 4B decoder-only 必然 partial-mastery。
2. **Algebraic Invariants for Structured Reasoning** (ICLR 2026 Workshop)——"LLMs conflate hypothesis generation with verification, allow weak reasoning steps to propagate unchecked."

所以 PEARL 的 motivation 顺序是：

1. **Primary**：Benchmark-to-Framework Gap under Hard Structural Constraints
2. **Scientific question**：Surface Mimicry vs Structural Transfer
3. **Task manifestation**：Structured Output Inconsistency（但更深一层，是语义约束不是纯语法）
4. **Supporting context**：specialized 科学任务 / specialist small 可超 generalist / multi-teacher consolidation
5. **Secondary**：Cost / Deployment / Privacy

---

## 四、解法：Schema-Guided Framework

### 4.1 核心洞察

> **让学习负担匹配模型容量。**

把 "content + structure + syntax" 分给三种不同工具：

```
模型学 : content + structure（从长文本抽取 + 结构语义）
代码管 : validator 检查结构 + compiler 生成语法
```

### 4.2 Framework 四件套

| 模块 | 角色 | 职责 |
|---|---|---|
| **`graph_spec` IR** | Schema-defined JSON 中间表示 | 让模型学**结构内容**，不学 DOT 字符串 |
| **Validator** | Deterministic 结构检查器 | 产出 structured issue list，代码层面保证结构 |
| **Compiler** | Deterministic DOT 生成器 | 代码层面保证语法 100% 合法 |
| **Issue-list Self-Repair** | 学 `(bad_graph, issue_list) → good_graph` | 把 validator 的诊断外包给代码，student 只学修复 |

### 4.3 数据层配套

- **Smart Prompt**：每个 reference 只保留 top-3 opinions（teacher 实际只用 0.81%）。中位 tokens 从 17,700 降到 9,700；24K 零截断。
- **Quality-weighted Multi-Teacher SFT**：5 个 teacher × 70 paper = 350 个 DOT，按 `w = 0.5·EC + 0.5·REA` 加权参与训练，有效样本 223/38/45。

### 4.4 七层架构

```
┌───────────────────────────────────────────────────────────────┐
│  Layer 7 │ EVALUATION    │ EC / REA / joint_score / 对比 teacher │
├──────────┼───────────────┼────────────────────────────────────┤
│  Layer 6 │ (opt) RL      │ graph reward / GRPO (Phase 6, future)│
├──────────┼───────────────┼────────────────────────────────────┤
│  Layer 5 │ REPAIR        │ issue-list-driven self-repair        │
├──────────┼───────────────┼────────────────────────────────────┤
│  Layer 4 │ INFERENCE     │ first-pass + validator gate          │
├──────────┼───────────────┼────────────────────────────────────┤
│  Layer 3 │ TRAINING      │ SFT / LoRA / quality-weighted        │
├──────────┼───────────────┼────────────────────────────────────┤
│  Layer 2 │ REPRESENTATION│ graph_spec schema + validator + compiler │
├──────────┼───────────────┼────────────────────────────────────┤
│  Layer 1 │ DATA          │ 5 teachers × 70 papers + smart prompt│
└───────────────────────────────────────────────────────────────┘
```

每层都有 extension hook，这是 framework 长期可迭代性的基础。

### 4.5 整体数据流

```text
paper intro + views + refs
          |
          v
     smart prompt
          |
          v
   5 teacher DOT outputs
          |
          v
 dot_to_graph_spec.py
          |
          v
 graph_spec + issue stats
          |
     +----+----+
     |         |
     v         v
validator   compiler
     |         |
     v         v
graph_spec train set        strict-valid DOT target
     |
     +------------------------------+
     |                              |
     v                              v
Phase 3: first-pass SFT      Phase 4: repair SFT
     |                              |
     +--------------+---------------+
                    |
                    v
         student graph_spec inference
                    |
                    v
        validator issue list / repair
                    |
                    v
            compiler -> final DOT
                    |
                    v
        evaluator -> valid / EC / REA / joint
```

---

## 五、关键设计决策的理由

### 5.1 为什么 Schema-First + Intermediate Representation

- Phase 0 实测：4B 在三目标同时学时必然 partial-mastery（Small-Model Gap 在结构化场景的具体化）
- 支撑论证来自跨领域 converging evidence：
  - **IRCoder** (ACL 2024)：IR 作 code-LM 训练目标，显著提升 1.1B–7.3B 小模型 robustness
  - **NL2FLOW** (NeurIPS 2025)：参数化 IR 让 LLM 生成 86% valid plan
  - **REFINER** (EACL 2024)：IR 作为 reasoning feedback 载体
  - **Abstraction-of-Thought** (2025)：硬件设计 LLM 用 IR 解耦高层 reasoning 和低层 RTL
- 约束解码（XGrammar / GCD）只能解 syntax，解不了 structure；而 pairing / root / 孤立点是**语义约束**。

### 5.2 为什么 Validator-Guided Repair 而不是 LLM Critic

- **RefineBench** (NeurIPS 2025-W)：diagnosis 才是真正瓶颈；外部提供 structured feedback 时 GPT-4.1 从 23.4% → 95.5%。
- **CGI** (ICLR 2025)：critic-actor 解耦，8B critic 反超 GPT-4 as critic +29.16%。PEARL 把 critic 进一步退化到**代码 validator**（零推理成本、deterministic、零 self-bias）。
- **SAGA** (NeurIPS 2025)："weak verifiers undermine RLVR training"——直接支撑"用代码而非 LLM critic"的决策。
- **PEARL 独有发现**：decoder-only + `no_repeat_ngram_size` 的交互陷阱。原版 ARCHE 把坏 DOT 全文塞进 repair prompt；对 4B decoder-only 会触发坏 DOT n-gram 被禁止集合纳入，导致 self-repair 生成 7 tokens 就早停。PEARL 的 fix：
  - Repair prompt 只含 issue list + 原训练 prompt 尾部，不含坏 DOT
  - Self-repair 阶段独立解码参数（`temperature=0, no_repeat_ngram_size=0`）

### 5.3 为什么 Multi-Teacher + Quality Weighting

- Teacher REA 分布：GPT-5.2 46.7% / Gemini 39.9% / Qwen3.5-397B 31.9% / Grok 27.7% / Claude Sonnet 4.5 21.9%
- 即便 GPT-5.2 全局最强，不同 teacher 在不同 paper 上 complementary。
- **"Small Models Struggle to Learn from Strong Reasoners"** (ACL 2025 Findings)：Mix-Long + Mix-Large 组合显著优于单 strong teacher——直接支撑用全部 5 个 teacher 的决策。
- **FAIR** (ACL 2025 Findings) 用 peer-review confidence 加权；我们用**下游任务指标**（`0.5·EC + 0.5·REA`）加权，对可结构化评测任务更紧。

### 5.4 为什么先框架后 RL

RL 上线前必须同时满足：

- ✅ graph_spec v1 schema 稳定
- ✅ validator / compiler coverage 100%
- ✅ SFT student valid_ratio > 60%
- ✅ 至少一个 teacher 的 REA > 40%

当前条件未全部达成。EMNLP 主体不含 Phase 6 RL，作为 future work 保留。

---

## 六、Phase 0–6 Roadmap 与当前进度

状态更新日：**2026-04-20**

| Phase | 内容 | 状态 | 产物 |
|---|---|---|---|
| Phase 0 | DOT-first SFT baseline | ✅ 完成 | `baseline_outputs/smart_24k/adapter`（loss 1.43, structure_ok≈0） |
| Phase 1 | graph_spec 四件套（converter / validator / compiler / repair） | ✅ 代码就绪，Gate B 本地已通过 | 四件套 + `graph_spec_runtime.py` |
| Phase 2 | graph_spec 训练数据重构 | 🟡 脚本完成，待批量生成 | `build_graph_spec_dataset.py` |
| Phase 3 | graph_spec first-pass SFT | 🟡 代码就绪，adapter 未跑 | `run_train.py --target-format graph_spec_json` |
| Phase 4 | Issue-list repair SFT | 🟡 代码就绪，repair adapter 未跑 | `build_repair_dataset.py` + `run_train.py --mode repair` |
| Phase 5 | graph_spec-first 推理 + joint 评测 | 🟡 代码就绪，主实验未跑 | `run_inference.py` / `run_eval_student.py` |
| Phase 6 | (conditional) RL | ⬜ future work | — |

### 6.1 Phase 1 最新状态

- **Gate B 本地已通过**：`conversion_success_rate=1.0000`、`validator_pass_rate=0.9714`、`roundtrip_parseable_rate=1.0000`
- Converter 能解析 `Source: (x,y,z)` 和 `(x,y)` 形式
- 空 label helper edge 不再被误当 reasoning edge
- `abduction-hypothesis` / `deduction-common` 等 legacy alias 会在转换阶段归一化
- validator 升级为双模式：`strict`（student 生成终态）/ `teacher_compatible`（legacy teacher DOT 的 Gate B / fairness / dataset build）

### 6.2 当前最大瓶颈：不是训练，是表示层和推理层

- 训练端：DOT-first 已经可收敛，**不是主问题**
- 表示层：已从 DOT-first 升级到 graph_spec-first 的代码已经就绪，主线 adapter 尚未跑完
- 推理层：validator + issue-list repair + compiler 的端到端主线已就绪，主实验未跑

### 6.3 Phase 3 启动前的三个 Pilot Gate

为避免把 Phase 3+ adapter 训练建在未被验证的假设上，启动前必须跑完三个 pilot，每个 < 30 分钟 CPU 可跑：

| Gate | 被测假设 | 脚本 |
|---|---|---|
| **Gate A · Teacher fairness** | student 赢是不是只因为有 compiler、teacher 没有（apples-to-oranges 风险） | `teacher_fairness_check.py` |
| **Gate B · Converter batch** | converter>95% / validator>95% / compiler 100% 是否真的达标 | `phase1_validate_converter.py` |
| **Gate C · Zero-shot baseline** | SFT 真的在 EC/REA 上显著贡献（否则 reviewer 会问"为什么不直接用 base Qwen + XGrammar？"） | `run_zero_shot_baseline.py` + `run_eval_student.py` |

任一 Gate 崩 → 暂停 Phase 3 训练，调整 framework narrative。

### 6.4 下一步优先级

1. 跑通 Phase 2：`build_graph_spec_dataset.py` 产出 `graph_spec_data/`
2. Phase 3 训练：graph_spec-first SFT adapter
3. Phase 4 训练：repair dataset + `run_train.py --mode repair`
4. Phase 5 推理 + joint_score 评测 → **验证核心承诺 A（majority-teacher superiority）**
5. Ablation D（schema vs DOT）+ E（self-repair variant）是两个核心 contribution 的直接证据，必须优先做扎实

---

## 七、评测协议

### 7.1 五级指标

```
Level 1 · parseable_ratio     = pydot 可解析比例
Level 2 · structure_ok_ratio  = 通过 validator 结构检查比例
Level 3 · dot_valid_ratio     = Level 1 ∧ Level 2
Level 4 · EC (Entity Coverage) = 核心实体被节点覆盖比例（O3 抽取 + 子串匹配）
Level 5 · REA (Reasoning Edge Accuracy) = 推理步骤逻辑正确率（3 judge 投票）
```

### 7.2 主报告指标

```
joint_score = valid_ratio × (EC + REA) / 2
```

乘法 gate 反映下游真实价值——无效 graph 对下游零价值。Student 的 `valid_ratio = 1.0`（compiler 保证），teacher 原始 DOT 约 85–95% valid，joint 让框架优势**可量化**体现。

### 7.3 Cross-Evaluator Robustness

- 3 judge（O3 / Claude Sonnet 4 thinking / Gemini 2.5 Pro）独立打分
- Pairwise agreement 目标 > 0.75
- Krippendorff's α 目标 > 0.7
- REA-strict：3 judge 全部一致才算 correct（appendix 报告）

### 7.4 Judge 版本锁定（sticky 决策，2026-04-19）

沿用 ARCHE benchmark 原 judge 集合，**不**升级到 Claude 4.5 / Gemini 3.1 Pro。理由：

1. **Protocol fidelity**：PEARL 贡献是 distillation framework，不是评测协议的重新定义；换 judge 会让 teacher 数字与 ARCHE 原报告不可比。
2. **Internal consistency**：student 与 5 teacher 用同一组 judge 评分，相对排序 apples-to-apples。
3. **Reviewer 防御**：若被问"judge 为何不升级"，答"我们继承 ARCHE 评测协议"。

Snapshot pinning 已实现（`pin_judge_snapshots.py` + `eval_env.json`），确保 reproducibility。

### 7.5 Error Taxonomy（5 级分类）

```
Level A: Protocol failure   (A1 empty/nondot, A2 graph_spec parse fail)
Level B: Syntax failure     (B1 unbalanced braces, B2 attr, B3 edge syntax)
Level C: Structure failure  (C1 multi/zero root, C2 isolated, C3 self_loop,
                             C4 pairing violation, C5 multi-rule,
                             C6 non-standard edge, C7 mixed families)
Level D: Content failure    (D1 hallucinated entity, D2 misattributed source,
                             D3 logical inconsistency)
Level E: Efficiency failure (E1 maxed_out, E2 repair timeout, E3 worker stalled)
```

---

## 八、实验规划（EMNLP 主体）

### 8.1 实验总览

| 类别 | 数量 | 预期 compute |
|---|---|---|
| 主实验（student vs 5 teachers） | 1 | 4×A100 × 2h |
| Ablation | 6 组 × 2–4 settings ≈ 16 runs | 4×A100 × 20h |
| Baseline | 3 组（GraphMERT / KG-MASD / zero/few-shot） | 视 baseline |
| Cross-evaluator | 1 run | LLM API |
| Case study | 3–5 篇 | 手工 |

**总 compute**：约 200–300 GPU-hour + $2,000 API
**日历时间**：约 10 周

### 8.2 6 组 Ablation 对应三贡献

| 贡献 | 对应 ablation |
|---|---|
| C1. Multi-teacher + quality-weighted SFT | A (prompt mode), B (teacher subset), C (quality weight) |
| C2. Schema-first IR | **D (target format)** —— 核心证据 |
| C3. Issue-list self-repair | **E (self-repair variant)**, F (curriculum) |

### 8.3 主实验预期（待跑）

| Teacher | valid | EC | REA | joint |
|---|---|---|---|---|
| GPT-5.2 | ~0.95 | 0.919 | 0.467 | **0.66** |
| Qwen3.5-397B | ~0.95 | 0.831 | 0.319 | 0.55 |
| Gemini 3.1 Pro | ~0.85 | 0.634 | 0.399 | 0.44 |
| Grok 4.1 | ~0.85 | 0.735 | 0.277 | 0.43 |
| Claude Sonnet 4.5 | ~0.85 | 0.668 | 0.219 | 0.38 |
| **Student (target)** | **1.00** | **0.75** | **0.35** | **≈0.55** |

Student 的目标是 **joint_score 超过 5 个 teacher 中至少 4 个**（majority-teacher superiority）——仅低于 GPT-5.2。

---

## 九、承诺与不承诺

### 9.1 我们承诺什么

**承诺 A · Joint Metric Majority Superiority**
Student 在 `joint_score` 上超过 5 teacher 中至少 4 个。

**承诺 B · Framework-as-Artifact**（对外产出）：

1. `graph_spec` schema v1 规范（`GRAPH_SPEC_SCHEMA_V1.md`）
2. 四件套代码：`dot_to_graph_spec.py` / `graph_spec_validator.py` / `graph_spec_to_dot.py` / `graph_spec_repair.py`
3. Smart Prompt 构建管线：`build_dataset.py`
4. 训练 / 推理 / 评测脚本
5. LoRA adapter 权重（HuggingFace 发布）
6. 训练数据集（223/38/45 split）
7. 复现文档 + smoke test 命令
8. **Framework 扩展指南**：如何把 schema+validator+compiler+repair 套路迁移到别的结构化科学抽取任务（causal graph / argument graph / citation graph / experimental protocol graph）

### 9.2 我们不承诺什么

- **不承诺 absolute superiority**：GPT-5.2 作 "upper bound" 诚实保留；仅 joint metric 上声明 majority superiority
- **不承诺 Phase 6 RL 在 scope 内**：RL 是 conditional future work
- **不承诺任意 paper 的 perfect extraction**：hard papers 上 teacher 也失败；只声明 aggregate 指标 + per-paper win rate in some subset

---

## 十、哲学立场：Narrow-Task Specialization

### 10.1 范式之争

| 路线 | 代表 | 哲学 |
|---|---|---|
| **Generalist** | GPT-5.2 / Claude 4.5 / Gemini 3.1 | 一个模型通吃，靠规模换能力 |
| **Narrow Specialist** | GraphMERT (80M) / SciLitLLM (7B) / **PEARL (4B)** | 单任务精调，靠 task specialization 换成本 + 可解释 + 可定制 |

PEARL 的立场**不是**反对 generalist（frontier 模型当 teacher 有用），而是论证：

> **窄任务专化可以在特定能力轴上超越通才**——不是靠更大的模型，而是靠更深入挖掘任务的结构。

### 10.2 Trade-offs

| 维度 | Generalist | Narrow Specialist |
|---|---|---|
| 任务覆盖度 | 宽 | 窄 |
| 单任务质量 | 中–高 | **高**（若做得好） |
| 成本 | 高 | 低 |
| 可解释性 | 黑盒 | **可审计**（validator + compiler 是代码） |
| 可定制 | ❌ API | ✅ Fine-tune |
| 可复现 | ❌ 版本漂移 | ✅ 权重冻结 |

**结论**：对"科学推理图抽取"这种可结构化评测的任务，narrow specialization 是优势。

### 10.3 与相关工作的精确边界

- **vs ARCHE benchmark**：ARCHE 给任务 + 评测；PEARL 给 student distillation 方法 + framework。互补不冲突。
- **vs GraphMERT**：GraphMERT 是 80M encoder-only 输出平坦 `(head, relation, tail)` triple；PEARL 是 4B decoder-only 输出**带配对约束的推理 DAG**。
- **vs KG-MASD**：KG-MASD 需要 multi-agent LLM runtime；PEARL 用预生成 350 DOT，成本固定、可复现。
- **vs SO-LM / SLOT / PARSE**：他们处理 JSON 业务对象；PEARL 处理带 **Peircean pairing 语义约束**的推理图。
- **vs Self-Refine / DeCRIM / RefineBench**：用 LLM 做 critic；PEARL 用**代码 validator** 做 critic——零成本、deterministic、无 self-bias。与 RefineBench "diagnosis > repair" 一致，把 diagnosis 外包给代码。
- **vs 约束解码 (XGrammar / GCD)**：约束解码是 inference-time 技术，只解 syntax；PEARL 在 SFT 时学结构 + validator 检结构 + compiler 保语法，完全互补（约束解码留作 future work）。

---

## 十一、附录：源文档索引

本文档的所有内容都追溯到 `arche_student_framework_release/docs/` 下的原始文档：

| 主题 | 原始文档 |
|---|---|
| 顶层项目叙事（Single Source of Truth） | `00_VISION.md` |
| 快速上手（一页看懂版） | `FRAMEWORK_QUICKSTART.md` |
| 论文故事线（EMNLP） | `PAPER_STORY_EMNLP.md` |
| 完整设计文档（~1200 行） | `MASTER_DESIGN.md` |
| 7 层架构 + 每层 API | `TECHNICAL_FRAMEWORK.md` |
| 设计理由 + Phase 0-6 路线 | `FRAMEWORK_RATIONALE_AND_ROADMAP.md` |
| `graph_spec` schema v1 规范 | `GRAPH_SPEC_SCHEMA_V1.md` |
| 实验执行蓝图 | `EXPERIMENTS_PLAN.md` |
| 评测协议（5 级指标 + error taxonomy） | `EVALUATION_PROTOCOL.md` |
| 30 篇相关工作 | `RELATED_WORK_SURVEY.md` |
| 当前进展与下一步 | `CURRENT_PROGRESS.md` |
| 推理 4 层验收 | `INFERENCE_VALIDATION_PLAN.md` |
| 模型 / adapter 清单 | `MODEL_AND_ARTIFACTS_NOTE.md` |
| 云端部署命令 | `DEPLOY.md` |
| 完整操作指南 | `OPERATION_GUIDE.md` |
| 与原版 ARCHE 对齐 | `ORIGINAL_ARCHETYPE_ALIGNMENT.md` |
| Round 1+2+3 代码审查 | `CODE_REVIEW_REPORT.md` |
| 早期诊断（归档） | `ARCHIVE_修改规划_legacy.md` |
| 顶层入口 | `PROJECT_MASTER_PLAN.md` / `README.md` |

---

## 十二、一段话总结（给没时间读完的人）

> **PEARL 是 ARCHE benchmark-to-framework gap 的首个 schema-first 回应**。核心困境是小模型更容易模仿 graph 的表层形式，而不容易稳定转移其结构规则；解法是把学习负担解耦——`graph_spec` IR 把 **structure learning** 与 **DOT syntax generation** 分离，code validator 的 issue list 把 **diagnosis** 与 **repair** 分离，multi-teacher SFT + smart prompt + quality weighting 让这套方案真正可训练、可复现、可扩展。交付物是 paper + 四件套代码 + adapter + schema + 数据 + 扩展指南，目标是让别人能用这一套 template 解决自己领域的结构化科学抽取任务。当前 Phase 0-2 代码已就绪，Phase 3-5 主实验待跑，Phase 6 RL 作为 conditional future work。EMNLP Findings 仍是首选投稿目标。
