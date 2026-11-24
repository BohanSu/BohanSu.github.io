<p align="center">
  <picture><img src="assets/visuals/research-banner.svg?v=e540a534" width="1440" height="280" alt=""></picture>
</p>

<h1 align="center">Bohan Su · Academic Homepage</h1>

<p align="center">
  A bilingual academic portfolio for <strong>苏渤涵 / Bohan Su</strong><br>
  Software Engineering undergraduate · Wuhan University · Class of 2027<br>
  Incoming M.S. student · Institute of Automation, Chinese Academy of Sciences (CASIA) · Fall 2027
</p>

<p align="center">
  <picture><img src="assets/visuals/topic-world.svg?v=3958a69c" alt="Research interest: World models" width="144" height="32"></picture>
  <picture><img src="assets/visuals/topic-multimodal.svg?v=80e96f4d" alt="Research interest: Multimodal foundation models" width="228" height="32"></picture>
</p>

<p align="center">
  <a href="https://bohansu.github.io/en/"><img src="assets/icons/link-home.svg?v=bfaf170b" alt="Open homepage" width="128" height="38"></a>
  <a href="https://github.com/BohanSu"><img src="assets/icons/link-github.svg?v=f0f4b74f" alt="GitHub profile" width="128" height="38"></a>
  <a href="https://scholar.google.com/citations?user=QXCpAoIAAAAJ&amp;hl=zh-CN"><img src="assets/icons/link-scholar.svg?v=e4191c52" alt="Google Scholar" width="128" height="38"></a>
</p>

<p align="center">
  <a href="https://bohansu.github.io/">中文主页</a> ·
  <a href="mailto:2023302143001@whu.edu.cn">Email</a>
</p>

## <picture><img src="assets/icons/code.svg?v=02d42070" width="24" height="24" alt=""></picture> Design and implementation

A white, near-black, and blue-violet design pairs a compact profile rail with a research-focused content column, matching the GitHub profile. The portrait sits in a gradient frame; a “next step” card in the rail announces the CASIA master's program. On mobile, identity details become a compact horizontal block. Both languages share one content template and stylesheet. The reading order is introduction with a short news panel, education, publications and research, projects, honors, and contact. Education is a timeline: the incoming CASIA program (gradient border and “Incoming” badge), the Wuhan University degree, and additional coursework in a smaller, dashed block; each degree names its advisor. Research cards place the framework figure beside the text on wide containers, with venue, status (such as the UniGeo journal extension) and authorship badges. Projects form a card grid with one icon per project, honors are grouped cards with national-level awards emphasized, and the page closes with a dark contact card.

- **Static HTML first:** Jekyll and GitHub Pages; all content, anchors, language switching, and CV links work without JavaScript.
- **Modern native CSS:** cascade layers, container queries, fluid typography, logical properties, balanced headings, and neutral light/dark colors. Media-query fallbacks preserve the core layout without container-query support.
- **Progressive enhancement:** a small deferred script highlights the current section. Native cross-document view transitions enhance language switching where supported.
- **Accessible reading:** visible keyboard focus, a skip link, semantic landmarks, reduced-motion support, forced-colors adjustments, and print styles.
- **Small asset footprint:** system fonts, an explicitly sized portrait, an inline SVG icon sprite (`<use>` references, no icon font), and no jQuery or external font service on the homepage.
- **Discoverability:** localized descriptions, canonical URLs, reciprocal `hreflang` links, and `Person` structured data.

