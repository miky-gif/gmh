// Base URL for images
const imageBaseUrl = 'https://monsite.com/'; // Replace with your actual base URL

// Array to hold cart items
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add event listeners to add to cart buttons on the product page
document.querySelectorAll('.btn-cart').forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
        const product = event.target.closest('.product');
        const title = product.querySelector('.product-title a').textContent;
        const imagePath = product.querySelector('.product-image').src;
        const image = new URL(imagePath, imageBaseUrl).href; // Create a full URL
        const category = product.querySelector('.product-cat a').textContent;
        addToCart({ title, image, category });
    });
});

// Add event listeners to "Acheter" buttons on the product page
document.querySelectorAll('.banner-link').forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
        const product = event.target.closest('.product');
        const title = product.querySelector('.product-title a').textContent;
        const imagePath = product.querySelector('.product-image').src;
        const image = new URL(imagePath, imageBaseUrl).href; // Create a full URL
        const category = product.querySelector('.product-cat a').textContent;
        redirectToWhatsApp({ title, image, category });
    });
});

// Function to add item to cart
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Function to display cart items
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    if (cartItems) {
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'product-item';

            const image = document.createElement('img');
            image.src = item.image;
            image.alt = item.title;
            listItem.appendChild(image);

            const productInfo = document.createElement('div');
            productInfo.className = 'product-info';

            const title = document.createElement('span');
            title.textContent = item.title;
            productInfo.appendChild(title);

            const category = document.createElement('span');
            category.className = 'product-cat';
            category.textContent = item.category;
            productInfo.appendChild(category);

            const buyButton = document.createElement('a');
            buyButton.href = "#";
            buyButton.className = "banner-link";
            buyButton.textContent = "Acheter";
            buyButton.onclick = (event) => {
                event.preventDefault();
                redirectToWhatsApp(item);
            };
            productInfo.appendChild(buyButton);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Supprimer';
            removeButton.onclick = () => {
                removeFromCart(index);
            };
            productInfo.appendChild(removeButton);

            listItem.appendChild(productInfo);
            cartItems.appendChild(listItem);
        });
    }
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Function to clear the cart
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Function to redirect to WhatsApp with product details
function redirectToWhatsApp(item) {
    const phoneNumber = '656440786'; 
    const message = `Je suis intéressé par ce produit et j'aimerais en savoir plus:
    \nNom du produit: ${item.title}
    \nCatégorie: ${item.category}
    \nImage: ${item.image}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Function to update the cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
}

// Initial call to display the cart and update the cart count
document.addEventListener('DOMContentLoaded', () => {
    displayCart();
    updateCartCount();
});




document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour gérer le clic sur les liens de catégorie
    function handleNavCategoryClick(event) {
        event.preventDefault();  // Empêche le comportement par défaut du lien
        const targetHref = event.currentTarget.getAttribute('href');
        window.location.assign(targetHref);  // Modifie l'URL et recharge la page
    }

    // Sélectionne tous les liens de catégorie et ajoute des écouteurs d'événements
    const navCategoryLinks = document.querySelectorAll('.nav-category');
    navCategoryLinks.forEach(link => {
        link.addEventListener('click', handleNavCategoryClick);
    });

    // Active l'onglet correct lors du chargement de la page
    if(window.location.hash) {
        const targetTab = document.querySelector('a[href="' + window.location.hash + '"]');
        if (targetTab) {
            targetTab.click();
        }
    }
});





document.addEventListener('DOMContentLoaded', () => {
    const cartDropdown = document.getElementById('cart-dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');

    // Fonction pour mettre à jour le menu déroulant des derniers produits ajoutés
    function updateCartDropdown() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartDropdown.innerHTML = '';
        
        // Prendre les deux derniers produits ajoutés
        const recentItems = cartItems.slice(-2).reverse();

        recentItems.forEach((item, recentIndex) => {
            const originalIndex = cartItems.length - 1 - recentIndex; // Index réel dans le tableau cart
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="product-info">
                    <span>${item.title}</span>
                    <span class="product-cat">${item.category}</span>
                    <span class="remove-button" data-index="${originalIndex}">&times;</span>
                </div>
            `;
            cartDropdown.appendChild(cartItem);
        });

        // Ajouter les écouteurs d'événement pour les boutons de suppression
        cartDropdown.querySelectorAll('.remove-button').forEach(button => {
            button.addEventListener('click', event => {
                const index = event.target.getAttribute('data-index');
                removeFromCart(index);
                updateCartDropdown(); // Mettre à jour le dropdown après suppression
            });
        });
    }
    
    // Mettre à jour le menu déroulant au survol de l'icône du panier
    dropdownToggle.addEventListener('mouseenter', updateCartDropdown);
});

// Votre code existant pour ajouter, afficher et supprimer des articles du panier...
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    if (cartItems) {
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'product-item';

            const image = document.createElement('img');
            image.src = item.image;
            image.alt = item.title;
            listItem.appendChild(image);

            const productInfo = document.createElement('div');
            productInfo.className = 'product-info';

            const title = document.createElement('span');
            title.textContent = item.title;
            productInfo.appendChild(title);

            const category = document.createElement('span');
            category.className = 'product-cat';
            category.textContent = item.category;
            productInfo.appendChild(category);

            const buyButton = document.createElement('a');
            buyButton.href = "#";
            buyButton.className = "banner-link";
            buyButton.textContent = "Acheter";
            buyButton.onclick = (event) => {
                event.preventDefault();
                redirectToWhatsApp(item);
            };
            productInfo.appendChild(buyButton);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Supprimer';
            removeButton.onclick = () => {
                removeFromCart(index);
            };
            productInfo.appendChild(removeButton);

            listItem.appendChild(productInfo);
            cartItems.appendChild(listItem);
        });
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    document.querySelector('.cart-count').textContent = cartItems.length;
}

function redirectToWhatsApp(product) {
    const message = `Bonjour, je suis intéressé par le produit suivant:\n\nNom: ${product.title}\nCatégorie: ${product.category}\nImage: ${product.image}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}
