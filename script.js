(function () {
  var $ = function (s) { return document.querySelector(s); }, $$ = function (s) { return document.querySelectorAll(s); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Typing headline
  var words = ['slow?', 'not starting?', 'cracked?', 'overheating?'], w = 0, c = 0, del = false, el = $('#typed');
  function type() {
    var word = words[w]; el.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return setTimeout(type, 1400); }
    if (del && c === 0) { del = false; w = (w + 1) % words.length; }
    c += del ? -1 : 1; setTimeout(type, del ? 45 : 90);
  }
  reduce ? el.textContent = words[0] : type();

  // Terminal animation
  var lines = ['> scanning laptop...', '> battery .......... check', '> disk ............. check', '> fans ............. dusty', '> software ......... slow', '> ready: call 985-7078013'];
  var term = $('#term'), li = 0;
  function run() {
    if (li >= lines.length) return setTimeout(function () { term.textContent = ''; li = 0; run(); }, 3500);
    term.textContent += lines[li++] + '\n'; setTimeout(run, 800);
  }
  reduce ? term.textContent = lines.join('\n') : run();

  // Page switching (one page at a time)
  var pages = $$('.page'), links = $$('nav a'), m = $('#menu'), b = $('#burger');
  function show() {
    var id = location.hash.slice(1);
    if (!document.getElementById(id) || !document.getElementById(id).classList.contains('page')) id = 'home';
    pages.forEach(function (p) {
      var on = p.id === id; p.classList.toggle('active', on);
      if (on) p.querySelectorAll('.card,.pcard,.tile').forEach(function (n, i) { n.style.setProperty('--i', i); });
    });
    links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + id); });
    m.classList.remove('open'); b.setAttribute('aria-expanded', false);
    window.scrollTo(0, 0);
  }
  addEventListener('hashchange', show); show();

  // Duplicate photo strip for a seamless loop
  var tr = $('#track'); tr.innerHTML += tr.innerHTML;

  // Mobile menu
  b.addEventListener('click', function () { var o = m.classList.toggle('open'); b.setAttribute('aria-expanded', o); });

  // Selling filter
  $('#chips').addEventListener('click', function (e) {
    var t = e.target.closest('.chip'); if (!t) return;
    $$('.chip').forEach(function (x) { x.classList.toggle('on', x === t); });
    var n = 0;
    $$('#shop .pcard').forEach(function (p) {
      var ok = t.dataset.f === 'all' || p.dataset.c === t.dataset.f;
      p.classList.toggle('hide', !ok);
      if (ok) { p.style.setProperty('--i', n++); p.style.animation = 'none'; p.offsetWidth; p.style.animation = ''; }
    });
  });

  // Contact form -> text message
  $('#form').addEventListener('submit', function (e) {
    e.preventDefault(); var f = e.target;
    location.href = 'sms:9857078013?body=' + encodeURIComponent('Hi, I am ' + f.name.value + '. ' + f.msg.value);
  });
  $('#yr').textContent = new Date().getFullYear();
})();