Technical references: [container queries](https://web.dev/articles/baseline-in-action-container-queries), [view transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API), and [reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion).

## Local development

Use Ruby 3.2+ with Bundler:

```sh
bundle install
bundle exec jekyll serve --host 127.0.0.1
```

Open `http://127.0.0.1:4000/` (Chinese) or `/en/` (English).

```sh
bundle exec jekyll build --strict_front_matter
python3 scripts/check_site.py _site
```

The build follows the `github-pages` dependency set in `Gemfile`. The existing `.bundle/config` contains local Bundler preferences; adapt those locally if its mirror or install path is unsuitable. Dependencies and generated site files do not belong in commits.

## Content map

| File | Purpose |
| --- | --- |
| `_pages/about.html`, `_pages/about-en.html` | Routes, language selection, and localized search descriptions |
| `_data/homepage.json` | Bilingual profile, news, education and advisors, research status, authors, and project content |
| `_includes/homepage.html` | Shared content template |
| `_includes/icons.html`, `_includes/icon.html` | Inline SVG icon sprite and the include that references a symbol by name |
| `_layouts/page-full.html` | Shared shell, navigation, metadata, and footer |
| `assets/css/homepage.css` | Homepage design, responsive behavior, and accessibility |
| `assets/js/homepage-animations.js` | Optional active-section indicator |
| `assets/icons/` | Self-contained SVG navigation badges and README section icons |
| `assets/visuals/` | Original SVG research banner and interest labels for the GitHub README |
| `_config.yml` | Site identity and Jekyll settings |
| `files/` | Public English and Chinese CVs |
| `images/research/` | Original framework figures from the public arXiv papers |

Update both languages together in `_data/homepage.json`, and keep descriptions in the page front matter and `_config.yml` aligned. World models and multimodal foundation models are current **interests**, not claims of completed projects. Keep paper metadata consistent with the linked arXiv and publisher pages. Keep the stable `research-unigeo`, `research-pearl`, and `research-survey` anchors used by the GitHub profile. Research claims and quantitative results should remain grounded in project materials. Use “research manuscript” for unpublished work; do not display target journals as publication venues. The UniGeo and PEARL papers credit equal contribution, reflected as **co-first author, listed first**.

Only publish intentionally public CVs and assets. Supporting certificates and identity documents are source material, not website downloads.

## Publishing

GitHub Pages builds the root of `main`. After a verified commit is pushed, check the repository's Pages build result. Before publishing a visual change, inspect both languages at desktop and narrow mobile widths, check keyboard navigation and internal links, and verify dark mode and reduced-motion behavior.

## <picture><img src="assets/icons/research.svg?v=27a432ea" width="24" height="24" alt=""></picture> Paper figures and resources

The two framework figures are reproduced without modification from the authors’ arXiv papers, both under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Each figure links to its source paper; click the image to inspect it at full size. Image dimensions are reserved and figures load lazily.

- **UniGeo framework:** Bohan Su, Jiashuo Wang, Fangyi Liu, and Mang Ye, 2026. [Paper](https://arxiv.org/abs/2607.18863) · [Original figure](https://arxiv.org/html/2607.18863v1/figures/fig_unigeo_framework.png).
- **PEARL framework:** Bohan Su, Pengze Li, Yuchen Lu, and Xi Chen, 2026. [Paper](https://arxiv.org/abs/2607.17917) · [Original figure](https://arxiv.org/html/2607.17917v1/figures/fig1_pearl_framework.png).

## <picture><img src="assets/icons/scholar.svg?v=47bfc45c" width="24" height="24" alt=""></picture> Education and honors

Education and award names, levels, and years are based on the supplied transcripts, certificates, and user-confirmed profile updates. The incoming CASIA master's program (Fall 2027) leads the education timeline and stays marked as incoming until enrollment; the Wuhan University undergraduate program follows. Advisor titles are limited to verifiable facts from official pages: Junyu Gao is an associate professor (副研究员) at CASIA's State Key Laboratory of Multimodal Artificial Intelligence Systems and a 2026 recipient of the NSFC Excellent Young Scientists Fund (now officially the Young Scientists Fund, Type B); Mang Ye is a professor and doctoral supervisor at the Wuhan University School of Computer Science, an NSFC Excellent Young Scientists Fund (Overseas) recipient, and an associate editor of IEEE TIP and TIFS. The institution emblems in `images/logos/` come from the official downloads: the standard emblem on Wuhan University's [visual identity page](https://www.whu.edu.cn/xxgk/wdbs.htm) and the emblem on CASIA's [visual identity page](http://ia.cas.cn/gkjj/xxbs/). They are resized and trimmed only, and identify affiliations. ITSTP appears as smaller, inset additional coursework, distinct from university enrollment. Provincial, regional, and preliminary-round awards retain their scope; the scholarship defense ranking is omitted because it is not stated in the certificate. Private certificates and validation codes are not published.

## GitHub presentation

The [profile README](https://github.com/BohanSu/BohanSu) uses the same academic information with a blue-violet visual identity. An original SVG banner carries the name, research interests and the Wuhan University → CASIA path beside spatial geometry and multimodal signals; matching interest labels, gradient navigation buttons and section icons complete the GitHub presentation. News, an education table with institution marks and advisors, and a publication table with figure thumbnails and venue/status badges follow. An open-source table lists upstream pull requests with live status badges. Four icon links lead to the homepage, Google Scholar, CV and email. Additional coursework and the full honors list are expandable to keep the overview easy to scan. Navigation badges, venue badges and section icons are static SVG files in the repositories, with visible labels and descriptive alt text for links.

When updating research, education or honors, keep the profile README aligned with both website languages. The GitHub repository descriptions, homepage links and topics should identify the academic portfolio and its implementation.
