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
    color = color || '#B7CC33';
    const p = '<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">';
    const bg = '<rect width="200" height="200" fill="#2F2D2E"/>';
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
    } else if(type==='lamp'){
      inner = '<path d="M70 70 L130 70 L115 110 L85 110 Z" stroke="'+color+'" stroke-width="1.2" fill="none"/><line x1="100" y1="110" x2="100" y2="165" stroke="'+color+'" stroke-width="1.2"/><path d="M75 170 Q100 155 125 170" stroke="'+color+'" stroke-width="1.2" fill="none"/>';
    } else if(type==='vase'){
      inner = '<path d="M85 60 L115 60 L120 95 Q135 125 120 155 L80 155 Q65 125 80 95 Z" stroke="'+color+'" stroke-width="1.2" fill="none"/><line x1="85" y1="75" x2="115" y2="75" stroke="'+color+'" stroke-width="0.6"/>';
    } else if(type==='frame'){
      inner = '<rect x="55" y="45" width="90" height="110" stroke="'+color+'" stroke-width="1.4" fill="none"/><rect x="68" y="58" width="64" height="84" stroke="'+color+'" stroke-width="0.6" fill="none"/><path d="M78 130 L95 105 L110 125 L122 112" stroke="'+color+'" stroke-width="0.9" fill="none"/>';
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
    ? '<div class="carousel-dots">'+images.map((_,i)=>
        '<span class="carousel-dot'+(i===0?' active':'')+'" data-index="'+i+'"></span>'
      ).join('')+'</div>'
    : '';

  const arrows = images.length > 1
    ? '<button type="button" class="carousel-arrow carousel-prev" aria-label="Previous image" data-carousel-prev>‹</button>' +
      '<button type="button" class="carousel-arrow carousel-next" aria-label="Next image" data-carousel-next>›</button>'
    : '';

  return '<div class="motif-carousel">'+slides+dots+arrows+'</div>';
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
    if(!slides.length){
      carousel.remove();
      return;
    }
    let valid = slides.map((_,i)=>i);
    let current = 0;
    function showSlide(i){
      if(!valid.length) return;
      const prev = current;
      current = i;
      slides.forEach((s,idx)=>{
        s.classList.toggle('active', idx===i);
      });
      // Both slides are semi-transparent midway through a crossfade, so their combined
      // opacity dips below 1 and the SVG motif underneath flashes through. Keeping the
      // outgoing slide fully opaque beneath the incoming one closes that gap.
      if(prev !== i && slides[prev]){
        const out = slides[prev];
        // clear any slide still held from an earlier, faster switch so only ever
        // one slide sits beneath the active one
        slides.forEach(s=>{
          if(s !== out && s.classList.contains('holding')){
            if(s._holdTimer){ clearTimeout(s._holdTimer); s._holdTimer = null; }
            s.classList.remove('holding');
          }
        });
        out.classList.add('holding');
        if(out._holdTimer) clearTimeout(out._holdTimer);
        out._holdTimer = setTimeout(function(){
          out.classList.remove('holding');
          out._holdTimer = null;
        }, 700); // just past the .6s fade
      }
      dots.forEach((d,idx)=>{
        d.classList.toggle('active', idx===i);
      });
    }
    function next(){
      if(valid.length < 2) return;
      const pos = valid.indexOf(current);
      showSlide(valid[(pos+1) % valid.length]);
    }

    function previous(){
      if(valid.length < 2) return;
      const pos = valid.indexOf(current);
      showSlide(valid[(pos - 1 + valid.length) % valid.length]);
    }
    function stopAuto(){
      if(carousel._carouselTimer){
        clearInterval(carousel._carouselTimer);
        carousel._carouselTimer = null;
      }
    }
    function startAuto(){
      if(reducedMotion || valid.length < 2) return;
      stopAuto();
      carousel._carouselTimer = setInterval(next, 4800);
    }
    // Failed image handling
    slides.forEach((slideEl, i)=>{
      const img = slideEl.querySelector('img');
      if(!img) return;
      img.addEventListener('error', function(){
        const dot = dots[i];
        slideEl.remove();
        if(dot) dot.remove();
        valid = valid.filter(v=>v!==i);
        if(!valid.length){
          stopAuto();
          carousel.remove();
          return;
        }
        if(current===i){
          showSlide(valid[0]);
        }
      }, {once:true});
    });
    // Pause automatic rotation while hovering
    if(slides.length > 1){
      carousel.addEventListener('mouseenter', stopAuto);
      carousel.addEventListener('mouseleave', startAuto);
    }
    // Existing dots
    if(dotsEl){
      dotsEl.addEventListener('click', function(e){
        e.stopPropagation();
        const dot = e.target.closest('.carousel-dot');
        if(!dot) return;
        showSlide(parseInt(dot.dataset.index,10));
        startAuto();
      });
    }
    // NEW: Previous / Next buttons
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    if(prevBtn){
      prevBtn.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        previous();
        startAuto();
      });
    }
    if(nextBtn){
      nextBtn.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        next();
        startAuto();
      });
    }
    // Keep the existing automatic rotation
    startAuto();
  });
}

  /* ---------------- Product detail page (product.html) ----------------
     Reads ?handle=... from the URL and renders the matching product from
     HeritageData. Called once per language block, like every other page. */
  function renderProductPage(config, root){
    root = root || document;
    const lang = root.getAttribute('data-lang') || 'en';
    const L = config.labels;
    const i18n = config.i18n;
    const D = window.HeritageData;
    if(!D) return;

    const handle = new URLSearchParams(window.location.search).get('handle');
    const product = handle ? D.find(handle, lang) : null;

    const stage = root.querySelector('[data-role="pdp"]');
    const missing = root.querySelector('[data-role="pdp-missing"]');
    if(!stage) return;

    if(!product){
      stage.hidden = true;
      if(missing) missing.hidden = false;
      return;
    }
    if(missing) missing.hidden = true;
    stage.hidden = false;

    const detail = D.detailFor(product, lang);
    const images = resolveImages(product, 'products');
    const shopUrl = SHOPIFY_STORE + '/products/' + product.handle;

    // ---- breadcrumb + title ----
    const catKey = product.category[product.category.length-1];
    const setText = (role, text) => { const el = root.querySelector('[data-role="'+role+'"]'); if(el) el.textContent = text; };
    setText('pdp-crumb', L.category[catKey] || '');
    setText('pdp-origin', L.category[catKey] || '');
    setText('pdp-name', product.name);

    // ---- gallery: main image + thumbnails ----
    const galleryMain = root.querySelector('[data-role="pdp-gallery-main"]');
    const galleryThumbs = root.querySelector('[data-role="pdp-gallery-thumbs"]');
    if(galleryMain){
      const swatchColor = product.color==='ivory' ? '#B7CC33' : '#C9DC5E';
      galleryMain.innerHTML = motifSVG(product.motif, swatchColor) +
        images.map((src,i)=>'<img class="pdp-main-img'+(i===0?' active':'')+'" data-index="'+i+'" src="'+src+'" alt="'+product.name+'">').join('');
      if(galleryThumbs){
        galleryThumbs.innerHTML = images.map((src,i)=>
          '<button type="button" class="pdp-thumb'+(i===0?' active':'')+'" data-index="'+i+'" aria-label="'+(i+1)+'"><img src="'+src+'" alt="" loading="lazy"></button>'
        ).join('');
      }
      // any image that fails drops out of the gallery; the SVG motif stays underneath
      galleryMain.querySelectorAll('.pdp-main-img').forEach(img=>{
        img.addEventListener('error', function(){
          const idx = img.dataset.index;
          const thumb = galleryThumbs && galleryThumbs.querySelector('.pdp-thumb[data-index="'+idx+'"]');
          if(thumb) thumb.remove();
          const wasActive = img.classList.contains('active');
          img.remove();
          if(wasActive){
            const first = galleryMain.querySelector('.pdp-main-img');
            if(first) first.classList.add('active');
            const firstThumb = galleryThumbs && galleryThumbs.querySelector('.pdp-thumb');
            if(firstThumb) firstThumb.classList.add('active');
          }
        }, {once:true});
      });
      if(galleryThumbs){
        galleryThumbs.addEventListener('click', function(e){
          const btn = e.target.closest('.pdp-thumb');
          if(!btn) return;
          const i = btn.dataset.index;
          galleryThumbs.querySelectorAll('.pdp-thumb').forEach(b=>b.classList.toggle('active', b===btn));
          // same crossfade gap as the card carousels: hold the outgoing image opaque
          // beneath the incoming one so the motif underneath never flashes through
          const outgoing = galleryMain.querySelector('.pdp-main-img.active');
          galleryMain.querySelectorAll('.pdp-main-img').forEach(im=>im.classList.toggle('active', im.dataset.index===i));
          if(outgoing && outgoing.dataset.index !== i){
            outgoing.classList.add('holding');
            if(outgoing._holdTimer) clearTimeout(outgoing._holdTimer);
            outgoing._holdTimer = setTimeout(function(){
              outgoing.classList.remove('holding');
              outgoing._holdTimer = null;
            }, 550); // just past the .45s fade
          }
        });
      }
    }

    // ---- sale badge / price note ----
    const saleEl = root.querySelector('[data-role="pdp-sale"]');
    if(saleEl){
      if(product.sale){
        saleEl.hidden = false;
        saleEl.textContent = i18n.saleBadge.replace('{percent}', product.sale.percent);
      } else {
        saleEl.hidden = true;
      }
    }

    // ---- spec table ----
    const specEl = root.querySelector('[data-role="pdp-specs"]');
    if(specEl){
      const rows = [];
      const push = (k,v)=>{ if(v) rows.push([k,v]); };
      push(i18n.specLabels.category, L.category[catKey]);
      push(i18n.specLabels.material, L.material[product.material]);
      push(i18n.specLabels.color, L.color[product.color]);
      if(product.size && L.size[product.size]) push(i18n.specLabels.size, L.size[product.size]);
      push(i18n.specLabels.origin, detail.origin);
      push(i18n.specLabels.construction, detail.construction);
      push(i18n.specLabels.pile, detail.pile);
      push(i18n.specLabels.knots, detail.knots);
      if(product.room && product.room.length){
        push(i18n.specLabels.room, product.room.map(r=>L.room[r]).filter(Boolean).join(', '));
      }
      specEl.innerHTML = rows.map(r=>
        '<div class="spec-row"><span class="spec-key">'+r[0]+'</span><span class="spec-val">'+r[1]+'</span></div>'
      ).join('');
    }

    // ---- story + care ----
    setText('pdp-story', detail.story);
    const careEl = root.querySelector('[data-role="pdp-care"]');
    if(careEl) careEl.innerHTML = detail.care.map(c=>'<li>'+c+'</li>').join('');

    // ---- actions ----
    const buyBtn = root.querySelector('[data-role="pdp-buy"]');
    if(buyBtn) buyBtn.setAttribute('href', shopUrl);
    const inqBtn = root.querySelector('[data-role="pdp-inquire"]');
    if(inqBtn) inqBtn.setAttribute('href', 'mailto:info@heritagecarpet.sa?subject='+encodeURIComponent(i18n.inquireSubjectPrefix + product.name));
    const waBtn = root.querySelector('[data-role="pdp-whatsapp"]');
    if(waBtn) waBtn.setAttribute('href', 'https://wa.me/966532148055?text='+encodeURIComponent(i18n.waPrefix + product.name));
    const roomBtn = root.querySelector('[data-role="pdp-room"]');
    if(roomBtn) roomBtn.setAttribute('href', 'room.html?handle='+encodeURIComponent(product.handle));

    // ---- related: same category, excluding this one ----
    const relatedEl = root.querySelector('[data-role="pdp-related"]');
    if(relatedEl){
      const related = (D.products[lang]||D.products.en)
        .filter(p => p.handle !== product.handle && p.category.some(c => product.category.indexOf(c) !== -1))
        .slice(0,4);
      relatedEl.innerHTML = related.map(p=>{
        const url = 'product.html?handle='+encodeURIComponent(p.handle);
        const sc = p.color==='ivory' ? '#B7CC33' : '#C9DC5E';
        return '<div class="product-card"><div class="product-media">'+
          '<div class="motif">'+motifSVG(p.motif, sc)+buildCarouselMarkup(resolveImages(p,'products').slice(0,1))+'</div>'+
          '<a class="product-media-link" href="'+url+'" aria-label="'+p.name+'"></a></div>'+
          '<div class="product-body"><div class="product-name"><a href="'+url+'">'+p.name+'</a></div></div></div>';
      }).join('');
      initCarousels(relatedEl);
    }

    // Feed the title back into the per-language title attributes rather than setting
    // document.title directly — setLanguage() runs after this on DOMContentLoaded and
    // would otherwise overwrite it with the page's generic title, and this way the
    // title also stays correct when the visitor switches language.
    const brand = (lang==='ar') ? 'شركة التراث للسجاد' : 'Heritage Carpet Company';
    document.documentElement.setAttribute('data-title-'+lang, product.name + ' — ' + brand);
    if(document.documentElement.getAttribute('lang') === lang){
      document.title = product.name + ' — ' + brand;
    }
  }

  /* ---------------- Offers / sale page (offers.html) ----------------
     Reads every product carrying a `sale` object from HeritageData. Add or
     remove a sale by editing that one field in js/data.js — this page and the
     badges on the collection grid both follow automatically. */
  function renderOffersPage(config, root){
    root = root || document;
    const lang = root.getAttribute('data-lang') || 'en';
    const L = config.labels, i18n = config.i18n;
    const D = window.HeritageData;
    if(!D) return;

    const items = D.onSale(lang);
    const grid = root.querySelector('[data-role="offers-grid"]');
    const empty = root.querySelector('[data-role="offers-empty"]');
    const countEl = root.querySelector('[data-role="offers-count"]');

    if(countEl) countEl.textContent = i18n.count.replace('{n}', items.length);
    if(empty) empty.hidden = items.length > 0;
    if(!grid) return;

    // Group by the campaign note so several promotions can run side by side.
    const groups = {};
    items.forEach(p=>{
      const key = (p.sale && p.sale.note) || 'general';
      (groups[key] = groups[key] || []).push(p);
    });

    grid.innerHTML = Object.keys(groups).map(key=>{
      const g = groups[key];
      const meta = i18n.campaigns[key] || i18n.campaigns.general;
      const cards = g.map(p=>{
        const url = 'product.html?handle='+encodeURIComponent(p.handle);
        const sc = p.color==='ivory' ? '#B7CC33' : '#C9DC5E';
        const metaParts = [];
        if(L.material[p.material]) metaParts.push(L.material[p.material]);
        if(p.size && L.size[p.size]) metaParts.push(L.size[p.size].split(' (')[0].split('(')[0]);
        return '<div class="product-card">'+
          '<div class="product-media"><span class="product-tag sale">-'+p.sale.percent+'%</span>'+
          '<div class="motif">'+motifSVG(p.motif, sc)+buildCarouselMarkup(resolveImages(p,'products'))+'</div>'+
          '<a class="product-media-link" href="'+url+'" aria-label="'+p.name+'"></a></div>'+
          '<div class="product-body">'+
            '<div class="product-origin">'+(L.category[p.category[p.category.length-1]]||'')+'</div>'+
            '<div class="product-name"><a href="'+url+'">'+p.name+'</a></div>'+
            '<div class="product-meta">'+metaParts.join(' \u00b7 ')+'</div>'+
            '<div class="product-actions"><a class="btn btn-fill btn-sm" href="'+url+'">'+i18n.viewDetails+'</a></div>'+
          '</div></div>';
      }).join('');
      return '<div class="offer-group">'+
        '<div class="offer-head">'+
          '<div class="eyebrow on-light">'+meta.kicker+'</div>'+
          '<h2>'+meta.title+'</h2>'+
          '<p>'+meta.blurb+'</p>'+
          (g[0].sale.until ? '<div class="offer-until" data-until="'+g[0].sale.until+'"></div>' : '')+
        '</div>'+
        '<div class="product-grid">'+cards+'</div>'+
      '</div>';
    }).join('');

    // "Ends in N days" — computed live so nothing goes stale in the markup.
    root.querySelectorAll('.offer-until').forEach(el=>{
      const end = new Date(el.dataset.until + 'T23:59:59');
      const days = Math.ceil((end - new Date()) / 86400000);
      el.textContent = days > 0 ? i18n.endsIn.replace('{n}', days) : i18n.ended;
      el.classList.toggle('expired', days <= 0);
    });

    initCarousels(grid);
    revealNow(grid);
  }

  /* ---------------- Showroom appointment booking (visit.html) ----------------
     There is no backend on a static site, so the picked slot is handed off to
     WhatsApp or email as a fully written request rather than silently
     "booked" — the page says so plainly. Slots come from each showroom's real
     opening hours and Friday is handled separately. */
  function renderBookingPage(config, root){
    root = root || document;
    const i18n = config.i18n;
    const state = { showroom:null, date:null, slot:null, name:'', phone:'', notes:'' };

    const showroomsEl = root.querySelector('[data-role="book-showrooms"]');
    const datesEl     = root.querySelector('[data-role="book-dates"]');
    const slotsEl     = root.querySelector('[data-role="book-slots"]');
    const summaryEl   = root.querySelector('[data-role="book-summary"]');
    const confirmBtn  = root.querySelector('[data-role="book-confirm"]');
    const emailBtn    = root.querySelector('[data-role="book-email"]');
    if(!showroomsEl) return;

    // ---- showroom chooser ----
    showroomsEl.innerHTML = config.showrooms.map(s=>
      '<div class="option-card" data-showroom="'+s.key+'"><h4>'+s.label+'<span class="check"></span></h4><p>'+s.hours+'</p></div>'
    ).join('');

    // ---- next 14 days ----
    function buildDates(){
      const out = [];
      const today = new Date(); today.setHours(0,0,0,0);
      for(let i=1;i<=14;i++){
        const d = new Date(today.getTime() + i*86400000);
        out.push(d);
      }
      return out;
    }
    const dates = buildDates();

    function dayKey(d){ return d.toISOString().slice(0,10); }
    function isFriday(d){ return d.getDay() === 5; }

    function renderDates(){
      datesEl.innerHTML = dates.map(d=>{
        const key = dayKey(d);
        const sel = state.date === key ? ' selected' : '';
        return '<button type="button" class="date-chip'+sel+'" data-date="'+key+'">'+
          '<span class="date-dow">'+i18n.days[d.getDay()]+'</span>'+
          '<span class="date-num">'+d.getDate()+'</span>'+
          '<span class="date-mon">'+i18n.months[d.getMonth()]+'</span>'+
        '</button>';
      }).join('');
    }

    function slotsFor(dateKey, showroomKey){
      const sr = config.showrooms.filter(s=>s.key===showroomKey)[0];
      if(!sr) return [];
      const d = new Date(dateKey + 'T00:00:00');
      return isFriday(d) ? sr.slotsFri : sr.slots;
    }

    function renderSlots(){
      if(!state.date || !state.showroom){
        slotsEl.innerHTML = '<p class="slot-hint">'+i18n.pickFirst+'</p>';
        return;
      }
      const list = slotsFor(state.date, state.showroom);
      if(!list.length){
        slotsEl.innerHTML = '<p class="slot-hint">'+i18n.noSlots+'</p>';
        return;
      }
      slotsEl.innerHTML = list.map(t=>
        '<button type="button" class="slot-chip'+(state.slot===t?' selected':'')+'" data-slot="'+t+'">'+t+'</button>'
      ).join('');
    }

    function labelFor(key){
      const s = config.showrooms.filter(x=>x.key===key)[0];
      return s ? s.label : '';
    }

    function prettyDate(key){
      if(!key) return i18n.notSelected;
      const d = new Date(key+'T00:00:00');
      return i18n.days[d.getDay()] + ', ' + d.getDate() + ' ' + i18n.months[d.getMonth()];
    }

    function renderSummary(){
      if(!summaryEl) return;
      const rows = [
        [i18n.sumLabels.showroom, state.showroom ? labelFor(state.showroom) : i18n.notSelected],
        [i18n.sumLabels.date,     prettyDate(state.date)],
        [i18n.sumLabels.time,     state.slot || i18n.notSelected],
        [i18n.sumLabels.name,     state.name || i18n.notSelected],
        [i18n.sumLabels.phone,    state.phone || i18n.notSelected]
      ];
      summaryEl.innerHTML = rows.map(r=>
        '<div class="preview-summary-row summary-light"><span>'+r[0]+'</span><span>'+r[1]+'</span></div>'
      ).join('');
      const ready = !!(state.showroom && state.date && state.slot && state.name.trim());
      if(confirmBtn) confirmBtn.classList.toggle('is-disabled', !ready);
      if(emailBtn) emailBtn.classList.toggle('is-disabled', !ready);
      if(ready){
        const lines = [
          i18n.sumLabels.showroom+': '+labelFor(state.showroom),
          i18n.sumLabels.date+': '+prettyDate(state.date),
          i18n.sumLabels.time+': '+state.slot,
          i18n.sumLabels.name+': '+state.name,
          i18n.sumLabels.phone+': '+(state.phone||'-'),
          i18n.sumLabels.notes+': '+(state.notes||'-')
        ].join('\n');
        const body = i18n.requestIntro + '\n\n' + lines;
        if(confirmBtn) confirmBtn.setAttribute('href','https://wa.me/966532148055?text='+encodeURIComponent(body));
        if(emailBtn) emailBtn.setAttribute('href','mailto:info@heritagecarpet.sa?subject='+encodeURIComponent(i18n.emailSubject)+'&body='+encodeURIComponent(body));
      } else {
        if(confirmBtn) confirmBtn.setAttribute('href','#');
        if(emailBtn) emailBtn.setAttribute('href','#');
      }
    }

    showroomsEl.addEventListener('click', function(e){
      const card = e.target.closest('[data-showroom]');
      if(!card) return;
      state.showroom = card.dataset.showroom;
      state.slot = null;
      showroomsEl.querySelectorAll('.option-card').forEach(c=>c.classList.toggle('selected', c===card));
      renderSlots(); renderSummary();
    });
    datesEl.addEventListener('click', function(e){
      const btn = e.target.closest('[data-date]');
      if(!btn) return;
      state.date = btn.dataset.date;
      state.slot = null;
      renderDates(); renderSlots(); renderSummary();
    });
    slotsEl.addEventListener('click', function(e){
      const btn = e.target.closest('[data-slot]');
      if(!btn) return;
      state.slot = btn.dataset.slot;
      renderSlots(); renderSummary();
    });
    ['name','phone','notes'].forEach(f=>{
      const el = root.querySelector('[data-role="book-'+f+'"]');
      if(el) el.addEventListener('input', function(){ state[f] = el.value; renderSummary(); });
    });
    [confirmBtn, emailBtn].forEach(btn=>{
      if(!btn) return;
      btn.addEventListener('click', function(e){
        if(btn.classList.contains('is-disabled')){ e.preventDefault(); }
      });
    });

    renderDates(); renderSlots(); renderSummary();
  }

  /* ---------------- Room visualizer (room.html) ----------------
     Photo-based, not tracked AR: the visitor supplies a room photo (camera or
     library), the piece is composited onto it on a canvas, and they can move,
     scale, rotate and perspective-tilt it, then download the result.
     Everything stays on the device — no upload.

     Robustness notes (these were real failure modes, not hypotheticals):
       * If a product photo is missing, we fall back to rendering the piece's
         SVG motif as the rug, so the tool works before any photography exists.
       * The controls are always visible and simply disabled until a room photo
         is loaded, rather than hidden — a half-failed load used to leave the
         panel empty with no explanation.
       * Download uses toBlob + object URL and reports tainted-canvas failures
         (which happen when the page is opened over file:// instead of http)
         instead of silently doing nothing. */
  function renderRoomVisualizer(config, root){
    root = root || document;
    const lang = root.getAttribute('data-lang') || 'en';
    const i18n = config.i18n || {};
    const D = window.HeritageData;

    const canvas = root.querySelector('[data-role="room-canvas"]');
    if(!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');

    const fileInput  = root.querySelector('[data-role="room-file"]');
    const dropZone   = root.querySelector('[data-role="room-drop"]');
    const rugSelect  = root.querySelector('[data-role="room-rug"]');
    const stageWrap  = root.querySelector('[data-role="room-stage"]');
    const controls   = root.querySelector('[data-role="room-controls"]');
    const dlBtn      = root.querySelector('[data-role="room-download"]');
    const resetBtn   = root.querySelector('[data-role="room-reset"]');
    const changeBtn  = root.querySelector('[data-role="room-change"]');
    const statusEl   = root.querySelector('[data-role="room-status"]');

    const scaleInput = root.querySelector('[data-role="room-scale"]');
    const rotInput   = root.querySelector('[data-role="room-rotate"]');
    const perspInput = root.querySelector('[data-role="room-perspective"]');
    const opacInput  = root.querySelector('[data-role="room-opacity"]');

    const DEFAULTS = { x:0.5, y:0.68, scale:0.55, rot:0, persp:0.55, opacity:1 };
    const view = Object.assign({ room:null, rug:null }, DEFAULTS);

    function say(msg, kind){
      if(!statusEl) return;
      statusEl.textContent = msg || '';
      statusEl.className = 'room-status' + (kind ? ' ' + kind : '');
    }

    // Controls stay visible at all times; they are only disabled until there is
    // a room photo to composite onto, so the panel is never mysteriously empty.
    function setEnabled(on){
      if(controls){
        controls.hidden = false;
        controls.classList.toggle('is-locked', !on);
        controls.querySelectorAll('input,button,a').forEach(el=>{
          if(on){ el.removeAttribute('aria-disabled'); }
          else { el.setAttribute('aria-disabled','true'); }
        });
      }
    }

    function loadImage(src){
      return new Promise((res, rej)=>{
        const im = new Image();
        im.onload = ()=>res(im);
        im.onerror = ()=>rej(new Error('load failed: '+src));
        im.src = src;
      });
    }

    // The piece's own SVG motif, used when no photograph is available.
    function motifImage(product){
      const color = product.color === 'ivory' ? '#B7CC33' : '#C9DC5E';
      const svg = motifSVG(product.motif, color);
      return loadImage('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg));
    }

    function loadRug(handle){
      if(!D) return Promise.reject(new Error('no catalog'));
      const p = D.find(handle, lang) || D.find(handle, 'en');
      if(!p) return Promise.reject(new Error('unknown handle'));
      const imgs = resolveImages(p, 'products');
      // try each photo in turn, then fall back to the motif so the tool always works
      let chain = Promise.reject(new Error('start'));
      imgs.forEach(src=>{ chain = chain.catch(()=>loadImage(src)); });
      return chain
        .then(img=>({img:img, fallback:false}))
        .catch(()=>motifImage(p).then(img=>({img:img, fallback:true})));
    }

    function draw(){
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0,0,W,H);
      if(view.room) ctx.drawImage(view.room, 0, 0, W, H);
      if(!view.rug) return;

      const rugW = W * view.scale;
      const ratio = (view.rug.naturalHeight || view.rug.height || 1) / (view.rug.naturalWidth || view.rug.width || 1);
      const rugH = rugW * ratio;

      ctx.save();
      ctx.globalAlpha = view.opacity;
      ctx.translate(W * view.x, H * view.y);
      ctx.rotate(view.rot * Math.PI / 180);
      ctx.transform(1, 0, 0, Math.max(0.12, view.persp), 0, 0);
      ctx.shadowColor = 'rgba(0,0,0,0.45)';
      ctx.shadowBlur = rugW * 0.05;
      ctx.shadowOffsetY = rugH * 0.04;
      ctx.drawImage(view.rug, -rugW/2, -rugH/2, rugW, rugH);
      ctx.restore();
    }

    function fitCanvasTo(img){
      const maxW = 1200;
      const w = Math.min(img.naturalWidth || maxW, maxW);
      const h = Math.round(w * (img.naturalHeight || 800) / (img.naturalWidth || 1200));
      canvas.width = w; canvas.height = h;
    }

    function refreshRug(){
      if(!rugSelect) return Promise.resolve();
      return loadRug(rugSelect.value).then(r=>{
        view.rug = r.img;
        if(r.fallback) say(i18n.motifFallback || 'Showing the pattern outline — no photograph uploaded for this piece yet.', 'warn');
        else if(view.room) say('');
        draw();
      }).catch(()=>{
        view.rug = null;
        say(i18n.rugFailed || 'Could not load that piece.', 'warn');
      });
    }

    function useRoomFile(file){
      if(!file){ return; }
      if(!file.type || !file.type.startsWith('image/')){
        say(i18n.notImage || 'That file is not an image — please choose a photo.', 'warn');
        return;
      }
      say(i18n.loading || 'Loading your photo…');
      const reader = new FileReader();
      reader.onerror = ()=>say(i18n.readFailed || 'Could not read that file.', 'warn');
      reader.onload = function(e){
        loadImage(e.target.result).then(img=>{
          view.room = img;
          fitCanvasTo(img);
          if(stageWrap) stageWrap.hidden = false;
          if(dropZone) dropZone.classList.add('has-room');
          setEnabled(true);
          say('');
          return refreshRug();
        }).then(draw).catch(()=>{
          say(i18n.photoFailed || 'That photo could not be opened. Try another image.', 'warn');
        });
      };
      reader.readAsDataURL(file);
    }

    if(dropZone && fileInput){
      dropZone.addEventListener('click', function(e){
        // the file input lives inside the drop zone; without this guard its own
        // click bubbles back here and re-triggers the picker
        if(e.target === fileInput) return;
        fileInput.click();
      });
      ['dragover','dragleave','drop'].forEach(ev=>{
        dropZone.addEventListener(ev, function(e){
          e.preventDefault();
          dropZone.classList.toggle('dragover', ev==='dragover');
        });
      });
      dropZone.addEventListener('drop', e=>useRoomFile(e.dataTransfer.files[0]));
      fileInput.addEventListener('click', e=>e.stopPropagation());
      fileInput.addEventListener('change', function(){ useRoomFile(fileInput.files[0]); });
    }
    if(changeBtn && fileInput){
      changeBtn.addEventListener('click', function(){ fileInput.click(); });
    }
    if(rugSelect) rugSelect.addEventListener('change', refreshRug);

    const bind = (el, key, transform)=>{
      if(!el) return;
      const handler = function(){
        view[key] = transform ? transform(el.value) : parseFloat(el.value);
        draw();
      };
      el.addEventListener('input', handler);
      el.addEventListener('change', handler); // some mobile browsers only fire change
    };
    bind(scaleInput, 'scale', v=>parseFloat(v)/100);
    bind(rotInput,   'rot',   v=>parseFloat(v));
    bind(perspInput, 'persp', v=>parseFloat(v)/100);
    bind(opacInput,  'opacity', v=>parseFloat(v)/100);

    /* ---- Direct manipulation on the canvas ----
       One finger  : drag to reposition
       Two fingers : pinch to resize, twist to rotate, and a vertical two-finger
                     drag adjusts the floor angle
       Wheel       : resize on desktop
       The sliders stay in sync so the two ways of working never disagree. */
    const pointers = new Map();
    let gesture = null;          // snapshot taken when the 2nd finger lands
    let dragging = false;

    function localPoint(e){
      const r = canvas.getBoundingClientRect();
      if(!r.width || !r.height) return null;
      return { x:(e.clientX - r.left) / r.width, y:(e.clientY - r.top) / r.height, r:r };
    }

    function syncSliders(){
      if(scaleInput) scaleInput.value = Math.round(view.scale * 100);
      if(rotInput)   rotInput.value   = Math.round(view.rot);
      if(perspInput) perspInput.value = Math.round(view.persp * 100);
    }

    function twoFingerState(){
      const pts = Array.from(pointers.values());
      const a = pts[0], b = pts[1];
      const dx = b.x - a.x, dy = b.y - a.y;
      return {
        dist: Math.hypot(dx, dy),
        angle: Math.atan2(dy, dx) * 180 / Math.PI,
        midY: (a.y + b.y) / 2
      };
    }

    canvas.addEventListener('pointerdown', function(e){
      if(!view.rug || !view.room) return;
      canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, {x:e.clientX, y:e.clientY});

      if(pointers.size === 1){
        dragging = true;
        const p = localPoint(e);
        if(p){ view.x = Math.min(1, Math.max(0, p.x)); view.y = Math.min(1, Math.max(0, p.y)); draw(); }
      } else if(pointers.size === 2){
        dragging = false;                     // hand over to the pinch/rotate gesture
        const st = twoFingerState();
        gesture = { dist:st.dist, angle:st.angle, midY:st.midY,
                    scale:view.scale, rot:view.rot, persp:view.persp };
      }
    });

    canvas.addEventListener('pointermove', function(e){
      if(!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, {x:e.clientX, y:e.clientY});
      e.preventDefault();

      if(pointers.size >= 2 && gesture){
        const st = twoFingerState();
        if(gesture.dist > 0){
          view.scale = Math.min(1.6, Math.max(0.10, gesture.scale * (st.dist / gesture.dist)));
        }
        let delta = st.angle - gesture.angle;
        while(delta > 180) delta -= 360;
        while(delta < -180) delta += 360;
        view.rot = Math.max(-180, Math.min(180, gesture.rot + delta));
        // two fingers sliding up/down together flattens or lifts the floor plane
        const rect = canvas.getBoundingClientRect();
        if(rect.height){
          const dy = (st.midY - gesture.midY) / rect.height;
          view.persp = Math.min(1, Math.max(0.12, gesture.persp + dy));
        }
        syncSliders();
        draw();
      } else if(dragging){
        const p = localPoint(e);
        if(p){ view.x = Math.min(1, Math.max(0, p.x)); view.y = Math.min(1, Math.max(0, p.y)); draw(); }
      }
    }, {passive:false});

    function endPointer(e){
      pointers.delete(e.pointerId);
      if(pointers.size < 2) gesture = null;
      if(pointers.size === 0) dragging = false;
      if(pointers.size === 1){
        // lifting one finger of a pinch shouldn't teleport the rug: resume dragging
        // from wherever the remaining finger is, not from a stale position
        dragging = true;
      }
    }
    canvas.addEventListener('pointerup', endPointer);
    canvas.addEventListener('pointercancel', endPointer);
    canvas.addEventListener('pointerleave', function(e){ if(pointers.has(e.pointerId)) endPointer(e); });

    // wheel to resize, so desktop users aren't forced to the slider
    canvas.addEventListener('wheel', function(e){
      if(!view.rug || !view.room) return;
      e.preventDefault();
      view.scale = Math.min(1.6, Math.max(0.10, view.scale + (e.deltaY > 0 ? -0.03 : 0.03)));
      syncSliders();
      draw();
    }, {passive:false});

    if(resetBtn){
      resetBtn.addEventListener('click', function(){
        Object.assign(view, DEFAULTS);
        if(scaleInput) scaleInput.value = 55;
        if(rotInput) rotInput.value = 0;
        if(perspInput) perspInput.value = 55;
        if(opacInput) opacInput.value = 100;
        draw();
      });
    }

    if(dlBtn){
      dlBtn.addEventListener('click', function(e){
        e.preventDefault();
        if(!view.room){ say(i18n.needPhoto || 'Add a room photo first.', 'warn'); return; }
        const finish = (url)=>{
          const a = document.createElement('a');
          a.href = url;
          a.download = 'heritage-room-preview.jpg';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          say(i18n.downloaded || 'Preview saved.', 'ok');
        };
        try{
          if(canvas.toBlob){
            canvas.toBlob(function(blob){
              if(!blob){ say(i18n.downloadFailed || 'Could not export the image.', 'warn'); return; }
              const url = URL.createObjectURL(blob);
              finish(url);
              setTimeout(()=>URL.revokeObjectURL(url), 10000);
            }, 'image/jpeg', 0.92);
          } else {
            finish(canvas.toDataURL('image/jpeg', 0.92));
          }
        }catch(err){
          // SecurityError here means the canvas is tainted — almost always because
          // the page was opened from the file system rather than served over http.
          say(i18n.taintedCanvas || 'Export blocked by the browser. Open the site over http(s) rather than as a local file, then try again.', 'warn');
        }
      });
    }

    // populate the piece chooser from the shared catalog
    if(rugSelect && D){
      const list = (D.products[lang] || D.products.en)
        .filter(p=>p.category.indexOf('accessories')===-1 && p.category.indexOf('furniture')===-1);
      rugSelect.innerHTML = list.map(p=>'<option value="'+p.handle+'">'+p.name+'</option>').join('');
      const preset = new URLSearchParams(window.location.search).get('handle');
      if(preset && list.some(p=>p.handle===preset)) rugSelect.value = preset;
    }

    // On touch devices tell people to use the photo directly — the sliders stay as a
    // fine-tune fallback, but pinch/twist on the image is the primary interaction.
    const coarsePointer = window.matchMedia && window.matchMedia('(hover: none)').matches;
    if(coarsePointer){
      const note = root.querySelector('.room-note');
      if(note){
        note.textContent = i18n.touchHint || (lang === 'ar'
          ? 'اسحب بإصبع واحد لتحريك السجادة، وقرّب أو باعد بإصبعين لتغيير المقاس، ولفّهما للدوران، واسحبهما لأعلى أو لأسفل لضبط زاوية الأرضية. هذه معاينة بصرية وليست قياسًا دقيقًا.'
          : 'Drag with one finger to move the rug. Pinch with two fingers to resize, twist to rotate, and slide two fingers up or down to set the floor angle. This is a visual guide, not a measured fit.');
      }
    }

    setEnabled(false);
    say(i18n.startHint || '');
    refreshRug();
  }

  /* ---------------- Scroll-reveal safety net ----------------
     .reveal starts at opacity:0 and is switched on by an IntersectionObserver.
     Two situations break that and leave real content invisible:
       1. Content that is already below the fold on a small screen — on phones the
          product grid starts under the viewport, so nothing reported an
          intersection and the grid stayed at opacity 0 even though every card
          was in the DOM. (This was the "products only appear after I touch a
          filter" bug — interacting forced a layout change that woke the observer.)
       2. Anything inside the hidden language block, which can never intersect
          at all until that block is shown.
     revealInView() force-reveals anything currently on screen, and revealNow()
     is used for grids we render ourselves, which must never be hidden. -------- */
  function revealNow(el){
    if(el) el.classList.add('is-visible');
  }

  function revealInView(scope){
    scope = scope || document;
    const h = window.innerHeight || 800;
    scope.querySelectorAll('.reveal').forEach(el=>{
      if(el.classList.contains('is-visible')) return;
      let top = 0;
      try { top = el.getBoundingClientRect().top; } catch(e) { top = 0; }
      // generous margin: better a missed animation than invisible content
      if(top < h * 1.5) el.classList.add('is-visible');
    });
  }

  /* ---------------- Projects page (projects.html) ----------------
     Content comes from js/projects-data.js so the English and Arabic copy sit
     side by side in one file. Rendered per language block like every other page. */
  function renderProjectsPage(config, root){
    root = root || document;
    const lang = root.getAttribute('data-lang') || 'en';
    const P = window.HeritageProjects;
    if(!P) return;
    const C = P[lang] || P.en;

    // ---- showcase video: embed > mp4 > poster still ----
    const videoWrap = root.querySelector('[data-role="pv-video"]');
    if(videoWrap){
      const v = P.video || {};
      if(v.embed){
        videoWrap.innerHTML = '<iframe src="'+v.embed+'" title="'+C.hero.title+'" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
      } else if(v.src){
        videoWrap.innerHTML =
          '<video autoplay muted loop playsinline preload="metadata"'+(v.poster?' poster="'+v.poster+'"':'')+'>'+
          '<source src="'+v.src+'" type="video/mp4"></video>';
        const vid = videoWrap.querySelector('video');
        // if the file isn't there yet, fall back to the poster, then to the motif
        vid.addEventListener('error', function(){ fallbackVideo(videoWrap, v); }, {once:true});
        vid.querySelector('source').addEventListener('error', function(){ fallbackVideo(videoWrap, v); }, {once:true});
      } else {
        fallbackVideo(videoWrap, v);
      }
    }
    function fallbackVideo(wrap, v){
      wrap.innerHTML = v && v.poster
        ? '<img class="pv-video-poster" src="'+v.poster+'" alt="">'
        : motifSVG('arch', '#C9DC5E');
      const img = wrap.querySelector('img');
      if(img) img.addEventListener('error', function(){ wrap.innerHTML = motifSVG('arch','#C9DC5E'); }, {once:true});
    }

    const setText = (role, txt) => { const el = root.querySelector('[data-role="'+role+'"]'); if(el) el.textContent = txt; };
    const head = (prefix, obj) => {
      setText(prefix+'-kicker', obj.kicker);
      setText(prefix+'-title', obj.title);
      setText(prefix+'-lead', obj.lead);
    };
    head('pv-hero', C.hero);
    head('pv-commercial', C.commercialHead);
    head('pv-intro', C.introHead);
    head('pv-gallery', C.galleryHead);
    head('pv-process', C.processHead);
    head('pv-form', C.formHead);

    // ---- commercial solutions (same set as the homepage) ----
    const cg = root.querySelector('[data-role="pv-commercial-grid"]');
    if(cg) cg.innerHTML = C.commercial.map(c=>{
      const inner = '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.3">'+ICONS[c.icon]+'</svg><h4>'+c.t+'</h4><p>'+c.d+'</p>';
      return c.href
        ? '<a class="commercial-card is-link" href="'+c.href+'">'+inner+'</a>'
        : '<div class="commercial-card">'+inner+'</div>';
    }).join('');

    // ---- the seven solution blocks ----
    const list = root.querySelector('[data-role="pv-solutions"]');
    if(list){
      list.innerHTML = C.solutions.map((s, i)=>{
        const imgs = (Array.isArray(s.images) && s.images.length) ? s.images : [
          'Assets/projects/'+s.slug+'.jpg',
          'Assets/projects/'+s.slug+'-2.jpg',
          'Assets/projects/'+s.slug+'-3.jpg'
        ];
        const panel = (key, items)=>{
          if(!items || !items.length) return '';
          return '<div class="acc">'+
            '<button type="button" class="acc-head" aria-expanded="false">'+
              '<span>'+C.panelLabels[key]+'</span><span class="acc-icon" aria-hidden="true"></span>'+
            '</button>'+
            '<div class="acc-body"><ul>'+items.map(x=>'<li>'+x+'</li>').join('')+'</ul></div>'+
          '</div>';
        };
        return '<article class="solution'+(i%2 ? ' is-reversed':'')+'" id="solution-'+s.slug+'-'+lang+'">'+
          '<div class="solution-media"><div class="motif">'+motifSVG(s.motif, '#C9DC5E')+buildCarouselMarkup(imgs)+'</div>'+
            '<div class="solution-project">'+s.project+'</div></div>'+
          '<div class="solution-body">'+
            '<h3>'+s.title+'</h3>'+
            '<p class="solution-text">'+s.body+'</p>'+
            '<div class="acc-group">'+
              panel('usage', s.usage)+
              panel('characteristics', s.characteristics)+
              panel('availability', s.availability)+
            '</div>'+
          '</div>'+
        '</article>';
      }).join('');

      // accordions — one handler for the whole list
      list.addEventListener('click', function(e){
        const btn = e.target.closest('.acc-head');
        if(!btn) return;
        const open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        btn.parentNode.classList.toggle('is-open', !open);
      });
      initCarousels(list);
    }

    // ---- full-width featured gallery ----
    const gal = root.querySelector('[data-role="pv-gallery-track"]');
    if(gal){
      const slides = C.solutions.map(s=>({slug:s.slug, label:s.project}));
      gal.innerHTML = slides.map((s,i)=>
        '<div class="pv-slide'+(i===0?' active':'')+'" data-index="'+i+'">'+
          motifSVG('medallion','#C9DC5E')+
          '<img src="Assets/projects/'+s.slug+'.jpg" alt="'+s.label+'">'+
          '<div class="pv-slide-label">'+s.label+'</div>'+
        '</div>'
      ).join('');
      const dots = root.querySelector('[data-role="pv-gallery-dots"]');
      if(dots) dots.innerHTML = slides.map((_,i)=>'<span class="carousel-dot'+(i===0?' active':'')+'" data-index="'+i+'"></span>').join('');
      let gi = 0;
      const show = (i)=>{
        gi = (i + slides.length) % slides.length;
        gal.querySelectorAll('.pv-slide').forEach((el,idx)=>el.classList.toggle('active', idx===gi));
        if(dots) dots.querySelectorAll('.carousel-dot').forEach((el,idx)=>el.classList.toggle('active', idx===gi));
      };
      gal.querySelectorAll('.pv-slide img').forEach(img=>{
        img.addEventListener('error', function(){ img.remove(); }, {once:true});
      });
      const prev = root.querySelector('[data-role="pv-gallery-prev"]');
      const next = root.querySelector('[data-role="pv-gallery-next"]');
      if(prev) prev.addEventListener('click', ()=>show(gi-1));
      if(next) next.addEventListener('click', ()=>show(gi+1));
      if(dots) dots.addEventListener('click', function(e){
        const d = e.target.closest('.carousel-dot');
        if(d) show(parseInt(d.dataset.index,10));
      });
      if(!reducedMotion){
        let timer = setInterval(()=>show(gi+1), 5200);
        gal.addEventListener('mouseenter', ()=>clearInterval(timer));
        gal.addEventListener('mouseleave', ()=>{ timer = setInterval(()=>show(gi+1), 5200); });
      }
    }

    // ---- end-to-end process ----
    const proc = root.querySelector('[data-role="pv-process"]');
    if(proc) proc.innerHTML = C.process.map(p=>
      '<div class="process-step"><div class="process-num">'+p.n+'</div><h4>'+p.t+'</h4><p>'+p.d+'</p></div>'
    ).join('');

    // ---- enquiry form -> WhatsApp / email, same handoff as Book a Visit ----
    const form = root.querySelector('[data-role="pv-form"]');
    if(form){
      const F = C.form;
      form.innerHTML =
        '<div class="pv-field"><label>'+F.name+' *</label><input class="field-input" data-f="name"></div>'+
        '<div class="pv-field"><label>'+F.company+'</label><input class="field-input" data-f="company"></div>'+
        '<div class="pv-field"><label>'+F.email+'</label><input class="field-input" type="email" data-f="email"></div>'+
        '<div class="pv-field"><label>'+F.phone+'</label><input class="field-input" data-f="phone"></div>'+
        '<div class="pv-field"><label>'+F.type+'</label><select class="field-input" data-f="type">'+
          '<option value=""></option>'+F.types.map(t=>'<option>'+t+'</option>').join('')+'</select></div>'+
        '<div class="pv-field"><label>'+F.location+'</label><input class="field-input" data-f="location"></div>'+
        '<div class="pv-field"><label>'+F.size+'</label><input class="field-input" type="number" min="0" data-f="size"></div>'+
        '<div class="pv-field"><label>'+F.timeline+'</label><select class="field-input" data-f="timeline">'+
          '<option value=""></option>'+F.timelines.map(t=>'<option>'+t+'</option>').join('')+'</select></div>'+
        '<div class="pv-field pv-field-full"><label>'+F.details+'</label>'+
          '<textarea class="field-input" rows="4" data-f="details" placeholder="'+F.detailsPlaceholder+'"></textarea></div>'+
        '<div class="pv-field pv-field-full pv-actions">'+
          '<a class="btn btn-wa is-disabled" data-role="pv-send-wa" href="#" target="_blank" rel="noopener">'+F.submitWa+'</a>'+
          '<a class="btn btn-outline dark is-disabled" data-role="pv-send-email" href="#">'+F.submitEmail+'</a>'+
        '</div>'+
        '<p class="pv-note pv-field-full" data-role="pv-form-note">'+F.note+'</p>';

      const val = (k)=>{ const el = form.querySelector('[data-f="'+k+'"]'); return el ? el.value.trim() : ''; };
      const waBtn = form.querySelector('[data-role="pv-send-wa"]');
      const emBtn = form.querySelector('[data-role="pv-send-email"]');
      const note  = form.querySelector('[data-role="pv-form-note"]');

      function refresh(){
        const ready = !!(val('name') && (val('email') || val('phone')));
        [waBtn, emBtn].forEach(b=>{ if(b) b.classList.toggle('is-disabled', !ready); });
        note.textContent = ready ? F.note : F.required;
        if(!ready){
          if(waBtn) waBtn.setAttribute('href','#');
          if(emBtn) emBtn.setAttribute('href','#');
          return;
        }
        const rows = [
          F.name+': '+val('name'),
          F.company+': '+(val('company')||'-'),
          F.email+': '+(val('email')||'-'),
          F.phone+': '+(val('phone')||'-'),
          F.type+': '+(val('type')||'-'),
          F.location+': '+(val('location')||'-'),
          F.size+': '+(val('size')||'-'),
          F.timeline+': '+(val('timeline')||'-'),
          F.details+': '+(val('details')||'-')
        ].join('\n');
        const body = F.intro+'\n\n'+rows;
        if(waBtn) waBtn.setAttribute('href','https://wa.me/966532148055?text='+encodeURIComponent(body));
        if(emBtn) emBtn.setAttribute('href','mailto:info@heritagecarpet.sa?subject='+encodeURIComponent(F.subject)+'&body='+encodeURIComponent(body));
      }
      form.addEventListener('input', refresh);
      form.addEventListener('change', refresh);
      [waBtn, emBtn].forEach(b=>{
        if(b) b.addEventListener('click', function(e){ if(b.classList.contains('is-disabled')) e.preventDefault(); });
      });
      refresh();
    }
  }

  /* ---------------- Language switching ---------------- */
  function setLanguage(lang, opts){
    opts = opts || {};
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    document.querySelectorAll('.lang-block').forEach(block => {
      block.hidden = block.getAttribute('data-lang') !== lang;
    });

    const title = document.documentElement.getAttribute('data-title-' + lang);
    if(title) document.title = title;

    try { localStorage.setItem('heritage-lang', lang); } catch(e) {}

    // Drive the EN/AR pill: the brass indicator position is CSS-driven off this class.
    document.querySelectorAll('[data-lang-switch]').forEach(btn => {
      btn.classList.toggle('ar-active', lang === 'ar');
      btn.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'Switch to Arabic');
    });

    // Elements inside a hidden block can never trigger the IntersectionObserver, so
    // anything already on screen in the block we just revealed would stay at opacity 0.
    revealInView(document.querySelector('.lang-block[data-lang="'+lang+'"]'));

    if(!opts.skipScroll) window.scrollTo(0, 0);
    // The browser resolved any #hash before we knew which language block would be
    // visible, so re-resolve it against the block that is actually shown.
    if(opts.keepHash && window.location.hash){
      const target = document.querySelector(window.location.hash);
      if(target && target.scrollIntoView){
        setTimeout(function(){ target.scrollIntoView({behavior:'auto', block:'start'}); }, 0);
      }
    }
  }

  function initLanguageSwitch(){
    let stored = null;
    try { stored = localStorage.getItem('heritage-lang'); } catch(e) {}

    const initialLang = stored || document.documentElement.getAttribute('lang') || 'en';
    setLanguage(initialLang, {skipScroll:true, keepHash:true});

    document.querySelectorAll('[data-lang-switch]').forEach(btn => {
      // The nav toggles are the EN/AR pill (they contain .lang-option spans); the footer
      // ones are plain "EN / AR" text buttons. Without this flag the pill's fixed 58px
      // sizing would squash the footer text, so mark them for the plain-button styling.
      if(!btn.querySelector('.lang-option')) btn.classList.add('lang-toggle-text');

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

    // threshold must be 0, not a fraction. intersectionRatio is visibleArea/totalArea,
    // so an element taller than ~10x the viewport can never reach 0.1 — which is exactly
    // what happened to the single-column product grid on phones (22 cards ≈ 10,000px tall,
    // max ratio ≈ 0.076). It stayed at opacity 0 until a filter shortened the grid enough
    // to cross the threshold, which looked like "products only appear after filtering".
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, {threshold:0, rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
    document.querySelectorAll('.section-head').forEach(el=>{ el.classList.add('reveal'); io.observe(el); });

    // Belt and braces: reveal anything already on screen right now, so content can never
    // be stranded at opacity 0 if the observer misbehaves or is unsupported.
    revealInView(document);

    document.querySelectorAll('[data-role="year"]').forEach(el=>{ el.textContent = new Date().getFullYear(); });

    initLanguageSwitch();

    // Final safety sweep once layout has settled, then again on resize/orientation
    // change — phones report a very different viewport after the URL bar collapses.
    revealInView(document);
    window.addEventListener('load', function(){ revealInView(document); });
    window.addEventListener('resize', function(){ revealInView(document); }, {passive:true});
    window.addEventListener('orientationchange', function(){ revealInView(document); });

    initScrollButton();
  }

  /* ---------------- Scroll to bottom / back to top ----------------
     A single button that flips direction rather than two competing ones: it
     points down while you are in the top half of the page and up once you pass
     halfway. Injected here so no page markup has to change, and it hides itself
     entirely on pages too short to scroll. */
  const SCROLL_FAB_LABELS = {
    en: {down:'Scroll to bottom', up:'Back to top'},
    ar: {down:'انتقل إلى الأسفل', up:'العودة إلى الأعلى'}
  };

  function initScrollButton(){
    if(document.querySelector('.scroll-fab')) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'scroll-fab';
    btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v16"/><path d="M5 13l7 7 7-7"/></svg>';
    document.body.appendChild(btn);

    let goingUp = false;

    function maxScroll(){
      return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    }

    function update(){
      const max = maxScroll();
      // nothing to scroll — keep the button out of the way entirely
      if(max < 240){
        btn.classList.remove('is-ready');
        return;
      }
      btn.classList.add('is-ready');
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      goingUp = y > max / 2;
      btn.classList.toggle('is-up', goingUp);
      const lang = document.documentElement.getAttribute('lang') === 'ar' ? 'ar' : 'en';
      const label = SCROLL_FAB_LABELS[lang][goingUp ? 'up' : 'down'];
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
    }

    btn.addEventListener('click', function(){
      window.scrollTo({
        top: goingUp ? 0 : maxScroll(),
        behavior: reducedMotion ? 'auto' : 'smooth'
      });
    });

    window.addEventListener('scroll', update, {passive:true});
    window.addEventListener('resize', update, {passive:true});
    window.addEventListener('load', update);
    // language switch changes the label, and switching blocks changes page height
    document.querySelectorAll('[data-lang-switch]').forEach(b=>{
      b.addEventListener('click', function(){ setTimeout(update, 60); });
    });
    update();
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
      // each card links through to the matching solution on the Projects page
      commercialGrid.innerHTML = content.commercial.map(c=>{
        const inner = '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.3">'+ICONS[c.icon]+'</svg><h4>'+c.t+'</h4><p>'+c.d+'</p>';
        return c.href
          ? '<a class="commercial-card is-link" href="'+c.href+'">'+inner+'</a>'
          : '<div class="commercial-card">'+inner+'</div>';
      }).join('');
    }

    const projectsGrid = root.querySelector('[data-role="projects-grid"]');
    if(projectsGrid && content.projects){
      // the homepage shows a short selection; the full set lives on projects.html
      const projectList = content.projectsLimit ? content.projects.slice(0, content.projectsLimit) : content.projects;
      projectsGrid.innerHTML = projectList.map(p=>{
        const photo = buildCarouselMarkup(resolveImages(p, 'projects'));
        return '<div class="project-item" data-cat="'+p.cat+'"><div class="motif" style="--ar:'+p.aspect+'">'+motifSVG(p.motif,'#C9DC5E')+photo+'</div>'+
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
          const detailUrl = 'product.html?handle=' + encodeURIComponent(p.handle);
          const inquireSubject = encodeURIComponent(i18n.inquireSubjectPrefix + p.name);
          const swatchColor = p.color==='ivory' ? '#B7CC33' : '#C9DC5E';
          const photo = buildCarouselMarkup(resolveImages(p, 'products'));
          // Meta line is built from whatever fields the item actually has, so furniture and
          // accessories (which have no rug "size") don't break the card.
          const metaParts = [];
          if(L.material[p.material]) metaParts.push(L.material[p.material]);
          if(L.color[p.color]) metaParts.push(L.color[p.color]);
          if(p.size && L.size[p.size]) metaParts.push(L.size[p.size].split(' (')[0].split('(')[0]);
          const badge = p.sale
            ? '<span class="product-tag sale">-'+p.sale.percent+'%</span>'
            : (p.isNew ? '<span class="product-tag">'+i18n.newTag+'</span>' : '');
          return '<div class="product-card">'+
            '<div class="product-media">'+ badge +
            '<div class="motif">'+motifSVG(p.motif, swatchColor)+photo+'</div>'+
            '<a class="product-media-link" href="'+detailUrl+'" aria-label="'+p.name+'"></a></div>'+
            '<div class="product-body">'+
              '<div class="product-origin">'+L.category[p.category[p.category.length-1]]+'</div>'+
              '<div class="product-name"><a href="'+detailUrl+'">'+p.name+'</a></div>'+
              '<div class="product-meta">'+metaParts.join(' \u00b7 ')+'</div>'+
              '<div class="product-actions">'+
                '<a class="btn btn-fill btn-sm" href="'+detailUrl+'">'+(i18n.viewDetails || i18n.viewOnShopify)+'</a>'+
                '<a class="btn btn-outline dark btn-sm" href="mailto:info@heritagecarpet.sa?subject='+inquireSubject+'">'+i18n.inquire+'</a>'+
              '</div>'+
            '</div></div>';
        }).join('');
        initCarousels(grid);
        revealNow(grid); // content we just rendered must never sit at opacity 0
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
          '<div class="custom-color-row"><input type="color" id="'+uid('customColorInput')+'" value="'+(effHex||'#B7CC33')+'">'+
          '<div><div style="font-size:13px;font-weight:600;">'+i18n.customColorLabel+'</div>'+
          '<div class="hex-readout" id="'+uid('hexReadout')+'">'+(state.customHex ? state.customHex.toUpperCase() : i18n.notSelected)+'</div></div></div>';
      } else if(s===4){
        const effHex = state.customHex || (config.colors.find(c=>c.key===state.color)||{}).hex || '#B7CC33';
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
      el.innerHTML = rows.map(r=>'<div class="preview-summary-row summary-light"><span>'+r[0]+'</span><span>'+r[1]+'</span></div>').join('');
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

      const baseHex = state.customHex || (config.colors.find(c=>c.key===state.color) || {}).hex || '#C7C6C5';
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

  return { SHOPIFY_STORE, motifSVG, renderHomePage, renderCollectionsPage, renderBespokeStudio, renderProductPage, renderProjectsPage, renderOffersPage, renderBookingPage, renderRoomVisualizer, setLanguage, resolveImages, buildCarouselMarkup, initCarousels };
})();
