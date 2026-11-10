/* ==========================================================
   KulKid – homepage úpravy
   ========================================================== */
(function () {

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
  var GUIDE_IMG = 'https://cdn.myshoptet.com/usr/appgrade.myshoptet.com/user/banners/1320x632-2-2.jpg';
  function guideResultUrl(a) {
    // a.pro, a.vek, a.cil, a.cena – zde později doplnit logiku doporučení
    return '/connetix/';
  }
  var GUIDE_Q = [
    { k: 'pro',  t: 'Pro koho vybíráte?',   s: 'Pro koho vybíráte',   o: ['Pro kluka', 'Pro holku', 'Pro všechny – bez preference'] },
    { k: 'vek',  t: 'Kolik je dítěti let?', s: 'Kolik je dítěti let', o: ['2–5 let', '6–12 let'] },
    { k: 'cil',  t: 'Co hledáte?',          s: 'Co hledáte',          o: ['První stavebnici', 'Rozšíření stavebnice', 'Doplněk ke stavebnici'] },
    { k: 'cena', t: 'Jaký máte rozpočet?',  s: 'Váš rozpočet',        o: ['Do 1 500 Kč', '1 500–3 000 Kč', 'Nad 3 000 Kč', 'Bez omezení'] }
  ];

  // 5) Hlavička
  var HEADER_PROMO = 'Sleva <strong>15 %</strong> na celý nákup s kódem <strong>NAROZENINY</strong>';
  var HEADER_USP = ['Doprava zdarma nad 3 000 Kč', 'Odesíláme do 24 hodin'];
  var HEADER_PHONE = '+420 775 670 500';
  var HEADER_HOURS = 'Po–Pá 9–17';
  var HEADER_SEARCH = 'Hledejte stavebnici, značku nebo věk dítěte…';
  var HEADER_HOT = ['Akce']; // položky menu zvýrazněné terakotovou „pilulkou“

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
    var Q = GUIDE_Q, ans = {}, step = 0;

    var sec = document.createElement('div');
    sec.className = 'kk-guide';
    sec.id = 'pruvodce';
    sec.innerHTML = '<div class="kk-guide__box"><div class="kk-guide__panel"></div><div class="kk-guide__img"><img src="' + GUIDE_IMG + '" alt="Průvodce výběrem stavebnice" loading="lazy"></div></div>';
    var panel = sec.querySelector('.kk-guide__panel');

    function intro() {
      var li = Q.map(function (q, i) { return '<li><span>' + (i + 1) + '</span>' + q.s + '</li>'; }).join('');
      panel.innerHTML =
        '<h2>Nevíte, kterou sadu koupit jako první?</h2>' +
        '<p class="kk-guide__lead">Odpovězte na 4 krátké otázky a doporučíme vám konkrétní sadu – i to, čím ji později rozšířit.</p>' +
        '<ol class="kk-guide__steps">' + li + '</ol>' +
        '<div class="kk-guide__btns"><button type="button" class="kk-btn kk-btn--pri" data-go>Otevřít průvodce</button></div>';
      panel.querySelector('[data-go]').onclick = function () { step = 0; ans = {}; question(); };
    }
    function question() {
      var q = Q[step];
      var opts = q.o.map(function (o) {
        return '<button type="button"' + (ans[q.k] === o ? ' class="is-sel"' : '') + '>' + o + '</button>';
      }).join('');
      panel.innerHTML =
        '<div class="kk-guide__meta">Otázka ' + (step + 1) + ' ze ' + Q.length +
        '<span class="kk-guide__bar"><i style="width:' + ((step + 1) / Q.length * 100) + '%"></i></span></div>' +
        '<h3>' + q.t + '</h3><div class="kk-guide__opts">' + opts + '</div>' +
        '<button type="button" class="kk-guide__back">&larr; Zpět</button>';
      [].forEach.call(panel.querySelectorAll('.kk-guide__opts button'), function (b) {
        b.onclick = function () {
          ans[q.k] = b.textContent;
          step++;
          if (step < Q.length) question(); else result();
        };
      });
      panel.querySelector('.kk-guide__back').onclick = function () {
        if (step === 0) intro(); else { step--; question(); }
      };
    }
    function result() {
      window.kkGuideAnswers = ans;
      var sum = Q.map(function (q) { return '<span>' + ans[q.k] + '</span>'; }).join('');
      panel.innerHTML =
        '<div class="kk-guide__meta">Hotovo<span class="kk-guide__bar"><i style="width:100%"></i></span></div>' +
        '<h3>Díky! Podle vašich odpovědí vám ukážeme vhodné sady.</h3>' +
        '<div class="kk-guide__sum">' + sum + '</div>' +
        '<div class="kk-guide__btns"><a class="kk-btn kk-btn--pri" href="' + guideResultUrl(ans) + '">Zobrazit doporučené sady</a>' +
        '<button type="button" class="kk-btn kk-btn--sec" data-reset>Začít znovu</button></div>';
      panel.querySelector('[data-reset]').onclick = function () { step = 0; ans = {}; question(); };
    }
    intro();

    var blocks = document.querySelectorAll('.products-block');
    if (blocks.length) blocks[blocks.length - 1].insertAdjacentElement('afterend', sec);
    else {
      sec.classList.add('container');
      (document.getElementById('content') || document.querySelector('.content-wrapper') || document.body).appendChild(sec);
    }
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
      // přihlášení
      var login = btns.querySelector('.top-nav-button-login');
      if (login) {
        var logged = document.body.classList.contains('user-logged-in') || !!document.querySelector('.top-nav-button-account');
        login.insertAdjacentHTML('beforeend', '<span class="kk-hlogin">' + svg.user + '<span><b>' + (logged ? 'Můj účet' : 'Přihlásit') + '</b><small>Moje objednávky</small></span></span>');
      }
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

  /* ===================== SPUŠTĚNÍ ===================== */
  function run(fn, name) {
    try { fn(); } catch (e) { console.error('KulKid ' + name + ':', e); }
  }
  function init() {
    run(header, 'hlavička');
    if (!document.body.classList.contains('type-index')) return;
    run(ageStrip, 'věk');
    run(productCards, 'karty');
    run(guide, 'průvodce');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
