/* After Dark Blog Module */
window._adInit = function(root) {
  const LS_KEY = 'ad_data';
  const LS_ADMIN = 'ad_admin';
  const LS_RATE = 'ad_rate';
  const ADMIN_PW = 'afterdark2025';
  const RATE_LIMIT = 5;
  const RATE_WINDOW = 600000;
  const REACTIONS = ['like','heart','fire','think','laugh'];
  const REACTION_EMOJI = { like:'👍', heart:'❤️', fire:'🔥', think:'🤔', laugh:'😂' };

  let data = loadData();
  let isAdmin = !!localStorage.getItem(LS_ADMIN);

  function loadData() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return { posts: [] };
  }

  function saveData() {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  }

  function genId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2,7);
  }

  function timeAgo(ts) {
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return mins + 'm ago';
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs + 'h ago';
    const days = Math.floor(hrs / 24);
    if (days < 30) return days + 'd ago';
    const months = Math.floor(days / 30);
    return months + 'mo ago';
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function compressImage(file, maxW, maxH, quality) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
          let w = img.width, h = img.height;
          if (w > maxW) { h = h * maxW / w; w = maxW; }
          if (h > maxH) { w = w * maxH / h; h = maxH; }
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      * { margin:0; padding:0; box-sizing:border-box; }
      body { font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; background:#0a0a0a; color:#e0e0e0; min-height:100vh; }
      .ad-wrap { max-width:680px; margin:0 auto; padding:20px 16px 60px; }
      .ad-header { text-align:center; padding:32px 0 24px; border-bottom:1px solid #222; margin-bottom:24px; position:relative; }
      .ad-header h1 { font-size:28px; font-weight:700; color:#fff; letter-spacing:-0.5px; }
      .ad-header p { font-size:13px; color:#666; margin-top:6px; }
      .ad-login-btn { position:absolute; top:0; right:0; background:none; border:1px solid #333; border-radius:6px; color:#555; font-size:11px; padding:4px 10px; cursor:pointer; font-family:inherit; }
      .ad-login-btn:hover { border-color:#555; color:#888; }
      .ad-admin-badge { display:inline-block; background:linear-gradient(135deg,#0a66c2,#004182); color:#fff; font-size:10px; font-weight:700; padding:2px 8px; border-radius:4px; margin-left:6px; vertical-align:middle; letter-spacing:0.5px; }
      .ad-admin-bar { background:#0d1b2a; border:1px solid #1b3a5c; border-radius:8px; padding:10px 16px; margin-bottom:16px; display:flex; align-items:center; justify-content:space-between; gap:8px; flex-wrap:wrap; }
      .ad-admin-bar span { color:#5ba3e6; font-size:13px; font-weight:600; }
      .ad-admin-bar .ad-admin-actions { display:flex; gap:6px; }
      .ad-admin-bar button { background:none; border:1px solid #1b3a5c; border-radius:6px; color:#5ba3e6; font-size:12px; padding:4px 12px; cursor:pointer; font-family:inherit; }
      .ad-admin-bar button:hover { background:#1b3a5c; }
      .ad-admin-bar button.ad-danger { border-color:#5c1b1b; color:#e55; }
      .ad-admin-bar button.ad-danger:hover { background:#5c1b1b; }
      .ad-login-modal { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.7); z-index:999; align-items:center; justify-content:center; }
      .ad-login-modal.show { display:flex; }
      .ad-login-box { background:#141414; border:1px solid #333; border-radius:12px; padding:24px; width:320px; }
      .ad-login-box h3 { color:#fff; font-size:16px; margin-bottom:12px; }
      .ad-login-box input { width:100%; background:#1a1a1a; border:1px solid #333; border-radius:8px; color:#e0e0e0; font-family:inherit; font-size:14px; padding:10px 12px; outline:none; margin-bottom:12px; }
      .ad-login-box input:focus { border-color:#555; }
      .ad-login-box .ad-login-actions { display:flex; gap:8px; justify-content:flex-end; }
      .ad-login-box .ad-login-actions button { padding:8px 16px; border-radius:8px; font-family:inherit; font-size:13px; font-weight:600; cursor:pointer; border:none; }
      .ad-login-cancel { background:#222; color:#999; }
      .ad-login-submit { background:#0a66c2; color:#fff; }
      .ad-login-error { color:#e55; font-size:12px; margin-bottom:8px; display:none; }
      .ad-new { background:#141414; border:1px solid #222; border-radius:12px; padding:20px; margin-bottom:24px; display:none; }
      .ad-new.show { display:block; }
      .ad-new textarea { width:100%; background:#1a1a1a; border:1px solid #333; border-radius:8px; color:#e0e0e0; font-family:inherit; font-size:14px; padding:12px; resize:vertical; min-height:80px; outline:none; transition:border-color 0.2s; }
      .ad-new textarea:focus { border-color:#555; }
      .ad-new input[type=text] { width:100%; background:#1a1a1a; border:1px solid #333; border-radius:8px; color:#e0e0e0; font-family:inherit; font-size:14px; padding:10px 12px; outline:none; margin-bottom:10px; transition:border-color 0.2s; }
      .ad-new input[type=text]:focus { border-color:#555; }
      .ad-new-row { display:flex; gap:10px; margin-top:10px; align-items:center; flex-wrap:wrap; }
      .ad-new input[type=text] { flex:1; margin-bottom:0; }
      .ad-btn { background:#e0e0e0; color:#0a0a0a; border:none; border-radius:8px; padding:10px 20px; font-family:inherit; font-size:14px; font-weight:600; cursor:pointer; transition:background 0.2s; white-space:nowrap; }
      .ad-btn:hover { background:#fff; }
      .ad-img-label { display:inline-flex; align-items:center; gap:4px; background:#1a1a1a; border:1px solid #333; border-radius:8px; padding:8px 14px; font-size:13px; color:#999; cursor:pointer; transition:all 0.2s; }
      .ad-img-label:hover { border-color:#555; color:#ccc; }
      .ad-img-label input { display:none; }
      .ad-img-preview { margin-top:10px; position:relative; display:inline-block; }
      .ad-img-preview img { max-width:200px; max-height:150px; border-radius:8px; border:1px solid #333; }
      .ad-img-preview .ad-img-remove { position:absolute; top:-6px; right:-6px; background:#333; color:#fff; border:none; border-radius:50%; width:20px; height:20px; font-size:12px; cursor:pointer; display:flex; align-items:center; justify-content:center; }
      .ad-post { background:#141414; border:1px solid #222; border-radius:12px; padding:20px; margin-bottom:16px; transition:border-color 0.2s; }
      .ad-post:hover { border-color:#333; }
      .ad-post.admin-post { border-color:#1b3a5c; background:#0d1520; }
      .ad-post.admin-post:hover { border-color:#2a5a8c; }
      .ad-post-head { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; }
      .ad-post-author { font-size:13px; font-weight:600; color:#999; }
      .ad-post-time { font-size:12px; color:#555; }
      .ad-post-title { font-size:18px; font-weight:700; color:#fff; margin-bottom:8px; line-height:1.3; }
      .ad-post-body { font-size:14px; color:#ccc; line-height:1.7; white-space:pre-wrap; word-break:break-word; }
      .ad-post-img { margin-top:12px; }
      .ad-post-img img { max-width:100%; border-radius:8px; border:1px solid #222; cursor:pointer; transition:transform 0.2s; }
      .ad-post-img img:hover { transform:scale(1.01); }
      .ad-post-actions { display:flex; gap:6px; margin-top:14px; padding-top:12px; border-top:1px solid #222; flex-wrap:wrap; }
      .ad-react-btn { background:#1a1a1a; border:1px solid #333; border-radius:20px; padding:5px 12px; font-size:13px; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; gap:4px; color:#999; }
      .ad-react-btn:hover { border-color:#555; background:#222; }
      .ad-react-btn.active { border-color:#555; background:#222; color:#fff; }
      .ad-react-count { font-size:12px; font-weight:600; }
      .ad-comments-toggle { background:none; border:none; color:#666; font-size:13px; cursor:pointer; padding:5px 0; font-family:inherit; margin-left:auto; }
      .ad-comments-toggle:hover { color:#999; }
      .ad-comments { margin-top:12px; padding-top:12px; border-top:1px solid #1a1a1a; }
      .ad-comment { padding:8px 0; }
      .ad-comment + .ad-comment { border-top:1px solid #1a1a1a; }
      .ad-comment-head { display:flex; gap:8px; align-items:center; margin-bottom:4px; }
      .ad-comment-author { font-size:12px; font-weight:600; color:#777; }
      .ad-comment-time { font-size:11px; color:#444; }
      .ad-comment-body { font-size:13px; color:#bbb; line-height:1.5; }
      .ad-comment-form { display:flex; gap:8px; margin-top:10px; }
      .ad-comment-form input { flex:1; background:#1a1a1a; border:1px solid #333; border-radius:8px; color:#e0e0e0; font-family:inherit; font-size:13px; padding:8px 12px; outline:none; }
      .ad-comment-form input:focus { border-color:#555; }
      .ad-comment-form button { background:#333; color:#ccc; border:none; border-radius:8px; padding:8px 14px; font-family:inherit; font-size:13px; font-weight:600; cursor:pointer; }
      .ad-comment-form button:hover { background:#444; }
      .ad-empty { text-align:center; padding:60px 0; color:#444; }
      .ad-empty p { font-size:14px; }
      .ad-delete { background:none; border:none; color:#444; font-size:12px; cursor:pointer; padding:2px 6px; border-radius:4px; }
      .ad-delete:hover { color:#e55; background:#2a1515; }
      .ad-footer { text-align:center; padding:24px 0; color:#333; font-size:11px; }
      .ad-lightbox { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.9); z-index:1000; align-items:center; justify-content:center; cursor:zoom-out; }
      .ad-lightbox.show { display:flex; }
      .ad-lightbox img { max-width:90vw; max-height:90vh; border-radius:8px; }
      @media(max-width:480px) { .ad-wrap { padding:12px 10px 40px; } .ad-new { padding:14px; } .ad-post { padding:14px; } }
    `;
    document.head.appendChild(style);
  }

  function render() {
    root.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'ad-wrap';

    const header = document.createElement('div');
    header.className = 'ad-header';
    header.innerHTML = `
      <h1>After Dark</h1>
      <p>Anonymous comments and reactions</p>
      <button class="ad-login-btn" id="ad-login-toggle">${isAdmin ? '🔒 Admin' : '🔑 Admin'}</button>
    `;
    wrap.appendChild(header);

    if (isAdmin) {
      const bar = document.createElement('div');
      bar.className = 'ad-admin-bar';
      bar.innerHTML = `
        <span>Admin Mode Active</span>
        <div class="ad-admin-actions">
          <button id="ad-clear-posts" class="ad-danger">Clear All Posts</button>
          <button id="ad-logout">Logout</button>
        </div>
      `;
      wrap.appendChild(bar);
      bar.querySelector('#ad-logout').addEventListener('click', () => {
        localStorage.removeItem(LS_ADMIN);
        isAdmin = false;
        render();
      });
      bar.querySelector('#ad-clear-posts').addEventListener('click', () => {
        if (confirm('Delete ALL posts? This cannot be undone.')) {
          data.posts = [];
          saveData();
          renderPosts();
        }
      });
    }

    const modal = document.createElement('div');
    modal.className = 'ad-login-modal';
    modal.id = 'ad-login-modal';
    modal.innerHTML = `
      <div class="ad-login-box">
        <h3>Admin Login</h3>
        <div class="ad-login-error" id="ad-login-err">Incorrect password</div>
        <input type="password" id="ad-pw" placeholder="Password">
        <div class="ad-login-actions">
          <button class="ad-login-cancel" id="ad-login-cancel">Cancel</button>
          <button class="ad-login-submit" id="ad-login-submit">Login</button>
        </div>
      </div>
    `;
    wrap.appendChild(modal);

    const newPost = document.createElement('div');
    newPost.className = 'ad-new' + (isAdmin ? ' show' : '');
    newPost.innerHTML = `
      <input type="text" id="ad-title" placeholder="Title" maxlength="120">
      <textarea id="ad-body" placeholder="Write something..." rows="3"></textarea>
      <div id="ad-img-preview-container"></div>
      <div class="ad-new-row">
        <button class="ad-btn" id="ad-submit">Post</button>
        <label class="ad-img-label">
          📷 Image
          <input type="file" id="ad-img-input" accept="image/*">
        </label>
      </div>
    `;
    wrap.appendChild(newPost);

    const postsDiv = document.createElement('div');
    postsDiv.id = 'ad-posts';
    wrap.appendChild(postsDiv);

    const footer = document.createElement('div');
    footer.className = 'ad-footer';
    footer.textContent = 'After Dark · All data stored locally in your browser only';
    wrap.appendChild(footer);

    const lightbox = document.createElement('div');
    lightbox.className = 'ad-lightbox';
    lightbox.id = 'ad-lightbox';
    lightbox.innerHTML = '<img src="" alt="">';
    lightbox.addEventListener('click', () => lightbox.classList.remove('show'));
    wrap.appendChild(lightbox);

    root.appendChild(wrap);

    document.getElementById('ad-submit').addEventListener('click', createPost);

    const imgInput = document.getElementById('ad-img-input');
    let pendingImage = null;
    imgInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 10 * 1024 * 1024) { alert('Image must be under 10MB'); return; }
      pendingImage = await compressImage(file, 1200, 900, 0.8);
      const container = document.getElementById('ad-img-preview-container');
      container.innerHTML = `<div class="ad-img-preview"><img src="${pendingImage}" alt="Preview"><button class="ad-img-remove" id="ad-img-remove">✕</button></div>`;
      document.getElementById('ad-img-remove').addEventListener('click', () => {
        pendingImage = null;
        container.innerHTML = '';
        imgInput.value = '';
      });
    });

    document.getElementById('ad-login-toggle').addEventListener('click', () => {
      document.getElementById('ad-login-modal').classList.add('show');
      document.getElementById('ad-pw').value = '';
      document.getElementById('ad-login-err').style.display = 'none';
      document.getElementById('ad-pw').focus();
    });
    document.getElementById('ad-login-cancel').addEventListener('click', () => {
      document.getElementById('ad-login-modal').classList.remove('show');
    });
    document.getElementById('ad-login-submit').addEventListener('click', () => {
      const pw = document.getElementById('ad-pw').value;
      if (pw === ADMIN_PW) {
        localStorage.setItem(LS_ADMIN, '1');
        isAdmin = true;
        document.getElementById('ad-login-modal').classList.remove('show');
        render();
      } else {
        document.getElementById('ad-login-err').style.display = 'block';
      }
    });
    document.getElementById('ad-pw').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('ad-login-submit').click();
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('show');
    });

    renderPosts();
  }

  function createPost() {
    const titleEl = document.getElementById('ad-title');
    const bodyEl = document.getElementById('ad-body');
    const imgInput = document.getElementById('ad-img-input');
    const title = titleEl.value.trim();
    const body = bodyEl.value.trim();
    if (!title && !body) return;

    const imgPreview = document.querySelector('#ad-img-preview-container .ad-img-preview img');
    const image = imgPreview ? imgPreview.src : null;

    const post = {
      id: genId(),
      author: 'Admin',
      title: title,
      body: body,
      image: image,
      timestamp: Date.now(),
      admin: true,
      reactions: {},
      comments: []
    };
    REACTIONS.forEach(r => post.reactions[r] = []);
    data.posts.unshift(post);
    saveData();
    titleEl.value = '';
    bodyEl.value = '';
    document.getElementById('ad-img-preview-container').innerHTML = '';
    if (imgInput) imgInput.value = '';
    renderPosts();
  }

  function renderPosts() {
    const container = document.getElementById('ad-posts');
    if (!container) return;
    container.innerHTML = '';

    if (data.posts.length === 0) {
      container.innerHTML = '<div class="ad-empty"><p>No posts yet.</p></div>';
      return;
    }

    data.posts.forEach(post => {
      const el = document.createElement('div');
      el.className = 'ad-post' + (post.admin ? ' admin-post' : '');
      el.dataset.id = post.id;

      const myId = getVisitorId();
      const titleHtml = post.title ? `<div class="ad-post-title">${escapeHtml(post.title)}</div>` : '';
      const badgeHtml = post.admin ? '<span class="ad-admin-badge">ADMIN</span>' : '';
      const imgHtml = post.image ? `<div class="ad-post-img"><img src="${post.image}" alt="Post image"></div>` : '';

      let reactionsHtml = REACTIONS.map(r => {
        const count = (post.reactions[r] || []).length;
        const active = (post.reactions[r] || []).includes(myId) ? ' active' : '';
        return `<button class="ad-react-btn${active}" data-post="${post.id}" data-reaction="${r}">${REACTION_EMOJI[r]}<span class="ad-react-count">${count || ''}</span></button>`;
      }).join('');

      el.innerHTML = `
        <div class="ad-post-head">
          <div>
            <div class="ad-post-author">${escapeHtml(post.author)}${badgeHtml}</div>
            <div class="ad-post-time">${timeAgo(post.timestamp)}</div>
          </div>
          <button class="ad-delete" data-delete="${post.id}" title="Delete">✕</button>
        </div>
        ${titleHtml}
        <div class="ad-post-body">${escapeHtml(post.body)}</div>
        ${imgHtml}
        <div class="ad-post-actions">
          ${reactionsHtml}
          <button class="ad-comments-toggle" data-toggle="${post.id}">💬 ${post.comments.length}</button>
        </div>
        <div class="ad-comments" id="ad-c-${post.id}" style="display:none"></div>
      `;
      container.appendChild(el);
    });

    container.querySelectorAll('.ad-post-img img').forEach(img => {
      img.addEventListener('click', () => {
        const lb = document.getElementById('ad-lightbox');
        lb.querySelector('img').src = img.src;
        lb.classList.add('show');
      });
    });
    container.querySelectorAll('.ad-react-btn').forEach(btn => {
      btn.addEventListener('click', () => toggleReaction(btn.dataset.post, btn.dataset.reaction));
    });
    container.querySelectorAll('.ad-comments-toggle').forEach(btn => {
      btn.addEventListener('click', () => toggleComments(btn.dataset.toggle));
    });
    container.querySelectorAll('.ad-delete').forEach(btn => {
      btn.addEventListener('click', () => deletePost(btn.dataset.delete));
    });
  }

  function toggleReaction(postId, reaction) {
    const post = data.posts.find(p => p.id === postId);
    if (!post) return;
    const myId = getVisitorId();
    if (!post.reactions[reaction]) post.reactions[reaction] = [];
    const idx = post.reactions[reaction].indexOf(myId);
    if (idx === -1) {
      post.reactions[reaction].push(myId);
    } else {
      post.reactions[reaction].splice(idx, 1);
    }
    saveData();
    renderPosts();
  }

  function toggleComments(postId) {
    const el = document.getElementById('ad-c-' + postId);
    if (!el) return;
    if (el.style.display === 'none') {
      el.style.display = 'block';
      renderComments(postId, el);
    } else {
      el.style.display = 'none';
    }
  }

  function renderComments(postId, container) {
    const post = data.posts.find(p => p.id === postId);
    if (!post) return;
    container.innerHTML = '';

    post.comments.forEach((c) => {
      const div = document.createElement('div');
      div.className = 'ad-comment';
      const badgeHtml = c.admin ? '<span class="ad-admin-badge">ADMIN</span>' : '';
      div.innerHTML = `
        <div class="ad-comment-head">
          <span class="ad-comment-author">${escapeHtml(c.author)}${badgeHtml}</span>
          <span class="ad-comment-time">${timeAgo(c.timestamp)}</span>
        </div>
        <div class="ad-comment-body">${escapeHtml(c.body)}</div>
      `;
      container.appendChild(div);
    });

    const form = document.createElement('div');
    form.className = 'ad-comment-form';
    form.innerHTML = `<input type="text" placeholder="Anonymous comment..." maxlength="500"><button>Send</button>`;
    const input = form.querySelector('input');
    const rateMsg = document.createElement('div');
    rateMsg.style.cssText = 'color:#e55;font-size:12px;margin-top:6px;display:none;';
    form.appendChild(rateMsg);
    form.querySelector('button').addEventListener('click', () => {
      const body = input.value.trim();
      if (!body) return;
      const rate = checkRateLimit();
      if (!rate.ok) {
        rateMsg.textContent = `Slow down. Try again in ${rate.wait} min.`;
        rateMsg.style.display = 'block';
        return;
      }
      rateMsg.style.display = 'none';
      post.comments.push({
        author: isAdmin ? 'Admin' : 'Anonymous',
        body: body,
        timestamp: Date.now(),
        admin: isAdmin
      });
      saveData();
      renderComments(postId, container);
      const toggleBtn = document.querySelector(`[data-toggle="${postId}"]`);
      if (toggleBtn) toggleBtn.textContent = '💬 ' + post.comments.length;
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') form.querySelector('button').click();
    });
    container.appendChild(form);
  }

  function deletePost(postId) {
    if (!confirm('Delete this post?')) return;
    data.posts = data.posts.filter(p => p.id !== postId);
    saveData();
    renderPosts();
  }

  function getVisitorId() {
    let id = localStorage.getItem('ad_vid');
    if (!id) {
      id = genId();
      localStorage.setItem('ad_vid', id);
    }
    return id;
  }

  function checkRateLimit() {
    if (isAdmin) return { ok: true };
    const vid = getVisitorId();
    let rates = {};
    try { rates = JSON.parse(localStorage.getItem(LS_RATE)) || {}; } catch(e) {}
    const now = Date.now();
    const timestamps = (rates[vid] || []).filter(t => now - t < RATE_WINDOW);
    if (timestamps.length >= RATE_LIMIT) {
      const oldest = timestamps[0];
      const wait = Math.ceil((RATE_WINDOW - (now - oldest)) / 60000);
      return { ok: false, wait: wait };
    }
    timestamps.push(now);
    rates[vid] = timestamps;
    localStorage.setItem(LS_RATE, JSON.stringify(rates));
    return { ok: true };
  }

  injectStyles();
  render();
};
