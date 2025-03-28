// Shopping Cart Functionality
let cart = [];

function addToCart(product, price) {
    const existingItem = cart.find(item => item.product === product);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            product: product,
            price: price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
}

function updateQuantity(product, change) {
    const item = cart.find(item => item.product === product);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        updateCartDisplay();
    }
}

function removeItem(product) {
    cart = cart.filter(item => item.product !== product);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotalAmount = document.getElementById('cart-total-price');
    
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <span class="product-name">${item.product}</span>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.product}', -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.product}', 1)">+</button>
                </div>
            </div>
            <div class="cart-item-total">
                <span>₱${itemTotal.toFixed(2)}</span>
                <button class="remove-item" onclick="removeItem('${item.product}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    if (cartTotalAmount) {
        cartTotalAmount.textContent = total.toFixed(2);
    }
}

// Add event listeners when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.dataset.product;
            const price = parseFloat(this.dataset.price);
            addToCart(product, price);
        });
    });
}); 