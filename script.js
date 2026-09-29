/* =========================================================================
   TOY HAVEN — SHARED JAVASCRIPT
   This single file is loaded by every page. Functions check whether the
   elements they need exist on the current page before running, so it is
   safe to share one file across index / products / cart / checkout /
   wishlist / feedback.

   SECTIONS IN THIS FILE
   1. Product data (the "database" for this front-end-only project)
   2. Small helper functions
   3. Cart (localStorage) functions
   4. Wishlist (localStorage) functions
   5. Navigation (hamburger menu + active link + badge counts)
   6. Hero slider (home page)
   7. Product of the Day (home page)
   8. Featured products (home page)
   9. Newsletter subscription (footer, every page)
   10. Products page (render, filter, search, modal)
   11. Cart page
   12. Checkout page (validation, order summary, order history)
   13. Wishlist page
   14. Feedback page + FAQ accordion
   15. Scroll reveal animation
   16. Page init — runs the correct functions for the current page
   ========================================================================= */


/* ---------------------------------------------------------------------
   1. PRODUCT DATA
   In a real store this would come from a server/database. For this
   assignment it is a plain JavaScript array of objects, which is exactly
   what the brief asks for ("Product data must use JavaScript objects").
   --------------------------------------------------------------------- */
const PRODUCTS = [
  // ---------------- Figurines ----------------
  {
    id: 1,
    name: "Hatching Dinosaur",
    category: "toys",
    price: 2949.00,
    image: "images/dinosaur.jpg",
    description: "A dinosaur egg toy for imaginative play.",
  },
  {
    id: 2,
    name: "Spiderman Mask",
    category: "toys",
    price: 29449.00,
    image: "images/Black Tobey Spiderman Mask.webp",
    description: "A Spider-Man mask for superhero dress-up and imaginative play.",
  },
  {
    id: 3,
    name: "WS Game",
    category: "boardgames",
    price: 1799.00,
    image: "images/WS Game Company.webp",
    description: "A board game for spending time with friends and family.",
  },
  {
    id: 4,
    name: "Hot Wheels",
    category: "diecast",
    price: 2700.00,
    image: "images/Hot Wheels Car 10 pack.webp",
    description: "A collection of Hot Wheels cars for racing and imaginative play.",
  },
  {
    id: 5,
    name: "Hover Soccer Ball",
    category: "toys",
    price: 3949.00,
    image: "images/Hover Soccer Ball.jpg",
    description: "A hover soccer ball for indoor football fun.",
  },

  // ---------------- Toys ----------------
  {
    id: 6,
    name: "Hulk Toy",
    category: "toys",
    price: 1950.00,
    image: "images/Hulk 11.8 Inches Figure.jpg",
    description: "A Hulk figure for superhero adventures and display.",
  },
  {
    id: 7,
    name: "Iron Patriot",
    category: "figurines",
    price: 2400.00,
    image: "images/Iron Patriot.jpg",
    description: "An Iron Patriot figure for Marvel fans and collectors.",
  },
  {
    id: 8,
    name: "Ironman Mini",
    category: "figurines",
    price: 2499.00,
    image: "images/IRONMAN ZD Figure.webp",
    description: "A mini Iron Man figure for play and display.",
  },
  {
    id: 9,
    name: "Labubu",
    category: "toys",
    price: 4399.00,
    image: "images/Labubu Doll.webp",
    description: "A Labubu doll to add character to your collection.",
  },
  {
    id: 10,
    name: "Lego Set",
    category: "toys",
    price: 6439.00,
    image: "images/LEGO Set.jpg",
    description: "A LEGO building set for creative construction and imaginative play.",
  },

  // ---------------- Board Games ----------------
  {
    id: 11,
    name: "Motor Dirtbike",
    category: "diecast",
    price: 3599.00,
    image: "images/Mini Motor Dirtbike.jpg",
    description: "A miniature dirtbike for vehicle enthusiasts and pretend racing.",
  },
  {
    id: 12,
    name: "Mini Rocking Horse",
    category: "toys",
    price: 949.00,
    image: "images/Mini Rocking Horse.webp",
    description: "A miniature rocking horse toy with a classic design.",
  },
  {
    id: 13,
    name: "Nerf N series Double Impact",
    category: "toys",
    price: 2449.00,
    image: "images/Nerf N series Double Impact.jpg",
    description: "A Nerf N Series Double Impact blaster for target games.",
  },
  {
    id: 14,
    name: "Tiny Teddies",
    category: "toys",
    price: 749.00,
    image: "images/Small Soft Toys.webp",
    description: "Small soft toys for cuddling, collecting or gifting.",
  },
  {
    id: 15,
    name: "RC Car",
    category: "toys",
    price: 5700.00,
    image: "images/RC Car.png",
    description: "A remote-controlled car for driving and racing fun.",
  },

  // ---------------- Diecast Model Cars ----------------
  {
    id: 16,
    name: "Rubik's Cube",
    category: "toys",
    price: 849.00,
    image: "images/Rubik's Cube.jpg",
    description: "A colourful twist-and-turn puzzle to challenge your problem-solving skills.",
  },
  {
    id: 17,
    name: "Spiderman",
    category: "figurines",
    price: 2900.00,
    image: "images/Spiderman.jpg",
    description: "A Spider-Man figure for superhero play and display.",
  },
  {
    id: 18,
    name: "Squishy Cat",
    category: "toys",
    price: 3700.00,
    image: "images/Squishy Cat.jpg",
    description: "A squishy cat toy with a playful design.",
  },
  {
    id: 19,
    name: "Wooden Train Set",
    category: "toys",
    price: 5349.00,
    image: "images/Wooden Train Set.webp",
    description: "A wooden train set for imaginative railway adventures.",
  },
  {
    id: 20,
    name: "Woody Doll",
    category: "toys",
    price: 2349.00,
    image: "images/Woody Doll.jpg",
    description: "A Woody character doll for Toy Story fans and imaginative play.",
  }
];

