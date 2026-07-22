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
  '<symbol id="icon-chevron-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polyline points="9,5 16,12 9,19"/></symbol>' +
  '<symbol id="icon-arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="19" y2="12"/><polyline points="13,6 19,12 13,18"/></symbol>' +
  '<symbol id="icon-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></symbol>' +
  '<symbol id="icon-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.7c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8Z"/></symbol>' +
  '<symbol id="icon-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5.5" width="18" height="13" rx="1.6"/><path d="M4 6.5l8 6.2 8-6.2"/></symbol>' +
  '<symbol id="icon-map-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.5 7-11.6A7 7 0 0 0 5 9.4C5 14.5 12 21 12 21Z"/><circle cx="12" cy="9.4" r="2.4"/></symbol>' +
  '<symbol id="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4,12.5 9.5,18 20,6"/></symbol>' +
  '<symbol id="icon-check-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="7.5,12.3 10.5,15.3 16.5,8.7"/></symbol>' +
  '<symbol id="icon-shield-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5.2c0 4.6-3 8.3-7 9.8-4-1.5-7-5.2-7-9.8V6l7-3Z"/><polyline points="8.7,12.2 11,14.5 15.3,9.8"/></symbol>' +
  '<symbol id="icon-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z"/></symbol>' +
  '<symbol id="icon-factory" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V11l5 3.2V11l5 3.2V11l5 3.2V21H3Z"/><path d="M6.5 21v-4M12 21v-4M17.5 21v-4"/><path d="M8 7V3"/></symbol>' +
  '<symbol id="icon-truck" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="7" width="11" height="9"/><path d="M13.5 10h3.6L20.5 13v3h-7z"/><circle cx="7" cy="18" r="1.8"/><circle cx="17.5" cy="18" r="1.8"/></symbol>' +
  '<symbol id="icon-droplet" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.2s6 6.7 6 11a6 6 0 1 1-12 0c0-4.3 6-11 6-11Z"/></symbol>' +
  '<symbol id="icon-package" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 7.5 12 3l8.5 4.5V16.5L12 21l-8.5-4.5Z"/><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9"/></symbol>' +
  '<symbol id="icon-leaf" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4C10 4 4 10 4 18c8 0 14-6 14-14Z"/><path d="M5 19c3-5 6-8 12-12"/></symbol>' +
  '<symbol id="icon-flask" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 3h5M10 3v6.2L4.8 18a1.6 1.6 0 0 0 1.4 2.4h11.6a1.6 1.6 0 0 0 1.4-2.4L14 9.2V3"/><path d="M7.7 15h8.6"/></symbol>' +
  '<symbol id="icon-cross-medical" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></symbol>' +
  '<symbol id="icon-recycle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3.5 9.8 8H4.6L7 3.5Z"/><path d="M17 3.5 19.4 8h-5.2z" transform="rotate(120 17 5.5)"/><path d="M12 20.5 9.2 16h5.2z" transform="rotate(240 12 18)"/><circle cx="12" cy="12" r="8.2" stroke-dasharray="2 3"/></symbol>' +
  '<symbol id="icon-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5.5l3.6 2.2"/></symbol>' +
  '<symbol id="icon-users" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M2.8 20c.6-3.4 3.2-5.5 6.2-5.5s5.6 2.1 6.2 5.5"/><path d="M15.5 5.2c1.5.4 2.6 1.8 2.6 3.4 0 1.6-1.1 3-2.6 3.4M18 14.7c2.3.5 4 2.4 4.4 5.3"/></symbol>' +
  '<symbol id="icon-quote" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M3 10.5C3 6.9 5.7 4 9.6 3.4l.5 1.9C7.9 6 6.6 7.3 6.4 9H9.6v6.4H3V10.5Zm10.9 0c0-3.6 2.7-6.5 6.6-7.1l.5 1.9c-2.2.7-3.5 2-3.7 3.7h3.2v6.4h-6.6V10.5Z"/></symbol>' +
  '<symbol id="icon-download" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12.5M7.5 11 12 15.5 16.5 11"/><path d="M4 17.5v2A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5v-2"/></symbol>' +
  '<symbol id="icon-file-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h8l4 4v14H6Z"/><path d="M14 3v4h4"/><path d="M8.5 12.5h7M8.5 15.5h7M8.5 9.5h3"/></symbol>' +
  '<symbol id="icon-image" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="15" rx="1.4"/><circle cx="8.3" cy="9.8" r="1.7"/><path d="M21 16 15.5 11 6 19"/></symbol>' +
  '<symbol id="icon-linkedin" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.4 8.8h3.1V21H3.4V8.8Zm6.2 0h3v1.68h.04c.42-.78 1.44-1.6 2.96-1.6 3.16 0 3.75 2.02 3.75 4.66V21h-3.1v-5.9c0-1.4-.03-3.2-1.98-3.2-1.98 0-2.28 1.5-2.28 3.1V21h-3.1V8.8Z"/></symbol>' +
  '<symbol id="icon-alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5 21.5 20h-19L12 3.5Z"/><path d="M12 9.5v4.2"/><circle cx="12" cy="16.8" r="0.15" fill="currentColor"/></symbol>' +
  '<symbol id="icon-wheat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21V6"/><path d="M12 8c-2-1-3-.3-3.6.7M12 8c2-1 3-.3 3.6.7M12 11c-2-1-3-.3-3.6.7M12 11c2-1 3-.3 3.6.7M12 14c-2-1-3-.3-3.6.7M12 14c2-1 3-.3 3.6.7"/><path d="M12 6c0-1.5 1-3 2.5-3.4C12.9 3 12 4.4 12 6Z"/></symbol>' +
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
            '<a class="mega-link" href="' + p + 'product-dry-bulk-container-liners.html" role="menuitem"><span class="icon">' + icon('package') + '</span><span><strong>Dry Bulk Container Liners</strong><span>Bulk-grade liners for 20\', 40\' &amp; 45\' containers</span></span></a>' +
            '<a class="mega-link" href="' + p + 'product-flexitanks.html" role="menuitem"><span class="icon">' + icon('droplet') + '</span><span><strong>Flexitanks for Liquids</strong><span>Bulk liquid transport, 5,000&ndash;50,000+ litres</span></span></a>' +
            '<a class="mega-link" href="' + p + 'product-containment-bags.html" role="menuitem"><span class="icon">' + icon('flask') + '</span><span><strong>Containment Bags</strong><span>Pharma, healthcare &amp; chemical containment</span></span></a>' +
            '<a class="mega-link" href="' + p + 'product-industrial-packaging.html" role="menuitem"><span class="icon">' + icon('factory') + '</span><span><strong>Industrial Packaging</strong><span>Bespoke covers, liners &amp; sheeting, any shape</span></span></a>' +
            '<a class="mega-link" href="' + p + 'product-bladder-tanks.html" role="menuitem"><span class="icon">' + icon('leaf') + '</span><span><strong>Bladder Tanks &amp; Agriculture</strong><span>Flexible storage for water, fuel &amp; effluent</span></span></a>' +
            '<div class="mega-foot"><a class="btn-ghost" href="' + p + 'products.html">View all products ' + icon('arrow-right') + '</a></div>' +
          '</div>' +
        '</div>' +

        '<div class="nav-item' + isActive('industries') + '">' +
          '<button class="nav-link" aria-expanded="false" aria-haspopup="true">Industries ' + icon('chevron-down') + '</button>' +
          '<div class="mega" role="menu">' +
            '<a class="mega-link" href="' + p + 'industry-chemical.html" role="menuitem"><span class="icon">' + icon('flask') + '</span><span><strong>Chemical Manufacturing</strong><span>Bulk liquid &amp; dry chemical transport</span></span></a>' +
            '<a class="mega-link" href="' + p + 'industry-food-beverage.html" role="menuitem"><span class="icon">' + icon('droplet') + '</span><span><strong>Food &amp; Beverage</strong><span>Food-grade bulk liquid &amp; ingredient transport</span></span></a>' +
            '<a class="mega-link" href="' + p + 'industry-logistics.html" role="menuitem"><span class="icon">' + icon('truck') + '</span><span><strong>Logistics &amp; Freight</strong><span>Container conversion for bulk operators</span></span></a>' +
            '<a class="mega-link" href="' + p + 'industry-agriculture.html" role="menuitem"><span class="icon">' + icon('wheat') + '</span><span><strong>Agriculture &amp; Commodities</strong><span>Grain, fertiliser &amp; bulk commodity storage</span></span></a>' +
            '<a class="mega-link" href="' + p + 'industry-pharmaceutical.html" role="menuitem"><span class="icon">' + icon('cross-medical') + '</span><span><strong>Pharmaceutical &amp; Healthcare</strong><span>Cleanroom-adjacent containment solutions</span></span></a>' +
            '<div class="mega-foot"><a class="btn-ghost" href="' + p + 'industries.html">View all industries ' + icon('arrow-right') + '</a></div>' +
          '</div>' +
        '</div>' +

        '<div class="nav-item' + isActive('company') + '">' +
          '<button class="nav-link" aria-expanded="false" aria-haspopup="true">Company ' + icon('chevron-down') + '</button>' +
          '<div class="mega" role="menu">' +
            '<a class="mega-link" href="' + p + 'about.html" role="menuitem"><span class="icon">' + icon('users') + '</span><span><strong>About Us</strong><span>57 years of manufacturing, 1969&ndash;2026</span></span></a>' +
            '<a class="mega-link" href="' + p + 'manufacturing.html" role="menuitem"><span class="icon">' + icon('factory') + '</span><span><strong>Manufacturing</strong><span>UK, China &amp; India production facilities</span></span></a>' +
            '<a class="mega-link" href="' + p + 'quality-certifications.html" role="menuitem"><span class="icon">' + icon('shield-check') + '</span><span><strong>Quality &amp; Certifications</strong><span>ISO 9001, 14001, 22000, PAS1008:2016</span></span></a>' +
            '<a class="mega-link" href="' + p + 'sustainability.html" role="menuitem"><span class="icon">' + icon('recycle') + '</span><span><strong>Sustainability</strong><span>Recyclable materials &amp; responsible manufacturing</span></span></a>' +
          '</div>' +
        '</div>' +

        '<div class="nav-item' + isActive('resources') + '">' +
          '<button class="nav-link" aria-expanded="false" aria-haspopup="true">Resources ' + icon('chevron-down') + '</button>' +
          '<div class="mega" role="menu">' +
            '<a class="mega-link" href="' + p + 'news.html" role="menuitem"><span class="icon">' + icon('globe') + '</span><span><strong>Knowledge Centre</strong><span>Technical guides &amp; company news</span></span></a>' +
            '<a class="mega-link" href="' + p + 'faqs.html" role="menuitem"><span class="icon">' + icon('check-circle') + '</span><span><strong>FAQs</strong><span>Answers to common technical questions</span></span></a>' +
            '<a class="mega-link" href="' + p + 'resources.html" role="menuitem"><span class="icon">' + icon('download') + '</span><span><strong>Downloads</strong><span>Brochures &amp; spec sheets</span></span></a>' +
          '</div>' +
        '</div>' +

      '</nav>' +
      '<div class="header-actions">' +
        '<span class="header-phone">' + icon('phone') + ' +44 (0)1268 696 331</span>' +
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
      '<a class="mnav-sub" href="tel:+441268696331" style="margin-top:.75rem">' + icon('phone') + ' +44 (0)1268 696 331</a>' +
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
        '<img src="' + BASE + 'assets/images/logo/ppc-philton-logo.png" alt="PPC Philton" width="150" height="29" style="filter:brightness(0) invert(1)">' +
        '<p>Manufacturer of dry bulk container liners, flexitanks and bespoke industrial packaging. Trading since 1969, manufacturing in the UK, China and India.</p>' +
        '<div class="footer-social">' +
          '<a href="#" aria-label="PPC Philton on LinkedIn">' + icon('linkedin') + '</a>' +
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
        '<a href="tel:+441268696331">' + icon('phone') + ' +44 (0)1268 696 331</a>' +
        '<a href="mailto:enquiries@ppcphilton.com">' + icon('mail') + ' enquiries@ppcphilton.com</a>' +
      '</div>' +
    '</div>' +
    '<div class="container footer-bottom">' +
      '<div class="footer-legal">' +
        '<span>&copy; ' + year + ' Philton Polythene Converters Ltd, trading as PPC Philton. Registered in England, company no. 0949944.</span>' +
      '</div>' +
      '<div class="footer-credentials">' +
        '<span class="badge">' + icon('shield-check') + ' ISO 9001</span>' +
        '<span class="badge">' + icon('shield-check') + ' ISO 14001</span>' +
        '<span class="badge">' + icon('shield-check') + ' ISO 22000</span>' +
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

  document.dispatchEvent(new CustomEvent("partials:ready"));
})();
