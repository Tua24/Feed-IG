// ============================================
// LABORATORIO MEDICAL - PROPUESTA DE REDES
// ============================================

// ===== 1. SELECCIONAR ELEMENTOS DEL DOM =====
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

// Elementos del modal de bienvenida
const welcomeModal = document.getElementById('welcomeModal');
const closeWelcomeModal = document.getElementById('closeWelcomeModal');
const startExploring = document.getElementById('startExploring');
const remindLater = document.getElementById('remindLater');
const welcomeHighlight = document.getElementById('welcomeHighlight');

// Elementos del carrusel
const postModal = document.getElementById('postModal');
const closePostModal = document.getElementById('closePostModal');
const carouselTrack = document.getElementById('carouselTrack');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const carouselIndicators = document.getElementById('carouselIndicators');
const postModalLikes = document.getElementById('postModalLikes');
const postModalCaption = document.getElementById('postModalCaption');
const postModalComments = document.getElementById('postModalComments');
const postModalTime = document.getElementById('postModalTime');

// ===== 2. VARIABLES DE ESTADO =====
let isFollowing = false;
let followersCount = 1529;
let currentPostIndex = 0;
let currentPostData = null;

// ===== 3. DATOS DE LOS CARRUSELES (CON TUS IMÁGENES) =====
const carruseles = [
    {
        id: 1,
        title: '🔬 Educación en Salud',
        icon: 'fa-flask',
        color: '#0b3b5c',
        images: [
            { src: 'img/CARR-01.png' },
            { src: 'img/CARR-02.png' },
            { src: 'img/CARR-03.png' },
            { src: 'img/CARR-04.png' }
        ],
        caption: 'Contenido educativo para que entiendas mejor tus análisis clínicos. Tu salud es lo más importante.',
        likes: 234,
        comments: 18,
        time: 'Hace 2 horas',
        comments_list: [
            { user: 'paciente_123', text: 'Muy buena información 👏' },
            { user: 'dra_rodriguez', text: 'Excelente forma de educar' }
        ]
    },
    {
        id: 2,
        title: '📍 Información de Contacto',
        icon: 'fa-map-marker-alt',
        color: '#1a4b6d',
        images: [
            { src: 'img/POST-01.png' },
            { src: 'img/POST-02.png' },
            { src: 'img/POST-03.png' }
        ],
        caption: 'Visítanos en nuestra sede principal. Estamos ubicados en Acarigua, Araure.',
        likes: 189,
        comments: 24,
        time: 'Hace 5 horas',
        comments_list: [
            { user: 'paciente_456', text: 'Excelente atención' },
            { user: 'carlos_m', text: 'Queda cerca de Farmatodo' }
        ]
    }
];

// ===== 4. FUNCIONES DEL MODAL DE BIENVENIDA =====
function showWelcomeModal() {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    
    if (!hasSeenWelcome) {
        welcomeModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    }
}

function closeWelcomeModalFn() {
    welcomeModal.style.display = 'none';
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    localStorage.setItem('hasSeenWelcome', 'true');
}

// ===== 5. FUNCIONES DEL CARRUSEL =====
function openPostModal(postId) {
    currentPostData = carruseles.find(p => p.id === postId);
    if (!currentPostData) return;
    
    currentPostIndex = 0;
    
    // Determinar tipo de imagen
    let slidesHTML = '';
    currentPostData.images.forEach((img, index) => {
        let imageType = 'standard';
        if (img.src.includes('CARR-')) {
            imageType = 'text-heavy';
        } else if (img.src.includes('POST-')) {
            imageType = 'square';
        }
        
        slidesHTML += `
            <div class="carousel-slide" data-type="${imageType}" data-index="${index}">
                <img src="${img.src}" alt="Imagen ${index + 1}" class="carousel-image">
            </div>
        `;
    });
    carouselTrack.innerHTML = slidesHTML;
    
    // Generar indicadores
    let indicatorsHTML = '';
    currentPostData.images.forEach((_, index) => {
        indicatorsHTML += `<div class="indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></div>`;
    });
    carouselIndicators.innerHTML = indicatorsHTML;
    
    // Actualizar info
    postModalLikes.innerHTML = `<strong>${currentPostData.likes} likes</strong>`;
    postModalCaption.innerHTML = `<p><strong>lab_medical</strong> ${currentPostData.caption}</p>`;
    
    let commentsHTML = '';
    currentPostData.comments_list.forEach(comment => {
        commentsHTML += `<p><strong>${comment.user}</strong> ${comment.text}</p>`;
    });
    postModalComments.innerHTML = commentsHTML;
    postModalTime.innerHTML = `<p>${currentPostData.time} · Ver traducción</p>`;
    
    postModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    updateCarouselButtons();
    
    // Eventos indicadores
    document.querySelectorAll('.indicator').forEach(ind => {
        ind.addEventListener('click', function() {
            goToSlide(parseInt(this.dataset.index));
        });
    });
}