// Human-friendly labels for category codes, reused across pages.
const CATEGORY_LABELS = {
  figurines: "Figurines",
  toys: "Toys",
  boardgames: "Board Games",
  diecast: "Diecast Cars"
};


/* ---------------------------------------------------------------------
   2. SMALL HELPER FUNCTIONS
   --------------------------------------------------------------------- */

// Shortcut for document.querySelector
function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}

// Shortcut for document.querySelectorAll, returned as a real array
function qsa(selector, scope) {
  return Array.from((scope || document).querySelectorAll(selector));
}

// Formats a number as a price string, e.g. 19.9 -> "$19.90"
function formatPrice(value) {
  return "RS. " + Number(value).toFixed(2);
}

// Finds a single product object by its id
function getProductById(id) {
  return PRODUCTS.find((product) => product.id === Number(id));
}

// Escapes text before inserting it into HTML, to avoid layout-breaking
// characters when we render user or product data.
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}


/* ---------------------------------------------------------------------
   3. CART FUNCTIONS (localStorage)
   The cart is stored as an array of { id, quantity } objects under the
   key "toyhaven_cart". These functions are reused on every page.
   --------------------------------------------------------------------- */

// Reads the cart array from localStorage (returns [] if nothing saved yet)
function getCart() {
  const raw = localStorage.getItem("toyhaven_cart");
  return raw ? JSON.parse(raw) : [];
}

// Saves the cart array back to localStorage as a JSON string
function saveCart(cart) {
  localStorage.setItem("toyhaven_cart", JSON.stringify(cart));
}

// Adds a product to the cart, or increases its quantity if already present
function addToCart(productId, quantity) {
  quantity = quantity || 1;
  const cart = getCart();
  const existing = cart.find((item) => item.id === Number(productId));

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: Number(productId), quantity: quantity });
  }

  saveCart(cart);
  updateCartCount();
  showToast("Added to cart!");
}

// Removes a product from the cart entirely
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== Number(productId));
  saveCart(cart);
  updateCartCount();
}

