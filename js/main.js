/**
 * main.js — site-wide interactions: navigation, scroll reveal, accordions,
 * gallery lightbox, back-to-top and lightweight form handling.
 *
 * Written as small, independent modules that each check for the elements
 * they need before doing anything, so any page can include this file
 * regardless of which components it actually uses.
 */
(function(){
  "use strict";

  document.documentElement.classList.add("js-ready");

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------ */
  /* Navigation (runs once the header/footer partials are injected)      */
  /* ------------------------------------------------------------------ */
  document.addEventListener("partials:ready", function(){
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".nav-toggle");
    var mobileNav = document.getElementById("mobile-nav");

    // Mobile drawer
    if (toggle && mobileNav) {
      toggle.addEventListener("click", function(){
        var open = document.body.classList.toggle("nav-open");
        toggle.setAttribute("aria-expanded", String(open));
        mobileNav.classList.toggle("is-open", open);
        if (open) {
          var firstLink = mobileNav.querySelector("a, button");
          if (firstLink) firstLink.focus();
        } else {
          toggle.focus();
        }
      });
      mobileNav.addEventListener("click", function(e){
        if (e.target.tagName === "A") {
          document.body.classList.remove("nav-open");
          toggle.setAttribute("aria-expanded", "false");
          mobileNav.classList.remove("is-open");
        }
      });
    }

    // Desktop mega-menu: click/keyboard toggle in addition to CSS :hover
    var navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(function(item){
      var trigger = item.querySelector(".nav-link");
      if (!trigger) return;
      trigger.addEventListener("click", function(e){
        e.preventDefault();
        var willOpen = !item.classList.contains("is-open");
        navItems.forEach(function(other){
          other.classList.remove("is-open");
          var t = other.querySelector(".nav-link");
          if (t) t.setAttribute("aria-expanded", "false");
        });
        if (willOpen) {
          item.classList.add("is-open");
          trigger.setAttribute("aria-expanded", "true");
        }
      });
    });
    document.addEventListener("click", function(e){
      if (!e.target.closest(".nav-item")) {
        navItems.forEach(function(item){
          item.classList.remove("is-open");
          var t = item.querySelector(".nav-link");
          if (t) t.setAttribute("aria-expanded", "false");
        });
      }
    });
    document.addEventListener("keydown", function(e){
      if (e.key === "Escape") {
        navItems.forEach(function(item){ item.classList.remove("is-open"); });
        if (document.body.classList.contains("nav-open") && toggle) toggle.click();
      }
    });

    // Header shrink/shadow on scroll
    if (header) {
      var onScroll = function(){
        header.classList.toggle("is-scrolled", window.scrollY > 8);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  });

  /* ------------------------------------------------------------------ */
  /* Scroll reveal                                                       */
  /* ------------------------------------------------------------------ */
  var revealTargets = document.querySelectorAll(".reveal");
  if (revealTargets.length && "IntersectionObserver" in window && !prefersReducedMotion) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    revealTargets.forEach(function(el){ io.observe(el); });
  } else {
    revealTargets.forEach(function(el){ el.classList.add("is-visible"); });
  }

  /* ------------------------------------------------------------------ */
  /* Sub-nav scrollspy (product / long pages)                             */
  /* ------------------------------------------------------------------ */
  var subnavLinks = document.querySelectorAll(".subnav a[href^='#']");
  if (subnavLinks.length && "IntersectionObserver" in window) {
    var sections = [];
    subnavLinks.forEach(function(link){
      var id = link.getAttribute("href").slice(1);
      var section = document.getElementById(id);
      if (section) sections.push({ link: link, section: section });
    });
    var subnavIo = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        var match = sections.find(function(s){ return s.section === entry.target; });
        if (!match) return;
        if (entry.isIntersecting) {
          subnavLinks.forEach(function(l){ l.classList.remove("is-active"); });
          match.link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function(s){ subnavIo.observe(s.section); });
  }

  /* ------------------------------------------------------------------ */
  /* Accordion (FAQs)                                                    */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll(".accordion-trigger").forEach(function(trigger){
    var panel = document.getElementById(trigger.getAttribute("aria-controls"));
    if (!panel) return;
    trigger.addEventListener("click", function(){
      var expanded = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!expanded));
      panel.style.maxHeight = expanded ? "0px" : panel.scrollHeight + "px";
    });
  });

  /* ------------------------------------------------------------------ */
  /* Gallery lightbox                                                    */
  /* ------------------------------------------------------------------ */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  var lightbox = document.querySelector(".lightbox");
  if (galleryItems.length && lightbox) {
    var lbImg = lightbox.querySelector("img");
    var lbCaption = lightbox.querySelector(".lightbox-caption");
    var lastTrigger = null;
    var currentIndex = 0;

    function openLightbox(index){
      currentIndex = index;
      var item = galleryItems[index];
      var img = item.querySelector("img");
      lbImg.src = img.getAttribute("data-full") || img.src;
      lbImg.alt = img.alt;
      lbCaption.textContent = img.getAttribute("data-caption") || img.alt;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      lightbox.querySelector(".lightbox-close").focus();
      document.body.style.overflow = "hidden";
    }
    function closeLightbox(){
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastTrigger) lastTrigger.focus();
    }
    galleryItems.forEach(function(item, index){
      item.addEventListener("click", function(){ lastTrigger = item; openLightbox(index); });
      item.addEventListener("keydown", function(e){
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); lastTrigger = item; openLightbox(index); }
      });
    });
    var closeBtn = lightbox.querySelector(".lightbox-close");
    var prevBtn = lightbox.querySelector(".lightbox-prev");
    var nextBtn = lightbox.querySelector(".lightbox-next");
    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (prevBtn) prevBtn.addEventListener("click", function(){ openLightbox((currentIndex - 1 + galleryItems.length) % galleryItems.length); });
    if (nextBtn) nextBtn.addEventListener("click", function(){ openLightbox((currentIndex + 1) % galleryItems.length); });
    lightbox.addEventListener("click", function(e){ if (e.target === lightbox) closeLightbox(); });
    document.addEventListener("keydown", function(e){
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft" && prevBtn) prevBtn.click();
      if (e.key === "ArrowRight" && nextBtn) nextBtn.click();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Back to top                                                         */
  /* ------------------------------------------------------------------ */
  var backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", function(){
      backToTop.classList.toggle("is-visible", window.scrollY > window.innerHeight);
    }, { passive: true });
    backToTop.addEventListener("click", function(){
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Interactive regional map (Contact page)                              */
  /* ------------------------------------------------------------------ */
  var mapPins = document.querySelectorAll(".map-pin");
  var mapPanel = document.getElementById("map-info-panel");
  if (mapPins.length && mapPanel) {
    var icon = function(name){ return '<svg><use href="#icon-' + name + '"></use></svg>'; };
    mapPins.forEach(function(pin){
      pin.addEventListener("click", function(){
        mapPins.forEach(function(p){ p.classList.remove("is-active"); p.setAttribute("aria-pressed", "false"); });
        pin.classList.add("is-active");
        pin.setAttribute("aria-pressed", "true");

        var name = pin.getAttribute("data-name") || "";
        var type = pin.getAttribute("data-type") || "";
        var contact = pin.getAttribute("data-contact") || "";
        var phone = pin.getAttribute("data-phone") || "";
        var phoneHref = pin.getAttribute("data-phone-href") || "";
        var email = pin.getAttribute("data-email") || "";

        var html = '<span class="type">' + type + '</span><h4>' + name + '</h4>';
        if (contact) html += '<span class="contact-name">' + contact + '</span>';
        if (phone) html += '<a href="tel:' + phoneHref + '">' + icon("phone") + phone + '</a>';
        if (email) html += '<a href="mailto:' + email + '">' + icon("mail") + email + '</a>';
        mapPanel.innerHTML = html;
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Lightweight form handling (no backend in this mock-up)               */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll(".js-form").forEach(function(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var success = form.parentElement.querySelector(".form-success");
      form.style.display = "none";
      if (success) {
        success.classList.add("is-visible");
        success.setAttribute("tabindex", "-1");
        success.focus();
      }
    });
  });

})();
