/* ======================================================================
   VISIT PAGE — SHOWROOM BOOKING DATA (visit.html)
   ----------------------------------------------------------------------
   Showrooms are grouped by brand: pick a brand first, then only that
   brand's showrooms are offered. All three brands' real branch data comes
   from js/locations-data.js (converted here into booking-ready entries).

   IMPORTANT — flagged for follow-up:
   - Heritage's 3 showrooms keep their REAL opening hours and REAL
     per-branch time slots (carried over unchanged from the original
     visit.html config).
   - Every Platinum and Divano branch below uses a PLACEHOLDER hours
     label ("Hours available on request") and a DEFAULT slot pattern
     (11:00/13:00/17:00/19:00, Fri 17:00/19:00) — because no real
     per-branch schedule exists yet in js/locations-data.js. Replace
     `hours`, `slots` and `slotsFri` per branch once real data is available.
   - Two Platinum branches share the exact same address in the source
     location data ("Riyadh — Alowais Markets" appears twice) — worth
     checking whether that's a genuine duplicate.
   - Branch labels for Platinum/Divano are derived from the district
     segment of each address string, since most of those branches have
     no distinct name of their own (only a city) — worth a quick read
     to confirm they sound natural, e.g. "Riyadh — Exit 9".
   ====================================================================== */
