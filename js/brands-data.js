/* ======================================================================
   HERITAGE GROUP — OUR BRANDS PAGE (brands.html)
   ----------------------------------------------------------------------
   Six entities in one row of tabs:
     - heritage-group, heritage-carpets, platinum  -> "detail" tabs: clicking
       shows that entity's own content in the panel below, same page.
     - divano, divano-elite, carpet-land            -> "link" tabs: clicking
       shows a lighter preview (tagline, intro, optional highlight tags) with
       a single "Visit the Brand Page" button, since each already has a full
       dedicated page and duplicating that content here would just be two
       copies to keep in sync.

   IMAGES — one folder per brand:
     Assets/brands/heritage/     logo.png, 1.jpg, 2.jpg   (shared by the
                                  Heritage Group overview AND Heritage Carpets)
     Assets/brands/platinum/     logo.png, 1.jpg, 2.jpg, 3.jpg
     Assets/brands/divano/       D_logo.png, D_0.jpg .. D_3.jpg  (unchanged —
                                  already uploaded and in use by furniture.html)
     Assets/brands/carpet_land/  logo.png, 1.jpg, 2.jpg, 3.jpg
   Divano Elite has no folder of its own (it's a compact link card, not a full
   detail panel) — it shows the arch motif instead of a photo.
   Until a file exists, the same graceful fallbacks as everywhere else apply:
   missing logo -> brand name as text, missing photo -> the SVG motif.
   ====================================================================== */
