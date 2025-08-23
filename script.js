import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// COLE A SUA CONFIGURAÇÃO DO FIREBASE AQUI
const firebaseConfig = {
    apiKey: "AIzaSyB6acgYip8BKuklsmtdiD09WynKyZsZods",
    authDomain: "catalogo-almoxarifado-gidion.firebaseapp.com",
    projectId: "catalogo-almoxarifado-gidion",
    storageBucket: "catalogo-almoxarifado-gidion.firebasestorage.app",
    messagingSenderId: "130917767086",
    appId: "1:130917767086:web:21f4f0d97cc74c0867da3f"
};

// Inicializa o Firebase e o Firestore (banco de dados)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ------------------- VARIÁVEIS GLOBAIS -------------------
let cart = {};
const catalogContainer = document.getElementById('catalog-container');
const addPartFormContainer = document.querySelector('.add-part-form-container');
const loginFormContainer = document.querySelector('.login-form-container');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsList = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const notificationContainer = document.getElementById('notification-message');
const orderForm = document.getElementById('order-form');

// ------------------- FUNÇÕES DE UTILIDADE -------------------
function showNotification(message, isError = false) {
    notificationContainer.textContent = message;
    notificationContainer.className = 'notification-container show';
    if (isError) {
        notificationContainer.classList.add('error');
    } else {
        notificationContainer.classList.remove('error');
    }
    setTimeout(() => {
        notificationContainer.classList.remove('show');
    }, 3000);
}