// Changes the quantity of a product already in the cart (min 1)
function updateCartQuantity(productId, newQuantity) {
  const cart = getCart();
  const item = cart.find((item) => item.id === Number(productId));
  if (!item) return;
  item.quantity = Math.max(1, newQuantity);
  saveCart(cart);
  updateCartCount();
}

// Empties the cart completely
function clearCart() {
  saveCart([]);
  updateCartCount();
}

// Returns the total number of items in the cart (sum of quantities)
function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

// Returns the total price of everything in the cart
function getCartTotal() {
  return getCart().reduce((sum, item) => {
    const product = getProductById(item.id);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);
}

// Updates every cart-count badge on the current page (there may be more
// than one, e.g. desktop nav + mobile nav) to match localStorage.
function updateCartCount() {
  const count = getCartCount();
  qsa(".cart-count").forEach((el) => {
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
}


/* ---------------------------------------------------------------------
   4. WISHLIST FUNCTIONS (localStorage)
   Stored as an array of { id, status } objects under "toyhaven_wishlist".
   status is one of: "interested", "owned", "not-interested"
   --------------------------------------------------------------------- */

function getWishlist() {
  const raw = localStorage.getItem("toyhaven_wishlist");
  return raw ? JSON.parse(raw) : [];
}

function saveWishlist(wishlist) {
  localStorage.setItem("toyhaven_wishlist", JSON.stringify(wishlist));
}

// Adds a product to the wishlist with a default status if not already saved
function addToWishlist(productId) {
  const wishlist = getWishlist();
  const alreadySaved = wishlist.find((item) => item.id === Number(productId));

  if (!alreadySaved) {
    wishlist.push({ id: Number(productId), status: "interested" });
    saveWishlist(wishlist);
    showToast("Added to wishlist!");
  } else {
    showToast("Already in your wishlist");
  }

  updateWishlistCount();
  updateWishlistButtons();
}

function removeFromWishlist(productId) {
  let wishlist = getWishlist();
  wishlist = wishlist.filter((item) => item.id !== Number(productId));
  saveWishlist(wishlist);
  updateWishlistCount();
  updateWishlistButtons();
}

// Updates the status ("interested" / "owned" / "not-interested") of a saved item
function updateWishlistStatus(productId, status) {
  const wishlist = getWishlist();
  const item = wishlist.find((item) => item.id === Number(productId));
  if (item) {
    item.status = status;
    saveWishlist(wishlist);
  }
}

function updateWishlistCount() {
  const count = getWishlist().length;
  qsa(".wishlist-count").forEach((el) => {
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
}

// Marks wishlist heart buttons as "active" if that product is already saved
function updateWishlistButtons() {
  const wishlist = getWishlist();
  qsa("[data-wishlist-btn]").forEach((btn) => {
    const id = Number(btn.getAttribute("data-wishlist-btn"));
    const saved = wishlist.some((item) => item.id === id);
    btn.classList.toggle("is-active", saved);
    btn.setAttribute("aria-pressed", saved ? "true" : "false");
  });
}


/* ---------------------------------------------------------------------
   TOAST MESSAGE (small popup confirming an action, e.g. "Added to cart")
   --------------------------------------------------------------------- */
function showToast(message) {
  let toast = qs("#toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.style.cssText = [
      "position:fixed", "bottom:24px", "left:50%", "transform:translateX(-50%) translateY(20px)",
      "background:#ff7a29", "color:#12141c", "padding:12px 22px", "border-radius:999px",
      "font-weight:600", "box-shadow:0 10px 24px rgba(0,0,0,0.35)", "z-index:2000",
      "opacity:0", "transition:opacity 250ms ease, transform 250ms ease"
    ].join(";");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(20px)";
  }, 1800);
}


/* ---------------------------------------------------------------------
   5. NAVIGATION — hamburger menu, active link, badge counts
   --------------------------------------------------------------------- */
function initNavigation() {
  const hamburger = qs(".hamburger");
  const navLinks = qs("#navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close the mobile menu once a link is chosen
    qsa("a", navLinks).forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Highlight the current page in the nav using the body's data-page attribute
  const currentPage = document.body.getAttribute("data-page");
  qsa(".nav-links a").forEach((link) => {
    if (link.getAttribute("data-page") === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });

  updateCartCount();
  updateWishlistCount();
}


/* ---------------------------------------------------------------------
   6. HERO SLIDER (home page)
   --------------------------------------------------------------------- */
function initHeroSlider() {
  const slider = qs(".slider");
  if (!slider) return;

  const slides = qsa(".slide", slider);
  const dotsWrap = qs(".slider-dots", slider);
  let current = 0;
  let timer;

  // Build one navigation dot per slide
  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "Go to slide " + (index + 1));
    dot.setAttribute("aria-current", index === 0 ? "true" : "false");
    dot.addEventListener("click", () => goToSlide(index));
    dotsWrap.appendChild(dot);
  });

  function goToSlide(index) {
    slides[current].classList.remove("active");
    qsa("button", dotsWrap)[current].setAttribute("aria-current", "false");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
    qsa("button", dotsWrap)[current].setAttribute("aria-current", "true");
  }

  function nextSlide() {
    goToSlide(current + 1);
  }

  function startAutoplay() {
    timer = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    clearInterval(timer);
  }

  qs(".slider-arrow.next", slider).addEventListener("click", () => {
    nextSlide();
    stopAutoplay();
    startAutoplay();
  });

  qs(".slider-arrow.prev", slider).addEventListener("click", () => {
    goToSlide(current - 1);
    stopAutoplay();
    startAutoplay();
  });

  // Pause autoplay while the user's mouse is over the slider
  slider.addEventListener("mouseenter", stopAutoplay);
  slider.addEventListener("mouseleave", startAutoplay);

  startAutoplay();
}


/* ---------------------------------------------------------------------
   7. PRODUCT OF THE DAY
   The "day" is used to deterministically pick a product, so the same
   product shows all day but changes automatically tomorrow. This is a
   simple, explainable way to make the selection "dynamic".
   --------------------------------------------------------------------- */
function getProductOfTheDay() {
  const today = new Date();
  // A day-number that changes once every calendar day
  const dayNumber = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  const index = dayNumber % PRODUCTS.length;
  return PRODUCTS[index];
}

function renderProductOfTheDay() {
  const wrap = qs("#productOfDay");
  if (!wrap) return;

  const product = getProductOfTheDay();
  wrap.innerHTML = `
    <div class="potd-image">
      <img src="${product.image}" alt="${escapeHtml(product.name)}">
    </div>
    <div class="potd-copy">
      <p class="eyebrow">Product of the Day</p>
      <h3>${escapeHtml(product.name)}</h3>
      <p class="product-category">${CATEGORY_LABELS[product.category]}</p>
      <p>${escapeHtml(product.description)}</p>
      <p class="product-price">${formatPrice(product.price)}</p>
      <div class="modal-actions">
        <button type="button" class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
        <button type="button" class="btn btn-outline" onclick="addToWishlist(${product.id})">Add to Wishlist</button>
      </div>
    </div>
  `;
}


/* ---------------------------------------------------------------------
   8. FEATURED PRODUCTS (home page)
   --------------------------------------------------------------------- */
function buildProductCard(product) {
  // One reusable template used by the home page and the products page.
  return `
    <article class="product-card reveal">
      <figure>
        <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy">
      </figure>
      <div class="product-body">
        <p class="product-category">${CATEGORY_LABELS[product.category]}</p>
        <h3>${escapeHtml(product.name)}</h3>
        <p class="product-price">${formatPrice(product.price)}</p>
        <div class="product-actions">
          <button type="button" class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
          <button type="button" class="icon-btn" data-wishlist-btn="${product.id}" aria-pressed="false" aria-label="Add ${escapeHtml(product.name)} to wishlist" onclick="addToWishlist(${product.id})">&#9825;</button>
          <button type="button" class="btn btn-outline" onclick="showProductModal(${product.id})">View Details</button>
        </div>
      </div>
    </article>
  `;
}

function renderFeaturedProducts() {
  const wrap = qs("#featuredProducts");
  if (!wrap) return;

  // Pick 4 evenly spread products (one per category) for a tidy showcase
  const featured = ["figurines", "toys", "boardgames", "diecast"].map(
    (category) => PRODUCTS.find((p) => p.category === category)
  );

  wrap.innerHTML = featured.map(buildProductCard).join("");
  updateWishlistButtons();
  initScrollReveal();
}


/* ---------------------------------------------------------------------
   9. NEWSLETTER SUBSCRIPTION (footer — appears on every page)
   --------------------------------------------------------------------- */
function initNewsletterForm() {
  const form = qs("#newsletterForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = qs("#newsletterEmail", form);
    const message = qs("#newsletterMessage");
    const email = input.value.trim();

    if (!isValidEmail(email)) {
      message.textContent = "Please enter a valid email address.";
      message.className = "form-message error";
      return;
    }

    // Store subscribed emails as an array under one localStorage key
    const subscribers = JSON.parse(localStorage.getItem("toyhaven_subscribers") || "[]");
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem("toyhaven_subscribers", JSON.stringify(subscribers));
    }

    message.textContent = "You're subscribed! Watch your inbox for toy drops.";
    message.className = "form-message success";
    form.reset();
  });
}

