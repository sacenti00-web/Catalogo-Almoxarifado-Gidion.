import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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

// Adiciona o código para mostrar/esconder o formulário de cadastro
document.addEventListener('DOMContentLoaded', () => {
    const addPartLink = document.getElementById('add-part-link');
    const addPartFormContainer = document.querySelector('.add-part-form-container');
    const catalogContainer = document.getElementById('catalog-container');

    if (addPartLink && addPartFormContainer && catalogContainer) {
        addPartLink.addEventListener('click', (event) => {
            event.preventDefault();
            catalogContainer.style.display = 'none';
            addPartFormContainer.style.display = 'block';
        });
    }

    // Oculta ou exibe o campo "outra" marca
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
});

// --- Lógica para o carrinho ---
const cart = {};
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsList = document.getElementById('cart-items');
const orderForm = document.getElementById('order-form');

if (cartIcon && cartSidebar && closeCartBtn) {
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('open');
    });

    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const count = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

function renderCartItems() {
    cartItemsList.innerHTML = '';
    for (const code in cart) {
        const item = cart[code];
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} (${item.quantity})</span>
            <button class="remove-from-cart-btn" data-code="${code}">&times;</button>
        `;
        cartItemsList.appendChild(li);
    }
    updateCartCount();
}

function removeFromCart(code) {
    delete cart[code];
    renderCartItems();
}

if (cartItemsList) {
    cartItemsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart-btn')) {
            const code = event.target.dataset.code;
            removeFromCart(code);
        }
    });
}

if (orderForm) {
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const carNumber = document.getElementById('car-number').value;
        const osNumber = document.getElementById('os-number').value;
        const userMatricula = document.getElementById('user-matricula').value;
        const orderDetails = {
            carro: carNumber,
            os: osNumber,
            matricula: userMatricula,
            itens: Object.values(cart).map(item => ({
                nome: item.name,
                codigo: item.code,
                quantidade: item.quantity
            }))
        };
        console.log("Pedido enviado:", orderDetails);
        alert("Pedido enviado com sucesso!");
        // Aqui você enviaria o pedido para um servidor ou e-mail
        // Limpar o carrinho e o formulário
        cart = {};
        renderCartItems();
        orderForm.reset();
        cartSidebar.classList.remove('open');
    });
}

// --- Nova Lógica de salvar e carregar peças do Firebase ---
const addPartForm = document.getElementById('add-part-form');
const catalogContainer = document.getElementById('catalog-container');

async function savePartToFirebase(partData) {
    try {
        const docRef = await addDoc(collection(db, "pecas"), partData);
        console.log("Documento escrito com ID: ", docRef.id);
        showNotification("Peça cadastrada com sucesso!");
    } catch (e) {
        console.error("Erro ao adicionar documento: ", e);
        showNotification("Erro ao cadastrar peça.");
    }
}

async function loadPartsFromFirebase() {
    catalogContainer.innerHTML = '';
    const querySnapshot = await getDocs(collection(db, "pecas"));
    querySnapshot.forEach((doc) => {
        const part = doc.data();
        createPartCard(part);
    });
}

function createPartCard(part) {
    const card = document.createElement('div');
    card.className = 'part-card';
    card.innerHTML = `
        <img src="${part.photo}" alt="${part.name}">
        <h3>${part.name}</h3>
        <p>Código: ${part.code}</p>
        <p>Marca: ${part.manufacturer}</p>
        <p>Ano: ${part.year}</p>
        <p>Modelo: ${part.busModel}</p>
        <p>Carroceria: ${part.bodyModel}</p>
        <button class="add-to-cart-btn"
            data-name="${part.name}"
            data-code="${part.code}"
            data-manufacturer="${part.manufacturer}">Adicionar ao Pedido</button>
    `;
    catalogContainer.appendChild(card);

    card.querySelector('.add-to-cart-btn').addEventListener('click', (event) => {
        const name = event.target.dataset.name;
        const code = event.target.dataset.code;
        const manufacturer = event.target.dataset.manufacturer;

        if (cart[code]) {
            cart[code].quantity++;
        } else {
            cart[code] = { name, code, manufacturer, quantity: 1 };
        }
        renderCartItems();
    });
}

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
            timestamp: new Date() // Adiciona um timestamp para rastreamento
        };
        
        savePartToFirebase(partData);
        addPartForm.reset();
        loadPartsFromFirebase(); // Recarrega a lista para mostrar a nova peça
    });
}

function showNotification(message) {
    const notification = document.getElementById('notification-message');
    if (notification) {
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Inicializa o catálogo de peças ao carregar a página
loadPartsFromFirebase();