window.HeritageBrandShowcase = (function(){

  const order = ['heritage-group', 'heritage-carpets', 'platinum', 'divano', 'divano-elite', 'carpet-land'];

  const brands = {

    /* ---------------- 1. Heritage Group — parent company overview ---------------- */
    'heritage-group': {
      kind:'detail', motif:'medallion', folder:'Assets/brands/heritage/', logo:'logo.png', photos:['1.jpg'],
      actions:[ {key:'locations', href:'locations.html'} ],
      en: {
        name:'Heritage Group',
        tagline:'One family of brands, five ways to furnish your world — since 1976.',
        features:[
          {t:'Our Mission', b:'To offer high-quality furnishing solutions that enhance spaces and evoke a sense of timeless elegance, and to provide customers with an exceptional buying experience that combines unique selections and innovative solutions.'},
          {t:'Our Vision', b:"To grow, adapt, and thrive by forging partnerships with contractors and the real estate sector, in alignment with Vision 2030, to expand our reach and contribute to the Kingdom of Saudi Arabia's growth."},
          {t:'Our Values', b:'Driven by Quality and Craftsmanship, we operate with absolute Integrity. Through Innovation and Sustainability, we maintain an unwavering Commitment to excellence in every project and partnership.'}
        ],
        sections:[
          {t:'Our Story', b:'Beginning as a humble family business, we started weaving beautiful handmade Persian carpets in 1976, with a commitment to preserve centuries-old traditions.'},
          {t:'Evolving with the Industry', b:'It was during this time that we started to transition into contemporary furnishing, becoming one of the pioneering brands to introduce modern and transitional designs in order to stay in tune with the changing preferences of our customers.'},
          {t:'Building a Legacy', b:'Throughout years of exceptional craftsmanship, we established a strong presence across Saudi Arabia, allowing us to expand our operations to Canada and the UAE in the mid-90s, followed by Morocco in the early 2000s.'},
          {t:'Local Expansion', b:"During the past decade of our nation's remarkable transformation, the Heritage brand continued to thrive, as demonstrated by the launch of a dozen new stores and locations."},
          {t:'Bright Future', b:"Today, as one of the leaders in the market, we align with Saudi Arabia's Vision 2030, contributing to the growth and development of the furniture, carpet, and flooring solutions industries, while preserving our rich heritage and cultural identity."}
        ]
      },
      ar: {
        name:'مجموعة التراث',
        tagline:'عائلة واحدة من العلامات، خمس طرق لتأثيث عالمك — منذ 1976.',
        features:[
          {t:'مهمتنا', b:'تقديم حلول تأثيث عالية الجودة تعزز جمال المساحات وتبعث إحساسًا بالأناقة الخالدة، وتوفير تجربة شراء استثنائية لعملائنا تجمع بين التشكيلات الفريدة والحلول المبتكرة.'},
          {t:'رؤيتنا', b:'النمو والتكيف والازدهار من خلال بناء شراكات مع المقاولين والقطاع العقاري، بما يتماشى مع رؤية 2030، لتوسيع نطاقنا والمساهمة في نمو المملكة العربية السعودية.'},
          {t:'قيمنا', b:'مدفوعون بالجودة والحِرفية، نعمل بنزاهة مطلقة. ومن خلال الابتكار والاستدامة، نحافظ على التزام راسخ بالتميز في كل مشروع وشراكة.'}
        ],
        sections:[
          {t:'قصتنا', b:'بدأنا كعمل عائلي متواضع، حين شرعنا في نسج سجاد فارسي يدوي جميل عام 1976، بالتزام بالحفاظ على تقاليد عمرها قرون.'},
          {t:'التطور مع الصناعة', b:'خلال تلك الفترة بدأنا التحول نحو التأثيث المعاصر، لنصبح من العلامات الرائدة في تقديم تصاميم حديثة وانتقالية تواكب تفضيلات عملائنا المتغيرة.'},
          {t:'بناء إرث', b:'على مدى سنوات من الحِرفية الاستثنائية، رسخنا حضورًا قويًا في أنحاء المملكة العربية السعودية، ما مكّننا من التوسع إلى كندا والإمارات في منتصف التسعينيات، ثم المغرب في أوائل الألفية الجديدة.'},
          {t:'التوسع المحلي', b:'خلال العقد الأخير من التحول اللافت الذي شهدته مملكتنا، واصلت علامة التراث ازدهارها، كما يتجلى في افتتاح عشرات المتاجر والمواقع الجديدة.'},
          {t:'مستقبل واعد', b:'واليوم، وبصفتنا أحد رواد السوق، نتماشى مع رؤية المملكة العربية السعودية 2030، مساهمين في نمو وتطوير صناعات الأثاث والسجاد وحلول الأرضيات، مع الحفاظ على إرثنا الغني وهويتنا الثقافية.'}
        ]
      }
    },

    /* ---------------- 2. Heritage Carpets ---------------- */
    'heritage-carpets': {
      kind:'detail', motif:'medallion', folder:'Assets/brands/heritage/', logo:'logo.png', photos:['2.jpg'],
      actions:[
        {key:'products', href:'collections.html'},
        {key:'projects', href:'projects.html'},
        {key:'locations', href:'locations.html?brand=heritage'}
      ],
      en: { name:'Heritage Carpets',
        tagline:'European and Central-Asian carpets, rugs, mats and moquette.',
        intro:'Specialising in top-notch European and Central-Asian carpets, rugs, mats, and moquette, Heritage Carpets offers an extensive range of handmade, hand-tufted and machine-made rugs, with limitless customisation choices for retail and wholesale customers in terms of size, material, and source.',
        sections:[] },
      ar: { name:'التراث للسجاد',
        tagline:'سجاد أوروبي وآسيوي وسطي، ومفروشات وموكيت.',
        intro:'تتخصص التراث للسجاد في أرقى أنواع السجاد الأوروبي وسجاد آسيا الوسطى والمفروشات والموكيت، وتقدم تشكيلة واسعة من السجاد اليدوي والمعقود يدويًا والآلي، مع خيارات تخصيص غير محدودة لعملاء التجزئة والجملة من حيث المقاس والخامة والمصدر.',
        sections:[] }
    },

    /* ---------------- 3. Platinum Carpets ---------------- */
    platinum: {
      kind:'detail', motif:'tile', folder:'Assets/brands/platinum/', logo:'logo.png', photos:['1.jpg','2.jpg','3.jpg'],
      actions:[
        {key:'products', href:'collections.html?category=machine-made'},
        {key:'locations', href:'locations.html?brand=platinum'}
      ],
      en: { name:'Platinum Carpets',
        tagline:'Stylish, practical and affordable — for every retail need.',
        intro:'Platinum caters to the various needs of retail customers with a diverse and distinctive range of home furniture solutions that are stylish, practical, and affordable.',
        sections:[] },
      ar: { name:'بلاتينيوم للسجاد',
        tagline:'أنيقة وعملية وبأسعار مناسبة — لكل احتياجات التجزئة.',
        intro:'تلبي بلاتينيوم احتياجات عملاء التجزئة المتنوعة من خلال تشكيلة متميزة ومتنوعة من حلول الأثاث المنزلي الأنيقة والعملية وبأسعار مناسبة.',
        sections:[] }
    },

    /* ---------------- 4. Divano (link card -> furniture.html) ---------------- */
    divano: {
      kind:'link', target:'furniture.html', motif:'sofa', folder:'Assets/brands/divano/', logo:'D_logo.png', photos:['D_1.jpg'],
      en: { name:'Divano', tagline:'Contemporary home-furnishing, engineered for value.',
        intro:'The ideal choice for residential, commercial, and hospitality clients seeking contemporary home-furnishing solutions; every Divano product achieves the concept of "value for money" by offering the perfect balance between high quality and affordability.' },
      ar: { name:'ديفانو', tagline:'تأثيث منزلي معاصر، مصمم ليمنحك أفضل قيمة.',
        intro:'الخيار الأمثل لعملاء القطاع السكني والتجاري وقطاع الضيافة الباحثين عن حلول تأثيث منزلي معاصرة؛ يحقق كل منتج من ديفانو مفهوم "القيمة مقابل السعر" من خلال التوازن المثالي بين الجودة العالية والسعر المناسب.' }
    },

    /* ---------------- 5. Divano Elite (link card -> furniture.html) ---------------- */
    'divano-elite': {
      kind:'link', target:'furniture.html', motif:'frame',
      en: { name:'Divano Elite', tagline:'Italian-inspired, limited edition, unmistakably yours.',
        intro:'For those who love to stand out, Divano Elite presents exclusive, high-quality Italian-inspired home furniture and accessories available in limited editions, with more personalised services and a distinguished overall experience for customers.',
        highlights:['Interior Design Solutions','Bespoke Orders'] },
      ar: { name:'ديفانو إيليت', tagline:'بلمسة إيطالية، بإصدارات محدودة، تحمل توقيعك الخاص.',
        intro:'لمن يعشقون التميز، تقدم ديفانو إيليت أثاثًا وإكسسوارات منزلية حصرية عالية الجودة بلمسة إيطالية، متوفرة بإصدارات محدودة، مع خدمات أكثر تخصيصًا وتجربة استثنائية شاملة لعملائنا.',
        highlights:['حلول التصميم الداخلي','طلبات حسب الطلب'] }
    },

    /* ---------------- 6. Carpet Land (link card -> flooring.html) ---------------- */
    'carpet-land': {
      kind:'link', target:'flooring.html', motif:'floorplan', folder:'Assets/brands/carpet_land/', logo:'logo.png', photos:['1.jpg'],
      en: { name:'Carpet Land', tagline:'Wholesale flooring, for every facility.',
        // note: the source text read "BÓB market" — read here as "B2B market"
        // (business-to-business); flagged for confirmation.
        intro:'Carpet Land is a division dedicated to serving the wholesale market alongside the B2B market, supplying specialised flooring products that meet the requirements of various facilities such as mosques (Masjed), hotels, retail centres, private residences, sports arenas, and other commercial applications.' },
      ar: { name:'كاربت لاند', tagline:'أرضيات بالجملة، لكل منشأة.',
        intro:'كاربت لاند قسم مخصص لخدمة سوق الجملة إلى جانب قطاع الأعمال (B2B)، موردًا منتجات أرضيات متخصصة تلبي متطلبات منشآت متنوعة مثل المساجد وقاعات الصلاة والفنادق والمراكز التجارية والمساكن الخاصة والصالات الرياضية وغيرها من التطبيقات التجارية.' }
    }
  };

  const video = {
    videos: [
      { src: 'Assets/HERITAGE.mp4', poster: 'Assets/hcc.png' },
      { src: 'Assets/divano.mp4',   poster: 'Assets/divano.png' },
      { src: 'Assets/divano-1.mp4', poster: 'Assets/divano.png' }
    ],
    embed: ''
  };

  const i18n = {
    en: {
      kicker:'Our Brands', title:'Six Brands, One Standard',
      lead:'From handmade heritage carpets to contemporary furniture and wholesale flooring — explore each brand below.',
      products:'View Products', projects:'Our Projects', locations:'Find a Showroom',
      visitPage:'Visit the Brand Page'
    },
    ar: {
      kicker:'علاماتنا التجارية', title:'ست علامات، معيار واحد',
      lead:'من سجاد التراث اليدوي إلى الأثاث المعاصر وأرضيات الجملة — تصفح كل علامة أدناه.',
      products:'عرض المنتجات', projects:'مشاريعنا', locations:'اعثر على صالة عرض',
      visitPage:'زيارة صفحة العلامة'
    }
  };

  return { order: order, brands: brands, i18n: i18n, video: video };
})();