window.HeritageVisitConfig = (function(){

  const en = {
  brandOrder: ['heritage','platinum','divano'],
  showroomsByBrand: {
    heritage: { label:'Heritage Carpets', rooms:[
      {key:'heritage-jeddah-ar-rawdah', label:'Jeddah — Ar Rawdah', hours:'Sat–Thu 10:00 AM – 11:00 PM · Fri 5:00 PM – 11:00 PM', slots:['10:00','12:00','14:00','16:00','18:00','20:00'], slotsFri:['17:00','19:00','21:00']},
      {key:'heritage-jeddah-mishrifah', label:'Jeddah — Mishrifah', hours:'Sat–Thu 10:00 AM–12:30 PM & 5:00 PM–10:30 PM · Fri 5:00 PM – 10:30 PM', slots:['10:00','11:30','17:00','19:00','21:00'], slotsFri:['17:00','19:00','21:00']},
      {key:'heritage-riyadh-al-yasmin', label:'Riyadh — Al Yasmin', hours:'Hours available on request', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'heritage-video', label:'Video Consultation', hours:'Scheduled with a consultant', slots:['10:00','12:00','14:00','16:00','18:00'], slotsFri:['17:00','19:00']},
    ]},
    platinum: { label:'Platinum Carpets', rooms:[
      {key:'platinum-jeddah-dawar-al-drajjah', label:'Jeddah — Dawar Al-Drajjah', hours:'Hours available on request', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'platinum-jeddah-al-fayha-a', label:'Jeddah — Al Fayha\'a', hours:'Hours available on request', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'platinum-riyadh-al-faisaliyyah', label:'Riyadh — Al Faisaliyyah', hours:'Hours available on request', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'platinum-riyadh-alowais-markets', label:'Riyadh — Alowais Markets', hours:'Hours available on request', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'platinum-riyadh-alowais-markets-2', label:'Riyadh — Alowais Markets (2)', hours:'Hours available on request', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'platinum-riyadh-al-hamra', label:'Riyadh — Al Hamra', hours:'Hours available on request', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'platinum-al-dammam-al-anud', label:'Al Dammam — Al Anud', hours:'Hours available on request', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'platinum-al-dammam-al-aziziyah', label:'Al Dammam — Al Aziziyah', hours:'Hours available on request', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'platinum-khamis-mushait-al-shifa', label:'Khamis Mushait — Al Shifa', hours:'Hours available on request', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'platinum-al-qatif-warehouses', label:'Al Qatif — Warehouses', hours:'Hours available on request', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'platinum-video', label:'Video Consultation', hours:'Scheduled with a consultant', slots:['10:00','12:00','14:00','16:00','18:00'], slotsFri:['17:00','19:00']},
    ]},
    divano: { label:'Divano', rooms:[
      {key:'divano-jeddah-al-rawdah', label:'Jeddah — Al Rawdah', hours:'Hours available on request', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'divano-jeddah-al-faisaliyyah', label:'Jeddah — Al Faisaliyyah', hours:'Hours available on request', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'divano-riyadh-exit-9', label:'Riyadh — Exit 9', hours:'Hours available on request', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'divano-riyadh-al-yasmin', label:'Riyadh — Al Yasmin', hours:'Hours available on request', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'divano-al-ahsa-al-mubarraz', label:'Al Ahsa — Al Mubarraz', hours:'Hours available on request', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'divano-video', label:'Video Consultation', hours:'Scheduled with a consultant', slots:['10:00','12:00','14:00','16:00','18:00'], slotsFri:['17:00','19:00']},
    ]},
  },
    i18n: {
      days:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      pickBrand:'Choose a brand to see its showrooms.',
      pickFirst:'Choose a showroom and a day to see available times.',
      noSlots:'No times available on this day — please pick another.',
      notSelected:'—',
      sumLabels:{brand:'Brand', showroom:'Showroom', date:'Date', time:'Time', name:'Name', phone:'Phone', notes:'Notes'},
      requestIntro:'Hello Heritage, I would like to request a showroom visit:',
      emailSubject:'Showroom Visit Request'
    }
  };

  const ar = {
  brandOrder: ['heritage','platinum','divano'],
  showroomsByBrand: {
    heritage: { label:'التراث للسجاد', rooms:[
      {key:'heritage-jeddah-ar-rawdah', label:'جدة — الروضة', hours:'السبت–الخميس ١٠:٠٠ ص – ١١:٠٠ م · الجمعة ٥:٠٠ م – ١١:٠٠ م', slots:['10:00','12:00','14:00','16:00','18:00','20:00'], slotsFri:['17:00','19:00','21:00']},
      {key:'heritage-jeddah-mishrifah', label:'جدة — المشرفة', hours:'السبت–الخميس ١٠:٠٠ ص–١٢:٣٠ م و ٥:٠٠ م–١٠:٣٠ م · الجمعة ٥:٠٠ م – ١٠:٣٠ م', slots:['10:00','11:30','17:00','19:00','21:00'], slotsFri:['17:00','19:00','21:00']},
      {key:'heritage-riyadh-al-yasmin', label:'الرياض — الياسمين', hours:'مواعيد العمل متوفرة عند الطلب', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'heritage-video', label:'استشارة عبر الفيديو', hours:'حسب موعد مع أحد مستشارينا', slots:['10:00','12:00','14:00','16:00','18:00'], slotsFri:['17:00','19:00']},
    ]},
    platinum: { label:'بلاتينيوم للسجاد', rooms:[
      {key:'platinum-jeddah-dawar-al-drajjah', label:'جدة — دوار الدراجة', hours:'الأوقات متاحة عند الطلب', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'platinum-jeddah-al-fayha-a', label:'جدة — الفيحاء', hours:'الأوقات متاحة عند الطلب', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'platinum-riyadh-al-faisaliyyah', label:'الرياض — الفيصلية', hours:'الأوقات متاحة عند الطلب', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'platinum-riyadh-alowais-markets', label:'الرياض — أسواق العويس', hours:'الأوقات متاحة عند الطلب', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'platinum-riyadh-alowais-markets-2', label:'الرياض — أسواق العويس (2)', hours:'الأوقات متاحة عند الطلب', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'platinum-riyadh-al-hamra', label:'الرياض — الحمراء', hours:'الأوقات متاحة عند الطلب', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'platinum-al-dammam-al-anud', label:'الدمام — العنود', hours:'الأوقات متاحة عند الطلب', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'platinum-al-dammam-al-aziziyah', label:'الدمام — العزيزية', hours:'الأوقات متاحة عند الطلب', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'platinum-khamis-mushait-al-shifa', label:'خميس مشيط — الشفا', hours:'الأوقات متاحة عند الطلب', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'platinum-al-qatif-warehouses', label:'القطيف — المستودعات', hours:'الأوقات متاحة عند الطلب', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'platinum-video', label:'استشارة عبر الفيديو', hours:'حسب موعد مع أحد مستشارينا', slots:['10:00','12:00','14:00','16:00','18:00'], slotsFri:['17:00','19:00']},
    ]},
    divano: { label:'ديفانو', rooms:[
      {key:'divano-jeddah-al-rawdah', label:'جدة — الروضة', hours:'الأوقات متاحة عند الطلب', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'divano-jeddah-al-faisaliyyah', label:'جدة — الفيصلية', hours:'الأوقات متاحة عند الطلب', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'divano-riyadh-exit-9', label:'الرياض — مخرج 9', hours:'الأوقات متاحة عند الطلب', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'divano-riyadh-al-yasmin', label:'الرياض — الياسمين', hours:'الأوقات متاحة عند الطلب', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'divano-al-ahsa-al-mubarraz', label:'الأحساء — المبرز', hours:'الأوقات متاحة عند الطلب', slots:['11:00','13:00','17:00','19:00'], slotsFri:['17:00','19:00']},
      {key:'divano-video', label:'استشارة عبر الفيديو', hours:'حسب موعد مع أحد مستشارينا', slots:['10:00','12:00','14:00','16:00','18:00'], slotsFri:['17:00','19:00']},
    ]},
  },
    i18n: {
      days:['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'],
      months:['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
      pickBrand:'اختر علامة تجارية لعرض صالات عرضها.',
      pickFirst:'اختر صالة عرض ويومًا لعرض الأوقات المتاحة.',
      noSlots:'لا توجد أوقات متاحة في هذا اليوم — يرجى اختيار يوم آخر.',
      notSelected:'—',
      sumLabels:{brand:'العلامة التجارية', showroom:'صالة العرض', date:'التاريخ', time:'الوقت', name:'الاسم', phone:'الهاتف', notes:'ملاحظات'},
      requestIntro:'مرحبًا التراث، أرغب في طلب زيارة إلى صالة العرض:',
      emailSubject:'طلب زيارة صالة عرض'
    }
  };

  return { en: en, ar: ar };
})();
