/* ======================================================================
   HERITAGE ASSISTANT — knowledge base
   ----------------------------------------------------------------------
   Answers are matched by keyword against the intents below. Everything here
   is drawn from the site's own data (showrooms, brands, opening hours,
   contact numbers) so the assistant cannot contradict the pages it sits on.

   ADDING AN ANSWER
   Copy an intent and change the fields:

     { id:'delivery',
       keys:['deliver','shipping','how long'],     // EN keywords, lowercase
       keys_ar:['توصيل','شحن'],                     // AR keywords
       q:'Do you deliver?',      q_ar:'هل توفرون التوصيل؟',   // quick-reply label
       a:'...', a_ar:'...',                        // the reply (HTML allowed)
       chips:['showrooms','contact']               // follow-up suggestions
     }

   `q` doubles as the button text in the quick-reply strip, so keep it short
   and phrased the way a customer would ask it.
   ====================================================================== */
window.HeritageChat = (function(){

  const WHATSAPP = '966552144855';

  const intents = [
    {
      id:'brands',
      keys:['brand','brands','divano','platinum','carpet land','elite','who are you','company'],
      keys_ar:['علامة','علامات','ديفانو','بلاتينيوم','كاربت','إيليت','من أنتم','الشركة'],
      q:'What brands do you have?', q_ar:'ما هي علاماتكم التجارية؟',
      a:'Heritage Group has five brands:<br><br>'+
        '<b>Heritage Carpets</b> — handmade, hand-tufted and machine-made rugs<br>'+
        '<b>Platinum Carpets</b> — stylish, practical, affordable<br>'+
        '<b>Divano</b> — contemporary furniture<br>'+
        '<b>Divano Elite</b> — Italian-inspired limited editions<br>'+
        '<b>Carpet Land</b> — wholesale and contract flooring<br><br>'+
        '<a href="brands.html">See all brands →</a>',
      a_ar:'تضم مجموعة التراث خمس علامات:<br><br>'+
        '<b>التراث للسجاد</b> — سجاد يدوي ومعقود يدويًا وآلي<br>'+
        '<b>بلاتينيوم للسجاد</b> — أنيق وعملي وبسعر مناسب<br>'+
        '<b>ديفانو</b> — أثاث معاصر<br>'+
        '<b>ديفانو إيليت</b> — إصدارات محدودة بلمسة إيطالية<br>'+
        '<b>كاربت لاند</b> — أرضيات الجملة والمشاريع<br><br>'+
        '<a href="brands.html">تصفح كل العلامات ←</a>',
      chips:['showrooms','products','bespoke']
    },
    {
      id:'showrooms',
      keys:['showroom','branch','location','address','where','visit','store','jeddah','riyadh','dammam','khobar'],
      keys_ar:['صالة','فرع','موقع','عنوان','أين','زيارة','متجر','جدة','الرياض','الدمام','الخبر'],
      q:'Where are your showrooms?', q_ar:'أين توجد صالات العرض؟',
      a:'We have 18 showrooms across the Kingdom:<br><br>'+
        '<b>Heritage Carpets</b> — 3 branches (Jeddah ×2, Riyadh)<br>'+
        '<b>Platinum Carpets</b> — 10 branches (Jeddah, Riyadh, Dammam, Khamis Mushait, Al Qatif)<br>'+
        '<b>Divano</b> — 5 branches (Jeddah ×2, Riyadh ×2, Al Ahsa)<br><br>'+
        '<a href="locations.html">Find your nearest showroom →</a>',
      a_ar:'لدينا 18 صالة عرض في أنحاء المملكة:<br><br>'+
        '<b>التراث للسجاد</b> — 3 فروع (جدة ×2، الرياض)<br>'+
        '<b>بلاتينيوم للسجاد</b> — 10 فروع (جدة، الرياض، الدمام، خميس مشيط، القطيف)<br>'+
        '<b>ديفانو</b> — 5 فروع (جدة ×2، الرياض ×2، الأحساء)<br><br>'+
        '<a href="locations.html">اعثر على أقرب صالة ←</a>',
      chips:['hours','booking','contact']
    },
    {
      id:'hours',
      keys:['hour','open','close','timing','time','friday','when are you'],
      keys_ar:['ساعات','دوام','مفتوح','إغلاق','توقيت','الجمعة','متى'],
      q:'What are your opening hours?', q_ar:'ما هي ساعات العمل؟',
      a:'Our Jeddah — Ar Rawdah showroom opens:<br><br>'+
        '<b>Sat–Thu</b> 10:00 AM – 11:00 PM<br>'+
        '<b>Fri</b> 5:00 PM – 11:00 PM<br><br>'+
        'Hours vary a little by branch — each one is listed on the showrooms page.<br><br>'+
        '<a href="locations.html">Check a specific branch →</a>',
      a_ar:'صالة جدة — الروضة تفتح:<br><br>'+
        '<b>السبت–الخميس</b> 10:00 ص – 11:00 م<br>'+
        '<b>الجمعة</b> 5:00 م – 11:00 م<br><br>'+
        'تختلف الأوقات قليلًا حسب الفرع، وكل فرع مذكور في صفحة صالات العرض.<br><br>'+
        '<a href="locations.html">تحقق من فرع معيّن ←</a>',
      chips:['showrooms','booking']
    },
    {
      id:'booking',
      keys:['book','appointment','reserve','schedule','consultation','visit a showroom'],
      keys_ar:['حجز','موعد','استشارة','زيارة صالة'],
      q:'Book an appointment', q_ar:'احجز موعدًا',
      a:'Yes. Pick a brand, a showroom, a day and a time, and a design consultant will be expecting you.<br><br>'+
        '<a href="visit.html">Book a showroom visit →</a>',
      a_ar:'نعم. اختر العلامة والصالة واليوم والوقت، وسيكون مستشار التصميم في انتظارك.<br><br>'+
        '<a href="visit.html">احجز زيارة ←</a>',
      chips:['showrooms','hours']
    },
    {
      id:'products',
      keys:['rug','carpet','product','collection','catalogue','catalog','buy','browse','price','cost','how much'],
      keys_ar:['سجاد','سجادة','منتج','مجموعة','شراء','تصفح','سعر','كم'],
      q:'What rugs do you sell?', q_ar:'ما أنواع السجاد لديكم؟',
      a:'Our rug catalogue is organised in three families:<br><br>'+
        '<b>Handmade</b> — Persian, Turkish and Oriental pieces<br>'+
        '<b>Machine-Made</b> — contemporary and everyday designs<br>'+
        '<b>Commercial</b> — contract and hospitality flooring<br><br>'+
        'Prices depend on size, material and origin, so each piece is quoted individually — a consultant can give you exact figures.<br><br>'+
        '<a href="collections.html">Browse the collections →</a>',
      a_ar:'ينقسم كتالوج السجاد لدينا إلى ثلاث عائلات:<br><br>'+
        '<b>يدوي</b> — قطع فارسية وتركية وشرقية<br>'+
        '<b>آلي</b> — تصاميم معاصرة ويومية<br>'+
        '<b>تجاري</b> — أرضيات المشاريع والضيافة<br><br>'+
        'تعتمد الأسعار على المقاس والخامة والمصدر، لذا تُسعّر كل قطعة على حدة — ويمكن لمستشارينا تزويدك بالأرقام الدقيقة.<br><br>'+
        '<a href="collections.html">تصفح المجموعات ←</a>',
      chips:['bespoke','showrooms','human']
    },
    {
      id:'bespoke',
      keys:['bespoke','custom','made to measure','commission','design my own','special size'],
      keys_ar:['حصري','مخصص','تفصيل','حسب الطلب','مقاس خاص'],
      q:'Can you make a custom rug?', q_ar:'هل تصنعون سجادًا حسب الطلب؟',
      a:'Yes — size, shape, colour, material and pattern are all yours to choose. '+
        'The Bespoke Studio walks you through it step by step and sends the brief to a consultant.<br><br>'+
        '<a href="bespoke.html">Start a bespoke design →</a>',
      a_ar:'نعم — المقاس والشكل واللون والخامة والنقش، كلها باختيارك. '+
        'يرشدك استوديو التصميم الحصري خطوة بخطوة ويرسل الطلب إلى أحد المستشارين.<br><br>'+
        '<a href="bespoke.html">ابدأ تصميمًا حصريًا ←</a>',
      chips:['products','human']
    },
    {
      id:'projects',
      keys:['project','commercial','hotel','mosque','masjed','office','contract','bulk','wholesale','tender','quotation'],
      keys_ar:['مشروع','تجاري','فندق','مسجد','مكتب','عقود','جملة','عرض سعر'],
      q:'Do you handle large projects?', q_ar:'هل تنفذون مشاريع كبيرة؟',
      a:'Yes — hotels, mosques, offices, sports facilities and residential developments. '+
        'We handle supply, fabrication and installation in-house.<br><br>'+
        '<a href="projects.html">See our projects →</a> · <a href="projects.html#project-enquiry-en">Request a quotation →</a>',
      a_ar:'نعم — الفنادق والمساجد والمكاتب والمنشآت الرياضية والمجمعات السكنية. '+
        'نتولى التوريد والتصنيع والتركيب داخليًا.<br><br>'+
        '<a href="projects.html">شاهد مشاريعنا ←</a> · <a href="projects.html#project-enquiry-ar">اطلب عرض سعر ←</a>',
      chips:['contact','human']
    },
    {
      id:'furniture',
      keys:['furniture','sofa','chair','table','bed','wardrobe','majlis seating'],
      keys_ar:['أثاث','أريكة','كرسي','طاولة','سرير','خزانة','جلسة'],
      q:'Do you sell furniture?', q_ar:'هل تبيعون أثاثًا؟',
      a:'Yes, through <b>Divano</b> and <b>Divano Elite</b> — sofas, dining, bedroom, cabinets, lighting and accessories.<br><br>'+
        '<a href="furniture.html">Explore furniture →</a> · <a href="https://www.divanoksa.com" target="_blank" rel="noopener">Shop online →</a>',
      a_ar:'نعم، عبر <b>ديفانو</b> و<b>ديفانو إيليت</b> — أرائك وطاولات طعام وغرف نوم وخزائن وإضاءة وإكسسوارات.<br><br>'+
        '<a href="furniture.html">استكشف الأثاث ←</a> · <a href="https://www.divanoksa.com" target="_blank" rel="noopener">تسوق أونلاين ←</a>',
      chips:['brands','showrooms']
    },
    {
      id:'care',
      keys:['clean','care','wash','maintain','repair','restore','stain'],
      keys_ar:['تنظيف','عناية','غسيل','صيانة','ترميم','بقعة'],
      q:'How do I care for a rug?', q_ar:'كيف أعتني بالسجادة؟',
      a:'Vacuum regularly without a beater bar, rotate the rug twice a year so it wears evenly, '+
        'and blot spills immediately rather than rubbing them.<br><br>'+
        'We also offer professional cleaning and restoration — a consultant can arrange it.',
      a_ar:'نظّف بالمكنسة بانتظام دون استخدام الفرشاة الدوّارة، ودوّر السجادة مرتين سنويًا ليكون التآكل متساويًا، '+
        'وجفّف أي انسكاب فورًا بالتربيت لا بالفرك.<br><br>'+
        'كما نوفر خدمات تنظيف وترميم احترافية — ويمكن لأحد المستشارين ترتيبها.',
      chips:['human','contact']
    },
    {
      id:'contact',
      keys:['contact','phone','call','email','number','reach you'],
      keys_ar:['تواصل','هاتف','اتصال','بريد','رقم'],
      q:'How do I contact you?', q_ar:'كيف أتواصل معكم؟',
      a:'<b>Phone:</b> <a href="tel:+966552144855">+966 55 214 4855</a><br>'+
        '<b>Email:</b> <a href="mailto:info@heritagecarpet.sa">info@heritagecarpet.sa</a><br><br>'+
        'Or continue this conversation with a person on WhatsApp — the chat so far goes with you.',
      a_ar:'<b>الهاتف:</b> <a href="tel:+966552144855">+966 55 214 4855</a><br>'+
        '<b>البريد:</b> <a href="mailto:info@heritagecarpet.sa">info@heritagecarpet.sa</a><br><br>'+
        'أو تابع هذه المحادثة مع أحد موظفينا عبر واتساب — وستنتقل معك المحادثة الحالية.',
      chips:['human']
    }
  ];

  const i18n = {
    en: {
      title:'Heritage Assistant', subtitle:'Usually replies instantly',
      greeting:'Hello. I can answer questions about our brands, showrooms, rugs and bespoke commissions. What would you like to know?',
      placeholder:'Type your question…', send:'Send', open:'Chat with us', close:'Close chat',
      human:'Talk to a person on WhatsApp', humanShort:'Talk to a person',
      fallback:'I am not certain about that one. A colleague can answer it properly — shall I pass this conversation to WhatsApp?',
      handoffNote:'Opening WhatsApp with your conversation attached…',
      botLabel:'Assistant', youLabel:'You',
      summaryHeader:'— Enquiry from the website —',
      sumBrand:'Brand', sumRoom:'Showroom', sumDate:'Date', sumTime:'Time',
      sumName:'Name', sumPhone:'Phone', sumAsked:'Asked about',
      disclaimer:'Automated replies. For anything specific, talk to a person.',
      apptBrand:'Of course. Which brand would you like to visit?',
      apptRoom:'Which showroom suits you?',
      apptDay:'Which day works for you?',
      apptTime:'And what time?',
      apptName:'What name should I put it under?',
      apptPhone:'And a phone number, so the showroom can confirm with you?',
      apptPhoneInvalid:'The mobile number needs to be 10 digits. For example 0552144855.',
      apptSummary:'Thank you, {name}. Here is your request:<br><br>'+
        '<b>Brand:</b> {brand}<br><b>Showroom:</b> {room}<br>'+
        '<b>Date:</b> {day}<br><b>Time:</b> {time}<br><b>Phone:</b> {phone}<br><br>'+
        'This is not confirmed yet — send it to our team on WhatsApp below and '+
        'they will confirm the slot with you.',
      apptUnavailable:'I can take you to the booking page for that.<br><br>'+
        '<a href="visit.html">Book a showroom visit →</a>'
    },
    ar: {
      title:'مساعد التراث', subtitle:'يرد عادةً في الحال',
      greeting:'مرحبًا. يمكنني الإجابة عن أسئلتك حول علاماتنا وصالات العرض والسجاد والتصاميم الحصرية. كيف أساعدك؟',
      placeholder:'اكتب سؤالك…', send:'إرسال', open:'تحدث معنا', close:'إغلاق المحادثة',
      human:'تحدث مع أحد موظفينا عبر واتساب', humanShort:'تحدث مع موظف',
      fallback:'لست متأكدًا من هذه. يمكن لأحد زملائي الإجابة بدقة — هل أنقل المحادثة إلى واتساب؟',
      handoffNote:'جارٍ فتح واتساب مع نص المحادثة…',
      botLabel:'المساعد', youLabel:'أنت',
      summaryHeader:'— طلب من الموقع —',
      sumBrand:'العلامة', sumRoom:'صالة العرض', sumDate:'التاريخ', sumTime:'الوقت',
      sumName:'الاسم', sumPhone:'الهاتف', sumAsked:'استفسر عن',
      disclaimer:'ردود آلية. للاستفسارات الخاصة، تحدث مع أحد موظفينا.',
      apptBrand:'بكل سرور. أي علامة ترغب بزيارتها؟',
      apptRoom:'أي صالة عرض تناسبك؟',
      apptDay:'أي يوم يناسبك؟',
      apptTime:'وفي أي وقت؟',
      apptName:'باسم من أسجل الموعد؟',
      apptPhone:'ورقم الهاتف، ليتمكن فريق صالة العرض من تأكيد الموعد معك؟',
      apptPhoneInvalid:'يجب أن يتكون رقم الجوال من 10 أرقام. مثال: 0552144855.',
      apptSummary:'شكرًا لك، {name}. هذا طلبك:<br><br>'+
        '<b>العلامة:</b> {brand}<br><b>صالة العرض:</b> {room}<br>'+
        '<b>التاريخ:</b> {day}<br><b>الوقت:</b> {time}<br><b>الهاتف:</b> {phone}<br><br>'+
        'لم يتم التأكيد بعد — أرسل الطلب إلى فريقنا عبر واتساب أدناه وسيؤكدون لك الموعد.',
      apptUnavailable:'يمكنني نقلك إلى صفحة الحجز.<br><br>'+
        '<a href="visit.html">احجز زيارة ←</a>'
    }
  };

  /* opening suggestions — kept to four so the strip doesn't dominate */
  const openingChips = ['booking','showrooms','products','brands'];

  function byId(id){ return intents.filter(i => i.id === id)[0] || null; }

  /* Keyword scoring. Deliberately simple and transparent: whichever intent
     matches the most keywords wins, and a longer keyword counts for more so
     "carpet land" beats a bare "carpet". Returns null below a threshold so
     the assistant says it doesn't know rather than guessing — a wrong
     confident answer costs more than an honest handoff. */
  function match(text, lang){
    const t = String(text || '').toLowerCase().trim();
    if(!t) return null;
    let best = null, bestScore = 0;
    intents.forEach(intent=>{
      const keys = ((lang === 'ar' ? intent.keys_ar : intent.keys) || [])
        .map(k => k.toLowerCase())
        .sort((a,b) => b.length - a.length);   // longest first
      let score = 0;
      const counted = [];
      keys.forEach(k=>{
        if(t.indexOf(k) === -1) return;
        // Don't count a keyword that is contained in one already counted.
        // Without this "سجاد" scored on top of "سجادة" (and "carpet" on top
        // of "carpet land"), inflating a generic intent until it beat a more
        // specific one: "أريد سجادة حسب الطلب" resolved to products, not bespoke.
        if(counted.some(c => c.indexOf(k) > -1)) return;
        counted.push(k);
        // a multi-word phrase is a far stronger signal than a lone noun
        score += k.length + (k.indexOf(' ') > -1 ? 6 : 0);
      });
      if(score > bestScore){ bestScore = score; best = intent; }
    });
    return bestScore >= 3 ? best : null;
  }

  return { intents, i18n, openingChips, byId, match, WHATSAPP };
})();
