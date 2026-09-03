HERITAGE — BRAND FONTS
======================

The site is wired for the two brand typefaces. Both are LICENSED fonts and
cannot be loaded from Google Fonts, so they must be self-hosted here.

Drop the webfont files in this folder using EXACTLY these names:

  TrajanPro-Regular.woff2
  TrajanPro-Bold.woff2
  AraEtabAlMonie_ee.woff2
  AraEtabAlMonie_ee-Bold.woff2

They are picked up automatically -- no code change needed.

UNTIL THEY ARE ADDED, the site falls back to:
  English headings -> Cinzel (Google Fonts). Cinzel is modelled on the same
                      classical Roman inscriptional letterforms as Trajan, so
                      it is the closest free stand-in.
  Arabic           -> Tajawal (Google Fonts).

LICENSING NOTE
--------------
A desktop font licence does NOT permit web use. To self-host Trajan you need
a WEBFONT licence:
  * Adobe Fonts (included with a Creative Cloud subscription) can serve Trajan
    via a web project embed code -- this is usually the simplest legal route.
  * Or buy a webfont licence from Fontspring / MyFonts and convert to .woff2.
Same applies to AraEtabAlMonie_ee -- get the webfont-licensed files from
whoever supplied the brand assets.

If you use the Adobe Fonts route instead of self-hosting, add their <link>
to each page's <head> and change --font-display in css/style.css to the
family name Adobe gives you.

IMPORTANT -- TRAJAN HAS NO LOWERCASE
------------------------------------
Trajan is a capitals-only typeface; its "lowercase" glyphs are small capitals.
That is correct and intentional for headings and the logo, which is how the
brand guideline shows it. It is NOT suitable for body copy or UI labels, so
body text, buttons and form fields stay on Inter (English) / the Arabic brand
font. Trajan also has no italic, so the few places that used italic emphasis
now use weight and colour instead.