// Simple, readable email validation used across the newsletter, checkout
// and feedback forms.
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


/* ---------------------------------------------------------------------
   10. PRODUCTS PAGE — render, filter, search, modal
   --------------------------------------------------------------------- */
let currentCategoryFilter = "all";
let currentSearchTerm = "";

// Combines the active category filter and search term, then renders results
function renderProducts() {
  const grid = qs("#productGrid");
  if (!grid) return;

  let results = PRODUCTS.filter((product) => {
    const matchesCategory = currentCategoryFilter === "all" || product.category === currentCategoryFilter;
    const matchesSearch = product.name.toLowerCase().includes(currentSearchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const note = qs("#resultsNote");
  if (note) {
    note.textContent = results.length + " product" + (results.length === 1 ? "" : "s") + " found";
  }

  if (results.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <h3>No products match your search</h3>
        <p>Try a different keyword or clear the category filter.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = results.map(buildProductCard).join("");
  updateWishlistButtons();
  initScrollReveal();
}

function initProductFilters() {
  const filterButtons = qsa(".filter-btn");
  if (filterButtons.length === 0) return;

  // If the page was opened with a link like products.html?category=toys
  // (e.g. from a "Shop Now" button on the home page), pre-select that filter.
  const categoryFromUrl = new URLSearchParams(location.search).get("category");
  if (categoryFromUrl && CATEGORY_LABELS[categoryFromUrl]) {
    currentCategoryFilter = categoryFromUrl;
    filterButtons.forEach((btn) => {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-category") === categoryFromUrl ? "true" : "false");
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      currentCategoryFilter = button.getAttribute("data-category");
      renderProducts();
    });
  });
}

function initProductSearch() {
  const searchForm = qs("#searchForm");
  if (!searchForm) return;

  const searchInput = qs("#searchInput", searchForm);

  searchForm.addEventListener("submit", (event) => event.preventDefault());

  // Live search: updates results as the user types, no page reload
  searchInput.addEventListener("input", () => {
    currentSearchTerm = searchInput.value.trim();
    renderProducts();
  });
}

// Opens the product details modal and fills it with the chosen product
function showProductModal(productId) {
  const product = getProductById(productId);
  const backdrop = qs("#productModal");
  if (!product || !backdrop) return;

  qs("#modalImage", backdrop).src = product.image;
  qs("#modalImage", backdrop).alt = product.name;
  qs("#modalCategory", backdrop).textContent = CATEGORY_LABELS[product.category];
  qs("#modalName", backdrop).textContent = product.name;
  qs("#modalPrice", backdrop).textContent = formatPrice(product.price);
  qs("#modalDescription", backdrop).textContent = product.description;
  qs("#modalAddToCart", backdrop).setAttribute("onclick", `addToCart(${product.id})`);
  qs("#modalAddToWishlist", backdrop).setAttribute("onclick", `addToWishlist(${product.id})`);

  backdrop.classList.add("is-open");
  backdrop.removeAttribute("hidden");
  document.body.style.overflow = "hidden";
  qs(".modal-close", backdrop).focus();
}

function closeProductModal() {
  const backdrop = qs("#productModal");
  if (!backdrop) return;
  backdrop.classList.remove("is-open");
  document.body.style.overflow = "";
  setTimeout(() => backdrop.setAttribute("hidden", ""), 250);
}

function initProductModal() {
  const backdrop = qs("#productModal");
  if (!backdrop) return;

  qs(".modal-close", backdrop).addEventListener("click", closeProductModal);

  // Close when clicking the dark backdrop (but not the modal box itself)
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) closeProductModal();
  });

  // Close with the Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && backdrop.classList.contains("is-open")) {
      closeProductModal();
    }
  });
}


