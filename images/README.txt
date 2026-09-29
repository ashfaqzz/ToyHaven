This folder is kept for local product images.

By default, Toy Haven uses hosted placeholder images (via placehold.co) in
script.js so the site works immediately with no missing/broken images.

To use your own local images instead:
1. Add your image files to this /images folder (e.g. images/figurine-1.jpg).
2. Open script.js and find the PRODUCTS array near the top.
3. Replace the "image" value for each product with a local path, e.g.
   image: "images/figurine-1.jpg"

No other code changes are required — every page reads product images from
this same PRODUCTS array.
