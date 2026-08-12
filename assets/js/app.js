(function () {
  'use strict';

  var STORE = { entries: 'scalplog.entries', routine: 'scalplog.routine' };

  var entries = read(STORE.entries, []);
  var routine = read(STORE.routine, {});
  var selectedDay = today();

  function read(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; }
    catch (e) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* private mode */ }
  }

  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

  function today() { return iso(new Date()); }
  function iso(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function parse(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function svg(name, stroke) {
    var fill = stroke ? 'none' : 'currentColor';
    var extra = stroke ? ' fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' : ' fill="' + fill + '"';
    return '<svg viewBox="0 0 24 24"' + extra + ' aria-hidden="true">' + ICONS[name] + '</svg>';
  }

  function entryFor(date) {
    for (var i = 0; i < entries.length; i++) { if (entries[i].date === date) return entries[i]; }
    return null;
  }

  function mean(list) {
    if (!list.length) return 0;
    var sum = 0;
    for (var i = 0; i < list.length; i++) sum += list[i];
    return sum / list.length;
  }

  function toast(message) {
    var el = $('#toast');
    el.textContent = message;
    el.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.hidden = true; }, 2200);
  }

  /* ------------------------------------------------------------------
     Header
  ------------------------------------------------------------------ */

  function renderHeader() {
    var now = new Date();
    var hour = now.getHours();
    var greeting = hour < 5 ? 'Still up' : hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

    $('#headerDate').textContent = now.toLocaleDateString(undefined, {
      weekday: 'long', day: 'numeric', month: 'long'
    });
    $('#headerGreeting').textContent = greeting;

    $('#streakCount').textContent = streak();
    $('#streakBadge').hidden = !!entryFor(today());
  }

  /* Consecutive days logged, counting back from today. A gap ends it. */
  function streak() {
    var count = 0;
    var cursor = new Date();
    if (!entryFor(iso(cursor))) cursor.setDate(cursor.getDate() - 1);
    while (entryFor(iso(cursor))) {
      count++;
      cursor.setDate(cursor.getDate() - 1);
    }
    return count;
  }

  /* ------------------------------------------------------------------
     Day strip
  ------------------------------------------------------------------ */

  function renderDayStrip() {
    var strip = $('#dayStrip');
    var html = '';

    for (var back = 6; back >= 0; back--) {
      var d = new Date();
      d.setDate(d.getDate() - back);
      var key = iso(d);
      var entry = entryFor(key);
      var active = key === selectedDay;
      var dow = d.toLocaleDateString(undefined, { weekday: 'short' }).toUpperCase();

      if (active) {
        var orb = entry
          ? '<span class="day-orb">' + entry.severity + '</span>'
          : '<span class="day-orb is-empty">&ndash;</span>';
        html += '<button class="day is-active" data-day="' + key + '" type="button">' + orb +
          '<span class="day-meta"><span class="day-dow">' + dow + '</span>' +
          '<span class="day-num">' + (entry ? 'Severity logged' : 'Nothing yet') + '</span></span></button>';
      } else {
        html += '<button class="day' + (entry ? ' is-logged' : '') + '" data-day="' + key + '" type="button">' +
          '<span class="day-dow">' + dow + '</span>' +
          '<span class="day-num">' + d.getDate() + '</span></button>';
      }
    }

    strip.innerHTML = html;
    var current = strip.querySelector('.is-active');
    if (current) current.scrollIntoView({ inline: 'center', block: 'nearest' });
  }

  /* ------------------------------------------------------------------
     Hero
  ------------------------------------------------------------------ */

  function renderHero() {
    var entry = entryFor(selectedDay);
    var isToday = selectedDay === today();
    var label = isToday ? 'today' : parse(selectedDay).toLocaleDateString(undefined, { day: 'numeric', month: 'long' });

    $('#heroIcon').innerHTML = svg(entry ? 'clear' : 'spark', true);

    if (!entry) {
      $('#heroPill').textContent = 'Not logged';
      $('#heroPill').className = 'pill';
      $('#heroTitle').textContent = isToday ? 'Nothing logged today' : 'No entry for ' + label;
      $('#heroSub').textContent = isToday
        ? 'Tap the red button below. It takes about a minute.'
        : 'You can still backfill this day from the log sheet.';
      $('#heroBento').innerHTML = '';
      $('#heroNotice').innerHTML = '';
      return;
    }

    var band = entry.severity >= 7 ? 'Flaring' : entry.severity >= 4 ? 'Grumbling' : 'Settled';
    $('#heroPill').textContent = band;
    $('#heroPill').className = 'pill' + (entry.severity >= 7 ? ' is-alert' : '');
    $('#heroTitle').textContent = entry.product ? entry.product : 'Logged for ' + label;
    $('#heroSub').textContent = entry.notes || (entry.triggers && entry.triggers.length
      ? 'Flagged: ' + entry.triggers.join(', ')
      : 'No triggers flagged on this day.');

    $('#heroBento').innerHTML =
      bento('Flaking', entry.severity) +
      bento('Itch', entry.itch);

    $('#heroNotice').innerHTML = advice(entry);
  }

  function bento(title, value) {
    return '<div class="bento-card"><p class="label">' + title + '</p>' +
      '<p class="bento-val"><span class="bento-orb">' + value + '</span>out of 10</p></div>';
  }

  /* Contextual, not decorative — each line only appears when it applies. */
  function advice(entry) {
    if (entry.severity >= 7) {
      return '<strong>Bad day.</strong> If this is the third week without movement, the useful next step is ' +
        'asking for a rung further up the ladder rather than another product at the same level.';
    }
    if (entry.triggers && entry.triggers.length >= 3) {
      return '<strong>Several triggers at once.</strong> Hard to attribute anything on a day like this. ' +
        'The Trends tab compares tagged days against untagged ones once you have enough of both.';
    }
    if (entry.severity <= 3) {
      return '<strong>A good day is data too.</strong> What you did in the three days before this one is ' +
        'usually more informative than what you did today.';
    }
    return '';
  }

  /* ------------------------------------------------------------------
     Routine
  ------------------------------------------------------------------ */

  function renderRoutine() {
    var done = routine[selectedDay] || {};
    var count = 0;

    $('#routineList').innerHTML = ROUTINE.map(function (task) {
      var isDone = !!done[task.id];
      if (isDone) count++;
      return '<li class="item' + (isDone ? ' is-done' : '') + '">' +
        '<span class="item-ico">' + svg(task.icon, task.icon !== 'drop' && task.icon !== 'shield') + '</span>' +
        '<div class="item-body">' +
          '<p class="item-title">' + esc(task.title) + '</p>' +
          '<p class="item-sub">' + esc(task.detail) + '</p>' +
        '</div>' +
        '<button class="check" data-task="' + task.id + '" type="button" ' +
          'aria-pressed="' + isDone + '" aria-label="Mark ' + esc(task.title) + ' done">' +
          svg('check', true) + '</button>' +
      '</li>';
    }).join('');

    $('#routineProgress').textContent = count + ' of ' + ROUTINE.length;
  }

  function toggleTask(id) {
    if (!routine[selectedDay]) routine[selectedDay] = {};
    routine[selectedDay][id] = !routine[selectedDay][id];
    write(STORE.routine, routine);
    renderRoutine();
  }

  /* ------------------------------------------------------------------
     Ladder
  ------------------------------------------------------------------ */

  function renderLadder() {
    $('#ladderList').innerHTML = LADDER.map(function (rung) {
      return '<article class="tier">' +
        '<div class="tier-head">' +
          '<span class="tier-no">' + rung.tier + '</span>' +
          '<h3 class="tier-title">' + esc(rung.title) + '</h3>' +
          '<span class="tag' + (rung.hot ? ' is-new' : '') + '">' + esc(rung.tag) + '</span>' +
        '</div>' +
        (rung.intro ? '<p class="tier-intro">' + rung.intro + '</p>' : '') +
        '<ul class="tier-list">' + rung.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>' +
        (rung.note ? '<p class="tier-note">' + rung.note + '</p>' : '') +
      '</article>';
    }).join('');
  }

  /* ------------------------------------------------------------------
     Ingredient scan
  ------------------------------------------------------------------ */

  /* INCI lists are ordered by concentration until the 1% mark, after which
     order is arbitrary. So position is real information: coconut oil second
     on the list is a different product from coconut oil twenty-second. We
     tokenise rather than searching the raw string so we can keep it. */
  function tokenize(text) {
    return text
      .split(/[,;\n\r•·|]+/)
      .map(function (t) { return t.trim(); })
      .filter(function (t) { return t.length > 1; });
  }

  /* Longest match wins, so "Caprylic/Capric Triglyceride" is not also
     reported as a bare hit on something shorter that it contains. */
  function scan(text) {
    var tokens = tokenize(text);
    var found = {};

    tokens.forEach(function (token, index) {
      var lower = token.toLowerCase();
      var matches = INGREDIENTS.filter(function (ing) {
        return lower.indexOf(ing.name.toLowerCase()) !== -1;
      });
      if (!matches.length) return;

      matches.sort(function (a, b) { return b.name.length - a.name.length; });
      var best = matches[0];
      if (!found[best.name]) {
        found[best.name] = { ing: best, position: index + 1, total: tokens.length };
      }
    });

    return Object.keys(found).map(function (k) { return found[k]; })
      .sort(function (a, b) { return a.position - b.position; });
  }

  /* Above roughly the first third of a list you are usually still in the
     part ordered by concentration. Past that, everything is likely under 1%. */
  function weight(hit) {
    if (hit.position <= 5) return 'high';
    if (hit.position <= Math.ceil(hit.total / 2)) return 'mid';
    return 'low';
  }

  function renderScan() {
    var text = $('#scanInput').value;
    var box = $('#scanResult');

    if (!text.trim()) { box.hidden = true; return; }

    var hits = scan(text);
    var grouped = {};
    hits.forEach(function (hit) { (grouped[hit.ing.cat] = grouped[hit.ing.cat] || []).push(hit); });

    var feeders = grouped.feeder || [];
    var conditional = grouped.conditional || [];
    var actives = grouped.active || [];
    var topFeeders = feeders.filter(function (h) { return weight(h) === 'high'; });

    var verdict = $('#scanVerdict');
    verdict.className = 'verdict';

    if (topFeeders.length) {
      verdict.classList.add('is-bad');
      verdict.textContent = topFeeders[0].ing.name + ' is ingredient ' + topFeeders[0].position +
        ' of ' + topFeeders[0].total + ' here. That high up the list it is a major part of the formula, ' +
        'and it feeds the yeast you are treating.';
    } else if (feeders.length) {
      verdict.classList.add('is-bad');
      verdict.textContent = (feeders.length === 1 ? 'One ingredient here feeds' : feeders.length + ' ingredients here feed') +
        ' Malassezia, though all of them sit low on the list — likely under 1% each. Worth knowing, not necessarily worth binning.';
    } else if (conditional.length) {
      verdict.classList.add('is-ok');
      verdict.textContent = 'Nothing confirmed as a feeder, but ' + conditional.length +
        ' ingredient' + (conditional.length > 1 ? 's depend' : ' depends') + ' on how it was made. Read the notes before trusting it.';
    } else if (actives.length) {
      verdict.classList.add('is-ok');
      verdict.textContent = 'Active antifungal present and no feeders detected. This one is doing its job on paper.';
    } else if (hits.length) {
      verdict.classList.add('is-ok');
      verdict.textContent = 'No feeders detected. Safe to use, though nothing here is actively treating anything either.';
    } else {
      verdict.textContent = 'Nothing recognised. Paste the full list as printed on the label — INCI names give the best read.';
    }

    $('#scanGroups').innerHTML = Object.keys(CATEGORIES).filter(function (cat) {
      return grouped[cat] && grouped[cat].length;
    }).map(function (cat) {
      var meta = CATEGORIES[cat];
      return '<section class="group">' +
        '<div class="group-head"><p class="label">' + meta.label + '</p>' +
        '<span class="group-count">' + grouped[cat].length + '</span></div>' +
        '<div class="hits">' + grouped[cat].map(function (hit) {
          return '<span class="hit' + (meta.flag ? ' is-flag' : '') + ' w-' + weight(hit) +
            '" title="' + esc(hit.ing.note) + '">' + esc(hit.ing.name) +
            '<b class="hit-pos">' + hit.position + '</b></span>';
        }).join('') + '</div></section>';
    }).join('');

    if (hits.length) {
      $('#scanGroups').insertAdjacentHTML('beforeend',
        '<p class="fineprint">Numbers are the position on the label. Ingredient lists run in ' +
        'descending order of concentration until the 1% mark, after which order means nothing — ' +
        'so something in the first five is doing real work, and something near the end may be a trace.</p>');
    }

    box.hidden = false;
  }

  function renderReference(filter) {
    var q = (filter || '').trim().toLowerCase();
    var list = INGREDIENTS.filter(function (ing) {
      return !q || ing.name.toLowerCase().indexOf(q) !== -1 || ing.note.toLowerCase().indexOf(q) !== -1;
    });

    $('#refCount').textContent = list.length + ' entries';

    $('#refList').innerHTML = list.length
      ? list.map(function (ing) {
          return '<article class="ref"><p class="ref-name">' + esc(ing.name) + '</p>' +
            '<p class="ref-cat">' + CATEGORIES[ing.cat].label + '</p>' +
            '<p class="ref-note">' + ing.note + '</p></article>';
        }).join('')
      : '<p class="empty">Nothing matches that.</p>';
  }

  /* ------------------------------------------------------------------
     Trends
  ------------------------------------------------------------------ */

  function sorted() {
    return entries.slice().sort(function (a, b) { return a.date.localeCompare(b.date); });
  }

  function renderChart() {
    var data = sorted().slice(-30);
    var chart = $('#chart');
    var empty = $('#chartEmpty');

    /* setAttribute rather than .hidden — SVGElement has no hidden IDL
       property, so assigning it silently does nothing to the markup. */
    if (!data.length) { chart.setAttribute('hidden', ''); empty.hidden = false; return; }
    chart.removeAttribute('hidden');
    empty.hidden = true;

    var W = 320, H = 150, padX = 6, padY = 12;
    var innerW = W - padX * 2, innerH = H - padY * 2;
    var n = data.length;

    var x = function (i) { return n === 1 ? W / 2 : padX + innerW * i / (n - 1); };
    var y = function (v) { return padY + innerH - (innerH * v / 10); };

    var parts = [];
    [0, 5, 10].forEach(function (v) {
      parts.push('<line x1="' + padX + '" x2="' + (W - padX) + '" y1="' + y(v) + '" y2="' + y(v) +
        '" stroke="#b7c6c2" stroke-opacity=".45" stroke-width="1"/>');
    });

    var line = data.map(function (d, i) {
      return (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(d.severity).toFixed(1);
    }).join(' ');

    var area = line + ' L' + x(n - 1).toFixed(1) + ' ' + (H - padY) + ' L' + x(0).toFixed(1) + ' ' + (H - padY) + ' Z';

    parts.push('<path d="' + area + '" fill="#ca0013" fill-opacity=".07"/>');
    parts.push('<path d="' + line + '" fill="none" stroke="#ca0013" stroke-width="2.5" ' +
      'stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>');

    var last = n - 1;
    parts.push('<circle cx="' + x(last).toFixed(1) + '" cy="' + y(data[last].severity).toFixed(1) +
      '" r="4.5" fill="#ca0013" stroke="#ffffff" stroke-width="2.5"/>');

    chart.innerHTML = parts.join('');
  }

  function renderPatterns() {
    var box = $('#patterns');
    var data = sorted();

    if (data.length < 5) {
      box.innerHTML = '<div class="stats"><div class="locked">Patterns unlock at five entries — ' +
        (5 - data.length) + ' to go. Comparisons before that are noise.</div></div>';
      return;
    }

    var cards = [];

    /* Best product: lowest mean severity, minimum two logs to count. */
    var byProduct = {};
    data.forEach(function (e) {
      var key = (e.product || '').trim().toLowerCase();
      if (!key) return;
      if (!byProduct[key]) byProduct[key] = { label: e.product.trim(), scores: [] };
      byProduct[key].scores.push(e.severity);
    });
    var products = Object.keys(byProduct).map(function (k) { return byProduct[k]; })
      .filter(function (p) { return p.scores.length >= 2; })
      .sort(function (a, b) { return mean(a.scores) - mean(b.scores); });

    cards.push(products.length
      ? stat('Best so far', esc(products[0].label), mean(products[0].scores).toFixed(1) + ' average over ' + products[0].scores.length + ' logs')
      : stat('Best so far', 'Not enough yet', 'Log the same product twice to compare it'));

    /* Trigger with the largest severity gap between tagged and untagged days. */
    var tally = {};
    data.forEach(function (e) {
      (e.triggers || []).forEach(function (t) { (tally[t] = tally[t] || []).push(e.severity); });
    });
    var ranked = Object.keys(tally).map(function (t) {
      var withTag = tally[t];
      if (withTag.length < 3) return null;
      var without = data.filter(function (e) { return (e.triggers || []).indexOf(t) === -1; })
                        .map(function (e) { return e.severity; });
      if (without.length < 2) return null;
      return { tag: t, gap: mean(withTag) - mean(without) };
    }).filter(Boolean).sort(function (a, b) { return b.gap - a.gap; });

    cards.push(ranked.length && ranked[0].gap > 0.3
      ? stat('Worst trigger', esc(ranked[0].tag), '+' + ranked[0].gap.toFixed(1) + ' severity on days you tagged it')
      : stat('Worst trigger', 'None standing out', 'Keep tagging — three logs per trigger minimum'));

    /* Direction of travel: first half against second half. */
    var half = Math.floor(data.length / 2);
    var early = mean(data.slice(0, half).map(function (e) { return e.severity; }));
    var late = mean(data.slice(-half).map(function (e) { return e.severity; }));
    var delta = late - early;
    var word = Math.abs(delta) < 0.5 ? 'Holding steady' : delta < 0 ? 'Improving' : 'Getting worse';

    cards.push(stat('Direction', word,
      early.toFixed(1) + ' then ' + late.toFixed(1) + ' average, earliest half against most recent', true));

    box.innerHTML = '<div class="stats">' + cards.join('') + '</div>';
  }

  function stat(label, value, sub, wide) {
    return '<div class="stat' + (wide ? ' is-wide' : '') + '">' +
      '<p class="label">' + label + '</p>' +
      '<p class="stat-val">' + value + '</p>' +
      '<p class="stat-sub">' + esc(sub) + '</p></div>';
  }

  function renderHistory() {
    var data = sorted().reverse();
    $('#historyCount').textContent = data.length + (data.length === 1 ? ' entry' : ' entries');

    $('#historyList').innerHTML = data.length
      ? data.map(function (e) {
          var when = parse(e.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: '2-digit' });
          var detail = [e.product, (e.triggers || []).join(', ')].filter(Boolean).join(' · ') || 'No details';
          return '<li class="item">' +
            '<span class="item-ico">' + e.severity + '</span>' +
            '<div class="item-body"><p class="item-title">' + when + '</p>' +
            '<p class="item-sub">' + esc(detail) + '</p></div>' +
            '<button class="check" data-remove="' + e.id + '" type="button" aria-label="Delete entry">&times;</button>' +
          '</li>';
        }).join('')
      : '<li class="empty">No entries yet.</li>';
  }

  /* ------------------------------------------------------------------
     Log sheet
  ------------------------------------------------------------------ */

  function openSheet() {
    var existing = entryFor(selectedDay);

    $('#fDate').value = selectedDay;
    $('#fSeverity').value = existing ? existing.severity : 5;
    $('#fItch').value = existing ? existing.itch : 5;
    $('#fProduct').value = existing ? (existing.product || '') : '';
    $('#fNotes').value = existing ? (existing.notes || '') : '';
    $('#outSeverity').textContent = $('#fSeverity').value;
    $('#outItch').textContent = $('#fItch').value;

    $('#sheetTitle').textContent = existing ? 'Edit entry' : 'Log an entry';

    $('#fTriggers').innerHTML = TRIGGERS.map(function (t) {
      var on = existing && (existing.triggers || []).indexOf(t) !== -1;
      return '<label class="chip"><input type="checkbox" value="' + esc(t) + '"' + (on ? ' checked' : '') +
        '><span>' + esc(t) + '</span></label>';
    }).join('');

    $('#scrim').hidden = false;
    $('#sheet').hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeSheet() {
    $('#scrim').hidden = true;
    $('#sheet').hidden = true;
    document.body.style.overflow = '';
  }

  function saveEntry() {
    var date = $('#fDate').value || today();
    var record = {
      id: entryFor(date) ? entryFor(date).id : String(Date.now()),
      date: date,
      severity: +$('#fSeverity').value,
      itch: +$('#fItch').value,
      product: $('#fProduct').value.trim(),
      notes: $('#fNotes').value.trim(),
      triggers: $$('#fTriggers input:checked').map(function (c) { return c.value; })
    };

    entries = entries.filter(function (e) { return e.date !== date; });
    entries.push(record);
    write(STORE.entries, entries);

    selectedDay = date;
    closeSheet();
    renderAll();
    toast('Saved');
  }

  /* ------------------------------------------------------------------
     Export
  ------------------------------------------------------------------ */

  function exportCsv() {
    if (!entries.length) { toast('Nothing to export yet'); return; }

    var rows = [['Date', 'Severity', 'Itch', 'Product', 'Triggers', 'Notes']];
    sorted().forEach(function (e) {
      rows.push([e.date, e.severity, e.itch, e.product || '', (e.triggers || []).join('; '), (e.notes || '').replace(/\s+/g, ' ')]);
    });

    var csv = rows.map(function (row) {
      return row.map(function (cell) {
        var s = String(cell);
        return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
      }).join(',');
    }).join('\n');

    var url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    var a = document.createElement('a');
    a.href = url;
    a.download = 'scalp-log.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* ------------------------------------------------------------------
     Wiring
  ------------------------------------------------------------------ */

  function switchView(name) {
    $$('.view').forEach(function (v) { v.classList.toggle('is-active', v.id === 'view-' + name); });
    $$('.tab').forEach(function (t) { t.classList.toggle('is-active', t.dataset.view === name); });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function renderAll() {
    renderHeader();
    renderDayStrip();
    renderHero();
    renderRoutine();
    renderChart();
    renderPatterns();
    renderHistory();
  }

  function init() {
    $$('.tab-ico').forEach(function (el) { el.innerHTML = svg(el.dataset.ico, true); });
    $('#fab').querySelector('[data-ico]').innerHTML = svg('plus', true);

    $$('.tab').forEach(function (tab) {
      tab.addEventListener('click', function () { switchView(tab.dataset.view); });
    });

    $('#fab').addEventListener('click', openSheet);
    $('#sheetClose').addEventListener('click', closeSheet);
    $('#scrim').addEventListener('click', closeSheet);
    $('#saveEntry').addEventListener('click', saveEntry);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !$('#sheet').hidden) closeSheet();
    });

    $('#fSeverity').addEventListener('input', function () { $('#outSeverity').textContent = this.value; });
    $('#fItch').addEventListener('input', function () { $('#outItch').textContent = this.value; });

    $('#dayStrip').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-day]');
      if (!btn) return;
      selectedDay = btn.dataset.day;
      renderDayStrip();
      renderHero();
      renderRoutine();
    });

    $('#routineList').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-task]');
      if (btn) toggleTask(btn.dataset.task);
    });

    $('#historyList').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-remove]');
      if (!btn) return;
      entries = entries.filter(function (en) { return en.id !== btn.dataset.remove; });
      write(STORE.entries, entries);
      renderAll();
      toast('Entry removed');
    });

    $('#scanBtn').addEventListener('click', renderScan);
    $('#scanClear').addEventListener('click', function () {
      $('#scanInput').value = '';
      $('#scanResult').hidden = true;
    });
    $('#refSearch').addEventListener('input', function () { renderReference(this.value); });

    $('#exportBtn').addEventListener('click', exportCsv);
    $('#wipeBtn').addEventListener('click', function () {
      if (!entries.length) { toast('Nothing stored'); return; }
      if (!confirm('Delete every entry on this device? Export first if you want a copy — this cannot be undone.')) return;
      entries = [];
      routine = {};
      write(STORE.entries, entries);
      write(STORE.routine, routine);
      renderAll();
      toast('All data deleted');
    });

    $('#streakBtn').addEventListener('click', function () { switchView('trends'); });

    renderLadder();
    renderReference('');
    renderAll();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
