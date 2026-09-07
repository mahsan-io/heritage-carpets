/* ======================================================================
   HERITAGE GROUP — STORE LOCATIONS
   ----------------------------------------------------------------------
   Three retail brands, each with its own branch list. Rendered by
   locations.html as three tabs.

   Each branch: {city, addr, tel, hours?}
     tel  — digits only, no spaces (used for the tel: link)
     hours — optional; omitted branches simply don't show an hours line

   The map embed and directions link are both generated from `addr`, so
   there is nothing extra to maintain per branch. If a pin lands slightly
   off, add an explicit `q:` to that branch with a more precise search
   string (or paste coordinates) and it will be used instead.
   ====================================================================== */
window.HeritageLocations = (function(){

  const brands = {
    heritage: {
      key:'heritage',
      name_en:'Heritage Carpets',   name_ar:'التراث للسجاد',
      tagline_en:'Handmade and bespoke carpets — our flagship showrooms.',
      tagline_ar:'سجاد يدوي وحصري — صالات العرض الرئيسية.',
      branches: [
        {city_en:'Jeddah', city_ar:'جدة', name_en:'Ar Rawdah', name_ar:'الروضة',
         addr_en:'Prince Sultan Road, Ar Rawdah, Jeddah',
         addr_ar:'طريق الأمير سلطان، الروضة، جدة',
         q:'Prince Sultan Road, Ar Rawdah, Jeddah, Saudi Arabia',
         tel:'+966552144855',
         hours_en:'<b>Sat–Thu</b> 10:00 AM – 11:00 PM<br><b>Fri</b> 5:00 PM – 11:00 PM',
         hours_ar:'<b>السبت–الخميس</b> ١٠:٠٠ ص – ١١:٠٠ م<br><b>الجمعة</b> ٥:٠٠ م – ١١:٠٠ م'},
        {city_en:'Jeddah', city_ar:'جدة', name_en:'Mishrifah', name_ar:'المشرفة',
         addr_en:'Al-Madinah Al-Munawarah Road, Mishrifah, Jeddah',
         addr_ar:'طريق المدينة المنورة، المشرفة، جدة',
         q:'Al Madinah Al Munawarah Road, Mishrifah, Jeddah, Saudi Arabia',
         tel:'+966126605077',
         hours_en:'<b>Sat–Thu</b> 10:00 AM–12:30 PM &amp; 5:00 PM–10:30 PM<br><b>Fri</b> 5:00 PM – 10:30 PM',
         hours_ar:'<b>السبت–الخميس</b> ١٠:٠٠ ص–١٢:٣٠ م و ٥:٠٠ م–١٠:٣٠ م<br><b>الجمعة</b> ٥:٠٠ م – ١٠:٣٠ م'},
        {city_en:'Riyadh', city_ar:'الرياض', name_en:'Al Yasmin', name_ar:'الياسمين',
         addr_en:'King Abdulaziz Road, Al Yasmin, Riyadh',
         addr_ar:'طريق الملك عبدالعزيز، الياسمين، الرياض',
         q:'King Abdulaziz Road, Al Yasmin, Riyadh, Saudi Arabia',
         tel:'+966552144855',
         hours_en:'<b>Hours</b> available on request',
         hours_ar:'<b>مواعيد العمل</b> متوفرة عند الطلب'}
      ]
    },

    platinum: {
      key:'platinum',
      name_en:'Platinum Carpets',   name_ar:'بلاتينيوم للسجاد',
      tagline_en:'Machine-made and contract carpets, with branches across the Kingdom.',
      tagline_ar:'سجاد آلي وسجاد للمشاريع، بفروع في أنحاء المملكة.',
      branches: [
        {city_en:'Jeddah', city_ar:'جدة',
         addr_en:"Steen St, Dawar Al-Drajjah, Al Faisaliyyah, Jeddah, Western Region, 23445",
         addr_ar:'شارع ستين، دوار الدراجة، الفيصلية، جدة، المنطقة الغربية، 23445',
         q:'Al Faisaliyyah, Jeddah, Saudi Arabia'},
        {city_en:'Jeddah', city_ar:'جدة',
         addr_en:"Al Andalus Mall, Al Fayha'a, Jeddah, Western Region, 22245",
         addr_ar:'الأندلس مول، الفيحاء، جدة، المنطقة الغربية، 22245',
         q:'Al Andalus Mall, Jeddah, Saudi Arabia',
         tel:'+966559047300'},
        {city_en:'Riyadh', city_ar:'الرياض',
         addr_en:'Asad Alsunnah St, Al Faisaliyyah, Riyadh, Central Region, 12881',
         addr_ar:'شارع أسد السنة، الفيصلية، الرياض، المنطقة الوسطى، 12881',
         q:'Asad Alsunnah Street, Al Faisaliyyah, Riyadh, Saudi Arabia',
         tel:'+966112708179'},
        {city_en:'Riyadh', city_ar:'الرياض',
         addr_en:'Prince Nayef Rd, Alowais Markets, Riyadh, Central Region, 12262',
         addr_ar:'طريق الأمير نايف، أسواق العويس، الرياض، المنطقة الوسطى، 12262',
         q:'Prince Nayef Road, Alowais Markets, Riyadh, Saudi Arabia',
         tel:'+966112107188'},
        {city_en:'Riyadh', city_ar:'الرياض',
         addr_en:'Prince Nayef Rd, Alowais Markets, Riyadh, Central Region, 12262',
         addr_ar:'طريق الأمير نايف، أسواق العويس، الرياض، المنطقة الوسطى، 12262',
         q:'Prince Nayef Road, Alowais Markets, Riyadh, Saudi Arabia',
         tel:'+966572469299'},
        {city_en:'Riyadh', city_ar:'الرياض',
         addr_en:'Khalid Bin Waleed St, Al Hamra, Riyadh, Central Region, 13217',
         addr_ar:'شارع خالد بن الوليد، الحمراء، الرياض، المنطقة الوسطى، 13217',
         q:'Khalid Bin Waleed Street, Al Hamra, Riyadh, Saudi Arabia',
         tel:'+966112455573'},
        {city_en:'Al Dammam', city_ar:'الدمام',
         addr_en:'Prince Nayef Bin Abdulaziz Rd, Al Anud, Al Dammam, Eastern Region, 32427',
         addr_ar:'طريق الأمير نايف بن عبدالعزيز، العنود، الدمام، المنطقة الشرقية، 32427',
         q:'Prince Nayef Bin Abdulaziz Road, Al Anud, Dammam, Saudi Arabia',
         tel:'+966138341792'},
        {city_en:'Al Dammam', city_ar:'الدمام',
         addr_en:'King Abdulaziz Rd, Al Aziziyah, Al Dammam, Eastern Region, 32424',
         addr_ar:'طريق الملك عبدالعزيز، العزيزية، الدمام، المنطقة الشرقية، 32424',
         q:'King Abdulaziz Road, Al Aziziyah, Dammam, Saudi Arabia',
         tel:'+966133303977'},
        {city_en:'Khamis Mushait', city_ar:'خميس مشيط',
         addr_en:'King Khalid Rd, Al Shifa, Khamis Mushait, Aseer Region, 62433',
         addr_ar:'طريق الملك خالد، الشفا، خميس مشيط، منطقة عسير، 62433',
         q:'King Khalid Road, Al Shifa, Khamis Mushait, Saudi Arabia',
         tel:'+966172228291'},
        {city_en:'Al Qatif', city_ar:'القطيف',
         addr_en:'Al Quds St, Warehouses, Al Qatif, Eastern Region, 31911',
         addr_ar:'شارع القدس، المستودعات، القطيف، المنطقة الشرقية، 31911',
         q:'Al Quds Street, Al Qatif, Saudi Arabia',
         tel:'+966138417193'}
      ]
    },

    divano: {
      key:'divano',
      name_en:'Divano',   name_ar:'ديفانو',
      tagline_en:'Luxury furniture — sofas, seating and complete interior collections.',
      tagline_ar:'أثاث فاخر — أرائك ومجالس ومجموعات داخلية متكاملة.',
      branches: [
        {city_en:'Jeddah', city_ar:'جدة',
         addr_en:'Prince Sultan Rd, Al Rawdah, Jeddah, 23433',
         addr_ar:'طريق الأمير سلطان، الروضة، جدة، 23433',
         q:'Prince Sultan Road, Al Rawdah, Jeddah, Saudi Arabia',
         tel:'+966122335771'},
        {city_en:'Jeddah', city_ar:'جدة',
         addr_en:'King Fahd Rd, Al Faisaliyyah, Jeddah, 23445',
         addr_ar:'طريق الملك فهد، الفيصلية، جدة، 23445',
         q:'King Fahd Road, Al Faisaliyyah, Jeddah, Saudi Arabia',
         tel:'+966126396475'},
        {city_en:'Riyadh', city_ar:'الرياض',
         addr_en:'Khalid Ibn Al Walid St, Exit 9, Al Hamra, Riyadh, 13217',
         addr_ar:'شارع خالد بن الوليد، مخرج 9، الحمراء، الرياض، 13217',
         q:'Khalid Ibn Al Walid Street, Al Hamra, Riyadh, Saudi Arabia',
         tel:'+966114538413'},
        {city_en:'Riyadh', city_ar:'الرياض',
         addr_en:'King Abdulaziz Rd, Al Yasmin, Riyadh, 13325',
         addr_ar:'طريق الملك عبدالعزيز، الياسمين، الرياض، 13325',
         q:'King Abdulaziz Road, Al Yasmin, Riyadh, Saudi Arabia',
         tel:'+966554758003'},
        {city_en:'Al Ahsa', city_ar:'الأحساء',
         addr_en:'Al Dahran Rd, Al Mubarraz, Eastern Province, 36342',
         addr_ar:'طريق الظهران، المبرز، المنطقة الشرقية، 36342',
         q:'Al Dhahran Road, Al Mubarraz, Al Ahsa, Saudi Arabia',
         tel:'+966558717900'}
      ]
    }
  };

  const order = ['heritage','platinum','divano'];

  const i18n = {
    en: {
      kicker:'Store Locator', title:'Our Showrooms',
      lead:'Three retail brands across the Kingdom. Choose a brand to see its branches.',
      directions:'Get Directions', call:'Call', branchCount:'{n} branches',
      noPhone:'Phone available on request'
    },
    ar: {
      kicker:'دليل الفروع', title:'صالات العرض',
      lead:'ثلاث علامات تجارية في أنحاء المملكة. اختر علامة لعرض فروعها.',
      directions:'الاتجاهات', call:'اتصل', branchCount:'{n} فرعًا',
      noPhone:'رقم الهاتف متوفر عند الطلب'
    }
  };

  function displayTel(tel){
    // +966112708179 -> +966 11 270 8179
    if(!tel) return '';
    const d = tel.replace(/[^0-9]/g,'');
    if(d.length === 12 && d.indexOf('966') === 0){
      const rest = d.slice(3);
      return '+966 ' + rest.slice(0,2) + ' ' + rest.slice(2,5) + ' ' + rest.slice(5);
    }
    return tel;
  }

  return { brands: brands, order: order, i18n: i18n, displayTel: displayTel };
})();
