/* ======================================================================
   HERITAGE CARPET COMPANY — SHARED CATALOG DATA
   ----------------------------------------------------------------------
   THIS IS THE ONE FILE YOU EDIT TO MANAGE PRODUCTS.
   It is loaded by collections.html (the grid), product.html (the detail
   page), offers.html (the sale page) and room.html (the visualizer), so a
   product only has to be described once instead of copy-pasted per page.

   To add a product: copy an existing {...} block inside products.en and
   add the matching Arabic block in products.ar with the SAME `handle`.
   The handle is the join key across languages and every page, and it is
   also the Shopify product handle and the image filename stem.

   Optional per-product detail fields used by product.html:
     origin, knots, construction, pile, story, care[]
   Anything you leave out falls back to a sensible default for that
   material/category (see DETAIL_DEFAULTS at the bottom of this file), so
   you can fill them in gradually.

   SALE fields (used by offers.html and the badge on cards):
     sale: {percent: 20, until: '2026-09-30', note: 'Autumn Collection Event'}
   ====================================================================== */
window.HeritageData = (function(){

  /* ======================================================================
     PRODUCT TREE  —  Division > Category > Sub-category
     ----------------------------------------------------------------------
     To add a category, add its key here and a label in `labels` above.
     To add a sub-category, add it under `subs` against its parent category.
     Products declare their place with category:['division','category','sub'].
     ====================================================================== */
  const tree = {
    order: ['area-rugs', 'flooring', 'furniture-division'],
    divisions: {
      'area-rugs':        ['handmade-rug', 'hand-tufted-rug', 'machine-made-rug'],
      'flooring':         ['masjed-carpets', 'carpet-tableau', 'carpet-tiles', 'axminster-carpet',
                           'printed-carpet', 'tufted-carpet', 'spc-parquet', 'vinyl-flooring'],
      'furniture-division': ['living-room', 'bedroom', 'dining-room', 'wall-decor-mirrors', 'lighting', 'decorative-accessories']
    },
    subs: {
      'handmade-rug':     ['persian', 'turkish', 'oriental'],
      'machine-made-rug': ['contemporary'],
      'carpet-tiles':     ['crayon', 'mont-blanc', 'space-x', 'toscana'],
      'living-room':         ['sofa-sets', 'corner-sofa-sets', 'sofas', 'poufs', 'armchairs', 'console', 'coffee-table-sets', 'coffee-tables', 'side-end-tables', 'nest-of-tables', 'bookcases-display-shelves', 'tv-media-units'],
      'bedroom':             ['beds-bedroom-sets', 'wardrobes', 'mattresses', 'benches', 'nightstands', 'dresser'],
      'dining-room':         ['dining-room-sets', 'dining-tables', 'dining-chairs', 'cabinets-buffets'],
      'wall-decor-mirrors':  ['mirrors', 'wall-art'],
      'lighting':            ['pendant-lamps', 'table-lamps', 'floor-lamps'],
      'decorative-accessories': ['artificial-flowers-plants', 'decorative-objects-sculpture', 'trays-boxes', 'vase-candlestick'],
    },
    /* Divano sells these online; a node with no products of its own links out. */
    links: {
      'living-room': 'https://www.divanoksa.com/en/collections/living-room',
      'sofa-sets': 'https://www.divanoksa.com/en/collections/sofa-sets',
      'corner-sofa-sets': 'https://www.divanoksa.com/en/collections/corner-sofa-sets',
      'sofas': 'https://www.divanoksa.com/en/collections/sofas',
      'poufs': 'https://www.divanoksa.com/en/collections/poufs',
      'armchairs': 'https://www.divanoksa.com/en/collections/armchair',
      'console': 'https://www.divanoksa.com/en/collections/console',
      'coffee-table-sets': 'https://www.divanoksa.com/en/collections/coffee-table-sets',
      'coffee-tables': 'https://www.divanoksa.com/en/collections/coffee-table',
      'side-end-tables': 'https://www.divanoksa.com/en/collections/side-end-tables',
      'nest-of-tables': 'https://www.divanoksa.com/en/collections/nest-of-tables',
      'bookcases-display-shelves': 'https://www.divanoksa.com/en/collections/bookcases-display-shelves',
      'tv-media-units': 'https://www.divanoksa.com/en/collections/tv-media-units',
      'bedroom': 'https://www.divanoksa.com/en/collections/bedroom',
      'beds-bedroom-sets': 'https://www.divanoksa.com/en/collections/bedroom-sets',
      'wardrobes': 'https://www.divanoksa.com/en/collections/wardrobes',
      'mattresses': 'https://www.divanoksa.com/en/collections/mattresses',
      'benches': 'https://www.divanoksa.com/en/collections/%D9%85%D9%82%D8%A7%D8%B9%D8%AF-%D8%A8%D9%86%D8%B4',
      'nightstands': 'https://www.divanoksa.com/en/collections/nightstands',
      'dresser': 'https://www.divanoksa.com/en/collections/dresser',
      'dining-room': 'https://www.divanoksa.com/en/collections/dining-room',
      'dining-room-sets': 'https://www.divanoksa.com/en/collections/dining-room-sets',
      'dining-tables': 'https://www.divanoksa.com/en/collections/dining-tables',
      'dining-chairs': 'https://www.divanoksa.com/en/collections/dinning-chair',
      'cabinets-buffets': 'https://www.divanoksa.com/en/collections/console-tables-mirrors',
      'mirrors': 'https://www.divanoksa.com/en/collections/mirrors',
      'wall-art': 'https://www.divanoksa.com/en/collections/wall-art',
      'pendant-lamps': 'https://www.divanoksa.com/en/collections/pendant-lamp',
      'table-lamps': 'https://www.divanoksa.com/en/collections/table-lamp',
      'floor-lamps': 'https://www.divanoksa.com/en/collections/floor-lamp',
      'artificial-flowers-plants': 'https://www.divanoksa.com/en/collections/artificial-flowers-plants',
      'decorative-objects-sculpture': 'https://www.divanoksa.com/en/collections/decorative-objects-sculpture',
      'trays-boxes': 'https://www.divanoksa.com/en/collections/trays-boxes',
      'vase-candlestick': 'https://www.divanoksa.com/en/collections/vase-candlestick'
    },
    /* old ?category= links keep working: key -> [division, category, sub] */
    legacy: {
      'handmade':     ['area-rugs', 'handmade-rug', null],
      'machine-made': ['area-rugs', 'machine-made-rug', null],
      'commercial':   ['flooring', null, null],
      'persian':      ['area-rugs', 'handmade-rug', 'persian'],
      'turkish':      ['area-rugs', 'handmade-rug', 'turkish'],
      'oriental':     ['area-rugs', 'handmade-rug', 'oriental'],
      'contemporary': ['area-rugs', 'machine-made-rug', 'contemporary'],
      'carpet-tiles': ['flooring', 'carpet-tiles', null],
      'crayon':       ['flooring', 'carpet-tiles', 'crayon'],
      'mont-blanc':   ['flooring', 'carpet-tiles', 'mont-blanc'],
      'space-x':      ['flooring', 'carpet-tiles', 'space-x'],
      'toscana':      ['flooring', 'carpet-tiles', 'toscana']
    }
  };

  const labels = {
    en: {
      category: {persian:'Persian', turkish:'Turkish', oriental:'Oriental', contemporary:'Contemporary', furniture:'Furniture', accessories:'Home Accessories', 'carpet-tiles':'Carpet Tiles', crayon:'Crayon', 'mont-blanc':'Mont Blanc', 'space-x':'Space X', toscana:'Toscana', 'area-rugs':'Area Rugs', flooring:'Flooring', 'furniture-division':'Furniture', 'handmade-rug':'Handmade Rug', 'hand-tufted-rug':'Hand Tufted Rug', 'machine-made-rug':'Machine Made Rug', 'masjed-carpets':'Masjed Carpets', 'carpet-tableau':'Carpet Tableau', 'axminster-carpet':'Axminster Carpet', 'printed-carpet':'Printed Carpet', 'tufted-carpet':'Tufted Carpet', 'spc-parquet':'SPC Parquet', 'vinyl-flooring':'Vinyl Flooring', 'living-room':'Living Room', 'sofa-sets':'Sofa Sets', 'corner-sofa-sets':'Corner Sofa Sets', sofas:'Sofas', poufs:'Poufs', armchairs:'Armchairs', console:'Console', 'coffee-table-sets':'Coffee Table Sets', 'coffee-tables':'Coffee Tables', 'side-end-tables':'Side & End Tables', 'nest-of-tables':'Nest of Tables', 'bookcases-display-shelves':'Bookcases & Display Shelves', 'tv-media-units':'TV & Media Units', bedroom:'Bedroom', 'beds-bedroom-sets':'Beds & Bedroom Sets', wardrobes:'Wardrobes', mattresses:'Mattresses', benches:'Benches', nightstands:'Nightstands', dresser:'Dresser', 'dining-room':'Dining Room', 'dining-room-sets':'Dining Rooms', 'dining-tables':'Dining Tables', 'dining-chairs':'Dining Chairs', 'cabinets-buffets':'Cabinets & Buffets', 'wall-decor-mirrors':'Wall Decor and Mirrors', mirrors:'Mirrors', 'wall-art':'Wall Art', lighting:'Lighting', 'pendant-lamps':'Pendant Lamps', 'table-lamps':'Table Lamps', 'floor-lamps':'Floor Lamps', 'decorative-accessories':'Decorative Accessories', 'artificial-flowers-plants':'Artificial Flowers & Plants', 'decorative-objects-sculpture':'Decorative Objects & Sculpture', 'trays-boxes':'Trays & Boxes', 'vase-candlestick':'Vase & Candlestick'},
      material: {silk:'Silk', wool:'Wool', mixed:'Mixed Fibers', velvet:'Velvet', wood:'Solid Wood', brass:'Brass & Metal', 'olefin-pp':'Olefin PP', 'universal-pp':'Universal PP'},
      size: {small:'Small (up to 2×3m)', medium:'Medium (2×3–3×4m)', large:'Large (3×4–4×6m)', oversized:'Oversized (4×6m+)'},
      room: {'living-room':'Living Room','majlis':'Majlis','bedroom':'Bedroom','dining':'Dining Room','hallway':'Hallway','commercial':'Commercial Space'},
      color: {madder:'Madder Red', ivory:'Ivory', indigo:'Indigo Teal', charcoal:'Charcoal', gold:'Antique Gold', gray:'Grey', green:'Green', yellow:'Yellow', orange:'Orange', blue:'Blue', brown:'Brown', beige:'Beige', black:'Black'},
      colorHex: {madder:'#7A2E27', ivory:'#EDE6D6', indigo:'#2B4A47', charcoal:'#1B1714', gold:'#B08D46', gray:'#8A8A88', green:'#7E9B3F', yellow:'#C7B23A', orange:'#B5773A', blue:'#4A6B87', brown:'#6E4F3A', beige:'#C3B49A', black:'#241F1C'}
    },
    ar: {
      category: {persian:'فارسي', turkish:'تركي', oriental:'شرقي', contemporary:'معاصر', furniture:'الأثاث', accessories:'إكسسوارات المنزل', 'carpet-tiles':'بلاط السجاد', crayon:'كرايون', 'mont-blanc':'مون بلان', 'space-x':'سبيس إكس', toscana:'توسكانا', 'area-rugs':'السجاد', flooring:'الأرضيات', 'furniture-division':'الأثاث', 'handmade-rug':'سجاد يدوي', 'hand-tufted-rug':'سجاد مغروز يدويًا', 'machine-made-rug':'سجاد آلي', 'masjed-carpets':'سجاد المساجد', 'carpet-tableau':'لوحات سجاد', 'axminster-carpet':'سجاد أكسمنستر', 'printed-carpet':'سجاد مطبوع', 'tufted-carpet':'سجاد مغروز', 'spc-parquet':'باركيه SPC', 'vinyl-flooring':'أرضيات فينيل', 'living-room':'غرفة المعيشة', 'sofa-sets':'طقم كنب', 'corner-sofa-sets':'طقم كنب زاوية', sofas:'كنب', poufs:'بوف', armchairs:'كراسي بذراعين', console:'كونسول', 'coffee-table-sets':'أطقم طاولات قهوة', 'coffee-tables':'طاولات قهوة', 'side-end-tables':'طاولات جانبية', 'nest-of-tables':'طاولات متداخلة', 'bookcases-display-shelves':'مكتبات ورفوف عرض', 'tv-media-units':'وحدات تلفزيون', bedroom:'غرفة النوم', 'beds-bedroom-sets':'أسرّة وأطقم غرف نوم', wardrobes:'خزائن ملابس', mattresses:'مراتب', benches:'مقاعد بنش', nightstands:'كوميدينو', dresser:'تسريحة', 'dining-room':'غرفة الطعام', 'dining-room-sets':'أطقم غرف طعام', 'dining-tables':'طاولات طعام', 'dining-chairs':'كراسي طعام', 'cabinets-buffets':'دواليب وبوفيهات', 'wall-decor-mirrors':'ديكور الجدران والمرايا', mirrors:'مرايا', 'wall-art':'لوحات جدارية', lighting:'الإضاءة', 'pendant-lamps':'مصابيح معلقة', 'table-lamps':'مصابيح طاولة', 'floor-lamps':'مصابيح أرضية', 'decorative-accessories':'إكسسوارات ديكور', 'artificial-flowers-plants':'زهور ونباتات صناعية', 'decorative-objects-sculpture':'قطع ديكور ومنحوتات', 'trays-boxes':'صواني وعلب', 'vase-candlestick':'مزهريات وشمعدانات'},
      material: {silk:'حرير', wool:'صوف', mixed:'ألياف مختلطة', velvet:'مخمل', wood:'خشب طبيعي', brass:'نحاس ومعادن', 'olefin-pp':'أوليفين PP', 'universal-pp':'يونيفرسال PP'},
      size: {small:'صغير (حتى 2×3م)', medium:'متوسط (2×3–3×4م)', large:'كبير (3×4–4×6م)', oversized:'كبير جدًا (أكثر من 4×6م)'},
      room: {'living-room':'غرفة المعيشة','majlis':'المجلس','bedroom':'غرفة النوم','dining':'غرفة الطعام','hallway':'الممر','commercial':'مساحة تجارية'},
      color: {madder:'أحمر الفوّة', ivory:'عاجي', indigo:'أزرق نيلي', charcoal:'فحمي', gold:'ذهبي عتيق', gray:'رمادي', green:'أخضر', yellow:'أصفر', orange:'برتقالي', blue:'أزرق', brown:'بني', beige:'بيج', black:'أسود'},
      colorHex: {madder:'#7A2E27', ivory:'#EDE6D6', indigo:'#2B4A47', charcoal:'#1B1714', gold:'#B08D46', gray:'#8A8A88', green:'#7E9B3F', yellow:'#C7B23A', orange:'#B5773A', blue:'#4A6B87', brown:'#6E4F3A', beige:'#C3B49A', black:'#241F1C'}
    }
  };

  const products = {
    en: [
      {name:'Isfahan Medallion Silk Rug', category:['area-rugs','handmade-rug','persian'], material:'silk', color:'madder', size:'large', room:['living-room','majlis'], motif:'medallion', handle:'isfahan-medallion-silk-rug', isNew:false, images:[
     'Assets/products/area-rugs/handmade-rug/persian/isfahan-medallion-silk-rug.jpg',
     'Assets/products/area-rugs/handmade-rug/persian/isfahan-medallion-silk-rug-2.jpg',
     'Assets/products/area-rugs/handmade-rug/persian/isfahan-medallion-silk-rug-3.jpg']},
      {name:'Tabriz Floral Wool Carpet', category:['area-rugs','handmade-rug','persian'], material:'wool', color:'ivory', size:'oversized', room:['majlis','dining'], motif:'boteh', handle:'tabriz-floral-wool-carpet', isNew:false, images:[
     'Assets/products/area-rugs/handmade-rug/persian/tabriz-floral-wool-carpet.jpg',
     'Assets/products/area-rugs/handmade-rug/persian/tabriz-floral-wool-carpet-2.jpg',
     'Assets/products/area-rugs/handmade-rug/persian/tabriz-floral-wool-carpet-3.jpg']},
      {name:'Kashan Boteh Runner', category:['area-rugs','handmade-rug','persian'], material:'silk', color:'madder', size:'small', room:['hallway'], motif:'boteh', handle:'kashan-boteh-runner', isNew:true, images:[
     'Assets/products/area-rugs/handmade-rug/persian/kashan-boteh-runner.jpg',
     'Assets/products/area-rugs/handmade-rug/persian/kashan-boteh-runner-2.jpg',
     'Assets/products/area-rugs/handmade-rug/persian/kashan-boteh-runner-3.jpg']},
      {name:'Hereke Silk Masterpiece', category:['area-rugs','handmade-rug','turkish'], material:'silk', color:'gold', size:'medium', room:['living-room'], motif:'medallion', handle:'hereke-silk-masterpiece', isNew:false, images:[
     'Assets/products/area-rugs/handmade-rug/turkish/hereke-silk-masterpiece.jpg',
     'Assets/products/area-rugs/handmade-rug/turkish/hereke-silk-masterpiece-2.jpg',
     'Assets/products/area-rugs/handmade-rug/turkish/hereke-silk-masterpiece-3.jpg']},
      {name:'Konya Kilim Geometric Rug', category:['area-rugs','handmade-rug','turkish'], material:'wool', color:'charcoal', size:'medium', room:['living-room','bedroom'], motif:'lattice', handle:'konya-kilim-geometric-rug', sale:{percent:25, until:'2026-10-31', note:'autumn'}, isNew:false, images:[
     'Assets/products/area-rugs/handmade-rug/turkish/konya-kilim-geometric-rug.jpg',
     'Assets/products/area-rugs/handmade-rug/turkish/konya-kilim-geometric-rug-2.jpg',
     'Assets/products/area-rugs/handmade-rug/turkish/konya-kilim-geometric-rug-3.jpg']},
      {name:'Anatolian Tribal Wool Rug', category:['area-rugs','handmade-rug','turkish','oriental'], material:'wool', color:'indigo', size:'small', room:['bedroom'], motif:'chevron', handle:'anatolian-tribal-wool-rug', isNew:true, images:[
     'Assets/products/area-rugs/handmade-rug/turkish/anatolian-tribal-wool-rug.jpg',
     'Assets/products/area-rugs/handmade-rug/turkish/anatolian-tribal-wool-rug-2.jpg',
     'Assets/products/area-rugs/handmade-rug/turkish/anatolian-tribal-wool-rug-3.jpg']},
      {name:'Silk Road Oriental Classic', category:['area-rugs','handmade-rug','oriental'], material:'mixed', color:'madder', size:'large', room:['dining'], motif:'medallion', handle:'silk-road-oriental-classic', isNew:false, images:[
     'Assets/products/area-rugs/handmade-rug/oriental/silk-road-oriental-classic.jpg',
     'Assets/products/area-rugs/handmade-rug/oriental/silk-road-oriental-classic-2.jpg',
     'Assets/products/area-rugs/handmade-rug/oriental/silk-road-oriental-classic-3.jpg']},
      {name:'Nain Fine Wool Carpet', category:['area-rugs','handmade-rug','persian'], material:'wool', color:'ivory', size:'oversized', room:['majlis'], motif:'medallion', handle:'nain-fine-wool-carpet', sale:{percent:10, until:'2026-12-31', note:'clearance'}, isNew:false, images:[
     'Assets/products/area-rugs/handmade-rug/persian/nain-fine-wool-carpet.jpg',
     'Assets/products/area-rugs/handmade-rug/persian/nain-fine-wool-carpet-2.jpg',
     'Assets/products/area-rugs/handmade-rug/persian/nain-fine-wool-carpet-3.jpg']},
      {name:'Abstract Ivory Contemporary Rug', category:['area-rugs','machine-made-rug','contemporary'], material:'wool', color:'ivory', size:'large', room:['living-room'], motif:'lattice', handle:'abstract-ivory-contemporary-rug', isNew:true, images:[
     'Assets/products/area-rugs/machine-made-rug/contemporary/abstract-ivory-contemporary-rug.jpg',
     'Assets/products/area-rugs/machine-made-rug/contemporary/abstract-ivory-contemporary-rug-2.jpg',
     'Assets/products/area-rugs/machine-made-rug/contemporary/abstract-ivory-contemporary-rug-3.jpg']},
      {name:'Charcoal Linear Contemporary Rug', category:['area-rugs','machine-made-rug','contemporary'], material:'mixed', color:'charcoal', size:'medium', room:['living-room','bedroom'], motif:'chevron', handle:'charcoal-linear-contemporary-rug', isNew:false, images:[
     'Assets/products/area-rugs/machine-made-rug/contemporary/charcoal-linear-contemporary-rug.jpg',
     'Assets/products/area-rugs/machine-made-rug/contemporary/charcoal-linear-contemporary-rug-2.jpg',
     'Assets/products/area-rugs/machine-made-rug/contemporary/charcoal-linear-contemporary-rug-3.jpg']},
      {name:'Gold Trellis Contemporary Rug', category:['area-rugs','machine-made-rug','contemporary'], material:'wool', color:'gold', size:'medium', room:['dining'], motif:'lattice', handle:'gold-trellis-contemporary-rug', sale:{percent:20, until:'2026-10-31', note:'autumn'}, isNew:false, images:[
     'Assets/products/area-rugs/machine-made-rug/contemporary/gold-trellis-contemporary-rug.jpg',
     'Assets/products/area-rugs/machine-made-rug/contemporary/gold-trellis-contemporary-rug-2.jpg',
     'Assets/products/area-rugs/machine-made-rug/contemporary/gold-trellis-contemporary-rug-3.jpg']},
      {name:'Everyday Trellis Machine-Made Rug', category:['area-rugs','machine-made-rug'], material:'mixed', color:'charcoal', size:'large', room:['living-room'], motif:'tile', handle:'everyday-trellis-machine-made-rug', sale:{percent:30, until:'2026-10-31', note:'autumn'}, isNew:false, images:[
     'Assets/products/area-rugs/machine-made-rug/everyday-trellis-machine-made-rug.jpg',
     'Assets/products/area-rugs/machine-made-rug/everyday-trellis-machine-made-rug-2.jpg',
     'Assets/products/area-rugs/machine-made-rug/everyday-trellis-machine-made-rug-3.jpg']},
      {name:'Durable Medallion Machine-Made Rug', category:['area-rugs','machine-made-rug'], material:'mixed', color:'madder', size:'medium', room:['dining','hallway'], motif:'medallion', handle:'durable-medallion-machine-made-rug', isNew:false, images:[
     'Assets/products/area-rugs/machine-made-rug/durable-medallion-machine-made-rug.jpg',
     'Assets/products/area-rugs/machine-made-rug/durable-medallion-machine-made-rug-2.jpg',
     'Assets/products/area-rugs/machine-made-rug/durable-medallion-machine-made-rug-3.jpg']},
      {name:'Hospitality Broadloom Carpet Tile', category:['flooring','carpet-tiles'], material:'mixed', color:'charcoal', size:'oversized', room:['commercial'], motif:'tile', handle:'hospitality-broadloom-carpet-tile', isNew:false, images:[
     'Assets/products/flooring/carpet-tiles/hospitality-broadloom-carpet-tile.jpg',
     'Assets/products/flooring/carpet-tiles/hospitality-broadloom-carpet-tile-2.jpg',
     'Assets/products/flooring/carpet-tiles/hospitality-broadloom-carpet-tile-3.jpg']},
      {name:'Prayer Hall Custom Carpet', category:['flooring','masjed-carpets'], material:'wool', color:'indigo', size:'oversized', room:['commercial'], motif:'arch', handle:'prayer-hall-custom-carpet', isNew:true, images:[
     'Assets/products/flooring/masjed-carpets/prayer-hall-custom-carpet.jpg',
     'Assets/products/flooring/masjed-carpets/prayer-hall-custom-carpet-2.jpg',
     'Assets/products/flooring/masjed-carpets/prayer-hall-custom-carpet-3.jpg']},
      {name:'Executive Office Carpet Tile', category:['flooring','carpet-tiles'], material:'mixed', color:'ivory', size:'large', room:['commercial'], motif:'tile', handle:'executive-office-carpet-tile', isNew:false, images:[
     'Assets/products/flooring/carpet-tiles/executive-office-carpet-tile.jpg',
     'Assets/products/flooring/carpet-tiles/executive-office-carpet-tile-2.jpg',
     'Assets/products/flooring/carpet-tiles/executive-office-carpet-tile-3.jpg']},
      {name:'Majlis Corner Sofa', category:['furniture'], material:'velvet', color:'ivory', room:['living-room','majlis'], motif:'sofa', handle:'majlis-corner-sofa', isNew:true, images:[
     'Assets/products/furniture/majlis-corner-sofa.jpg',
     'Assets/products/furniture/majlis-corner-sofa-2.jpg',
     'Assets/products/furniture/majlis-corner-sofa-3.jpg']},
      {name:'Carved Walnut Coffee Table', category:['furniture'], material:'wood', color:'charcoal', room:['living-room'], motif:'floorplan', handle:'carved-walnut-coffee-table', isNew:false, images:[
     'Assets/products/furniture/carved-walnut-coffee-table.jpg',
     'Assets/products/furniture/carved-walnut-coffee-table-2.jpg',
     'Assets/products/furniture/carved-walnut-coffee-table-3.jpg']},
      {name:'Velvet Accent Armchair', category:['furniture'], material:'velvet', color:'madder', room:['living-room','bedroom'], motif:'sofa', handle:'velvet-accent-armchair', sale:{percent:15, until:'2026-11-15', note:'furniture'}, isNew:false, images:[
     'Assets/products/furniture/velvet-accent-armchair.jpg',
     'Assets/products/furniture/velvet-accent-armchair-2.jpg',
     'Assets/products/furniture/velvet-accent-armchair-3.jpg']},
      {name:'Brass Floor Lamp', category:['accessories'], material:'brass', color:'gold', room:['living-room'], motif:'lamp', handle:'brass-floor-lamp', isNew:true, images:[
     'Assets/products/furniture/brass-floor-lamp.jpg',
     'Assets/products/furniture/brass-floor-lamp-2.jpg',
     'Assets/products/furniture/brass-floor-lamp-3.jpg']},
      {name:'Handblown Glass Vase', category:['accessories'], material:'mixed', color:'indigo', room:['dining'], motif:'vase', handle:'handblown-glass-vase', sale:{percent:20, until:'2026-11-15', note:'furniture'}, isNew:false, images:[
     'Assets/products/furniture/handblown-glass-vase.jpg',
     'Assets/products/furniture/handblown-glass-vase-2.jpg',
     'Assets/products/furniture/handblown-glass-vase-3.jpg']},
      {name:'Framed Silk Wall Panel', category:['accessories'], material:'silk', color:'gold', room:['majlis'], motif:'frame', handle:'framed-silk-panel', isNew:false, images:[
     'Assets/products/furniture/framed-silk-panel.jpg',
     'Assets/products/furniture/framed-silk-panel-2.jpg',
     'Assets/products/furniture/framed-silk-panel-3.jpg']}
    ,

      /* ---------------- Carpet Tiles (commercial) ---------------- */
      {name:'Crayon CM 385 Grid Gray', category:['flooring','carpet-tiles','crayon'], material:'olefin-pp', color:'gray', room:['commercial'], motif:'tile', handle:'crayon-cm-385-grid-gray', isNew:true, construction:'Multi Level Scroll, 1/12" machine gauge', pile:'5 mm pile · 8 mm total height', specs:[['Pile Weight','700 gms/m²'], ['Tile Size','50 × 50 cm'], ['Per Box','20 tiles (5 m²)'], ['Backing','Non-woven Lutrador; PVC + fibre glass'], ['Installation','Surface tackifier'], ['Antistatic','Permanently antistatic']], images:['Assets/products/flooring/carpet-tiles/crayon/crayon-cm-385-grid-gray.jpg']},
      {name:'Crayon CM 386 Grid Green', category:['flooring','carpet-tiles','crayon'], material:'olefin-pp', color:'green', room:['commercial'], motif:'tile', handle:'crayon-cm-386-grid-green', isNew:true, construction:'Multi Level Scroll, 1/12" machine gauge', pile:'5 mm pile · 8 mm total height', specs:[['Pile Weight','700 gms/m²'], ['Tile Size','50 × 50 cm'], ['Per Box','20 tiles (5 m²)'], ['Backing','Non-woven Lutrador; PVC + fibre glass'], ['Installation','Surface tackifier'], ['Antistatic','Permanently antistatic']], images:['Assets/products/flooring/carpet-tiles/crayon/crayon-cm-386-grid-green.jpg']},
      {name:'Crayon CM 389 Grid Yellow', category:['flooring','carpet-tiles','crayon'], material:'olefin-pp', color:'yellow', room:['commercial'], motif:'tile', handle:'crayon-cm-389-grid-yellow', isNew:true, construction:'Multi Level Scroll, 1/12" machine gauge', pile:'5 mm pile · 8 mm total height', specs:[['Pile Weight','700 gms/m²'], ['Tile Size','50 × 50 cm'], ['Per Box','20 tiles (5 m²)'], ['Backing','Non-woven Lutrador; PVC + fibre glass'], ['Installation','Surface tackifier'], ['Antistatic','Permanently antistatic']], images:['Assets/products/flooring/carpet-tiles/crayon/crayon-cm-389-grid-yellow.jpg']},
      {name:'Crayon CM 387 Grid Orange', category:['flooring','carpet-tiles','crayon'], material:'olefin-pp', color:'orange', room:['commercial'], motif:'tile', handle:'crayon-cm-387-grid-orange', isNew:true, construction:'Multi Level Scroll, 1/12" machine gauge', pile:'5 mm pile · 8 mm total height', specs:[['Pile Weight','700 gms/m²'], ['Tile Size','50 × 50 cm'], ['Per Box','20 tiles (5 m²)'], ['Backing','Non-woven Lutrador; PVC + fibre glass'], ['Installation','Surface tackifier'], ['Antistatic','Permanently antistatic']], images:['Assets/products/flooring/carpet-tiles/crayon/crayon-cm-387-grid-orange.jpg']},
      {name:'Crayon CM 388 Grid Blue', category:['flooring','carpet-tiles','crayon'], material:'olefin-pp', color:'blue', room:['commercial'], motif:'tile', handle:'crayon-cm-388-grid-blue', isNew:true, construction:'Multi Level Scroll, 1/12" machine gauge', pile:'5 mm pile · 8 mm total height', specs:[['Pile Weight','700 gms/m²'], ['Tile Size','50 × 50 cm'], ['Per Box','20 tiles (5 m²)'], ['Backing','Non-woven Lutrador; PVC + fibre glass'], ['Installation','Surface tackifier'], ['Antistatic','Permanently antistatic']], images:['Assets/products/flooring/carpet-tiles/crayon/crayon-cm-388-grid-blue.jpg']},
      {name:'Mont Blanc MB 602 Mont Smoke', category:['flooring','carpet-tiles','mont-blanc'], material:'universal-pp', color:'gray', room:['commercial'], motif:'tile', handle:'mont-blanc-mb-602-mont-smoke', isNew:true, construction:'High Definition Color Point, 1/10" machine gauge', pile:'6 mm pile · 10 mm total height', specs:[['Pile Weight','850 gms/m²'], ['Tile Size','25 × 100 cm plank'], ['Per Box','20 tiles (5 m²)'], ['Backing','Non-woven Lutrador; PVC + fibre glass'], ['Installation','Surface tackifier'], ['Antistatic','Permanently antistatic']], images:['Assets/products/flooring/carpet-tiles/mont-blanc/mont-blanc-mb-602-mont-smoke.jpg']},
      {name:'Mont Blanc MB 612 Mont Afina', category:['flooring','carpet-tiles','mont-blanc'], material:'universal-pp', color:'blue', room:['commercial'], motif:'tile', handle:'mont-blanc-mb-612-mont-afina', isNew:true, construction:'High Definition Color Point, 1/10" machine gauge', pile:'6 mm pile · 10 mm total height', specs:[['Pile Weight','850 gms/m²'], ['Tile Size','25 × 100 cm plank'], ['Per Box','20 tiles (5 m²)'], ['Backing','Non-woven Lutrador; PVC + fibre glass'], ['Installation','Surface tackifier'], ['Antistatic','Permanently antistatic']], images:['Assets/products/flooring/carpet-tiles/mont-blanc/mont-blanc-mb-612-mont-afina.jpg']},
      {name:'Mont Blanc MB 622 Mont Charcoal', category:['flooring','carpet-tiles','mont-blanc'], material:'universal-pp', color:'charcoal', room:['commercial'], motif:'tile', handle:'mont-blanc-mb-622-mont-charcoal', isNew:true, construction:'High Definition Color Point, 1/10" machine gauge', pile:'6 mm pile · 10 mm total height', specs:[['Pile Weight','850 gms/m²'], ['Tile Size','25 × 100 cm plank'], ['Per Box','20 tiles (5 m²)'], ['Backing','Non-woven Lutrador; PVC + fibre glass'], ['Installation','Surface tackifier'], ['Antistatic','Permanently antistatic']], images:['Assets/products/flooring/carpet-tiles/mont-blanc/mont-blanc-mb-622-mont-charcoal.jpg']},
      {name:'Mont Blanc MB 632 Mont Fawn', category:['flooring','carpet-tiles','mont-blanc'], material:'universal-pp', color:'beige', room:['commercial'], motif:'tile', handle:'mont-blanc-mb-632-mont-fawn', isNew:true, construction:'High Definition Color Point, 1/10" machine gauge', pile:'6 mm pile · 10 mm total height', specs:[['Pile Weight','850 gms/m²'], ['Tile Size','25 × 100 cm plank'], ['Per Box','20 tiles (5 m²)'], ['Backing','Non-woven Lutrador; PVC + fibre glass'], ['Installation','Surface tackifier'], ['Antistatic','Permanently antistatic']], images:['Assets/products/flooring/carpet-tiles/mont-blanc/mont-blanc-mb-632-mont-fawn.jpg']},
      {name:'Space X SP 402 Smoke Gray', category:['flooring','carpet-tiles','space-x'], material:'universal-pp', color:'gray', room:['commercial'], motif:'tile', handle:'space-x-sp-402-smoke-gray', isNew:true, construction:'High Definition ColorPoint, 1/10" machine gauge', pile:'6 mm pile · 10 mm total height', specs:[['Pile Weight','850 gms/m²'], ['Tile Size','50 × 50 cm'], ['Per Box','20 tiles (5 m²)'], ['Backing','Non-woven Lutrador; PVC + fibre glass'], ['Installation','Surface tackifier'], ['Antistatic','Permanently antistatic']], images:['Assets/products/flooring/carpet-tiles/space-x/space-x-sp-402-smoke-gray.jpg']},
      {name:'Space X SP 412 Element Charcoal', category:['flooring','carpet-tiles','space-x'], material:'universal-pp', color:'charcoal', room:['commercial'], motif:'tile', handle:'space-x-sp-412-element-charcoal', isNew:true, construction:'High Definition ColorPoint, 1/10" machine gauge', pile:'6 mm pile · 10 mm total height', specs:[['Pile Weight','850 gms/m²'], ['Tile Size','50 × 50 cm'], ['Per Box','20 tiles (5 m²)'], ['Backing','Non-woven Lutrador; PVC + fibre glass'], ['Installation','Surface tackifier'], ['Antistatic','Permanently antistatic']], images:['Assets/products/flooring/carpet-tiles/space-x/space-x-sp-412-element-charcoal.jpg']},
      {name:'Space X SP 422 Rosewood Brown', category:['flooring','carpet-tiles','space-x'], material:'universal-pp', color:'brown', room:['commercial'], motif:'tile', handle:'space-x-sp-422-rosewood-brown', isNew:true, construction:'High Definition ColorPoint, 1/10" machine gauge', pile:'6 mm pile · 10 mm total height', specs:[['Pile Weight','850 gms/m²'], ['Tile Size','50 × 50 cm'], ['Per Box','20 tiles (5 m²)'], ['Backing','Non-woven Lutrador; PVC + fibre glass'], ['Installation','Surface tackifier'], ['Antistatic','Permanently antistatic']], images:['Assets/products/flooring/carpet-tiles/space-x/space-x-sp-422-rosewood-brown.jpg']},
      {name:'Space X SP 432 Denim Blue', category:['flooring','carpet-tiles','space-x'], material:'universal-pp', color:'blue', room:['commercial'], motif:'tile', handle:'space-x-sp-432-denim-blue', isNew:true, construction:'High Definition ColorPoint, 1/10" machine gauge', pile:'6 mm pile · 10 mm total height', specs:[['Pile Weight','850 gms/m²'], ['Tile Size','50 × 50 cm'], ['Per Box','20 tiles (5 m²)'], ['Backing','Non-woven Lutrador; PVC + fibre glass'], ['Installation','Surface tackifier'], ['Antistatic','Permanently antistatic']], images:['Assets/products/flooring/carpet-tiles/space-x/space-x-sp-432-denim-blue.jpg']},
      {name:'Toscana TN 189 Twisted Black Design', category:['flooring','carpet-tiles','toscana'], material:'olefin-pp', color:'black', room:['commercial'], motif:'tile', handle:'toscana-tn-189-twisted-black-design', isNew:true, construction:'Multi Level Scroll, 1/10" machine gauge', pile:'5 mm pile · 8 mm total height', specs:[['Pile Weight','700 gms/m²'], ['Tile Size','50 × 50 cm'], ['Per Box','20 tiles (5 m²)'], ['Backing','Non-woven Lutrador; PVC + fibre glass'], ['Installation','Surface tackifier'], ['Antistatic','Permanently antistatic']], images:['Assets/products/flooring/carpet-tiles/toscana/toscana-tn-189-twisted-black-design.jpg']},
      {name:'Toscana TN 184 Deep Sea Design', category:['flooring','carpet-tiles','toscana'], material:'olefin-pp', color:'blue', room:['commercial'], motif:'tile', handle:'toscana-tn-184-deep-sea-design', isNew:true, construction:'Multi Level Scroll, 1/10" machine gauge', pile:'5 mm pile · 8 mm total height', specs:[['Pile Weight','700 gms/m²'], ['Tile Size','50 × 50 cm'], ['Per Box','20 tiles (5 m²)'], ['Backing','Non-woven Lutrador; PVC + fibre glass'], ['Installation','Surface tackifier'], ['Antistatic','Permanently antistatic']], images:['Assets/products/flooring/carpet-tiles/toscana/toscana-tn-184-deep-sea-design.jpg']},
      {name:'Toscana TN 185 Mineral Gray Design', category:['flooring','carpet-tiles','toscana'], material:'olefin-pp', color:'gray', room:['commercial'], motif:'tile', handle:'toscana-tn-185-mineral-gray-design', isNew:true, construction:'Multi Level Scroll, 1/10" machine gauge', pile:'5 mm pile · 8 mm total height', specs:[['Pile Weight','700 gms/m²'], ['Tile Size','50 × 50 cm'], ['Per Box','20 tiles (5 m²)'], ['Backing','Non-woven Lutrador; PVC + fibre glass'], ['Installation','Surface tackifier'], ['Antistatic','Permanently antistatic']], images:['Assets/products/flooring/carpet-tiles/toscana/toscana-tn-185-mineral-gray-design.jpg']},
      {name:'Toscana TN 182 Natural Beige Design', category:['flooring','carpet-tiles','toscana'], material:'olefin-pp', color:'beige', room:['commercial'], motif:'tile', handle:'toscana-tn-182-natural-beige-design', isNew:true, construction:'Multi Level Scroll, 1/10" machine gauge', pile:'5 mm pile · 8 mm total height', specs:[['Pile Weight','700 gms/m²'], ['Tile Size','50 × 50 cm'], ['Per Box','20 tiles (5 m²)'], ['Backing','Non-woven Lutrador; PVC + fibre glass'], ['Installation','Surface tackifier'], ['Antistatic','Permanently antistatic']], images:['Assets/products/flooring/carpet-tiles/toscana/toscana-tn-182-natural-beige-design.jpg']},
      {name:'Toscana TN 5189 Twisted Black Plain', category:['flooring','carpet-tiles','toscana'], material:'olefin-pp', color:'black', room:['commercial'], motif:'tile', handle:'toscana-tn-5189-twisted-black-plain', isNew:true, construction:'Multi Level Scroll, 1/10" machine gauge', pile:'5 mm pile · 8 mm total height', specs:[['Pile Weight','700 gms/m²'], ['Tile Size','50 × 50 cm'], ['Per Box','20 tiles (5 m²)'], ['Backing','Non-woven Lutrador; PVC + fibre glass'], ['Installation','Surface tackifier'], ['Antistatic','Permanently antistatic']], images:['Assets/products/flooring/carpet-tiles/toscana/toscana-tn-5189-twisted-black-plain.jpg']},
      {name:'Toscana TN 5184 Deep Sea Plain', category:['flooring','carpet-tiles','toscana'], material:'olefin-pp', color:'blue', room:['commercial'], motif:'tile', handle:'toscana-tn-5184-deep-sea-plain', isNew:true, construction:'Multi Level Scroll, 1/10" machine gauge', pile:'5 mm pile · 8 mm total height', specs:[['Pile Weight','700 gms/m²'], ['Tile Size','50 × 50 cm'], ['Per Box','20 tiles (5 m²)'], ['Backing','Non-woven Lutrador; PVC + fibre glass'], ['Installation','Surface tackifier'], ['Antistatic','Permanently antistatic']], images:['Assets/products/flooring/carpet-tiles/toscana/toscana-tn-5184-deep-sea-plain.jpg']},
      {name:'Toscana TN 5185 Mineral Gray Plain', category:['flooring','carpet-tiles','toscana'], material:'olefin-pp', color:'gray', room:['commercial'], motif:'tile', handle:'toscana-tn-5185-mineral-gray-plain', isNew:true, construction:'Multi Level Scroll, 1/10" machine gauge', pile:'5 mm pile · 8 mm total height', specs:[['Pile Weight','700 gms/m²'], ['Tile Size','50 × 50 cm'], ['Per Box','20 tiles (5 m²)'], ['Backing','Non-woven Lutrador; PVC + fibre glass'], ['Installation','Surface tackifier'], ['Antistatic','Permanently antistatic']], images:['Assets/products/flooring/carpet-tiles/toscana/toscana-tn-5185-mineral-gray-plain.jpg']},
      {name:'Toscana TN 5182 Natural Beige Plain', category:['flooring','carpet-tiles','toscana'], material:'olefin-pp', color:'beige', room:['commercial'], motif:'tile', handle:'toscana-tn-5182-natural-beige-plain', isNew:true, construction:'Multi Level Scroll, 1/10" machine gauge', pile:'5 mm pile · 8 mm total height', specs:[['Pile Weight','700 gms/m²'], ['Tile Size','50 × 50 cm'], ['Per Box','20 tiles (5 m²)'], ['Backing','Non-woven Lutrador; PVC + fibre glass'], ['Installation','Surface tackifier'], ['Antistatic','Permanently antistatic']], images:['Assets/products/flooring/carpet-tiles/toscana/toscana-tn-5182-natural-beige-plain.jpg']}
    ],
    ar: [
      {name:'سجادة حريرية بميدالية أصفهان', category:['area-rugs','handmade-rug','persian'], material:'silk', color:'madder', size:'large', room:['living-room','majlis'], motif:'medallion', handle:'isfahan-medallion-silk-rug', isNew:false, images:[
     'Assets/products/area-rugs/handmade-rug/persian/isfahan-medallion-silk-rug.jpg',
     'Assets/products/area-rugs/handmade-rug/persian/isfahan-medallion-silk-rug-2.jpg',
     'Assets/products/area-rugs/handmade-rug/persian/isfahan-medallion-silk-rug-3.jpg']},
      {name:'سجادة صوفية بزخارف تبريز الزهرية', category:['area-rugs','handmade-rug','persian'], material:'wool', color:'ivory', size:'oversized', room:['majlis','dining'], motif:'boteh', handle:'tabriz-floral-wool-carpet', isNew:false, images:[
     'Assets/products/area-rugs/handmade-rug/persian/tabriz-floral-wool-carpet.jpg',
     'Assets/products/area-rugs/handmade-rug/persian/tabriz-floral-wool-carpet-2.jpg',
     'Assets/products/area-rugs/handmade-rug/persian/tabriz-floral-wool-carpet-3.jpg']},
      {name:'ممر كاشان بنقش البوتة', category:['area-rugs','handmade-rug','persian'], material:'silk', color:'madder', size:'small', room:['hallway'], motif:'boteh', handle:'kashan-boteh-runner', isNew:true, images:[
     'Assets/products/area-rugs/handmade-rug/persian/kashan-boteh-runner.jpg',
     'Assets/products/area-rugs/handmade-rug/persian/kashan-boteh-runner-2.jpg',
     'Assets/products/area-rugs/handmade-rug/persian/kashan-boteh-runner-3.jpg']},
      {name:'تحفة هريكة الحريرية', category:['area-rugs','handmade-rug','turkish'], material:'silk', color:'gold', size:'medium', room:['living-room'], motif:'medallion', handle:'hereke-silk-masterpiece', isNew:false, images:[
     'Assets/products/area-rugs/handmade-rug/turkish/hereke-silk-masterpiece.jpg',
     'Assets/products/area-rugs/handmade-rug/turkish/hereke-silk-masterpiece-2.jpg',
     'Assets/products/area-rugs/handmade-rug/turkish/hereke-silk-masterpiece-3.jpg']},
      {name:'سجادة كليم قونية الهندسية', category:['area-rugs','handmade-rug','turkish'], material:'wool', color:'charcoal', size:'medium', room:['living-room','bedroom'], motif:'lattice', handle:'konya-kilim-geometric-rug', sale:{percent:25, until:'2026-10-31', note:'autumn'}, isNew:false, images:[
     'Assets/products/area-rugs/handmade-rug/turkish/konya-kilim-geometric-rug.jpg',
     'Assets/products/area-rugs/handmade-rug/turkish/konya-kilim-geometric-rug-2.jpg',
     'Assets/products/area-rugs/handmade-rug/turkish/konya-kilim-geometric-rug-3.jpg']},
      {name:'سجادة صوفية قبلية أناضولية', category:['area-rugs','handmade-rug','turkish','oriental'], material:'wool', color:'indigo', size:'small', room:['bedroom'], motif:'chevron', handle:'anatolian-tribal-wool-rug', isNew:true, images:[
     'Assets/products/area-rugs/handmade-rug/turkish/anatolian-tribal-wool-rug.jpg',
     'Assets/products/area-rugs/handmade-rug/turkish/anatolian-tribal-wool-rug-2.jpg',
     'Assets/products/area-rugs/handmade-rug/turkish/anatolian-tribal-wool-rug-3.jpg']},
      {name:'تحفة طريق الحرير الشرقية الكلاسيكية', category:['area-rugs','handmade-rug','oriental'], material:'mixed', color:'madder', size:'large', room:['dining'], motif:'medallion', handle:'silk-road-oriental-classic', isNew:false, images:[
     'Assets/products/area-rugs/handmade-rug/oriental/silk-road-oriental-classic.jpg',
     'Assets/products/area-rugs/handmade-rug/oriental/silk-road-oriental-classic-2.jpg',
     'Assets/products/area-rugs/handmade-rug/oriental/silk-road-oriental-classic-3.jpg']},
      {name:'سجادة نائين الصوفية الفاخرة', category:['area-rugs','handmade-rug','persian'], material:'wool', color:'ivory', size:'oversized', room:['majlis'], motif:'medallion', handle:'nain-fine-wool-carpet', sale:{percent:10, until:'2026-12-31', note:'clearance'}, isNew:false, images:[
     'Assets/products/area-rugs/handmade-rug/persian/nain-fine-wool-carpet.jpg',
     'Assets/products/area-rugs/handmade-rug/persian/nain-fine-wool-carpet-2.jpg',
     'Assets/products/area-rugs/handmade-rug/persian/nain-fine-wool-carpet-3.jpg']},
      {name:'سجادة معاصرة تجريدية عاجية', category:['area-rugs','machine-made-rug','contemporary'], material:'wool', color:'ivory', size:'large', room:['living-room'], motif:'lattice', handle:'abstract-ivory-contemporary-rug', isNew:true, images:[
     'Assets/products/area-rugs/machine-made-rug/contemporary/abstract-ivory-contemporary-rug.jpg',
     'Assets/products/area-rugs/machine-made-rug/contemporary/abstract-ivory-contemporary-rug-2.jpg',
     'Assets/products/area-rugs/machine-made-rug/contemporary/abstract-ivory-contemporary-rug-3.jpg']},
      {name:'سجادة معاصرة خطية فحمية', category:['area-rugs','machine-made-rug','contemporary'], material:'mixed', color:'charcoal', size:'medium', room:['living-room','bedroom'], motif:'chevron', handle:'charcoal-linear-contemporary-rug', isNew:false, images:[
     'Assets/products/area-rugs/machine-made-rug/contemporary/charcoal-linear-contemporary-rug.jpg',
     'Assets/products/area-rugs/machine-made-rug/contemporary/charcoal-linear-contemporary-rug-2.jpg',
     'Assets/products/area-rugs/machine-made-rug/contemporary/charcoal-linear-contemporary-rug-3.jpg']},
      {name:'سجادة معاصرة بنقش ذهبي متشابك', category:['area-rugs','machine-made-rug','contemporary'], material:'wool', color:'gold', size:'medium', room:['dining'], motif:'lattice', handle:'gold-trellis-contemporary-rug', sale:{percent:20, until:'2026-10-31', note:'autumn'}, isNew:false, images:[
     'Assets/products/area-rugs/machine-made-rug/contemporary/gold-trellis-contemporary-rug.jpg',
     'Assets/products/area-rugs/machine-made-rug/contemporary/gold-trellis-contemporary-rug-2.jpg',
     'Assets/products/area-rugs/machine-made-rug/contemporary/gold-trellis-contemporary-rug-3.jpg']},
      {name:'سجادة آلية يومية بنقش متشابك', category:['area-rugs','machine-made-rug'], material:'mixed', color:'charcoal', size:'large', room:['living-room'], motif:'tile', handle:'everyday-trellis-machine-made-rug', sale:{percent:30, until:'2026-10-31', note:'autumn'}, isNew:false, images:[
     'Assets/products/area-rugs/machine-made-rug/everyday-trellis-machine-made-rug.jpg',
     'Assets/products/area-rugs/machine-made-rug/everyday-trellis-machine-made-rug-2.jpg',
     'Assets/products/area-rugs/machine-made-rug/everyday-trellis-machine-made-rug-3.jpg']},
      {name:'سجادة آلية متينة بميدالية', category:['area-rugs','machine-made-rug'], material:'mixed', color:'madder', size:'medium', room:['dining','hallway'], motif:'medallion', handle:'durable-medallion-machine-made-rug', isNew:false, images:[
     'Assets/products/area-rugs/machine-made-rug/durable-medallion-machine-made-rug.jpg',
     'Assets/products/area-rugs/machine-made-rug/durable-medallion-machine-made-rug-2.jpg',
     'Assets/products/area-rugs/machine-made-rug/durable-medallion-machine-made-rug-3.jpg']},
      {name:'بلاط سجاد عريض للضيافة', category:['flooring','carpet-tiles'], material:'mixed', color:'charcoal', size:'oversized', room:['commercial'], motif:'tile', handle:'hospitality-broadloom-carpet-tile', isNew:false, images:[
     'Assets/products/flooring/carpet-tiles/hospitality-broadloom-carpet-tile.jpg',
     'Assets/products/flooring/carpet-tiles/hospitality-broadloom-carpet-tile-2.jpg',
     'Assets/products/flooring/carpet-tiles/hospitality-broadloom-carpet-tile-3.jpg']},
      {name:'سجادة مخصصة لقاعة الصلاة', category:['flooring','masjed-carpets'], material:'wool', color:'indigo', size:'oversized', room:['commercial'], motif:'arch', handle:'prayer-hall-custom-carpet', isNew:true, images:[
     'Assets/products/flooring/masjed-carpets/prayer-hall-custom-carpet.jpg',
     'Assets/products/flooring/masjed-carpets/prayer-hall-custom-carpet-2.jpg',
     'Assets/products/flooring/masjed-carpets/prayer-hall-custom-carpet-3.jpg']},
      {name:'بلاط سجاد للمكاتب التنفيذية', category:['flooring','carpet-tiles'], material:'mixed', color:'ivory', size:'large', room:['commercial'], motif:'tile', handle:'executive-office-carpet-tile', isNew:false, images:[
     'Assets/products/flooring/carpet-tiles/executive-office-carpet-tile.jpg',
     'Assets/products/flooring/carpet-tiles/executive-office-carpet-tile-2.jpg',
     'Assets/products/flooring/carpet-tiles/executive-office-carpet-tile-3.jpg']},
      {name:'أريكة زاوية للمجلس', category:['furniture'], material:'velvet', color:'ivory', room:['living-room','majlis'], motif:'sofa', handle:'majlis-corner-sofa', isNew:true, images:[
     'Assets/products/furniture/majlis-corner-sofa.jpg',
     'Assets/products/furniture/majlis-corner-sofa-2.jpg',
     'Assets/products/furniture/majlis-corner-sofa-3.jpg']},
      {name:'طاولة قهوة من خشب الجوز المنحوت', category:['furniture'], material:'wood', color:'charcoal', room:['living-room'], motif:'floorplan', handle:'carved-walnut-coffee-table', isNew:false, images:[
     'Assets/products/furniture/carved-walnut-coffee-table.jpg',
     'Assets/products/furniture/carved-walnut-coffee-table-2.jpg',
     'Assets/products/furniture/carved-walnut-coffee-table-3.jpg']},
      {name:'كرسي مخملي مميز', category:['furniture'], material:'velvet', color:'madder', room:['living-room','bedroom'], motif:'sofa', handle:'velvet-accent-armchair', sale:{percent:15, until:'2026-11-15', note:'furniture'}, isNew:false, images:[
     'Assets/products/furniture/velvet-accent-armchair.jpg',
     'Assets/products/furniture/velvet-accent-armchair-2.jpg',
     'Assets/products/furniture/velvet-accent-armchair-3.jpg']},
      {name:'مصباح أرضي نحاسي', category:['accessories'], material:'brass', color:'gold', room:['living-room'], motif:'lamp', handle:'brass-floor-lamp', isNew:true, images:[
     'Assets/products/furniture/brass-floor-lamp.jpg',
     'Assets/products/furniture/brass-floor-lamp-2.jpg',
     'Assets/products/furniture/brass-floor-lamp-3.jpg']},
      {name:'مزهرية زجاجية منفوخة يدويًا', category:['accessories'], material:'mixed', color:'indigo', room:['dining'], motif:'vase', handle:'handblown-glass-vase', sale:{percent:20, until:'2026-11-15', note:'furniture'}, isNew:false, images:[
     'Assets/products/furniture/handblown-glass-vase.jpg',
     'Assets/products/furniture/handblown-glass-vase-2.jpg',
     'Assets/products/furniture/handblown-glass-vase-3.jpg']},
      {name:'لوحة جدارية حريرية مؤطرة', category:['accessories'], material:'silk', color:'gold', room:['majlis'], motif:'frame', handle:'framed-silk-panel', isNew:false, images:[
     'Assets/products/furniture/framed-silk-panel.jpg',
     'Assets/products/furniture/framed-silk-panel-2.jpg',
     'Assets/products/furniture/framed-silk-panel-3.jpg']}
    ,

      /* ---------------- Carpet Tiles (commercial) ---------------- */
      {name:'كرايون CM 385 رمادي شبكي', category:['flooring','carpet-tiles','crayon'], material:'olefin-pp', color:'gray', room:['commercial'], motif:'tile', handle:'crayon-cm-385-grid-gray', isNew:true, construction:'ملفوف متعدد المستويات، مقاس ماكينة 1/12 بوصة', pile:'وبر 5 مم · ارتفاع كلي 8 مم', specs:[['وزن الوبر','700 gms/m²'], ['مقاس البلاطة','٥٠ × ٥٠ سم'], ['في الصندوق','٢٠ بلاطة (٥ م²)'], ['الظهر','لوترادور غير منسوج؛ PVC + ألياف زجاجية'], ['التركيب','لاصق سطحي'], ['مضاد للكهرباء الساكنة','مضاد دائم للكهرباء الساكنة']], images:['Assets/products/flooring/carpet-tiles/crayon/crayon-cm-385-grid-gray.jpg']},
      {name:'كرايون CM 386 أخضر شبكي', category:['flooring','carpet-tiles','crayon'], material:'olefin-pp', color:'green', room:['commercial'], motif:'tile', handle:'crayon-cm-386-grid-green', isNew:true, construction:'ملفوف متعدد المستويات، مقاس ماكينة 1/12 بوصة', pile:'وبر 5 مم · ارتفاع كلي 8 مم', specs:[['وزن الوبر','700 gms/m²'], ['مقاس البلاطة','٥٠ × ٥٠ سم'], ['في الصندوق','٢٠ بلاطة (٥ م²)'], ['الظهر','لوترادور غير منسوج؛ PVC + ألياف زجاجية'], ['التركيب','لاصق سطحي'], ['مضاد للكهرباء الساكنة','مضاد دائم للكهرباء الساكنة']], images:['Assets/products/flooring/carpet-tiles/crayon/crayon-cm-386-grid-green.jpg']},
      {name:'كرايون CM 389 أصفر شبكي', category:['flooring','carpet-tiles','crayon'], material:'olefin-pp', color:'yellow', room:['commercial'], motif:'tile', handle:'crayon-cm-389-grid-yellow', isNew:true, construction:'ملفوف متعدد المستويات، مقاس ماكينة 1/12 بوصة', pile:'وبر 5 مم · ارتفاع كلي 8 مم', specs:[['وزن الوبر','700 gms/m²'], ['مقاس البلاطة','٥٠ × ٥٠ سم'], ['في الصندوق','٢٠ بلاطة (٥ م²)'], ['الظهر','لوترادور غير منسوج؛ PVC + ألياف زجاجية'], ['التركيب','لاصق سطحي'], ['مضاد للكهرباء الساكنة','مضاد دائم للكهرباء الساكنة']], images:['Assets/products/flooring/carpet-tiles/crayon/crayon-cm-389-grid-yellow.jpg']},
      {name:'كرايون CM 387 برتقالي شبكي', category:['flooring','carpet-tiles','crayon'], material:'olefin-pp', color:'orange', room:['commercial'], motif:'tile', handle:'crayon-cm-387-grid-orange', isNew:true, construction:'ملفوف متعدد المستويات، مقاس ماكينة 1/12 بوصة', pile:'وبر 5 مم · ارتفاع كلي 8 مم', specs:[['وزن الوبر','700 gms/m²'], ['مقاس البلاطة','٥٠ × ٥٠ سم'], ['في الصندوق','٢٠ بلاطة (٥ م²)'], ['الظهر','لوترادور غير منسوج؛ PVC + ألياف زجاجية'], ['التركيب','لاصق سطحي'], ['مضاد للكهرباء الساكنة','مضاد دائم للكهرباء الساكنة']], images:['Assets/products/flooring/carpet-tiles/crayon/crayon-cm-387-grid-orange.jpg']},
      {name:'كرايون CM 388 أزرق شبكي', category:['flooring','carpet-tiles','crayon'], material:'olefin-pp', color:'blue', room:['commercial'], motif:'tile', handle:'crayon-cm-388-grid-blue', isNew:true, construction:'ملفوف متعدد المستويات، مقاس ماكينة 1/12 بوصة', pile:'وبر 5 مم · ارتفاع كلي 8 مم', specs:[['وزن الوبر','700 gms/m²'], ['مقاس البلاطة','٥٠ × ٥٠ سم'], ['في الصندوق','٢٠ بلاطة (٥ م²)'], ['الظهر','لوترادور غير منسوج؛ PVC + ألياف زجاجية'], ['التركيب','لاصق سطحي'], ['مضاد للكهرباء الساكنة','مضاد دائم للكهرباء الساكنة']], images:['Assets/products/flooring/carpet-tiles/crayon/crayon-cm-388-grid-blue.jpg']},
      {name:'مون بلان MB 602 مونت سموك', category:['flooring','carpet-tiles','mont-blanc'], material:'universal-pp', color:'gray', room:['commercial'], motif:'tile', handle:'mont-blanc-mb-602-mont-smoke', isNew:true, construction:'كلر بوينت عالي الدقة، مقاس ماكينة 1/10 بوصة', pile:'وبر 6 مم · ارتفاع كلي 10 مم', specs:[['وزن الوبر','850 gms/m²'], ['مقاس البلاطة','بلاطة طولية ٢٥ × ١٠٠ سم'], ['في الصندوق','٢٠ بلاطة (٥ م²)'], ['الظهر','لوترادور غير منسوج؛ PVC + ألياف زجاجية'], ['التركيب','لاصق سطحي'], ['مضاد للكهرباء الساكنة','مضاد دائم للكهرباء الساكنة']], images:['Assets/products/flooring/carpet-tiles/mont-blanc/mont-blanc-mb-602-mont-smoke.jpg']},
      {name:'مون بلان MB 612 مونت أفينا', category:['flooring','carpet-tiles','mont-blanc'], material:'universal-pp', color:'blue', room:['commercial'], motif:'tile', handle:'mont-blanc-mb-612-mont-afina', isNew:true, construction:'كلر بوينت عالي الدقة، مقاس ماكينة 1/10 بوصة', pile:'وبر 6 مم · ارتفاع كلي 10 مم', specs:[['وزن الوبر','850 gms/m²'], ['مقاس البلاطة','بلاطة طولية ٢٥ × ١٠٠ سم'], ['في الصندوق','٢٠ بلاطة (٥ م²)'], ['الظهر','لوترادور غير منسوج؛ PVC + ألياف زجاجية'], ['التركيب','لاصق سطحي'], ['مضاد للكهرباء الساكنة','مضاد دائم للكهرباء الساكنة']], images:['Assets/products/flooring/carpet-tiles/mont-blanc/mont-blanc-mb-612-mont-afina.jpg']},
      {name:'مون بلان MB 622 مونت فحمي', category:['flooring','carpet-tiles','mont-blanc'], material:'universal-pp', color:'charcoal', room:['commercial'], motif:'tile', handle:'mont-blanc-mb-622-mont-charcoal', isNew:true, construction:'كلر بوينت عالي الدقة، مقاس ماكينة 1/10 بوصة', pile:'وبر 6 مم · ارتفاع كلي 10 مم', specs:[['وزن الوبر','850 gms/m²'], ['مقاس البلاطة','بلاطة طولية ٢٥ × ١٠٠ سم'], ['في الصندوق','٢٠ بلاطة (٥ م²)'], ['الظهر','لوترادور غير منسوج؛ PVC + ألياف زجاجية'], ['التركيب','لاصق سطحي'], ['مضاد للكهرباء الساكنة','مضاد دائم للكهرباء الساكنة']], images:['Assets/products/flooring/carpet-tiles/mont-blanc/mont-blanc-mb-622-mont-charcoal.jpg']},
      {name:'مون بلان MB 632 مونت بيج', category:['flooring','carpet-tiles','mont-blanc'], material:'universal-pp', color:'beige', room:['commercial'], motif:'tile', handle:'mont-blanc-mb-632-mont-fawn', isNew:true, construction:'كلر بوينت عالي الدقة، مقاس ماكينة 1/10 بوصة', pile:'وبر 6 مم · ارتفاع كلي 10 مم', specs:[['وزن الوبر','850 gms/m²'], ['مقاس البلاطة','بلاطة طولية ٢٥ × ١٠٠ سم'], ['في الصندوق','٢٠ بلاطة (٥ م²)'], ['الظهر','لوترادور غير منسوج؛ PVC + ألياف زجاجية'], ['التركيب','لاصق سطحي'], ['مضاد للكهرباء الساكنة','مضاد دائم للكهرباء الساكنة']], images:['Assets/products/flooring/carpet-tiles/mont-blanc/mont-blanc-mb-632-mont-fawn.jpg']},
      {name:'سبيس إكس SP 402 رمادي دخاني', category:['flooring','carpet-tiles','space-x'], material:'universal-pp', color:'gray', room:['commercial'], motif:'tile', handle:'space-x-sp-402-smoke-gray', isNew:true, construction:'كلر بوينت عالي الدقة، مقاس ماكينة 1/10 بوصة', pile:'وبر 6 مم · ارتفاع كلي 10 مم', specs:[['وزن الوبر','850 gms/m²'], ['مقاس البلاطة','٥٠ × ٥٠ سم'], ['في الصندوق','٢٠ بلاطة (٥ م²)'], ['الظهر','لوترادور غير منسوج؛ PVC + ألياف زجاجية'], ['التركيب','لاصق سطحي'], ['مضاد للكهرباء الساكنة','مضاد دائم للكهرباء الساكنة']], images:['Assets/products/flooring/carpet-tiles/space-x/space-x-sp-402-smoke-gray.jpg']},
      {name:'سبيس إكس SP 412 فحمي', category:['flooring','carpet-tiles','space-x'], material:'universal-pp', color:'charcoal', room:['commercial'], motif:'tile', handle:'space-x-sp-412-element-charcoal', isNew:true, construction:'كلر بوينت عالي الدقة، مقاس ماكينة 1/10 بوصة', pile:'وبر 6 مم · ارتفاع كلي 10 مم', specs:[['وزن الوبر','850 gms/m²'], ['مقاس البلاطة','٥٠ × ٥٠ سم'], ['في الصندوق','٢٠ بلاطة (٥ م²)'], ['الظهر','لوترادور غير منسوج؛ PVC + ألياف زجاجية'], ['التركيب','لاصق سطحي'], ['مضاد للكهرباء الساكنة','مضاد دائم للكهرباء الساكنة']], images:['Assets/products/flooring/carpet-tiles/space-x/space-x-sp-412-element-charcoal.jpg']},
      {name:'سبيس إكس SP 422 بني خشبي', category:['flooring','carpet-tiles','space-x'], material:'universal-pp', color:'brown', room:['commercial'], motif:'tile', handle:'space-x-sp-422-rosewood-brown', isNew:true, construction:'كلر بوينت عالي الدقة، مقاس ماكينة 1/10 بوصة', pile:'وبر 6 مم · ارتفاع كلي 10 مم', specs:[['وزن الوبر','850 gms/m²'], ['مقاس البلاطة','٥٠ × ٥٠ سم'], ['في الصندوق','٢٠ بلاطة (٥ م²)'], ['الظهر','لوترادور غير منسوج؛ PVC + ألياف زجاجية'], ['التركيب','لاصق سطحي'], ['مضاد للكهرباء الساكنة','مضاد دائم للكهرباء الساكنة']], images:['Assets/products/flooring/carpet-tiles/space-x/space-x-sp-422-rosewood-brown.jpg']},
      {name:'سبيس إكس SP 432 أزرق دينم', category:['flooring','carpet-tiles','space-x'], material:'universal-pp', color:'blue', room:['commercial'], motif:'tile', handle:'space-x-sp-432-denim-blue', isNew:true, construction:'كلر بوينت عالي الدقة، مقاس ماكينة 1/10 بوصة', pile:'وبر 6 مم · ارتفاع كلي 10 مم', specs:[['وزن الوبر','850 gms/m²'], ['مقاس البلاطة','٥٠ × ٥٠ سم'], ['في الصندوق','٢٠ بلاطة (٥ م²)'], ['الظهر','لوترادور غير منسوج؛ PVC + ألياف زجاجية'], ['التركيب','لاصق سطحي'], ['مضاد للكهرباء الساكنة','مضاد دائم للكهرباء الساكنة']], images:['Assets/products/flooring/carpet-tiles/space-x/space-x-sp-432-denim-blue.jpg']},
      {name:'توسكانا TN 189 أسود ملتوٍ - تصميم', category:['flooring','carpet-tiles','toscana'], material:'olefin-pp', color:'black', room:['commercial'], motif:'tile', handle:'toscana-tn-189-twisted-black-design', isNew:true, construction:'ملفوف متعدد المستويات، مقاس ماكينة 1/10 بوصة', pile:'وبر 5 مم · ارتفاع كلي 8 مم', specs:[['وزن الوبر','700 gms/m²'], ['مقاس البلاطة','٥٠ × ٥٠ سم'], ['في الصندوق','٢٠ بلاطة (٥ م²)'], ['الظهر','لوترادور غير منسوج؛ PVC + ألياف زجاجية'], ['التركيب','لاصق سطحي'], ['مضاد للكهرباء الساكنة','مضاد دائم للكهرباء الساكنة']], images:['Assets/products/flooring/carpet-tiles/toscana/toscana-tn-189-twisted-black-design.jpg']},
      {name:'توسكانا TN 184 أزرق بحري - تصميم', category:['flooring','carpet-tiles','toscana'], material:'olefin-pp', color:'blue', room:['commercial'], motif:'tile', handle:'toscana-tn-184-deep-sea-design', isNew:true, construction:'ملفوف متعدد المستويات، مقاس ماكينة 1/10 بوصة', pile:'وبر 5 مم · ارتفاع كلي 8 مم', specs:[['وزن الوبر','700 gms/m²'], ['مقاس البلاطة','٥٠ × ٥٠ سم'], ['في الصندوق','٢٠ بلاطة (٥ م²)'], ['الظهر','لوترادور غير منسوج؛ PVC + ألياف زجاجية'], ['التركيب','لاصق سطحي'], ['مضاد للكهرباء الساكنة','مضاد دائم للكهرباء الساكنة']], images:['Assets/products/flooring/carpet-tiles/toscana/toscana-tn-184-deep-sea-design.jpg']},
      {name:'توسكانا TN 185 رمادي معدني - تصميم', category:['flooring','carpet-tiles','toscana'], material:'olefin-pp', color:'gray', room:['commercial'], motif:'tile', handle:'toscana-tn-185-mineral-gray-design', isNew:true, construction:'ملفوف متعدد المستويات، مقاس ماكينة 1/10 بوصة', pile:'وبر 5 مم · ارتفاع كلي 8 مم', specs:[['وزن الوبر','700 gms/m²'], ['مقاس البلاطة','٥٠ × ٥٠ سم'], ['في الصندوق','٢٠ بلاطة (٥ م²)'], ['الظهر','لوترادور غير منسوج؛ PVC + ألياف زجاجية'], ['التركيب','لاصق سطحي'], ['مضاد للكهرباء الساكنة','مضاد دائم للكهرباء الساكنة']], images:['Assets/products/flooring/carpet-tiles/toscana/toscana-tn-185-mineral-gray-design.jpg']},
      {name:'توسكانا TN 182 بيج طبيعي - تصميم', category:['flooring','carpet-tiles','toscana'], material:'olefin-pp', color:'beige', room:['commercial'], motif:'tile', handle:'toscana-tn-182-natural-beige-design', isNew:true, construction:'ملفوف متعدد المستويات، مقاس ماكينة 1/10 بوصة', pile:'وبر 5 مم · ارتفاع كلي 8 مم', specs:[['وزن الوبر','700 gms/m²'], ['مقاس البلاطة','٥٠ × ٥٠ سم'], ['في الصندوق','٢٠ بلاطة (٥ م²)'], ['الظهر','لوترادور غير منسوج؛ PVC + ألياف زجاجية'], ['التركيب','لاصق سطحي'], ['مضاد للكهرباء الساكنة','مضاد دائم للكهرباء الساكنة']], images:['Assets/products/flooring/carpet-tiles/toscana/toscana-tn-182-natural-beige-design.jpg']},
      {name:'توسكانا TN 5189 أسود ملتوٍ - سادة', category:['flooring','carpet-tiles','toscana'], material:'olefin-pp', color:'black', room:['commercial'], motif:'tile', handle:'toscana-tn-5189-twisted-black-plain', isNew:true, construction:'ملفوف متعدد المستويات، مقاس ماكينة 1/10 بوصة', pile:'وبر 5 مم · ارتفاع كلي 8 مم', specs:[['وزن الوبر','700 gms/m²'], ['مقاس البلاطة','٥٠ × ٥٠ سم'], ['في الصندوق','٢٠ بلاطة (٥ م²)'], ['الظهر','لوترادور غير منسوج؛ PVC + ألياف زجاجية'], ['التركيب','لاصق سطحي'], ['مضاد للكهرباء الساكنة','مضاد دائم للكهرباء الساكنة']], images:['Assets/products/flooring/carpet-tiles/toscana/toscana-tn-5189-twisted-black-plain.jpg']},
      {name:'توسكانا TN 5184 أزرق بحري - سادة', category:['flooring','carpet-tiles','toscana'], material:'olefin-pp', color:'blue', room:['commercial'], motif:'tile', handle:'toscana-tn-5184-deep-sea-plain', isNew:true, construction:'ملفوف متعدد المستويات، مقاس ماكينة 1/10 بوصة', pile:'وبر 5 مم · ارتفاع كلي 8 مم', specs:[['وزن الوبر','700 gms/m²'], ['مقاس البلاطة','٥٠ × ٥٠ سم'], ['في الصندوق','٢٠ بلاطة (٥ م²)'], ['الظهر','لوترادور غير منسوج؛ PVC + ألياف زجاجية'], ['التركيب','لاصق سطحي'], ['مضاد للكهرباء الساكنة','مضاد دائم للكهرباء الساكنة']], images:['Assets/products/flooring/carpet-tiles/toscana/toscana-tn-5184-deep-sea-plain.jpg']},
      {name:'توسكانا TN 5185 رمادي معدني - سادة', category:['flooring','carpet-tiles','toscana'], material:'olefin-pp', color:'gray', room:['commercial'], motif:'tile', handle:'toscana-tn-5185-mineral-gray-plain', isNew:true, construction:'ملفوف متعدد المستويات، مقاس ماكينة 1/10 بوصة', pile:'وبر 5 مم · ارتفاع كلي 8 مم', specs:[['وزن الوبر','700 gms/m²'], ['مقاس البلاطة','٥٠ × ٥٠ سم'], ['في الصندوق','٢٠ بلاطة (٥ م²)'], ['الظهر','لوترادور غير منسوج؛ PVC + ألياف زجاجية'], ['التركيب','لاصق سطحي'], ['مضاد للكهرباء الساكنة','مضاد دائم للكهرباء الساكنة']], images:['Assets/products/flooring/carpet-tiles/toscana/toscana-tn-5185-mineral-gray-plain.jpg']},
      {name:'توسكانا TN 5182 بيج طبيعي - سادة', category:['flooring','carpet-tiles','toscana'], material:'olefin-pp', color:'beige', room:['commercial'], motif:'tile', handle:'toscana-tn-5182-natural-beige-plain', isNew:true, construction:'ملفوف متعدد المستويات، مقاس ماكينة 1/10 بوصة', pile:'وبر 5 مم · ارتفاع كلي 8 مم', specs:[['وزن الوبر','700 gms/m²'], ['مقاس البلاطة','٥٠ × ٥٠ سم'], ['في الصندوق','٢٠ بلاطة (٥ م²)'], ['الظهر','لوترادور غير منسوج؛ PVC + ألياف زجاجية'], ['التركيب','لاصق سطحي'], ['مضاد للكهرباء الساكنة','مضاد دائم للكهرباء الساكنة']], images:['Assets/products/flooring/carpet-tiles/toscana/toscana-tn-5182-natural-beige-plain.jpg']}
    ]
  };

  /* ---------------- Detail-page fallbacks ----------------
     Real per-product copy always wins; these only fill the gaps so the
     detail page never looks empty while you are still writing content. */
  const DETAIL_DEFAULTS = {
    en: {
      byMaterial: {
        silk:   {construction:'Hand-knotted silk pile on a cotton foundation', pile:'Fine silk pile, approx. 5–7mm', knots:'Approx. 500–800 knots per square inch'},
        wool:   {construction:'Hand-knotted wool pile on a cotton foundation', pile:'Dense wool pile, approx. 8–12mm', knots:'Approx. 200–400 knots per square inch'},
        mixed:  {construction:'Wool and silk blend pile', pile:'Mixed-fibre pile, approx. 7–10mm', knots:'Approx. 250–450 knots per square inch'},
        velvet: {construction:'Kiln-dried hardwood frame, hand-upholstered', pile:'Cotton-backed velvet', knots:''},
        wood:   {construction:'Solid hardwood, hand-finished', pile:'', knots:''},
        brass:  {construction:'Cast and hand-polished brass', pile:'', knots:''}
      },
      genericStory: 'Sourced and finished to the same standard Heritage has applied since 1975. Speak with a design consultant for provenance details, available sizes, and lead times on this piece.',
      care: {
        rug: ['Vacuum regularly without a beater bar; use suction only.',
              'Rotate 180° once or twice a year so wear and light exposure stay even.',
              'Blot spills immediately with a clean white cloth — never rub.',
              'Keep out of prolonged direct sunlight to protect natural dyes.',
              'Professional hand-cleaning every 2–3 years; never machine wash.'],
        furniture: ['Dust with a dry, soft cloth; avoid solvent-based cleaners.',
                    'Keep away from direct heat sources and prolonged sunlight.',
                    'Treat upholstery spills immediately by blotting, not rubbing.',
                    'Tighten fittings annually on hardwood frames.'],
        accessories: ['Dust with a dry, soft cloth.',
                      'Polish metal gently; avoid abrasive cleaners.',
                      'Handle glass and ceramic pieces with two hands when moving.']
      }
    },
    ar: {
      byMaterial: {
        silk:   {construction:'وبرة حريرية معقودة يدويًا على أساس قطني', pile:'وبرة حرير ناعمة، نحو 5–7 مم', knots:'نحو 500–800 عقدة في البوصة المربعة'},
        wool:   {construction:'وبرة صوفية معقودة يدويًا على أساس قطني', pile:'وبرة صوف كثيفة، نحو 8–12 مم', knots:'نحو 200–400 عقدة في البوصة المربعة'},
        mixed:  {construction:'وبرة من مزيج الصوف والحرير', pile:'وبرة ألياف مختلطة، نحو 7–10 مم', knots:'نحو 250–450 عقدة في البوصة المربعة'},
        velvet: {construction:'هيكل خشب صلب مجفف، منجّد يدويًا', pile:'مخمل بظهر قطني', knots:''},
        wood:   {construction:'خشب صلب طبيعي، مصقول يدويًا', pile:'', knots:''},
        brass:  {construction:'نحاس مصبوب ومصقول يدويًا', pile:'', knots:''}
      },
      genericStory: 'مُستقدم ومُنجز وفق المعيار ذاته الذي تلتزم به التراث منذ 1975. تحدث مع أحد مستشاري التصميم لمعرفة تفاصيل المنشأ والمقاسات المتاحة ومدة التنفيذ لهذه القطعة.',
      care: {
        rug: ['نظّف بالمكنسة بانتظام دون فرشاة دوّارة؛ استخدم الشفط فقط.',
              'أدر السجادة 180° مرة أو مرتين سنويًا ليتوزع الاستخدام والإضاءة بالتساوي.',
              'جفّف الانسكابات فورًا بقطعة قماش بيضاء نظيفة — دون فرك.',
              'تجنّب تعريضها لأشعة الشمس المباشرة لفترات طويلة حمايةً للأصباغ الطبيعية.',
              'تنظيف يدوي احترافي كل 2–3 سنوات؛ لا تُغسل في الغسالة أبدًا.'],
        furniture: ['امسح بقطعة قماش ناعمة جافة؛ وتجنّب المنظفات المذيبة.',
                    'أبعدها عن مصادر الحرارة المباشرة وأشعة الشمس الطويلة.',
                    'عالج انسكابات التنجيد فورًا بالتجفيف لا بالفرك.',
                    'أحكم ربط التثبيتات سنويًا في الهياكل الخشبية.'],
        accessories: ['امسح بقطعة قماش ناعمة جافة.',
                      'لمّع المعدن برفق؛ وتجنّب المنظفات الكاشطة.',
                      'احمل القطع الزجاجية والخزفية بكلتا اليدين عند نقلها.']
      }
    }
  };

  /* Merge a product with its fallbacks so the detail page always has content. */
  function detailFor(product, lang){
    const d = DETAIL_DEFAULTS[lang] || DETAIL_DEFAULTS.en;
    const byMat = d.byMaterial[product.material] || {};
    const isFurniture = product.category.indexOf('furniture') !== -1;
    const isAccessory = product.category.indexOf('accessories') !== -1;
    const careSet = isAccessory ? d.care.accessories : (isFurniture ? d.care.furniture : d.care.rug);
    return {
      origin: product.origin || '',
      construction: product.construction || byMat.construction || '',
      pile: product.pile || byMat.pile || '',
      knots: product.knots || byMat.knots || '',
      story: product.story || d.genericStory,
      care: product.care || careSet
    };
  }

  function find(handle, lang){
    const list = products[lang] || products.en;
    return list.filter(function(p){ return p.handle === handle; })[0] || null;
  }

  function onSale(lang){
    return (products[lang] || products.en).filter(function(p){ return !!p.sale; });
  }

  return { labels: labels, tree: tree, products: products, detailFor: detailFor, find: find, onSale: onSale };
})();
