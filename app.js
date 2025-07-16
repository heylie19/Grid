const products = [
  {
    id: 1,
    name: "Camisa Blanca",
    price: 25,
    description: "Camisa clásica de algodón, ideal para el día a día.",
    image: "imagenes/camisa.jpg"
  },
  {
    id: 2,
    name: "Pantalón Jeans",
    price: 40,
    description: "Jeans azules con corte moderno.",
    image: "imagenes/jean.jpg"
  },
  {
    id: 3,
    name: "Vestido Floral",
    price: 35,
    description: "Vestido fresco con estampado floral.",
    image: "imagenes/vestido-corto.webp"
  },
  {
    id: 4,
    name: "Vestido Floral Largo",
    price: 40,
    description: "Vestido fresco con estampado floral.",
    image: "imagenes/vestido-largo.webp"
  }
];

// Carga inicial de productos
const productList = document.getElementById("product-list");
products.forEach(product => {
  const div = document.createElement("div");
  div.className = "product-card";
  div.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>$${product.price.toFixed(2)}</p>
  `;
  div.onclick = () => showProductDetail(product);
  productList.appendChild(div);
});

// Mostrar vista de producto
function showProductDetail(product) {
  const detail = document.getElementById("product-detail");
  detail.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <p><strong>$${product.price.toFixed(2)}</strong></p>
    <button onclick="addToCart(${product.id})">Añadir al carrito</button>
  `;
  switchView("detail-view");
}

// Navegación entre vistas
const navLinks = document.querySelectorAll(".bottom-menu a");
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const view = e.target.getAttribute("data-view");
    if (view) switchView(view);
  });
});

function switchView(viewId) {
  document.querySelectorAll(".view").forEach(v => v.classList.add("hidden"));
  document.getElementById(viewId).classList.remove("hidden");

  if (viewId === "cart-view") renderCart();
}

// Carrito
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Producto añadido al carrito");
}

function renderCart() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    list.innerHTML = "<p class='empty-cart'>Tu carrito está vacío</p>";
    return;
  }

  cart.forEach((id, index) => {
    const product = products.find(p => p.id === id);
    const item = document.createElement("div");
    item.className = "cart-item";
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="cart-info">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
      </div>
      <button class="cart-remove" onclick="removeFromCart(${index})">❌</button>
    `;
    list.appendChild(item);
  });

  
}

function removeFromCart(indexToRemove) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === cart[indexToRemove]);
  const confirmDelete = confirm(`¿Quieres eliminar "${product.name}" del carrito?`);
  if (confirmDelete) {
    cart.splice(indexToRemove, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

