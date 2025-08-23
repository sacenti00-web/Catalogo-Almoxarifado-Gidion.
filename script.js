// --- CARREGAR PEÇAS DO LOCALSTORAGE NO INÍCIO ---
let parts = JSON.parse(localStorage.getItem('pecas')) || [
    {
        photo: "https://http2.mlstatic.com/D_NQ_NP_993277-MLB50099493447_052022-O-tensor-correia-alternador-vw-17260-18310-18320-2z0145299b.webp",
        name: "Esticador de Correia Motor 17260 OT",
        description: "Esticador tensor de correia alternador para motor Volkswagen 17260 OT (original) Referência: 2TB-903150.",
        code: "19114",
        id: 1,
        year: "2010 - 2013",
        busModel: "Volkswagen 17-260 EOT Low",
        bodyModel: "Buscar Urbanuss Plus",
        category: "Mecânica",
        manufacturer: "Volkswagen",
        condition: "Nova"
    },
    {
        photo: "https://http2.mlstatic.com/D_NQ_NP_758019-MLB75020278591_032024-O.webp",
        name: "Bomba Direção Hidráulica 17230 OD",
        description: "Bomba de direção hidráulica Volkswagen 17230 OD Referência: 61471017061 Bosch.",
        code: "19846",
        id: 2,
        year: "2013 - (...)",
        busModel: "Volkswagen 17-230 OD, 22-260 S, 9-160 OD, 9-150 OD, 15-190 OD, 9-160 OD",
        bodyModel: "Todos",
        category: "Mecânica",
        manufacturer: "Bosch",
        condition: "Nova"
    },
    {
        photo: "https://images.tcdn.com.br/img/img_prod/955400/valvula_termostatica_vw_man_d08_4_e_6_cil_euro_v_07w121300a_23677_1_6935fd1bc27cc52baea1ef0e62fd38dd.jpg",
        name: "Valvula Termostática 17-230 OD",
        description: "Valvula termostática Volkswagen 17-230 OD Referência: 07W121300A.",
        code: "19683",
        id: 3,
        year: "2013 - (...)",
        busModel: "Volkswagen 17-230 OD, 22-260 S, 9-160 OD, 9-150 OD, 15-190 OD, 9-160 OD",
        bodyModel: "Todos",
        category: "Mecânica",
        manufacturer: "MTE",
        condition: "Nova"
    },
    {
        photo: "https://http2.mlstatic.com/D_NQ_NP_854160-MLB72088770395_102023-O.webp",
        name: "Bomba D' Água 17-230 OD",
        description: "Bomba d'água Volkswagen 17-230 OD Referência: 07W121011A.",
        code: "19683",
        id: 4,
        year: "2013 - (...)",
        busModel: "Volkswagen 17-230 OD, 22-260 S, 9-160 OD, 9-150 OD, 15-190 OD, 9-160 OD",
        bodyModel: "Todos",
        category: "Mecânica",
        manufacturer: "AuthoMix",
        condition: "Nova"
    },
    {
        photo: "https://images.tcdn.com.br/img/img_prod/942823/servo_embreagem_cambio_shift_zf_9s_zf_16s_85463_1_5d22e19ab2eecfcaaf4253616a988dc3.jpg",
        name: "Servo Shift 17-230 OD",
        description: "Servo shift Volkswagen 17-230 OD Referência: 2T2711486.",
        code: "19327",
        id: 5,
        year: "2013 - (...)",
        busModel: "Volkswagen 17-230 OD, 22-260 S, 9-160 OD, 9-150 OD, 15-190 OD, 9-160 OD",
        bodyModel: "Todos",
        category: "Mecânica",
        manufacturer: "ZF",
        condition: "Nova"
    },
    {
        photo: "https://lh3.googleusercontent.com/proxy/wkoyrA_r2wKJ5v7BNmYWtdgzAr6FBL3PuEhi1s_sClB83TXfziyOdTfDQlzKnNLvFLkM_jEt21Vdf5_MJpIh2NeOWtMDTiULqSx4pC68CubATuWJqZaFpM7V-vJiZ5pqsPzLASEv7fJ_ZmBLrzf9tiSZZO0VmbmPrGm-UE42IR02dFeBGQQYFbPhKY0F6a3kw50",
        name: "Bateria Recondicionada 150AH",
        description: "Bateria recondicionada 150AH 12V.",
        code: "60256",
        id: 6,
        year: "Todos",
        busModel: "Todos",
        bodyModel: "Todos",
        category: "Recon. Elétrica",
        manufacturer: "Pioneiro",
        condition: "recondicionada"
    },
    {
        photo: "https://images.tcdn.com.br/img/img_prod/945233/180_bateria_moura_m100he_106227_1_ebbe0bafd8eac7e5bb301a8ddc633fa5.png",
        name: "Bateria Recondicionada 110AH",
        description: "Bateria recondicionada 110AH 12V.",
        code: "62057",
        id: 7,
        year: "Todos",
        busModel: "",
        bodyModel: "Todos",
        category: "Recon. Elétrica",
        manufacturer: "Pioneiro",
        condition: "recondicionada"
    },
    {
        photo: "https://http2.mlstatic.com/D_894889-MLU74276280874_022024-C.jpg",
        name: "Câmara de ar 1000X20",
        description: "Câmara de ar 1000X20 Pirelli.",
        code: "34042",
        id: 8,
        year: "Todos",
        busModel: "Todos",
        bodyModel: "Todos",
        category: "Borracharia",
        manufacturer: "Todos",
        condition: "Nova"
    },
    {
        photo: "https://d3kgto4geuj773.cloudfront.net/Custom/Content/Products/22/51/22513_nucleo-de-valvulas-p-pneus-5405v-4495_m1_637972505047871027.webp",
        name: "Valvula Bico de Ar",
        description: "Nucleo da valvula do bico de ar do pneu.",
        code: "34132",
        id: 9,
        year: "Todos",
        busModel: "Todos",
        bodyModel: "Todos",
        category: "Borracharia",
        manufacturer: "Todos",
        condition: "Nova"
    },
    {
        photo: "https://http2.mlstatic.com/D_881842-MLB31830362659_082019-O-tampa-valvula-ventil-bico-pneu-carro-moto-plastico-100-un.webp",
        name: "Tampa ventil",
        description: "Tampa ventil polietileno.",
        code: "34133",
        id: 10,
        year: "Todos",
        busModel: "Todos",
        bodyModel: "Todos",
        category: "Borracharia",
        manufacturer: "Todos",
        condition: "Nova"
    },
    {
        photo: "https://rodowessler.com.br/wp-content/uploads/2018/05/35.029.jpg",
        name: "Massa de calafetar",
        description: "Massa de calafetar preta balde c/ 20Kg.",
        code: "11199",
        id: 11,
        year: "Todos",
        busModel: "Todos",
        bodyModel: "Todos",
        category: "pintura",
        manufacturer: "Todos",
        condition: "Nova"
    },
    {
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYDIztOX7BycB_Mb-FUcco_e9WAsvv-5mOBw&s",
        name: "Nivelador para retoque",
        description: "Nivelador para retoque de 900ml.",
        code: "11152",
        id: 12,
        year: "Todos",
        busModel: "Todos",
        bodyModel: "Todos",
        category: "pintura",
        manufacturer: "Todos",
        condition: "Nova"
    },
    {
        photo: "https://www.ecompletocdn.com.br/i/fp/1588/1197749_2_1618864177.png",
        name: "Pega mão Lateral Injetado Recondicionado",
        description: "Pega mão lateral injetado amarelo e cinza banco passageiro recondicionado.",
        code: "60984",
        id: 13,
        year: "2013 - 2015",
        busModel: "Todos",
        bodyModel: "Neobus mega",
        category: "Recon. Lataria",
        manufacturer: "Todos",
        condition: "recondicionada"
    },
    {
        photo: "https://cdn.awsli.com.br/200x200/1376/1376230/produto/347820993/whatsapp-image-2025-04-15-at-09-42-15--1--nao83rrrwo.jpeg",
        name: "Encosto banco motorista baixo recondicionado",
        description: "Encosto banco motorista baixo Urbano e Rodoviário recondicionado.",
        code: "60934",
        id: 14,
        year: "2013 - 2017",
        busModel: "Todos",
        bodyModel: "Neobus mega",
        category: "Recon. Lataria",
        manufacturer: "Todos",
        condition: "recondicionada"
    },
    {
        photo: "https://http2.mlstatic.com/D_839921-CBT90440509335_082025-C.jpg",
        name: "assento banco motorista recondicionado",
        description: "assento banco motorista Urbano e Rodoviário recondicionado.",
        code: "60934",
        id: 15,
        year: "2013 - 2017",
        busModel: "Todos",
        bodyModel: "Neobus mega",
        category: "Recon. Lataria",
        manufacturer: "Todos",
        condition: "recondicionada"
    },
    {
        photo: "https://msam.fbitsstatic.net/img/p/masterflex-se007-servo-embreagem-vw-onibus-15190eod-motor-dt-vw-onibus-17230-17280-motor-tr-mo-175771/378790.jpg?w=420&h=420&v=202506171623",
        name: "Servo Embreagem Recondicionado 17230 EOD MWM",
        description: "Servo embreagem recondicionado para motor MWM 17230 EOD.",
        code: "60297",
        id: 16,
        year: "(...) - 2013",
        busModel: "Volkswagen 17-230 EOD, 17-260 EOT, 17-280 EOT",
        bodyModel: "Todos",
        category: "Recon. Mecânica",
        manufacturer: "wabco",
        condition: "recondicionada"
    },
    {
        photo: "https://boxonline.fbitsstatic.net/img/p/servo-embreagem-vw-onibus-17-230-od-17-280-ot-eaton-73972/260410.jpg?w=420&h=420&v=no-change&qs=ignore",
        name: "Servo Embreagem Recondicionado 17230 OD MAN",
        description: "Servo embreagem recondicionado para motor MAN 17230 OD.",
        code: "60298",
        id: 17,
        year: "(...) - 2013",
        busModel: "Volkswagen 17-230 OD",
        bodyModel: "Todos",
        category: "Recon. Mecânica",
        manufacturer: "wabco",
        condition: "recondicionada"
    },
    {
        photo: "https://images.tcdn.com.br/img/img_prod/678233/manometro_mecanico_duplo_pressao_de_ar_0_15bar_mercedes_benz_1620_11971_1_0df46b027d686d4038ea527f92c1f8db.jpg",
        name: "Relogio Manometro Ar Mercedes Benz",
        description: "Relogio manometro ar Mercedes Benz ",
        code: "60334",
        id: 18,
        year: "2009 - 2012",
        busModel: "Mercedes Benz OF-1721, OF-1620",
        bodyModel: "Todos",
        category: "Recon. Mecânica",
        manufacturer: "Mercedes Benz",
        condition: "recondicionada"
    },
    {
        photo: "https://apolloonibus.fbitsstatic.net/img/p/motor-desembacador-limpador-p-brisa-24vts-101212624-1114469-91773/604363-1.jpg?w=530&h=530&v=202501310108",
        name: "Motor Desembaçador pararisa 24V simples",
        description: "Motor simples desembaçador para parabrisa 24V",
        code: "12794",
        id: 19,
        year: "2011 - 2016",
        busModel: "Todos",
        bodyModel: "Neobus Mega, Neobus New Mega, Neobus Thunder+.",
        category: "Elétrica",
        manufacturer: "Apollo",
        condition: "Nova"
    },
    {
        photo: "https://cdn.awsli.com.br/800x800/437/437289/produto/309996635/lampada-de-farol-de-caminhao-ge-24v-h1-70w-heavy-star-vida-longa-50320-1u-un-2a2-64fais9c4h.png",
        name: "Lampada H1 24V 70W",
        description: "Lampada de farol H1 24V 70W .",
        code: "12876",
        id: 20,
        year: "2011 - 2017",
        busModel: "Todos",
        bodyModel: "Neobus Mega, Neobus New Mega, Neobus Thunder+.",
        category: "Elétrica",
        manufacturer: "Hella",
        condition: "Nova"
    },
    {
        photo: "https://http2.mlstatic.com/D_867527-MLB53926898556_022023-O.webp",
        name: "Chave seta / limpador 24V mercedes",
        description: "Chave seta e limpador de parabrisa 24V para Mercedes Benz.",
        code: "13227",
        id: 21,
        year: "2018 - (...)",
        busModel: "Mercedes Benz OF-1519, OF-1723, OF-1721.",
        bodyModel: "Todos",
        category: "Elétrica",
        manufacturer: "Marilia",
        condition: "Nova"
    },
];

