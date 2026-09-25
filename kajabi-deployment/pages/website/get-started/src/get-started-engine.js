<script>
(function () {
  'use strict';

  var B64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  function utf8Bytes(str) {
    var bytes = [];
    var encoded = encodeURIComponent(str);
    var i = 0;
    while (i < encoded.length) {
      var c = encoded.charAt(i);
      if (c === '%') {
        bytes.push(parseInt(encoded.substr(i + 1, 2), 16));
        i += 3;
      } else {
        bytes.push(encoded.charCodeAt(i));
        i += 1;
      }
    }
    return bytes;
  }

  function bytesToUtf8(bytes) {
    var str = '';
    for (var i = 0; i < bytes.length; i++) {
      str += '%' + ('0' + bytes[i].toString(16)).slice(-2);
    }
    return decodeURIComponent(str);
  }

  function base64Encode(bytes) {
    var result = '';
    for (var i = 0; i < bytes.length; i += 3) {
      var b0 = bytes[i];
      var b1 = bytes[i + 1];
      var b2 = bytes[i + 2];
      var hasB1 = b1 !== undefined;
      var hasB2 = b2 !== undefined;
      var triplet = (b0 << 16) | ((hasB1 ? b1 : 0) << 8) | (hasB2 ? b2 : 0);
      result += B64_CHARS.charAt((triplet >> 18) & 63);
      result += B64_CHARS.charAt((triplet >> 12) & 63);
      result += hasB1 ? B64_CHARS.charAt((triplet >> 6) & 63) : '=';
      result += hasB2 ? B64_CHARS.charAt(triplet & 63) : '=';
    }
    return result;
  }

  function base64Decode(str) {
    var clean = str.replace(/=+$/, '');
    var bytes = [];
    var buffer = 0;
    var bits = 0;
    for (var i = 0; i < clean.length; i++) {
      var idx = B64_CHARS.indexOf(clean.charAt(i));
      if (idx === -1) continue;
      buffer = (buffer << 6) | idx;
      bits += 6;
      if (bits >= 8) {
        bits -= 8;
        bytes.push((buffer >> bits) & 0xFF);
      }
    }
    return bytes;
  }

  function encodeResumeToken(answers) {
    var json = JSON.stringify({ a: answers || {} });
    var bytes = utf8Bytes(json);
    var b64 = base64Encode(bytes);
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function decodeResumeToken(token) {
    try {
      var b64 = String(token).replace(/-/g, '+').replace(/_/g, '/');
      var bytes = base64Decode(b64);
      var json = bytesToUtf8(bytes);
      var parsed = JSON.parse(json);
      if (parsed && typeof parsed === 'object' && parsed.a && typeof parsed.a === 'object') {
        return parsed.a;
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  function isScreenVisible(screen, answers) {
    if (!screen.show_if) return true;
    var cond = screen.show_if;
    var value = answers[cond.answer];
    var count = Array.isArray(value) ? value.length : (value !== undefined && value !== null && value !== '' ? 1 : 0);
    if (typeof cond.count_gte === 'number') return count >= cond.count_gte;
    return count > 0;
  }

  function applyDefaultIfHidden(screen, answers) {
    if (!screen.default_if_hidden) return answers;
    var rule = screen.default_if_hidden;
    var source = answers[rule.from];
    if (!Array.isArray(source) || source.length === 0) return answers;
    var value = rule.pick === 'last' ? source[source.length - 1] : source[0];
    var next = {};
    for (var key in answers) { if (Object.prototype.hasOwnProperty.call(answers, key)) next[key] = answers[key]; }
    next[screen.id] = value;
    return next;
  }

  function resolveVisibleFrom(flow, answers, fromIndex) {
    var screens = flow.screens;
    var idx = fromIndex;
    var currentAnswers = answers;
    while (idx < screens.length) {
      var screen = screens[idx];
      if (isScreenVisible(screen, currentAnswers)) {
        return { index: idx, answers: currentAnswers };
      }
      currentAnswers = applyDefaultIfHidden(screen, currentAnswers);
      idx += 1;
    }
    return { index: screens.length, answers: currentAnswers };
  }

  function screenIndexById(flow, id) {
    for (var i = 0; i < flow.screens.length; i++) {
      if (flow.screens[i].id === id) return i;
    }
    return -1;
  }

  function nextScreen(flow, answers, currentId) {
    var currentIndex = screenIndexById(flow, currentId);
    var fromIndex = currentIndex === -1 ? 0 : currentIndex + 1;
    var resolved = resolveVisibleFrom(flow, answers, fromIndex);
    var screen = resolved.index < flow.screens.length ? flow.screens[resolved.index] : null;
    return { screen: screen, answers: resolved.answers };
  }

  function previousScreen(flow, answers, currentId) {
    var currentIndex = screenIndexById(flow, currentId);
    if (currentIndex <= 0) return null;
    var idx = currentIndex - 1;
    while (idx >= 0) {
      if (isScreenVisible(flow.screens[idx], answers)) return flow.screens[idx];
      idx -= 1;
    }
    return null;
  }

  function bandById(flow, id) {
    for (var i = 0; i < flow.age_bands.length; i++) {
      if (flow.age_bands[i].id === id) return flow.age_bands[i];
    }
    return null;
  }

  function bandGroup(flow, id) {
    var band = bandById(flow, id);
    return band ? band.group : null;
  }

  function resolveGroup(flow, answers) {
    var ageIds = answers.age || [];
    if (ageIds.length >= 2 && answers.top_of_mind) return bandGroup(flow, answers.top_of_mind);
    if (ageIds.length >= 1) return bandGroup(flow, ageIds[0]);
    return null;
  }

  function optionsForScreen(screen, flow, answers) {
    if (screen.options) return screen.options.slice();
    if (screen.options_from) {
      var source = answers[screen.options_from];
      if (Array.isArray(source)) return source.slice();
      return source ? [source] : [];
    }
    if (screen.options_by_group) {
      var group = resolveGroup(flow, answers);
      return (screen.options_by_group[group] || []).slice();
    }
    return [];
  }

  function toggleMultiAnswer(screen, currentSelected, optionId) {
    var selected = currentSelected ? currentSelected.slice() : [];
    var exists = selected.indexOf(optionId) !== -1;
    var exclusive = screen.exclusive_option;
    if (exists) {
      return selected.filter(function (id) { return id !== optionId; });
    }
    if (exclusive && optionId === exclusive) {
      return [optionId];
    }
    if (exclusive && selected.indexOf(exclusive) !== -1) {
      selected = selected.filter(function (id) { return id !== exclusive; });
    }
    selected.push(optionId);
    return selected;
  }

  function multiMinMet(screen, selected) {
    var min = typeof screen.min === 'number' ? screen.min : 0;
    return (selected ? selected.length : 0) >= min;
  }

  function interpolate(template, vars) {
    if (typeof template !== 'string') return template;
    return template.replace(/\{(\w+)\}/g, function (match, key) {
      return Object.prototype.hasOwnProperty.call(vars || {}, key) ? String(vars[key]) : match;
    });
  }

  function appendQueryParams(url, params) {
    if (!params) return url;
    var keys = Object.keys(params);
    if (keys.length === 0) return url;
    var separator = url.indexOf('?') === -1 ? '?' : '&';
    var pairs = [];
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = params[key];
      if (value === undefined || value === null || value === '') continue;
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
    if (pairs.length === 0) return url;
    return url + separator + pairs.join('&');
  }

  function initialState() {
    var now = new Date().toISOString();
    return {
      v: 1,
      step: null,
      answers: {},
      started_at: now,
      updated_at: now,
      email_captured: false,
      completed: false
    };
  }

  function stateReducer(state, action) {
    var base = state || initialState();
    var now = new Date().toISOString();
    if (action.type === 'ANSWER') {
      var answers = {};
      for (var key in base.answers) { if (Object.prototype.hasOwnProperty.call(base.answers, key)) answers[key] = base.answers[key]; }
      answers[action.screenId] = action.value;
      return {
        v: 1,
        step: action.step || base.step,
        answers: answers,
        started_at: base.started_at,
        updated_at: now,
        email_captured: base.email_captured,
        completed: base.completed
      };
    }
    if (action.type === 'SET_STEP') {
      return {
        v: 1,
        step: action.step,
        answers: base.answers,
        started_at: base.started_at,
        updated_at: now,
        email_captured: base.email_captured,
        completed: base.completed
      };
    }
    if (action.type === 'EMAIL_CAPTURED') {
      return {
        v: 1,
        step: base.step,
        answers: base.answers,
        started_at: base.started_at,
        updated_at: now,
        email_captured: true,
        completed: base.completed
      };
    }
    if (action.type === 'COMPLETE') {
      return {
        v: 1,
        step: base.step,
        answers: base.answers,
        started_at: base.started_at,
        updated_at: now,
        email_captured: base.email_captured,
        completed: true
      };
    }
    if (action.type === 'RESTORE') {
      return {
        v: 1,
        step: action.step || 'plan',
        answers: action.answers || {},
        started_at: now,
        updated_at: now,
        email_captured: true,
        completed: true
      };
    }
    if (action.type === 'RESTART') {
      return initialState();
    }
    return base;
  }

  function safeLoadState(storageKey) {
    try {
      var raw = window.localStorage.getItem(storageKey);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch (e) {
      return null;
    }
  }

  function safeSaveState(storageKey, state) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
      return true;
    } catch (e) {
      return false;
    }
  }

  function safeReadJson(storageKey) {
    try {
      var raw = window.localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function detectCurrency() {
    try {
      var lang = (navigator.language || navigator.userLanguage || '').toLowerCase();
      var region = '';
      if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
        var resolved = Intl.DateTimeFormat().resolvedOptions();
        region = (resolved.locale || '').toLowerCase();
      }
      if (lang.indexOf('-au') !== -1 || region.indexOf('-au') !== -1) {
        return 'aud';
      }
      return 'usd';
    } catch (e) {
      return 'usd';
    }
  }

  function resolveDisplayCurrency() {
    try {
      var preference = window.localStorage.getItem('snooze_currency_preference');
      if (preference === 'AUD') return 'aud';
      if (preference === 'USD') return 'usd';
    } catch (e) {}
    return detectCurrency();
  }

  function highlightForAnswers(flow, answers) {
    var redFlags = redFlagsChosen(flow, answers);
    if (redFlags.length > 0) return flow.plan_layout.safety_route.highlight;
    var helpStyle = answers.help_style;
    return flow.plan_layout.highlight_by_help_style[helpStyle] || null;
  }

  function redFlagsChosen(flow, answers) {
    var safetyScreen = null;
    for (var i = 0; i < flow.screens.length; i++) {
      if (flow.screens[i].id === 'safety') { safetyScreen = flow.screens[i]; break; }
    }
    if (!safetyScreen || !safetyScreen.red_flags) return [];
    var chosen = answers.safety || [];
    return safetyScreen.red_flags.filter(function (flag) { return chosen.indexOf(flag) !== -1; });
  }

  function primaryAgeId(answers) {
    var ageIds = answers.age || [];
    return answers.top_of_mind || ageIds[0] || null;
  }

  function primaryStruggleId(answers) {
    return answers.primary_struggle || (answers.struggles && answers.struggles[0]) || null;
  }

  function buildPlanModel(flow, copy, startHere, offers, answers, currency, utmParams) {
    var group = resolveGroup(flow, answers);
    var ageId = primaryAgeId(answers);
    var struggleId = primaryStruggleId(answers);
    var outcomeId = answers.outcome;
    var helpStyle = answers.help_style;
    var redFlags = redFlagsChosen(flow, answers);
    var isSafetyRoute = redFlags.length > 0;
    var highlight = highlightForAnswers(flow, answers);

    var ageLabel = copy.options.age[ageId] || '';
    var struggleLabel = copy.options.struggles[struggleId] || '';

    var reflection = group ? interpolate(copy.plan.reflection[group], { age_label: ageLabel }) : '';
    var reflectionStruggle = struggleId ? interpolate(copy.plan.reflection_struggle[struggleId], { struggle_label: struggleLabel }) : '';

    var suppressRightNow = isSafetyRoute && flow.plan_layout.safety_route.suppress_sections.indexOf('right_now') !== -1;
    var rightNow = null;
    if (!suppressRightNow && startHere && group && startHere[group]) {
      rightNow = startHere[group][struggleId] || startHere[group]._default || null;
    }

    var currencyOffers = offers.snooze[currency] || offers.snooze.usd;
    var checkoutUrl = appendQueryParams(currencyOffers.monthly.checkout_url, utmParams);

    var cardKeys = flow.plan_layout.support_cards.slice();
    var cards = cardKeys.map(function (key) {
      var cardCopy = copy.plan.cards[key] || {};
      var urlKey = cardCopy.url_key || key;
      var offerEntry = offers[urlKey] || {};
      return {
        key: key,
        title: cardCopy.title,
        body: cardCopy.body,
        cta: cardCopy.cta,
        url: offerEntry.url || '#',
        next_steps: cardCopy.next_steps || [],
        expanded: key === highlight,
        badge: key === highlight ? copy.plan.recommended_badge : null
      };
    });

    var safetyNotes = redFlags.map(function (flag) {
      return copy.plan.safety.note[flag];
    });
    var showSupportLines = redFlags.indexOf('parent_struggling') !== -1;

    return {
      group: group,
      age_id: ageId,
      age_label: ageLabel,
      struggle_id: struggleId,
      struggle_label: struggleLabel,
      outcome_id: outcomeId,
      help_style: helpStyle,
      is_safety_route: isSafetyRoute,
      highlight: highlight,
      reflection: reflection,
      reflection_struggle: reflectionStruggle,
      right_now: rightNow,
      snooze: {
        currency: currency,
        price: currencyOffers.monthly.price,
        checkout_url: checkoutUrl
      },
      snooze_position: isSafetyRoute ? flow.plan_layout.safety_route.snooze_position : 'primary',
      for_you: outcomeId ? copy.plan.for_you[outcomeId] : '',
      cards: cards,
      safety_notes: safetyNotes,
      support_lines: showSupportLines ? copy.plan.safety.support_lines : [],
      plan_viewed_payload: {
        help_style: helpStyle,
        highlighted_option: highlight,
        safety_route: isSafetyRoute
      }
    };
  }

  function payloadHasEmailLike(value) {
    if (typeof value === 'string') return value.indexOf('@') !== -1;
    if (Array.isArray(value)) {
      for (var i = 0; i < value.length; i++) { if (payloadHasEmailLike(value[i])) return true; }
      return false;
    }
    if (value && typeof value === 'object') {
      for (var key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key) && payloadHasEmailLike(value[key])) return true;
      }
      return false;
    }
    return false;
  }

  function pushEvent(name, payload) {
    if (!name) return;
    if (payloadHasEmailLike(payload)) return;
    window.dataLayer = window.dataLayer || [];
    var event = { event: name };
    if (payload) {
      for (var key in payload) { if (Object.prototype.hasOwnProperty.call(payload, key)) event[key] = payload[key]; }
    }
    window.dataLayer.push(event);
  }

  var PURE = {
    isScreenVisible: isScreenVisible,
    applyDefaultIfHidden: applyDefaultIfHidden,
    nextScreen: nextScreen,
    previousScreen: previousScreen,
    resolveGroup: resolveGroup,
    bandGroup: bandGroup,
    optionsForScreen: optionsForScreen,
    toggleMultiAnswer: toggleMultiAnswer,
    multiMinMet: multiMinMet,
    interpolate: interpolate,
    appendQueryParams: appendQueryParams,
    initialState: initialState,
    stateReducer: stateReducer,
    encodeResumeToken: encodeResumeToken,
    decodeResumeToken: decodeResumeToken,
    detectCurrency: detectCurrency,
    resolveDisplayCurrency: resolveDisplayCurrency,
    redFlagsChosen: redFlagsChosen,
    highlightForAnswers: highlightForAnswers,
    buildPlanModel: buildPlanModel,
    payloadHasEmailLike: payloadHasEmailLike,
    safeLoadState: safeLoadState,
    safeSaveState: safeSaveState,
    safeReadJson: safeReadJson
  };

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      for (var key in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, key)) continue;
        if (key === 'class') node.className = attrs[key];
        else if (key === 'text') node.textContent = attrs[key];
        else node.setAttribute(key, attrs[key]);
      }
    }
    (children || []).forEach(function (child) { if (child) node.appendChild(child); });
    return node;
  }

  function reducedMotion() {
    try {
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {
      return false;
    }
  }

  function GetStartedApp(root, data) {
    var flow = data.flow;
    var copy = data.copy;
    var startHere = data.startHere || {};
    var offers = data.offers;
    var config = data.config || {};
    var storageKey = flow.storage_key;

    var state = null;

    function persist() {
      safeSaveState(storageKey, state);
    }

    function progressScreens() {
      return flow.screens.filter(function (s) { return s.progress !== false && s.type !== 'plan'; });
    }

    function renderProgress(container, screenId) {
      var eligible = progressScreens();
      var index = -1;
      for (var i = 0; i < eligible.length; i++) { if (eligible[i].id === screenId) { index = i; break; } }
      if (index === -1) return;
      var bar = el('div', { class: 'sgs-progress' }, [
        el('div', { class: 'sgs-progress__fill', style: 'width:' + Math.round(((index + 1) / eligible.length) * 100) + '%' })
      ]);
      var label = el('p', { class: 'sgs-step-of', text: interpolate(copy.common.step_of, { step: index + 1, total: eligible.length }) });
      container.appendChild(bar);
      container.appendChild(label);
    }

    function renderBack(container, screenId) {
      var prev = previousScreen(flow, state.answers, screenId);
      if (!prev) return;
      var back = el('button', { type: 'button', class: 'sgs-back', 'aria-label': copy.common.back }, []);
      back.textContent = '‹ ' + copy.common.back;
      back.addEventListener('click', function () { goTo(prev.id); });
      container.appendChild(back);
    }

    function focusHeading(heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus();
    }

    function goTo(screenId) {
      state = stateReducer(state, { type: 'SET_STEP', step: screenId });
      persist();
      var index = screenIndexById(flow, screenId);
      pushEvent(flow.events.step, { step_id: screenId, step_index: index });
      renderScreen(screenId);
    }

    function advanceFrom(screenId) {
      var resolved = nextScreen(flow, state.answers, screenId);
      state = { v: 1, step: state.step, answers: resolved.answers, started_at: state.started_at, updated_at: new Date().toISOString(), email_captured: state.email_captured, completed: state.completed };
      if (!resolved.screen) {
        state = stateReducer(state, { type: 'COMPLETE' });
        persist();
        renderScreen('plan');
        return;
      }
      goTo(resolved.screen.id);
    }

    function answer(screenId, value) {
      state = stateReducer(state, { type: 'ANSWER', screenId: screenId, value: value, step: screenId });
      persist();
    }

    function renderChip(label, selected, onClick) {
      var chip = el('button', { type: 'button', class: 'sgs-chip' + (selected ? ' sgs-chip--selected' : ''), 'aria-pressed': selected ? 'true' : 'false' }, []);
      chip.textContent = label;
      chip.addEventListener('click', onClick);
      return chip;
    }

    function renderIntro() {
      root.innerHTML = '';
      var wrap = el('div', { class: 'sgs-screen sgs-screen--intro' }, []);
      var heading = el('h1', { class: 'sgs-title', text: copy.welcome.title });
      if (copy.plan && copy.plan.photo_url) wrap.appendChild(el('img', { src: copy.plan.photo_url, alt: 'Sally Woods, The Sleep Concierge', class: 'sgs-welcome-photo' }));
      wrap.appendChild(el('p', { class: 'sgs-eyebrow', text: copy.welcome.eyebrow }));
      wrap.appendChild(heading);
      wrap.appendChild(el('p', { class: 'sgs-body', text: copy.welcome.body }));
      wrap.appendChild(el('p', { class: 'sgs-credential', text: copy.welcome.credential }));
      var cta = el('button', { type: 'button', class: 'sgs-cta' }, []);
      cta.textContent = copy.welcome.cta;
      cta.addEventListener('click', function () {
        pushEvent(flow.events.start, {});
        advanceFrom('welcome');
      });
      wrap.appendChild(cta);
      root.appendChild(wrap);
      focusHeading(heading);
    }

    function renderChoiceScreen(screen) {
      root.innerHTML = '';
      var screenCopy = copy.screens[screen.id] || {};
      var wrap = el('div', { class: 'sgs-screen' }, []);
      renderProgress(wrap, screen.id);
      renderBack(wrap, screen.id);
      var heading = el('h2', { class: 'sgs-title', text: screenCopy.title || '' });
      wrap.appendChild(heading);
      if (screenCopy.helper) wrap.appendChild(el('p', { class: 'sgs-helper', text: screenCopy.helper }));

      var optionIds = optionsForScreen(screen, flow, state.answers);
      var optionsCopy = copy.options[screen.id] || copy.options[screen.options_from] || {};
      var chipsWrap = el('div', { class: 'sgs-chips' }, []);

      var isMulti = screen.type === 'multi';
      var currentSelected = isMulti ? (state.answers[screen.id] || []).slice() : [];

      function labelFor(id) {
        var label = optionsCopy[id];
        return typeof label === 'string' ? label : id;
      }

      optionIds.forEach(function (optionId, position) {
        var selected = isMulti ? currentSelected.indexOf(optionId) !== -1 : state.answers[screen.id] === optionId;
        var chip = renderChip(labelFor(optionId), selected, function () { handleOptionClick(); });
        chip.setAttribute('data-option-index', String(position + 1));

        function handleOptionClick() {
          if (isMulti) {
            currentSelected = toggleMultiAnswer(screen, currentSelected, optionId);
            answer(screen.id, currentSelected);
            renderChoiceScreen(screen);
          } else {
            answer(screen.id, optionId);
            var reduced = reducedMotion();
            window.setTimeout(function () { advanceFrom(screen.id); }, reduced ? 0 : 250);
          }
        }

        chipsWrap.appendChild(chip);
      });

      wrap.appendChild(chipsWrap);

      if (screen.extra_toggle === 'multiples') {
        var toggleLabel = (copy.options.age && copy.options.age.extra_toggle && copy.options.age.extra_toggle.multiples) || '';
        var toggleWrap = el('label', { class: 'sgs-toggle' }, []);
        var checkbox = el('input', { type: 'checkbox' }, []);
        if (state.answers.age_multiples) checkbox.setAttribute('checked', 'checked');
        checkbox.addEventListener('change', function () {
          answer('age_multiples', checkbox.checked);
        });
        toggleWrap.appendChild(checkbox);
        toggleWrap.appendChild(document.createTextNode(' ' + toggleLabel));
        wrap.appendChild(toggleWrap);
      }

      if (isMulti) {
        var continueBtn = el('button', { type: 'button', class: 'sgs-cta sgs-cta--sticky' }, []);
        continueBtn.textContent = copy.common.continue;
        continueBtn.disabled = !multiMinMet(screen, currentSelected);
        continueBtn.addEventListener('click', function () {
          if (!multiMinMet(screen, currentSelected)) return;
          advanceFrom(screen.id);
        });
        wrap.appendChild(continueBtn);
      }

      root.appendChild(wrap);
      focusHeading(heading);
    }

    function renderEmpathy() {
      root.innerHTML = '';
      var wrap = el('div', { class: 'sgs-screen sgs-screen--interstitial' }, []);
      renderProgress(wrap, 'empathy');
      var heading = el('h2', { class: 'sgs-title', text: copy.empathy.title });
      wrap.appendChild(heading);
      wrap.appendChild(el('p', { class: 'sgs-body', text: copy.empathy.body }));
      var cta = el('button', { type: 'button', class: 'sgs-cta' }, []);
      cta.textContent = copy.empathy.cta;
      cta.addEventListener('click', function () { advanceFrom('empathy'); });
      wrap.appendChild(cta);
      root.appendChild(wrap);
      focusHeading(heading);
    }

    function renderBuilding() {
      root.innerHTML = '';
      var screen = flow.screens.filter(function (s) { return s.id === 'building'; })[0];
      var wrap = el('div', { class: 'sgs-screen sgs-screen--building' }, []);
      var heading = el('h2', { class: 'sgs-title', text: copy.building.title });
      wrap.appendChild(heading);
      var list = el('ul', { class: 'sgs-building-list' }, []);
      (copy.building.items || []).forEach(function (item) {
        list.appendChild(el('li', { text: item }));
      });
      wrap.appendChild(list);
      root.appendChild(wrap);
      focusHeading(heading);
      var delay = (screen && screen.auto_advance_ms) || 0;
      window.setTimeout(function () { advanceFrom('building'); }, reducedMotion() ? 0 : delay);
    }

    function renderEmail() {
      root.innerHTML = '';
      var wrap = el('div', { class: 'sgs-screen sgs-screen--email' }, []);
      renderProgress(wrap, 'email');
      var heading = el('h2', { class: 'sgs-title', text: copy.email.title });
      wrap.appendChild(heading);
      wrap.appendChild(el('p', { class: 'sgs-body', text: copy.email.body }));

      var embedHost = el('div', { class: 'sgs-form-embed', id: 'sgs-kajabi-embed' }, []);
      wrap.appendChild(embedHost);

      var fallback = el('div', { class: 'sgs-email-fallback', style: 'display:none' }, []);
      var fallbackLink = el('a', { href: '#' }, []);
      fallbackLink.textContent = copy.email.skip;
      fallbackLink.addEventListener('click', function (e) {
        e.preventDefault();
        state = stateReducer(state, { type: 'COMPLETE' });
        persist();
        renderScreen('plan');
      });
      fallback.appendChild(el('p', { text: copy.email.fallback }));
      fallback.appendChild(fallbackLink);
      wrap.appendChild(fallback);
      wrap.appendChild(el('p', { class: 'sgs-privacy', text: copy.email.privacy }));

      root.appendChild(wrap);
      focusHeading(heading);

      if (!config.enabled || !config.kajabi_form_id || config.kajabi_form_id.indexOf('{{') === 0) {
        // No form configured: never strand the visitor on an empty screen.
        embedHost.style.display = 'none';
        fallback.style.display = 'block';
        return;
      }

      var script = document.createElement('script');
      script.src = 'https://www.joinsnooze.com/forms/' + config.kajabi_form_id + '/embed.js';
      script.onerror = function () {
        if (settled) return;
        settled = true;
        embedHost.style.display = 'none';
        fallback.style.display = 'block';
      };
      embedHost.appendChild(script);

      var settled = false;

      function hideField(form, fieldName) {
        if (!fieldName) return;
        var input = form.querySelector('[name="' + fieldName + '"]');
        if (input) {
          input.value = fieldValueFor(fieldName);
          // Make the answer field a true hidden input. Never hide an ancestor div:
          // on Kajabi's markup the nearest div can be the whole form.
          try { input.type = 'hidden'; } catch (e) { input.style.display = 'none'; }
          var wrapper = input.closest ? input.closest('.form-group, .text-field, .formkit-field, .field') : null;
          if (wrapper && !wrapper.querySelector('input[type="email"]')) wrapper.style.display = 'none';
          var label = form.querySelector('label[for="' + input.id + '"]');
          if (input.id && label) label.style.display = 'none';
        }
      }

      function fieldValueFor(fieldName) {
        var names = config.form_field_names || {};
        if (fieldName === names.age_band) return primaryAgeId(state.answers) || '';
        if (fieldName === names.primary_struggle) return primaryStruggleId(state.answers) || '';
        if (fieldName === names.help_style) return state.answers.help_style || '';
        if (fieldName === names.resume_token) return encodeResumeToken(state.answers);
        if (fieldName === names.start_here_title) {
          var group = resolveGroup(flow, state.answers);
          var item = startHere && group && startHere[group] ? (startHere[group][primaryStruggleId(state.answers)] || startHere[group]._default) : null;
          return item ? item.title : '';
        }
        if (fieldName === names.start_here_url) {
          var group2 = resolveGroup(flow, state.answers);
          var item2 = startHere && group2 && startHere[group2] ? (startHere[group2][primaryStruggleId(state.answers)] || startHere[group2]._default) : null;
          return item2 ? item2.url : '';
        }
        return '';
      }

      function wireForm(form) {
        if (settled) return;
        settled = true;
        var names = config.form_field_names || {};
        Object.keys(names).forEach(function (key) { hideField(form, names[key]); });
        sendBeacon();
        form.addEventListener('submit', function () {
          state = stateReducer(state, { type: 'EMAIL_CAPTURED' });
          persist();
          pushEvent(flow.events.email_captured, {});
          if (flow.events.email_captured_alias) pushEvent(flow.events.email_captured_alias, {});
        });
      }

      var observer = new MutationObserver(function () {
        var form = embedHost.querySelector('form');
        if (form) {
          observer.disconnect();
          wireForm(form);
        }
      });
      observer.observe(embedHost, { childList: true, subtree: true });

      window.setTimeout(function () {
        if (settled) return;
        observer.disconnect();
        embedHost.style.display = 'none';
        fallback.style.display = 'block';
      }, 6000);
    }

    function sendBeacon() {
      if (!config.n8n_webhook_url) return;
      var current = safeReadJson('snooze_attribution_current_touch') || {};
      var payload = {
        source: 'get_started',
        answers: state.answers,
        utm_source: current.utm_source || '',
        utm_medium: current.utm_medium || '',
        utm_campaign: current.utm_campaign || '',
        utm_content: current.utm_content || '',
        utm_term: current.utm_term || '',
        currency_preference: resolveDisplayCurrency()
      };
      try {
        if (navigator.sendBeacon) {
          var blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
          navigator.sendBeacon(config.n8n_webhook_url, blob);
        }
      } catch (e) {}
    }

    function renderPlan() {
      root.innerHTML = '';
      var current = safeReadJson('snooze_attribution_current_touch') || {};
      var currency = resolveDisplayCurrency();
      var model = buildPlanModel(flow, copy, startHere, offers, state.answers, currency, current);

      var wrap = el('div', { class: 'sgs-screen sgs-screen--plan' }, []);
      var header = el('div', { class: 'sgs-plan-header' }, []);
      if (copy.plan.photo_url) header.appendChild(el('img', { src: copy.plan.photo_url, alt: '', class: 'sgs-plan-photo' }));
      header.appendChild(el('h1', { class: 'sgs-title', text: copy.plan.header }));
      header.appendChild(el('p', { class: 'sgs-prepared-by', text: copy.plan.prepared_by }));
      wrap.appendChild(header);

      if (model.is_safety_route) {
        var safetyBox = el('div', { class: 'sgs-safety' }, []);
        safetyBox.appendChild(el('h3', { text: copy.plan.safety.title }));
        model.safety_notes.forEach(function (note) { safetyBox.appendChild(el('p', { text: note })); });
        if (model.support_lines.length) {
          var lines = el('ul', {}, []);
          model.support_lines.forEach(function (line) { lines.appendChild(el('li', { text: line })); });
          safetyBox.appendChild(lines);
        }
        wrap.appendChild(safetyBox);
        pushEvent(flow.events.safety_route, {});
      }

      if (model.reflection) wrap.appendChild(el('p', { class: 'sgs-reflection', text: model.reflection }));
      if (model.reflection_struggle) wrap.appendChild(el('p', { class: 'sgs-reflection', text: model.reflection_struggle }));

      if (model.right_now) {
        wrap.appendChild(el('h3', { text: copy.plan.right_now_title }));
        wrap.appendChild(el('p', { text: model.right_now.title }));
      }

      wrap.appendChild(el('h3', { text: copy.plan.in_the_moment.title }));
      wrap.appendChild(el('p', { text: copy.plan.in_the_moment.body }));

      if (model.group) {
        wrap.appendChild(el('h3', { text: copy.plan.next_up.title }));
        wrap.appendChild(el('p', { text: copy.plan.next_up.body[model.group] || '' }));
      }

      if (model.for_you) {
        wrap.appendChild(el('h3', { text: copy.plan.for_you && copy.plan.for_you.title ? copy.plan.for_you.title : '' }));
        wrap.appendChild(el('p', { text: model.for_you }));
      }

      var joinBlock = el('div', { class: 'sgs-join' + (model.snooze_position === 'secondary' ? ' sgs-join--secondary' : '') }, []);
      joinBlock.appendChild(el('h3', { text: copy.plan.join.title }));
      if (copy.plan.join.body) joinBlock.appendChild(el('p', { class: 'sgs-body', text: copy.plan.join.body }));
      var symbol = model.snooze.currency === 'aud' ? 'A$' : 'US$';
      var price = el('p', { class: 'sgs-price', text: symbol + model.snooze.price + copy.plan.join.price_suffix });
      joinBlock.appendChild(price);
      joinBlock.appendChild(el('p', { text: copy.plan.join.guarantee }));
      var joinCta = el('a', { href: model.snooze.checkout_url, 'data-offer': 'snooze', class: 'sgs-cta' }, []);
      joinCta.textContent = copy.plan.join.cta;
      joinCta.addEventListener('click', function () { pushEvent(flow.events.option_click, { offer: 'snooze' }); });
      joinBlock.appendChild(joinCta);
      wrap.appendChild(joinBlock);

      var stepsBlock = el('div', { class: 'sgs-next-steps' }, []);
      stepsBlock.appendChild(el('h3', { text: copy.plan.next_steps.title }));
      var stepsList = el('ol', {}, []);
      (copy.plan.next_steps.snooze || []).forEach(function (step) { stepsList.appendChild(el('li', { text: step })); });
      stepsBlock.appendChild(stepsList);
      wrap.appendChild(stepsBlock);

      wrap.appendChild(el('h3', { text: copy.plan.more_support_title }));
      model.cards.forEach(function (card) {
        var cardEl;
        if (card.expanded) {
          cardEl = el('div', { class: 'sgs-card sgs-card--expanded' }, []);
          if (card.badge) cardEl.appendChild(el('span', { class: 'sgs-badge', text: card.badge }));
        } else {
          cardEl = el('details', { class: 'sgs-card' }, []);
          cardEl.appendChild(el('summary', { text: card.title }));
        }
        if (card.expanded) cardEl.appendChild(el('h4', { text: card.title }));
        cardEl.appendChild(el('p', { text: card.body }));
        var stepsL = el('ol', {}, []);
        card.next_steps.forEach(function (s) { stepsL.appendChild(el('li', { text: s })); });
        cardEl.appendChild(stepsL);
        var cta = el('a', { href: card.url, class: 'sgs-cta sgs-cta--outline' }, []);
        cta.textContent = card.cta;
        cta.addEventListener('click', function () { pushEvent(flow.events.option_click, { offer: card.key }); });
        cardEl.appendChild(cta);
        wrap.appendChild(cardEl);
      });

      root.appendChild(wrap);

      pushEvent(flow.events.plan_viewed, model.plan_viewed_payload);
    }

    function renderKillSwitch() {
      root.innerHTML = '';
      var wrap = el('div', { class: 'sgs-screen sgs-screen--killed' }, []);
      var consult = el('a', { href: '/one-on-one-sleep-consultations' }, []);
      consult.textContent = 'One-on-one sleep consultations';
      var membership = el('a', { href: '/snooze-membership' }, []);
      membership.textContent = 'Snooze Membership';
      wrap.appendChild(consult);
      wrap.appendChild(document.createTextNode(' '));
      wrap.appendChild(membership);
      root.appendChild(wrap);
    }

    function renderResume() {
      root.innerHTML = '';
      var wrap = el('div', { class: 'sgs-screen sgs-screen--resume' }, []);
      var heading = el('h2', { class: 'sgs-title', text: copy.resume.title });
      wrap.appendChild(heading);
      wrap.appendChild(el('p', { class: 'sgs-body', text: copy.resume.body }));
      var continueBtn = el('button', { type: 'button', class: 'sgs-cta' }, []);
      continueBtn.textContent = copy.resume.continue;
      continueBtn.addEventListener('click', function () {
        pushEvent(flow.events.resume, { via: 'return' });
        renderScreen(state.step || 'age');
      });
      var restartBtn = el('button', { type: 'button', class: 'sgs-cta sgs-cta--outline' }, []);
      restartBtn.textContent = copy.resume.restart;
      restartBtn.addEventListener('click', function () {
        state = stateReducer(null, { type: 'RESTART' });
        persist();
        renderScreen('welcome');
      });
      wrap.appendChild(continueBtn);
      wrap.appendChild(restartBtn);
      root.appendChild(wrap);
      focusHeading(heading);
    }

    function renderScreen(screenId) {
      if (screenId === 'welcome') return renderIntro();
      if (screenId === 'empathy') return renderEmpathy();
      if (screenId === 'building') return renderBuilding();
      if (screenId === 'email') return renderEmail();
      if (screenId === 'plan') return renderPlan();
      var screen = flow.screens.filter(function (s) { return s.id === screenId; })[0];
      if (!screen) return renderIntro();
      return renderChoiceScreen(screen);
    }

    function bindKeyboard() {
      document.addEventListener('keydown', function (e) {
        if (!root.contains(document.activeElement) && document.activeElement !== document.body) return;
        var chips = root.querySelectorAll('.sgs-chip');
        if (/^[1-9]$/.test(e.key)) {
          var idx = parseInt(e.key, 10) - 1;
          if (chips[idx]) chips[idx].click();
        }
        if (e.key === 'Enter') {
          var sticky = root.querySelector('.sgs-cta--sticky');
          if (sticky && !sticky.disabled) sticky.click();
        }
      });
    }

    function init() {
      bindKeyboard();
      var params = new URLSearchParams(window.location.search);
      var token = params.get('r');
      if (token) {
        var decoded = decodeResumeToken(token);
        if (decoded) {
          state = stateReducer(null, { type: 'RESTORE', answers: decoded, step: 'plan' });
          persist();
          pushEvent(flow.events.resume, { via: 'email' });
          renderScreen('plan');
          return;
        }
      }

      var stored = safeLoadState(storageKey);
      if (stored && (stored.completed || stored.email_captured)) {
        state = stored;
        renderScreen('plan');
        return;
      }
      if (stored && stored.step) {
        state = stored;
        renderResume();
        return;
      }
      state = initialState();
      renderScreen('welcome');
    }

    this.init = init;
    this.renderScreen = renderScreen;
  }

  function boot() {
    var root = document.getElementById('get-started-page');
    if (!root) return;
    var data = window.SNOOZE_GS_DATA || {};
    if (!data.flow || !data.copy) return;

    if (data.config && data.config.enabled === false) {
      root.innerHTML = '';
      var wrap = el('div', { class: 'sgs-screen sgs-screen--killed' }, []);
      var consult = el('a', { href: '/one-on-one-sleep-consultations' }, []);
      consult.textContent = 'One-on-one sleep consultations';
      var membership = el('a', { href: '/snooze-membership' }, []);
      membership.textContent = 'Snooze Membership';
      wrap.appendChild(consult);
      wrap.appendChild(document.createTextNode(' '));
      wrap.appendChild(membership);
      root.appendChild(wrap);
      return;
    }

    var app = new GetStartedApp(root, data);
    app.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.__snoozeGetStarted__ = PURE;
}());
</script>
