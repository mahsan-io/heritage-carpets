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
     // storyLogo: 'Assets/brands/divano/D_logo.png',
      storySlides: [
        {t:'Crafted for Living', img:'Assets/brands/divano/D_0.png',
         b:'Divano is our furniture house: exceptional collections that blend innovative modern design with high-end craftsmanship, made for premium villas, residential estates, and prestigious commercial projects. Every piece is built on a robust, meticulously engineered frame, padded with high-density foam for long-lasting ergonomic support, and upholstered in the finest woven fabrics and premium leathers.'},
        {t:'Our Mission', img:'Assets/brands/divano/D_1.jpg',
         b:'At Divano, our mission is to provide you with the finest selection of luxurious furniture pieces that will transform your living space into a haven of comfort and elegance. As an ecommerce store specialising in high-quality furniture, we pride ourselves on offering high-quality furnishings and home accessories with Italian designs and limited editions, with customised services and a distinguished customer shopping experience.'},
        {t:'Our Story', img:'Assets/brands/divano/D_2.jpg',
         b:"Our store was founded in 2010. Due to our commitment to the highest standards of craftsmanship and quality over the years, we have built a reputable reputation in Saudi Arabia. The Divano brand quickly became a trusted destination for those looking for high-quality furniture that will last for many years. We began to expand our product range and became one of the first brands to offer modern furniture with modern designs locally, in order to keep up with the latest developments and meet the ever-changing needs of our customers. Over the past few years, which have witnessed an incredible boom in Saudi Arabia, the Divano brand has continued to grow through the opening of many new stores and showrooms. Today, as one of the pioneers in the field, we continue to work and progress in accordance with Saudi Vision 2030, in order to contribute to the development of the furniture sector and preserve the rich heritage and unique identity that distinguishes our civilisation."},
        {t:'Our Approach', img:'Assets/brands/divano/D_3.jpg',
         b:"At Divano, we understand the importance of creating a home that exudes elegance and style. That's why we have curated a selection of top-selling furniture items, including elegant sofas, stylish armchairs, stunning leather recliners, and modern sectional sofas. Our commitment to quality craftsmanship and attention to detail sets us apart, ensuring that every piece we offer is not only visually stunning but also built to last."}
      ],
      service: {
        title:'Interior Design',
        body:'Enjoy an easy and exceptional interior design experience with Divano Elite Experts. Divano Elite offers a comprehensive design service to help you create a unique and modern home that reflects your style, fits your space, and stays within your budget.',
        linkText:'Start Your Design', linkUrl:'https://www.divanoksa.com/en/pages/interior-design'
      },
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
     // storyLogo: 'Assets/brands/divano/D_logo.png',
      storySlides: [
        {t:'مصنوع للحياة', img:'Assets/brands/divano/D_0.png',
         b:'ديفانو هي دار الأثاث لدينا: مجموعات استثنائية تمزج التصميم العصري المبتكر بالحِرفية الراقية، لتناسب الفلل الفاخرة والمجمعات السكنية والمشاريع التجارية المرموقة. تُبنى كل قطعة على هيكل متين مصمم بعناية، محشو بإسفنج عالي الكثافة لدعم مريح يدوم، ومكسو بأجود الأقمشة المنسوجة والجلود الفاخرة.'},
        {t:'مهمتنا', img:'Assets/brands/divano/D_1.jpg',
         b:'في ديفانو، مهمتنا أن نقدم لك أرقى تشكيلة من قطع الأثاث الفاخرة التي تحوّل مساحة معيشتك إلى ملاذ من الراحة والأناقة. وبصفتنا متجرًا إلكترونيًا متخصصًا في الأثاث عالي الجودة، نفخر بتقديم مفروشات وإكسسوارات منزلية بتصاميم إيطالية وإصدارات محدودة، مع خدمات مخصصة وتجربة تسوق مميزة لعملائنا.'},
        {t:'قصتنا', img:'Assets/brands/divano/D_2.jpg',
         b:'تأسس متجرنا عام 2010. وبفضل التزامنا بأعلى معايير الحِرفية والجودة على مر السنين، بنينا سمعة موثوقة في المملكة العربية السعودية. وسرعان ما أصبحت علامة ديفانو وجهة موثوقة لمن يبحثون عن أثاث عالي الجودة يدوم لسنوات طويلة. وبدأنا في توسيع تشكيلة منتجاتنا، لنصبح من أوائل العلامات التي تقدم أثاثًا عصريًا بتصاميم حديثة محليًا، لمواكبة أحدث التطورات وتلبية احتياجات عملائنا المتغيرة باستمرار. وعلى مدى السنوات الأخيرة التي شهدت ازدهارًا استثنائيًا في المملكة العربية السعودية، واصلت علامة ديفانو نموها من خلال افتتاح العديد من المتاجر وصالات العرض الجديدة. واليوم، وبصفتنا من رواد هذا المجال، نواصل العمل والتطور بما يتماشى مع رؤية السعودية 2030، إسهامًا منا في تطوير قطاع الأثاث والحفاظ على الإرث الغني والهوية الفريدة التي تميز حضارتنا.'},
        {t:'منهجنا', img:'Assets/brands/divano/D_3.jpg',
         b:'في ديفانو، ندرك أهمية خلق منزل يفيض بالأناقة والرقي. لذا انتقينا تشكيلة من أكثر قطع الأثاث مبيعًا، تشمل الأرائك الأنيقة، والكراسي بذراعين العصرية، والكراسي الجلدية القابلة للاستلقاء الرائعة، والأرائك القطاعية الحديثة. والتزامنا بالحِرفية العالية والاهتمام بالتفاصيل هو ما يميزنا، ليضمن أن كل قطعة نقدمها ليست فقط أخّاذة بصريًا بل مصنوعة لتدوم.'}
      ],
      service: {
        title:'التصميم الداخلي',
        body:'استمتع بتجربة تصميم داخلي سهلة واستثنائية مع خبراء ديفانو إيليت. تقدم ديفانو إيليت خدمة تصميم متكاملة تساعدك على ابتكار منزل عصري وفريد يعكس أسلوبك، ويلائم مساحتك، ويبقى ضمن ميزانيتك.',
        linkText:'ابدأ تصميمك', linkUrl:'https://www.divanoksa.com/en/pages/interior-design'
      },
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
      storySlides: [
        {t:'Carpet', img:'Assets/projects/le-park-concord-hotel.jpg', href:'projects.html#solution-le-park-concord-hotel-en',
         b:'The most popular floor covering for a reason: more colour and texture options than any alternative, able to hide sub-floor irregularities, and easier and more economical to install and replace.'},
        {t:'Carpet Tiles', img:'Assets/projects/makkah-chamber.jpg', href:'projects.html#solution-makkah-chamber-en',
         b:'Modular, with integrated cushion engineered for the most demanding traffic. Damaged tiles lift and replace individually, and floor outlets stay accessible without disturbing the whole floor.'},
        {t:'Masjed Carpets', img:'Assets/projects/king-abdullah-sport-city-mosque.jpg', href:'projects.html#solution-king-abdullah-sport-city-mosque-en',
         b:'Prayer hall carpets woven to exact room dimensions, with mihrab alignment and Saf rows executed precisely, built to hold their colour and thickness under continuous use.'},
        {t:'Vinyl', img:'Assets/projects/alfalah-schools-jeddah.jpg', href:'projects.html#solution-alfalah-schools-jeddah-en',
         b:'Anti-microbial, anti-static, anti-slip and noise-damping — the practical choice for hospitals, schools, nurseries and industrial facilities where maintenance and hygiene lead the specification.'},
        {t:'Artificial Grass', img:'Assets/projects/king-faisal-specialist-hospital.jpg', href:'projects.html#solution-king-faisal-specialist-hospital-en',
         b:'Approved by FIFA, UEFA and ITF among others. No irrigation, mowing or post-match maintenance, guaranteed for five years, and installed with equipment imported from Germany.'},
        {t:'Hand Tufted Rugs', img:'Assets/projects/juffali-head-office.jpg', href:'projects.html#solution-juffali-head-office-en',
         b:'Pure New Zealand wool and fine silk, hand-tufted by skilled artisans and fully customisable in shape, colour and dimension — for boardrooms, main salons and luxury interiors.'}
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
      storySlides: [
        {t:'السجاد', img:'Assets/projects/le-park-concord-hotel.jpg', href:'projects.html#solution-le-park-concord-hotel-ar',
         b:'الخيار الأكثر شيوعًا لسبب وجيه: خيارات ألوان وملامس تفوق أي بديل، وقدرة على إخفاء تفاوتات الأرضية، وسهولة واقتصادية أكبر في التركيب والاستبدال.'},
        {t:'بلاط السجاد', img:'Assets/projects/makkah-chamber.jpg', href:'projects.html#solution-makkah-chamber-ar',
         b:'معياري، بطبقة دعم مدمجة مصممة لأقسى ظروف الحركة. يُرفع البلاط التالف ويُستبدل فرديًا، وتبقى منافذ الأرضية سهلة الوصول دون العبث بكامل المساحة.'},
        {t:'سجاد المساجد', img:'Assets/projects/king-abdullah-sport-city-mosque.jpg', href:'projects.html#solution-king-abdullah-sport-city-mosque-ar',
         b:'سجاد لقاعات الصلاة منسوج بأبعاد دقيقة، مع محاذاة المحراب وصفوف الصلاة بدقة، مصمم للحفاظ على لونه وسماكته تحت الاستخدام المستمر.'},
        {t:'الفينيل', img:'Assets/projects/alfalah-schools-jeddah.jpg', href:'projects.html#solution-alfalah-schools-jeddah-ar',
         b:'مقاوم للميكروبات والكهرباء الساكنة والانزلاق وكاتم للضجيج — الخيار العملي للمستشفيات والمدارس والحضانات والمنشآت الصناعية.'},
        {t:'العشب الصناعي', img:'Assets/projects/king-faisal-specialist-hospital.jpg', href:'projects.html#solution-king-faisal-specialist-hospital-ar',
         b:'معتمد من الفيفا واليويفا والاتحاد الدولي للتنس وغيرها. بلا ري أو قص أو صيانة بعد المباريات، مضمون خمس سنوات، ويُركّب بمعدات مستوردة من ألمانيا.'},
        {t:'السجاد المعقود يدويًا', img:'Assets/projects/juffali-head-office.jpg', href:'projects.html#solution-juffali-head-office-ar',
         b:'صوف نيوزيلندا النقي والحرير الفاخر، معقود يدويًا على أيدي حرفيين مهرة وقابل للتخصيص بالكامل في الشكل واللون والأبعاد.'}
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
