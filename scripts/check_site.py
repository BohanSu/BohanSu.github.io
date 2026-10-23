#!/usr/bin/env python3
"""Check the generated bilingual site with the Python standard library."""
import json
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(sys.argv[1] if len(sys.argv) > 1 else '_site').resolve()
errors = []


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path, self.ids, self.links, self.images = path, [], [], []
        self.lang, self.h1, self.main, self.canonicals = '', 0, 0, []
        self.alternates, self.scripts, self.styles, self.json_data = {}, [], [], []
        self.in_json, self.buffer = False, ''
        self.feed(path.read_text())

    def handle_starttag(self, tag, attributes):
        a = dict(attributes)
        if 'id' in a:
            self.ids.append(a['id'])
        if tag == 'html':
            self.lang = a.get('lang')
        if tag == 'h1':
            self.h1 += 1
        if tag == 'main':
            self.main += 1
        if tag == 'a' and a.get('href'):
            self.links.append(a['href'])
        if tag == 'img':
            self.images.append(a)
            self.links.append(a.get('src', ''))
        if tag == 'link':
            if a.get('rel') == 'canonical':
                self.canonicals.append(a.get('href'))
            if a.get('rel') == 'alternate':
                self.alternates[a.get('hreflang')] = a.get('href')
            if a.get('rel') == 'stylesheet':
                self.styles.append(a.get('href'))
                self.links.append(a.get('href'))
        if tag == 'script':
            if 'src' in a:
                self.scripts.append(a['src'])
                self.links.append(a['src'])
            if a.get('type') == 'application/ld+json':
                self.in_json, self.buffer = True, ''

    def handle_data(self, data):
        if self.in_json:
            self.buffer += data

    def handle_endtag(self, tag):
        if tag == 'script' and self.in_json:
            try:
                self.json_data.append(json.loads(self.buffer))
            except ValueError:
                errors.append(f'{self.path}: invalid JSON-LD')
            self.in_json = False


def require(condition, message):
    if not condition:
        errors.append(message)


def resolve(href, source):
    url = urlsplit(href)
    if url.scheme or url.netloc:
        return None, None
    path = unquote(url.path)
    target = ROOT / path.lstrip('/') if path.startswith('/') else source.parent / path
    if not path:
        target = source
    if target.is_dir():
        target /= 'index.html'
    return target.resolve(), unquote(url.fragment)


pages = {}
for relative, lang in [('index.html', 'zh-CN'), ('en/index.html', 'en')]:
    path = ROOT / relative
    if not path.is_file():
        errors.append(f'Missing page: {path}')
        continue
    page = Page(path)
    pages[path] = page
    require(page.lang == lang, f'{relative}: incorrect language')
    require(page.h1 == 1 and page.main == 1, f'{relative}: needs one h1 and main')
    require(len(page.ids) == len(set(page.ids)), f'{relative}: duplicate ids')
    require(len(page.canonicals) == 1, f'{relative}: needs one canonical URL')
    require({'zh-CN', 'en', 'x-default'} <= page.alternates.keys(), f'{relative}: incomplete hreflang links')
    require(any(item.get('@type') == 'Person' for item in page.json_data), f'{relative}: missing Person metadata')
    require(page.scripts == ['/assets/js/homepage-animations.js'], f'{relative}: unexpected script payload')
    require(page.styles == ['/assets/css/homepage.css'], f'{relative}: unexpected CSS payload')
    for img in page.images:
        require(bool(img.get('alt')) and bool(img.get('width')) and bool(img.get('height')), f'{relative}: missing image alt or dimensions')

for path, page in list(pages.items()):
    for href in page.links:
        target, anchor = resolve(href, path)
        if target is None:
            continue
        require(target.is_relative_to(ROOT) and target.is_file(), f'{path.name}: broken local link {href}')
        if anchor and target.is_file() and target.suffix == '.html':
            other = pages.setdefault(target, Page(target))
            require(anchor in other.ids, f'{path.name}: missing anchor {href}')

if ROOT / 'index.html' in pages and ROOT / 'en/index.html' in pages:
    require(set(pages[ROOT / 'index.html'].ids) == set(pages[ROOT / 'en/index.html'].ids), 'Language versions have different section anchors')
require((ROOT / 'about/index.html').is_file(), 'Missing legacy /about/ redirect')
require((ROOT / 'about.html').is_file(), 'Missing legacy /about.html redirect')
if errors:
    print('\n'.join(errors), file=sys.stderr)
    sys.exit(1)
print('PASS: bilingual landmarks, metadata, stable anchors, local assets, CV links, and legacy redirects.')
