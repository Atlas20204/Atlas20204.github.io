/* Module */
window._xi = function(_root) {
  var _k = 'ad_data', _a = 'ad_admin', _r = 'ad_rate';
  var _pw = atob('YWZ0ZXJkYXJrMjAyNQ==');
  var _rx = ['like','heart','fire','think','laugh'];
  var _em = {like:'👍',heart:'❤️',fire:'🔥',think:'🤔',laugh:'😂'};
  var _d = _ld(), _am = !!localStorage.getItem(_a);

  function _ld() { try { var _ = localStorage.getItem(_k); if (_) return JSON.parse(_); } catch(e) {} return {posts:[]}; }
  function _sv() { localStorage.setItem(_k, JSON.stringify(_d)); }
  function _gi() { return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }
  function _ta(t) { var _=Date.now()-t,m=Math.floor(_/60000); if(m<1)return 'just now'; if(m<60)return m+'m ago'; var h=Math.floor(m/60); if(h<24)return h+'h ago'; var d=Math.floor(h/24); if(d<30)return d+'d ago'; return Math.floor(d/30)+'mo ago'; }
  function _es(s) { var _=document.createElement('div');_.textContent=s;return _.innerHTML; }

  function _ci(f,mw,mh,q) {
    return new Promise(function(r) {
      var rd = new FileReader();
      rd.onload = function(e) {
        var im = new Image();
        im.onload = function() {
          var w=im.width,h=im.height;
          if(w>mw){h=h*mw/w;w=mw;}
          if(h>mh){w=w*mh/h;h=mh;}
          var c=document.createElement('canvas');c.width=w;c.height=h;
          c.getContext('2d').drawImage(im,0,0,w,h);
          r(c.toDataURL('image/jpeg',q));
        };
        im.src=e.target.result;
      };
      rd.readAsDataURL(f);
    });
  }

  function _rl() {
    if(_am) return {ok:true};
    var _v=_vi(),_n=Date.now(),_rt={};
    try{_rt=JSON.parse(localStorage.getItem(_r))||{};}catch(e){}
    var _ts=(_rt[_v]||[]).filter(function(t){return _n-t<600000;});
    if(_ts.length>=5){return{ok:false,w:Math.ceil((600000-(_n-_ts[0]))/60000)};}
    _ts.push(_n);_rt[_v]=_ts;localStorage.setItem(_r,JSON.stringify(_rt));
    return{ok:true};
  }

  function _vi() { var _=localStorage.getItem('ad_vid'); if(!_){_=_gi();localStorage.setItem('ad_vid',_);} return _; }

  function _is() {
    var _s=document.createElement('style');
    _s.textContent='@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");*{margin:0;padding:0;box-sizing:border-box}body{font-family:"Inter",-apple-system,BlinkMacSystemFont,sans-serif;background:#0a0a0a;color:#e0e0e0;min-height:100vh}._w{max-width:680px;margin:0 auto;padding:20px 16px 60px}._h{text-align:center;padding:32px 0 24px;border-bottom:1px solid #222;margin-bottom:24px;position:relative}._h h1{font-size:28px;font-weight:700;color:#fff;letter-spacing:-0.5px}._h p{font-size:13px;color:#666;margin-top:6px}._lb{position:absolute;top:0;right:0;background:none;border:1px solid #333;border-radius:6px;color:#555;font-size:11px;padding:4px 10px;cursor:pointer;font-family:inherit}._lb:hover{border-color:#555;color:#888}._ab{display:inline-block;background:linear-gradient(135deg,#0a66c2,#004182);color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;margin-left:6px;vertical-align:middle;letter-spacing:.5px}._abr{background:#0d1b2a;border:1px solid #1b3a5c;border-radius:8px;padding:10px 16px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}._abr span{color:#5ba3e6;font-size:13px;font-weight:600}._abr ._-a{display:flex;gap:6px}._abr button{background:none;border:1px solid #1b3a5c;border-radius:6px;color:#5ba3e6;font-size:12px;padding:4px 12px;cursor:pointer;font-family:inherit}._abr button:hover{background:#1b3a5c}._abr button._dx{border-color:#5c1b1b;color:#e55}._abr button._dx:hover{background:#5c1b1b}._mm{display:none;position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:999;align-items:center;justify-content:center}._mm.show{display:flex}._mx{background:#141414;border:1px solid #333;border-radius:12px;padding:24px;width:320px}._mx h3{color:#fff;font-size:16px;margin-bottom:12px}._mx input{width:100%;background:#1a1a1a;border:1px solid #333;border-radius:8px;color:#e0e0e0;font-family:inherit;font-size:14px;padding:10px 12px;outline:none;margin-bottom:12px}._mx input:focus{border-color:#555}._mx ._la{display:flex;gap:8px;justify-content:flex-end}._mx ._la button{padding:8px 16px;border-radius:8px;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;border:none}._cn{background:#222;color:#999}._cs{background:#0a66c2;color:#fff}._le{color:#e55;font-size:12px;margin-bottom:8px;display:none}._n{background:#141414;border:1px solid #222;border-radius:12px;padding:20px;margin-bottom:24px;display:none}._n.show{display:block}._n textarea{width:100%;background:#1a1a1a;border:1px solid #333;border-radius:8px;color:#e0e0e0;font-family:inherit;font-size:14px;padding:12px;resize:vertical;min-height:80px;outline:none;transition:border-color .2s}._n textarea:focus{border-color:#555}._n input[type=text]{width:100%;background:#1a1a1a;border:1px solid #333;border-radius:8px;color:#e0e0e0;font-family:inherit;font-size:14px;padding:10px 12px;outline:none;margin-bottom:10px;transition:border-color .2s}._n input[type=text]:focus{border-color:#555}._nr{display:flex;gap:10px;margin-top:10px;align-items:center;flex-wrap:wrap}._n input[type=text]{flex:1;margin-bottom:0}._bt{background:#e0e0e0;color:#0a0a0a;border:none;border-radius:8px;padding:10px 20px;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;transition:background .2s;white-space:nowrap}._bt:hover{background:#fff}._il{display:inline-flex;align-items:center;gap:4px;background:#1a1a1a;border:1px solid #333;border-radius:8px;padding:8px 14px;font-size:13px;color:#999;cursor:pointer;transition:all .2s}._il:hover{border-color:#555;color:#ccc}._il input{display:none}._ip{margin-top:10px;position:relative;display:inline-block}._ip img{max-width:200px;max-height:150px;border-radius:8px;border:1px solid #333}._ip ._ir{position:absolute;top:-6px;right:-6px;background:#333;color:#fff;border:none;border-radius:50%;width:20px;height:20px;font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center}._p{background:#141414;border:1px solid #222;border-radius:12px;padding:20px;margin-bottom:16px;transition:border-color .2s}._p:hover{border-color:#333}._p._ap{border-color:#1b3a5c;background:#0d1520}._p._ap:hover{border-color:#2a5a8c}._ph{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px}._pa{font-size:13px;font-weight:600;color:#999}._pt{font-size:12px;color:#555}._ptt{font-size:18px;font-weight:700;color:#fff;margin-bottom:8px;line-height:1.3}._pb{font-size:14px;color:#ccc;line-height:1.7;white-space:pre-wrap;word-break:break-word}._pi{margin-top:12px}._pi img{max-width:100%;border-radius:8px;border:1px solid #222;cursor:pointer;transition:transform .2s}._pi img:hover{transform:scale(1.01)}._pa2{display:flex;gap:6px;margin-top:14px;padding-top:12px;border-top:1px solid #222;flex-wrap:wrap}._rb{background:#1a1a1a;border:1px solid #333;border-radius:20px;padding:5px 12px;font-size:13px;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:4px;color:#999}._rb:hover{border-color:#555;background:#222}._rb.active{border-color:#555;background:#222;color:#fff}._rc{font-size:12px;font-weight:600}._ct{background:none;border:none;color:#666;font-size:13px;cursor:pointer;padding:5px 0;font-family:inherit;margin-left:auto}._ct:hover{color:#999}._cs2{margin-top:12px;padding-top:12px;border-top:1px solid #1a1a1a}._cm{padding:8px 0}._cm+._cm{border-top:1px solid #1a1a1a}._cmh{display:flex;gap:8px;align-items:center;margin-bottom:4px}._cma{font-size:12px;font-weight:600;color:#777}._cmt{font-size:11px;color:#444}._cmb{font-size:13px;color:#bbb;line-height:1.5}._cf{display:flex;gap:8px;margin-top:10px}._cf input{flex:1;background:#1a1a1a;border:1px solid #333;border-radius:8px;color:#e0e0e0;font-family:inherit;font-size:13px;padding:8px 12px;outline:none}._cf input:focus{border-color:#555}._cf button{background:#333;color:#ccc;border:none;border-radius:8px;padding:8px 14px;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer}._cf button:hover{background:#444}._e{text-align:center;padding:60px 0;color:#444}._e p{font-size:14px}._dl{background:none;border:none;color:#444;font-size:12px;cursor:pointer;padding:2px 6px;border-radius:4px}._dl:hover{color:#e55;background:#2a1515}._f{text-align:center;padding:24px 0;color:#333;font-size:11px}._lb2{display:none;position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:1000;align-items:center;justify-content:center;cursor:zoom-out}._lb2.show{display:flex}._lb2 img{max-width:90vw;max-height:90vh;border-radius:8px}@media(max-width:480px){._w{padding:12px 10px 40px}._n{padding:14px}._p{padding:14px}}';
    document.head.appendChild(_s);
  }

  function _rd() {
    _root.innerHTML = '';
    var _w = document.createElement('div'); _w.className = '_w';

    var _h = document.createElement('div'); _h.className = '_h';
    _h.innerHTML = '<h1>After Dark</h1><p>Anonymous comments and reactions</p><button class="_lb" id="_lt">' + (_am ? '🔒 Admin' : '🔑 Admin') + '</button>';
    _w.appendChild(_h);

    if (_am) {
      var _br = document.createElement('div'); _br.className = '_abr';
      _br.innerHTML = '<span>Admin Mode Active</span><div class="_-a"><button id="_cp" class="_dx">Clear All Posts</button><button id="_lo">Logout</button></div>';
      _w.appendChild(_br);
      _br.querySelector('#_lo').addEventListener('click', function(){localStorage.removeItem(_a);_am=false;_rd();});
      _br.querySelector('#_cp').addEventListener('click', function(){if(confirm('Delete ALL posts? This cannot be undone.')){_d.posts=[];_sv();_rp();}});
    }

    var _mm = document.createElement('div'); _mm.className = '_mm'; _mm.id = '_mm';
    _mm.innerHTML = '<div class="_mx"><h3>Admin Login</h3><div class="_le" id="_er">Incorrect password</div><input type="password" id="_pw" placeholder="Password"><div class="_la"><button class="_cn" id="_lc">Cancel</button><button class="_cs" id="_ls">Login</button></div></div>';
    _w.appendChild(_mm);

    var _n = document.createElement('div'); _n.className = '_n' + (_am ? ' show' : '');
    _n.innerHTML = '<input type="text" id="_tt" placeholder="Title" maxlength="120"><textarea id="_bd" placeholder="Write something..." rows="3"></textarea><div id="_ipc"></div><div class="_nr"><button class="_bt" id="_sb">Post</button><label class="_il">📷 Image<input type="file" id="_ii" accept="image/*"></label></div>';
    _w.appendChild(_n);

    var _ps = document.createElement('div'); _ps.id = '_ps'; _w.appendChild(_ps);

    var _f = document.createElement('div'); _f.className = '_f'; _f.textContent = 'After Dark · All data stored locally in your browser only'; _w.appendChild(_f);

    var _lb = document.createElement('div'); _lb.className = '_lb2'; _lb.id = '_lb2'; _lb.innerHTML = '<img src="" alt="">';
    _lb.addEventListener('click', function(){_lb.classList.remove('show');});
    _w.appendChild(_lb);

    _root.appendChild(_w);

    document.getElementById('_sb').addEventListener('click', _cp2);

    var _ii = document.getElementById('_ii'), _pi = null;
    _ii.addEventListener('change', function(e) {
      var f = e.target.files[0]; if(!f) return;
      if(f.size>10485760){alert('Image must be under 10MB');return;}
      _ci(f,1200,900,0.8).then(function(d){_pi=d;
        document.getElementById('_ipc').innerHTML='<div class="_ip"><img src="'+d+'" alt=""><button class="_ir" id="_ir2">✕</button></div>';
        document.getElementById('_ir2').addEventListener('click',function(){_pi=null;document.getElementById('_ipc').innerHTML='';_ii.value='';});
      });
    });

    document.getElementById('_lt').addEventListener('click',function(){
      document.getElementById('_mm').classList.add('show');
      document.getElementById('_pw').value='';
      document.getElementById('_er').style.display='none';
      document.getElementById('_pw').focus();
    });
    document.getElementById('_lc').addEventListener('click',function(){document.getElementById('_mm').classList.remove('show');});
    document.getElementById('_ls').addEventListener('click',function(){
      if(document.getElementById('_pw').value===_pw){localStorage.setItem(_a,'1');_am=true;document.getElementById('_mm').classList.remove('show');_rd();}
      else{document.getElementById('_er').style.display='block';}
    });
    document.getElementById('_pw').addEventListener('keydown',function(e){if(e.key==='Enter')document.getElementById('_ls').click();});
    _mm.addEventListener('click',function(e){if(e.target===_mm)_mm.classList.remove('show');});

    _rp();
  }

  function _cp2() {
    var _t = document.getElementById('_tt').value.trim();
    var _b = document.getElementById('_bd').value.trim();
    if(!_t && !_b) return;
    var _im = document.querySelector('#_ipc ._ip img');
    var _p = {id:_gi(),author:'Admin',title:_t,body:_b,image:_im?_im.src:null,timestamp:Date.now(),admin:true,reactions:{},comments:[]};
    _rx.forEach(function(r){_p.reactions[r]=[];});
    _d.posts.unshift(_p);_sv();
    document.getElementById('_tt').value='';
    document.getElementById('_bd').value='';
    document.getElementById('_ipc').innerHTML='';
    document.getElementById('_ii').value='';
    _rp();
  }

  function _rp() {
    var _c = document.getElementById('_ps'); if(!_c) return; _c.innerHTML = '';
    if(!_d.posts.length){_c.innerHTML='<div class="_e"><p>No posts yet.</p></div>';return;}
    _d.posts.forEach(function(p) {
      var _e = document.createElement('div'); _e.className = '_p' + (p.admin ? ' _ap' : ''); _e.dataset.id = p.id;
      var _vi2 = _vi();
      var _th = p.title ? '<div class="_ptt">'+_es(p.title)+'</div>' : '';
      var _bh = p.admin ? '<span class="_ab">ADMIN</span>' : '';
      var _ih = p.image ? '<div class="_pi"><img src="'+p.image+'" alt=""></div>' : '';
      var _rh = _rx.map(function(r){var _c2=(p.reactions[r]||[]).length,_a2=(p.reactions[r]||[]).indexOf(_vi2)!==-1?' active':'';return '<button class="_rb'+_a2+'" data-post="'+p.id+'" data-reaction="'+r+'">'+_em[r]+'<span class="_rc">'+(_c2||'')+'</span></button>';}).join('');
      _e.innerHTML='<div class="_ph"><div><div class="_pa">'+_es(p.author)+_bh+'</div><div class="_pt">'+_ta(p.timestamp)+'</div></div><button class="_dl" data-delete="'+p.id+'" title="Delete">✕</button></div>'+_th+'<div class="_pb">'+_es(p.body)+'</div>'+_ih+'<div class="_pa2">'+_rh+'<button class="_ct" data-toggle="'+p.id+'">💬 '+p.comments.length+'</button></div><div class="_cs2" id="_c_'+p.id+'" style="display:none"></div>';
      _c.appendChild(_e);
    });
    _c.querySelectorAll('._pi img').forEach(function(img){img.addEventListener('click',function(){var _l=document.getElementById('_lb2');_l.querySelector('img').src=img.src;_l.classList.add('show');});});
    _c.querySelectorAll('._rb').forEach(function(b){b.addEventListener('click',function(){_tr(b.dataset.post,b.dataset.reaction);});});
    _c.querySelectorAll('._ct').forEach(function(b){b.addEventListener('click',function(){_tc(b.dataset.toggle);});});
    _c.querySelectorAll('._dl').forEach(function(b){b.addEventListener('click',function(){_dp(b.dataset.delete);});});
  }

  function _tr(pid,rx) {
    var p=_d.posts.find(function(x){return x.id===pid;}); if(!p) return;
    var _v=_vi(); if(!p.reactions[rx])p.reactions[rx]=[];
    var i=p.reactions[rx].indexOf(_v);
    if(i===-1){p.reactions[rx].push(_v);}else{p.reactions[rx].splice(i,1);}
    _sv();_rp();
  }

  function _tc(pid) {
    var _e=document.getElementById('_c_'+pid); if(!_e) return;
    if(_e.style.display==='none'){_e.style.display='block';_cmr(pid,_e);}else{_e.style.display='none';}
  }

  function _cmr(pid,container) {
    var p=_d.posts.find(function(x){return x.id===pid;}); if(!p) return;
    container.innerHTML='';
    p.comments.forEach(function(c){
      var _d2=document.createElement('div');_d2.className='_cm';
      var _bh=c.admin?'<span class="_ab">ADMIN</span>':'';
      _d2.innerHTML='<div class="_cmh"><span class="_cma">'+_es(c.author)+_bh+'</span><span class="_cmt">'+_ta(c.timestamp)+'</span></div><div class="_cmb">'+_es(c.body)+'</div>';
      container.appendChild(_d2);
    });
    var _f=document.createElement('div');_f.className='_cf';
    _f.innerHTML='<input type="text" placeholder="Anonymous comment..." maxlength="500"><button>Send</button>';
    var _rm=document.createElement('div');_rm.style.cssText='color:#e55;font-size:12px;margin-top:6px;display:none;';_f.appendChild(_rm);
    _f.querySelector('button').addEventListener('click',function(){
      var _b=_f.querySelector('input').value.trim(); if(!_b) return;
      var _rl2=_rl(); if(!_rl2.ok){_rm.textContent='Slow down. Try again in '+_rl2.w+' min.';_rm.style.display='block';return;}
      _rm.style.display='none';
      p.comments.push({author:_am?'Admin':'Anonymous',body:_b,timestamp:Date.now(),admin:_am});
      _sv();_cmr(pid,container);
      var _tb=document.querySelector('[data-toggle="'+pid+'"]');if(_tb)_tb.textContent='💬 '+p.comments.length;
    });
    _f.querySelector('input').addEventListener('keydown',function(e){if(e.key==='Enter')_f.querySelector('button').click();});
    container.appendChild(_f);
  }

  function _dp(pid) {
    if(!confirm('Delete this post?'))return;
    _d.posts=_d.posts.filter(function(x){return x.id!==pid;});_sv();_rp();
  }

  _is(); _rd();
};