/* ---------------------------------------------------------------------
   11. CART PAGE
   --------------------------------------------------------------------- */
function renderCartPage() {
  const container = qs("#cartItems");
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = "";
    qs("#cartEmptyState").hidden = false;
    qs("#cartSummary").hidden = true;
    return;
  }

  qs("#cartEmptyState").hidden = true;
  qs("#cartSummary").hidden = false;

  container.innerHTML = cart.map((item) => {
    const product = getProductById(item.id);
    if (!product) return "";
    const subtotal = product.price * item.quantity;

    return `
      <article class="cart-item">
        <img src="${product.image}" alt="${escapeHtml(product.name)}">
        <div class="cart-item-info">
          <p class="product-category">${CATEGORY_LABELS[product.category]}</p>
          <h3>${escapeHtml(product.name)}</h3>
          <p>${formatPrice(product.price)} each</p>
          <button type="button" class="remove-link" onclick="removeFromCart(${product.id}); renderCartPage();">Remove</button>
        </div>
        <div class="qty-control" role="group" aria-label="Quantity for ${escapeHtml(product.name)}">
          <button type="button" aria-label="Decrease quantity" onclick="changeCartQuantity(${product.id}, -1)">&minus;</button>
          <span>${item.quantity}</span>
          <button type="button" aria-label="Increase quantity" onclick="changeCartQuantity(${product.id}, 1)">+</button>
        </div>
        <p class="cart-item-total">${formatPrice(subtotal)}</p>
      </article>
    `;
  }).join("");

  renderCartSummary();
}