const catalogContainer = document.querySelector(".catalog-container");
const addPartFormContainer = document.querySelector(".add-part-form-container");
const loginFormContainer = document.querySelector(".login-form-container");
const loginForm = document.getElementById("login-form");
const addPartForm = document.getElementById("add-part-form");
let currentParts = parts;

const manufacturerSelect = document.getElementById("part-manufacturer");
const otherManufacturerContainer = document.getElementById("other-manufacturer-container");
const otherManufacturerInput = document.getElementById("other-manufacturer");

const loginMatriculaInput = document.getElementById("login-matricula");
const loginSenhaInput = document.getElementById("login-senha");
const loginErrorMessage = document.getElementById("login-error-message");

let cart = [];

const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsList = document.getElementById('cart-items');
const orderForm = document.getElementById('order-form');

const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzZn8n1y1gs0srbPUpRtPvs7PPQ8F36yJ9guzArcm8xlA-qrt-Ji6DsENlbTkh9bAny/exec";

const accessCredentials = [
    {
        matricula: "11684",
        senha: "10153022"
    },
    {
        matricula: "9111",
        senha: "Bru@845960"
    },
    {
        matricula: "usuario3",
        senha: "senha3"
    }
];

// --- NOVA FUNÇÃO PARA EXIBIR NOTIFICAÇÕES ---
function showNotification(message, isError = false) {
    const notification = document.getElementById('notification-message');
    notification.textContent = message;

    notification.classList.remove('error');

    if (isError) {
        notification.classList.add('error');
    }

    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}


