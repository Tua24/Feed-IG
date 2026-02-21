// ============================================
// BORCELLLE VASES - PERFIL CON CHATBOT
// ============================================

// 1. SELECCIONAR ELEMENTOS DEL DOM
const followBtn = document.getElementById('followBtn');
const followBtnMobile = document.getElementById('followBtnMobile');
const messageBtn = document.getElementById('messageBtn');
const messageBtnMobile = document.getElementById('messageBtnMobile');
const notificationsIcon = document.getElementById('notificationsIcon');
const notificationModal = document.getElementById('notificationModal');
const notificationMessage = document.getElementById('notificationMessage');
const postsGrid = document.getElementById('postsGrid');
const postsTab = document.getElementById('postsTab');
const reelsTab = document.getElementById('reelsTab');
const savedTab = document.getElementById('savedTab');
const postsStat = document.getElementById('postsStat');
const followersStat = document.getElementById('followersStat');
const followingStat = document.getElementById('followingStat');

// 🆕 Elementos del chat
const chatModal = document.getElementById('chatModal');
const closeChat = document.getElementById('closeChat');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');
const quickReplies = document.getElementById('quickReplies');

// 2. VARIABLES DE ESTADO
let isFollowing = false;
let followersCount = 1529;
let postsCount = 30;
let currentTab = 'posts';
let chatHistory = []; // Para guardar conversación

// 3. ARRAYS DE CONTENIDO
const posts = [
    { id: 1, type: 'image', icon: 'fa-image', color: '#b8a99a', text: 'Jarrón Bohemian' },
    { id: 2, type: 'image', icon: 'fa-leaf', color: '#8b7a6b', text: 'Natural Style' },
    { id: 3, type: 'image', icon: 'fa-feather', color: '#a58e7c', text: 'Plumas' },
    { id: 4, type: 'image', icon: 'fa-palette', color: '#7d6b5c', text: 'Color pastel' },
    { id: 5, type: 'image', icon: 'fa-star', color: '#9b8572', text: 'Edición limitada' },
    { id: 6, type: 'image', icon: 'fa-gem', color: '#6b5a4c', text: 'Premium' },
    { id: 7, type: 'image', icon: 'fa-tree', color: '#8e7b68', text: 'Inspiración natural' },
    { id: 8, type: 'image', icon: 'fa-wine-bottle', color: '#5d4e41', text: 'Serie terracota' },
    { id: 9, type: 'image', icon: 'fa-cloud', color: '#b29e8a', text: 'Nube' },
    { id: 10, type: 'image', icon: 'fa-sun', color: '#c4aa92', text: 'Amarillo mostaza' },
    { id: 11, type: 'image', icon: 'fa-moon', color: '#4f4237', text: 'Luna' },
    { id: 12, type: 'image', icon: 'fa-water', color: '#7fa5b0', text: 'Ola' }
];

const reels = [
    { id: 13, type: 'video', icon: 'fa-play', color: '#6b5a4c', text: 'Proceso creativo' },
    { id: 14, type: 'video', icon: 'fa-play', color: '#8b7a6b', text: 'Behind the scenes' }
];

const saved = [
    { id: 15, type: 'saved', icon: 'fa-bookmark', color: '#a58e7c', text: 'Inspiración' }
];

// ============================================
// 🆕 CHATBOT - LÓGICA COMPLETA
// ============================================

