/**
 * partials.js — shared header, footer and icon-sprite injection.
 *
 * WHY THIS EXISTS: the brief asks for reusable components in a site that
 * must run by double-clicking index.html (no server). True HTML includes
 * (fetch('header.html') or <iframe>) are blocked by browsers' same-origin
 * policy when the page is opened via file:// — there is no server to grant
 * an origin, so the request silently fails in Chrome/Edge. Injecting the
 * markup from an inline script sidesteps that entirely: no network
 * request is made, so it works identically under file:// and http(s)://
 *
 * Every page includes this file, then <header id="site-header"></header>
 * and <footer id="site-footer"></footer> placeholders, and sets
 * <body data-base="" | "../"> so links resolve from either the site root
 * or a /pages/ file. Keep assets/icons/sprite.svg (the human-readable
 * source of the icon set) in sync with ICON_SPRITE below if you add icons —
 * see README "Design decisions" for why the sprite is duplicated here.
 */
(function(){
  "use strict";

  var body = document.body;
  var BASE = body.getAttribute("data-base") || "";
  var PAGE = body.getAttribute("data-page") || "";

  function isActive(name){ return PAGE === name ? " is-active" : ""; }
  function icon(name, cls){ return '<svg class="icon ' + (cls||'') + '" aria-hidden="true"><use href="#icon-' + name + '"></use></svg>'; }

  /* ---------------------------------------------------------------- */
  /* Icon sprite — must mirror assets/icons/sprite.svg                 */
  /* ---------------------------------------------------------------- */
  var ICON_SPRITE = '' +
  '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true"><defs>' +
  '<symbol id="icon-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><line x1="3.5" y1="6.5" x2="20.5" y2="6.5"/><line x1="3.5" y1="12" x2="20.5" y2="12"/><line x1="3.5" y1="17.5" x2="20.5" y2="17.5"/></symbol>' +
  '<symbol id="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></symbol>' +
  '<symbol id="icon-chevron-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polyline points="5,9 12,16 19,9"/></symbol>' +
  '<symbol id="icon-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></symbol>' +
  '<symbol id="icon-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.7c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8Z"/></symbol>' +
  '<symbol id="icon-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5.5" width="18" height="13" rx="1.6"/><path d="M4 6.5l8 6.2 8-6.2"/></symbol>' +
  '<symbol id="icon-linkedin" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.4 8.8h3.1V21H3.4V8.8Zm6.2 0h3v1.68h.04c.42-.78 1.44-1.6 2.96-1.6 3.16 0 3.75 2.02 3.75 4.66V21h-3.1v-5.9c0-1.4-.03-3.2-1.98-3.2-1.98 0-2.28 1.5-2.28 3.1V21h-3.1V8.8Z"/></symbol>' +
  '</defs></svg>';

  /* ---------------------------------------------------------------- */
  /* Header                                                            */
  /* ---------------------------------------------------------------- */
  function headerHTML(){
    var p = BASE + "pages/";
    return '' +
    '<div class="header-inner">' +
      '<a class="brand" href="' + BASE + 'index.html" aria-label="PPC Philton — home">' +
        '<img src="' + BASE + 'assets/images/logo/ppc-philton-logo.png" alt="PPC Philton" width="180" height="35">' +
      '</a>' +
      '<nav class="primary-nav" aria-label="Primary">' +

        '<div class="nav-item' + isActive('products') + '">' +
          '<button class="nav-link" aria-expanded="false" aria-haspopup="true">Products ' + icon('chevron-down') + '</button>' +
          '<div class="mega" role="menu">' +
            '<a class="mega-link" href="' + p + 'product-dry-bulk-container-liners.html" role="menuitem"><span><strong>Dry Bulk Container Liners</strong><span>Bulk-grade liners for 20\', 40\' &amp; 45\' containers</span></span></a>' +
            '<a class="mega-link" href="' + p + 'product-flexitanks.html" role="menuitem"><span><strong>Flexitanks for Liquids</strong><span>Bulk liquid transport, 5,000&ndash;50,000+ litres</span></span></a>' +
            '<a class="mega-link" href="' + p + 'product-containment-bags.html" role="menuitem"><span><strong>Containment Bags</strong><span>Pharma, healthcare &amp; chemical containment</span></span></a>' +
            '<a class="mega-link" href="' + p + 'product-industrial-packaging.html" role="menuitem"><span><strong>Industrial Packaging</strong><span>Bespoke covers, liners &amp; sheeting, any shape</span></span></a>' +
            '<a class="mega-link" href="' + p + 'product-bladder-tanks.html" role="menuitem"><span><strong>Bladder Tanks &amp; Agriculture</strong><span>Flexible storage for water, fuel &amp; effluent</span></span></a>' +
            '<div class="mega-foot"><a class="btn-ghost" href="' + p + 'products.html">View all products</a></div>' +
          '</div>' +
        '</div>' +

        '<div class="nav-item' + isActive('industries') + '">' +
          '<button class="nav-link" aria-expanded="false" aria-haspopup="true">Industries ' + icon('chevron-down') + '</button>' +
          '<div class="mega" role="menu">' +
            '<a class="mega-link" href="' + p + 'industry-chemical.html" role="menuitem"><span><strong>Chemical Manufacturing</strong><span>Bulk liquid &amp; dry chemical transport</span></span></a>' +
            '<a class="mega-link" href="' + p + 'industry-food-beverage.html" role="menuitem"><span><strong>Food &amp; Beverage</strong><span>Food-grade bulk liquid &amp; ingredient transport</span></span></a>' +
            '<a class="mega-link" href="' + p + 'industry-logistics.html" role="menuitem"><span><strong>Logistics &amp; Freight</strong><span>Container conversion for bulk operators</span></span></a>' +
            '<a class="mega-link" href="' + p + 'industry-agriculture.html" role="menuitem"><span><strong>Agriculture &amp; Commodities</strong><span>Grain, fertiliser &amp; bulk commodity storage</span></span></a>' +
            '<a class="mega-link" href="' + p + 'industry-pharmaceutical.html" role="menuitem"><span><strong>Pharmaceutical &amp; Healthcare</strong><span>Cleanroom-adjacent containment solutions</span></span></a>' +
            '<div class="mega-foot"><a class="btn-ghost" href="' + p + 'industries.html">View all industries</a></div>' +
          '</div>' +
        '</div>' +

        '<div class="nav-item' + isActive('company') + '">' +
          '<button class="nav-link" aria-expanded="false" aria-haspopup="true">Company ' + icon('chevron-down') + '</button>' +
          '<div class="mega" role="menu">' +
            '<a class="mega-link" href="' + p + 'about.html" role="menuitem"><span><strong>About Us</strong><span>57 years of manufacturing, 1969&ndash;2026</span></span></a>' +
            '<a class="mega-link" href="' + p + 'manufacturing.html" role="menuitem"><span><strong>Manufacturing</strong><span>UK, China &amp; India production facilities</span></span></a>' +
            '<a class="mega-link" href="' + p + 'quality-certifications.html" role="menuitem"><span><strong>Quality &amp; Certifications</strong><span>ISO 9001, 14001, 22000, PAS1008:2016</span></span></a>' +
            '<a class="mega-link" href="' + p + 'sustainability.html" role="menuitem"><span><strong>Sustainability</strong><span>Recyclable materials &amp; responsible manufacturing</span></span></a>' +
          '</div>' +
        '</div>' +

        '<div class="nav-item' + isActive('resources') + '">' +
          '<button class="nav-link" aria-expanded="false" aria-haspopup="true">Resources ' + icon('chevron-down') + '</button>' +
          '<div class="mega" role="menu">' +
            '<a class="mega-link" href="' + p + 'news.html" role="menuitem"><span><strong>Knowledge Centre</strong><span>Technical guides &amp; company news</span></span></a>' +
            '<a class="mega-link" href="' + p + 'faqs.html" role="menuitem"><span><strong>FAQs</strong><span>Answers to common technical questions</span></span></a>' +
            '<a class="mega-link" href="' + p + 'resources.html" role="menuitem"><span><strong>Downloads</strong><span>Brochures &amp; spec sheets</span></span></a>' +
          '</div>' +
        '</div>' +

      '</nav>' +
      '<div class="header-actions">' +
        '<span class="header-phone">+44 (0)1268 696 331</span>' +
        '<a class="btn btn-primary btn-sm" href="' + p + 'contact.html">Get a quote</a>' +
        '<button class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">' +
          icon('menu', 'icon-menu') + icon('close', 'icon-close') +
        '</button>' +
      '</div>' +
    '</div>';
  }

  function mobileNavHTML(){
    var p = BASE + "pages/";
    return '' +
    '<div class="mnav-group">' +
      '<a class="mnav-title" style="display:block" href="' + BASE + 'index.html">Home</a>' +
    '</div>' +
    '<div class="mnav-group">' +
      '<p class="mnav-title">Products</p>' +
      '<a class="mnav-sub" href="' + p + 'product-dry-bulk-container-liners.html">Dry Bulk Container Liners</a>' +
      '<a class="mnav-sub" href="' + p + 'product-flexitanks.html">Flexitanks for Liquids</a>' +
      '<a class="mnav-sub" href="' + p + 'product-containment-bags.html">Containment Bags</a>' +
      '<a class="mnav-sub" href="' + p + 'product-industrial-packaging.html">Industrial Packaging</a>' +
      '<a class="mnav-sub" href="' + p + 'product-bladder-tanks.html">Bladder Tanks &amp; Agriculture</a>' +
    '</div>' +
    '<div class="mnav-group">' +
      '<p class="mnav-title">Industries</p>' +
      '<a class="mnav-sub" href="' + p + 'industry-chemical.html">Chemical Manufacturing</a>' +
      '<a class="mnav-sub" href="' + p + 'industry-food-beverage.html">Food &amp; Beverage</a>' +
      '<a class="mnav-sub" href="' + p + 'industry-logistics.html">Logistics &amp; Freight</a>' +
      '<a class="mnav-sub" href="' + p + 'industry-agriculture.html">Agriculture &amp; Commodities</a>' +
      '<a class="mnav-sub" href="' + p + 'industry-pharmaceutical.html">Pharmaceutical &amp; Healthcare</a>' +
    '</div>' +
    '<div class="mnav-group">' +
      '<p class="mnav-title">Company</p>' +
      '<a class="mnav-sub" href="' + p + 'about.html">About Us</a>' +
      '<a class="mnav-sub" href="' + p + 'manufacturing.html">Manufacturing</a>' +
      '<a class="mnav-sub" href="' + p + 'quality-certifications.html">Quality &amp; Certifications</a>' +
      '<a class="mnav-sub" href="' + p + 'sustainability.html">Sustainability</a>' +
    '</div>' +
    '<div class="mnav-group">' +
      '<p class="mnav-title">Resources</p>' +
      '<a class="mnav-sub" href="' + p + 'news.html">Knowledge Centre</a>' +
      '<a class="mnav-sub" href="' + p + 'faqs.html">FAQs</a>' +
      '<a class="mnav-sub" href="' + p + 'resources.html">Downloads</a>' +
    '</div>' +
    '<div class="mnav-group">' +
      '<a class="btn btn-primary btn-block" href="' + p + 'contact.html">Get a quote</a>' +
      '<a class="mnav-sub" href="tel:+441268696331" style="margin-top:.75rem">+44 (0)1268 696 331</a>' +
    '</div>';
  }

  /* ---------------------------------------------------------------- */
  /* Footer                                                            */
  /* ---------------------------------------------------------------- */
  function footerHTML(){
    var p = BASE + "pages/";
    var year = new Date().getFullYear();
    return '' +
    '<div class="container footer-top">' +
      '<div class="footer-brand">' +
        '<img src="' + BASE + 'assets/images/logo/ppc-philton-logo.png" alt="PPC Philton" width="150" height="29">' +
        '<p>Manufacturer of dry bulk container liners, flexitanks and bespoke industrial packaging. Trading since 1969, manufacturing in the UK, China and India.</p>' +
        '<div class="footer-social">' +
          '<a href="https://www.linkedin.com/company/philton-polythene-converters-ltd/" target="_blank" rel="noopener" aria-label="PPC Philton on LinkedIn">' + icon('linkedin') + '</a>' +
        '</div>' +
      '</div>' +
      '<div class="footer-col"><h3>Products</h3>' +
        '<a href="' + p + 'product-dry-bulk-container-liners.html">Dry Bulk Container Liners</a>' +
        '<a href="' + p + 'product-flexitanks.html">Flexitanks for Liquids</a>' +
        '<a href="' + p + 'product-containment-bags.html">Containment Bags</a>' +
        '<a href="' + p + 'product-industrial-packaging.html">Industrial Packaging</a>' +
        '<a href="' + p + 'product-bladder-tanks.html">Bladder Tanks &amp; Agriculture</a>' +
      '</div>' +
      '<div class="footer-col"><h3>Industries</h3>' +
        '<a href="' + p + 'industry-chemical.html">Chemical Manufacturing</a>' +
        '<a href="' + p + 'industry-food-beverage.html">Food &amp; Beverage</a>' +
        '<a href="' + p + 'industry-logistics.html">Logistics &amp; Freight</a>' +
        '<a href="' + p + 'industry-agriculture.html">Agriculture &amp; Commodities</a>' +
        '<a href="' + p + 'industry-pharmaceutical.html">Pharmaceutical &amp; Healthcare</a>' +
      '</div>' +
      '<div class="footer-col"><h3>Company</h3>' +
        '<a href="' + p + 'about.html">About Us</a>' +
        '<a href="' + p + 'manufacturing.html">Manufacturing</a>' +
        '<a href="' + p + 'quality-certifications.html">Quality &amp; Certifications</a>' +
        '<a href="' + p + 'sustainability.html">Sustainability</a>' +
        '<a href="' + p + 'news.html">Knowledge Centre</a>' +
      '</div>' +
      '<div class="footer-col"><h3>Get in touch</h3>' +
        '<a href="' + p + 'contact.html">Contact &amp; quote request</a>' +
        '<a href="' + p + 'faqs.html">FAQs</a>' +
        '<a href="' + p + 'resources.html">Brochures &amp; downloads</a>' +
        '<a href="tel:+441268696331">+44 (0)1268 696 331</a>' +
        '<a href="mailto:enquiries@ppcphilton.com">enquiries@ppcphilton.com</a>' +
      '</div>' +
    '</div>' +
    '<div class="container footer-bottom">' +
      '<div class="footer-legal">' +
        '<span>&copy; ' + year + ' Philton Polythene Converters Ltd, trading as PPC Philton. Registered in England, company no. 0949944.</span>' +
      '</div>' +
    '</div>';
  }

  /* ---------------------------------------------------------------- */
  /* Inject                                                            */
  /* ---------------------------------------------------------------- */
  var spriteHolder = document.createElement("div");
  spriteHolder.innerHTML = ICON_SPRITE;
  document.body.insertBefore(spriteHolder.firstChild, document.body.firstChild);

  var headerEl = document.getElementById("site-header");
  if(headerEl){ headerEl.innerHTML = headerHTML(); }

  var mobileNavEl = document.getElementById("mobile-nav");
  if(mobileNavEl){ mobileNavEl.innerHTML = mobileNavHTML(); }

  var footerEl = document.getElementById("site-footer");
  if(footerEl){ footerEl.innerHTML = footerHTML(); }
})();