function hideAllContainers() {
    catalogContainer.style.display = "none";
    addPartFormContainer.style.display = "none";
    loginFormContainer.style.display = "none";
}

function displayParts(partsToDisplay) {
    catalogContainer.innerHTML = "";
    currentParts = partsToDisplay;

    if (partsToDisplay.length === 0) {
        catalogContainer.innerHTML = "<p class='no-parts-message'>Nenhuma peça encontrada.</p>";
        catalogContainer.style.display = "block";
    } else {
        catalogContainer.style.display = "flex";
        partsToDisplay.forEach((part) => {
            const partCardHTML = `<div class="part-card" data-code="${part.code}">
                        <div class="part-image-container">
                            <img src="${part.photo}" alt="Foto da peça">
                        </div>
                        <h2>${part.name}</h2>
                    </div>
            `;
            catalogContainer.innerHTML += partCardHTML;
        });

        document.querySelectorAll(".part-card").forEach(card => {
            card.addEventListener("click", showPartDetails);
        });
    }
}

function showCatalog() {
    hideAllContainers();
    catalogContainer.style.display = "flex";
    displayParts(parts);
}

function showLoginForm() {
    hideAllContainers();
    loginFormContainer.style.display = "block";
    loginErrorMessage.style.display = "none";
    loginForm.reset();
}

