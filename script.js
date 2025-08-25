import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

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
let isLoggedIn = false;
let allPartsData = []; // Armazenar todas as peças para acesso rápido
const catalogContainer = document.getElementById('catalog-container');
const addPartFormContainer = document.querySelector('.add-part-form-container');
const loginFormContainer = document.querySelector('.login-form-container');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsList = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const notificationContainer = document.getElementById('notification-message');
const orderForm = document.getElementById('order-form');

// Variáveis do Login
const addPartLink = document.getElementById('add-part-link');
const loginForm = document.getElementById('login-form');
const loginErrorMessage = document.getElementById('login-error-message');

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

// ------------------- LÓGICA DO CATÁLOGO E TELAS -------------------
function showCatalog() {
    catalogContainer.innerHTML = '';
    catalogContainer.style.display = 'flex';
    catalogContainer.style.flexDirection = 'row';
    addPartFormContainer.style.display = 'none';
    loginFormContainer.style.display = 'none';
    
    // Se já temos os dados, apenas renderizamos, caso contrário, buscamos
    if (allPartsData.length > 0) {
        renderParts(allPartsData);
    } else {
        loadPartsFromFirebase();
    }
}

function renderParts(parts) {
    catalogContainer.innerHTML = '';
    if (parts.length === 0) {
        catalogContainer.innerHTML = '<p class="no-parts-message">Nenhuma peça encontrada.</p>';
        return;
    }
    parts.forEach(part => createPartCard(part));
}

function createPartCard(part) {
    const card = document.createElement('div');
    card.className = 'part-card clickable-part';
    card.dataset.code = part.code;
    card.innerHTML = `
        <div class="part-image-container">
            <img src="${part.photo || 'https://via.placeholder.com/200'}" alt="${part.name}">
        </div>
        <div class="part-info-simple">
            <h2 class="part-name">${part.name}</h2>
        </div>
    `;
    catalogContainer.appendChild(card);
}

function showPartDetails(part) {
    catalogContainer.innerHTML = '';
    catalogContainer.style.flexDirection = 'column'; // Mudar para layout de coluna
    
    const detailsHtml = `
        <button id="back-to-catalog" class="back-btn styled-button"><i class="fas fa-arrow-left"></i> Voltar</button>
        <div class="part-details-card">
            <div class="part-details-image">
                <img src="${part.photo || 'https://via.placeholder.com/400'}" alt="${part.name}">
            </div>
            <div class="part-details-info">
                <h1 class="part-details-name">${part.name}</h1>
                <p><strong>Código:</strong> ${part.code}</p>
                <p><strong>Marca:</strong> ${part.manufacturer}</p>
                <p><strong>Descrição:</strong> ${part.description || 'N/A'}</p>
                <p><strong>Ano:</strong> ${part.year || 'N/A'}</p>
                <p><strong>Modelo do Ônibus:</strong> ${part.busModel || 'N/A'}</p>
                <p><strong>Modelo da Carroceria:</strong> ${part.bodyModel || 'N/A'}</p>
                <p><strong>Categoria:</strong> ${part.category}</p>
                <p><strong>Condição:</strong> ${part.condition}</p>
                <button class="add-to-cart-btn-details styled-button" 
                        data-name="${part.name}" 
                        data-code="${part.code}">Adicionar ao Pedido</button>
            </div>
        </div>
    `;
    catalogContainer.innerHTML = detailsHtml;

    document.getElementById('back-to-catalog').addEventListener('click', () => {
        showCatalog();
    });
}