function goToSlide(index) {
    if (!currentPostData || index < 0 || index >= currentPostData.images.length) return;
    
    currentPostIndex = index;
    carouselTrack.style.transform = `translateX(-${index * 100}%)`;
    
    document.querySelectorAll('.indicator').forEach((ind, i) => {
        ind.classList.toggle('active', i === index);
    });
    
    updateCarouselButtons();
}

function nextSlide() {
    goToSlide(currentPostIndex + 1);
}

function prevSlide() {
    goToSlide(currentPostIndex - 1);
}

function updateCarouselButtons() {
    if (!currentPostData) return;
    carouselPrev.classList.toggle('hidden', currentPostIndex === 0);
    carouselNext.classList.toggle('hidden', currentPostIndex === currentPostData.images.length - 1);
}

function closePostModalFn() {
    postModal.style.display = 'none';
    document.body.style.overflow = '';
}

// ===== 6. FUNCIONES DEL PERFIL =====
function renderPosts() {
    let html = '';
    carruseles.forEach(post => {
        // Usar la primera imagen como portada
        const portada = post.images[0]?.src || '';
        
        html += `
            <div class="grid-item" data-id="${post.id}" style="background-image: url('${portada}'); background-size: cover; background-position: center;">
                <div class="grid-item-content" style="background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; padding: 15px;">
                    <i class="fas ${post.icon}" style="font-size: 2rem; margin-bottom: 5px;"></i>
                    <p style="font-size: 0.9rem; font-weight: 600;">${post.title}</p>
                </div>
                <div class="multi-icon">
                    <i class="fas fa-images"></i> ${post.images.length}
                </div>
            </div>
        `;
    });
    
    postsGrid.innerHTML = html;
    
    document.querySelectorAll('.grid-item').forEach(item => {
        item.addEventListener('click', () => {
            const postId = parseInt(item.dataset.id);
            openPostModal(postId);
        });
    });
}

function updateFollowButton() {
    const btnText = isFollowing ? 'Siguiendo' : 'Seguir';
    const btnBg = isFollowing ? '#363636' : '#0095f6';
    
    followBtn.textContent = btnText;
    followBtn.style.backgroundColor = btnBg;
    followBtnMobile.textContent = btnText;
    followBtnMobile.style.backgroundColor = btnBg;
}

function showNotification(message, isSuccess = true) {
    notificationMessage.textContent = message;
    const icon = notificationModal.querySelector('i');
    icon.style.color = isSuccess ? '#ed4956' : '#8e8e8e';
    notificationModal.style.display = 'block';
    setTimeout(() => notificationModal.style.display = 'none', 2000);
}

// ===== 7. EVENTOS =====
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    updateFollowButton();
    showWelcomeModal();
    console.log('🚀 Página cargada correctamente');
});

closeWelcomeModal.addEventListener('click', closeWelcomeModalFn);
startExploring.addEventListener('click', closeWelcomeModalFn);
remindLater.addEventListener('click', closeWelcomeModalFn);

welcomeHighlight.addEventListener('click', () => {
    closeWelcomeModalFn();
    showWelcomeModal();
});

followBtn.addEventListener('click', () => {
    isFollowing = !isFollowing;
    followersCount = isFollowing ? followersCount + 1 : followersCount - 1;
    followersStat.querySelector('.stat-number').textContent = followersCount.toLocaleString();
    updateFollowButton();
    showNotification(isFollowing ? '¡Ahora sigues al laboratorio! ❤️' : 'Has dejado de seguir al laboratorio');
});

followBtnMobile.addEventListener('click', () => followBtn.click());

messageBtn.addEventListener('click', () => showNotification('📱 Mensaje enviado (modo demostración)'));
messageBtnMobile.addEventListener('click', () => showNotification('📱 Mensaje enviado (modo demostración)'));
notificationsIcon.addEventListener('click', () => showNotification('🔔 No tienes notificaciones nuevas'));

postsStat.addEventListener('click', () => showNotification('📸 2 publicaciones'));
followersStat.addEventListener('click', () => showNotification(`👥 ${followersCount.toLocaleString()} seguidores`));
followingStat.addEventListener('click', () => showNotification('👤 Siguiendo a 15 cuentas'));

postsTab.addEventListener('click', () => showNotification('📱 Mostrando propuesta'));
reelsTab.addEventListener('click', () => showNotification('🎥 Próximamente'));
savedTab.addEventListener('click', () => showNotification('🔖 Guarda esta propuesta'));

closePostModal.addEventListener('click', closePostModalFn);
carouselPrev.addEventListener('click', prevSlide);
carouselNext.addEventListener('click', nextSlide);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (postModal.style.display === 'block') closePostModalFn();
        if (welcomeModal.style.display === 'block') closeWelcomeModalFn();
    }
});