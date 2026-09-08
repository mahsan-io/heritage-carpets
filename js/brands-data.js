/* ======================================================================
   HERITAGE GROUP — BRAND SHOWCASE (About Us page)
   ----------------------------------------------------------------------
   One detailed profile per brand: Heritage, Divano, Platinum. Each brand's
   content keeps its own natural shape rather than being forced into an
   identical template — Divano is Mission/Story/Approach, Platinum has an
   intro, a compact Mission/Values/Distinction trio, and two longer closing
   passages, matching what was actually supplied for each brand.

   IMAGES — brand-prefixed filenames in Assets/brands/:
     logo:  Assets/brands/{PREFIX}_logo.png
     photo: Assets/brands/{PREFIX}_1.jpg  (optional {PREFIX}_2.jpg, _3.jpg
            for a small rotating carousel, same convention as elsewhere)
     PREFIX is H for Heritage, D for Divano, P for Platinum.
   Until a file exists, the logo falls back to the brand name as text and
   the photo falls back to the SVG motif — nothing breaks either way.
   ====================================================================== */
window.HeritageBrandShowcase = (function(){

  const order = ['heritage', 'platinum', 'divano'];

  const brands = {

    heritage: {
      prefix: 'H', motif: 'medallion',
      links: {
        products: 'collections.html',
        category: { href:'projects.html', en:'Our Projects', ar:'مشاريعنا' },
        locations: 'locations.html?brand=heritage'
      },
      en: {
        name: 'Heritage Carpets',
        tagline: 'Handmade and bespoke carpets since 1975 — the house the group began with.',
        sections: [
          { t:'Our Mission',
            b:'To bring the artistry of hand-knotted and hand-tufted carpet making to the homes, hotels and mosques of Saudi Arabia — sourcing the finest materials and never compromising on craftsmanship, provenance or comfort.' },
          { t:'Our Story',
            b:'Heritage opened its first showroom in Jeddah in 1975, importing hand-knotted carpets from Persia, Turkey and the wider Orient for a young and fast-growing Kingdom. As the country built, so did we — expanding from private residences into hotels, corporate headquarters, mosques and government projects, and building our own installation teams along the way. Fifty years on, Heritage remains the flagship of the group: the house where every commission still begins with a conversation about the space it will live in.' },
          { t:'Our Craft',
            b:"Every Heritage carpet is judged on what most catalogues leave out — knot density, wool and silk quality, and the hand of the weaver behind it. We work in the classical traditions of Isfahan, Tabriz and Anatolia alongside fully bespoke commissions, executed to a client's own dimensions, palette and pattern." }
        ]
      },
      ar: {
        name: 'التراث للسجاد',
        tagline: 'سجاد يدوي وحصري منذ 1975 — الدار التي بدأت منها المجموعة.',
        sections: [
          { t:'مهمتنا',
            b:'أن نُحضر فن السجاد المعقود والمعقود يدويًا إلى منازل وفنادق ومساجد المملكة العربية السعودية، منتقين أجود الخامات دون أي تنازل عن الحِرفية أو المنشأ أو الراحة.' },
          { t:'قصتنا',
            b:'افتتحت التراث صالة عرضها الأولى في جدة عام 1975، مستوردةً السجاد المعقود يدويًا من بلاد فارس وتركيا والشرق الأوسع لمملكة فتية سريعة النمو. ومع بناء الوطن نمونا معه — من المنازل الخاصة إلى الفنادق والمقار المؤسسية والمساجد والمشاريع الحكومية، مكوّنين فرق تركيب خاصة بنا على الطريق. وبعد خمسين عامًا، تبقى التراث الدار الرائدة للمجموعة، حيث يبدأ كل تكليف بحديث عن المساحة التي ستحتضنه.' },
          { t:'حِرفتنا',
            b:'تُقيَّم كل سجادة من التراث بما تُغفله معظم الكتالوجات — كثافة العقد، وجودة الصوف والحرير، ويد الحائك خلفها. نعمل ضمن التقاليد الكلاسيكية لأصفهان وتبريز والأناضول إلى جانب التصاميم الحصرية المنفذة وفق أبعاد العميل وألوانه ونقشه الخاص.' }
        ]
      }
    },

    divano: {
      prefix: 'D', motif: 'sofa',
      links: {
        products: 'https://www.divanoksa.com',
        category: { href:'furniture.html', en:'Explore Furniture', ar:'استكشف الأثاث' },
        locations: 'locations.html?brand=divano'
      },
      en: {
        name: 'Divano',
        tagline: 'Italian-inspired luxury furniture, est. 2010.',
        sections: [
          { t:'Our Mission',
            b:'At Divano, our mission is to provide you with the finest selection of luxurious furniture pieces that will transform your living space into a haven of comfort and elegance. As an ecommerce store specialising in high-quality furniture, we pride ourselves on offering high-quality furnishings and home accessories with Italian designs and limited editions, with customised services and a distinguished customer shopping experience.' },
          { t:'Our Story',
            b:"Our store was founded in 2010. Due to our commitment to the highest standards of craftsmanship and quality over the years, we have built a reputable reputation in Saudi Arabia. The Divano brand quickly became a trusted destination for those looking for high-quality furniture that will last for many years. We began to expand our product range and became one of the first brands to offer modern furniture with modern designs locally, in order to keep up with the latest developments and meet the ever-changing needs of our customers. Over the past few years, which have witnessed an incredible boom in Saudi Arabia, the Divano brand has continued to grow through the opening of many new stores and showrooms. Today, as one of the pioneers in the field, we continue to work and progress in accordance with Saudi Vision 2030, in order to contribute to the development of the furniture sector and preserve the rich heritage and unique identity that distinguishes our civilisation." },
          { t:'Our Approach',
            b:"At Divano, we understand the importance of creating a home that exudes elegance and style. That's why we have curated a selection of top-selling furniture items, including elegant sofas, stylish armchairs, stunning leather recliners, and modern sectional sofas. Our commitment to quality craftsmanship and attention to detail sets us apart, ensuring that every piece we offer is not only visually stunning but also built to last." }
        ]
      },
      ar: {
        name: 'ديفانو',
        tagline: 'أثاث فاخر بلمسة إيطالية، تأسست عام 2010.',
        sections: [
          { t:'مهمتنا',
            b:'في ديفانو، مهمتنا أن نقدم لك أرقى تشكيلة من قطع الأثاث الفاخرة التي تحوّل مساحة معيشتك إلى ملاذ من الراحة والأناقة. وبصفتنا متجرًا إلكترونيًا متخصصًا في الأثاث عالي الجودة، نفخر بتقديم مفروشات وإكسسوارات منزلية بتصاميم إيطالية وإصدارات محدودة، مع خدمات مخصصة وتجربة تسوق مميزة لعملائنا.' },
          { t:'قصتنا',
            b:'تأسس متجرنا عام 2010. وبفضل التزامنا بأعلى معايير الحِرفية والجودة على مر السنين، بنينا سمعة موثوقة في المملكة العربية السعودية. وسرعان ما أصبحت علامة ديفانو وجهة موثوقة لمن يبحثون عن أثاث عالي الجودة يدوم لسنوات طويلة. وبدأنا في توسيع تشكيلة منتجاتنا، لنصبح من أوائل العلامات التي تقدم أثاثًا عصريًا بتصاميم حديثة محليًا، لمواكبة أحدث التطورات وتلبية احتياجات عملائنا المتغيرة باستمرار. وعلى مدى السنوات الأخيرة التي شهدت ازدهارًا استثنائيًا في المملكة العربية السعودية، واصلت علامة ديفانو نموها من خلال افتتاح العديد من المتاجر وصالات العرض الجديدة. واليوم، وبصفتنا من رواد هذا المجال، نواصل العمل والتطور بما يتماشى مع رؤية السعودية 2030، إسهامًا منا في تطوير قطاع الأثاث والحفاظ على الإرث الغني والهوية الفريدة التي تميز حضارتنا.' },
          { t:'منهجنا',
            b:'في ديفانو، ندرك أهمية خلق منزل يفيض بالأناقة والرقي. لذا انتقينا تشكيلة من أكثر قطع الأثاث مبيعًا، تشمل الأرائك الأنيقة، والكراسي بذراعين العصرية، والكراسي الجلدية القابلة للاستلقاء الرائعة، والأرائك القطاعية الحديثة. والتزامنا بالحِرفية العالية والاهتمام بالتفاصيل هو ما يميزنا، ليضمن أن كل قطعة نقدمها ليست فقط أخّاذة بصريًا بل مصنوعة لتدوم.' }
        ]
      }
    },

    platinum: {
      prefix: 'P', motif: 'tile',
      links: {
        products: 'collections.html?category=machine-made',
        category: { href:'flooring.html', en:'Flooring Solutions', ar:'حلول الأرضيات' },
        locations: 'locations.html?brand=platinum'
      },
      en: {
        name: 'Platinum Carpets',
        tagline: 'Where Heritage Meets Modernity — 40 years of craftsmanship since 1985.',
        intro: 'At Platinum, we believe that a carpet is not just a piece of furniture, but a masterpiece that reflects a rich heritage and craftsmanship passed down through generations. Our history in the field of carpets extends over 40 years, during which we have been committed to providing high-quality carpets that combine contemporary design with traditional authenticity. We are proud to present Platinum carpets, which embody our commitment to quality and elegant design.',
        features: [
          { t:'Our Mission', b:'To add a touch of luxury and comfort to every home by offering carpets made of the finest materials.' },
          { t:'Our Values', b:'Quality, craftsmanship, creativity, and complete customer satisfaction.' },
          { t:'Our Distinction', b:'Unique designs and high-quality materials — carpets made of the finest materials, with designs found nowhere else.' }
        ],
        sections: [
          { t:'We Weave Stories Since 1985',
            b:'Our story began in 1985, where we sought to provide the finest types of carpets. Today, after 40 years, we are still continuing this rich heritage. We are one family, working together with love and dedication to provide Platinum carpets that combine modernity and heritage. Each carpet is a story that tells of our love for craftsmanship and our attention to the finest details. Platinum carpets are a story told generation after generation — each one carrying within it a history and an inherited craftsmanship, adding a touch of authenticity and sophistication to your home. Each knot is woven with craftsmanship that carries within it a touch of creativity and heritage. We believe that a carpet is more than just a product — it is an investment in comfort and beauty that lasts a lifetime.' },
          { t:'Towards a More Elegant Future',
            b:'At Platinum, we see carpets as more than just a piece of furniture — they are an expression of your lifestyle. We believe that home is your sanctuary, and we want to help you create it in the most beautiful way. Platinum carpets are the embodiment of our vision for the future, combining traditional craftsmanship with contemporary design to deliver products that meet your needs and exceed your expectations. Choose from a wide range of designs inspired by nature and heritage.' }
        ]
      },
      ar: {
        name: 'بلاتينيوم للسجاد',
        tagline: 'حيث يلتقي التراث بالحداثة — 40 عامًا من الحِرفية منذ 1985.',
        intro: 'في بلاتينيوم، نؤمن أن السجادة ليست مجرد قطعة أثاث، بل تحفة فنية تعكس إرثًا غنيًا وحِرفية توارثتها الأجيال. يمتد تاريخنا في مجال السجاد لأكثر من 40 عامًا، التزمنا خلالها بتقديم سجاد عالي الجودة يجمع بين التصميم المعاصر والأصالة التقليدية. ويسعدنا أن نقدم سجاد بلاتينيوم، الذي يجسد التزامنا بالجودة والتصميم الأنيق.',
        features: [
          { t:'مهمتنا', b:'إضافة لمسة من الفخامة والراحة إلى كل منزل من خلال تقديم سجاد مصنوع من أجود الخامات.' },
          { t:'قيمنا', b:'الجودة، والحِرفية، والإبداع، ورضا العملاء الكامل.' },
          { t:'تميزنا', b:'تصاميم فريدة وخامات عالية الجودة — سجاد مصنوع من أجود الخامات، بتصاميم لا مثيل لها.' }
        ],
        sections: [
          { t:'ننسج الحكايات منذ عام 1985',
            b:'بدأت قصتنا عام 1985، حين سعينا لتقديم أرقى أنواع السجاد. واليوم، وبعد 40 عامًا، ما زلنا نواصل هذا الإرث الغني. نحن عائلة واحدة، نعمل معًا بحب وتفانٍ لنقدم سجاد بلاتينيوم الذي يجمع بين الحداثة والتراث. كل سجادة حكاية تروي عشقنا للحِرفية واهتمامنا بأدق التفاصيل. سجاد بلاتينيوم حكاية تُروى جيلًا بعد جيل، وكل سجادة تحمل في طياتها تاريخًا وحِرفية موروثة، لتضيف لمسة من الأصالة والرقي إلى منزلك. كل عقدة تُنسج بحِرفية تحمل بين طياتها لمسة من الإبداع والتراث. نؤمن أن السجاد أكثر من مجرد منتج، إنه استثمار في الراحة والجمال يدوم مدى الحياة.' },
          { t:'نحو مستقبل أكثر أناقة',
            b:'في بلاتينيوم، ننظر إلى السجاد كأكثر من مجرد قطعة أثاث، إنه تعبير عن أسلوب حياتك. نؤمن أن المنزل هو ملاذك، ونريد أن نساعدك على تصميمه بأجمل طريقة ممكنة. سجاد بلاتينيوم هو تجسيد لرؤيتنا للمستقبل، يجمع بين الحِرفية التقليدية والتصميم المعاصر ليقدم منتجات تلبي احتياجاتك وتفوق توقعاتك. اختر من بين مجموعة واسعة من التصاميم المستوحاة من الطبيعة والتراث.' }
        ]
      }
    }
  };

   const video = {
    // Plays each clip in order, advancing when one finishes, looping back to
    // the first once the list is exhausted. Add or remove entries freely —
    // one entry alone just loops continuously, same as a single-video header.
    videos: [
      { src: 'Assets/HERITAGE.mp4', poster: 'Assets/hcc.png' },
      { src: 'Assets/divano.mp4',   poster: 'Assets/divano.png' },
      { src: 'Assets/divano-1.mp4', poster: 'Assets/divano.png' }
    ],
    embed: ''
  };

  const i18n = {
    en: {
      kicker:'Our Brands', title:'Three Brands, One Standard',
      lead:'Heritage, Platinum and Divano — each with its own identity, its own showrooms, and its own story. Select a brand to read it in full.',
      viewProducts:'View Products', findShowroom:'Find a Showroom'
    },
    ar: {
      kicker:'علاماتنا التجارية', title:'ثلاث علامات، معيار واحد',
      lead:'التراث وبلاتينيوم وديفانو — لكل منها هويتها وصالاتها وقصتها الخاصة. اختر علامة لقراءة قصتها كاملة.',
      viewProducts:'عرض المنتجات', findShowroom:'اعثر على صالة عرض'
    }
  };

  return { order: order, brands: brands, i18n: i18n, video: video };
})();
