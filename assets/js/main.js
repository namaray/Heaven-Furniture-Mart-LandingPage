/* Heaven Furniture Mart — landing page behaviour.
   No dependencies.

   Design rule for this file: the page must never depend on JavaScript to be
   READABLE. Reveal animations are an enhancement with two independent
   fail-safes, because a blank page in front of a judge is unrecoverable. */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function revealAll() {
    Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function (el) {
      el.style.transitionDelay = '';
      el.classList.add('is-in');
    });
  }

  /* Images deliberately have no JS here. Empty slots are handled by the inline
     onerror attribute in the markup, which is registered at parse time — so
     photography renders even if this file never executes. */

  /* ----------------------------------------------------------------------
     Scroll reveal
     ---------------------------------------------------------------------- */

  var revealables = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealAll();
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(revealables, function (el, i) {
      // Fail-safe 1: anything already on screen is shown immediately rather than
      // waiting for the observer. Keeps the hero painted even if IO is throttled,
      // and avoids animating content the visitor is already looking at.
      if (el.getBoundingClientRect().top < window.innerHeight * 1.05) {
        el.classList.add('is-in');
        return;
      }
      // small stagger within a group so rows arrive in sequence, not all at once
      el.style.transitionDelay = (i % 4) * 60 + 'ms';
      revealObserver.observe(el);
    });

    // Fail-safe 2: whatever happens, nothing stays hidden past 1.5s. Combined
    // with fail-safe 1 (which never hides the first screenful), the worst case
    // is a brief delay on below-the-fold content — never a blank first view.
    window.setTimeout(revealAll, 1500);
  }

  /* ----------------------------------------------------------------------
     Bespoke clip — auto-loops muted, with an injected pause control.
     WCAG 2.2.2 requires a way to stop motion that runs longer than 5s, and
     prefers-reduced-motion must not auto-play at all.
     ---------------------------------------------------------------------- */

  var clip = document.getElementById('bespokeVideo');
  if (clip) {
    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'video-toggle';

    function paintToggle() {
      var paused = clip.paused;
      toggle.innerHTML = '<svg aria-hidden="true" focusable="false"><use href="#i-'
        + (paused ? 'play' : 'pause') + '"/></svg>';
      toggle.setAttribute('aria-label', paused ? 'Play the workshop clip' : 'Pause the workshop clip');
    }

    toggle.addEventListener('click', function () {
      if (clip.paused) { clip.play(); } else { clip.pause(); }
      paintToggle();
    });
    clip.addEventListener('play', paintToggle);
    clip.addEventListener('pause', paintToggle);

    paintToggle();
    clip.parentNode.appendChild(toggle);

    if (reduceMotion) {
      /* Honour the OS setting: no auto-playing motion. The toggle still lets
         someone start it deliberately. */
      clip.pause();
    } else {
      /* The autoplay attribute does the work; this is a belt-and-braces nudge
         for browsers that defer the start, and it surfaces a genuine block
         rather than failing silently. */
      var attempt = clip.play();
      if (attempt && attempt.catch) {
        attempt.catch(function () { paintToggle(); });
      }
    }
  }

  /* ----------------------------------------------------------------------
     Showroom tour — swap the poster for the real player only on click, so
     the page makes no request to YouTube unless the visitor asks for it.
     ---------------------------------------------------------------------- */

  var tourBtn = document.querySelector('.tour__btn');
  if (tourBtn) {
    tourBtn.addEventListener('click', function () {
      var frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + tourBtn.dataset.video
        + '?autoplay=1&rel=0&playsinline=1';
      frame.title = tourBtn.dataset.title;
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      frame.setAttribute('allowfullscreen', '');
      frame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      tourBtn.replaceWith(frame);
    });
  }

  /* ----------------------------------------------------------------------
     Header state + sticky mobile CTA

     Driven by an IntersectionObserver sentinel where available (cheaper and
     fires without a scroll event), with a passive scroll listener doing the
     same job as a fallback. Both funnel into one update function.
     ---------------------------------------------------------------------- */

  var header = document.getElementById('siteHeader');
  var stickyCta = document.getElementById('stickyCta');
  var hero = document.querySelector('.hero');
  var footer = document.querySelector('.site-footer');

  function update() {
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;

    if (header) header.classList.toggle('is-stuck', y > 24);

    /* Show the sticky CTA once the hero's own button has scrolled away, and
       hide it again over the footer so it never covers the contact details. */
    if (stickyCta) {
      var past = y > (hero ? hero.offsetHeight * 0.6 : 600);
      var overFooter = false;
      if (footer) {
        var fr = footer.getBoundingClientRect();
        overFooter = fr.top < window.innerHeight - 80;
      }
      stickyCta.classList.toggle('is-visible', past && !overFooter);
    }
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      update();
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  if ('IntersectionObserver' in window && hero && footer) {
    var stateObserver = new IntersectionObserver(update, {
      threshold: [0, 0.25, 0.5, 0.75, 1]
    });
    stateObserver.observe(hero);
    stateObserver.observe(footer);
  }

  update();
})();