function updateCartCount() {
    const count = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

function renderCartItems() {
    cartItemsList.innerHTML = '';
    const cartItemsArray = Object.values(cart);

    if (cartItemsArray.length === 0) {
        cartItemsList.innerHTML = '<p style="text-align: center; color: #777;">Seu pedido está vazio.</p>';
    }

    cartItemsArray.forEach(item => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-name">${item.name}</span>
                <p>Cód: ${item.code}</p>
                <div class="item-quantity-control">
                    <button class="quantity-btn decrease" data-code="${item.code}">-</button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="quantity-btn increase" data-code="${item.code}">+</button>
                </div>
            </div>
            <button class="remove-item-btn" data-code="${item.code}">&times;</button>
        `;
        cartItemsList.appendChild(li);
    });

    updateCartCount();
}

function clearCatalog() {
    catalogContainer.innerHTML = '';
}

function showCatalog() {
    clearCatalog();
    catalogContainer.style.display = 'flex';
    addPartFormContainer.style.display = 'none';
    loginFormContainer.style.display = 'none';
    loadPartsFromFirebase();
}

// ------------------- LÓGICA DO CATÁLOGO E CARREGAMENTO DE DADOS -------------------
function createPartCard(part) {
    const card = document.createElement('div');
    card.className = 'part-card';
    card.innerHTML = `
        <div class="part-image-container">
            <img src="${part.photo || 'https://via.placeholder.com/200'}" alt="${part.name}">
        </div>
        <div class="part-info">
            <h2 class="part-name">${part.name}</h2>
            <p><strong>Cód:</strong> ${part.code}</p>
            <p><strong>Marca:</strong> ${part.manufacturer}</p>
            <p><strong>Carroceria:</strong> ${part.bodyModel}</p>
            <button class="add-to-cart-btn" 
                    data-name="${part.name}" 
                    data-code="${part.code}" 
                    data-manufacturer="${part.manufacturer}">Adicionar ao Pedido</button>
        </div>
    `;
    catalogContainer.appendChild(card);
}

async function loadPartsFromFirebase(manufacturer = null, category = null) {
    catalogContainer.innerHTML = '<h2>Carregando peças...</h2>';
    let partsQuery = collection(db, "pecas");

    if (manufacturer) {
        partsQuery = query(partsQuery, where("manufacturer", "==", manufacturer));
    }
    if (category) {
        partsQuery = query(partsQuery, where("category", "==", category));
    }
    
    try {
        const querySnapshot = await getDocs(partsQuery);
        catalogContainer.innerHTML = '';
        if (querySnapshot.empty) {
            catalogContainer.innerHTML = '<p class="no-parts-message">Nenhuma peça encontrada.</p>';
            return;
        }
        querySnapshot.forEach((doc) => {
            const part = doc.data();
            createPartCard(part);
        });
    } catch (e) {
        console.error("Erro ao carregar peças: ", e);
        catalogContainer.innerHTML = '<p class="no-parts-message">Erro ao carregar as peças. Tente novamente mais tarde.</p>';
    }
}

// ------------------- LÓGICA DO FORMULÁRIO DE CADASTRO -------------------
async function savePartToFirebase(partData) {
    try {
        await addDoc(collection(db, "pecas"), partData);
        showNotification("Peça cadastrada com sucesso!");
    } catch (e) {
        console.error("Erro ao adicionar documento: ", e);
        showNotification("Erro ao cadastrar peça.", true);
    }
}

// ------------------- EVENT LISTENERS -------------------
document.addEventListener('DOMContentLoaded', () => {
    // Esconde os formulários na inicialização
    addPartFormContainer.style.display = 'none';
    loginFormContainer.style.display = 'none';

    // Lógica para o menu principal
    const partsLink = document.getElementById('parts-link');
    if (partsLink) {
        partsLink.addEventListener('click', (event) => {
            event.preventDefault();
            showCatalog();
        });
    }

    const addPartLink = document.getElementById('add-part-link');
    if (addPartLink) {
        addPartLink.addEventListener('click', (event) => {
            event.preventDefault();
            catalogContainer.style.display = 'none';
            loginFormContainer.style.display = 'none';
            addPartFormContainer.style.display = 'block';
        });
    }

    // Lógica para o menu de filtros
    const mainNav = document.querySelector('.main-nav');
    if (mainNav) {
        mainNav.addEventListener('click', (event) => {
            if (event.target.tagName === 'A' && event.target.closest('.dropdown-menu')) {
                event.preventDefault();
                const parentDropdown = event.target.closest('.dropdown-menu');
                const manufacturer = parentDropdown.dataset.manufacturer || null;
                const category = event.target.textContent;
                
                showCatalog(); // Garante que a visualização do catálogo está ativa
                loadPartsFromFirebase(manufacturer, category);
            }
        });
    }

    // Lógica do carrinho
    document.getElementById('cart-icon').addEventListener('click', () => {
        cartSidebar.classList.add('open');
    });

    document.getElementById('close-cart-btn').addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });

    catalogContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const name = event.target.dataset.name;
            const code = event.target.dataset.code;

            if (cart[code]) {
                cart[code].quantity++;
            } else {
                cart[code] = { name, code, quantity: 1 };
            }
            renderCartItems();
            showNotification(`"${name}" adicionado ao pedido!`);
        }
    });

    cartItemsList.addEventListener('click', (event) => {
        const code = event.target.dataset.code;
        if (event.target.classList.contains('remove-item-btn')) {
            delete cart[code];
        } else if (event.target.classList.contains('quantity-btn')) {
            if (event.target.classList.contains('increase')) {
                cart[code].quantity++;
            } else if (event.target.classList.contains('decrease')) {
                if (cart[code].quantity > 1) {
                    cart[code].quantity--;
                } else {
                    delete cart[code];
                }
            }
        }
        renderCartItems();
    });

    orderForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (Object.keys(cart).length === 0) {
            showNotification("O seu pedido está vazio. Adicione itens antes de enviar.", true);
            return;
        }

        const carNumber = document.getElementById('car-number').value;
        const osNumber = document.getElementById('os-number').value;
        const userMatricula = document.getElementById('user-matricula').value;

        const orderData = {
            carro: carNumber,
            os: osNumber,
            matricula: userMatricula,
            itens: Object.values(cart),
            timestamp: new Date()
        };

        try {
            await addDoc(collection(db, "pedidos"), orderData);
            showNotification("Pedido enviado com sucesso!");
            cart = {};
            renderCartItems();
            orderForm.reset();
            cartSidebar.classList.remove('open');
        } catch (e) {
            console.error("Erro ao enviar pedido: ", e);
            showNotification("Erro ao enviar pedido.", true);
        }
    });

    // Lógica do formulário de cadastro
    const addPartForm = document.getElementById('add-part-form');
    if (addPartForm) {
        addPartForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const manufacturerSelect = document.getElementById('part-manufacturer').value;
            const otherManufacturer = document.getElementById('other-manufacturer').value;
            const finalManufacturer = manufacturerSelect === 'Outra' ? otherManufacturer : manufacturerSelect;

            const partData = {
                name: document.getElementById('part-name').value,
                code: document.getElementById('part-code').value,
                photo: document.getElementById('part-photo').value,
                description: document.getElementById('part-description').value,
                year: document.getElementById('part-year').value,
                busModel: document.getElementById('part-bus-model').value,
                bodyModel: document.getElementById('part-body-model').value,
                category: document.getElementById('part-category').value,
                manufacturer: finalManufacturer,
                condition: document.getElementById('part-condition').value,
                timestamp: new Date()
            };
            
            savePartToFirebase(partData);
            addPartForm.reset();
            showCatalog();
        });
    }

    // Lógica da barra de pesquisa
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    function filterParts(searchText) {
        const partCards = document.querySelectorAll('.part-card');
        const searchTerm = searchText.toLowerCase().trim();
        let found = false;

        partCards.forEach(card => {
            const name = card.querySelector('.part-name').textContent.toLowerCase();
            const code = card.querySelector('p:nth-of-type(1)').textContent.toLowerCase();

            if (name.includes(searchTerm) || code.includes(searchTerm)) {
                card.style.display = 'block';
                found = true;
            } else {
                card.style.display = 'none';
            }
        });

        if (!found) {
            catalogContainer.innerHTML = '<p class="no-parts-message">Nenhuma peça encontrada com essa busca.</p>';
        }
    }

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', () => {
            filterParts(searchInput.value);
        });

        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                filterParts(searchInput.value);
            }
        });
    }

    // Lógica para o campo 'Outra' marca no formulário
    const manufacturerSelect = document.getElementById('part-manufacturer');
    const otherManufacturerContainer = document.getElementById('other-manufacturer-container');

    if (manufacturerSelect && otherManufacturerContainer) {
        manufacturerSelect.addEventListener('change', () => {
            if (manufacturerSelect.value === 'Outra') {
                otherManufacturerContainer.style.display = 'block';
            } else {
                otherManufacturerContainer.style.display = 'none';
            }
        });
    }

    // Carrega o catálogo ao iniciar a página
    showCatalog();
});