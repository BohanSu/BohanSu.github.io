---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

<span class='anchor' id='about-me'></span>

# 👋 简介

我目前是 **武汉大学软件工程专业本科生**，研究兴趣集中在 **计算机视觉、大模型推理与多智能体系统**。相比于把它们作为彼此独立的关键词，我更关心三类问题：
1. 复杂场景下视觉表征如何保持稳定与可泛化；
2. 大模型推理如何在有限成本下实现更结构化、更可部署的抽取与生成；
3. 多智能体系统如何在不确定需求下维持稳定协作与可解释的执行链路。

一句话概括：我希望把 **问题定义、证据验证和系统实现** 放在同一条研究链路里，而不是只停留在想法或 demo 层面。

如果你是第一次访问这个主页，建议优先查看：
- **科研与在研工作**：了解我当前真正持续投入的问题；
- **精选项目**：了解我如何把研究问题落到系统与原型；
- **研究材料**：查看简历、GitHub 与可提供的补充材料。

---

<span class='anchor' id='education'></span>

# 🎓 教育背景
- *2023.09 - 2027.06 (预计毕业)*，武汉大学，软件工程，本科
- GPA: **3.74 / 4.0**

---

<span class='anchor' id='focus'></span>

# 🧭 研究主题

## 当前重点
- **视觉方向**：复杂设定下的稳健表征、3D 几何先验与跨设定泛化
- **大模型方向**：结构化抽取、小模型可部署推理与高质量监督构建
- **多智能体方向**：任务路由、结果校验、可观测性与协作链路设计

## 1. 视觉理解与三维建模
- Universal ReID
- SMPL-based human modeling
- 复杂场景下的稳健视觉表示与跨设定泛化

## 2. 大模型推理与结构化抽取
- scientific graph extraction
- 高质量监督构建
- 小模型可部署性与评测流程设计

## 3. 多智能体系统与协作链路
- task routing
- validation
- observability
- uncertain-intent handling

---

<span class='anchor' id='research'></span>

# 🔬 科研与在研工作

## Reliability-Aware 3D Geometric Injection for Universal Person Re-identification
- *2025.10 - 2026.03*，ECCV 2026 Submission
- **问题：** Universal ReID 在遮挡、换装、跨模态等复杂设定下，3D 几何先验往往不稳定且可能引入负迁移。
- **方法：** 基于 SMPL 构建全局形状与关节拓扑表示，引入 Reliability-Aware Gate 完成 2D–3D 自适应融合。
- **证据：** 在 9 个 ReID benchmark 上完成统一训练、对比实验与消融分析。

## GraphLite: High-Quality Supervision Enables Deployable Small Models for Graph Extraction
- *2026.03 - 至今*，预计投稿 SDM
- **问题：** scientific graph extraction 依赖大模型直接抽取时成本高、稳定性弱，而小模型缺乏高质量结构监督。
- **方法：** 基于 ARCHE 衍生监督信号构建小模型图谱抽取框架，强调图结构一致性、证据对齐与可部署性。
- **当前进展：** 已完成结构化监督构建、评测流程验证与 0.8B 级训练流程打通。

## 外观变化条件下行人重识别综述与评测指标研究
- *2026.03 - 至今*，TPAMI 综述准备
- **关注点：** ReID 在服装变化、光照变化、姿态变化等 appearance variation 场景下的任务定义、方法分类与评测体系。
- **当前进展：** 已完成主体框架、代表性方法整理与问题分类设计，正在推进新评价指标构建。

---

<span class='anchor' id='projects'></span>

# 🚀 精选项目

## A4R 引导式手机 AI 助手
- *2025.05 - 2025.08*，中国青年科技创新揭榜挂帅擂台赛中国联通专项赛
- **问题：** 手机智能体在模糊需求场景下通常只能被动响应，缺乏主动澄清机制。
- **方法：** 设计 A4R（Ask for Refine）引导式交互方案，支持需求澄清、任务细化与闭环执行。
- **证据：** 构建 150+ 真实交互样本，覆盖 6 大领域 16 款应用，并与强基线进行比较。

## A2A 协议多智能体系统开发
- *2025.11.08 - 2025.11.10*，上海创智学院金秋营实训
- **问题：** 多智能体在不确定需求场景下的任务拆解、结果校验与协作链路稳定性。
- **方法：** 基于 Holos 平台与 A2A 协议实现多智能体系统，围绕 routing、validation 与 observability 构建工作流。

## 模块化机器人通信与控制系统开发
- *2023.11 - 2025.08*
- **问题：** 模块化机器人平台中的通信逻辑、协议稳定性与嵌入式协同。
- **方法：** 参与软件架构、协议逻辑与嵌入式系统联调。
- **结果：** 项目获全国大学生物联网设计大赛 **全国一等奖（Top 6）**。

---

<span class='anchor' id='artifacts'></span>

# 📎 研究材料
- 简历 PDF：<a href="/files/苏渤涵简历.pdf">苏渤涵简历.pdf</a>
- GitHub: <a href="https://github.com/BohanSu">https://github.com/BohanSu</a>
- 如有需要，可进一步提供补充材料（实验脚本、结果表、展示材料、技术写作样例等）。

如果你希望更快判断我是否适合某个研究机会，建议优先看：
- 当前在研工作是否与你关心的问题一致；
- 精选项目中我如何把问题落到系统与原型；
- 是否需要我进一步补充实验、材料或说明文档。

---

<span class='anchor' id='fit'></span>

# 🤝 我在寻找什么样的研究机会
- 以 **Computer Vision / LLM Reasoning / Multi-Agent Systems** 为核心的问题导向研究；
- 更偏重 **research questions + evidence + systems realization** 的训练环境；
- 希望参与能持续推进、而非一次性 demo 式的研究工作。

---

<span class='anchor' id='skills'></span>

# 🛠 技能
- **编程语言与工具**：Python、C / C++、Java、Git、MATLAB
- **计算机视觉与三维建模**：Person ReID、SMPL 人体参数建模、3D Gaussian Splatting
- **大模型与多智能体系统**：多智能体系统设计、任务编排与路由、结果校验与可观测性调试
- **嵌入式系统开发**：RISC-V / ESP32 平台开发、模块化硬件协议设计、驱动开发与系统联调

---

<span class='anchor' id='honors'></span>

# 🏅 荣誉奖项
- 全国大学生物联网设计大赛（华为杯）**全国一等奖（Top 6）**
- 中国青年科技创新揭榜挂帅擂台赛 **全国二等奖**
- 全国大学生计算机系统能力大赛-智能系统创新设计赛（小米杯）**全国三等奖**
- 美国大学生数学建模大赛 **Honorable Mention (H 奖)**
- 郑格如一等奖学金（年级答辩排名第一且唯一）

---

<span class='anchor' id='contact'></span>

# 📫 联系方式
- Email: <a href="mailto:2023302143001@whu.edu.cn">2023302143001@whu.edu.cn</a>
- GitHub: <a href="https://github.com/BohanSu">https://github.com/BohanSu</a>
