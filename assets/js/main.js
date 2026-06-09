/* =========================================================================
   ED COLLECTIVITÉS — Scripts d'interaction (vanilla JS)
   - Mobile nav toggle
   - Header sticky avec état "scrolled"
   - Reveal au scroll (IntersectionObserver)
   - Formulaire de contact (validation + envoi vers Formspree)
   ========================================================================= */

(function () {
  'use strict';

  /* ----------------------------- 1. Menu plein écran ----------------------- */
  const menu = document.querySelector('[data-nav]');
  // Tous les déclencheurs : burger (ouvre) + bouton fermer (ferme)
  const menuTriggers = document.querySelectorAll('[data-nav-toggle]');

  if (menu && menuTriggers.length) {
    const openMenu = () => {
      menu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      menuTriggers.forEach(t => t.setAttribute('aria-expanded', 'true'));
    };
    const closeMenu = () => {
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
      menuTriggers.forEach(t => t.setAttribute('aria-expanded', 'false'));
    };
    const toggleMenu = () => {
      menu.classList.contains('is-open') ? closeMenu() : openMenu();
    };

    menuTriggers.forEach(trigger => {
      trigger.addEventListener('click', toggleMenu);
    });

    // Fermer au clic sur un lien du menu
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Fermer avec la touche Échap
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) closeMenu();
    });
  }

  /* ----------------------------- 2. Header sticky -------------------------- */
  const header = document.querySelector('[data-header]');
  if (header) {
    let lastScroll = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 8) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
      lastScroll = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----------------------------- 3. Reveal au scroll ----------------------- */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback : tout afficher
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  /* ----------------------------- 4. Année auto footer ---------------------- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----------------------------- 5. Pré-remplissage objet via query string - */
  // ex: /contact.html?objet=recrutement
  const params = new URLSearchParams(window.location.search);
  const objetParam = params.get('objet');
  const objetSelect = document.querySelector('[name="objet"]');
  if (objetParam && objetSelect) {
    const match = Array.from(objetSelect.options).find(
      o => o.value.toLowerCase() === objetParam.toLowerCase()
    );
    if (match) objetSelect.value = match.value;
  }

  /* ----------------------------- 6. Slider horizontal ---------------------- */
  const sliders = document.querySelectorAll('[data-slider]');

  sliders.forEach(slider => {
    const track = slider.querySelector('[data-slider-track]');
    const prevBtn = slider.querySelector('[data-slider-prev]');
    const nextBtn = slider.querySelector('[data-slider-next]');
    if (!track || !prevBtn || !nextBtn) return;

    // Largeur d'un slide + gap (pour scroller exactement d'une carte)
    const getStep = () => {
      const slide = track.firstElementChild;
      if (!slide) return 320;
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || 0);
      return slide.offsetWidth + gap;
    };

    const updateButtons = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      prevBtn.disabled = track.scrollLeft <= 2;
      nextBtn.disabled = track.scrollLeft >= maxScroll - 2;
    };

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: getStep(), behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    updateButtons();
  });

  /* ----------------------------- 7. Formulaire de contact ------------------ */
  const form = document.querySelector('[data-contact-form]');
  const successBlock = document.querySelector('[data-form-success]');
  const submitBtn = form ? form.querySelector('[type="submit"]') : null;

  function setFieldError(field, hasError) {
    const wrapper = field.closest('.field, .checkbox');
    if (!wrapper) return;
    wrapper.classList.toggle('has-error', hasError);
  }

  function validateForm() {
    if (!form) return false;
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      let error;
      if (field.type === 'checkbox') {
        error = !field.checked;                 // case à cocher : doit être cochée
      } else {
        const val = (field.value || '').trim();
        const isInvalidEmail = field.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        error = !val || isInvalidEmail;
      }
      setFieldError(field, error);
      if (error) valid = false;
    });
    return valid;
  }

  if (form) {
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('blur', () => {
        if (field.type === 'checkbox') return;   // la case RGPD est validée à l'envoi
        const val = (field.value || '').trim();
        if (field.hasAttribute('required') && !val) setFieldError(field, true);
        else setFieldError(field, false);
      });
      const clearOnInteraction = () => {
        const wrapper = field.closest('.field, .checkbox');
        if (wrapper && wrapper.classList.contains('has-error')) setFieldError(field, false);
      };
      field.addEventListener('input', clearOnInteraction);
      field.addEventListener('change', clearOnInteraction);  // couvre la case à cocher
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateForm()) {
        const firstError = form.querySelector('.field.has-error, .checkbox.has-error');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // Anti-spam : si le honeypot est rempli, c'est un robot. On simule un succès sans rien envoyer.
      const honeypot = form.querySelector('[name="_gotcha"]');
      if (honeypot && honeypot.value) {
        form.style.display = 'none';
        if (successBlock) successBlock.classList.add('is-visible');
        return;
      }

      const originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours…';
      }

      try {
        const data = new FormData(form);
        const endpoint = form.getAttribute('action');

        // Envoi (Formspree, Basin, ou autre service ; voir README)
        const response = await fetch(endpoint, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' }
        });

        if (response.ok) {
          form.style.display = 'none';
          if (successBlock) {
            successBlock.classList.add('is-visible');
            successBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else {
          throw new Error('Envoi impossible');
        }
      } catch (err) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
        alert(
          'Impossible d’envoyer votre message pour le moment. ' +
          'Vous pouvez nous écrire directement à contact@ed-collectivites.fr ou nous appeler au 05 63 22 93 56.'
        );
      }
    });
  }
})();
