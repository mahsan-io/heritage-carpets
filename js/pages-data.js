/* ======================================================================
   HERITAGE — CONTENT PAGES (Furniture / Flooring / About Us)
   ----------------------------------------------------------------------
   DRAFT COPY. Adapted from wording already used elsewhere on the site
   (the Projects page solution blocks and the homepage heritage timeline)
   so the tone matches, but it has not been written or approved by
   Heritage — review and replace before launch.

   Each page: hero + intro + a set of blocks + a closing call to action.
   Blocks with a `slug` show a photo from Assets/projects/{slug}.jpg and
   fall back to the SVG motif when that file isn't there yet.
   ====================================================================== */
window.HeritagePages = (function(){

  const furniture = {
    en: {
      kicker:'Furniture', title:'Divano — Luxury Furniture',
      lead:'Furniture is not simply about filling a space. It is a reflection of a refined lifestyle, and the balance of elegance and comfort that a room is built around.',
      introTitle:'Crafted for Living',
      introBody:'Divano is our furniture house: exceptional collections that blend innovative modern design with high-end craftsmanship, made for premium villas, residential estates, and prestigious commercial projects. Every piece is built on a robust, meticulously engineered frame, padded with high-density foam for long-lasting ergonomic support, and upholstered in the finest woven fabrics and premium leathers.',
      blocks: [
        {t:'Majlis & Living Seating', motif:'sofa', slug:'private-villa-jeddah',
         d:'Corner sofas, sectionals and modular seating scaled to the room — from intimate family majlis to full reception halls, arranged to suit the layout rather than the other way round.'},
        {t:'Occasional & Accent Pieces', motif:'frame', slug:'',
         d:'Armchairs, side tables and console pieces that finish a room. Available in the same fabric and leather ranges as the main collections, so a scheme stays coherent across every piece.'},
        {t:'Contract & Hospitality', motif:'floorplan', slug:'juffali-head-office',
         d:'Executive offices, boardrooms, hotel suites and lounges — specified for daily commercial use, with durability and maintenance considered alongside the aesthetic.'},
        {t:'Bespoke Commissions', motif:'medallion', slug:'',
         d:'Dimensions, fabrics and finishes tailored to your architectural drawings. Our team works from your concept and returns samples for approval before anything enters production.'}
      ],
      featTitle:'What Sets It Apart',
      features: [
        {t:'Craftsmanship', d:'Professional attention to detail throughout, ensuring a premium and flawless finish.'},
        {t:'Materials', d:'Solid hardwood frames, high-density foam, and upholstery in fine woven fabrics and premium leathers.'},
        {t:'Design', d:'Contemporary pieces balanced against timeless elegance, with flexible arrangements for varied layouts.'},
        {t:'Performance', d:'Exceptional comfort and high durability, built to hold its appearance over years of use.'}
      ],
      storeUrl: 'https://www.divanoksa.com',
      categoriesTitle: 'Shop the Full Collection',
      categoriesLead: 'Every Divano category, ready to browse and buy on our online store.',
      categories: [
        { t:'Living Room', href:'https://www.divanoksa.com/en/collections/living-room', items:[
          {t:'Sofa Sets', href:'https://www.divanoksa.com/en/collections/sofa-sets'},
          {t:'Corner Sofa Sets', href:'https://www.divanoksa.com/en/collections/corner-sofa-sets'},
          {t:'Sofas', href:'https://www.divanoksa.com/en/collections/sofas'},
          {t:'Poufs', href:'https://www.divanoksa.com/en/collections/poufs'},
          {t:'Armchairs', href:'https://www.divanoksa.com/en/collections/armchair'},
          {t:'Console', href:'https://www.divanoksa.com/en/collections/console'},
          {t:'Coffee Table Sets', href:'https://www.divanoksa.com/en/collections/coffee-table-sets'},
          {t:'Coffee Tables', href:'https://www.divanoksa.com/en/collections/coffee-table'},
          {t:'Side & End Tables', href:'https://www.divanoksa.com/en/collections/side-end-tables'},
          {t:'Nest of Tables', href:'https://www.divanoksa.com/en/collections/nest-of-tables'},
          {t:'Bookcases & Display Shelves', href:'https://www.divanoksa.com/en/collections/bookcases-display-shelves'},
          {t:'TV & Media Units', href:'https://www.divanoksa.com/en/collections/tv-media-units'}
        ]},
        { t:'Bedroom', href:'https://www.divanoksa.com/en/collections/bedroom', items:[
          {t:'Beds & Bedroom Sets', href:'https://www.divanoksa.com/en/collections/bedroom-sets'},
          {t:'Wardrobes', href:'https://www.divanoksa.com/en/collections/wardrobes'},
          {t:'Mattresses', href:'https://www.divanoksa.com/en/collections/mattresses'},
          {t:'Benches', href:'https://www.divanoksa.com/en/collections/%D9%85%D9%82%D8%A7%D8%B9%D8%AF-%D8%A8%D9%86%D8%B4'},
          {t:'Nightstands', href:'https://www.divanoksa.com/en/collections/nightstands'},
          {t:'Dresser', href:'https://www.divanoksa.com/en/collections/dresser'}
        ]},
        { t:'Dining Room', href:'https://www.divanoksa.com/en/collections/dining-room', items:[
          {t:'Dining Rooms', href:'https://www.divanoksa.com/en/collections/dining-room-sets'},
          {t:'Dining Tables', href:'https://www.divanoksa.com/en/collections/dining-tables'},
          {t:'Dining Chairs', href:'https://www.divanoksa.com/en/collections/dinning-chair'},
          {t:'Cabinets & Buffets', href:'https://www.divanoksa.com/en/collections/console-tables-mirrors'}
        ]},
        { t:'Wall Decor and Mirrors', href:'', items:[
          {t:'Mirrors', href:'https://www.divanoksa.com/en/collections/mirrors'},
          {t:'Wall Art', href:'https://www.divanoksa.com/en/collections/wall-art'}
        ]},
        { t:'Lighting', href:'', items:[
          {t:'Pendant Lamps', href:'https://www.divanoksa.com/en/collections/pendant-lamp'},
          {t:'Table Lamps', href:'https://www.divanoksa.com/en/collections/table-lamp'},
          {t:'Floor Lamps', href:'https://www.divanoksa.com/en/collections/floor-lamp'}
        ]},
        { t:'Decorative Accessories', href:'', items:[
          {t:'Artificial Flowers & Plants', href:'https://www.divanoksa.com/en/collections/artificial-flowers-plants'},
          {t:'Decorative Objects & Sculpture', href:'https://www.divanoksa.com/en/collections/decorative-objects-sculpture'},
          {t:'Trays & Boxes', href:'https://www.divanoksa.com/en/collections/trays-boxes'},
          {t:'Vase & Candlestick', href:'https://www.divanoksa.com/en/collections/vase-candlestick'}
        ]}
      ],
      ctaTitle:'Furnish Your Space',
      ctaBody:'Visit a Divano showroom to see the collections in person, or speak with our team about a commission.',
      ctaPrimary:'Find a Showroom', ctaSecondary:'Shop on Divano'
    },
    ar: {
      kicker:'الأثاث', title:'ديفانو — الأثاث الفاخر',
      lead:'الأثاث ليس مجرد شغل للمساحة، بل انعكاس لأسلوب حياة راقٍ، وتوازن بين الأناقة والراحة تُبنى حوله الغرفة.',
      introTitle:'مصنوع للحياة',
      introBody:'ديفانو هي دار الأثاث لدينا: مجموعات استثنائية تمزج التصميم العصري المبتكر بالحِرفية الراقية، لتناسب الفلل الفاخرة والمجمعات السكنية والمشاريع التجارية المرموقة. تُبنى كل قطعة على هيكل متين مصمم بعناية، محشو بإسفنج عالي الكثافة لدعم مريح يدوم، ومكسو بأجود الأقمشة المنسوجة والجلود الفاخرة.',
      blocks: [
        {t:'مجالس وجلسات المعيشة', motif:'sofa', slug:'private-villa-jeddah',
         d:'أرائك زاوية وجلسات مقسّمة ووحدات مرنة بمقاسات تناسب الغرفة — من المجالس العائلية الحميمة إلى قاعات الاستقبال الكاملة، مرتبة لتلائم المخطط لا العكس.'},
        {t:'القطع المميزة والمكمّلة', motif:'frame', slug:'',
         d:'كراسي وطاولات جانبية وقطع كونسول تُكمل الغرفة، متوفرة بالأقمشة والجلود ذاتها المستخدمة في المجموعات الرئيسية للحفاظ على تناسق التصميم.'},
        {t:'المشاريع والضيافة', motif:'floorplan', slug:'juffali-head-office',
         d:'مكاتب تنفيذية وقاعات اجتماعات وأجنحة فنادق وصالات — مُعدّة للاستخدام التجاري اليومي، مع مراعاة المتانة وسهولة الصيانة إلى جانب الجانب الجمالي.'},
        {t:'التصاميم الحصرية', motif:'medallion', slug:'',
         d:'أبعاد وأقمشة وتشطيبات مفصّلة وفق مخططاتكم المعمارية. يعمل فريقنا انطلاقًا من مفهومكم ويقدم عينات للاعتماد قبل بدء الإنتاج.'}
      ],
      featTitle:'ما يميزه',
      features: [
        {t:'الحِرفية', d:'اهتمام احترافي بالتفاصيل يضمن تشطيبًا فاخرًا خاليًا من العيوب.'},
        {t:'الخامات', d:'هياكل من الخشب الصلب، وإسفنج عالي الكثافة، وتنجيد بأجود الأقمشة والجلود الفاخرة.'},
        {t:'التصميم', d:'قطع معاصرة متوازنة مع أناقة خالدة، وترتيبات مرنة تناسب مختلف المخططات.'},
        {t:'الأداء', d:'راحة استثنائية ومتانة عالية، مصممة للحفاظ على مظهرها لسنوات.'}
      ],
      storeUrl: 'https://www.divanoksa.com',
      categoriesTitle: 'تصفح المجموعة الكاملة',
      categoriesLead: 'كل فئات ديفانو، جاهزة للتصفح والشراء عبر متجرنا الإلكتروني.',
      categories: [
        { t:'غرفة المعيشة', href:'https://www.divanoksa.com/en/collections/living-room', items:[
          {t:'أطقم الأرائك', href:'https://www.divanoksa.com/en/collections/sofa-sets'},
          {t:'أرائك زاوية', href:'https://www.divanoksa.com/en/collections/corner-sofa-sets'},
          {t:'أرائك', href:'https://www.divanoksa.com/en/collections/sofas'},
          {t:'بوف', href:'https://www.divanoksa.com/en/collections/poufs'},
          {t:'كراسي بذراعين', href:'https://www.divanoksa.com/en/collections/armchair'},
          {t:'كونسول', href:'https://www.divanoksa.com/en/collections/console'},
          {t:'أطقم طاولات قهوة', href:'https://www.divanoksa.com/en/collections/coffee-table-sets'},
          {t:'طاولات قهوة', href:'https://www.divanoksa.com/en/collections/coffee-table'},
          {t:'طاولات جانبية', href:'https://www.divanoksa.com/en/collections/side-end-tables'},
          {t:'طاولات متداخلة', href:'https://www.divanoksa.com/en/collections/nest-of-tables'},
          {t:'مكتبات ورفوف عرض', href:'https://www.divanoksa.com/en/collections/bookcases-display-shelves'},
          {t:'وحدات تلفزيون ووسائط', href:'https://www.divanoksa.com/en/collections/tv-media-units'}
        ]},
        { t:'غرفة النوم', href:'https://www.divanoksa.com/en/collections/bedroom', items:[
          {t:'أسرّة وأطقم غرف نوم', href:'https://www.divanoksa.com/en/collections/bedroom-sets'},
          {t:'خزائن ملابس', href:'https://www.divanoksa.com/en/collections/wardrobes'},
          {t:'مراتب', href:'https://www.divanoksa.com/en/collections/mattresses'},
          {t:'مقاعد بنش', href:'https://www.divanoksa.com/en/collections/%D9%85%D9%82%D8%A7%D8%B9%D8%AF-%D8%A8%D9%86%D8%B4'},
          {t:'طاولات جانب السرير', href:'https://www.divanoksa.com/en/collections/nightstands'},
          {t:'تسريحة', href:'https://www.divanoksa.com/en/collections/dresser'}
        ]},
        { t:'غرفة الطعام', href:'https://www.divanoksa.com/en/collections/dining-room', items:[
          {t:'غرف طعام', href:'https://www.divanoksa.com/en/collections/dining-room-sets'},
          {t:'طاولات طعام', href:'https://www.divanoksa.com/en/collections/dining-tables'},
          {t:'كراسي طعام', href:'https://www.divanoksa.com/en/collections/dinning-chair'},
          {t:'خزائن وبوفيهات', href:'https://www.divanoksa.com/en/collections/console-tables-mirrors'}
        ]},
        { t:'ديكور الحائط والمرايا', href:'', items:[
          {t:'مرايا', href:'https://www.divanoksa.com/en/collections/mirrors'},
          {t:'لوحات جدارية', href:'https://www.divanoksa.com/en/collections/wall-art'}
        ]},
        { t:'الإضاءة', href:'', items:[
          {t:'مصابيح معلقة', href:'https://www.divanoksa.com/en/collections/pendant-lamp'},
          {t:'مصابيح طاولة', href:'https://www.divanoksa.com/en/collections/table-lamp'},
          {t:'مصابيح أرضية', href:'https://www.divanoksa.com/en/collections/floor-lamp'}
        ]},
        { t:'إكسسوارات الديكور', href:'', items:[
          {t:'زهور ونباتات صناعية', href:'https://www.divanoksa.com/en/collections/artificial-flowers-plants'},
          {t:'تحف وقطع ديكور', href:'https://www.divanoksa.com/en/collections/decorative-objects-sculpture'},
          {t:'صواني وعلب', href:'https://www.divanoksa.com/en/collections/trays-boxes'},
          {t:'مزهريات وشمعدانات', href:'https://www.divanoksa.com/en/collections/vase-candlestick'}
        ]}
      ],
      ctaTitle:'أثّث مساحتك',
      ctaBody:'زر أحد صالات ديفانو لمعاينة المجموعات، أو تحدث مع فريقنا حول تصميم خاص.',
      ctaPrimary:'اعثر على صالة عرض', ctaSecondary:'تسوق على ديفانو'
    }
  };

  const flooring = {
    en: {
      kicker:'Flooring', title:'Complete Flooring Solutions',
      lead:'From hand-knotted carpet to sports turf — supplied, tailored and installed by our own teams, for projects across the Kingdom.',
      introTitle:'One Supplier, Every Surface',
      introBody:'Heritage supplies the full range of floor coverings for residential and commercial projects: carpet and carpet tiles, prayer hall carpets, vinyl, artificial grass, and bespoke hand-tufted rugs. Because supply, fabrication and installation are all handled in-house, there are no gaps between trades and one team stays accountable from specification to handover.',
      blocks: [
        {t:'Carpet', motif:'medallion', slug:'le-park-concord-hotel', href:'projects.html#solution-le-park-concord-hotel-en',
         d:'The most popular floor covering for a reason: more colour and texture options than any alternative, able to hide sub-floor irregularities, and easier and more economical to install and replace.'},
        {t:'Carpet Tiles', motif:'tile', slug:'makkah-chamber', href:'projects.html#solution-makkah-chamber-en',
         d:'Modular, with integrated cushion engineered for the most demanding traffic. Damaged tiles lift and replace individually, and floor outlets stay accessible without disturbing the whole floor.'},
        {t:'Masjed Carpets', motif:'arch', slug:'king-abdullah-sport-city-mosque', href:'projects.html#solution-king-abdullah-sport-city-mosque-en',
         d:'Prayer hall carpets woven to exact room dimensions, with mihrab alignment and Saf rows executed precisely, built to hold their colour and thickness under continuous use.'},
        {t:'Vinyl', motif:'floorplan', slug:'alfalah-schools-jeddah', href:'projects.html#solution-alfalah-schools-jeddah-en',
         d:'Anti-microbial, anti-static, anti-slip and noise-damping — the practical choice for hospitals, schools, nurseries and industrial facilities where maintenance and hygiene lead the specification.'},
        {t:'Artificial Grass', motif:'lattice', slug:'king-faisal-specialist-hospital', href:'projects.html#solution-king-faisal-specialist-hospital-en',
         d:'Approved by FIFA, UEFA and ITF among others. No irrigation, mowing or post-match maintenance, guaranteed for five years, and installed with equipment imported from Germany.'},
        {t:'Hand Tufted Rugs', motif:'boteh', slug:'juffali-head-office', href:'projects.html#solution-juffali-head-office-en',
         d:'Pure New Zealand wool and fine silk, hand-tufted by skilled artisans and fully customisable in shape, colour and dimension — for boardrooms, main salons and luxury interiors.'}
      ],
      featTitle:'How We Work',
      features: [
        {t:'Site Survey', d:'We measure on site and review drawings and specifications with your design team.'},
        {t:'Samples First', d:'Physical samples and strike-offs are approved before anything enters production.'},
        {t:'Own Installers', d:'Fitted by our own trained teams, not subcontracted, then inspected before handover.'},
        {t:'Aftercare', d:'Care guidance at handover, with maintenance and replacement support afterwards.'}
      ],
      ctaTitle:'Specify Your Project',
      ctaBody:'Send us your drawings and requirements, and a project specialist will respond within 48 hours.',
      ctaPrimary:'Start a Project', ctaSecondary:'See Our Projects'
    },
    ar: {
      kicker:'الأرضيات', title:'حلول أرضيات متكاملة',
      lead:'من السجاد المعقود يدويًا إلى العشب الرياضي — توريد وتفصيل وتركيب بأيدي فرقنا، لمشاريع في أنحاء المملكة.',
      introTitle:'مورّد واحد، لكل الأسطح',
      introBody:'توفر التراث المدى الكامل من أغطية الأرضيات للمشاريع السكنية والتجارية: السجاد وبلاط السجاد، وسجاد قاعات الصلاة، والفينيل، والعشب الصناعي، والسجاد المعقود يدويًا حسب الطلب. ولأن التوريد والتصنيع والتركيب تتم جميعها داخليًا، لا توجد فجوات بين التخصصات، ويبقى فريق واحد مسؤولًا من المواصفة حتى التسليم.',
      blocks: [
        {t:'السجاد', motif:'medallion', slug:'le-park-concord-hotel', href:'projects.html#solution-le-park-concord-hotel-ar',
         d:'الخيار الأكثر شيوعًا لسبب وجيه: خيارات ألوان وملامس تفوق أي بديل، وقدرة على إخفاء تفاوتات الأرضية، وسهولة واقتصادية أكبر في التركيب والاستبدال.'},
        {t:'بلاط السجاد', motif:'tile', slug:'makkah-chamber', href:'projects.html#solution-makkah-chamber-ar',
         d:'معياري، بطبقة دعم مدمجة مصممة لأقسى ظروف الحركة. يُرفع البلاط التالف ويُستبدل فرديًا، وتبقى منافذ الأرضية سهلة الوصول دون العبث بكامل المساحة.'},
        {t:'سجاد المساجد', motif:'arch', slug:'king-abdullah-sport-city-mosque', href:'projects.html#solution-king-abdullah-sport-city-mosque-ar',
         d:'سجاد لقاعات الصلاة منسوج بأبعاد دقيقة، مع محاذاة المحراب وصفوف الصلاة بدقة، مصمم للحفاظ على لونه وسماكته تحت الاستخدام المستمر.'},
        {t:'الفينيل', motif:'floorplan', slug:'alfalah-schools-jeddah', href:'projects.html#solution-alfalah-schools-jeddah-ar',
         d:'مقاوم للميكروبات والكهرباء الساكنة والانزلاق وكاتم للضجيج — الخيار العملي للمستشفيات والمدارس والحضانات والمنشآت الصناعية.'},
        {t:'العشب الصناعي', motif:'lattice', slug:'king-faisal-specialist-hospital', href:'projects.html#solution-king-faisal-specialist-hospital-ar',
         d:'معتمد من الفيفا واليويفا والاتحاد الدولي للتنس وغيرها. بلا ري أو قص أو صيانة بعد المباريات، مضمون خمس سنوات، ويُركّب بمعدات مستوردة من ألمانيا.'},
        {t:'السجاد المعقود يدويًا', motif:'boteh', slug:'juffali-head-office', href:'projects.html#solution-juffali-head-office-ar',
         d:'صوف نيوزيلندا النقي والحرير الفاخر، معقود يدويًا على أيدي حرفيين مهرة وقابل للتخصيص بالكامل في الشكل واللون والأبعاد.'}
      ],
      featTitle:'آلية العمل',
      features: [
        {t:'مسح الموقع', d:'نأخذ المقاسات في الموقع ونراجع المخططات والمواصفات مع فريق التصميم لديكم.'},
        {t:'العينات أولًا', d:'تُعتمد العينات الفعلية والنماذج الأولية قبل دخول أي شيء مرحلة الإنتاج.'},
        {t:'فرق تركيب خاصة', d:'التركيب بأيدي فرقنا المدربة لا عبر مقاولين، مع الفحص قبل التسليم.'},
        {t:'العناية اللاحقة', d:'إرشادات العناية عند التسليم، مع دعم الصيانة والاستبدال لاحقًا.'}
      ],
      ctaTitle:'حدّد مواصفات مشروعك',
      ctaBody:'أرسل لنا مخططاتك ومتطلباتك، وسيرد عليك أحد مختصي المشاريع خلال 48 ساعة.',
      ctaPrimary:'ابدأ مشروعًا', ctaSecondary:'شاهد مشاريعنا'
    }
  };

  return { furniture: furniture, flooring: flooring };
})();
