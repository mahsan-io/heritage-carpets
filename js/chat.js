/* ======================================================================
   HERITAGE ASSISTANT — widget
   ----------------------------------------------------------------------
   Builds its own markup, so a page only needs:
       <script src="js/chat-data.js"></script>
       <script src="js/chat.js"></script>

   WHY THIS IS RULE-BASED AND NOT AN LLM
   A language model needs an API key. This site is static (GitHub Pages),
   and any key placed in browser JavaScript is readable by anyone who opens
   devtools — they could then spend your credit freely. Routing through a
   small server-side proxy is the only safe way to use one, which means a
   backend and per-message cost.

   So this answers the questions people actually ask — brands, showrooms,
   hours, bookings, pricing, bespoke, projects — from the site's own data,
   and hands anything else to a human on WhatsApp with the conversation
   attached. `sendToModel` below is the single place an LLM would slot in
   later; nothing else would need to change.
   ====================================================================== */
(function(){
  const C = window.HeritageChat;
  if(!C) return;

  const lang = (document.documentElement.getAttribute('lang') === 'ar'
             || document.documentElement.getAttribute('dir') === 'rtl') ? 'ar' : 'en';
  const T = C.i18n[lang] || C.i18n.en;

  const history = [];          // {who:'bot'|'user', text:'plain text'}
  let openState = false;

  /* ---------------- markup ---------------- */
  const root = document.createElement('div');
  root.className = 'hc-chat';
  root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  root.innerHTML =
    '<button type="button" class="hc-bubble" aria-label="'+T.open+'">'+
      '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+
        '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.2-.6L3 21l1.8-5A8.3 8.3 0 0 1 4 11.5a8.4 8.4 0 0 1 9-8.4 8.4 8.4 0 0 1 8 8.4z"/>'+
      '</svg>'+
      '<span class="hc-bubble-dot"></span>'+
    '</button>'+
    '<section class="hc-panel" hidden aria-label="'+T.title+'">'+
      '<header class="hc-head">'+
        '<div class="hc-head-text"><strong>'+T.title+'</strong><span>'+T.subtitle+'</span></div>'+
        '<button type="button" class="hc-close" aria-label="'+T.close+'">&#10005;</button>'+
      '</header>'+
      '<div class="hc-log" data-role="hc-log" role="log" aria-live="polite"></div>'+
      '<div class="hc-chips" data-role="hc-chips"></div>'+
      '<form class="hc-form">'+
        '<input type="text" class="hc-input" placeholder="'+T.placeholder+'" aria-label="'+T.placeholder+'" autocomplete="off">'+
        '<button type="submit" class="hc-send" aria-label="'+T.send+'">'+
          '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>'+
        '</button>'+
      '</form>'+
      '<a class="hc-human" href="#" target="_blank" rel="noopener">'+
        '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.8.8-2.8-.2-.3A8 8 0 1 1 12 20z"/></svg>'+
        '<span>'+T.humanShort+'</span>'+
      '</a>'+
      '<p class="hc-disclaimer">'+T.disclaimer+'</p>'+
    '</section>';
  document.body.appendChild(root);

  const bubble  = root.querySelector('.hc-bubble');
  const panel   = root.querySelector('.hc-panel');
  const log     = root.querySelector('[data-role="hc-log"]');
  const chipsEl = root.querySelector('[data-role="hc-chips"]');
  const form    = root.querySelector('.hc-form');
  const input   = root.querySelector('.hc-input');
  const humanBtn= root.querySelector('.hc-human');

  /* ---------------- conversation ---------------- */
  function addMessage(who, html, plain){
    const row = document.createElement('div');
    row.className = 'hc-msg hc-msg-' + who;
    row.innerHTML = '<div class="hc-bubble-msg">' + html + '</div>';
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
    history.push({ who: who, text: plain != null ? plain : stripTags(html) });
    updateHandoff();
  }

  function stripTags(html){
    const d = document.createElement('div');
    d.innerHTML = String(html).replace(/<br\s*\/?>/gi, '\n');
    return (d.textContent || '').replace(/\n{3,}/g, '\n\n').trim();
  }

  /* a short delay before the reply: an instant answer to a typed question
     reads as a canned dump rather than a response */
  function botReply(html, chips){
    const typing = document.createElement('div');
    typing.className = 'hc-msg hc-msg-bot';
    typing.innerHTML = '<div class="hc-bubble-msg hc-typing"><span></span><span></span><span></span></div>';
    log.appendChild(typing);
    log.scrollTop = log.scrollHeight;
    setTimeout(()=>{
      typing.remove();
      addMessage('bot', html);
      renderChips(chips);
    }, 420);
  }

  function renderChips(ids){
    const list = (ids && ids.length ? ids : C.openingChips)
      .map(C.byId).filter(Boolean);
    chipsEl.innerHTML = list.map(i=>
      '<button type="button" class="hc-chip" data-intent="'+i.id+'">'+
        (lang === 'ar' ? i.q_ar : i.q)+'</button>'
    ).join('') +
      '<button type="button" class="hc-chip hc-chip-human" data-intent="__human">'+T.humanShort+'</button>';
  }

  function answerIntent(intent){
    botReply(lang === 'ar' ? intent.a_ar : intent.a, intent.chips);
  }

  /* The seam where a real model would go. Returning null keeps the current
     behaviour: an honest "I don't know" plus a handoff. */
  function sendToModel(/* text */){
    return null;
  }

  /* ---------------- guided appointment ----------------
     A short in-chat form rather than a link to visit.html: someone who has
     already started a conversation shouldn't be bounced to another page and
     made to begin again. Brands and showrooms come from js/visit-data.js, so
     the options here can never drift from the booking page's own list.
     The finished request goes to WhatsApp with the rest of the transcript —
     nothing is stored, and no appointment is confirmed by the assistant
     itself, which would be a promise the site can't keep. */
  const V = window.HeritageVisitConfig ? window.HeritageVisitConfig[lang] : null;
  const appt = { active:false, step:0, brand:null, brandLabel:'', room:null, roomLabel:'', day:'', time:'', name:'', phone:'', done:false };

  const APPT_TIMES = ['11:00','13:00','17:00','19:00'];

  function apptStart(){
    if(!V){ // booking data not loaded on this page — fall back to the page link
      botReply(T.apptUnavailable, ['human']);
      return;
    }
    appt.active = true; appt.step = 1;
    appt.brand = appt.room = null; appt.day = appt.time = appt.name = appt.phone = '';
    appt.done = false;
    botReply(T.apptBrand, null);
    setTimeout(()=> renderApptOptions(
      V.brandOrder.map(k=>({ value:k, label:V.showroomsByBrand[k].label }))
    ), 440);
  }

  function renderApptOptions(options){
    chipsEl.innerHTML = options.map(o=>
      '<button type="button" class="hc-chip" data-appt="'+escapeAttr(o.value)+'">'+escapeHtml(o.label)+'</button>'
    ).join('') + '<button type="button" class="hc-chip hc-chip-human" data-intent="__human">'+T.humanShort+'</button>';
  }

  function escapeAttr(s){ return String(s).replace(/"/g,'&quot;'); }

  function nextDays(n){
    const out = [], today = new Date();
    for(let i=1;i<=n;i++){
      const d = new Date(today.getTime() + i*86400000);
      const label = d.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-GB',
        { weekday:'short', day:'numeric', month:'short' });
      out.push({ value: d.toISOString().slice(0,10), label: label });
    }
    return out;
  }

  function apptChoose(value){
    if(appt.step === 1){
      appt.brand = value;
      appt.brandLabel = V.showroomsByBrand[value].label;
      addMessage('user', escapeHtml(appt.brandLabel));
      appt.step = 2;
      botReply(T.apptRoom, null);
      setTimeout(()=> renderApptOptions(
        V.showroomsByBrand[value].rooms.map(r=>({ value:r.key, label:r.label }))
      ), 440);
    } else if(appt.step === 2){
      const room = V.showroomsByBrand[appt.brand].rooms.filter(r=>r.key===value)[0];
      appt.room = value; appt.roomLabel = room ? room.label : value;
      addMessage('user', escapeHtml(appt.roomLabel));
      appt.step = 3;
      botReply(T.apptDay, null);
      setTimeout(()=> renderApptOptions(nextDays(5)), 440);
    } else if(appt.step === 3){
      appt.day = value;
      addMessage('user', escapeHtml(value));
      appt.step = 4;
      botReply(T.apptTime, null);
      setTimeout(()=> renderApptOptions(APPT_TIMES.map(t=>({ value:t, label:t }))), 440);
    } else if(appt.step === 4){
      appt.time = value;
      addMessage('user', escapeHtml(value));
      appt.step = 5;
      chipsEl.innerHTML = '';
      botReply(T.apptName, null);
      setTimeout(()=> input.focus(), 460);
    }
  }

  /* Light validation only. A stricter rule would reject legitimate formats
     (with or without +966, spaces, a leading 0) and the number is read by a
     person, not dialled by a machine — so the bar is "does this contain
     enough digits to be a phone number". */
  function looksLikePhone(v){
    // same rule as every form on the site — exactly 10 digits
    const ok = window.Heritage && window.Heritage.isValidPhone;
    if(ok) return ok(v);
    return String(v).replace(/[^0-9]/g, '').length === 10;
  }

  function apptName(name){
    appt.name = name;
    appt.step = 6;
    botReply(T.apptPhone, null);
    setTimeout(()=> input.focus(), 460);
  }

  function apptFinish(phone){
    if(!looksLikePhone(phone)){
      botReply(T.apptPhoneInvalid, null);
      return;                       // stay on step 6 and let them try again
    }
    appt.phone = phone.trim();
    appt.active = false;
    appt.done = true;

    recordAppointment();

    const summary = T.apptSummary
      .replace('{brand}', appt.brandLabel)
      .replace('{room}', appt.roomLabel)
      .replace('{day}', appt.day)
      .replace('{time}', appt.time)
      .replace('{name}', appt.name)
      .replace('{phone}', appt.phone);
    botReply(summary, ['human']);
  }

  /* Written to the same Google Sheet as the booking page, through the same
     helper, so a request started in the chat lands in the same place as one
     made on visit.html. `source` marks where it came from — otherwise the two
     are indistinguishable in the sheet and you cannot tell whether the chat is
     earning its place. */
  function recordAppointment(){
    const send = window.Heritage && window.Heritage.sendToSheet;
    const url = V && V.webhookUrl;
    if(!send || !url) return;
    send(url, {
      form:'visit',
      source:'chat',
      brand: appt.brandLabel,
      showroom: appt.roomLabel,
      showroomKey: appt.room || '',
      date: appt.day,
      time: appt.time,
      name: appt.name,
      phone: appt.phone,
      notes:'',
      language: lang,
      submittedAt: new Date().toISOString()
    });
  }

  function handleUserText(text){
    addMessage('user', escapeHtml(text));
    if(appt.active && appt.step === 5){ apptName(text); return; }
    if(appt.active && appt.step === 6){ apptFinish(text); return; }
    const intent = C.match(text, lang);
    if(intent){
      if(intent.id === 'booking'){ apptStart(); return; }
      answerIntent(intent);
      return;
    }
    const modelReply = sendToModel(text);
    if(modelReply){ botReply(modelReply, ['human']); return; }
    botReply(T.fallback, ['human']);
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, ch =>
      ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  /* ---------------- WhatsApp handoff ----------------
     The transcript travels in the wa.me text parameter. That parameter has to
     survive URL encoding, so the message is trimmed to the last exchanges —
     a long conversation would otherwise produce a link some clients refuse to
     open. The most recent messages are the ones that matter to whoever picks
     it up. */
  /* WhatsApp receives a SUMMARY, not the full log. A wall of transcript is
     slow to read on a phone and mostly repeats answers that came from this
     site anyway — what the colleague needs is who it is, what they want, and
     the booking details if there are any. Keeps the link short too. */
  function buildSummary(){
    const L = [];
    L.push(T.summaryHeader);

    if(appt.done){
      L.push('');
      L.push(T.sumBrand + ': ' + appt.brandLabel);
      L.push(T.sumRoom  + ': ' + appt.roomLabel);
      L.push(T.sumDate  + ': ' + appt.day);
      L.push(T.sumTime  + ': ' + appt.time);
      L.push(T.sumName  + ': ' + appt.name);
      L.push(T.sumPhone + ': ' + appt.phone);
      return L.join('\n');
    }

    // no booking: send what they actually asked, most recent first
    const asked = history.filter(h => h.who === 'user').slice(-3);
    if(asked.length){
      L.push('');
      L.push(T.sumAsked + ':');
      asked.forEach(a => L.push('• ' + a.text));
    }
    return L.join('\n');
  }

  function updateHandoff(){
    const url = 'https://wa.me/' + C.WHATSAPP + '?text=' + encodeURIComponent(buildSummary());
    humanBtn.setAttribute('href', url);
  }

  function goHuman(){
    updateHandoff();
    addMessage('bot', T.handoffNote);
    window.open(humanBtn.getAttribute('href'), '_blank', 'noopener');
  }

  /* ---------------- events ---------------- */
  function openChat(){
    openState = true;
    panel.hidden = false;
    root.classList.add('is-open');
    bubble.setAttribute('aria-expanded','true');
    if(!history.length){
      addMessage('bot', T.greeting);
      renderChips(null);
    }
    setTimeout(()=>input.focus(), 120);
  }
  function closeChat(){
    openState = false;
    panel.hidden = true;
    root.classList.remove('is-open');
    bubble.setAttribute('aria-expanded','false');
  }

  bubble.addEventListener('click', ()=> openState ? closeChat() : openChat());
  root.querySelector('.hc-close').addEventListener('click', closeChat);

  chipsEl.addEventListener('click', function(e){
    const a = e.target.closest('[data-appt]');
    if(a){ apptChoose(a.dataset.appt); return; }
    const b = e.target.closest('[data-intent]');
    if(!b) return;
    if(b.dataset.intent === '__human'){ goHuman(); return; }
    const intent = C.byId(b.dataset.intent);
    if(!intent) return;
    addMessage('user', escapeHtml(lang === 'ar' ? intent.q_ar : intent.q));
    if(intent.id === 'booking'){ apptStart(); return; }
    answerIntent(intent);
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const v = input.value.trim();
    if(!v) return;
    input.value = '';
    handleUserText(v);
  });

  humanBtn.addEventListener('click', function(e){
    e.preventDefault();
    goHuman();
  });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && openState) closeChat();
  });

  // expose for testing and for a future model integration
  window.HeritageChatWidget = {
    open: openChat, close: closeChat, history: history,
    ask: handleUserText, summary: buildSummary,
    startAppointment: apptStart, appointment: appt
  };
})();
