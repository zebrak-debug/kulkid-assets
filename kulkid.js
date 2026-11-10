/* ==========================================================
   KulKid – homepage úpravy
   ========================================================== */
(function () {

  // adresa tohoto skriptu – podle ní se načte pruvodce.js ze stejného místa (vč. verze/?v=)
  var SELF_SRC = (document.currentScript && document.currentScript.src) || 'https://cdn.jsdelivr.net/gh/zebrak-debug/kulkid-assets@main/kulkid.js';

  /* ===================== NASTAVENÍ ===================== */

  // 1) Vyberte podle věku – odkazy
  var AGE_LINKS = [
    { num: '1–2', label: 'roky', url: '/hracky-1-2-roky/' },
    { num: '2–3', label: 'roky', url: '/hracky-2-3-roky/' },
    { num: '3–5', label: 'let',  url: '/hracky-3-5-let/' },
    { num: '5–7', label: 'let',  url: '/hracky-5-7-let/' },
    { num: '7+',  label: 'let',  url: '/hracky-7-let/' }
  ];
  var GIFT_LINKS = [
    { label: 'Dárek do 1 000 Kč', url: '/male-darky/' },
    { label: 'První stavebnice',  url: '/na-zacatek/' }
  ];

  // 6) Karta produktu
  var SHIP_FREE_FROM = 3000;              // od této ceny „Doprava zdarma“
  var SHIP_FROM_TEXT = 'Doprava od 79 Kč';
  var AV_RENAME = { 'Máme skladem ihned k odeslání': 'Skladem — ihned k odeslání' };

  // 4) Průvodce výběrem
  var GUIDE_IMG = '/user/documents/upload/pr%C5%AFvodce.png'; // průvodce.png ve správci souborů
  var GUIDE_PAGE = '/pruvodce-vyberem/'; // stránka s <div id="kk-guide"></div> – výsledky počítá pruvodce.js
  function guideResultUrl(v) {
    // v = kódy odpovědí { kdo, vek, typ, rozp, prio }
    return GUIDE_PAGE + '?' + Object.keys(v).map(function (k) { return k + '=' + encodeURIComponent(v[k]); }).join('&');
  }
  var GUIDE_Q = [
    { k: 'kdo',  t: 'Pro koho vybíráte?',   s: 'Pro koho vybíráte',   o: ['Pro kluka', 'Pro holku', 'Pro všechny – bez preference'], v: ['kluk', 'holka', 'vse'] },
    { k: 'vek',  t: 'Kolik je dítěti let?', s: 'Kolik je dítěti let', o: ['2–5 let', '6–12 let'], v: ['mlad', 'star'] },
    { k: 'typ',  t: 'Co hledáte?',          s: 'Co hledáte',          o: ['První stavebnici', 'Rozšíření stavebnice', 'Doplněk ke stavebnici'], v: ['prvni', 'rozsireni', 'doplnek'] },
    { k: 'rozp', t: 'Jaký máte rozpočet?',  s: 'Váš rozpočet',        o: ['Do 1 500 Kč', '1 500–3 000 Kč', 'Nad 3 000 Kč', 'Bez omezení'], v: ['r1', 'r2', 'r3', 'r0'] },
    { k: 'prio', t: 'Co je pro vás při výběru nejdůležitější?', s: 'Co je pro vás nejdůležitější', o: ['Co nejsilnější magnety', 'Příznivá cena', 'Nemám preferenci'], v: ['magnety', 'cena', 'vse'] }
  ];

  // 5) Hlavička
  var HEADER_PROMO = 'Sleva <strong>15 %</strong> na celý nákup s kódem <strong>NAROZENINY</strong>';
  var HEADER_USP = ['Doprava zdarma nad 3 000 Kč', 'Odesíláme do 24 hodin'];
  var HEADER_PHONE = '+420 775 670 500';
  var HEADER_HOURS = 'Po–Pá 9–17';
  var HEADER_SEARCH = 'Hledejte stavebnici, značku nebo věk dítěte…';
  var HEADER_HOT = ['Akce']; // položky menu zvýrazněné terakotovou „pilulkou“

  // 7) Patička
  var FOOTER_INFO_TITLE = 'Informace pro vás'; // odkazy se berou z Shoptetu (Vzhled a obsah → Patička → Informace pro vás)
  var FOOTER_INFO_SKIP = ['Blog', 'Kontakty'];  // tyhle jsou ve sloupci Spolupráce
  var FOOTER_INFO_EXTRA = [{ label: 'Moje objednávky', url: '/klient/objednavky/' }];
  var FOOTER_COOP = [
    { label: 'Velkoobchodní spolupráce', url: '/velkoobchod/' },
    { label: 'Blog', url: '/blog/' },
    { label: 'Kontakt', url: '/kontakty/' }
  ];
  var FOOTER_CTA = { title: 'Máte dotaz k výběru?', label: 'Napsat nám', url: '/kontakty/' };
  var FOOTER_BADGES = [
    { title: 'Přijímáme online platby', items: ['GoPay', 'VISA', 'Mastercard'] },
    { title: 'Způsoby dopravy', mobileTitle: 'Doprava', items: ['Zásilkovna', 'PPL'] },
    { title: 'Ověřeno zákazníky', items: [{ label: 'Heureka 5,0 ★', url: '' }] }
  ];
  var FOOTER_COPY = '© ' + new Date().getFullYear() + ' KulKid. Všechna práva vyhrazena.';

  /* ===================== 1) VYBERTE PODLE VĚKU ===================== */
  function ageStrip() {
    var c = document.getElementById('carousel');
    if (!c || document.querySelector('.kk-age')) return;
    var anchor = c.closest('[class*="col-"]') || c;
    var html = '<div class="kk-age"><div class="kk-age__in"><span class="kk-age__label">Vyberte podle věku:</span>';
    AGE_LINKS.forEach(function (l) {
      html += '<a href="' + l.url + '"><span class="kk-age__num">' + l.num + '</span>' + l.label + '</a>';
    });
    html += '<span class="kk-age__sep"></span>';
    GIFT_LINKS.forEach(function (l) {
      html += '<a class="kk-age__gift" href="' + l.url + '">' + l.label + '</a>';
    });
    html += '</div></div>';
    anchor.insertAdjacentHTML('afterend', html);
  }

  /* ===================== 6) KARTA PRODUKTU ===================== */
  function productCards() {
    [].forEach.call(document.querySelectorAll('.products-block .product'), function (p) {
      if (p.classList.contains('kk-card')) return;
      p.classList.add('kk-card');

      var av = p.querySelector('.availability');
      if (av) {
        var s = av.querySelector('span');
        var t = s ? s.textContent.trim() : '';
        if (s && AV_RENAME[t]) s.textContent = AV_RENAME[t];
        var low = t.toLowerCase();
        if (/nedostupn|vyprodan/.test(low)) av.classList.add('kk-av--out');
        else if (!/^(máme )?skladem( ihned)?/.test(low)) av.classList.add('kk-av--wait');
      }

      var offer = p.querySelector('[data-micro="offer"]');
      var prices = p.querySelector('.prices');
      if (offer && prices && !p.querySelector('.kk-ship')) {
        var price = parseFloat(offer.getAttribute('data-micro-price')) || 0;
        var ship = document.createElement('div');
        ship.className = 'kk-ship';
        ship.textContent = price >= SHIP_FREE_FROM ? 'Doprava zdarma' : SHIP_FROM_TEXT;
        prices.insertAdjacentElement('afterend', ship);
      }
    });
  }

  /* ===================== 4) PRŮVODCE VÝBĚREM ===================== */
  function guide() {
    if (document.querySelector('.kk-guide')) return;
    var Q = GUIDE_Q, ans = {}, val = {}, step = 0;

    var sec = document.createElement('div');
    sec.className = 'kk-guide';
    sec.id = 'pruvodce';
    sec.innerHTML = '<div class="kk-guide__box"><div class="kk-guide__panel"></div><div class="kk-guide__img"><img src="' + GUIDE_IMG + '" alt="Průvodce výběrem stavebnice" loading="lazy"></div></div>';
    var panel = sec.querySelector('.kk-guide__panel');

    function intro() {
      var li = Q.map(function (q, i) { return '<li><span>' + (i + 1) + '</span>' + q.s + '</li>'; }).join('');
      panel.innerHTML =
        '<h2>Nevíte, kterou sadu koupit jako první?</h2>' +
        '<p class="kk-guide__lead">Odpovězte na ' + Q.length + ' krátkých otázek a doporučíme vám konkrétní sadu – i to, čím ji později rozšířit.</p>' +
        '<ol class="kk-guide__steps">' + li + '</ol>' +
        '<div class="kk-guide__btns"><button type="button" class="kk-btn kk-btn--pri" data-go>Otevřít průvodce</button></div>';
      panel.querySelector('[data-go]').onclick = function () { step = 0; ans = {}; val = {}; question(); };
    }
    function question() {
      var q = Q[step];
      var opts = q.o.map(function (o, i) {
        return '<button type="button" data-i="' + i + '"' + (ans[q.k] === o ? ' class="is-sel"' : '') + '>' + o + '</button>';
      }).join('');
      panel.innerHTML =
        '<div class="kk-guide__meta">Otázka ' + (step + 1) + ' ze ' + Q.length +
        '<span class="kk-guide__bar"><i style="width:' + ((step + 1) / Q.length * 100) + '%"></i></span></div>' +
        '<h3>' + q.t + '</h3><div class="kk-guide__opts">' + opts + '</div>' +
        '<button type="button" class="kk-guide__back">&larr; Zpět</button>';
      [].forEach.call(panel.querySelectorAll('.kk-guide__opts button'), function (b) {
        b.onclick = function () {
          ans[q.k] = b.textContent;
          val[q.k] = q.v[+b.getAttribute('data-i')];
          step++;
          if (step < Q.length) question(); else result();
        };
      });
      panel.querySelector('.kk-guide__back').onclick = function () {
        if (step === 0) intro(); else { step--; question(); }
      };
    }
    function result() {
      window.kkGuideAnswers = val;
      var sum = Q.map(function (q) { return '<span>' + ans[q.k] + '</span>'; }).join('');
      panel.innerHTML =
        '<div class="kk-guide__meta">Hotovo<span class="kk-guide__bar"><i style="width:100%"></i></span></div>' +
        '<h3>Díky! Podle vašich odpovědí vám ukážeme vhodné sady.</h3>' +
        '<div class="kk-guide__sum">' + sum + '</div>' +
        '<div class="kk-guide__btns"><a class="kk-btn kk-btn--pri" href="' + guideResultUrl(val) + '">Zobrazit doporučené sady</a>' +
        '<button type="button" class="kk-btn kk-btn--sec" data-reset>Začít znovu</button></div>';
      panel.querySelector('[data-reset]').onclick = function () { step = 0; ans = {}; val = {}; question(); };
    }
    intro();

    // mezi první a druhý výpis produktů
    var blocks = document.querySelectorAll('.products-block');
    if (blocks.length) blocks[0].insertAdjacentElement('afterend', sec);
    else {
      sec.classList.add('container');
      (document.getElementById('content') || document.querySelector('.content-wrapper') || document.body).appendChild(sec);
    }
  }

  /* ===================== 4b) PRŮVODCE – STRÁNKA ===================== */
  // na stránce s <div id="kk-guide"></div> dotáhne pruvodce.js (data 151 produktů se tak nenačítají jinde)
  function guidePage() {
    if (!document.getElementById('kk-guide') || window.kkGuidePageLoaded) return;
    window.kkGuidePageLoaded = true;
    var s = document.createElement('script');
    s.src = SELF_SRC.replace(/kulkid(\.min)?\.js/, 'pruvodce.js');
    document.body.appendChild(s);
  }

  /* ===================== 5) HLAVIČKA ===================== */
  function header() {
    if (document.querySelector('.kk-promo')) return;
    var svg = {
      gift: '<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12M12 8S10.5 4 8 4.5 7.5 8 12 8zM12 8s1.5-4 4-3.5S16.5 8 12 8z"/></svg>',
      truck: '<svg viewBox="0 0 24 24"><path d="M3 6h11v10H3z"/><path d="M14 9h4l3 3.5V16h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>',
      clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
      phone: '<svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
      user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>'
    };

    // promo lišta
    var promo = document.createElement('div');
    promo.className = 'kk-promo';
    promo.innerHTML = '<div class="kk-promo__in"><span class="kk-promo__l">' + svg.gift + '<span>' + HEADER_PROMO + '</span></span>' +
      '<span class="kk-promo__r">' + HEADER_USP.map(function (t, i) { return '<span>' + (i ? svg.clock : svg.truck) + '<span>' + t + '</span></span>'; }).join('') + '</span></div>';
    var hdr = document.getElementById('header');
    if (hdr) hdr.parentElement.insertBefore(promo, hdr);
    else document.body.insertBefore(promo, document.body.firstChild);

    var btns = document.querySelector('#header .navigation-buttons');
    if (btns) {
      // telefon
      btns.insertAdjacentHTML('afterbegin', '<a class="kk-hcontact" href="tel:' + HEADER_PHONE.replace(/\s/g, '') + '">' + svg.phone +
        '<span><b>' + HEADER_PHONE + '</b><small>' + HEADER_HOURS + '</small></span></a>');
      // přihlášení – Shoptet tlačítko po načtení překresluje, proto hlídáme a doplňujeme znovu
      var decorateLogin = function () {
        var login = btns.querySelector('.top-nav-button-login, .top-nav-button-account');
        if (!login || login.querySelector('.kk-hlogin')) return;
        var logged = document.body.classList.contains('user-logged-in') || login.classList.contains('top-nav-button-account');
        login.insertAdjacentHTML('beforeend', '<span class="kk-hlogin">' + svg.user + '<span><b>' + (logged ? 'Můj účet' : 'Přihlásit') + '</b><small>Moje objednávky</small></span></span>');
      };
      decorateLogin();
      if (window.MutationObserver) new MutationObserver(decorateLogin).observe(btns, { childList: true, subtree: true });
      window.addEventListener('load', decorateLogin);
      // košík
      var cart = btns.querySelector('.click-cart a');
      if (cart && !cart.querySelector('.kk-cart-label')) cart.insertAdjacentHTML('beforeend', '<span class="kk-cart-label">Košík</span>');
    }

    // okno košíku / přihlášení – zarovnat pod bílý řádek hlavičky
    function placePopups() {
      if (window.innerWidth < 992) return;
      var ht = document.querySelector('#header .header-top');
      if (!ht) return;
      var top = Math.round(ht.getBoundingClientRect().bottom + window.pageYOffset);
      [].forEach.call(document.querySelectorAll('.user-action .popup-widget'), function (p) {
        p.style.setProperty('top', top + 'px', 'important');
      });
    }
    placePopups();
    window.addEventListener('resize', placePopups);
    window.addEventListener('load', placePopups);
    document.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('.toggle-window')) placePopups();
    }, true);
    [].forEach.call(document.querySelectorAll('#header .click-cart a, #header .top-nav-button-login'), function (el) {
      el.addEventListener('mouseenter', placePopups);
    });

    // vyhledávání – placeholder
    var s = document.querySelector('#header .search .query-input');
    if (s) s.setAttribute('placeholder', HEADER_SEARCH);

    // menu – zvýraznění položky a odkaz na průvodce
    [].forEach.call(document.querySelectorAll('#header .menu-level-1>li>a'), function (a) {
      if (HEADER_HOT.indexOf(a.textContent.trim()) > -1) a.parentElement.classList.add('kk-hot');
    });
    var menu = document.querySelector('#header .menu-level-1');
    if (menu && menu.parentElement) {
      var g = document.createElement('a');
      g.className = 'kk-guide-link';
      g.href = '/#pruvodce';
      g.textContent = 'Průvodce výběrem';
      g.addEventListener('click', function (e) {
        var t = document.getElementById('pruvodce');
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
      menu.parentElement.style.display = 'flex';
      menu.parentElement.appendChild(g);
    }
  }

  /* ===================== 7) PATIČKA ===================== */
  function footer() {
    var f = document.getElementById('footer');
    if (!f || f.querySelector('.kk-foot')) return;
    var ic = {
      mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/></svg>',
      phone: '<svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
      facebook: '<svg viewBox="0 0 24 24" class="kk-fill"><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21z"/></svg>',
      instagram: '<svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" class="kk-fill"/></svg>',
      chev: '<svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>'
    };
    function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function list(items) {
      return '<ul>' + items.map(function (l) { return '<li><a href="' + esc(l.url) + '">' + esc(l.label) + '</a></li>'; }).join('') + '</ul>';
    }
    function col(title, body, acc) {
      return '<div class="kk-foot__col' + (acc ? ' kk-foot__acc' : '') + '">' +
        '<h3 class="kk-foot__h">' + (acc ? '<button type="button" aria-expanded="false">' + esc(title) + ic.chev + '</button>' : esc(title)) + '</h3>' +
        '<div class="kk-foot__body">' + body + '</div></div>';
    }

    // kontakt a sítě – z kontaktního boxu Shoptetu
    var mailA = f.querySelector('[data-testid="contactboxEmail"] a, .contact-box .mail a');
    var mail = mailA ? mailA.textContent.replace(/\s/g, '') : 'hello@kulkid.cz';
    var social = [];
    ['facebook', 'instagram'].forEach(function (k) {
      var a = f.querySelector('.contact-box-icon .' + k + ' a');
      if (a) social.push('<a class="kk-foot__soc" href="' + esc(a.href) + '" target="_blank" rel="noopener" aria-label="' + k + '">' + ic[k] + '</a>');
    });

    // Informace pro vás – články z patičky Shoptetu
    var info = [];
    [].forEach.call(f.querySelectorAll('.custom-footer__articles a'), function (a) {
      var t = a.textContent.trim();
      if (FOOTER_INFO_SKIP.indexOf(t) < 0) info.push({ label: t, url: a.getAttribute('href') });
    });
    info = info.concat(FOOTER_INFO_EXTRA);

    var contact = '<ul class="kk-foot__contact">' +
      '<li>' + ic.mail + '<a href="mailto:' + esc(mail) + '">' + esc(mail) + '</a></li>' +
      '<li>' + ic.phone + '<a href="tel:' + HEADER_PHONE.replace(/\s/g, '') + '">' + esc(HEADER_PHONE) + '</a><span class="kk-foot__hours-m"> · ' + esc(HEADER_HOURS) + '</span></li>' +
      '<li class="kk-foot__hours">' + esc(HEADER_HOURS) + '</li></ul>';

    var follow = (social.length ? '<div class="kk-foot__socs">' + social.join('') + '</div>' : '');
    var cta = '<h3 class="kk-foot__h kk-foot__h--cta">' + esc(FOOTER_CTA.title) + '</h3>' +
      '<a class="kk-foot__btn" href="' + esc(FOOTER_CTA.url) + '">' + esc(FOOTER_CTA.label) + '</a>';

    var badges = FOOTER_BADGES.map(function (g) {
      return '<div class="kk-foot__bgroup"><h3 class="kk-foot__h"><span class="kk-d">' + esc(g.title) + '</span><span class="kk-m">' + esc(g.mobileTitle || g.title) + '</span></h3><div class="kk-foot__pills">' +
        g.items.map(function (it) {
          var o = typeof it === 'string' ? { label: it } : it;
          return o.url ? '<a class="kk-foot__pill" href="' + esc(o.url) + '" target="_blank" rel="noopener">' + esc(o.label) + '</a>' : '<span class="kk-foot__pill">' + esc(o.label) + '</span>';
        }).join('') + '</div></div>';
    }).join('');

    var wrap = document.createElement('div');
    wrap.className = 'kk-foot';
    wrap.innerHTML = '<div class="container">' +
      '<div class="kk-foot__cols">' +
        col('Kontakt', contact, false).replace('kk-foot__col"', 'kk-foot__col kk-foot__col--contact"') +
        col(FOOTER_INFO_TITLE, list(info), true) +
        col('Spolupráce', list(FOOTER_COOP), true) +
        '<div class="kk-foot__col kk-foot__col--follow"><div class="kk-foot__acc">' +
          '<h3 class="kk-foot__h"><button type="button" aria-expanded="false">Sledujte nás' + ic.chev + '</button></h3>' +
          '<div class="kk-foot__body">' + follow + cta + '</div></div></div>' +
      '</div>' +
      '<div class="kk-foot__badges">' + badges + '</div>' +
      '<div class="kk-foot__bottom"><span class="kk-foot__copy">' + esc(FOOTER_COPY) +
        ' <a href="#" class="kk-foot__cookies">Nastavení cookies</a></span><span class="kk-foot__sig"></span></div>' +
    '</div>';
    f.insertBefore(wrap, f.firstChild);
    f.classList.add('kk-footer');

    // podpis Shoptetu (povinný) přesunout do spodního řádku
    var sig = document.getElementById('signature');
    if (sig) wrap.querySelector('.kk-foot__sig').appendChild(sig);
    // nastavení cookies – původní odkaz Shoptetu
    wrap.querySelector('.kk-foot__cookies').addEventListener('click', function (e) {
      e.preventDefault();
      var c = f.querySelector('.js-cookies-settings');
      if (c) c.click();
    });

    // mobil – rozbalovací sekce
    [].forEach.call(wrap.querySelectorAll('.kk-foot__acc button'), function (b) {
      b.addEventListener('click', function () {
        var box = b.closest('.kk-foot__acc');
        var open = !box.classList.contains('is-open');
        box.classList.toggle('is-open', open);
        b.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }

  /* ===================== SPUŠTĚNÍ ===================== */
  function run(fn, name) {
    try { fn(); } catch (e) { console.error('KulKid ' + name + ':', e); }
  }
  function init() {
    run(header, 'hlavička');
    run(footer, 'patička');
    run(guidePage, 'průvodce – stránka');
    if (!document.body.classList.contains('type-index')) return;
    run(ageStrip, 'věk');
    run(productCards, 'karty');
    run(guide, 'průvodce');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