// Used by the +/- buttons; keeps the whole cart page in sync immediately
function changeCartQuantity(productId, delta) {
  const cart = getCart();
  const item = cart.find((item) => item.id === productId);
  if (!item) return;

  if (item.quantity + delta <= 0) {
    removeFromCart(productId);
  } else {
    updateCartQuantity(productId, item.quantity + delta);
  }
  renderCartPage();
}

function renderCartSummary() {
  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  qs("#summarySubtotal").textContent = formatPrice(subtotal);
  qs("#summaryShipping").textContent = formatPrice(shipping);
  qs("#summaryTotal").textContent = formatPrice(total);
}

function initCartPage() {
  const clearBtn = qs("#clearCartBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      clearCart();
      renderCartPage();
    });
  }
  renderCartPage();
}


/* ---------------------------------------------------------------------
   12. CHECKOUT PAGE — validation, order summary, order history
   --------------------------------------------------------------------- */
function renderCheckoutSummary() {
  const wrap = qs("#checkoutSummary");
  if (!wrap) return;

  const cart = getCart();

  if (cart.length === 0) {
    wrap.innerHTML = `
      <div class="empty-state">
        <h3>Your cart is empty</h3>
        <p>Add some products before checking out.</p>
        <a class="btn btn-primary" href="products.html">Browse Products</a>
      </div>
    `;
    qs("#checkoutForm").hidden = true;
    return;
  }

  const rows = cart.map((item) => {
    const product = getProductById(item.id);
    if (!product) return "";
    return `
      <div class="summary-row">
        <span>${escapeHtml(product.name)} &times; ${item.quantity}</span>
        <span>${formatPrice(product.price * item.quantity)}</span>
      </div>
    `;
  }).join("");

  const subtotal = getCartTotal();
  const shipping = 5.99;
  const total = subtotal + shipping;

  wrap.innerHTML = `
    ${rows}
    <div class="summary-row"><span>Shipping</span><span>${formatPrice(shipping)}</span></div>
    <div class="summary-row total"><span>Total</span><span>${formatPrice(total)}</span></div>
  `;
}

