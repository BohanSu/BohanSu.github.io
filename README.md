# Bohan Su · Academic Homepage

A bilingual research portfolio for **苏渤涵 / Bohan Su**, a Software Engineering undergraduate at Wuhan University, Class of 2027. Current research interests are **world models and multimodal foundation models**. The site presents education, publications, research manuscripts, projects, and documented honors.

[中文主页](https://bohansu.github.io/) · [English](https://bohansu.github.io/en/) · [Profile README](https://github.com/BohanSu/BohanSu) · [Google Scholar](https://scholar.google.com/citations?user=QXCpAoIAAAAJ&hl=zh-CN) · [Email](mailto:2023302143001@whu.edu.cn)

## Design and implementation

A white, near-black, and cobalt-blue design pairs a compact profile rail with a research-focused content column. The portrait retains its full original proportions in a small rectangular frame. On mobile, identity details become a compact horizontal block. Both languages share one content template and stylesheet. The reading order is introduction, education, publications and research, projects, honors, and contact. There is no news or progress feed. All research entries use the same card style.

- **Static HTML first:** Jekyll and GitHub Pages; all content, anchors, language switching, and CV links work without JavaScript.
- **Modern native CSS:** cascade layers, container queries, fluid typography, logical properties, balanced headings, and neutral light/dark colors. Media-query fallbacks preserve the core layout without container-query support.
- **Progressive enhancement:** a small deferred script highlights the current section. Native cross-document view transitions enhance language switching where supported.
- **Accessible reading:** visible keyboard focus, a skip link, semantic landmarks, reduced-motion support, forced-colors adjustments, and print styles.
- **Small asset footprint:** system fonts, an explicitly sized portrait, and no jQuery, external font service, or icon font on the homepage.
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
| `_data/homepage.json` | Bilingual profile, interests, research status, and project content |
| `_includes/homepage.html` | Shared content template |
| `_layouts/page-full.html` | Shared shell, navigation, metadata, and footer |
| `assets/css/homepage.css` | Homepage design, responsive behavior, and accessibility |
| `assets/js/homepage-animations.js` | Optional active-section indicator |
| `_config.yml` | Site identity and Jekyll settings |
| `files/` | Public English and Chinese CVs |
| `images/research/` | Original framework figures from the public arXiv papers |

Update both languages together in `_data/homepage.json`, and keep descriptions in the page front matter and `_config.yml` aligned. World models and multimodal foundation models are current **interests**, not claims of completed projects. Keep paper metadata consistent with the linked arXiv and publisher pages. Keep the stable `research-unigeo`, `research-pearl`, and `research-survey` anchors used by the GitHub profile. Research claims and quantitative results should remain grounded in project materials. Use “research manuscript” for unpublished work; do not display target journals as publication venues. The UniGeo and PEARL papers credit equal contribution, reflected as **co-first author, listed first**.

Only publish intentionally public CVs and assets. Supporting certificates and identity documents are source material, not website downloads.

## Publishing

GitHub Pages builds the root of `main`. After a verified commit is pushed, check the repository's Pages build result. Before publishing a visual change, inspect both languages at desktop and narrow mobile widths, check keyboard navigation and internal links, and verify dark mode and reduced-motion behavior.

## Paper figures and resources

The two framework figures are reproduced without modification from the authors’ arXiv papers, both under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Each figure links to its source paper; click the image to inspect it at full size. Image dimensions are reserved and figures load lazily.

- **UniGeo framework:** Bohan Su, Jiashuo Wang, Fangyi Liu, and Mang Ye, 2026. [Paper](https://arxiv.org/abs/2607.18863) · [Original figure](https://arxiv.org/html/2607.18863v1/figures/fig_unigeo_framework.png).
- **PEARL framework:** Bohan Su, Pengze Li, Yuchen Lu, and Xi Chen, 2026. [Paper](https://arxiv.org/abs/2607.17917) · [Original figure](https://arxiv.org/html/2607.17917v1/figures/fig1_pearl_framework.png).

## Education and honors

Education and award names, levels, and academic years are checked against the supplied transcripts and certificates. Course training is listed separately from university enrollment. Provincial, regional, and preliminary-round awards retain their scope; the scholarship defense ranking is omitted because it is not stated in the certificate. Private certificates and validation codes are not published.