async function loadPartsFromFirebase(filterType = null, filterValue = null) {
    catalogContainer.innerHTML = '<h2>Carregando peças...</h2>';
    let partsQuery = collection(db, "pecas");
    
    try {
        const querySnapshot = await getDocs(partsQuery);
        allPartsData = []; // Limpa o array de dados para evitar duplicação
        querySnapshot.forEach((doc) => {
            allPartsData.push({ id: doc.id, ...doc.data() });
        });
        
        // Aplica o filtro após carregar todos os dados
        let filteredParts = allPartsData;
        if (filterType && filterValue) {
            filteredParts = allPartsData.filter(part => {
                if (filterType === 'manufacturer') {
                    return part.manufacturer === filterValue;
                }
                if (filterType === 'category') {
                    return part.category === filterValue;
                }
                if (filterType === 'condition') {
                    // A categoria de peças recondicionadas é 'Recondicionada Mecânica' etc., então filtramos por 'Recondicionada'
                    if (filterValue === 'Recondicionada') {
                        return part.condition === 'Recondicionada';
                    }
                }
                return true;
            });
        }
        
        renderParts(filteredParts);
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
        // Após o cadastro, recarregamos a lista de peças
        allPartsData = []; // Força o recarregamento
        loadPartsFromFirebase();
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

    addPartLink.addEventListener('click', (event) => {
        event.preventDefault();
        if (isLoggedIn) {
            catalogContainer.style.display = 'none';
            loginFormContainer.style.display = 'none';
            addPartFormContainer.style.display = 'block';
        } else {
            catalogContainer.style.display = 'none';
            addPartFormContainer.style.display = 'none';
            loginFormContainer.style.display = 'block';
        }
    });

    // Lógica para o menu de filtros
    const mainNav = document.querySelector('.main-nav');
    if (mainNav) {
        mainNav.addEventListener('click', (event) => {
            if (event.target.tagName === 'A' && event.target.closest('.dropdown-menu')) {
                event.preventDefault();
                const parentDropdown = event.target.closest('.dropdown-menu');
                const filterType = parentDropdown.dataset.type;
                let filterValue = null;
                
                if (filterType === 'manufacturer') {
                    filterValue = event.target.dataset.manufacturer;
                } else if (filterType === 'category') {
                    filterValue = event.target.dataset.category;
                } else if (filterType === 'condition') {
                    filterValue = event.target.dataset.condition;
                }
                
                if (allPartsData.length === 0) {
                     // Se os dados ainda não foram carregados, busca e filtra
                    loadPartsFromFirebase(filterType, filterValue);
                } else {
                    // Se os dados já estão em memória, apenas filtra
                    let filteredParts = allPartsData;
                    if (filterType && filterValue) {
                        filteredParts = allPartsData.filter(part => {
                            if (filterType === 'manufacturer') {
                                return part.manufacturer === filterValue;
                            }
                            if (filterType === 'category') {
                                return part.category === filterValue;
                            }
                            if (filterType === 'condition') {
                                return part.condition && part.condition.includes(filterValue);
                            }
                            return true;
                        });
                    }
                    renderParts(filteredParts);
                }
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
    
    // Lógica de delegação de eventos para as peças e o botão de adicionar ao carrinho
    catalogContainer.addEventListener('click', (event) => {
        // Lógica para clicar em uma peça
        const clickedPart = event.target.closest('.clickable-part');
        if (clickedPart) {
            const code = clickedPart.dataset.code;
            const part = allPartsData.find(p => p.code === code);
            if (part) {
                showPartDetails(part);
            }
            return; // Impede que o evento de adicionar ao carrinho seja ativado
        }

        // Lógica para clicar no botão "Adicionar ao Pedido"
        if (event.target.classList.contains('add-to-cart-btn-details')) {
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

        const urlAppsScript = 'https://script.google.com/macros/s/AKfycbzErMPtJ9PvUaLhCh6z57Q86Zfs7DUfdn6I6q2EXQ5zna9fN3oCfK3oxA6R6FrKDWIJ/exec';
        
        const formData = new FormData();
        formData.append('carNumber', document.getElementById('car-number').value);
        formData.append('osNumber', document.getElementById('os-number').value);
        formData.append('userMatricula', document.getElementById('user-matricula').value);
        formData.append('pedido', JSON.stringify(Object.values(cart)));
        
        try {
            const response = await fetch(urlAppsScript, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.status === 'success') {
                showNotification("Pedido enviado com sucesso!");
                
                const orderData = {
                    carro: document.getElementById('car-number').value,
                    os: document.getElementById('os-number').value,
                    matricula: document.getElementById('user-matricula').value,
                    itens: Object.values(cart),
                    timestamp: new Date()
                };
                await addDoc(collection(db, "pedidos"), orderData);

                cart = {};
                renderCartItems();
                orderForm.reset();
                cartSidebar.classList.remove('open');
            } else {
                throw new Error(result.message || 'Erro desconhecido');
            }
        } catch (e) {
            console.error("Erro ao enviar pedido para o Apps Script: ", e);
            showNotification(`Erro ao enviar pedido: ${e.message}`, true);
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

// ------------------- LÓGICA DO AUTOCOMPLETAR E PESQUISA -------------------
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const autocompleteList = document.getElementById('autocomplete-list');

// Função para fechar a lista de sugestões
function closeAllLists(elmnt) {
    if (autocompleteList) {
        // Limpa todas as sugestões que existem
        autocompleteList.innerHTML = '';
    }
}

// Evento para o autocompletar
searchInput.addEventListener('input', function() {
    const termo = this.value.toLowerCase().trim();
    
    // Limpa a lista anterior
    closeAllLists();

    // Não mostra sugestões se o termo for muito curto ou vazio
    if (termo.length < 2) {
        return false;
    }

    // Filtra as peças que já estão na memória (allPartsData)
    const filtered = allPartsData.filter(part => 
        (part.name && part.name.toLowerCase().includes(termo)) || 
        (part.code && part.code.toLowerCase().includes(termo))
    );

    // Cria e exibe os itens de sugestão
    filtered.forEach(part => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';

        // Destaca a parte da string que corresponde à busca
        const nameText = part.name;
        const codeText = part.code ? part.code : '';
        
        if (nameText.toLowerCase().includes(termo)) {
            const index = nameText.toLowerCase().indexOf(termo);
            const pre = nameText.substr(0, index);
            const match = nameText.substr(index, termo.length);
            const post = nameText.substr(index + termo.length);
            item.innerHTML = `${pre}<strong>${match}</strong>${post}`;
        } else if (codeText.toLowerCase().includes(termo)) {
            const index = codeText.toLowerCase().indexOf(termo);
            const pre = codeText.substr(0, index);
            const match = codeText.substr(index, termo.length);
            const post = codeText.substr(index + termo.length);
            item.innerHTML = `<strong>${pre}${match}${post}</strong> - ${part.name}`;
        } else {
            item.innerHTML = part.name;
        }
        
        // Adiciona um evento de clique para preencher a barra de pesquisa
        item.addEventListener('click', function() {
            searchInput.value = part.name;
            closeAllLists();
            renderParts([part]); // Renderiza apenas a peça selecionada
        });

        autocompleteList.appendChild(item);
    });
});

// Fecha as sugestões quando o usuário clica fora da barra de pesquisa
document.addEventListener("click", function (e) {
    if (e.target !== searchInput) {
        closeAllLists(e.target);
    }
});

// Evento de clique no botão de busca e Enter para filtrar o catálogo principal
if (searchButton && searchInput) {
    searchButton.addEventListener('click', () => {
        searchAndRenderParts();
    });

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchAndRenderParts();
        }
    });
}

function searchAndRenderParts() {
    const termo = searchInput.value.toLowerCase().trim();
    closeAllLists();
    
    // Filtra os dados em memória e renderiza os resultados
    const filtered = allPartsData.filter(part => 
        (part.name && part.name.toLowerCase().includes(termo)) || 
        (part.code && part.code.toLowerCase().includes(termo))
    );
    renderParts(filtered);
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

    // Lógica de Login
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const matricula = document.getElementById('login-matricula').value;
        const password = document.getElementById('login-password').value;
        
        try {
            const userDocRef = doc(db, "users", matricula);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                if (userData.password === password) {
                    isLoggedIn = true;
                    showNotification("Login bem-sucedido! Acesso de administrador liberado.");
                    showCatalog();
                    loginForm.reset();
                } else {
                    loginErrorMessage.textContent = "Matrícula ou senha incorreta.";
                }
            } else {
                loginErrorMessage.textContent = "Matrícula ou senha incorreta.";
            }
        } catch (e) {
            console.error("Erro ao fazer login: ", e);
            loginErrorMessage.textContent = "Ocorreu um erro. Tente novamente.";
        }
    });

    // Carrega o catálogo ao iniciar a página
    showCatalog();
});