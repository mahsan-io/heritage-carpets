/* ======================================================================
   HERITAGE CARPET COMPANY — SHARED SCRIPT (bilingual, single-page build)
   Each page contains TWO content blocks: [data-lang="en"] and
   [data-lang="ar"], both fully rendered on load. The language switch
   just toggles which block is visible (hidden attribute) and flips
   <html lang/dir> — no navigation, no reload.

   Because both language blocks exist in the same document at once,
   every render function below is scope-aware: it takes a `root` element
   (one of the two .lang-block containers) and only ever queries inside
   that root, using [data-role="..."] attributes instead of ids. This is
   what makes it safe to render two languages' worth of the same UI
   without them colliding.
   ====================================================================== */
window.Heritage = (function(){

  // TODO: replace with the real store domain, e.g. "https://heritage-carpet.myshopify.com"
  // or a custom checkout domain if one is mapped in Shopify settings.
  const SHOPIFY_STORE = 'https://heritage-carpet.myshopify.com';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Shared icon set (commercial solutions cards) ---------------- */
  const ICONS = {
    hotels: '<path d="M4 21V7l8-4 8 4v14M9 21v-6h6v6" stroke-linecap="round" stroke-linejoin="round"/>',
    offices: '<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M9 4v16M15 4v16" stroke-linecap="round"/>',
    mosques: '<path d="M4 21V11l8-7 8 7v10M8 21v-7a4 4 0 018 0v7" stroke-linecap="round" stroke-linejoin="round"/>',
    retail: '<path d="M4 8l1-4h14l1 4M4 8v12h16V8M4 8h16M10 12v4h4v-4" stroke-linecap="round" stroke-linejoin="round"/>',
    corporate: '<rect x="3" y="10" width="6" height="11"/><rect x="15" y="6" width="6" height="15"/><rect x="9" y="3" width="6" height="18"/>'
  };

  /* ---------------- Reusable SVG motif generator (collections/projects tiles) ---------------- */
  function motifSVG(type, color){
    color = color || '#B08D46';
    const p = '<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">';
    const bg = '<rect width="200" height="200" fill="#1B1714"/>';
    let inner = '';
    if(type==='medallion'){
      inner = '<circle cx="100" cy="100" r="80" stroke="'+color+'" stroke-width="0.6" fill="none"/><circle cx="100" cy="100" r="55" stroke="'+color+'" stroke-width="0.6" fill="none"/><path d="M100 40l28 60-28 60-28-60z" stroke="'+color+'" stroke-width="1.4" fill="none"/><circle cx="100" cy="100" r="10" fill="'+color+'" opacity="0.5"/>';
    } else if(type==='lattice'){
      inner = '';
      for(let i=-2;i<10;i++){ inner += '<line x1="'+(i*24)+'" y1="0" x2="'+(i*24+200)+'" y2="200" stroke="'+color+'" stroke-width="0.5" opacity="0.6"/>'; inner += '<line x1="'+(i*24+200)+'" y1="0" x2="'+(i*24)+'" y2="200" stroke="'+color+'" stroke-width="0.5" opacity="0.6"/>'; }
    } else if(type==='boteh'){
      inner = '';
      for(let x=10;x<200;x+=50){ for(let y=10;y<200;y+=50){ inner += '<path d="M'+x+' '+y+' q18 0 18 22 q0 16 -18 20 q-18 -4 -18 -20 q0 -22 18 -22z" stroke="'+color+'" stroke-width="0.9" fill="none" transform="rotate(15 '+x+' '+y+')"/>'; } }
    } else if(type==='chevron'){
      inner='';
      for(let y=-20;y<220;y+=26){ inner += '<path d="M0 '+y+' L20 '+(y+13)+' L40 '+y+' L60 '+(y+13)+' L80 '+y+' L100 '+(y+13)+' L120 '+y+' L140 '+(y+13)+' L160 '+y+' L180 '+(y+13)+' L200 '+y+'" stroke="'+color+'" stroke-width="0.9" fill="none" opacity="0.7"/>'; }
    } else if(type==='tile'){
      inner='';
      for(let x=0;x<=200;x+=25){ inner += '<line x1="'+x+'" y1="0" x2="'+x+'" y2="200" stroke="'+color+'" stroke-width="0.4" opacity="0.5"/>'; }
      for(let y=0;y<=200;y+=25){ inner += '<line x1="0" y1="'+y+'" x2="200" y2="'+y+'" stroke="'+color+'" stroke-width="0.4" opacity="0.5"/>'; }
    } else if(type==='arch'){
      inner = '<path d="M40 200V110 A60 60 0 0 1 160 110 V200" stroke="'+color+'" stroke-width="1.2" fill="none"/><path d="M60 200V115 A40 40 0 0 1 140 115 V200" stroke="'+color+'" stroke-width="0.6" fill="none"/>';
    } else if(type==='floorplan'){
      inner = '<rect x="30" y="30" width="140" height="140" stroke="'+color+'" stroke-width="1" fill="none"/><line x1="30" y1="100" x2="170" y2="100" stroke="'+color+'" stroke-width="0.6"/><line x1="100" y1="30" x2="100" y2="100" stroke="'+color+'" stroke-width="0.6"/>';
    } else if(type==='sofa'){
      inner = '<rect x="30" y="90" width="140" height="55" rx="8" stroke="'+color+'" stroke-width="1.2" fill="none"/><rect x="20" y="80" width="24" height="70" rx="8" stroke="'+color+'" stroke-width="1.2" fill="none"/><rect x="156" y="80" width="24" height="70" rx="8" stroke="'+color+'" stroke-width="1.2" fill="none"/><line x1="50" y1="90" x2="150" y2="90" stroke="'+color+'" stroke-width="0.6"/>';
    } else {
      inner = '<circle cx="100" cy="100" r="70" stroke="'+color+'" stroke-width="0.8" fill="none"/>';
    }
    return p+bg+inner+'</svg>';
  }

  /* ---------------- Color helpers (bespoke studio preview) ---------------- */
  function hexToRgb(hex){
    hex = hex.replace('#','');
    if(hex.length===3) hex = hex.split('').map(c=>c+c).join('');
    const num = parseInt(hex,16);
    return { r:(num>>16)&255, g:(num>>8)&255, b:num&255 };
  }
  function isDarkColor(hex){
    const {r,g,b} = hexToRgb(hex);
    return (0.299*r + 0.587*g + 0.114*b) < 140;
  }
  function shade(hex, percent){
    const {r,g,b} = hexToRgb(hex);
    const f = percent < 0 ? 0 : 255, p = Math.abs(percent);
    const nr = Math.round((f-r)*p)+r, ng = Math.round((f-g)*p)+g, nb = Math.round((f-b)*p)+b;
    return 'rgb('+nr+','+ng+','+nb+')';
  }

  /* ---------------- Pattern glyphs (bespoke studio) ---------------- */
  function patternIcon(type, color){
    let inner = '';
    if(type==='medallion'){
      inner = '<path d="M100 12l20 18-20 18-20-18z" stroke="'+color+'" stroke-width="1.4" fill="none"/><circle cx="100" cy="30" r="22" stroke="'+color+'" stroke-width="0.6" fill="none"/>';
    } else if(type==='botanical'){
      inner = [0,1,2,3,4].map(i=>'<circle cx="'+(60+i*20)+'" cy="30" r="5" stroke="'+color+'" stroke-width="1" fill="none"/>').join('')+'<circle cx="100" cy="30" r="2.5" fill="'+color+'"/>';
    } else if(type==='geometric'){
      inner = '<path d="M40 30 L60 15 L80 30 L100 15 L120 30 L140 15 L160 30" stroke="'+color+'" stroke-width="1.4" fill="none"/>';
    } else if(type==='abstract'){
      inner = '<path d="M30 40 Q70 5 100 30 T170 20" stroke="'+color+'" stroke-width="1.4" fill="none"/>';
    } else {
      inner = '<line x1="60" y1="30" x2="140" y2="30" stroke="'+color+'" stroke-width="0.8" opacity="0.5"/>';
    }
    return '<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">'+inner+'</svg>';
  }
  function patternGlyph(type, color, cx, cy, r){
    if(type==='medallion'){
      return '<circle cx="'+cx+'" cy="'+cy+'" r="'+(r*0.7)+'" stroke="'+color+'" stroke-width="1" fill="none" opacity="0.85"/>'+
             '<path d="M'+cx+' '+(cy-r*0.5)+'L'+(cx+r*0.5)+' '+cy+'L'+cx+' '+(cy+r*0.5)+'L'+(cx-r*0.5)+' '+cy+'Z" stroke="'+color+'" stroke-width="1.2" fill="none" opacity="0.9"/>';
    } else if(type==='botanical'){
      let s='';
      for(let i=0;i<6;i++){
        const a = (Math.PI*2*i)/6;
        const x = cx + Math.cos(a)*r*0.55, y = cy + Math.sin(a)*r*0.55;
        s += '<circle cx="'+x+'" cy="'+y+'" r="'+(r*0.16)+'" stroke="'+color+'" stroke-width="0.9" fill="none" opacity="0.85"/>';
      }
      s += '<circle cx="'+cx+'" cy="'+cy+'" r="'+(r*0.1)+'" fill="'+color+'" opacity="0.85"/>';
      return s;
    } else if(type==='geometric'){
      let s='<g opacity="0.85">';
      const w = r*1.7, step = w/4;
      for(let i=0;i<4;i++){
        const x1 = cx-w/2+i*step, x2 = cx-w/2+(i+1)*step;
        const yTop = cy-r*0.35, yBot = cy+r*0.35;
        s += '<path d="M'+x1+' '+(i%2===0?yBot:yTop)+' L'+x2+' '+(i%2===0?yTop:yBot)+'" stroke="'+color+'" stroke-width="1.2" fill="none"/>';
      }
      s += '</g>';
      return s;
    } else if(type==='abstract'){
      return '<path d="M'+(cx-r*0.8)+' '+(cy+r*0.3)+' Q'+cx+' '+(cy-r*0.9)+' '+(cx+r*0.8)+' '+(cy-r*0.1)+'" stroke="'+color+'" stroke-width="1.2" fill="none" opacity="0.85"/>'+
             '<path d="M'+(cx-r*0.6)+' '+(cy+r*0.6)+' Q'+cx+' '+(cy+r*0.1)+' '+(cx+r*0.6)+' '+(cy+r*0.65)+'" stroke="'+color+'" stroke-width="1" fill="none" opacity="0.6"/>';
    }
    return ''; // plain
  }

  /* ---------------- Reusable image carousel (collections / projects / products) ----------------
     One system, three callers. Each card can supply an `images` array; if it doesn't
     (or the array is empty), this falls back to the original single-file convention
     so existing content never breaks:
       collections -> Assets/collections/{slug}.png
       projects    -> Assets/projects/{slug}.jpg
       products    -> Assets/products/{handle}.jpg
     Markup is built as a plain HTML string (matching how every other card here is
     rendered), then initCarousels() wires up rotation/hover/dots/error-handling
     afterwards, once the HTML is actually in the DOM. -------------------------------- */

  function resolveImages(item, kind){
    if(Array.isArray(item.images) && item.images.length){
      return item.images.filter(src => typeof src === 'string' && src.trim().length > 0);
    }
    // backward-compatible single-image fallback, matching the original naming convention
    if(kind==='collections' && item.slug) return ['Assets/collections/'+item.slug+'.png'];
    if(kind==='projects' && item.slug) return ['Assets/projects/'+item.slug+'.jpg'];
    if(kind==='products' && item.handle) return ['Assets/products/'+item.handle+'.jpg'];
    return [];
  }

  function buildCarouselMarkup(images){
    if(!images.length) return '';
    const slides = images.map((src,i)=>
      '<div class="carousel-slide'+(i===0?' active':'')+'" data-index="'+i+'"><img src="'+src+'" alt="" loading="lazy"></div>'
    ).join('');
    const dots = images.length > 1
      ? '<div class="carousel-dots">'+images.map((_,i)=>'<span class="carousel-dot'+(i===0?' active':'')+'" data-index="'+i+'"></span>').join('')+'</div>'
      : '';
    return '<div class="motif-carousel">'+slides+dots+'</div>';
  }

  // Stop any running rotation timers before a grid's innerHTML gets replaced (filtering/
  // sorting on the collections page), so old detached carousels don't keep ticking in the background.
  function clearCarousels(scopeEl){
    scopeEl.querySelectorAll('.motif-carousel').forEach(c=>{
      if(c._carouselTimer) clearInterval(c._carouselTimer);
    });
  }

  function initCarousels(root){
    root.querySelectorAll('.motif-carousel').forEach(carousel=>{
      const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
      const dotsEl = carousel.querySelector('.carousel-dots');
      const dots = dotsEl ? Array.from(dotsEl.querySelectorAll('.carousel-dot')) : [];
      if(!slides.length){ carousel.remove(); return; }

      let valid = slides.map((_,i)=>i);
      let current = 0;

      function showSlide(i){
        if(!valid.length) return;
        current = i;
        slides.forEach((s,idx)=>s.classList.toggle('active', idx===i));
        dots.forEach((d,idx)=>d.classList.toggle('active', idx===i));
      }
      function next(){
        if(valid.length < 2) return;
        const pos = valid.indexOf(current);
        showSlide(valid[(pos+1) % valid.length]);
      }
      function stopAuto(){
        if(carousel._carouselTimer){ clearInterval(carousel._carouselTimer); carousel._carouselTimer = null; }
      }
      function startAuto(){
        if(reducedMotion || valid.length < 2) return;
        stopAuto();
        carousel._carouselTimer = setInterval(next, 4800);
      }

      // A failed image drops out of rotation rather than showing a broken-image icon.
      // If every image in the set fails, remove the whole carousel so the SVG motif
      // underneath (already in the DOM) shows through.
      slides.forEach((slideEl, i)=>{
        const img = slideEl.querySelector('img');
        if(!img) return;
        img.addEventListener('error', function(){
          const dot = dots[i];
          slideEl.remove();
          if(dot) dot.remove();
          valid = valid.filter(v=>v!==i);
          if(!valid.length){ stopAuto(); carousel.remove(); return; }
          if(current===i) showSlide(valid[0]);
        }, {once:true});
      });

      if(slides.length > 1){
        carousel.addEventListener('mouseenter', stopAuto);
        carousel.addEventListener('mouseleave', startAuto);
      }
      if(dotsEl){
        // stopPropagation so clicking a dot on a linked card (e.g. collection cards)
        // switches slides instead of triggering the card's overlaying link.
        dotsEl.addEventListener('click', function(e){
          e.stopPropagation();
          const dot = e.target.closest('.carousel-dot');
          if(!dot) return;
          showSlide(parseInt(dot.dataset.index,10));
          startAuto();
        });
      }

      startAuto();
    });
  }

  /* ---------------- Language switching ---------------- */
  function setLanguage(lang, opts){
    opts = opts || {};
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang==='ar' ? 'rtl' : 'ltr');
    document.querySelectorAll('.lang-block').forEach(block=>{
      block.hidden = block.getAttribute('data-lang') !== lang;
    });
    const title = document.documentElement.getAttribute('data-title-'+lang);
    if(title) document.title = title;
    try{ localStorage.setItem('heritage-lang', lang); }catch(e){}
    if(!opts.skipScroll) window.scrollTo(0,0);
  }

  function initLanguageSwitch(){
    let stored = null;
    try{ stored = localStorage.getItem('heritage-lang'); }catch(e){}
    const initialLang = stored || document.documentElement.getAttribute('lang') || 'en';
    setLanguage(initialLang, {skipScroll:true});

    document.querySelectorAll('[data-lang-switch]').forEach(btn=>{
      btn.addEventListener('click', function(){
        const current = document.documentElement.getAttribute('lang');
        setLanguage(current === 'ar' ? 'en' : 'ar');
      });
    });
  }

  /* ---------------- Common chrome: nav, hamburger, reveal, logo fallback, year ---------------- */
  function initCommon(){
    document.querySelectorAll('[data-role="nav"]').forEach(nav=>{
      window.addEventListener('scroll', function(){
        nav.classList.toggle('solid', window.scrollY > 40);
      }, {passive:true});
    });

    document.querySelectorAll('[data-role="hamburger"]').forEach(hamburger=>{
      const block = hamburger.closest('.lang-block') || document;
      const mobileMenu = block.querySelector('[data-role="mobile-menu"]');
      if(!mobileMenu) return;
      hamburger.addEventListener('click', function(){
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
      });
      mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', function(){
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      }));
    });

    // Photo fallback: if a real image (logo, hero, or any Assets/ photo) hasn't been
    // uploaded yet or fails to load, remove it gracefully so the SVG motif underneath
    // (or the text wordmark, for the logo) shows through instead of a broken-image icon.
    document.querySelectorAll('.logo-img').forEach(img=>{
      img.addEventListener('error', function(){ img.classList.add('logo-missing'); }, {once:true});
    });
    document.querySelectorAll('.hero-photo').forEach(img=>{
      img.addEventListener('error', function(){ img.remove(); }, {once:true});
    });
    document.querySelectorAll('.motif-photo').forEach(img=>{
      img.addEventListener('error', function(){ img.remove(); }, {once:true});
    });

    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, {threshold:0.1});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
    document.querySelectorAll('.section-head').forEach(el=>{ el.classList.add('reveal'); io.observe(el); });

    document.querySelectorAll('[data-role="year"]').forEach(el=>{ el.textContent = new Date().getFullYear(); });

    initLanguageSwitch();
  }

  /* ---------------- Home page render (called once per language block) ---------------- */
  function renderHomePage(content, root){
    root = root || document;

    const timelineItems = root.querySelectorAll('.timeline-item');
    timelineItems.forEach(item=>{
      item.addEventListener('click', function(){
        timelineItems.forEach(t=>t.classList.remove('active'));
        item.classList.add('active');
      });
    });

    const collectionsGrid = root.querySelector('[data-role="collections-grid"]');
    if(collectionsGrid && content.collections){
      collectionsGrid.innerHTML = content.collections.map(c=>{
        const external = c.href.indexOf('http') === 0;
        const photo = buildCarouselMarkup(resolveImages(c, 'collections'));
        return '<div class="collection-card"><div class="motif">'+motifSVG(c.motif)+photo+'</div><div class="scrim"></div>'+
          '<div class="body"><div class="num">'+c.n+'</div><h3>'+c.t+'</h3><p>'+c.d+'</p></div>'+
          '<a class="card-link" href="'+c.href+'" aria-label="'+c.t+'"'+(external?' target="_blank" rel="noopener"':'')+'></a></div>';
      }).join('');
    }

    const journeyEl = root.querySelector('[data-role="journey"]');
    if(journeyEl && content.journey){
      journeyEl.innerHTML = content.journey.map((s,i)=>
        '<div class="journey-step'+(i===0?' active':'')+'" data-i="'+i+'"><div class="jnum">'+s.n+'</div><h4>'+s.t+'</h4><div class="jdesc">'+s.d+'</div></div>'
      ).join('');
      journeyEl.querySelectorAll('.journey-step').forEach(el=>{
        el.addEventListener('click', function(){
          journeyEl.querySelectorAll('.journey-step').forEach(x=>x.classList.remove('active'));
          el.classList.add('active');
        });
      });
    }

    const commercialGrid = root.querySelector('[data-role="commercial-grid"]');
    if(commercialGrid && content.commercial){
      commercialGrid.innerHTML = content.commercial.map(c=>
        '<div class="commercial-card"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.3">'+ICONS[c.icon]+'</svg><h4>'+c.t+'</h4><p>'+c.d+'</p></div>'
      ).join('');
    }

    const projectsGrid = root.querySelector('[data-role="projects-grid"]');
    if(projectsGrid && content.projects){
      projectsGrid.innerHTML = content.projects.map(p=>{
        const photo = buildCarouselMarkup(resolveImages(p, 'projects'));
        return '<div class="project-item" data-cat="'+p.cat+'"><div class="motif" style="--ar:'+p.aspect+'">'+motifSVG(p.motif,'#D4B876')+photo+'</div>'+
        '<div class="p-body"><div class="p-tag">'+content.catLabel[p.cat]+'</div><div class="p-title">'+p.t+'</div></div></div>';
      }).join('');
    }
    const filterBar = root.querySelector('[data-role="filter-bar"]');
    if(filterBar){
      filterBar.addEventListener('click', function(e){
        const btn = e.target.closest('.filter-btn');
        if(!btn) return;
        filterBar.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.f;
        root.querySelectorAll('.project-item').forEach(item=>{
          item.classList.toggle('hidden', f!=='all' && item.dataset.cat!==f);
        });
      });
    }

    const testiSlides = root.querySelector('[data-role="testi-slides"]');
    const testiDots = root.querySelector('[data-role="testi-dots"]');
    if(testiSlides && testiDots && content.testimonials){
      const testimonials = content.testimonials;
      testiSlides.innerHTML = testimonials.map((t,i)=>
        '<div class="testi-slide'+(i===0?' active':'')+'"><p class="testi-quote">"'+t.q+'"</p><div class="testi-name">'+t.n+'</div><div class="testi-role">'+t.r+'</div></div>'
      ).join('');
      testiDots.innerHTML = testimonials.map((_,i)=>'<span class="testi-dot'+(i===0?' active':'')+'" data-i="'+i+'"></span>').join('');
      let testiIndex = 0;
      function showTesti(i){
        testiIndex = (i+testimonials.length)%testimonials.length;
        root.querySelectorAll('.testi-slide').forEach((s,idx)=>s.classList.toggle('active', idx===testiIndex));
        root.querySelectorAll('.testi-dot').forEach((d,idx)=>d.classList.toggle('active', idx===testiIndex));
      }
      const prevBtn = root.querySelector('[data-role="testi-prev"]');
      const nextBtn = root.querySelector('[data-role="testi-next"]');
      if(prevBtn) prevBtn.addEventListener('click', ()=>showTesti(testiIndex-1));
      if(nextBtn) nextBtn.addEventListener('click', ()=>showTesti(testiIndex+1));
      testiDots.addEventListener('click', function(e){
        const dot = e.target.closest('.testi-dot');
        if(dot) showTesti(parseInt(dot.dataset.i,10));
      });
      if(!reducedMotion){
        let timer = setInterval(()=>showTesti(testiIndex+1), 6500);
        const wrap = root.querySelector('.testi-wrap');
        if(wrap){
          wrap.addEventListener('mouseenter', ()=>clearInterval(timer));
          wrap.addEventListener('mouseleave', ()=>{ timer = setInterval(()=>showTesti(testiIndex+1), 6500); });
        }
      }
    }

    initCarousels(root);
  }

  /* ---------------- Collections / PLP page render (called once per language block) ---------------- */
  function renderCollectionsPage(config, root){
    root = root || document;
    const PRODUCTS = config.products;
    const L = config.labels;
    const i18n = config.i18n;
    const state = { category:new Set(), material:new Set(), color:new Set(), size:new Set(), room:new Set(), sort:'featured' };

    const params = new URLSearchParams(window.location.search);
    const qCat = params.get('category');
    if(qCat && L.category[qCat]) state.category.add(qCat);

    function count(group, key){
      return PRODUCTS.filter(p=>{
        if(group==='category') return p.category.includes(key);
        return p[group]===key;
      }).length;
    }

    function renderCheckGroup(role, labels, groupKey){
      const el = root.querySelector('[data-role="'+role+'"]');
      if(!el) return;
      el.innerHTML = Object.keys(labels).map(key=>{
        const checked = state[groupKey].has(key) ? 'checked' : '';
        return '<label class="filter-option"><input type="checkbox" data-group="'+groupKey+'" value="'+key+'" '+checked+'> '+labels[key]+' <span class="count">'+count(groupKey,key)+'</span></label>';
      }).join('');
    }

    function renderColorSwatches(){
      const el = root.querySelector('[data-role="filter-color"]');
      if(!el) return;
      el.innerHTML = Object.keys(L.color).map(key=>{
        const active = state.color.has(key) ? ' active' : '';
        return '<span class="swatch'+active+'" style="background:'+L.colorHex[key]+'" data-color="'+key+'" data-label="'+L.color[key]+'" title="'+L.color[key]+'"></span>';
      }).join('');
    }

    function renderFilters(){
      renderCheckGroup('filter-category', L.category, 'category');
      renderCheckGroup('filter-material', L.material, 'material');
      renderColorSwatches();
      renderCheckGroup('filter-size', L.size, 'size');
      renderCheckGroup('filter-room', L.room, 'room');
    }

    function matches(p){
      const catOk = state.category.size===0 || p.category.some(c=>state.category.has(c));
      const matOk = state.material.size===0 || state.material.has(p.material);
      const colOk = state.color.size===0 || state.color.has(p.color);
      const sizeOk = state.size.size===0 || state.size.has(p.size);
      const roomOk = state.room.size===0 || p.room.some(r=>state.room.has(r));
      return catOk && matOk && colOk && sizeOk && roomOk;
    }

    function sortProducts(list){
      const arr = list.slice();
      if(state.sort==='name') arr.sort((a,b)=>a.name.localeCompare(b.name));
      else if(state.sort==='newest') arr.sort((a,b)=>(b.isNew?1:0)-(a.isNew?1:0));
      return arr;
    }

    function renderChips(){
      const chips = [];
      ['category','material','color','size','room'].forEach(group=>{
        state[group].forEach(val=>{
          chips.push('<span class="chip" data-group="'+group+'" data-val="'+val+'">'+L[group][val]+' <button type="button" aria-label="Remove filter">\u2715</button></span>');
        });
      });
      const chipsEl = root.querySelector('[data-role="chips"]');
      if(chipsEl) chipsEl.innerHTML = chips.join('');
    }

    function renderProducts(){
      const filtered = sortProducts(PRODUCTS.filter(matches));
      const grid = root.querySelector('[data-role="product-grid"]');
      if(grid){
        clearCarousels(grid); // stop timers from the previous filter/sort pass before discarding those cards
        grid.innerHTML = filtered.map(p=>{
          const productUrl = SHOPIFY_STORE + '/products/' + p.handle;
          const inquireSubject = encodeURIComponent(i18n.inquireSubjectPrefix + p.name);
          const swatchColor = p.color==='ivory' ? '#B08D46' : '#D4B876';
          const photo = buildCarouselMarkup(resolveImages(p, 'products'));
          return '<div class="product-card">'+
            '<div class="product-media">'+ (p.isNew ? '<span class="product-tag">'+i18n.newTag+'</span>' : '') +
            '<div class="motif">'+motifSVG(p.motif, swatchColor)+photo+'</div></div>'+
            '<div class="product-body">'+
              '<div class="product-origin">'+L.category[p.category[p.category.length-1]]+'</div>'+
              '<div class="product-name">'+p.name+'</div>'+
              '<div class="product-meta">'+L.material[p.material]+' \u00b7 '+L.color[p.color]+' \u00b7 '+L.size[p.size].split(' (')[0].split('(')[0]+'</div>'+
              '<div class="product-actions">'+
                '<a class="btn btn-fill btn-sm" href="'+productUrl+'" target="_blank" rel="noopener">'+i18n.viewOnShopify+'</a>'+
                '<a class="btn btn-outline dark btn-sm" href="mailto:info@heritagecarpet.sa?subject='+inquireSubject+'">'+i18n.inquire+'</a>'+
              '</div>'+
            '</div></div>';
        }).join('');
        initCarousels(grid);
      }
      const resultCountEl = root.querySelector('[data-role="result-count"]');
      if(resultCountEl) resultCountEl.textContent = i18n.resultCount.replace('{count}', filtered.length).replace('{total}', PRODUCTS.length);
      const emptyEl = root.querySelector('[data-role="empty-state"]');
      if(emptyEl) emptyEl.classList.toggle('show', filtered.length===0);
      renderChips();
    }

    function refreshAll(){ renderFilters(); renderProducts(); }

    const filtersPanel = root.querySelector('[data-role="filters"]');
    if(filtersPanel){
      filtersPanel.addEventListener('change', function(e){
        if(e.target.matches('input[type=checkbox]')){
          const group = e.target.dataset.group, val = e.target.value;
          if(e.target.checked) state[group].add(val); else state[group].delete(val);
          refreshAll();
        }
      });
    }
    const filterColorEl = root.querySelector('[data-role="filter-color"]');
    if(filterColorEl){
      filterColorEl.addEventListener('click', function(e){
        const sw = e.target.closest('.swatch');
        if(!sw) return;
        const val = sw.dataset.color;
        if(state.color.has(val)) state.color.delete(val); else state.color.add(val);
        refreshAll();
      });
    }
    const chipsContainer = root.querySelector('[data-role="chips"]');
    if(chipsContainer){
      chipsContainer.addEventListener('click', function(e){
        const btn = e.target.closest('button');
        if(!btn) return;
        const chip = btn.closest('.chip');
        state[chip.dataset.group].delete(chip.dataset.val);
        refreshAll();
      });
    }
    const clearBtn = root.querySelector('[data-role="clear-filters"]');
    if(clearBtn){
      clearBtn.addEventListener('click', function(){
        ['category','material','color','size','room'].forEach(g=>state[g].clear());
        refreshAll();
      });
    }
    const sortSelect = root.querySelector('[data-role="sort-select"]');
    if(sortSelect){
      sortSelect.addEventListener('change', function(e){
        state.sort = e.target.value;
        renderProducts();
      });
    }

    const overlay = root.querySelector('[data-role="filters-overlay"]');
    const mobileToggle = root.querySelector('[data-role="mobile-filter-toggle"]');
    const filtersClose = root.querySelector('[data-role="filters-close"]');
    function openFilters(){ if(filtersPanel) filtersPanel.classList.add('open'); if(overlay) overlay.classList.add('open'); }
    function closeFilters(){ if(filtersPanel) filtersPanel.classList.remove('open'); if(overlay) overlay.classList.remove('open'); }
    if(mobileToggle) mobileToggle.addEventListener('click', openFilters);
    if(filtersClose) filtersClose.addEventListener('click', closeFilters);
    if(overlay) overlay.addEventListener('click', closeFilters);

    refreshAll();
  }

  /* ---------------- Bespoke Studio wizard (called once per language block) ---------------- */
  function renderBespokeStudio(config, root){
    root = root || document;
    const langSuffix = '-' + (root.getAttribute('data-lang') || 'x');
    const uid = (base) => base + langSuffix;

    const i18n = config.i18n;
    const STEP_COUNT = 7;
    const state = {
      step:0, maxReached:0,
      room:null, shape:null, widthM:3, lengthM:4, customShapeDesc:'',
      material:null, color:config.colors[1] ? config.colors[1].key : null, customHex:null,
      pattern:null, files:[], notes:'',
      name:'', email:'', phone:'', showroom:null, contactMethod:null
    };

    const stepContainer = root.querySelector('[data-role="wizard-step"]');
    const progressEl = root.querySelector('[data-role="step-progress"]');
    const backBtn = root.querySelector('[data-role="back-btn"]');
    const continueBtn = root.querySelector('[data-role="continue-btn"]');
    if(!stepContainer) return;

    function canContinue(){
      switch(state.step){
        case 0: return !!state.room;
        case 1: return !!state.shape && (state.shape==='custom' ? true : state.widthM>0 && (state.shape==='round' ? true : state.lengthM>0));
        case 2: return !!state.material;
        case 3: return !!(state.color || state.customHex);
        case 4: return !!state.pattern;
        default: return true;
      }
    }

    function renderProgress(){
      let html = '';
      for(let i=0;i<STEP_COUNT;i++){
        const cls = i===state.step ? 'current' : (i<state.maxReached || i<state.step ? 'done' : '');
        const clickable = i<=state.maxReached ? ' clickable' : '';
        html += '<div class="step-dot-wrap"><div class="step-dot '+cls+clickable+'" data-goto="'+i+'">'+(i+1)+'</div>';
        if(i<STEP_COUNT-1) html += '<div class="step-connector '+(i<state.maxReached?'done':'')+'"></div>';
        html += '</div>';
      }
      progressEl.innerHTML = html;
    }

    function optionCard(field, key, label, note, extra){
      const sel = state[field]===key ? ' selected' : '';
      return '<div class="option-card'+sel+'" data-field="'+field+'" data-value="'+key+'">'+
        '<h4>'+label+'<span class="check"></span></h4>'+
        (note?'<p>'+note+'</p>':'') + (extra||'') + '</div>';
    }

    function renderStepContent(){
      let html = '';
      const s = state.step;
      if(s===0){
        html = '<div class="eyebrow on-light step-kicker">'+i18n.stepOfLabel.replace('{n}',1)+'</div>'+
          '<h2>'+i18n.stepTitle[0]+'</h2><p class="step-intro">'+i18n.stepIntro[0]+'</p>'+
          '<div class="option-grid">'+config.rooms.map(r=>optionCard('room',r.key,r.label,r.note)).join('')+'</div>';
      } else if(s===1){
        html = '<div class="eyebrow on-light step-kicker">'+i18n.stepOfLabel.replace('{n}',2)+'</div>'+
          '<h2>'+i18n.stepTitle[1]+'</h2><p class="step-intro">'+i18n.stepIntro[1]+'</p>'+
          '<div class="option-grid">'+config.shapes.map(sh=>optionCard('shape',sh.key,sh.label,sh.note)).join('')+'</div>';
        if(state.shape==='custom'){
          html += '<div class="custom-shape-note"><label style="display:block;font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--madder);margin-bottom:10px;">'+i18n.customShapeLabel+'</label>'+
            '<textarea class="field-input" id="'+uid('customShapeInput')+'" rows="3" placeholder="'+i18n.customShapePlaceholder+'">'+state.customShapeDesc+'</textarea></div>';
        } else if(state.shape==='round'){
          html += '<div class="dim-row"><div class="dim-field"><label>'+i18n.diameterLabel+'</label>'+
            '<input type="number" min="0.5" step="0.1" id="'+uid('widthInput')+'" value="'+state.widthM+'"></div></div>';
        } else if(state.shape==='square'){
          html += '<div class="dim-row"><div class="dim-field"><label>'+i18n.sideLabel+'</label>'+
            '<input type="number" min="0.5" step="0.1" id="'+uid('widthInput')+'" value="'+state.widthM+'"></div></div>';
        } else if(state.shape){
          html += '<div class="dim-row">'+
            '<div class="dim-field"><label>'+i18n.widthLabel+'</label><input type="number" min="0.5" step="0.1" id="'+uid('widthInput')+'" value="'+state.widthM+'"></div>'+
            '<div class="dim-field"><label>'+i18n.lengthLabel+'</label><input type="number" min="0.5" step="0.1" id="'+uid('lengthInput')+'" value="'+state.lengthM+'"></div>'+
            '</div>' + (state.shape==='runner' ? '<p class="dim-note">'+i18n.runnerNote+'</p>' : '');
        }
      } else if(s===2){
        html = '<div class="eyebrow on-light step-kicker">'+i18n.stepOfLabel.replace('{n}',3)+'</div>'+
          '<h2>'+i18n.stepTitle[2]+'</h2><p class="step-intro">'+i18n.stepIntro[2]+'</p>'+
          '<div class="option-grid">'+config.materials.map(m=>optionCard('material',m.key,m.label,m.desc)).join('')+'</div>';
      } else if(s===3){
        const effHex = state.customHex || (config.colors.find(c=>c.key===state.color)||{}).hex;
        html = '<div class="eyebrow on-light step-kicker">'+i18n.stepOfLabel.replace('{n}',4)+'</div>'+
          '<h2>'+i18n.stepTitle[3]+'</h2><p class="step-intro">'+i18n.stepIntro[3]+'</p>'+
          '<div class="color-grid">'+config.colors.map(c=>
            '<div class="color-option'+(!state.customHex && state.color===c.key?' selected':'')+'" data-field="color" data-value="'+c.key+'">'+
            '<div class="swatch-lg" style="background:'+c.hex+'"></div><span>'+c.label+'</span></div>'
          ).join('')+'</div>'+
          '<div class="custom-color-row"><input type="color" id="'+uid('customColorInput')+'" value="'+(effHex||'#B08D46')+'">'+
          '<div><div style="font-size:13px;font-weight:600;">'+i18n.customColorLabel+'</div>'+
          '<div class="hex-readout" id="'+uid('hexReadout')+'">'+(state.customHex ? state.customHex.toUpperCase() : i18n.notSelected)+'</div></div></div>';
      } else if(s===4){
        const effHex = state.customHex || (config.colors.find(c=>c.key===state.color)||{}).hex || '#B08D46';
        html = '<div class="eyebrow on-light step-kicker">'+i18n.stepOfLabel.replace('{n}',5)+'</div>'+
          '<h2>'+i18n.stepTitle[4]+'</h2><p class="step-intro">'+i18n.stepIntro[4]+'</p>'+
          '<div class="option-grid">'+config.patterns.map(p=>
            optionCard('pattern',p.key,p.label,p.desc,'<div class="motif-preview">'+patternIcon(p.key,effHex)+'</div>')
          ).join('')+'</div>';
      } else if(s===5){
        html = '<div class="eyebrow on-light step-kicker">'+i18n.stepOfLabel.replace('{n}',6)+'</div>'+
          '<h2>'+i18n.stepTitle[5]+'</h2><p class="step-intro">'+i18n.stepIntro[5]+'</p>'+
          '<div class="upload-zone" id="'+uid('uploadZone')+'"><p style="font-size:15px;opacity:0.85;font-weight:600;">'+i18n.uploadTitle+'</p><p>'+i18n.uploadHint+'</p>'+
          '<input type="file" id="'+uid('fileInput')+'" accept="image/*" multiple style="display:none;"></div>'+
          '<div class="upload-thumbs" id="'+uid('uploadThumbs')+'"></div>'+
          '<div class="notes-field"><label>'+i18n.notesLabel+'</label><textarea id="'+uid('notesInput')+'" placeholder="'+i18n.notesPlaceholder+'">'+state.notes+'</textarea></div>';
      } else if(s===6){
        html = '<div class="eyebrow on-light step-kicker">'+i18n.stepOfLabel.replace('{n}',7)+'</div>'+
          '<h2>'+i18n.stepTitle[6]+'</h2><p class="step-intro">'+i18n.stepIntro[6]+'</p>'+
          '<div class="contact-grid">'+
            '<div><label>'+i18n.nameLabel+'</label><input class="field-input" id="'+uid('nameInput')+'" value="'+state.name+'"></div>'+
            '<div><label>'+i18n.emailLabel+'</label><input class="field-input" type="email" id="'+uid('emailInput')+'" value="'+state.email+'"></div>'+
            '<div><label>'+i18n.phoneLabel+'</label><input class="field-input" id="'+uid('phoneInput')+'" value="'+state.phone+'"></div>'+
            '<div><label>'+i18n.showroomLabel+'</label><select class="field-input" id="'+uid('showroomInput')+'"><option value="">'+i18n.notSelected+'</option>'+
              config.showrooms.map(sr=>'<option value="'+sr.key+'"'+(state.showroom===sr.key?' selected':'')+'>'+sr.label+'</option>').join('')+'</select></div>'+
            '<div class="field-full"><label>'+i18n.contactMethodLabel+'</label><select class="field-input" id="'+uid('contactMethodInput')+'"><option value="">'+i18n.notSelected+'</option>'+
              config.contactMethods.map(cm=>'<option value="'+cm.key+'"'+(state.contactMethod===cm.key?' selected':'')+'>'+cm.label+'</option>').join('')+'</select></div>'+
          '</div>'+
          '<div class="review-panel"><h4>'+i18n.reviewTitle+'</h4><div id="'+uid('reviewRows')+'"></div></div>'+
          '<div style="margin-top:28px;"><button type="button" class="btn btn-fill" id="'+uid('sendBtn')+'" disabled>'+i18n.sendBtn+'</button>'+
          '<p class="send-note">'+i18n.sendNote+'</p></div>'+
          '<div class="submit-success" id="'+uid('submitSuccess')+'"><div class="check-lg">\u2713</div><h2>'+i18n.successTitle+'</h2><p class="step-intro" style="margin:0 auto;">'+i18n.successBody+'</p></div>';
      }
      stepContainer.innerHTML = html;

      if(s===6) renderReviewRows();
      wireStepInputs();
    }

    function renderReviewRows(){
      const el = stepContainer.querySelector('#'+uid('reviewRows'));
      if(!el) return;
      const L = i18n.summaryLabels;
      const dash = i18n.notSelected;
      const roomLabel = state.room ? (config.rooms.find(r=>r.key===state.room)||{}).label : dash;
      const shapeLabel = state.shape ? (config.shapes.find(s=>s.key===state.shape)||{}).label : dash;
      const dims = state.shape==='custom' ? (state.customShapeDesc || dash) :
        state.shape==='round' ? ('\u2300 '+state.widthM.toFixed(1)+i18n.unitSuffix) :
        state.shape ? (state.widthM.toFixed(1)+i18n.unitSuffix+' \u00d7 '+(state.shape==='square'?state.widthM.toFixed(1):state.lengthM.toFixed(1))+i18n.unitSuffix) : dash;
      const materialLabel = state.material ? (config.materials.find(m=>m.key===state.material)||{}).label : dash;
      const colorLabel = state.customHex ? state.customHex.toUpperCase() : (state.color ? (config.colors.find(c=>c.key===state.color)||{}).label : dash);
      const patternLabel = state.pattern ? (config.patterns.find(p=>p.key===state.pattern)||{}).label : dash;
      const rows = [[L.room,roomLabel],[L.shape,shapeLabel],[L.dimensions,dims],[L.material,materialLabel],[L.color,colorLabel],[L.pattern,patternLabel],[L.notes, state.notes||dash]];
      el.innerHTML = rows.map(r=>'<div class="preview-summary-row" style="color:var(--ink-text);"><span style="opacity:0.6;">'+r[0]+'</span><span style="font-weight:600;">'+r[1]+'</span></div>').join('');
    }

    function buildMailto(){
      const L = i18n.emailFieldLabels;
      const dash = i18n.notSelected;
      const dims = state.shape==='custom' ? (state.customShapeDesc||dash) :
        state.shape==='round' ? ('\u00d8 '+state.widthM.toFixed(1)+i18n.unitSuffix) :
        (state.widthM.toFixed(1)+i18n.unitSuffix+' x '+(state.shape==='square'?state.widthM.toFixed(1):state.lengthM.toFixed(1))+i18n.unitSuffix);
      const lines = [
        L.room+': '+(state.room ? (config.rooms.find(r=>r.key===state.room)||{}).label : dash),
        L.shape+': '+(state.shape ? (config.shapes.find(s=>s.key===state.shape)||{}).label : dash),
        L.dimensions+': '+dims,
        L.material+': '+(state.material ? (config.materials.find(m=>m.key===state.material)||{}).label : dash),
        L.color+': '+(state.customHex ? state.customHex.toUpperCase() : (state.color ? (config.colors.find(c=>c.key===state.color)||{}).label : dash)),
        L.pattern+': '+(state.pattern ? (config.patterns.find(p=>p.key===state.pattern)||{}).label : dash),
        L.notes+': '+(state.notes||dash),
        '',
        L.name+': '+state.name,
        L.email+': '+state.email,
        L.phone+': '+(state.phone||dash),
        L.showroom+': '+(state.showroom ? (config.showrooms.find(sr=>sr.key===state.showroom)||{}).label : dash),
        L.contactMethod+': '+(state.contactMethod ? (config.contactMethods.find(cm=>cm.key===state.contactMethod)||{}).label : dash)
      ];
      const subject = encodeURIComponent(i18n.emailSubject);
      const body = encodeURIComponent(lines.join('\n'));
      return 'mailto:info@heritagecarpet.sa?subject='+subject+'&body='+body;
    }

    function renderThumbs(){
      const el = stepContainer.querySelector('#'+uid('uploadThumbs'));
      if(!el) return;
      el.innerHTML = state.files.map((f,i)=>'<div class="upload-thumb"><img src="'+f.dataUrl+'" alt="'+f.name+'"><button type="button" data-remove="'+i+'">\u2715</button></div>').join('');
    }

    function wireStepInputs(){
      stepContainer.querySelectorAll('.option-card, .color-option').forEach(card=>{
        card.addEventListener('click', function(){
          const field = card.dataset.field, value = card.dataset.value;
          state[field] = value;
          if(field==='color') state.customHex = null;
          if(field==='shape'){
            if(value==='round' || value==='square') state.lengthM = state.widthM;
          }
          updateContinueState();
          renderStepContent();
          renderRugPreview();
        });
      });

      const widthInput = stepContainer.querySelector('#'+uid('widthInput'));
      if(widthInput) widthInput.addEventListener('input', function(){
        state.widthM = parseFloat(widthInput.value)||0;
        if(state.shape==='round'||state.shape==='square') state.lengthM = state.widthM;
        updateContinueState();
        renderRugPreview();
      });
      const lengthInput = stepContainer.querySelector('#'+uid('lengthInput'));
      if(lengthInput) lengthInput.addEventListener('input', function(){
        state.lengthM = parseFloat(lengthInput.value)||0;
        updateContinueState();
        renderRugPreview();
      });
      const customShapeInput = stepContainer.querySelector('#'+uid('customShapeInput'));
      if(customShapeInput) customShapeInput.addEventListener('input', function(){
        state.customShapeDesc = customShapeInput.value;
      });

      const customColorInput = stepContainer.querySelector('#'+uid('customColorInput'));
      if(customColorInput) customColorInput.addEventListener('input', function(){
        state.customHex = customColorInput.value;
        state.color = null;
        const readout = stepContainer.querySelector('#'+uid('hexReadout'));
        if(readout) readout.textContent = state.customHex.toUpperCase();
        stepContainer.querySelectorAll('.color-option').forEach(c=>c.classList.remove('selected'));
        updateContinueState();
        renderRugPreview();
      });

      const uploadZone = stepContainer.querySelector('#'+uid('uploadZone'));
      const fileInput = stepContainer.querySelector('#'+uid('fileInput'));
      if(uploadZone && fileInput){
        uploadZone.addEventListener('click', ()=>fileInput.click());
        ['dragover','dragleave','drop'].forEach(evt=>{
          uploadZone.addEventListener(evt, function(e){
            e.preventDefault();
            uploadZone.classList.toggle('dragover', evt==='dragover');
          });
        });
        uploadZone.addEventListener('drop', function(e){ handleFiles(e.dataTransfer.files); });
        fileInput.addEventListener('change', function(){ handleFiles(fileInput.files); });
      }
      function handleFiles(fileList){
        Array.from(fileList).slice(0, 6 - state.files.length).forEach(file=>{
          if(!file.type.startsWith('image/')) return;
          const reader = new FileReader();
          reader.onload = function(e){
            state.files.push({name:file.name, dataUrl:e.target.result});
            renderThumbs();
          };
          reader.readAsDataURL(file);
        });
      }
      renderThumbs();
      const thumbsEl = stepContainer.querySelector('#'+uid('uploadThumbs'));
      if(thumbsEl) thumbsEl.addEventListener('click', function(e){
        const btn = e.target.closest('[data-remove]');
        if(!btn) return;
        state.files.splice(parseInt(btn.dataset.remove,10),1);
        renderThumbs();
      });
      const notesInput = stepContainer.querySelector('#'+uid('notesInput'));
      if(notesInput) notesInput.addEventListener('input', function(){ state.notes = notesInput.value; });

      ['nameInput','emailInput','phoneInput'].forEach(base=>{
        const el = stepContainer.querySelector('#'+uid(base));
        if(el) el.addEventListener('input', function(){
          state[base.replace('Input','')] = el.value;
          updateSendState();
        });
      });
      const showroomInput = stepContainer.querySelector('#'+uid('showroomInput'));
      if(showroomInput) showroomInput.addEventListener('change', function(){ state.showroom = showroomInput.value || null; });
      const contactMethodInput = stepContainer.querySelector('#'+uid('contactMethodInput'));
      if(contactMethodInput) contactMethodInput.addEventListener('change', function(){ state.contactMethod = contactMethodInput.value || null; });

      const sendBtn = stepContainer.querySelector('#'+uid('sendBtn'));
      if(sendBtn){
        updateSendState();
        sendBtn.addEventListener('click', function(){
          window.location.href = buildMailto();
          const success = stepContainer.querySelector('#'+uid('submitSuccess'));
          const grid = stepContainer.querySelector('.contact-grid');
          const review = stepContainer.querySelector('.review-panel');
          if(success){ success.classList.add('show'); }
          if(grid) grid.style.display = 'none';
          if(review) review.style.display = 'none';
          sendBtn.style.display = 'none';
          const note = stepContainer.querySelector('.send-note');
          if(note) note.style.display = 'none';
        });
      }
    }

    function updateSendState(){
      const sendBtn = stepContainer.querySelector('#'+uid('sendBtn'));
      if(!sendBtn) return;
      const validEmail = /\S+@\S+\.\S+/.test(state.email);
      sendBtn.disabled = !(state.name.trim() && validEmail);
    }

    function updateContinueState(){
      continueBtn.disabled = !canContinue();
    }

    function renderRugPreview(){
      const canvas = root.querySelector('[data-role="preview-canvas"]');
      const dimsEl = root.querySelector('[data-role="preview-dims"]');
      if(!canvas) return;

      const baseHex = state.customHex || (config.colors.find(c=>c.key===state.color) || {}).hex || '#C9BFAE';
      const borderHex = shade(baseHex, isDarkColor(baseHex) ? 0.28 : -0.22);
      const contrastHex = isDarkColor(baseHex) ? 'rgba(255,255,255,0.55)' : 'rgba(20,15,10,0.45)';

      let svg;
      if(state.shape === 'custom'){
        svg = '<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">'+
          '<path d="M90 70 Q60 150 100 220 Q160 260 220 210 Q250 140 210 90 Q160 50 90 70Z" fill="'+baseHex+'" stroke="'+borderHex+'" stroke-width="10"/>'+
          patternGlyph(state.pattern, contrastHex, 150, 150, 60)+
          '</svg>';
        canvas.innerHTML = svg;
        if(dimsEl) dimsEl.textContent = config.i18n.customPreviewNote;
        renderPreviewSummary();
        return;
      }

      const isRound = state.shape === 'round';
      const isSquare = state.shape === 'square';
      const widthM = state.widthM || 1;
      const lengthM = isRound ? widthM : (isSquare ? state.widthM : (state.lengthM || 1));
      const maxM = Math.max(widthM, lengthM, 0.5);
      const scale = 230 / maxM;
      const rw = widthM * scale, rh = lengthM * scale;
      const x = (300 - rw) / 2, y = (300 - rh) / 2;
      const cx = 150, cy = 150;
      const glyphR = Math.min(rw, rh) * 0.32;

      let shapeSVG;
      if(isRound){
        const radius = rw/2;
        shapeSVG = '<circle cx="'+cx+'" cy="'+cy+'" r="'+radius+'" fill="'+baseHex+'" stroke="'+borderHex+'" stroke-width="'+(radius*0.09)+'"/>';
      } else {
        shapeSVG = '<rect x="'+x+'" y="'+y+'" width="'+rw+'" height="'+rh+'" fill="'+baseHex+'" stroke="'+borderHex+'" stroke-width="'+(Math.min(rw,rh)*0.07)+'"/>';
      }

      svg = '<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">'+
        '<rect x="4" y="4" width="292" height="292" fill="none" stroke="rgba(212,184,118,0.15)" stroke-width="1"/>'+
        shapeSVG +
        patternGlyph(state.pattern, contrastHex, cx, cy, glyphR) +
        '</svg>';
      canvas.innerHTML = svg;

      if(dimsEl){
        if(isRound) dimsEl.textContent = '\u2300 ' + widthM.toFixed(1) + config.i18n.unitSuffix;
        else dimsEl.textContent = widthM.toFixed(1) + config.i18n.unitSuffix + ' \u00d7 ' + lengthM.toFixed(1) + config.i18n.unitSuffix;
      }
      renderPreviewSummary();
    }

    function renderPreviewSummary(){
      const el = root.querySelector('[data-role="preview-summary"]');
      if(!el) return;
      const L = config.i18n.summaryLabels;
      const dash = config.i18n.notSelected;
      const roomLabel = state.room ? (config.rooms.find(r=>r.key===state.room)||{}).label : dash;
      const shapeLabel = state.shape ? (config.shapes.find(s=>s.key===state.shape)||{}).label : dash;
      const materialLabel = state.material ? (config.materials.find(m=>m.key===state.material)||{}).label : dash;
      const colorLabel = state.customHex ? state.customHex.toUpperCase() : (state.color ? (config.colors.find(c=>c.key===state.color)||{}).label : dash);
      const patternLabel = state.pattern ? (config.patterns.find(p=>p.key===state.pattern)||{}).label : dash;
      const rows = [
        [L.room, roomLabel], [L.shape, shapeLabel], [L.material, materialLabel],
        [L.color, colorLabel], [L.pattern, patternLabel]
      ];
      el.innerHTML = rows.map(r=>'<div class="preview-summary-row"><span>'+r[0]+'</span><span>'+r[1]+'</span></div>').join('');
    }

    function goTo(step){
      if(step<0 || step>=STEP_COUNT) return;
      if(step > state.maxReached + 1) return;
      state.step = step;
      if(step > state.maxReached) state.maxReached = step;
      backBtn.style.visibility = step===0 ? 'hidden' : 'visible';
      continueBtn.style.display = step===STEP_COUNT-1 ? 'none' : 'inline-flex';
      renderProgress();
      renderStepContent();
      updateContinueState();
      renderRugPreview();
      if(stepContainer.scrollIntoView) stepContainer.scrollIntoView({behavior: reducedMotion ? 'auto' : 'smooth', block:'start'});
    }

    progressEl.addEventListener('click', function(e){
      const dot = e.target.closest('.step-dot.clickable');
      if(!dot) return;
      goTo(parseInt(dot.dataset.goto,10));
    });
    backBtn.addEventListener('click', function(){ goTo(state.step-1); });
    continueBtn.addEventListener('click', function(){ if(canContinue()) goTo(state.step+1); });

    goTo(0);
  }

  document.addEventListener('DOMContentLoaded', initCommon);

  return { SHOPIFY_STORE, motifSVG, renderHomePage, renderCollectionsPage, renderBespokeStudio, setLanguage, resolveImages, buildCarouselMarkup, initCarousels };
})();