function showAddPartForm() {
    hideAllContainers();
    addPartFormContainer.style.display = "block";
    addPartForm.reset();
    otherManufacturerContainer.style.display = "none";
}

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const matricula = loginMatriculaInput.value;
    const senha = loginSenhaInput.value;

    const user = accessCredentials.find(
        user => user.matricula === matricula && user.senha === senha
    );

    if (user) {
        showAddPartForm();
    } else {
        loginErrorMessage.textContent = "Matrícula ou senha incorretas.";
        loginErrorMessage.style.display = "block";
    }
});

// --- ALTERAÇÃO AQUI: SALVANDO A NOVA PEÇA NO LOCALSTORAGE ---
addPartForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let manufacturer = manufacturerSelect.value;
    if (manufacturer === "Outra") {
        manufacturer = otherManufacturerInput.value;
    }

    const newPart = {
        name: document.getElementById("part-name").value,
        code: document.getElementById("part-code").value,
        photo: document.getElementById("part-photo").value,
        description: document.getElementById("part-description").value,
        year: document.getElementById("part-year").value,
        busModel: document.getElementById("part-bus-model").value,
        bodyModel: document.getElementById("part-body-model").value,
        category: document.getElementById("part-category").value,
        manufacturer: manufacturer,
        condition: document.getElementById("part-condition").value,
        // Gera um ID único para a nova peça
        id: parts.length > 0 ? Math.max(...parts.map(p => p.id)) + 1 : 1
    };

    // Adiciona a nova peça ao array em memória
    parts.push(newPart);

    // Salva o array completo de volta no localStorage
    localStorage.setItem('pecas', JSON.stringify(parts));

    // Exibe a notificação de sucesso
    showNotification("Peça cadastrada com sucesso!");

    // Volta para o catálogo atualizado
    showCatalog();
    addPartForm.reset();
});

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function renderCartItems() {
    cartItemsList.innerHTML = '';
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p style="text-align: center; color: #999;">O carrinho está vazio.</p>';
        return;
    }
    cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-name">${item.name}</span>
                (Cód: ${item.code})
            </div>
            <div class="item-quantity-control" data-id="${item.id}">
                <button class="quantity-btn decrease-quantity-btn">-</button>
                <span class="item-quantity">${item.quantity}</span>
                <button class="quantity-btn increase-quantity-btn">+</button>
                <button class="remove-item-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        cartItemsList.appendChild(li);
    });
}