// Validates one field and displays/clears its error message.
// Returns true if the field is valid.
function validateField(fieldId, isValid, errorMessage) {
  const field = qs("#" + fieldId);
  const wrapper = field.closest(".field");
  const errorEl = qs("#" + fieldId + "Error");

  if (isValid) {
    wrapper.classList.remove("has-error");
    errorEl.textContent = "";
  } else {
    wrapper.classList.add("has-error");
    errorEl.textContent = errorMessage;
  }
  return isValid;
}

function initCheckoutForm() {
  const form = qs("#checkoutForm");
  if (!form) return;

  renderCheckoutSummary();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = qs("#checkoutName").value.trim();
    const email = qs("#checkoutEmail").value.trim();
    const address = qs("#checkoutAddress").value.trim();
    const payment = qs('input[name="payment"]:checked');

    // Run every validation rule (kept deliberately simple and readable)
    const nameValid = validateField("checkoutName", name.length > 0, "Please enter your full name.");
    const emailValid = validateField("checkoutEmail", isValidEmail(email), "Please enter a valid email address.");
    const addressValid = validateField("checkoutAddress", address.length > 0, "Please enter a delivery address.");

    const paymentError = qs("#checkoutPaymentError");
    const paymentValid = !!payment;
    paymentError.textContent = paymentValid ? "" : "Please select a payment method.";

    if (!(nameValid && emailValid && addressValid && paymentValid)) {
      return; // Stop here if anything failed validation
    }

    completeOrder({ name, email, address, payment: payment.value });
  });
}

// Generates a simple order reference, e.g. "TH-48213"
function generateOrderNumber() {
  return "TH-" + Math.floor(10000 + Math.random() * 90000);
}

function completeOrder(details) {
  const cart = getCart();
  const orderNumber = generateOrderNumber();

  const order = {
    orderNumber: orderNumber,
    date: new Date().toISOString(),
    customer: details,
    items: cart.map((item) => {
      const product = getProductById(item.id);
      return {
        name: product.name,
        quantity: item.quantity,
        price: product.price
      };
    }),
    total: getCartTotal() + 5.99
  };

  // Store the order in an "order history" array in localStorage
  const history = JSON.parse(localStorage.getItem("toyhaven_orders") || "[]");
  history.push(order);
  localStorage.setItem("toyhaven_orders", JSON.stringify(history));

  // Empty the cart now that the order has been placed
  clearCart();

  // Swap the form out for the success message, no page reload needed
  qs("#checkoutForm").hidden = true;
  qs("#checkoutSummaryCard").hidden = true;
  const successCard = qs("#checkoutSuccess");
  successCard.hidden = false;
  qs("#orderReference", successCard).textContent = orderNumber;
  successCard.scrollIntoView({ behavior: "smooth", block: "start" });
}


/* ---------------------------------------------------------------------
   13. WISHLIST PAGE
   --------------------------------------------------------------------- */