// Base de conocimiento del bot
const botKnowledge = {
    greeting: {
        patterns: ['hola', 'buenas', 'hey', 'hi', 'saludos'],
        responses: [
            "¡Hola! Soy el asistente virtual de Borcellle Vases. ¿En qué puedo ayudarte hoy?",
            "¡Bienvenido! Cuéntame, ¿qué te gustaría saber sobre nuestros jarrones artesanales?"
        ]
    },
    presentation: {
        patterns: ['present', 'quién es', 'quien es', 'cuéntame', 'cuentame', 'información', 'info'],
        responses: [
            "✨ Somos Borcellle Vases, una marca de jarrones artesanales con estilo bohemio desde 2015. Cada pieza está hecha a mano con materiales sostenibles y diseños únicos que combinan tradición y modernidad.",
            "🎨 En Borcellle creamos jarrones que cuentan historias. Nuestra filosofía es llevar arte y naturaleza a cada hogar con piezas únicas e irrepetibles."
        ]
    },
    services: {
        patterns: ['servicio', 'ofrece', 'hacen', 'producto', 'venden', 'comprar'],
        responses: [
            "🌸 Ofrecemos:\n• Jarrones artesanales exclusivos\n• Pedidos personalizados\n• Asesoría de decoración\n• Envíos a todo el país\n• Talleres de cerámica",
            "Puedes encontrar en nuestra tienda: jarrones de colección, piezas personalizadas y sets de decoración bohemia. ¿Te gustaría ver nuestra colección?"
        ]
    },
    price: {
        patterns: ['precio', 'cuánto', 'cuesta', 'valor', 'cost', '$$', 'pesos'],
        responses: [
            "Nuestros jarrones van desde $45.000 hasta $250.000 CLP, dependiendo del tamaño y la colección. ¿Te gustaría conocer la colección actual?",
            "Tenemos opciones para todos los presupuestos. Los jarrones de la colección Natural parten en $45.000. ¿Quieres que te muestre los más populares?"
        ]
    },
    contact: {
        patterns: ['contact', 'whatsapp', 'instagram', 'mail', 'email', 'ubicación', 'ubicacion', 'tienda'],
        responses: [
            "📱 Puedes contactarnos por:\n• WhatsApp: +56 9 1234 5678\n• Instagram: @borcellle_vases\n• Email: hola@borcellle.com\n• Tienda física: Av. Principal 123, Santiago",
            "Estamos en Instagram como @borcellle_vases y también tenemos tienda física en el barrio Lastarria. ¡Te esperamos!"
        ]
    },
    custom: {
        patterns: ['personalizado', 'diseño', 'encargo', 'especial', 'único'],
        responses: [
            "¡Sí! Hacemos jarrones personalizados. Cuéntanos tu idea y la hacemos realidad. El tiempo de entrega es de 2-3 semanas.",
            "Los pedidos especiales son nuestra especialidad. ¿Qué tipo de diseño tienes en mente?"
        ]
    },
    shipping: {
        patterns: ['envío', 'envio', 'despacho', 'llegar', 'domicilio', 'delivery'],
        responses: [
            "Hacemos envíos a todo Chile por Starken. El costo es de $4.990 y llega en 3-5 días hábiles. Compras sobre $80.000 tienen envío gratis.",
            "Despachamos a todo el país. Los envíos a regiones demoran 3-7 días hábiles. ¿A qué comuna necesitas?"
        ]
    },
    goodbye: {
        patterns: ['chao', 'adiós', 'adios', 'gracias', 'bye', 'hasta luego'],
        responses: [
            "¡Gracias por contactarnos! Si necesitas algo más, aquí estaremos. Que tengas un lindo día ✨",
            "¡Un placer ayudarte! Recuerda que puedes visitar nuestra tienda o Instagram para ver las nuevas colecciones. ¡Hasta pronto!"
        ]
    }
};

// Respuestas por defecto
const defaultResponses = [
    "Interesante pregunta! 😊 Déjame consultar con nuestro equipo y te respondemos a la brevedad. ¿Quieres dejar tu contacto?",
    "¡Buena pregunta! Mientras tanto, ¿te gustaría conocer nuestras colecciones destacadas?",
    "No estoy seguro de esa información, pero puedo ayudarte con precios, envíos o diseños personalizados. ¿Qué prefieres?"
];

// Función para obtener la hora actual
function getCurrentTime() {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
}

