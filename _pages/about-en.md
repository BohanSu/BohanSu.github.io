---
permalink: /en/
title: ""
excerpt: ""
layout: default
author_profile: true
author: en
---

<div class="home-shell home-shell--en">
  <section class="home-hero" id="about-me">
    <div class="home-hero__content">
      <p class="section-kicker">Wuhan University · Software Engineering</p>
      <h1>Keeping problem definition, evidence, and system realization on the same research path.</h1>
      <p class="home-lead">
        I currently focus on computer vision, LLM reasoning, and multi-agent systems, with particular interest in robust representation under challenging settings, deployable structured reasoning pipelines, and stable collaboration workflows under uncertain user intent.
      </p>
      <div class="hero-actions">
        <a class="home-button home-button--primary" href="/files/苏渤涵简历.pdf">Resume</a>
        <a class="home-button" href="https://github.com/BohanSu">GitHub</a>
        <a class="home-button" href="mailto:2023302143001@whu.edu.cn">Email</a>
        <a class="home-button" href="/">中文主页</a>
      </div>
    </div>

    <aside class="home-hero__side">
      <div class="hero-note">
        <p class="section-kicker">Current Focus</p>
        <ul class="compact-list">
          <li><strong>Vision:</strong> robust representations, 3D geometric priors, and cross-setting generalization</li>
          <li><strong>LLM reasoning:</strong> structured extraction, supervision design, and deployment-oriented pipelines</li>
          <li><strong>Multi-agent systems:</strong> routing, validation, and workflow observability under uncertain tasks</li>
        </ul>
      </div>

      <div class="metric-grid">
        <div class="metric-card">
          <strong>9</strong>
          <span>ReID benchmarks</span>
        </div>
        <div class="metric-card">
          <strong>150+</strong>
          <span>real interaction samples</span>
        </div>
        <div class="metric-card">
          <strong>Top 6</strong>
          <span>national first prize</span>
        </div>
        <div class="metric-card">
          <strong>3.74</strong>
          <span>GPA / 4.0</span>
        </div>
      </div>
    </aside>
  </section>

  <section class="home-intro-grid">
    <article class="guide-card">
      <p class="section-kicker">First Visit</p>
      <h2>If you only spend 30 seconds here</h2>
      <ol class="ordered-compact">
        <li>Start with “Research Themes” to see the problems I care about most.</li>
        <li>Move to “Research & Ongoing Work” to check whether those interests already turn into concrete research.</li>
        <li>Finish with “Selected Projects” to see how I push research questions into systems and prototypes.</li>
      </ol>
    </article>

    <article class="guide-card guide-card--accent">
      <p class="section-kicker">At A Glance</p>
      <div class="signal-list">
        <div class="signal-item">
          <h3>Research Fit</h3>
          <p>If you care about CV, LLM reasoning, or multi-agent systems, this homepage is organized around problems and evidence rather than keyword lists.</p>
        </div>
        <div class="signal-item">
          <h3>Execution</h3>
          <p>I try to carry research forward into training pipelines, evaluation design, system implementation, and deployable prototypes instead of stopping at demos.</p>
        </div>
        <div class="signal-item">
          <h3>Materials</h3>
          <p>I can share additional materials when needed, including scripts, result tables, slides, and technical writing samples.</p>
        </div>
      </div>
    </article>
  </section>

  <section class="home-section" id="focus">
    <div class="section-heading">
      <p class="section-kicker">Research Themes</p>
      <h2>Research Themes</h2>
      <p>I want research questions to be clear enough to explain and rigorous enough to validate through experiments, systems, and evidence.</p>
    </div>

    <div class="card-grid card-grid--three">
      <article class="topic-card">
        <div class="tag-row">
          <span class="tag">Vision</span>
          <span class="tag tag--muted">3D priors</span>
        </div>
        <h3>Vision Understanding and 3D Modeling</h3>
        <p>I focus on when visual representations remain reliable under difficult settings and how 3D geometric priors help or fail in cross-setting generalization.</p>
        <ul class="compact-list">
          <li>Universal ReID</li>
          <li>SMPL-based human modeling</li>
          <li>robust visual representation</li>
        </ul>
      </article>

      <article class="topic-card">
        <div class="tag-row">
          <span class="tag">LLM Reasoning</span>
          <span class="tag tag--muted">Deployability</span>
        </div>
        <h3>LLM Reasoning and Structured Extraction</h3>
        <p>I care about supervision quality, structural consistency, and evaluation design so that extraction pipelines are not only functional but reusable and deployable.</p>
        <ul class="compact-list">
          <li>scientific graph extraction</li>
          <li>high-quality supervision</li>
          <li>small-model deployment</li>
        </ul>
      </article>

      <article class="topic-card">
        <div class="tag-row">
          <span class="tag">Multi-Agent</span>
          <span class="tag tag--muted">Observability</span>
        </div>
        <h3>Multi-Agent Collaboration and Workflow Design</h3>
        <p>I focus on keeping routing stable, outputs verifiable, and the execution chain observable when tasks are under-specified or uncertain.</p>
        <ul class="compact-list">
          <li>routing</li>
          <li>validation</li>
          <li>observability</li>
        </ul>
      </article>
    </div>
  </section>

  <section class="home-section" id="research">
    <div class="section-heading">
      <p class="section-kicker">Selected Research</p>
      <h2>Research & Ongoing Work</h2>
      <p>The homepage only surfaces the work that best reflects my current research direction, with emphasis on problem, method, and evidence.</p>
    </div>

    <div class="entry-stack">
      <article class="entry-card entry-card--featured">
        <div class="entry-header">
          <p class="entry-period">2025.10 - 2026.03</p>
          <span class="entry-badge">ECCV 2026 Submission</span>
        </div>
        <h3>Reliability-Aware 3D Geometric Injection for Universal Person Re-identification</h3>
        <div class="point-grid">
          <div>
            <span>Problem</span>
            <p>3D geometric priors in Universal ReID often become unstable under occlusion, clothing change, and cross-modal settings, sometimes causing negative transfer.</p>
          </div>
          <div>
            <span>Method</span>
            <p>I build global shape and joint-topology representations from SMPL and use a Reliability-Aware Gate for adaptive 2D-3D fusion.</p>
          </div>
          <div>
            <span>Evidence</span>
            <p>The current pipeline covers unified training, comparison, and ablation analysis across 9 ReID benchmarks to test when geometry helps and when it fails.</p>
          </div>
        </div>
        <div class="evidence-list">
          <span>SMPL geometry</span>
          <span>adaptive fusion</span>
          <span>9 benchmarks</span>
        </div>
      </article>

      <article class="entry-card">
        <div class="entry-header">
          <p class="entry-period">2026.03 - present</p>
          <span class="entry-badge">Planned EMNLP Submission</span>
        </div>
        <h3>GraphLite: High-Quality Supervision Enables Deployable Small Models for Graph Extraction</h3>
        <div class="point-grid">
          <div>
            <span>Problem</span>
            <p>Scientific graph extraction based on direct large-model prompting is costly and unstable, while smaller models often lack strong structure-level supervision.</p>
          </div>
          <div>
            <span>Method</span>
            <p>I derive ARCHE-based supervision to construct a compact graph extraction framework centered on structural consistency, evidence alignment, and deployment efficiency.</p>
          </div>
          <div>
            <span>Progress</span>
            <p>Supervision construction, evaluation workflow validation, and a 0.8B-scale training pipeline are already in place, with current work focused on quality and generalization.</p>
          </div>
        </div>
        <div class="evidence-list">
          <span>high-quality supervision</span>
          <span>0.8B pipeline</span>
          <span>deployable extraction</span>
        </div>
      </article>

      <article class="entry-card">
        <div class="entry-header">
          <p class="entry-period">2026.03 - present</p>
          <span class="entry-badge">TPAMI Survey Preparation</span>
        </div>
        <h3>Survey and Metric Design for Appearance-Variant Person Re-identification</h3>
        <div class="point-grid">
          <div>
            <span>Focus</span>
            <p>The work revisits task definition, method taxonomy, and evaluation limits for ReID under clothing, illumination, and pose variation.</p>
          </div>
          <div>
            <span>What I am doing</span>
            <p>I organize representative methods, build a problem-oriented taxonomy, and explore metrics that better reflect real-world complexity.</p>
          </div>
          <div>
            <span>Status</span>
            <p>The framework, method collection, and taxonomy design are in place, and I am continuing the metric-oriented analysis and comparisons.</p>
          </div>
        </div>
        <div class="evidence-list">
          <span>task taxonomy</span>
          <span>metric design</span>
          <span>appearance variation</span>
        </div>
      </article>
    </div>
  </section>

  <section class="home-section" id="projects">
    <div class="section-heading">
      <p class="section-kicker">Selected Projects</p>
      <h2>Selected Projects</h2>
      <p>These projects show how I extend research questions into system prototypes, interaction design, and engineering validation.</p>
    </div>

    <div class="card-grid card-grid--three">
      <article class="project-card">
        <div class="entry-header">
          <p class="entry-period">2025.05 - 2025.08</p>
          <span class="entry-badge">China Unicom Challenge</span>
        </div>
        <h3>A4R Guided Mobile AI Assistant</h3>
        <p>I designed an A4R interaction scheme for clarification, task refinement, and closed-loop execution under ambiguous mobile-agent requests.</p>
        <div class="evidence-list">
          <span>150+ samples</span>
          <span>6 domains</span>
          <span>16 apps</span>
          <span>64.68 completion</span>
        </div>
      </article>

      <article class="project-card">
        <div class="entry-header">
          <p class="entry-period">2025.11.08 - 2025.11.10</p>
          <span class="entry-badge">Holos + A2A</span>
        </div>
        <h3>A2A Multi-Agent System Development</h3>
        <p>I built a multi-agent workflow around routing, validation, and observability to make collaboration more stable under uncertain tasks.</p>
        <div class="evidence-list">
          <span>task routing</span>
          <span>validation</span>
          <span>workflow observability</span>
        </div>
      </article>

      <article class="project-card">
        <div class="entry-header">
          <p class="entry-period">2023.11 - 2025.08</p>
          <span class="entry-badge">National First Prize</span>
        </div>
        <h3>Modular Robot Communication and Control System</h3>
        <p>I worked on software architecture, protocol logic, and embedded integration for a modular robotic platform with improved communication efficiency and stability.</p>
        <div class="evidence-list">
          <span>98.5% success rate</span>
          <span>~40% efficiency gain</span>
          <span>Top 6 nationwide</span>
        </div>
      </article>
    </div>
  </section>

  <section class="home-section" id="background">
    <div class="section-heading">
      <p class="section-kicker">Background</p>
      <h2>Education and Credentials</h2>
      <p>This part keeps only the background information that matters most for a first-pass evaluation.</p>
    </div>

    <div class="card-grid card-grid--two">
      <article class="info-card" id="education">
        <p class="section-kicker">Education</p>
        <h3>Wuhan University · B.Eng. in Software Engineering</h3>
        <p>2023.09 - 2027.06 (expected)</p>
        <ul class="compact-list">
          <li>GPA: <strong>3.74 / 4.0</strong></li>
          <li>Selected coursework: Computer Vision, Frontier AI Technologies, Computer Networks, Operating Systems, Software Engineering, Software Quality Assurance and Testing, Database Systems, Object-Oriented Programming</li>
        </ul>
      </article>

      <article class="info-card" id="honors">
        <p class="section-kicker">Honors</p>
        <h3>Selected Distinctions</h3>
        <ul class="compact-list">
          <li>National First Prize (Top 6), Huawei Cup IoT Design Competition</li>
          <li>National Second Prize, China Youth Science and Technology Challenge-based Innovation Competition</li>
          <li>National Third Prize, Xiaomi Cup Intelligent Systems Innovation Design Competition</li>
          <li>Honorable Mention, Mathematical Contest in Modeling</li>
          <li>Zheng Ge Ru First Prize Scholarship</li>
        </ul>
      </article>
    </div>
  </section>

  <section class="home-section home-section--compact">
    <div class="card-grid card-grid--two">
      <article class="info-card" id="artifacts">
        <p class="section-kicker">Artifacts</p>
        <h3>Research Materials</h3>
        <p>If you want to evaluate fit more quickly, these are the most useful entry points.</p>
        <ul class="compact-list">
          <li><a href="/files/苏渤涵简历.pdf">Resume PDF</a></li>
          <li><a href="https://github.com/BohanSu">GitHub</a></li>
          <li>Additional materials available on request: scripts, result tables, slides, and technical writing samples</li>
        </ul>
      </article>

      <article class="info-card" id="fit">
        <p class="section-kicker">What I Am Looking For</p>
        <h3>Research Opportunities</h3>
        <ul class="compact-list">
          <li>Problem-driven work centered on Computer Vision, LLM Reasoning, or Multi-Agent Systems</li>
          <li>Environments that value research questions, evidence, and system realization together</li>
          <li>Projects that can be iterated, validated, and deepened over time rather than one-off demos</li>
        </ul>
      </article>
    </div>
  </section>

  <section class="home-section home-section--compact">
    <div class="card-grid card-grid--two">
      <article class="info-card" id="skills">
        <p class="section-kicker">Skills</p>
        <h3>Technical Skills</h3>
        <ul class="compact-list">
          <li><strong>Programming and tools:</strong> Python, C / C++, Java, Git, MATLAB</li>
          <li><strong>Vision and 3D:</strong> Person ReID, SMPL-based human modeling, 3D Gaussian Splatting</li>
          <li><strong>LLM and agents:</strong> orchestration, routing, validation, and observability</li>
          <li><strong>Embedded systems:</strong> RISC-V / ESP32 development, modular hardware protocols, and integration</li>
        </ul>
      </article>

      <article class="info-card" id="service">
        <p class="section-kicker">Service</p>
        <h3>Academic Service and Student Leadership</h3>
        <ul class="compact-list">
          <li>Deputy Director, News and Publicity Department, WHU Student Party Branch Secretaries' Association (2024.09 - 2025.09), contributing to communication and content coordination for 100+ published pieces</li>
          <li>Project Group Member, Second Classroom Center of WHU Youth League Committee (2023.10 - 2024.09), participating in platform quality monitoring, issue reporting, and experience improvement</li>
        </ul>
      </article>
    </div>
  </section>

  <section class="home-contact" id="contact">
    <div class="home-contact__content">
      <p class="section-kicker">Contact</p>
      <h2>If you want to continue the conversation</h2>
      <p>I am happy to discuss research collaboration, RA opportunities, project work, or any materials that would help you evaluate technical fit.</p>
    </div>

    <div class="hero-actions">
      <a class="home-button home-button--primary" href="mailto:2023302143001@whu.edu.cn">Email Me</a>
      <a class="home-button" href="https://github.com/BohanSu">View GitHub</a>
      <a class="home-button" href="/files/苏渤涵简历.pdf">Resume PDF</a>
    </div>
  </section>
</div>