function addToCart(partId) {
    const existingItem = cart.find(item => item.id === parseInt(partId));
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const part = parts.find(p => p.id === parseInt(partId));
        if (part) {
            cart.push({ ...part, quantity: 1 });
        }
    }
    updateCartCount();
    renderCartItems();
    console.log(`Peça adicionada ao pedido.`);
}

function changeQuantity(partId, change) {
    const item = cart.find(i => i.id === parseInt(partId));
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== parseInt(partId));
        }
        updateCartCount();
        renderCartItems();
    }
}

cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('open');
});

closeCartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
});

catalogContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const partId = e.target.getAttribute('data-id');
        addToCart(partId);
    }
});

cartItemsList.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const quantityControl = btn.closest('.item-quantity-control');
    const partId = quantityControl ? quantityControl.getAttribute('data-id') : btn.getAttribute('data-id');

    if (btn.classList.contains('remove-item-btn')) {
        cart = cart.filter(item => item.id !== parseInt(partId));
        updateCartCount();
        renderCartItems();
    } else if (btn.classList.contains('increase-quantity-btn')) {
        changeQuantity(partId, 1);
    } else if (btn.classList.contains('decrease-quantity-btn')) {
        changeQuantity(partId, -1);
    }
});

orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const carNumber = document.getElementById('car-number').value;
    const osNumber = document.getElementById('os-number').value;
    const userMatricula = document.getElementById('user-matricula').value;

    if (cart.length === 0) {
        showNotification("Seu pedido está vazio. Adicione peças para continuar.", true);
        return;
    }

    const data = {
        carNumber: carNumber,
        osNumber: osNumber,
        userMatricula: userMatricula,
        parts: cart
    };

    try {
        await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        showNotification("Pedido finalizado. Retirar no Almoxarifado.", false);

    } catch (error) {
        console.error('Erro ao enviar o pedido:', error);
        showNotification("Ocorreu um erro ao enviar o pedido. Tente novamente.", true);
    } finally {
        cart = [];
        updateCartCount();
        renderCartItems();
        cartSidebar.classList.remove('open');
        orderForm.reset();
    }
});

