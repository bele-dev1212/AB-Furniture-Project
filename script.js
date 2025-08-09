 const products = [
            {
                id: 1,
                name: "Modern Leather Sofa",
                price: 899,
                oldPrice: 1099,
                image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                category: "Sofas",
                
            },
            {
                id: 2,
                name: "Velvet Armchair",
                price: 349,
                image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                category: "Chairs"
            },
            {
                id: 3,
                name: "Coffee Table",
                price: 249,
                oldPrice: 299,
                image: "https://images.unsplash.com/photo-1718049719548-f5cea9f78592?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                category: "Tables",
                badge: "Popular"
            },
            {
                id: 4,
                name: "Dining Table Set",
                price: 1299,
                image: "https://images.unsplash.com/photo-1617597837929-b34c021186f3?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                category: "Tables"
            },
            {
                id: 5,
                name: "Platform Bed",
                price: 799,
                oldPrice: 899,
                image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                category: "Bedroom",
               
            },
            {
                id: 6,
                name: "Bookshelf",
                price: 199,
                image: "https://images.unsplash.com/photo-1593670755950-603e1d6184b9?q=80&w=1063&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                category: "Storage"
            },
            {
                id: 7,
                name: "Sectional Sofa",
                price: 1499,
                image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                category: "Sofas"
            },
            {
                id: 8,
                name: "Accent Chair",
                price: 279,
                oldPrice: 349,
                image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                category: "Chairs",
               
            },
            {
                id: 9,
                name: "TV-stand",
                price: 579,
                oldPrice: 449,
                image: "https://plus.unsplash.com/premium_photo-1692130960203-1e62295281de?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                category: "TV-stand",
                
            }
        ];

        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

       
        const productsContainer = document.getElementById('productsContainer');
        const cartIcon = document.getElementById('cartIcon');
        const cartCount = document.getElementById('cartCount');
        const cartModal = document.getElementById('cartModal');
        const closeModal = document.getElementById('closeModal');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const continueShopping = document.getElementById('continueShopping');
        const checkoutBtn = document.getElementById('checkoutBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const mainNav = document.getElementById('mainNav');
        const newsletterForm = document.getElementById('newsletterForm');

        
        function displayProducts() {
            productsContainer.innerHTML = '';
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                    <div class="product-img">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.category}</p>
                        <div class="product-price">
                            <div>
                                ${product.oldPrice ? `<span class="old-price">$${product.oldPrice}</span>` : ''}
                                <span class="price">$${product.price}</span>
                            </div>
                            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                `;
                productsContainer.appendChild(productCard);
            });

            
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', addToCart);
            });
        }

      
        function addToCart(e) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
           
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
            }
            
            updateCart();
            showCartNotification();
        }

       
        function showCartNotification() {
            cartIcon.classList.add('animate');
            setTimeout(() => {
                cartIcon.classList.remove('animate');
            }, 500);
        }

       
        function updateCart() {
           
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            
            localStorage.setItem('cart', JSON.stringify(cart));
            
            
            if (cartModal.style.display === 'flex') {
                displayCartItems();
            }
        }

       
        function displayCartItems() {
            if (cart.length === 0) {
                cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
                cartTotal.textContent = '0.00';
                return;
            }
            
            cartItems.innerHTML = '';
            let total = 0;
            
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-img">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <p class="cart-item-price">$${item.price}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        <span class="remove-item" data-id="${item.id}">×</span>
                    </div>
                `;
                cartItems.appendChild(cartItem);
                
                total += item.price * item.quantity;
            });
            
            cartTotal.textContent = total.toFixed(2);
            
            
            document.querySelectorAll('.quantity-btn.minus').forEach(button => {
                button.addEventListener('click', decreaseQuantity);
            });
            
            document.querySelectorAll('.quantity-btn.plus').forEach(button => {
                button.addEventListener('click', increaseQuantity);
            });
            
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', removeItem);
            });
        }

      
        function decreaseQuantity(e) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart = cart.filter(item => item.id !== productId);
            }
            
            updateCart();
        }

        
        function increaseQuantity(e) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            item.quantity += 1;
            updateCart();
        }

       
        function removeItem(e) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            cart = cart.filter(item => item.id !== productId);
            updateCart();
        }

        
        function initTestimonialSlider() {
            const slides = document.querySelectorAll('.testimonial-slide');
            const dots = document.querySelectorAll('.dot');
            let currentSlide = 0;
            
            function showSlide(index) {
                slides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                
                slides[index].classList.add('active');
                dots[index].classList.add('active');
                currentSlide = index;
            }
            
            dots.forEach(dot => {
                dot.addEventListener('click', function() {
                    showSlide(parseInt(this.getAttribute('data-slide')));
                });
            });
            
         
            setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }, 5000);
        }

       
        function init() {
            displayProducts();
            updateCart();
            initTestimonialSlider();
            
            
            cartIcon.addEventListener('click', () => {
                cartModal.style.display = 'flex';
                displayCartItems();
            });
            
            closeModal.addEventListener('click', () => {
                cartModal.style.display = 'none';
            });
            
            continueShopping.addEventListener('click', () => {
                cartModal.style.display = 'none';
            });
            
            checkoutBtn.addEventListener('click', () => {
                alert('Checkout functionality would be implemented here!');
            });
            
            mobileMenu.addEventListener('click', () => {
                mainNav.classList.toggle('active');
            });
            
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input').value;
                alert(`Thank you for subscribing with ${email}!`);
                this.reset();
            });
    
           
            window.addEventListener('click', (e) => {
                if (e.target === cartModal) {
                    cartModal.style.display = 'none';
                }
            });
            
          
            document.querySelectorAll('nav a').forEach(link => {
                link.addEventListener('click', () => {
                    mainNav.classList.remove('active');
                });
            });
        }
        document.getElementById('checkoutBtn').addEventListener('click', function() {
    
    window.location.href = "checkout.html"; 
    
});
    
        const furnitureCollections = {
            sofas: [
                "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                "https://images.unsplash.com/photo-1658946376028-97500984b5c7?q=80&w=2028&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                "https://images.unsplash.com/photo-1567016432779-094069958ea5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                "https://plus.unsplash.com/premium_photo-1661777863705-d3232b7c8088?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://plus.unsplash.com/premium_photo-1661396945357-b040dcaf22c0?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            ],
            chairs: [
                "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                "https://images.unsplash.com/photo-1519947486511-46149fa0a254?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                "https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                "https://images.unsplash.com/photo-1617582907226-c49e2d8200d9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1656440536778-a6f1d40fa8ca?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            ],
            tables: [
                "https://images.unsplash.com/photo-1698133469198-2459cff8665d?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1590938272761-c11f74452660?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1653629495477-b42f0f43ce3f?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1719716136393-fa67518e68f2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1605317039225-0001f706cdef?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1596448407590-0aa4ad194201?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            ],
            bedroom: [
                "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                "https://plus.unsplash.com/premium_photo-1683120852623-143817d6400b?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                "https://images.unsplash.com/photo-1583221742001-9ad88bf233ff?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://plus.unsplash.com/premium_photo-1661901997525-fdbfb88d8554?q=80&w=929&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://plus.unsplash.com/premium_photo-1676823553444-3ce8a1bc85c8?q=80&w=2031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            ],
            office: [
                "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?q=80&w=1380&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                "https://images.unsplash.com/photo-1595846723416-99a641e1231a?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://plus.unsplash.com/premium_photo-1661879435429-a396d927c686?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            ]
        };

        
        const collectionModal = document.getElementById('collectionModal');
        const modalTitle = document.getElementById('modalCategoryTitle');
        const collectionImages = document.getElementById('collectionImages');
        const closeModel= document.querySelector('.close-collection');
        const viewCollectionBtns = document.querySelectorAll('.view-collection');

       
        viewCollectionBtns.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                showCollection(category);
            });
        });

        
        closeModel.addEventListener('click', function() {
            collectionModal.style.display = "none";
        });

        
        window.addEventListener('click', function(event) {
            if (event.target === collectionModal) {
                collectionModal.style.display = "none";
            }
        });

        
        function showCollection(category) {
           
            modalTitle.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Collection`;
            
            
            collectionImages.innerHTML = '';
            
           
            furnitureCollections[category].forEach(imageUrl => {
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.alt = `${category} furniture`;
                collectionImages.appendChild(imgElement);
            });
            
            
            collectionModal.style.display = "block";
        }
      
        document.addEventListener('DOMContentLoaded', init);