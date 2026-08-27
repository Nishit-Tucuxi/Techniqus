CUSTOM ILLUSTRATIONS
=====================
All visuals on this site are hand-built, self-animating SVG files stored
right here in assets/illustrations/ — nothing is loaded from an external
URL, so the site works fully offline and has zero third-party image
dependencies or licensing concerns.

Files:
- storage.svg          → Storage Accessories card
- docking-hub.svg       → Docking Stations & Hubs card (also reused on About)
- cables-adapters.svg   → Cables & Connectivity Adapters card
- personal-audio.svg    → Personal & Audio Accessories card

The homepage hero illustration is inlined directly inside index.html
(not a separate file) so it can respond to mouse movement via JavaScript
for the parallax effect — see js/script.js, the "Hero illustration
mouse-parallax" section.

REPLACING WITH REAL PRODUCT PHOTOGRAPHY LATER
-----------------------------------------------
These are original illustrations, not photos of your actual products.
Whenever you have real product photography (actual SanDisk drives, hubs,
etc.), you can swap any <img src="assets/illustrations/....svg"> for a
real photo file dropped into an /assets/images/ folder — just update the
src path. The layout (product-media, aspect-ratio, hover zoom) works the
same either way.