function showPartDetails(event) {
    const partCode = event.currentTarget.dataset.code;
    const selectedPart = parts.find(part => part.code === partCode);

    if (selectedPart) {
        catalogContainer.style.display = "block";
        catalogContainer.innerHTML = `<div class="detailed-part">
                    <button onclick="showCatalog()">Voltar para o catálogo</button>
                    <img src="${selectedPart.photo}" alt="Foto da peça">
                    <h2>${selectedPart.name}</h2>
                    <p><strong>Descrição:</strong> ${selectedPart.description}</p>
                    <p><strong>Cód:</strong> ${selectedPart.code}</p>
                    <p><strong>Ano:</strong> ${selectedPart.year}</p>
                    <p><strong>Ônibus:</strong> ${selectedPart.busModel}</p>
                    <p><strong>Carroceria:</strong> ${selectedPart.bodyModel}</p>
                    <button class="add-to-cart-btn" data-id="${selectedPart.id}">Adicionar ao Pedido</button>
                </div>
        `;
        document.querySelector(".add-to-cart-btn").addEventListener('click', (e) => {
            e.stopPropagation();
            const partId = e.target.getAttribute('data-id');
            addToCart(partId);
        });
    }
}

document.querySelector(".search-bar input").addEventListener("input", searchParts);

function searchParts() {
    const searchTerm = document.querySelector(".search-bar input").value.toLowerCase();

    const filteredParts = parts.filter(part => {
        return (
            part.name.toLowerCase().includes(searchTerm) ||
            part.description.toLowerCase().includes(searchTerm) ||
            part.code.toLowerCase().includes(searchTerm) ||
            part.busModel.toLowerCase().includes(searchTerm) ||
            part.bodyModel.toLowerCase().includes(searchTerm)
        );
    });

    displayParts(filteredParts);
}

function filterByConditionAndCategory(condition, category) {
    const filteredParts = parts.filter(part => {
        return (
            part.condition.toLowerCase() === condition.toLowerCase() &&
            part.category.toLowerCase() === category.toLowerCase()
        );
    });

    displayParts(filteredParts);
}

function filterByManufacturer(manufacturer) {
    const filteredParts = parts.filter(part => {
        return part.manufacturer.toLowerCase() === manufacturer.toLowerCase();
    });

    displayParts(filteredParts);
}

document.querySelectorAll("nav .dropdown-menu a").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        const parentUL = event.target.closest("ul.dropdown-menu");
        const category = event.target.textContent;

        if (parentUL.dataset.condition) {
            const condition = parentUL.dataset.condition;
            filterByConditionAndCategory(condition, category);
        } else if (event.target.dataset.manufacturer) {
            const manufacturer = event.target.dataset.manufacturer;
            filterByManufacturer(manufacturer);
        }
    });
});

document.querySelector("#parts-link").addEventListener("click", event => {
    event.preventDefault();
    showCatalog();
});

document.querySelector("#add-part-link").addEventListener("click", event => {
    event.preventDefault();
    showLoginForm();
});

manufacturerSelect.addEventListener("change", (event) => {
    if (event.target.value === "Outra") {
        otherManufacturerContainer.style.display = "block";
    } else {
        otherManufacturerContainer.style.display = "none";
    }
});

// A função showCatalog() agora é chamada no final do script para carregar as peças
// salvas no localStorage assim que a página é carregada
showCatalog();