function renderWishlistPage() {
  const container = qs("#wishlistItems");
  if (!container) return;

  const wishlist = getWishlist();

  if (wishlist.length === 0) {
    container.innerHTML = "";
    qs("#wishlistEmptyState").hidden = false;
    return;
  }

  qs("#wishlistEmptyState").hidden = true;

  container.innerHTML = wishlist.map((entry) => {
    const product = getProductById(entry.id);
    if (!product) return "";

    return `
      <article class="product-card">
        <figure>
          <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy">
        </figure>
        <div class="product-body">
          <span class="status-pill status-${entry.status}">${statusLabel(entry.status)}</span>
          <p class="product-category">${CATEGORY_LABELS[product.category]}</p>
          <h3>${escapeHtml(product.name)}</h3>
          <p class="product-price">${formatPrice(product.price)}</p>

          <label class="visually-hidden" for="status-${product.id}">Collection status for ${escapeHtml(product.name)}</label>
          <select id="status-${product.id}" class="status-select" onchange="handleStatusChange(${product.id}, this.value)">
            <option value="interested" ${entry.status === "interested" ? "selected" : ""}>Interested</option>
            <option value="owned" ${entry.status === "owned" ? "selected" : ""}>Owned</option>
            <option value="not-interested" ${entry.status === "not-interested" ? "selected" : ""}>Not Interested</option>
          </select>

          <div class="product-actions">
            <button type="button" class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
            <button type="button" class="btn btn-danger" onclick="handleWishlistRemove(${product.id})">Remove</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function statusLabel(status) {
  if (status === "owned") return "Owned";
  if (status === "not-interested") return "Not Interested";
  return "Interested";
}

function handleStatusChange(productId, status) {
  updateWishlistStatus(productId, status);
  renderWishlistPage();
}

function handleWishlistRemove(productId) {
  removeFromWishlist(productId);
  renderWishlistPage();
}


/* ---------------------------------------------------------------------
   14. FEEDBACK PAGE + FAQ ACCORDION
   --------------------------------------------------------------------- */
function initFeedbackForm() {
  const form = qs("#feedbackForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = qs("#feedbackName").value.trim();
    const email = qs("#feedbackEmail").value.trim();
    const message = qs("#feedbackMessage").value.trim();

    const nameValid = validateField("feedbackName", name.length > 0, "Please enter your name.");
    const emailValid = validateField("feedbackEmail", isValidEmail(email), "Please enter a valid email address.");
    const messageValid = validateField("feedbackMessage", message.length >= 10, "Please write at least 10 characters.");

    if (!(nameValid && emailValid && messageValid)) return;

    // Store submitted feedback as an array in localStorage
    const allFeedback = JSON.parse(localStorage.getItem("toyhaven_feedback") || "[]");
    allFeedback.push({ name, email, message, date: new Date().toISOString() });
    localStorage.setItem("toyhaven_feedback", JSON.stringify(allFeedback));

    form.hidden = true;
    qs("#feedbackSuccess").hidden = false;
  });
}

function initFaqAccordion() {
  const questions = qsa(".faq-question");
  if (questions.length === 0) return;

  questions.forEach((button) => {
    button.addEventListener("click", () => {
      const answer = document.getElementById(button.getAttribute("aria-controls"));
      const isOpen = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", isOpen ? "false" : "true");
      answer.classList.toggle("is-open", !isOpen);
    });
  });
}


/* ---------------------------------------------------------------------
   15. SCROLL REVEAL ANIMATION
   Uses IntersectionObserver to add a class once an element scrolls into
   view, which style.css then animates with a fade + rise.
   --------------------------------------------------------------------- */
function initScrollReveal() {
  const targets = qsa(".reveal:not(.is-visible)");
  if (targets.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach((target) => observer.observe(target));
}


/* ---------------------------------------------------------------------
   16. PAGE INIT
   Runs once the DOM is ready. Every function above checks for its own
   elements, so calling all of them on every page is safe and simple.
   --------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initHeroSlider();
  renderProductOfTheDay();
  renderFeaturedProducts();
  initNewsletterForm();

  initProductFilters();
  initProductSearch();
  initProductModal();
  renderProducts();

  initCartPage();

  initCheckoutForm();

  renderWishlistPage();

  initFeedbackForm();
  initFaqAccordion();

  updateWishlistButtons();
  initScrollReveal();

  // Register the service worker for basic PWA/offline support.
  // Wrapped in a check + try/catch so the site still works if it fails
  // (e.g. when opened directly from disk with file://).
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("service-worker.js").catch(() => {
      /* Silently ignore — the site still works without the service worker */
    });
  }
});
