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

  const labels = {
    en: {
      category: {handmade:'Handmade', 'machine-made':'Machine-Made', persian:'Persian', turkish:'Turkish', oriental:'Oriental', contemporary:'Contemporary', commercial:'Commercial', furniture:'Furniture', accessories:'Home Accessories'},
      material: {silk:'Silk', wool:'Wool', mixed:'Mixed Fibers', velvet:'Velvet', wood:'Solid Wood', brass:'Brass & Metal'},
      size: {small:'Small (up to 2×3m)', medium:'Medium (2×3–3×4m)', large:'Large (3×4–4×6m)', oversized:'Oversized (4×6m+)'},
      room: {'living-room':'Living Room','majlis':'Majlis','bedroom':'Bedroom','dining':'Dining Room','hallway':'Hallway','commercial':'Commercial Space'},
      color: {madder:'Madder Red', ivory:'Ivory', indigo:'Indigo Teal', charcoal:'Charcoal', gold:'Antique Gold'},
      colorHex: {madder:'#7A2E27', ivory:'#EDE6D6', indigo:'#2B4A47', charcoal:'#1B1714', gold:'#B08D46'}
    },
    ar: {
      category: {handmade:'يدوي', 'machine-made':'آلي', persian:'فارسي', turkish:'تركي', oriental:'شرقي', contemporary:'معاصر', commercial:'تجاري', furniture:'الأثاث', accessories:'إكسسوارات المنزل'},
      material: {silk:'حرير', wool:'صوف', mixed:'ألياف مختلطة', velvet:'مخمل', wood:'خشب طبيعي', brass:'نحاس ومعادن'},
      size: {small:'صغير (حتى 2×3م)', medium:'متوسط (2×3–3×4م)', large:'كبير (3×4–4×6م)', oversized:'كبير جدًا (أكثر من 4×6م)'},
      room: {'living-room':'غرفة المعيشة','majlis':'المجلس','bedroom':'غرفة النوم','dining':'غرفة الطعام','hallway':'الممر','commercial':'مساحة تجارية'},
      color: {madder:'أحمر الفوّة', ivory:'عاجي', indigo:'أزرق نيلي', charcoal:'فحمي', gold:'ذهبي عتيق'},
      colorHex: {madder:'#7A2E27', ivory:'#EDE6D6', indigo:'#2B4A47', charcoal:'#1B1714', gold:'#B08D46'}
    }
  };

  const products = {
    en: [
      {name:'Isfahan Medallion Silk Rug', category:['handmade','persian'], material:'silk', color:'madder', size:'large', room:['living-room','majlis'], motif:'medallion', handle:'isfahan-medallion-silk-rug', isNew:false, images:[
     'Assets/products/isfahan-medallion-silk-rug.jpg',
     'Assets/products/isfahan-medallion-silk-rug-2.jpg',
     'Assets/products/isfahan-medallion-silk-rug-3.jpg']},
      {name:'Tabriz Floral Wool Carpet', category:['handmade','persian'], material:'wool', color:'ivory', size:'oversized', room:['majlis','dining'], motif:'boteh', handle:'tabriz-floral-wool-carpet', isNew:false, images:[
     'Assets/products/tabriz-floral-wool-carpet.jpg',
     'Assets/products/tabriz-floral-wool-carpet-2.jpg',
     'Assets/products/tabriz-floral-wool-carpet-3.jpg']},
      {name:'Kashan Boteh Runner', category:['handmade','persian'], material:'silk', color:'madder', size:'small', room:['hallway'], motif:'boteh', handle:'kashan-boteh-runner', isNew:true, images:[
     'Assets/products/kashan-boteh-runner.jpg',
     'Assets/products/kashan-boteh-runner-2.jpg',
     'Assets/products/kashan-boteh-runner-3.jpg']},
      {name:'Hereke Silk Masterpiece', category:['handmade','turkish'], material:'silk', color:'gold', size:'medium', room:['living-room'], motif:'medallion', handle:'hereke-silk-masterpiece', isNew:false, images:[
     'Assets/products/hereke-silk-masterpiece.jpg',
     'Assets/products/hereke-silk-masterpiece-2.jpg',
     'Assets/products/hereke-silk-masterpiece-3.jpg']},
      {name:'Konya Kilim Geometric Rug', category:['handmade','turkish'], material:'wool', color:'charcoal', size:'medium', room:['living-room','bedroom'], motif:'lattice', handle:'konya-kilim-geometric-rug', sale:{percent:25, until:'2026-10-31', note:'autumn'}, isNew:false, images:[
     'Assets/products/konya-kilim-geometric-rug.jpg',
     'Assets/products/konya-kilim-geometric-rug-2.jpg',
     'Assets/products/konya-kilim-geometric-rug-3.jpg']},
      {name:'Anatolian Tribal Wool Rug', category:['handmade','turkish','oriental'], material:'wool', color:'indigo', size:'small', room:['bedroom'], motif:'chevron', handle:'anatolian-tribal-wool-rug', isNew:true, images:[
     'Assets/products/anatolian-tribal-wool-rug.jpg',
     'Assets/products/anatolian-tribal-wool-rug-2.jpg',
     'Assets/products/anatolian-tribal-wool-rug-3.jpg']},
      {name:'Silk Road Oriental Classic', category:['handmade','oriental'], material:'mixed', color:'madder', size:'large', room:['dining'], motif:'medallion', handle:'silk-road-oriental-classic', isNew:false, images:[
     'Assets/products/silk-road-oriental-classic.jpg',
     'Assets/products/silk-road-oriental-classic-2.jpg',
     'Assets/products/silk-road-oriental-classic-3.jpg']},
      {name:'Nain Fine Wool Carpet', category:['handmade','persian'], material:'wool', color:'ivory', size:'oversized', room:['majlis'], motif:'medallion', handle:'nain-fine-wool-carpet', sale:{percent:10, until:'2026-12-31', note:'clearance'}, isNew:false, images:[
     'Assets/products/nain-fine-wool-carpet.jpg',
     'Assets/products/nain-fine-wool-carpet-2.jpg',
     'Assets/products/nain-fine-wool-carpet-3.jpg']},
      {name:'Abstract Ivory Contemporary Rug', category:['contemporary'], material:'wool', color:'ivory', size:'large', room:['living-room'], motif:'lattice', handle:'abstract-ivory-contemporary-rug', isNew:true, images:[
     'Assets/products/abstract-ivory-contemporary-rug.jpg',
     'Assets/products/abstract-ivory-contemporary-rug-2.jpg',
     'Assets/products/abstract-ivory-contemporary-rug-3.jpg']},
      {name:'Charcoal Linear Contemporary Rug', category:['contemporary'], material:'mixed', color:'charcoal', size:'medium', room:['living-room','bedroom'], motif:'chevron', handle:'charcoal-linear-contemporary-rug', isNew:false, images:[
     'Assets/products/charcoal-linear-contemporary-rug.jpg',
     'Assets/products/charcoal-linear-contemporary-rug-2.jpg',
     'Assets/products/charcoal-linear-contemporary-rug-3.jpg']},
      {name:'Gold Trellis Contemporary Rug', category:['contemporary'], material:'wool', color:'gold', size:'medium', room:['dining'], motif:'lattice', handle:'gold-trellis-contemporary-rug', sale:{percent:20, until:'2026-10-31', note:'autumn'}, isNew:false, images:[
     'Assets/products/gold-trellis-contemporary-rug.jpg',
     'Assets/products/gold-trellis-contemporary-rug-2.jpg',
     'Assets/products/gold-trellis-contemporary-rug-3.jpg']},
      {name:'Everyday Trellis Machine-Made Rug', category:['machine-made'], material:'mixed', color:'charcoal', size:'large', room:['living-room'], motif:'tile', handle:'everyday-trellis-machine-made-rug', sale:{percent:30, until:'2026-10-31', note:'autumn'}, isNew:false, images:[
     'Assets/products/everyday-trellis-machine-made-rug.jpg',
     'Assets/products/everyday-trellis-machine-made-rug-2.jpg',
     'Assets/products/everyday-trellis-machine-made-rug-3.jpg']},
      {name:'Durable Medallion Machine-Made Rug', category:['machine-made'], material:'mixed', color:'madder', size:'medium', room:['dining','hallway'], motif:'medallion', handle:'durable-medallion-machine-made-rug', isNew:false, images:[
     'Assets/products/durable-medallion-machine-made-rug.jpg',
     'Assets/products/durable-medallion-machine-made-rug-2.jpg',
     'Assets/products/durable-medallion-machine-made-rug-3.jpg']},
      {name:'Hospitality Broadloom Carpet Tile', category:['commercial','machine-made'], material:'mixed', color:'charcoal', size:'oversized', room:['commercial'], motif:'tile', handle:'hospitality-broadloom-carpet-tile', isNew:false, images:[
     'Assets/products/hospitality-broadloom-carpet-tile.jpg',
     'Assets/products/hospitality-broadloom-carpet-tile-2.jpg',
     'Assets/products/hospitality-broadloom-carpet-tile-3.jpg']},
      {name:'Prayer Hall Custom Carpet', category:['commercial'], material:'wool', color:'indigo', size:'oversized', room:['commercial'], motif:'arch', handle:'prayer-hall-custom-carpet', isNew:true, images:[
     'Assets/products/prayer-hall-custom-carpet.jpg',
     'Assets/products/prayer-hall-custom-carpet-2.jpg',
     'Assets/products/prayer-hall-custom-carpet-3.jpg']},
      {name:'Executive Office Carpet Tile', category:['commercial','machine-made'], material:'mixed', color:'ivory', size:'large', room:['commercial'], motif:'tile', handle:'executive-office-carpet-tile', isNew:false, images:[
     'Assets/products/executive-office-carpet-tile.jpg',
     'Assets/products/executive-office-carpet-tile-2.jpg',
     'Assets/products/executive-office-carpet-tile-3.jpg']},
      {name:'Majlis Corner Sofa', category:['furniture'], material:'velvet', color:'ivory', room:['living-room','majlis'], motif:'sofa', handle:'majlis-corner-sofa', isNew:true, images:[
     'Assets/products/majlis-corner-sofa.jpg',
     'Assets/products/majlis-corner-sofa-2.jpg',
     'Assets/products/majlis-corner-sofa-3.jpg']},
      {name:'Carved Walnut Coffee Table', category:['furniture'], material:'wood', color:'charcoal', room:['living-room'], motif:'floorplan', handle:'carved-walnut-coffee-table', isNew:false, images:[
     'Assets/products/carved-walnut-coffee-table.jpg',
     'Assets/products/carved-walnut-coffee-table-2.jpg',
     'Assets/products/carved-walnut-coffee-table-3.jpg']},
      {name:'Velvet Accent Armchair', category:['furniture'], material:'velvet', color:'madder', room:['living-room','bedroom'], motif:'sofa', handle:'velvet-accent-armchair', sale:{percent:15, until:'2026-11-15', note:'furniture'}, isNew:false, images:[
     'Assets/products/velvet-accent-armchair.jpg',
     'Assets/products/velvet-accent-armchair-2.jpg',
     'Assets/products/velvet-accent-armchair-3.jpg']},
      {name:'Brass Floor Lamp', category:['accessories'], material:'brass', color:'gold', room:['living-room'], motif:'lamp', handle:'brass-floor-lamp', isNew:true, images:[
     'Assets/products/brass-floor-lamp.jpg',
     'Assets/products/brass-floor-lamp-2.jpg',
     'Assets/products/brass-floor-lamp-3.jpg']},
      {name:'Handblown Glass Vase', category:['accessories'], material:'mixed', color:'indigo', room:['dining'], motif:'vase', handle:'handblown-glass-vase', sale:{percent:20, until:'2026-11-15', note:'furniture'}, isNew:false, images:[
     'Assets/products/handblown-glass-vase.jpg',
     'Assets/products/handblown-glass-vase-2.jpg',
     'Assets/products/handblown-glass-vase-3.jpg']},
      {name:'Framed Silk Wall Panel', category:['accessories'], material:'silk', color:'gold', room:['majlis'], motif:'frame', handle:'framed-silk-panel', isNew:false, images:[
     'Assets/products/framed-silk-panel.jpg',
     'Assets/products/framed-silk-panel-2.jpg',
     'Assets/products/framed-silk-panel-3.jpg']}
    ],
    ar: [
      {name:'سجادة حريرية بميدالية أصفهان', category:['handmade','persian'], material:'silk', color:'madder', size:'large', room:['living-room','majlis'], motif:'medallion', handle:'isfahan-medallion-silk-rug', isNew:false, images:[
     'Assets/products/isfahan-medallion-silk-rug.jpg',
     'Assets/products/isfahan-medallion-silk-rug-2.jpg',
     'Assets/products/isfahan-medallion-silk-rug-3.jpg']},
      {name:'سجادة صوفية بزخارف تبريز الزهرية', category:['handmade','persian'], material:'wool', color:'ivory', size:'oversized', room:['majlis','dining'], motif:'boteh', handle:'tabriz-floral-wool-carpet', isNew:false, images:[
     'Assets/products/tabriz-floral-wool-carpet.jpg',
     'Assets/products/tabriz-floral-wool-carpet-2.jpg',
     'Assets/products/tabriz-floral-wool-carpet-3.jpg']},
      {name:'ممر كاشان بنقش البوتة', category:['handmade','persian'], material:'silk', color:'madder', size:'small', room:['hallway'], motif:'boteh', handle:'kashan-boteh-runner', isNew:true, images:[
     'Assets/products/kashan-boteh-runner.jpg',
     'Assets/products/kashan-boteh-runner-2.jpg',
     'Assets/products/kashan-boteh-runner-3.jpg']},
      {name:'تحفة هريكة الحريرية', category:['handmade','turkish'], material:'silk', color:'gold', size:'medium', room:['living-room'], motif:'medallion', handle:'hereke-silk-masterpiece', isNew:false, images:[
     'Assets/products/hereke-silk-masterpiece.jpg',
     'Assets/products/hereke-silk-masterpiece-2.jpg',
     'Assets/products/hereke-silk-masterpiece-3.jpg']},
      {name:'سجادة كليم قونية الهندسية', category:['handmade','turkish'], material:'wool', color:'charcoal', size:'medium', room:['living-room','bedroom'], motif:'lattice', handle:'konya-kilim-geometric-rug', sale:{percent:25, until:'2026-10-31', note:'autumn'}, isNew:false, images:[
     'Assets/products/konya-kilim-geometric-rug.jpg',
     'Assets/products/konya-kilim-geometric-rug-2.jpg',
     'Assets/products/konya-kilim-geometric-rug-3.jpg']},
      {name:'سجادة صوفية قبلية أناضولية', category:['handmade','turkish','oriental'], material:'wool', color:'indigo', size:'small', room:['bedroom'], motif:'chevron', handle:'anatolian-tribal-wool-rug', isNew:true, images:[
     'Assets/products/anatolian-tribal-wool-rug.jpg',
     'Assets/products/anatolian-tribal-wool-rug-2.jpg',
     'Assets/products/anatolian-tribal-wool-rug-3.jpg']},
      {name:'تحفة طريق الحرير الشرقية الكلاسيكية', category:['handmade','oriental'], material:'mixed', color:'madder', size:'large', room:['dining'], motif:'medallion', handle:'silk-road-oriental-classic', isNew:false, images:[
     'Assets/products/silk-road-oriental-classic.jpg',
     'Assets/products/silk-road-oriental-classic-2.jpg',
     'Assets/products/silk-road-oriental-classic-3.jpg']},
      {name:'سجادة نائين الصوفية الفاخرة', category:['handmade','persian'], material:'wool', color:'ivory', size:'oversized', room:['majlis'], motif:'medallion', handle:'nain-fine-wool-carpet', sale:{percent:10, until:'2026-12-31', note:'clearance'}, isNew:false, images:[
     'Assets/products/nain-fine-wool-carpet.jpg',
     'Assets/products/nain-fine-wool-carpet-2.jpg',
     'Assets/products/nain-fine-wool-carpet-3.jpg']},
      {name:'سجادة معاصرة تجريدية عاجية', category:['contemporary'], material:'wool', color:'ivory', size:'large', room:['living-room'], motif:'lattice', handle:'abstract-ivory-contemporary-rug', isNew:true, images:[
     'Assets/products/abstract-ivory-contemporary-rug.jpg',
     'Assets/products/abstract-ivory-contemporary-rug-2.jpg',
     'Assets/products/abstract-ivory-contemporary-rug-3.jpg']},
      {name:'سجادة معاصرة خطية فحمية', category:['contemporary'], material:'mixed', color:'charcoal', size:'medium', room:['living-room','bedroom'], motif:'chevron', handle:'charcoal-linear-contemporary-rug', isNew:false, images:[
     'Assets/products/charcoal-linear-contemporary-rug.jpg',
     'Assets/products/charcoal-linear-contemporary-rug-2.jpg',
     'Assets/products/charcoal-linear-contemporary-rug-3.jpg']},
      {name:'سجادة معاصرة بنقش ذهبي متشابك', category:['contemporary'], material:'wool', color:'gold', size:'medium', room:['dining'], motif:'lattice', handle:'gold-trellis-contemporary-rug', sale:{percent:20, until:'2026-10-31', note:'autumn'}, isNew:false, images:[
     'Assets/products/gold-trellis-contemporary-rug.jpg',
     'Assets/products/gold-trellis-contemporary-rug-2.jpg',
     'Assets/products/gold-trellis-contemporary-rug-3.jpg']},
      {name:'سجادة آلية يومية بنقش متشابك', category:['machine-made'], material:'mixed', color:'charcoal', size:'large', room:['living-room'], motif:'tile', handle:'everyday-trellis-machine-made-rug', sale:{percent:30, until:'2026-10-31', note:'autumn'}, isNew:false, images:[
     'Assets/products/everyday-trellis-machine-made-rug.jpg',
     'Assets/products/everyday-trellis-machine-made-rug-2.jpg',
     'Assets/products/everyday-trellis-machine-made-rug-3.jpg']},
      {name:'سجادة آلية متينة بميدالية', category:['machine-made'], material:'mixed', color:'madder', size:'medium', room:['dining','hallway'], motif:'medallion', handle:'durable-medallion-machine-made-rug', isNew:false, images:[
     'Assets/products/durable-medallion-machine-made-rug.jpg',
     'Assets/products/durable-medallion-machine-made-rug-2.jpg',
     'Assets/products/durable-medallion-machine-made-rug-3.jpg']},
      {name:'بلاط سجاد عريض للضيافة', category:['commercial','machine-made'], material:'mixed', color:'charcoal', size:'oversized', room:['commercial'], motif:'tile', handle:'hospitality-broadloom-carpet-tile', isNew:false, images:[
     'Assets/products/hospitality-broadloom-carpet-tile.jpg',
     'Assets/products/hospitality-broadloom-carpet-tile-2.jpg',
     'Assets/products/hospitality-broadloom-carpet-tile-3.jpg']},
      {name:'سجادة مخصصة لقاعة الصلاة', category:['commercial'], material:'wool', color:'indigo', size:'oversized', room:['commercial'], motif:'arch', handle:'prayer-hall-custom-carpet', isNew:true, images:[
     'Assets/products/prayer-hall-custom-carpet.jpg',
     'Assets/products/prayer-hall-custom-carpet-2.jpg',
     'Assets/products/prayer-hall-custom-carpet-3.jpg']},
      {name:'بلاط سجاد للمكاتب التنفيذية', category:['commercial','machine-made'], material:'mixed', color:'ivory', size:'large', room:['commercial'], motif:'tile', handle:'executive-office-carpet-tile', isNew:false, images:[
     'Assets/products/executive-office-carpet-tile.jpg',
     'Assets/products/executive-office-carpet-tile-2.jpg',
     'Assets/products/executive-office-carpet-tile-3.jpg']},
      {name:'أريكة زاوية للمجلس', category:['furniture'], material:'velvet', color:'ivory', room:['living-room','majlis'], motif:'sofa', handle:'majlis-corner-sofa', isNew:true, images:[
     'Assets/products/majlis-corner-sofa.jpg',
     'Assets/products/majlis-corner-sofa-2.jpg',
     'Assets/products/majlis-corner-sofa-3.jpg']},
      {name:'طاولة قهوة من خشب الجوز المنحوت', category:['furniture'], material:'wood', color:'charcoal', room:['living-room'], motif:'floorplan', handle:'carved-walnut-coffee-table', isNew:false, images:[
     'Assets/products/carved-walnut-coffee-table.jpg',
     'Assets/products/carved-walnut-coffee-table-2.jpg',
     'Assets/products/carved-walnut-coffee-table-3.jpg']},
      {name:'كرسي مخملي مميز', category:['furniture'], material:'velvet', color:'madder', room:['living-room','bedroom'], motif:'sofa', handle:'velvet-accent-armchair', sale:{percent:15, until:'2026-11-15', note:'furniture'}, isNew:false, images:[
     'Assets/products/velvet-accent-armchair.jpg',
     'Assets/products/velvet-accent-armchair-2.jpg',
     'Assets/products/velvet-accent-armchair-3.jpg']},
      {name:'مصباح أرضي نحاسي', category:['accessories'], material:'brass', color:'gold', room:['living-room'], motif:'lamp', handle:'brass-floor-lamp', isNew:true, images:[
     'Assets/products/brass-floor-lamp.jpg',
     'Assets/products/brass-floor-lamp-2.jpg',
     'Assets/products/brass-floor-lamp-3.jpg']},
      {name:'مزهرية زجاجية منفوخة يدويًا', category:['accessories'], material:'mixed', color:'indigo', room:['dining'], motif:'vase', handle:'handblown-glass-vase', sale:{percent:20, until:'2026-11-15', note:'furniture'}, isNew:false, images:[
     'Assets/products/handblown-glass-vase.jpg',
     'Assets/products/handblown-glass-vase-2.jpg',
     'Assets/products/handblown-glass-vase-3.jpg']},
      {name:'لوحة جدارية حريرية مؤطرة', category:['accessories'], material:'silk', color:'gold', room:['majlis'], motif:'frame', handle:'framed-silk-panel', isNew:false, images:[
     'Assets/products/framed-silk-panel.jpg',
     'Assets/products/framed-silk-panel-2.jpg',
     'Assets/products/framed-silk-panel-3.jpg']}
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

  return { labels: labels, products: products, detailFor: detailFor, find: find, onSale: onSale };
})();
