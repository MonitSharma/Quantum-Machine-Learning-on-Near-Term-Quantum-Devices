/*
 * Project resource viewer
 *
 * Include this file once on a generated project page. It automatically
 * delegates clicks for anchors with the `resource-link` class. The generator
 * should emit:
 *
 *   <a class="resource-link"
 *      data-view-kind="code"
 *      data-path="src/example.py"
 *      data-file-name="example.py"
 *      href="src/example.py">Open example.py</a>
 *
 * Supported data-view-kind values: text, code, markdown, ipynb, pdf, image,
 * video, and audio. The kind is inferred from the path when it is omitted.
 */
(function projectResourceViewerFactory(global, doc) {
  'use strict';

  if (!global || !doc) return;

  var TEXT_EXTENSIONS = {
    '.c': true, '.cc': true, '.cpp': true, '.css': true, '.cu': true,
    '.h': true, '.hpp': true, '.html': true, '.ini': true, '.java': true,
    '.js': true, '.json': true, '.jsx': true, '.jl': true, '.lock': true,
    '.m': true, '.md': true, '.py': true, '.r': true, '.rs': true,
    '.sh': true, '.sql': true, '.tex': true, '.toml': true, '.ts': true,
    '.tsx': true, '.txt': true, '.vue': true, '.xml': true, '.yaml': true,
    '.yml': true
  };

  var KIND_ALIASES = {
    source: 'code',
    script: 'code',
    textfile: 'text',
    md: 'markdown',
    notebook: 'ipynb',
    document: 'pdf',
    img: 'image',
    movie: 'video'
  };

  var IMAGE_EXTENSIONS = { '.avif': true, '.gif': true, '.jpeg': true, '.jpg': true, '.png': true, '.svg': true, '.webp': true };
  var VIDEO_EXTENSIONS = { '.m4v': true, '.mov': true, '.mp4': true, '.ogv': true, '.webm': true };

  var CSS = [
    '.resource-viewer[hidden]{display:none}',
    '.resource-viewer{width:min(960px,calc(100% - 28px));max-width:960px;max-height:min(88vh,900px);padding:0;border:1px solid #ddd9d4;background:#fbfaf7;color:#2b2932;box-shadow:0 24px 80px rgba(43,41,50,.24)}',
    '.resource-viewer::backdrop{background:rgba(43,41,50,.58);backdrop-filter:blur(3px)}',
    '.resource-viewer:not([open]){display:none}',
    '.resource-viewer.is-open{display:flex;flex-direction:column}',
    '.resource-viewer-header{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;padding:20px 24px 17px;border-bottom:1px solid #ddd9d4;background:#f2f0eb}',
    '.resource-viewer-heading{min-width:0}',
    '.resource-viewer-kicker{margin:0 0 6px;color:#7d3f91;font:500 10px/1.3 "IBM Plex Mono",monospace;letter-spacing:.13em;text-transform:uppercase}',
    '.resource-viewer-title{margin:0;color:#2b2932;font:500 clamp(1.25rem,3vw,1.8rem)/1.1 "Newsreader",Georgia,serif;overflow-wrap:anywhere}',
    '.resource-viewer-close{display:inline-grid;flex:0 0 auto;place-items:center;width:36px;height:36px;padding:0;border:1px solid #bdb8b1;background:#fbfaf7;color:#2b2932;cursor:pointer;font:18px/1 "IBM Plex Mono",monospace}',
    '.resource-viewer-close:hover,.resource-viewer-close:focus-visible{border-color:#7d3f91;color:#7d3f91;outline:2px solid #cfaed5;outline-offset:2px}',
    '.resource-viewer-meta{display:flex;flex-wrap:wrap;gap:8px 14px;padding:11px 24px;border-bottom:1px solid #ddd9d4;color:#66636d;font:10px/1.4 "IBM Plex Mono",monospace}',
    '.resource-viewer-meta span{overflow-wrap:anywhere}',
    '.resource-viewer-body{min-height:180px;overflow:auto;padding:24px}',
    '.resource-viewer-status{margin:0;color:#66636d;font:13px/1.6 "IBM Plex Sans",system-ui,sans-serif}',
    '.resource-viewer-status.is-error{color:#7b2635}',
    '.resource-viewer-status strong{color:#2b2932}',
    '.resource-viewer-source{max-height:59vh;margin:0;padding:20px;overflow:auto;border:1px solid #ddd9d4;background:#f2f0eb;color:#2b2932;white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.65 "IBM Plex Mono",monospace;tab-size:2}',
    '.resource-viewer-source:focus-visible,.resource-viewer-notebook:focus-visible{outline:2px solid #7d3f91;outline-offset:2px}',
    '.resource-viewer-notebook{display:grid;gap:14px;max-height:59vh;overflow:auto}',
    '.resource-viewer-cell{border:1px solid #ddd9d4;background:#fbfaf7}',
    '.resource-viewer-cell-header{display:flex;justify-content:space-between;gap:15px;padding:9px 13px;border-bottom:1px solid #ddd9d4;background:#f2f0eb;color:#7d3f91;font:10px/1.4 "IBM Plex Mono",monospace;letter-spacing:.06em;text-transform:uppercase}',
    '.resource-viewer-cell-source{margin:0;padding:15px;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.6 "IBM Plex Mono",monospace}',
    '.resource-viewer-markdown{padding:16px 18px;color:#2b2932;font:15px/1.65 "IBM Plex Sans",system-ui,sans-serif}',
    '.resource-viewer-markdown>*:first-child{margin-top:0}',
    '.resource-viewer-markdown>*:last-child{margin-bottom:0}',
    '.resource-viewer-markdown h1,.resource-viewer-markdown h2,.resource-viewer-markdown h3,.resource-viewer-markdown h4{font-family:"Newsreader",Georgia,serif;font-weight:500;line-height:1.15}',
    '.resource-viewer-markdown h1{font-size:1.7rem}.resource-viewer-markdown h2{font-size:1.45rem}.resource-viewer-markdown h3{font-size:1.2rem}.resource-viewer-markdown h4{font-size:1.05rem}',
    '.resource-viewer-markdown p{margin:0 0 12px}.resource-viewer-markdown ul,.resource-viewer-markdown ol{margin:0 0 14px;padding-left:24px}',
    '.resource-viewer-markdown li{margin:3px 0}.resource-viewer-markdown blockquote{margin:0 0 14px;padding-left:14px;border-left:2px solid #7d3f91;color:#66636d}',
    '.resource-viewer-markdown code{padding:2px 4px;background:#f2f0eb;font:12px "IBM Plex Mono",monospace}',
    '.resource-viewer-markdown pre{margin:0 0 14px;padding:14px;overflow:auto;background:#f2f0eb;font:12px/1.6 "IBM Plex Mono",monospace}',
    '.resource-viewer-markdown a{color:#7d3f91;text-decoration:underline;text-underline-offset:3px}',
    '.resource-viewer-inline-image{display:block;max-width:100%;height:auto;margin:16px auto;border:1px solid #ddd9d4;background:#f2f0eb}',
    '.resource-viewer-outputs{margin-top:14px;padding:14px;border-top:1px solid #ddd9d4;background:#f2f0eb}',
    '.resource-viewer-output-label{margin-bottom:8px;color:#7d3f91;font:10px/1.4 "IBM Plex Mono",monospace;letter-spacing:.08em;text-transform:uppercase}',
    '.resource-viewer-output-text{margin:8px 0;padding:12px;overflow:auto;background:#fbfaf7;white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.6 "IBM Plex Mono",monospace}',
    '.resource-viewer-output-image{display:block;max-width:100%;height:auto;margin:10px auto;background:#fbfaf7}',
    '.resource-viewer-problem{display:grid;gap:18px}.resource-viewer-problem-section{border:1px solid #ddd9d4;background:#fbfaf7}.resource-viewer-problem h3{margin:0;padding:12px 16px;border-bottom:1px solid #ddd9d4;background:#f2f0eb;color:#7d3f91;font:500 11px/1.4 "IBM Plex Mono",monospace;letter-spacing:.07em;text-transform:uppercase}.resource-viewer-code-file{border:1px solid #ddd9d4;background:#fbfaf7}.resource-viewer-code-file summary{padding:12px 15px;cursor:pointer;color:#7d3f91;font:11px "IBM Plex Mono",monospace}.resource-viewer-code-file .resource-viewer-source{border-top:1px solid #ddd9d4}',
    '.resource-viewer-media{display:block;width:100%;max-height:59vh;min-height:260px;border:1px solid #ddd9d4;background:#f2f0eb}',
    'img.resource-viewer-media{height:auto;min-height:0;max-height:59vh;object-fit:contain}',
    'video.resource-viewer-media{height:auto}',
    '.resource-viewer-footer{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;padding:15px 24px;border-top:1px solid #ddd9d4;background:#f2f0eb}',
    '.resource-viewer-actions{display:flex;flex-wrap:wrap;gap:10px}',
    '.resource-viewer-action{display:inline-block;padding:9px 12px;border:1px solid #2b2932;background:#2b2932;color:#fbfaf7;cursor:pointer;font:10px/1.2 "IBM Plex Mono",monospace;text-decoration:none}',
    '.resource-viewer-action.secondary{border-color:#bdb8b1;background:#fbfaf7;color:#2b2932}',
    '.resource-viewer-action:hover,.resource-viewer-action:focus-visible{border-color:#7d3f91;background:#7d3f91;color:#fff;outline:2px solid #cfaed5;outline-offset:2px}',
    '.resource-viewer-footer-note{margin:0;color:#918e96;font:10px/1.4 "IBM Plex Mono",monospace}',
    '@media (max-width:640px){.resource-viewer{width:calc(100% - 16px);max-height:94vh}.resource-viewer-header,.resource-viewer-meta,.resource-viewer-body,.resource-viewer-footer{padding-left:16px;padding-right:16px}.resource-viewer-body{padding-top:16px;padding-bottom:16px}.resource-viewer-source{max-height:63vh;padding:14px;font-size:11px}.resource-viewer-notebook{max-height:63vh}.resource-viewer-media{min-height:190px;max-height:63vh}.resource-viewer-footer{align-items:stretch;flex-direction:column}.resource-viewer-actions{width:100%}.resource-viewer-action{flex:1;text-align:center}.resource-viewer-footer-note{order:-1}}'
  ].join('\n');

  var styleInjected = false;

  function injectStyles() {
    if (styleInjected || doc.getElementById('project-resource-viewer-styles')) return;
    var style = doc.createElement('style');
    style.id = 'project-resource-viewer-styles';
    style.textContent = CSS;
    (doc.head || doc.documentElement).appendChild(style);
    styleInjected = true;
  }

  function extname(value) {
    var clean = String(value || '').split(/[?#]/)[0];
    var slash = clean.lastIndexOf('/');
    var dot = clean.lastIndexOf('.');
    return dot > slash ? clean.slice(dot).toLowerCase() : '';
  }

  function basename(value) {
    var clean = String(value || '').split(/[?#]/)[0].replace(/\\/g, '/');
    var parts = clean.split('/');
    return parts[parts.length - 1] || 'Resource';
  }

  function normalizedKind(kind, pathValue) {
    var value = String(kind || '').toLowerCase().trim();
    if (value === 'notebook') value = 'ipynb';
    if (value === 'reading' || value === 'asset' || value === 'setup' || value === 'other') value = '';
    value = KIND_ALIASES[value] || value;
    if (value) return value;
    var ext = extname(pathValue);
    if (ext === '.ipynb') return 'ipynb';
    if (ext === '.pdf') return 'pdf';
    if (IMAGE_EXTENSIONS[ext]) return 'image';
    if (VIDEO_EXTENSIONS[ext]) return 'video';
    if (TEXT_EXTENSIONS[ext]) return ext === '.md' ? 'markdown' : 'code';
    return 'text';
  }

  function safeUrl(value, base) {
    try {
      return new URL(value, base || doc.baseURI).href;
    } catch (error) {
      return '';
    }
  }

  function appendText(parent, value) {
    parent.appendChild(doc.createTextNode(String(value || '')));
  }

  function appendInlineMarkdown(parent, value, baseUrl) {
    var source = String(value || '');
    var pattern = /(!\[[^\]]*\]\([^\s)]+(?:\s+"[^"]*")?\)|`[^`]+`|\[[^\]]+\]\([^\s)]+(?:\s+"[^"]*")?\))/g;
    var last = 0;
    var match;
    while ((match = pattern.exec(source))) {
      appendText(parent, source.slice(last, match.index));
      var token = match[0];
      if (token.indexOf('![') === 0) {
        var imageMatch = token.match(/^!\[([^\]]*)\]\(([^\s)]+)(?:\s+"[^"]*")?\)$/);
        var imageUrl = imageMatch ? safeUrl(imageMatch[2], baseUrl) : '';
        if (imageUrl) {
          var image = doc.createElement('img');
          image.className = 'resource-viewer-inline-image';
          image.src = imageUrl;
          image.alt = imageMatch[1] || 'Figure from this resource';
          image.loading = 'lazy';
          parent.appendChild(image);
        } else {
          appendText(parent, token);
        }
      } else if (token.charAt(0) === '`') {
        var code = doc.createElement('code');
        appendText(code, token.slice(1, -1));
        parent.appendChild(code);
      } else {
        var linkMatch = token.match(/^\[([^\]]+)\]\(([^\s)]+)(?:\s+"[^"]*")?\)$/);
        var href = linkMatch ? safeUrl(linkMatch[2], baseUrl) : '';
        if (href) {
          var link = doc.createElement('a');
          link.href = href;
          appendText(link, linkMatch[1]);
          parent.appendChild(link);
        } else {
          appendText(parent, token);
        }
      }
      last = match.index + token.length;
    }
    appendText(parent, source.slice(last));
  }

  function renderMarkdown(parent, source, baseUrl) {
    var lines = String(source || '').replace(/\r\n?/g, '\n').split('\n');
    var paragraph = [];
    var list = null;
    var inFence = false;
    var fenceLines = [];

    function flushParagraph() {
      if (!paragraph.length) return;
      var p = doc.createElement('p');
      appendInlineMarkdown(p, paragraph.join(' '), baseUrl);
      parent.appendChild(p);
      paragraph = [];
    }

    function closeList() {
      if (list) {
        parent.appendChild(list);
        list = null;
      }
    }

    function flushFence() {
      var pre = doc.createElement('pre');
      appendText(pre, fenceLines.join('\n'));
      parent.appendChild(pre);
      fenceLines = [];
    }

    lines.forEach(function (line) {
      var fence = line.match(/^\s*```/);
      if (fence) {
        flushParagraph();
        closeList();
        if (inFence) flushFence();
        inFence = !inFence;
        return;
      }
      if (inFence) {
        fenceLines.push(line);
        return;
      }
      var heading = line.match(/^\s*(#{1,6})\s+(.+?)\s*#*\s*$/);
      var item = line.match(/^\s*[-*+]\s+(.+)$/);
      var numbered = line.match(/^\s*\d+[.)]\s+(.+)$/);
      var quote = line.match(/^\s*>\s?(.*)$/);
      if (!line.trim()) {
        flushParagraph();
        closeList();
      } else if (heading) {
        flushParagraph();
        closeList();
        var h = doc.createElement('h' + heading[1].length);
        appendInlineMarkdown(h, heading[2], baseUrl);
        parent.appendChild(h);
      } else if (item || numbered) {
        flushParagraph();
        var wantedTag = numbered ? 'ol' : 'ul';
        if (!list || list.tagName.toLowerCase() !== wantedTag) {
          closeList();
          list = doc.createElement(wantedTag);
        }
        var li = doc.createElement('li');
        appendInlineMarkdown(li, (item || numbered)[1], baseUrl);
        list.appendChild(li);
      } else if (quote) {
        flushParagraph();
        closeList();
        var blockquote = doc.createElement('blockquote');
        appendInlineMarkdown(blockquote, quote[1], baseUrl);
        parent.appendChild(blockquote);
      } else {
        closeList();
        paragraph.push(line.trim());
      }
    });
    if (inFence) flushFence();
    flushParagraph();
    closeList();
  }

  function createButton(label, className, action) {
    var button = doc.createElement('button');
    button.type = 'button';
    button.className = className;
    button.dataset.viewerAction = action;
    button.textContent = label;
    if (action === 'close') button.setAttribute('aria-label', 'Close resource viewer');
    return button;
  }

  function ProjectResourceViewer(options) {
    this.options = options || {};
    this.dialog = null;
    this.body = null;
    this.titleNode = null;
    this.kindNode = null;
    this.pathNode = null;
    this.downloadLink = null;
    this.originalLink = null;
    this.previousFocus = null;
    this.abortController = null;
    this.downloadObjectUrl = '';
    this.requestId = 0;
    this.initialized = false;
    this.historyEntry = false;
    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onDocumentKeydown = this.onDocumentKeydown.bind(this);
    this.onPopState = this.onPopState.bind(this);
    this.onDialogClick = this.onDialogClick.bind(this);
    this.onDialogCancel = this.onDialogCancel.bind(this);
    this.init();
  }

  ProjectResourceViewer.prototype.init = function () {
    if (this.initialized) return this;
    injectStyles();
    this.buildDialog();
    doc.addEventListener('click', this.onDocumentClick);
    doc.addEventListener('keydown', this.onDocumentKeydown);
    global.addEventListener('popstate', this.onPopState);
    this.initialized = true;
    return this;
  };

  ProjectResourceViewer.prototype.buildDialog = function () {
    var existing = doc.getElementById('project-resource-viewer');
    if (existing) existing.remove();
    var dialog = doc.createElement('dialog');
    dialog.id = 'project-resource-viewer';
    dialog.className = 'resource-viewer';
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'project-resource-viewer-title');
    dialog.addEventListener('click', this.onDialogClick);
    dialog.addEventListener('cancel', this.onDialogCancel);

    var header = doc.createElement('header');
    header.className = 'resource-viewer-header';
    var heading = doc.createElement('div');
    heading.className = 'resource-viewer-heading';
    var kicker = doc.createElement('p');
    kicker.className = 'resource-viewer-kicker';
    kicker.textContent = 'Repository resource';
    var title = doc.createElement('h2');
    title.id = 'project-resource-viewer-title';
    title.className = 'resource-viewer-title';
    heading.appendChild(kicker);
    heading.appendChild(title);
    header.appendChild(heading);
    header.appendChild(createButton('×', 'resource-viewer-close', 'close'));

    var meta = doc.createElement('div');
    meta.className = 'resource-viewer-meta';
    var kind = doc.createElement('span');
    var path = doc.createElement('span');
    meta.appendChild(kind);
    meta.appendChild(path);

    var body = doc.createElement('section');
    body.className = 'resource-viewer-body';
    body.setAttribute('aria-live', 'polite');

    var footer = doc.createElement('footer');
    footer.className = 'resource-viewer-footer';
    var note = doc.createElement('p');
    note.className = 'resource-viewer-footer-note';
    note.textContent = 'Previewed in place · the original remains available';
    var actions = doc.createElement('div');
    actions.className = 'resource-viewer-actions';
    var download = doc.createElement('a');
    download.className = 'resource-viewer-action';
    download.textContent = 'Download';
    var original = doc.createElement('a');
    original.className = 'resource-viewer-action secondary';
    original.textContent = 'Open original';
    actions.appendChild(download);
    actions.appendChild(original);
    footer.appendChild(note);
    footer.appendChild(actions);

    dialog.appendChild(header);
    dialog.appendChild(meta);
    dialog.appendChild(body);
    dialog.appendChild(footer);
    (doc.body || doc.documentElement).appendChild(dialog);

    this.dialog = dialog;
    this.body = body;
    this.titleNode = title;
    this.kindNode = kind;
    this.pathNode = path;
    this.downloadLink = download;
    this.originalLink = original;
  };

  ProjectResourceViewer.prototype.onDocumentClick = function (event) {
    var target = event.target;
    var link = target && target.closest ? target.closest('a.resource-link') : null;
    if (!link || !doc.documentElement.contains(link)) return;
    event.preventDefault();
    this.open(link);
  };

  ProjectResourceViewer.prototype.onPopState = function (event) {
    if (event.state && event.state.projectViewerPath) {
      var links = doc.querySelectorAll('a.resource-link');
      var link = Array.prototype.find.call(links, function (candidate) {
        return candidate.dataset.path === event.state.projectViewerPath;
      });
      if (link) {
        this.open(link, { fromHistory: true });
        return;
      }
    }
    if (this.isOpen()) {
      this.historyEntry = false;
      this.close({ fromPopstate: true });
    }
  };

  ProjectResourceViewer.prototype.onDocumentKeydown = function (event) {
    if (!this.isOpen()) return;
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      this.close();
    }
  };

  ProjectResourceViewer.prototype.onDialogClick = function (event) {
    if (event.target === this.dialog) {
      this.close();
      return;
    }
    var action = event.target && event.target.closest ? event.target.closest('[data-viewer-action]') : null;
    if (action && action.dataset.viewerAction === 'close') this.close();
  };

  ProjectResourceViewer.prototype.onDialogCancel = function (event) {
    event.preventDefault();
    this.close();
  };

  ProjectResourceViewer.prototype.isOpen = function () {
    return !!(this.dialog && (this.dialog.open || this.dialog.classList.contains('is-open')));
  };

  ProjectResourceViewer.prototype.openDialog = function () {
    if (!this.dialog) this.buildDialog();
    this.dialog.hidden = false;
    this.dialog.classList.add('is-open');
    if (typeof this.dialog.showModal === 'function' && !this.dialog.open) {
      try {
        this.dialog.showModal();
      } catch (error) {
        this.dialog.setAttribute('open', '');
      }
    } else if (!this.dialog.open) {
      this.dialog.setAttribute('open', '');
    }
  };

  ProjectResourceViewer.prototype.open = function (link, options) {
    options = options || {};
    var pathValue = link.dataset.path || link.getAttribute('href') || '';
    var url = safeUrl(pathValue, doc.baseURI);
    if (!url) {
      this.showError({ title: 'Resource unavailable', path: pathValue, url: '' }, 'This link does not contain a readable resource path.');
      return;
    }
    var title = link.dataset.viewTitle || link.dataset.fileName || link.textContent.trim() || basename(pathValue);
    var kind = normalizedKind(link.dataset.viewKind, pathValue);
    var problemFiles = [];
    if (link.dataset.problemFiles) {
      try { problemFiles = JSON.parse(link.dataset.problemFiles); } catch (error) { problemFiles = []; }
    }
    var item = { kind: kind, path: pathValue, url: url, title: title, fileName: link.dataset.fileName || basename(pathValue), problemFiles: problemFiles };
    if (!options.fromHistory) {
      global.history.pushState({ projectViewerPath: pathValue }, '', global.location.href);
      this.historyEntry = true;
    }
    this.previousFocus = doc.activeElement;
    this.requestId += 1;
    var requestId = this.requestId;
    if (this.abortController && typeof this.abortController.abort === 'function') this.abortController.abort();
    this.abortController = typeof global.AbortController === 'function' ? new global.AbortController() : null;
    this.revokeDownloadUrl();
    this.titleNode.textContent = item.title;
    this.kindNode.textContent = item.kind.toUpperCase();
    this.pathNode.textContent = item.path;
    this.originalLink.href = item.url;
    this.originalLink.setAttribute('aria-label', 'Open original ' + item.fileName);
    this.downloadLink.href = item.url;
    this.downloadLink.download = item.fileName;
    this.downloadLink.setAttribute('aria-label', 'Download ' + item.fileName);
    this.body.replaceChildren(this.statusNode('Loading resource…'));
    this.openDialog();
    this.load(item, requestId);
  };

  ProjectResourceViewer.prototype.load = async function (item, requestId) {
    try {
      if (item.kind === 'problem') {
        await this.loadProblem(item, requestId);
        return;
      }
      if (item.kind === 'image' || item.kind === 'video' || item.kind === 'audio' || item.kind === 'pdf') {
        this.renderMedia(item, requestId);
        return;
      }
      var response = await fetch(item.url, { signal: this.abortController ? this.abortController.signal : undefined });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      if (item.kind === 'ipynb') {
        var notebook = await response.json();
        if (requestId !== this.requestId) return;
        this.renderNotebook(item, notebook);
        this.setDownloadFromText(JSON.stringify(notebook, null, 2), item.fileName, 'application/json');
        return;
      }
      var source = await response.text();
      if (requestId !== this.requestId) return;
      this.renderSource(item, source);
      this.setDownloadFromText(source, item.fileName, response.headers.get('content-type') || 'text/plain;charset=utf-8');
    } catch (error) {
      if (requestId !== this.requestId) return;
      if (error && error.name === 'AbortError') return;
      this.showError(item, 'The preview could not be loaded. You can still download the file or open the original resource.');
    }
  };

  ProjectResourceViewer.prototype.renderSource = function (item, source) {
    this.body.replaceChildren();
    if (item.kind === 'markdown') {
      var markdown = doc.createElement('article');
      markdown.className = 'resource-viewer-markdown';
      markdown.tabIndex = 0;
      renderMarkdown(markdown, source, item.url);
      this.body.appendChild(markdown);
      return;
    }
    var pre = doc.createElement('pre');
    pre.className = 'resource-viewer-source';
    pre.tabIndex = 0;
    pre.setAttribute('aria-label', item.title + ' source');
    pre.textContent = source;
    this.body.appendChild(pre);
  };

  ProjectResourceViewer.prototype.renderNotebook = function (item, notebook) {
    this.body.replaceChildren();
    if (!notebook || !Array.isArray(notebook.cells)) {
      this.showError(item, 'This notebook is not valid Jupyter JSON.');
      return;
    }
    var notebookView = doc.createElement('div');
    notebookView.className = 'resource-viewer-notebook';
    notebookView.tabIndex = 0;
    notebookView.setAttribute('aria-label', item.title + ' notebook cells');
    var cellsFound = 0;
    notebook.cells.forEach(function (cell, index) {
      var type = cell && cell.cell_type;
      if (type !== 'markdown' && type !== 'code') return;
      cellsFound += 1;
      var article = doc.createElement('article');
      article.className = 'resource-viewer-cell';
      var header = doc.createElement('div');
      header.className = 'resource-viewer-cell-header';
      header.textContent = (type === 'markdown' ? 'Markdown' : 'Code') + ' cell ' + (index + 1);
      var source = Array.isArray(cell.source) ? cell.source.join('') : String(cell.source || '');
      if (type === 'markdown') {
        var markdown = doc.createElement('div');
        markdown.className = 'resource-viewer-markdown';
        renderMarkdown(markdown, source, item.url);
        article.appendChild(header);
        article.appendChild(markdown);
      } else {
        var pre = doc.createElement('pre');
        pre.className = 'resource-viewer-cell-source';
        pre.textContent = source;
        article.appendChild(header);
        article.appendChild(pre);
      }
      this.renderNotebookOutputs(article, cell.outputs, item.url);
      notebookView.appendChild(article);
    }, this);
    if (!cellsFound) {
      this.showError(item, 'No markdown or code cells were found in this notebook.');
      return;
    }
    this.body.appendChild(notebookView);
  };

  ProjectResourceViewer.prototype.renderNotebookOutputs = function (article, outputs, baseUrl) {
    if (!Array.isArray(outputs) || !outputs.length) return;
    var outputWrap = doc.createElement('div');
    outputWrap.className = 'resource-viewer-outputs';
    var label = doc.createElement('div');
    label.className = 'resource-viewer-output-label';
    label.textContent = 'Output';
    outputWrap.appendChild(label);
    outputs.forEach(function (output) {
      if (!output) return;
      var type = output.output_type || 'output';
      var data = output.data || {};
      if (type === 'stream') {
        var stream = doc.createElement('pre');
        stream.className = 'resource-viewer-output-text';
        stream.textContent = Array.isArray(output.text) ? output.text.join('') : String(output.text || '');
        outputWrap.appendChild(stream);
        return;
      }
      var imageKey = data['image/png'] ? 'image/png' : data['image/jpeg'] ? 'image/jpeg' : data['image/svg+xml'] ? 'image/svg+xml' : '';
      if (imageKey) {
        var image = doc.createElement('img');
        image.className = 'resource-viewer-output-image';
        var imageValue = Array.isArray(data[imageKey]) ? data[imageKey].join('') : data[imageKey];
        image.src = imageKey === 'image/svg+xml' && String(imageValue).indexOf('<svg') === 0 ? 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(imageValue) : 'data:' + imageKey + ';base64,' + String(imageValue).replace(/\s/g, '');
        image.alt = 'Notebook output figure';
        outputWrap.appendChild(image);
        return;
      }
      var text = data['text/markdown'] || data['text/plain'] || output.text || data['text/html'];
      if (text) {
        var outputText = Array.isArray(text) ? text.join('') : String(text);
        if (data['text/markdown']) {
          var markdown = doc.createElement('div');
          markdown.className = 'resource-viewer-markdown';
          renderMarkdown(markdown, outputText, baseUrl);
          outputWrap.appendChild(markdown);
        } else {
          var plain = doc.createElement('pre');
          plain.className = 'resource-viewer-output-text';
          plain.textContent = outputText;
          outputWrap.appendChild(plain);
        }
      }
    });
    if (outputWrap.children.length > 1) article.appendChild(outputWrap);
  };

  ProjectResourceViewer.prototype.loadProblem = async function (item, requestId) {
    var files = Array.isArray(item.problemFiles) ? item.problemFiles : [];
    var readme = files.find(function (file) { return /(^|\/)readme\.md$/i.test(file); });
    var notes = files.filter(function (file) { return /\.md$/i.test(file) && file !== readme; });
    var codeFiles = files.filter(function (file) { return /\.(c|cc|cpp|cu|go|java|js|py|rs|ts)$/i.test(file); });
    var sections = [];
    var fetchText = async function (file) {
      var url = safeUrl(file, doc.baseURI);
      var response = await fetch(url, { signal: this.abortController ? this.abortController.signal : undefined });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return { file: file, url: url, text: await response.text() };
    }.bind(this);
    try {
      if (readme) sections.push(await fetchText(readme));
      for (var index = 0; index < notes.length; index += 1) sections.push(await fetchText(notes[index]));
      var codeSections = [];
      for (var codeIndex = 0; codeIndex < codeFiles.length; codeIndex += 1) codeSections.push(await fetchText(codeFiles[codeIndex]));
      if (requestId !== this.requestId) return;
      this.body.replaceChildren();
      var view = doc.createElement('div');
      view.className = 'resource-viewer-problem';
      sections.forEach(function (section, sectionIndex) {
        var article = doc.createElement('article');
        article.className = 'resource-viewer-problem-section';
        var heading = doc.createElement('h3');
        heading.textContent = sectionIndex === 0 ? 'Problem statement' : 'Notes';
        article.appendChild(heading);
        var markdown = doc.createElement('div');
        markdown.className = 'resource-viewer-markdown';
        renderMarkdown(markdown, section.text, section.url);
        article.appendChild(markdown);
        view.appendChild(article);
      });
      if (codeSections.length) {
        var codeHeading = doc.createElement('h3');
        codeHeading.textContent = 'Solutions';
        view.appendChild(codeHeading);
        codeSections.forEach(function (section, sectionIndex) {
          var details = doc.createElement('details');
          details.className = 'resource-viewer-code-file';
          if (sectionIndex === 0) details.open = true;
          var summary = doc.createElement('summary');
          summary.textContent = basename(section.file);
          details.appendChild(summary);
          var pre = doc.createElement('pre');
          pre.className = 'resource-viewer-source';
          pre.textContent = section.text;
          details.appendChild(pre);
          view.appendChild(details);
        });
      }
      if (!view.children.length) {
        this.showError(item, 'No problem statement or solution files were found.');
        return;
      }
      this.body.appendChild(view);
    } catch (error) {
      if (requestId !== this.requestId || (error && error.name === 'AbortError')) return;
      this.showError(item, 'The problem files could not be loaded.');
    }
  };

  ProjectResourceViewer.prototype.renderMedia = function (item, requestId) {
    this.body.replaceChildren();
    var media;
    if (item.kind === 'pdf') {
      media = doc.createElement('iframe');
      media.title = item.title;
      media.src = item.url;
      media.className = 'resource-viewer-media';
      media.setAttribute('loading', 'lazy');
    } else if (item.kind === 'image') {
      media = doc.createElement('img');
      media.alt = item.title;
      media.src = item.url;
      media.className = 'resource-viewer-media';
    } else {
      media = doc.createElement(item.kind === 'audio' ? 'audio' : 'video');
      media.controls = true;
      media.preload = 'metadata';
      media.src = item.url;
      media.className = 'resource-viewer-media';
    }
    media.addEventListener('error', function () {
      if (requestId !== this.requestId) return;
      this.showError(item, 'This media could not be previewed in the browser. You can still download it or open the original resource.');
    }.bind(this), { once: true });
    this.body.appendChild(media);
  };

  ProjectResourceViewer.prototype.statusNode = function (message, isError) {
    var status = doc.createElement('p');
    status.className = 'resource-viewer-status' + (isError ? ' is-error' : '');
    status.textContent = message;
    return status;
  };

  ProjectResourceViewer.prototype.showError = function (item, message) {
    if (!this.dialog) this.buildDialog();
    this.titleNode.textContent = item && item.title ? item.title : 'Resource unavailable';
    this.kindNode.textContent = item && item.kind ? item.kind.toUpperCase() : 'RESOURCE';
    this.pathNode.textContent = item && item.path ? item.path : '';
    if (item && item.url) {
      this.originalLink.href = item.url;
      this.downloadLink.href = item.url;
      this.downloadLink.download = item.fileName || basename(item.path);
    }
    var wrapper = doc.createElement('div');
    wrapper.appendChild(this.statusNode(message, true));
    if (item && item.url) {
      var detail = this.statusNode('The file may be unavailable locally or may require the repository to be served from its project root.');
      wrapper.appendChild(detail);
    }
    this.body.replaceChildren(wrapper);
    this.openDialog();
  };

  ProjectResourceViewer.prototype.setDownloadFromText = function (source, fileName, mime) {
    this.revokeDownloadUrl();
    try {
      this.downloadObjectUrl = URL.createObjectURL(new Blob([source], { type: mime || 'text/plain;charset=utf-8' }));
      this.downloadLink.href = this.downloadObjectUrl;
      this.downloadLink.download = fileName || 'resource.txt';
    } catch (error) {
      this.downloadLink.href = this.originalLink.href;
    }
  };

  ProjectResourceViewer.prototype.revokeDownloadUrl = function () {
    if (!this.downloadObjectUrl) return;
    try { URL.revokeObjectURL(this.downloadObjectUrl); } catch (error) { /* best effort */ }
    this.downloadObjectUrl = '';
  };

  ProjectResourceViewer.prototype.close = function (options) {
    options = options || {};
    if (this.historyEntry && !options.fromPopstate) {
      this.historyEntry = false;
      global.history.back();
    }
    this.requestId += 1;
    if (this.abortController && typeof this.abortController.abort === 'function') this.abortController.abort();
    this.abortController = null;
    this.revokeDownloadUrl();
    if (!this.dialog) return;
    if (this.dialog.open && typeof this.dialog.close === 'function') this.dialog.close();
    this.dialog.classList.remove('is-open');
    this.dialog.removeAttribute('open');
    this.dialog.hidden = true;
    var focus = this.previousFocus;
    this.previousFocus = null;
    if (focus && typeof focus.focus === 'function' && doc.documentElement.contains(focus)) {
      try { focus.focus(); } catch (error) { /* best effort */ }
    }
  };

  ProjectResourceViewer.prototype.destroy = function () {
    this.close();
    doc.removeEventListener('click', this.onDocumentClick);
    doc.removeEventListener('keydown', this.onDocumentKeydown);
    global.removeEventListener('popstate', this.onPopState);
    if (this.dialog) this.dialog.remove();
    this.dialog = null;
    this.initialized = false;
  };

  global.ProjectResourceViewer = ProjectResourceViewer;

  function boot() {
    if (!global.projectResourceViewer) global.projectResourceViewer = new ProjectResourceViewer();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
}(typeof window !== 'undefined' ? window : this, typeof document !== 'undefined' ? document : null));