// Función para agregar mensaje al chat
function addMessage(text, sender = 'bot', options = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = sender === 'bot' 
        ? '<div class="message-avatar"><i class="fas fa-robot"></i></div>'
        : '<div class="message-avatar"><i class="fas fa-user"></i></div>';
    
    let optionsHTML = '';
    if (options && options.length > 0) {
        optionsHTML = '<div class="bot-options">';
        options.forEach(opt => {
            optionsHTML += `<button class="bot-option" onclick="handleBotOption('${opt}')">${opt}</button>`;
        });
        optionsHTML += '</div>';
    }
    
    messageDiv.innerHTML = `
        ${avatar}
        <div class="message-content">
            <p>${text}</p>
            ${optionsHTML}
            <div class="message-time">${getCurrentTime()}</div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Guardar en historial
    chatHistory.push({ text, sender, time: getCurrentTime() });
}

// Función para procesar mensaje del usuario
function processUserMessage(userMessage) {
    userMessage = userMessage.toLowerCase().trim();
    
    // Buscar coincidencias en base de conocimiento
    for (let [key, value] of Object.entries(botKnowledge)) {
        const match = value.patterns.some(pattern => userMessage.includes(pattern));
        if (match) {
            const randomResponse = value.responses[Math.floor(Math.random() * value.responses.length)];
            return randomResponse;
        }
    }
    
    // Si no hay coincidencia, respuesta por defecto
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Función para enviar mensaje
function sendUserMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;
    
    // Mostrar mensaje del usuario
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Pensar y responder
    setTimeout(() => {
        const botResponse = processUserMessage(message);
        addMessage(botResponse, 'bot');
        
        // Sugerir opciones según contexto
        updateQuickReplies(message);
    }, 1000); // Simula tiempo de escritura
}

// Actualizar quick replies según contexto
function updateQuickReplies(lastMessage) {
    const replies = [];
    lastMessage = lastMessage.toLowerCase();
    
    if (lastMessage.includes('precio') || lastMessage.includes('costo')) {
        replies.push('Ver colección', 'Jarrones económicos', 'Ofertas');
    } else if (lastMessage.includes('diseño') || lastMessage.includes('personalizado')) {
        replies.push('Quiero uno personalizado', 'Ejemplos', 'Tiempo de entrega');
    } else if (lastMessage.includes('envío') || lastMessage.includes('despacho')) {
        replies.push('Santiago', 'Regiones', 'Internacional');
    } else {
        replies.push('Precios', 'Colecciones', 'Envíos', 'Contacto', 'Personalizados');
    }
    
    quickReplies.innerHTML = '';
    replies.forEach(reply => {
        const btn = document.createElement('button');
        btn.className = 'quick-reply-btn';
        btn.textContent = reply;
        btn.onclick = () => {
            chatInput.value = reply;
            sendUserMessage();
        };
        quickReplies.appendChild(btn);
    });
}

// Función para abrir chat
function openChat() {
    chatModal.style.display = 'block';
    
    // Si es primera vez, mensaje de bienvenida
    if (chatMessages.children.length === 0) {
        addMessage("✨ ¡Hola! Soy el asistente virtual de Borcellle Vases. Cuéntame, ¿cómo puedo ayudarte hoy?", 'bot', ['Presentación', 'Servicios', 'Precios', 'Contacto']);
        updateQuickReplies('hola');
    }
}

// Función para cerrar chat
function closeChatModal() {
    chatModal.style.display = 'none';
}

// Manejar opciones de botón
window.handleBotOption = function(option) {
    chatInput.value = option;
    sendUserMessage();
};

// ============================================
// FUNCIONES DEL PERFIL (sin cambios)
// ============================================

function showNotification(message, isSuccess = true) {
    notificationMessage.textContent = message;
    const icon = notificationModal.querySelector('i');
    icon.style.color = isSuccess ? '#ed4956' : '#8e8e8e';
    notificationModal.style.display = 'block';
    setTimeout(() => {
        notificationModal.style.display = 'none';
    }, 2000);
}

function updateFollowButton() {
    const btnText = isFollowing ? 'Siguiendo' : 'Seguir';
    const btnBg = isFollowing ? '#efefef' : '#0095f6';
    const btnColor = isFollowing ? '#262626' : 'white';
    
    followBtn.textContent = btnText;
    followBtn.style.backgroundColor = btnBg;
    followBtn.style.color = btnColor;
    
    followBtnMobile.textContent = btnText;
    followBtnMobile.style.backgroundColor = btnBg;
    followBtnMobile.style.color = btnColor;
}

function renderTab(tabName) {
    currentTab = tabName;
    [postsTab, reelsTab, savedTab].forEach(tab => tab.classList.remove('active'));
    
    let html = '';
    let items = [];
    
    switch(tabName) {
        case 'posts':
            postsTab.classList.add('active');
            items = posts;
            break;
        case 'reels':
            reelsTab.classList.add('active');
            items = reels;
            break;
        case 'saved':
            savedTab.classList.add('active');
            items = saved;
            break;
    }
    
    for (let item of items) {
        const badge = tabName !== 'posts' ? `<small>${tabName === 'reels' ? '🎥 REEL' : '🔖 GUARDADO'}</small>` : '';
        html += `
            <div class="grid-item" style="background: ${item.color};">
                <div class="grid-item-content">
                    <i class="fas ${item.icon}"></i>
                    <p>${item.text}</p>
                    ${badge}
                </div>
            </div>
        `;
    }
    
    postsGrid.innerHTML = html;
    
    document.querySelectorAll('.grid-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// ============================================
// EVENTOS
// ============================================

// Eventos del perfil
followBtn.addEventListener('click', () => {
    isFollowing = !isFollowing;
    followersCount = isFollowing ? followersCount + 1 : followersCount - 1;
    followersStat.querySelector('.stat-number').textContent = followersCount.toLocaleString();
    updateFollowButton();
    showNotification(isFollowing ? '¡Ahora sigues a borcelllevases! ❤️' : 'Has dejado de seguir a borcelllevases', isFollowing);
});

followBtnMobile.addEventListener('click', () => {
    followBtn.click();
});

// 🆕 Eventos del chat
messageBtn.addEventListener('click', openChat);
messageBtnMobile.addEventListener('click', openChat);
closeChat.addEventListener('click', closeChatModal);
sendMessage.addEventListener('click', sendUserMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendUserMessage();
});

notificationsIcon.addEventListener('click', () => {
    showNotification('🔔 No tienes notificaciones nuevas');
});

postsStat.addEventListener('click', () => showNotification(`📸 ${postsCount} publicaciones`));
followersStat.addEventListener('click', () => showNotification(`👥 ${followersCount.toLocaleString()} seguidores`));
followingStat.addEventListener('click', () => showNotification('👤 Siguiendo a 15 cuentas'));

postsTab.addEventListener('click', () => renderTab('posts'));
reelsTab.addEventListener('click', () => renderTab('reels'));
savedTab.addEventListener('click', () => renderTab('saved'));

// Cerrar chat con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chatModal.style.display === 'block') {
        closeChatModal();
    }
});

// ============================================
// INICIALIZACIÓN
// ============================================

function init() {
    renderTab('posts');
    updateFollowButton();
    console.log('🌟 Borcellle Vases - Perfil con chatbot cargado!');
    console.log('💡 Click en "Mensaje" para probar el chatbot');
}

document.addEventListener('DOMContentLoaded', init);