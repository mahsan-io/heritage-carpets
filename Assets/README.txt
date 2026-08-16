HERITAGE CARPET COMPANY — ASSETS FOLDER
========================================

LOGO (installed)
-----------------
File:   Assets/Heritage.png
Used:   nav bar + footer, on all three pages, in both languages.
This is your uploaded logo, processed for the web (background made
transparent, cropped tightly to the mark). See earlier notes if you
re-upload a different version -- it'll need the same treatment to avoid
a visible black box on the dark nav/footer.

PHOTOGRAPHY (optional -- drop files in with these exact names)
----------------------------------------------------------------
Every visual on the site currently uses a hand-drawn SVG motif in the
brand colors as a placeholder. Every one of those slots will automatically
switch to a real photo the moment a correctly-named file appears here --
no code changes needed. If a file is missing or fails to load, the SVG
motif just stays showing, so nothing ever looks broken.

Hero background (1 image):
  Assets/hero.jpg

Featured Collections -- homepage teaser cards (8 images):
  Assets/collections/handmade.jpg
  Assets/collections/persian.jpg
  Assets/collections/turkish.jpg
  Assets/collections/oriental.jpg
  Assets/collections/contemporary.jpg
  Assets/collections/machine-made.jpg
  Assets/collections/commercial.jpg
  Assets/collections/furniture.jpg

Featured Projects -- homepage gallery (8 images):
  Assets/projects/villa-majlis-jeddah.jpg
  Assets/projects/hotel-lobby-jeddah.jpg
  Assets/projects/corporate-hq-riyadh.jpg
  Assets/projects/royal-guest-residence.jpg
  Assets/projects/boutique-hotel-riyadh.jpg
  Assets/projects/mosque-hall-alkhobar.jpg
  Assets/projects/palace-reception-hall.jpg
  Assets/projects/family-villa-riyadh.jpg

Collections page -- product cards (16 images, matches each product's
Shopify handle so the filename will already be correct once real
products/handles replace the placeholder catalog):
  Assets/products/isfahan-medallion-silk-rug.jpg
  Assets/products/tabriz-floral-wool-carpet.jpg
  Assets/products/kashan-boteh-runner.jpg
  Assets/products/hereke-silk-masterpiece.jpg
  Assets/products/konya-kilim-geometric-rug.jpg
  Assets/products/anatolian-tribal-wool-rug.jpg
  Assets/products/silk-road-oriental-classic.jpg
  Assets/products/nain-fine-wool-carpet.jpg
  Assets/products/abstract-ivory-contemporary-rug.jpg
  Assets/products/charcoal-linear-contemporary-rug.jpg
  Assets/products/gold-trellis-contemporary-rug.jpg
  Assets/products/everyday-trellis-machine-made-rug.jpg
  Assets/products/durable-medallion-machine-made-rug.jpg
  Assets/products/hospitality-broadloom-carpet-tile.jpg
  Assets/products/prayer-hall-custom-carpet.jpg
  Assets/products/executive-office-carpet-tile.jpg

Notes:
  - Recommended: 1600px+ on the longer side, .jpg for photos (smaller
    file size than .png for real photography).
  - Same photo is used for both the English and Arabic version of a page
    -- these aren't language-specific.
  - Not wired up yet: the Bespoke Studio live preview (it's generated live
    from the visitor's own shape/color/pattern choices, so a static photo
    doesn't apply there) and the craftsmanship diagram on the homepage
    (it's a labeled technical diagram, not a photo slot -- ask if you'd
    like that swapped for a real macro photo instead, it's a different
    kind of change).
  - You don't need all 25 photos at once -- upload however many you have
    ready. Anything missing just keeps showing its SVG placeholder.

MULTIPLE IMAGES PER ITEM (new)
--------------------------------
Any collection, project, or product can now carry a whole set of photos
that rotate automatically as a small carousel inside its existing card --
first image shown immediately, auto-rotates every ~5s, pauses on hover,
shows dot indicators when there's more than one, and never changes the
card's size. Just add an `images` array to that item's entry in the page's
data block (inside the <script> at the bottom of index.html / collections.html):

  {
    n: '02', t: 'Persian Collection', ..., slug: 'persian',
    images: [
      'Assets/collections/persian-01.png',
      'Assets/collections/persian-02.png',
      'Assets/collections/persian-03.png'
    ],
    href: 'collections.html?category=persian'
  }

Same idea for a project or a product -- just add `images: [...]` with
whatever filenames you like (mixing .png/.jpg/.jpeg/.webp is fine, the
array uses exactly what you write).

If an item has no `images` array, it automatically falls back to the
single-photo convention already documented above (collections/{slug}.png,
projects/{slug}.jpg, products/{handle}.jpg) -- so nothing existing breaks,
and you can upgrade items to multi-image one at a time, whenever you're
ready, in any order.

If one image in a set fails to load, it's quietly dropped from the
rotation and the rest keep working. If every image in a set fails, the
card falls back to its SVG placeholder, same as before.
