/* ======================================================================
   HERITAGE — PROJECTS PAGE CONTENT
   ----------------------------------------------------------------------
   Everything the Projects page renders lives here, in both languages, so
   the page markup stays lean and the English/Arabic copy sits side by side
   and can't drift apart.

   Each solution block = one named reference project + one product type,
   with three collapsible panels (Usage / Characteristics / Availability).

   IMAGES: each solution's `slug` drives its photo path, following the same
   convention as the rest of the site:
        Assets/projects/{slug}.jpg          (plus -2.jpg, -3.jpg for a carousel)
   Until those files exist the arch motif shows in their place, so nothing
   looks broken while photography is being prepared.

   VIDEO: set `video.src` to an MP4 in Assets/ (recommended: also set
   video.poster). Leave it empty to fall back to the poster image alone, or
   set video.embed to a YouTube/Vimeo URL to use an iframe instead.
   ====================================================================== */
window.HeritageProjects = (function(){

  const video = {
    // e.g. 'Assets/projects/showcase.mp4'  — leave '' until the file is supplied
    src: 'Assets/projects/HERITAGE-PROJECT.mp4',
    poster: 'Assets/projects/project-poster.jpg',
    embed: ''   // e.g. 'https://www.youtube.com/embed/XXXXXXXX' — takes priority if set
  };

  /* ---------------- English ---------------- */
  const en = {
    hero: {
      kicker: 'Projects',
      title: 'Furnishing Landmark Spaces',
      lead: 'Hotels, mosques, hospitals, schools and corporate headquarters across the Kingdom — supplied, tailored and installed by Heritage.'
    },
    commercialHead: {
      kicker: 'Commercial Solutions',
      title: 'Flooring for Landmark Spaces',
      lead: 'Carpet tiles, broadloom, and bespoke commissions for hospitality, government, and corporate projects across the Kingdom.'
    },
    commercial: [
      {icon:'hotels', t:'Hotels', d:'Lobby-to-suite carpet programs built for daily luxury foot traffic.'},
      {icon:'offices', t:'Offices', d:'Broadloom and carpet tile systems for corporate headquarters.'},
      {icon:'mosques', t:'Mosques', d:'Custom-dimension prayer hall carpets, woven to precise architectural specification.'},
      {icon:'retail', t:'Retail Spaces', d:'Durable, brand-considered flooring for luxury retail environments.'},
      {icon:'corporate', t:'Corporate Projects', d:'Large-scale flooring programs for headquarters and government developments.'}
    ],
    introHead: {
      kicker: 'What We Deliver',
      title: 'Bespoke Project Furnishing & Flooring Solutions',
      lead: "Interior solutions that shape your project's identity. We specialize in high-end furniture, premium carpets, and complete flooring solutions for hospitality, corporate, and residential sectors, offering limitless customization and exceptional quality tailored precisely to your project's concept."
    },
    panelLabels: {usage:'Usage', characteristics:'Characteristics', availability:'Availability'},
    solutions: [
      {
        slug:'le-park-concord-hotel', project:'Le Park Concord Hotel', title:'Carpet', motif:'medallion',
        body:'Heritage offers the best of what carpet manufacturers produce, with some varieties carrying a one year warranty. Carpet remains the most popular floor covering choice for a variety of reasons. Carpet has been the choice of many architects, interior designers and home owners and hence became one of the most fundamental parts of modern interiors.',
        usage:['Hotels and restaurants.','Ballrooms.','Palaces, villas and apartments.','Offices.','Airports first class and VIP lounges.'],
        characteristics:['Carpet offers more fashion options in colors and textures than any other floor covering option on the market.','Contemporary carpet is manufactured according to the highest standards.','Carpet comes in a wide variety of colors, tones and hues.','Carpet can hide many sub-floor irregularities that would not be permitted with hard-surface floors.','Carpet is generally easier and more economical to install and replace than most floor coverings.'],
        availability:['Heritage offers a wide variety of carpet materials with endless color and design combinations. Our collection includes premium nylon construction, wool, and mixed qualities, as well as specialized Axminster, Hand-tufted, and Printed (nylon) varieties. Our focus is on individuality and uniqueness, maintaining breathtaking designs coupled with precision manufacturing.']
      },
      {
        slug:'makkah-chamber', project:'Makkah Chamber', title:'Carpet Tiles', motif:'tile',
        body:'Carpet tiles prove to be a superior choice to carpet rolls in nearly every way. From the fiber selection and yarn construction to backing system and proprietary finish treatments, carpet tiles procured through Heritage are engineered to perform in the most demanding traffic conditions. The modular carpet features integrated cushion that protects the carpet against the effects of wear even in the most rigorous circumstances, maximizing wearability and appearance retention.',
        usage:['Carpet tiles are mostly sold to the office segment of the contract market, with the possibility to create personalized qualities and colors.'],
        characteristics:['Ease of Access: easy access to floor mounted computer and electrical outlets eliminates the need to disturb the entire carpeted surface area. Conventional roll carpeting does not allow this flexibility.','Ease of Installation: carpet tiles may be adhered to most sub flooring surfaces by using tile pressure sensitive adhesive, spot gluing or by using the double-sided carpet tape method.','Ease of Replacement: damaged or soiled carpet tiles may be easily removed by simply replacing the affected tiles with fresh ones.','Design Flexibility: the possibilities are endless. Use your imagination to create your own unique designs. Choose from the latest designer created patterns and colors available in our carpet tile selections.','Easy to Maintain: maintenance is simple and quick. Vacuuming regularly, blot spotting and quickly cleaning spills is all that is required, without the need for special cleaners or chemical treatments.'],
        availability:['Available in either 50cm x 50cm or larger 60cm x 60cm. Heritage offers an extensive selection of carpet tiles, with varying colors and patterns, all perfectly suited for whatever the demand may be. Our clients will discover the beautiful yet practical styles, the elegant and easy care types — the entire spectrum of carpet choices available. Choosing the ideal carpet style is all about finding the right combination of aesthetics, performance and budget to meet the needs of your work environment.']
      },
      {
        slug:'king-abdullah-sport-city-mosque', project:'King Abdullah Sport City Mosque', title:'Masjed Carpets', motif:'arch',
        body:'Recognized for centuries for their warmth, spiritual serenity, and intricate designs, custom-designed rugs and carpets can make a unique, soulful foundation around which a sacred space can be coordinated. The right choice of color, pattern, and texture can transform a prayer hall, enhancing both its aesthetic majesty and the comfort of the worshippers. Our collections exclusively offer a wide variety of dedicated carpets for mosques, delivering exceptional beauty alongside long-term durability.',
        usage:[],
        characteristics:['Valued Heirloom Quality: engineered to be considered a deeply valued heirloom piece within the community, holding its significance for generations.','Enduring Appearance: built to withstand heavy, continuous foot traffic while preserving its attractive appearance, structural thickness, and vibrant colors for a very long time.','Complete Customization: carpets can be perfectly executed with any specialized design (including traditional Islamic motifs, mihrab alignments, and rows), in customized color spectrums and exact room dimensions.'],
        availability:['The spectrum of styles available is truly wide, worldly, and wonderful, allowing for the perfect blend of traditional reverence and modern execution.','Styles: ranging from classic Turkish, authentic Oriental, and deeply traditional Islamic patterns to more transitional, geometric, and contemporary versions.','Patterns proliferate: from detailed floral borders and custom alignment stripes (Saf rows) to solid backgrounds and majestic center medallions, providing virtually endless choices and unlimited possibilities to craft the perfect spiritual ambiance.']
      },
      {
        slug:'private-villa-jeddah', project:'Private Villa, Jeddah', title:'Furniture', motif:'sofa',
        body:'We believe that furniture is not just about filling a space; it is a true reflection of a refined lifestyle and the ultimate embodiment of elegance and comfort. We specialize in providing exceptional collections of luxury furniture that seamlessly blend innovative modern designs with high-end craftsmanship, perfectly meeting your aspirations for furnishing premium villas, residential estates, and prestigious commercial projects. Every piece in our collection is crafted using the finest luxury fabrics, high-density foam for long-lasting ergonomic support, and robust, meticulously engineered frames — giving your spaces a captivating aesthetic touch and the perfect balance of prestige and practical performance.',
        usage:['Tailored for premium residential and commercial projects, including luxury villas, palaces, high-end salons, sophisticated living areas, hospitality settings, and executive spaces seeking a distinctive character.'],
        characteristics:['Craftsmanship: meticulously engineered with professional attention to detail, ensuring premium and flawless finishing.','Materials: robust solid wood frames, padded with high-density foam for ultimate ergonomic comfort, and upholstered in the finest woven fabrics and premium leathers.','Design: contemporary masterpieces blending modern concepts with prestigious timeless elegance, offering flexible arrangements to fit various layouts.','Features: exceptional comfort, high durability for long-lasting performance, and a luxurious aesthetic that elevates any interior.'],
        availability:['We offer comprehensive furnishing solutions with a vast selection of premium fabrics and luxury color palettes, precisely curated to match your architectural blueprints and design concepts. For consultations and orders, please contact our team or visit our showrooms.']
      },
      {
        slug:'king-faisal-specialist-hospital', project:'King Faisal Specialist Hospital', title:'Artificial Grass', motif:'lattice',
        body:'In addition to improving lifestyle, artificial grass provides an aesthetic and healthy environment through the provision of sustained, low-cost materials and human efforts. Heritage has expert staff for the installation of artificial grass using the latest equipment available anywhere in the world.',
        usage:['Football fields.','Tennis courts.','Golf clubs.','Hockey arenas.','Basketball courts.','Garden lawns.',"Children's playgrounds.",'Public parks.','Home gardens.'],
        characteristics:['Closely resembles real grass, and is durable and long lasting.','Approved by FIFA, UEFA, ITF and other international sports organizations.','Does not need irrigation, mowing or maintenance after each match.','Custom fit: lining and layout planning is part of the manufacturing process.','Guaranteed for five years.'],
        availability:['Heritage provides different sizes and colors of turf, suitable for the activity required. Different materials are provided for outdoor usage as well as specialized turf for indoor playgrounds. All types have been tested, approved and installed by experienced and trained staff with equipment imported from Germany.']
      },
      {
        slug:'alfalah-schools-jeddah', project:'Alfalah Schools, Jeddah', title:'Vinyl', motif:'floorplan',
        body:'Vinyl floor is the ideal surface for projects where durability, ease of maintenance, anti-microbial, anti-static, anti-slip and noise-damping properties are key requirements. The special demands of applications requiring vinyl emphasize the importance of technical performance beside the aesthetical questions. The primary advantages of vinyl are that it is relatively inexpensive and comes in almost infinite varieties of colors and patterns. Maintenance involves little more than sweeping and damp mopping. Sheet vinyl is used extensively in rooms where excess moisture is present. When sealed, it is completely impervious to water.',
        usage:['All of our materials have been tested, their specifications approved and their quality supported by installations in many countries. Heritage offers floor coverings designed for use in such facilities as hospitals, health-care centers, administration and office buildings, schools, nurseries, as well as commercial and industrial facilities.'],
        characteristics:['Vinyl floor covering is hall-marked with extreme durability, high wear and slip resistance.','Easy and cost-effective maintenance: no need for periodical maintenance, no time-losing and additional costs during the whole life time of the floor.','Dimensional stability: due to the glass fiber reinforcement there are no gaps occurring.','Solvent free: every product is produced without using any solvents in order to protect the environment.','Permits frequent cleaning: without the need to use harsh chemicals.','Noise dampening characteristics: acoustical properties with the ability of reducing noise to 19 dB, which is proven to have more advantages in certain places.'],
        availability:['Commercial vinyl flooring is available in heterogeneous and homogenous varieties.']
      },
      {
        slug:'juffali-head-office', project:'Juffali, Head Office', title:'Hand Tufted Rug', motif:'boteh',
        body:'At Heritage Carpet Company, our hand-tufted rugs represent the pinnacle of bespoke luxury and artisanal craftsmanship. Meticulously crafted by skilled artisans, each piece combines premium-grade materials with striking, customizable designs to transform any corporate or residential space. Beyond their captivating aesthetic appeal, these high-end rugs offer luxurious underfoot comfort and long-lasting durability engineered for high-traffic environments. Whether you require a bold statement piece for an executive boardroom or a refined accent for a luxury interior, our hand-tufted collections deliver the perfect balance of technical performance and artistic elegance.',
        usage:['Ideal for luxury commercial and high-end residential spaces, including executive offices, boardrooms, luxury hotels, main salons, and premium living areas.'],
        characteristics:['Craftsmanship: premium hand-tufted technique by skilled artisans.','Materials: a luxurious blend of premium pure New Zealand wool and fine silk, ensuring vibrant color clarity and a stunning natural sheen.','Design: fully customizable in terms of shapes, colors, and dimensions to perfectly match your project layout.','Features: luxurious silky underfoot comfort, exceptional durability and resilience thanks to the premium New Zealand wool, and a prestigious aesthetic that lasts.'],
        availability:['Available upon request (custom-made to order).','We provide premium pure New Zealand wool and fine silk, specializing in executing and tailoring carpets based on your chosen designs, dimensions, and luxurious colors to precisely complement your project layouts. For custom inquiries, please contact our team.']
      }
    ],
    galleryHead: {kicker:'Featured Projects', title:'Delivered Across the Kingdom', lead:'A selection of completed installations.'},
    processHead: {kicker:'How We Work', title:'End-to-End Project Solutions', lead:'One accountable partner from first specification to final handover — no gaps between supply, fabrication and installation.'},
    process: [
      {n:'01', t:'Consultation & Site Survey', d:'We visit the site, take measurements, and review drawings and specifications with your design team.'},
      {n:'02', t:'Design & Specification', d:'Material proposals, colourways and custom design development, presented with samples for approval.'},
      {n:'03', t:'Sampling & Approval', d:'Physical samples and strike-offs signed off before anything enters production.'},
      {n:'04', t:'Manufacturing', d:'Production to the approved specification, with quality control at each stage.'},
      {n:'05', t:'Delivery & Logistics', d:'Scheduled delivery coordinated with your programme, including phased handovers.'},
      {n:'06', t:'Installation & Handover', d:'Fitted by our own trained installation teams, then inspected and handed over with aftercare guidance.'}
    ],
    formHead: {
      kicker:'Start a Project',
      title:"Let's Build Your Project Together",
      lead:'Whether it is a hotel, corporate office, or luxury residential space, we bring your vision to life with tailored furniture and carpeting solutions. Fill out the form below, and our project specialists will get in touch with you within 48 hours.'
    },
    form: {
      name:'Full Name', company:'Company / Organisation', email:'Email', phone:'Phone',
      type:'Project Type', location:'Project Location', size:'Approximate Area (m²)',
      timeline:'Expected Timeline', details:'Tell us about your project',
      detailsPlaceholder:'Scope, spaces involved, materials you have in mind, programme dates…',
      types:['Hotel / Hospitality','Mosque','Corporate Office','Healthcare','Education','Residential / Villa','Retail','Other'],
      timelines:['Immediate','1–3 months','3–6 months','6+ months','Planning stage'],
      submitWa:'Send via WhatsApp', submitEmail:'Send via Email',
      required:'Name and either an email or phone number are required.',
      note:'This opens a pre-filled message to our project team — review it and send. A specialist replies within 48 hours.',
      subject:'Project Enquiry — Heritage Carpet Company',
      intro:'Hello Heritage, I would like to discuss a project:'
    }
  };

  /* ---------------- Arabic ---------------- */
  const ar = {
    hero: {
      kicker:'المشاريع',
      title:'تجهيز المساحات المميزة',
      lead:'فنادق ومساجد ومستشفيات ومدارس ومقار مؤسسية في أنحاء المملكة — توريد وتفصيل وتركيب من التراث.'
    },
    commercialHead: {
      kicker:'الحلول التجارية',
      title:'أرضيات للمساحات المميزة',
      lead:'بلاط سجاد، وسجاد عريض، وتصاميم حصرية لمشاريع الضيافة والقطاع الحكومي والشركات في أنحاء المملكة.'
    },
    commercial: [
      {icon:'hotels', t:'الفنادق', d:'برامج سجاد تمتد من البهو إلى الأجنحة، مصممة لتحمل حركة يومية فاخرة.'},
      {icon:'offices', t:'المكاتب', d:'أنظمة سجاد عريض وبلاط سجاد لمقار الشركات.'},
      {icon:'mosques', t:'المساجد', d:'سجاد لقاعات الصلاة بأبعاد مخصصة، منسوج وفق مواصفات معمارية دقيقة.'},
      {icon:'retail', t:'المساحات التجارية', d:'أرضيات متينة تراعي هوية العلامة التجارية لبيئات البيع الفاخرة.'},
      {icon:'corporate', t:'المشاريع المؤسسية', d:'برامج أرضيات واسعة النطاق للمقار والمشاريع الحكومية.'}
    ],
    introHead: {
      kicker:'ما نقدمه',
      title:'حلول تجهيز وأرضيات حصرية للمشاريع',
      lead:'حلول داخلية تصنع هوية مشروعك. نتخصص في الأثاث الفاخر والسجاد المتميز وحلول الأرضيات المتكاملة لقطاعات الضيافة والشركات والقطاع السكني، مع إمكانات تخصيص لا حدود لها وجودة استثنائية مصممة بدقة لتناسب مفهوم مشروعك.'
    },
    panelLabels: {usage:'الاستخدامات', characteristics:'الخصائص', availability:'التوفر'},
    solutions: [
      {
        slug:'le-park-concord-hotel', project:'فندق لو بارك كونكورد', title:'السجاد', motif:'medallion',
        body:'تقدم التراث أفضل ما تنتجه مصانع السجاد، مع أنواع يشملها ضمان لمدة عام. ويبقى السجاد الخيار الأكثر شيوعًا لتغطية الأرضيات لأسباب عديدة، إذ اختاره كثير من المعماريين ومصممي الديكور وأصحاب المنازل، حتى غدا من أهم عناصر التصميم الداخلي الحديث.',
        usage:['الفنادق والمطاعم.','قاعات الاحتفالات.','القصور والفلل والشقق.','المكاتب.','صالات الدرجة الأولى وكبار الشخصيات في المطارات.'],
        characteristics:['يوفر السجاد خيارات من الألوان والملامس تفوق أي بديل آخر لتغطية الأرضيات في السوق.','يُصنَّع السجاد المعاصر وفق أعلى المعايير.','يأتي السجاد بتشكيلة واسعة من الألوان والدرجات.','يخفي السجاد كثيرًا من تفاوتات الأرضية التي لا تسمح بها الأرضيات الصلبة.','السجاد عمومًا أسهل وأوفر في التركيب والاستبدال من معظم أنواع تغطية الأرضيات.'],
        availability:['تقدم التراث تشكيلة واسعة من خامات السجاد بتوليفات لا نهائية من الألوان والتصاميم. تشمل مجموعتنا التركيب النايلوني الفاخر والصوف والخامات المختلطة، إضافة إلى أنواع أكسمنستر والمعقود يدويًا والمطبوع (نايلون). وينصب تركيزنا على التفرد والتميز، مع تصاميم آسرة وتصنيع بالغ الدقة.']
      },
      {
        slug:'makkah-chamber', project:'غرفة مكة التجارية', title:'بلاط السجاد', motif:'tile',
        body:'يثبت بلاط السجاد تفوقه على لفات السجاد في كل جانب تقريبًا. فمن اختيار الألياف وتركيب الخيوط إلى نظام الظهر والمعالجات النهائية الخاصة، صُمم بلاط السجاد الذي توفره التراث ليؤدي في أقسى ظروف الحركة. ويتميز السجاد المعياري بطبقة دعم مدمجة تحمي السجادة من آثار الاستهلاك حتى في أشد الظروف، بما يعزز التحمل والحفاظ على المظهر.',
        usage:['يُباع بلاط السجاد غالبًا لقطاع المكاتب في سوق العقود، مع إمكانية تنفيذ جودات وألوان مخصصة.'],
        characteristics:['سهولة الوصول: وصول ميسّر لمنافذ الكهرباء والحاسب المثبتة في الأرضية دون الحاجة إلى العبث بكامل المساحة المفروشة، وهي مرونة لا تتيحها لفات السجاد التقليدية.','سهولة التركيب: يمكن تثبيت بلاط السجاد على معظم الأرضيات باستخدام لاصق حساس للضغط أو التثبيت الموضعي أو الشريط اللاصق مزدوج الوجه.','سهولة الاستبدال: يمكن رفع البلاط التالف أو المتسخ واستبداله ببلاط جديد ببساطة.','مرونة التصميم: الاحتمالات لا تنتهي. استخدم خيالك لابتكار تصاميمك الخاصة، أو اختر من أحدث الأنماط والألوان في تشكيلاتنا.','سهولة الصيانة: الصيانة بسيطة وسريعة؛ يكفي الشفط المنتظم وتجفيف البقع وتنظيف الانسكابات فورًا، دون منظفات خاصة أو معالجات كيميائية.'],
        availability:['متوفر بمقاس 50×50 سم أو 60×60 سم. تقدم التراث تشكيلة واسعة من بلاط السجاد بألوان وأنماط متعددة تناسب مختلف المتطلبات. وسيجد عملاؤنا الطُرز الجميلة والعملية معًا، والأنواع الأنيقة سهلة العناية — طيفًا كاملًا من الخيارات. واختيار النمط الأمثل يقوم على إيجاد التوازن الصحيح بين الجمال والأداء والميزانية بما يلائم بيئة عملك.']
      },
      {
        slug:'king-abdullah-sport-city-mosque', project:'جامع مدينة الملك عبدالله الرياضية', title:'سجاد المساجد', motif:'arch',
        body:'عُرف السجاد المصمم خصيصًا عبر القرون بدفئه وسكينته الروحية وزخارفه الدقيقة، وهو قادر على أن يشكّل أساسًا فريدًا تُنسَّق حوله المساحة المقدسة. والاختيار الصحيح للون والنقش والملمس يمكن أن يحوّل قاعة الصلاة، معززًا جلالها البصري وراحة المصلين. وتقدم مجموعاتنا تشكيلة واسعة من السجاد المخصص للمساجد، بجمال استثنائي ومتانة طويلة الأمد.',
        usage:[],
        characteristics:['جودة إرث ثمين: مصمم ليُعد قطعة إرث بالغة القيمة في المجتمع، تحتفظ بمكانتها لأجيال.','مظهر يدوم: مصنوع ليتحمل الحركة الكثيفة المستمرة مع الحفاظ على مظهره الجذاب وسماكته وألوانه الزاهية لوقت طويل جدًا.','تخصيص كامل: يمكن تنفيذ السجاد بأي تصميم متخصص (بما في ذلك الزخارف الإسلامية التقليدية ومحاذاة المحراب والصفوف)، بأطياف لونية مخصصة وأبعاد دقيقة للقاعة.'],
        availability:['طيف الطُرز المتاح واسع وثري، ويتيح مزيجًا مثاليًا بين الوقار التقليدي والتنفيذ المعاصر.','الطُرز: من التركي الكلاسيكي والشرقي الأصيل والزخارف الإسلامية التقليدية، إلى الإصدارات الانتقالية والهندسية والمعاصرة.','تنوع الأنماط: من الحواف الزهرية الدقيقة وخطوط الصفوف المخصصة (صفوف الصف) إلى الخلفيات السادة والميداليات المركزية المهيبة، بما يوفر خيارات لا تكاد تنتهي لصياغة الأجواء الروحية المثالية.']
      },
      {
        slug:'private-villa-jeddah', project:'فيلا خاصة، جدة', title:'الأثاث', motif:'sofa',
        body:'نؤمن أن الأثاث ليس مجرد شغل للمساحة، بل انعكاس حقيقي لأسلوب حياة راقٍ وتجسيد للأناقة والراحة. نتخصص في توفير مجموعات استثنائية من الأثاث الفاخر تمزج بسلاسة بين التصاميم العصرية المبتكرة والحِرفية الراقية، بما يلبي تطلعاتكم لتأثيث الفلل الفاخرة والمجمعات السكنية والمشاريع التجارية المرموقة. وتُصنع كل قطعة من أرقى الأقمشة الفاخرة، وإسفنج عالي الكثافة لدعم مريح يدوم طويلًا، وهياكل متينة مصممة بعناية — لتمنح مساحاتك لمسة جمالية آسرة وتوازنًا مثاليًا بين الفخامة والأداء العملي.',
        usage:['مصممة للمشاريع السكنية والتجارية الفاخرة، بما في ذلك الفلل والقصور والصالونات الراقية ومناطق المعيشة الأنيقة وأماكن الضيافة والمساحات التنفيذية التي تنشد طابعًا مميزًا.'],
        characteristics:['الحِرفية: تصنيع دقيق باهتمام احترافي بالتفاصيل يضمن تشطيبًا فاخرًا خاليًا من العيوب.','الخامات: هياكل من الخشب الصلب المتين، محشوة بإسفنج عالي الكثافة لراحة مثالية، ومكسوة بأجود الأقمشة المنسوجة والجلود الفاخرة.','التصميم: تحف معاصرة تمزج المفاهيم الحديثة بالأناقة الخالدة، مع ترتيبات مرنة تناسب مختلف المخططات.','المزايا: راحة استثنائية، ومتانة عالية لأداء طويل الأمد، وجمالية فاخرة ترتقي بأي فضاء داخلي.'],
        availability:['نقدم حلول تأثيث متكاملة مع تشكيلة واسعة من الأقمشة الفاخرة ولوحات الألوان الراقية، منتقاة بدقة لتطابق مخططاتكم المعمارية ومفاهيمكم التصميمية. للاستشارات والطلبات، يرجى التواصل مع فريقنا أو زيارة صالات العرض.']
      },
      {
        slug:'king-faisal-specialist-hospital', project:'مستشفى الملك فيصل التخصصي', title:'العشب الصناعي', motif:'lattice',
        body:'إلى جانب تحسين نمط الحياة، يوفر العشب الصناعي بيئة جمالية وصحية عبر خامات مستدامة منخفضة التكلفة وجهد بشري أقل. ولدى التراث كوادر متخصصة في تركيب العشب الصناعي بأحدث المعدات المتوفرة عالميًا.',
        usage:['ملاعب كرة القدم.','ملاعب التنس.','نوادي الغولف.','صالات الهوكي.','ملاعب كرة السلة.','المسطحات الخضراء في الحدائق.','ملاعب الأطفال.','الحدائق العامة.','حدائق المنازل.'],
        characteristics:['يشبه العشب الطبيعي إلى حد كبير، ومتين وطويل العمر.','معتمد من الفيفا واليويفا والاتحاد الدولي للتنس ومنظمات رياضية دولية أخرى.','لا يحتاج إلى ري أو قص أو صيانة بعد كل مباراة.','تفصيل مخصص: يشمل التخطيط والتخطيط الخطي ضمن عملية التصنيع.','مضمون لمدة خمس سنوات.'],
        availability:['توفر التراث مقاسات وألوانًا مختلفة من العشب تناسب النشاط المطلوب. وتتوفر خامات مختلفة للاستخدام الخارجي إضافة إلى عشب متخصص للملاعب الداخلية. وقد جرى اختبار جميع الأنواع واعتمادها وتركيبها بواسطة كوادر مدربة وذات خبرة، بمعدات مستوردة من ألمانيا.']
      },
      {
        slug:'alfalah-schools-jeddah', project:'مدارس الفلاح، جدة', title:'الفينيل', motif:'floorplan',
        body:'أرضيات الفينيل هي السطح المثالي للمشاريع التي تشكل فيها المتانة وسهولة الصيانة ومقاومة الميكروبات والكهرباء الساكنة والانزلاق وكتم الضجيج متطلبات أساسية. وتؤكد المتطلبات الخاصة لتطبيقات الفينيل أهمية الأداء التقني إلى جانب الجوانب الجمالية. ومن أبرز مزايا الفينيل أنه اقتصادي نسبيًا ويأتي بتنوع لا حصر له من الألوان والأنماط، ولا تتطلب صيانته أكثر من الكنس والمسح الرطب. ويُستخدم الفينيل بكثرة في الغرف التي تكثر فيها الرطوبة، وعند إحكام إغلاقه يصبح مانعًا للماء تمامًا.',
        usage:['خضعت جميع خاماتنا للاختبار واعتُمدت مواصفاتها وأثبتت جودتها عبر تركيبات في بلدان عديدة. وتقدم التراث أغطية أرضيات مصممة للاستخدام في المستشفيات والمراكز الصحية والمباني الإدارية والمكاتب والمدارس والحضانات، إضافة إلى المنشآت التجارية والصناعية.'],
        characteristics:['تتميز أرضيات الفينيل بمتانة فائقة ومقاومة عالية للاستهلاك والانزلاق.','صيانة سهلة واقتصادية: لا حاجة إلى صيانة دورية، ولا تكاليف أو وقت إضافي طوال عمر الأرضية.','ثبات الأبعاد: بفضل التقوية بالألياف الزجاجية لا تظهر فجوات.','خالٍ من المذيبات: يُنتج كل منتج دون استخدام أي مذيبات حمايةً للبيئة.','يسمح بالتنظيف المتكرر: دون الحاجة إلى مواد كيميائية قاسية.','خصائص كتم الضجيج: قدرات صوتية تخفض الضجيج حتى 19 ديسيبل، بما يوفر مزايا إضافية في أماكن معينة.'],
        availability:['تتوفر أرضيات الفينيل التجارية بأنواع متجانسة وغير متجانسة.']
      },
      {
        slug:'juffali-head-office', project:'الجفالي، المقر الرئيسي', title:'السجاد المعقود يدويًا', motif:'boteh',
        body:'في شركة التراث للسجاد، يمثل السجاد المعقود يدويًا ذروة الفخامة الحصرية والحِرفية الفنية. تُصنع كل قطعة بعناية على أيدي حرفيين مهرة، جامعةً بين خامات فائقة الجودة وتصاميم لافتة قابلة للتخصيص لتحويل أي مساحة مؤسسية أو سكنية. وإلى جانب جاذبيتها البصرية، توفر هذه السجادات الفاخرة راحة مترفة تحت الأقدام ومتانة طويلة الأمد مصممة للبيئات كثيفة الحركة. وسواء احتجت قطعة مميزة لقاعة اجتماعات تنفيذية أو لمسة راقية لفضاء داخلي فاخر، تقدم مجموعاتنا التوازن المثالي بين الأداء التقني والأناقة الفنية.',
        usage:['مثالية للمساحات التجارية الفاخرة والسكنية الراقية، بما في ذلك المكاتب التنفيذية وقاعات الاجتماعات والفنادق الفاخرة والصالونات الرئيسية ومناطق المعيشة المتميزة.'],
        characteristics:['الحِرفية: تقنية عقد يدوي فاخرة على أيدي حرفيين مهرة.','الخامات: مزيج فاخر من صوف نيوزيلندا النقي والحرير الفاخر، يضمن نقاء الألوان ولمعانًا طبيعيًا آسرًا.','التصميم: قابل للتخصيص بالكامل في الأشكال والألوان والأبعاد بما يطابق مخطط مشروعك.','المزايا: راحة حريرية فاخرة تحت الأقدام، ومتانة ومرونة استثنائية بفضل صوف نيوزيلندا الفاخر، وجمالية راقية تدوم.'],
        availability:['متوفر عند الطلب (يُصنع خصيصًا حسب الطلب).','نوفر صوف نيوزيلندا النقي والحرير الفاخر، ونتخصص في تنفيذ وتفصيل السجاد وفق تصاميمكم وأبعادكم وألوانكم الفاخرة بما يكمل مخططات مشاريعكم بدقة. للاستفسارات الخاصة، يرجى التواصل مع فريقنا.']
      }
    ],
    galleryHead: {kicker:'مشاريع مختارة', title:'منفّذة في أرجاء المملكة', lead:'مجموعة مختارة من التركيبات المنجزة.'},
    processHead: {kicker:'آلية العمل', title:'حلول متكاملة للمشاريع', lead:'شريك واحد مسؤول من أول مواصفة إلى التسليم النهائي — دون فجوات بين التوريد والتصنيع والتركيب.'},
    process: [
      {n:'٠١', t:'الاستشارة ومسح الموقع', d:'نزور الموقع ونأخذ المقاسات ونراجع المخططات والمواصفات مع فريق التصميم لديكم.'},
      {n:'٠٢', t:'التصميم والمواصفات', d:'مقترحات الخامات والتوليفات اللونية وتطوير التصميم المخصص، مقدمة مع عينات للاعتماد.'},
      {n:'٠٣', t:'العينات والاعتماد', d:'عينات فعلية ونماذج أولية تُعتمد قبل دخول أي شيء مرحلة الإنتاج.'},
      {n:'٠٤', t:'التصنيع', d:'إنتاج وفق المواصفة المعتمدة، مع مراقبة جودة في كل مرحلة.'},
      {n:'٠٥', t:'التسليم والخدمات اللوجستية', d:'تسليم مجدول ومنسّق مع برنامج مشروعكم، بما في ذلك التسليم على مراحل.'},
      {n:'٠٦', t:'التركيب والتسليم النهائي', d:'تركيب بواسطة فرقنا المدربة، ثم الفحص والتسليم مع إرشادات العناية اللاحقة.'}
    ],
    formHead: {
      kicker:'ابدأ مشروعًا',
      title:'لنبنِ مشروعك معًا',
      lead:'سواء كان فندقًا أو مكتبًا مؤسسيًا أو مساحة سكنية فاخرة، نحوّل رؤيتك إلى واقع بحلول أثاث وسجاد مصممة خصيصًا. املأ النموذج أدناه، وسيتواصل معك مختصو المشاريع لدينا خلال 48 ساعة.'
    },
    form: {
      name:'الاسم الكامل', company:'الشركة / الجهة', email:'البريد الإلكتروني', phone:'الهاتف',
      type:'نوع المشروع', location:'موقع المشروع', size:'المساحة التقريبية (م²)',
      timeline:'الجدول الزمني المتوقع', details:'أخبرنا عن مشروعك',
      detailsPlaceholder:'النطاق، المساحات المشمولة، الخامات التي تفكر بها، تواريخ البرنامج…',
      types:['فندق / ضيافة','مسجد','مكتب مؤسسي','رعاية صحية','تعليم','سكني / فيلا','تجزئة','أخرى'],
      timelines:['فوري','1–3 أشهر','3–6 أشهر','أكثر من 6 أشهر','مرحلة التخطيط'],
      submitWa:'إرسال عبر واتساب', submitEmail:'إرسال عبر البريد',
      required:'الاسم مطلوب، مع بريد إلكتروني أو رقم هاتف على الأقل.',
      note:'يفتح هذا رسالة معبأة مسبقًا لفريق المشاريع لدينا — راجعها ثم أرسلها. يرد المختص خلال 48 ساعة.',
      subject:'استفسار مشروع — شركة التراث للسجاد',
      intro:'مرحبًا التراث، أود مناقشة مشروع:'
    }
  };

  return { video: video, en: en, ar: ar };
})();
