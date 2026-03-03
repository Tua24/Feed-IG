// ============================================
// LABORATORIO MEDICAL - PROPUESTA DE REDES
// VERSIÓN SIN CHATBOT (ACTUALIZADA CON CARRUSEL MEJORADO)
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

// ===== 3. DATOS DE LOS CARRUSELES (ACTUALIZADO CON TUS IMÁGENES) =====
const carruseles = [
    {
        id: 1,
        title: '🔬 Educación en Salud',
        icon: 'fa-flask',
        color: '#0b3b5c',
        images: [
            { src: 'img/CARR-01.png' },  // ¿Tu sangre está tratando de decirte algo?
            { src: 'img/CARR-02.png' },  // ¿Vives con cansancio?
            { src: 'img/CARR-03.png' },  // Tu sistema de seguridad interna
            { src: 'img/CARR-04.png' },
        ],
        caption: 'Contenido educativo para que entiendas mejor tus análisis clínicos. Tu salud es lo más importante.',
        likes: 234,
        comments: 18,
        time: 'Hace 2 horas',
        comments_list: [
            { user: 'paciente_123', text: 'Muy buena información 👏' },
            { user: 'dra_rodriguez', text: 'Excelente forma de educar a los pacientes' },
            { user: 'maria_98', text: 'No sabía lo de los glóbulos blancos' }
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
        caption: 'Visítanos en nuestra sede principal. Estamos ubicados en Acarigua, Araure. ¡Te esperamos con la calidez que nos define!',
        likes: 189,
        comments: 24,
        time: 'Hace 5 horas',
        comments_list: [
            { user: 'paciente_456', text: 'Excelente atención, muy recomendados' },
            { user: 'carlos_m', text: 'Queda cerca de Farmatodo, fácil de encontrar' }
        ]
    }
];

// ===== 4. FUNCIONES DEL MODAL DE BIENVENIDA =====
function showWelcomeModal() {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    
    if (!hasSeenWelcome) {
        welcomeModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeWelcomeModalFn() {
    welcomeModal.style.display = 'none';
    document.body.style.overflow = '';
    localStorage.setItem('hasSeenWelcome', 'true');
}

// ===== 5. FUNCIONES DEL CARRUSEL (VERSIÓN MEJORADA) =====
function openPostModal(postId) {
    currentPostData = carruseles.find(p => p.id === postId);
    if (!currentPostData) return;
    
    currentPostIndex = 0;
    
    // Generar slides del carrusel con detección de tipo
    let slidesHTML = '';
    currentPostData.images.forEach((img, index) => {
        // Determinar el tipo de imagen por el nombre
        let imageType = 'standard';
        if (img.src.includes('CARR-')) {
            imageType = 'text-heavy';  // Imágenes educativas con texto
        } else if (img.src.includes('POST-')) {
            imageType = 'square';      // Imágenes cuadradas
        }
        
        slidesHTML += `
            <div class="carousel-slide" data-type="${imageType}" data-index="${index}">
                <img 
                    src="${img.src}" 
                    alt="Imagen ${index + 1}" 
                    class="carousel-image"
                    loading="lazy"
                    onerror="this.onerror=null; this.src='https://via.placeholder.com/600x600?text=Imagen+no+disponible';"
                >
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
    
    // Actualizar información del post
    postModalLikes.innerHTML = `<strong>${currentPostData.likes} likes</strong>`;
    postModalCaption.innerHTML = `<p><strong>laboratorio_medical</strong> ${currentPostData.caption}</p>`;
    
    // Generar comentarios
    let commentsHTML = '';
    currentPostData.comments_list.forEach(comment => {
        commentsHTML += `<p><strong>${comment.user}</strong> ${comment.text}</p>`;
    });
    commentsHTML += `<p class="view-comments">Ver los ${currentPostData.comments} comentarios</p>`;
    postModalComments.innerHTML = commentsHTML;
    
    postModalTime.innerHTML = `<p>${currentPostData.time} · Ver traducción</p>`;
    
    // Mostrar modal
    postModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Ajustar tamaño después de cargar las imágenes
    setTimeout(adjustImageSizes, 100);
    
    updateCarouselButtons();
    
    // Eventos indicadores
    document.querySelectorAll('.indicator').forEach(indicator => {
        indicator.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            goToSlide(index);
        });
    });
}

// Función para ajustar tamaños según la imagen (NUEVA)
function adjustImageSizes() {
    const slides = document.querySelectorAll('.carousel-slide');
    slides.forEach(slide => {
        const img = slide.querySelector('img');
        if (img && img.complete) {
            // Detectar orientación de la imagen
            if (img.naturalWidth > img.naturalHeight) {
                slide.dataset.orientation = 'landscape';
            } else if (img.naturalHeight > img.naturalWidth) {
                slide.dataset.orientation = 'portrait';
            } else {
                slide.dataset.orientation = 'square';
            }
            
            // Log para debugging
            console.log(`📸 Imagen: ${img.naturalWidth}x${img.naturalHeight} - ${slide.dataset.orientation}`);
        }
    });
}

function goToSlide(index) {
    if (!currentPostData) return;
    if (index < 0 || index >= currentPostData.images.length) return;
    
    currentPostIndex = index;
    const offset = -index * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
    
    // Actualizar indicadores
    document.querySelectorAll('.indicator').forEach((ind, i) => {
        if (i === index) {
            ind.classList.add('active');
        } else {
            ind.classList.remove('active');
        }
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
    
    if (carouselPrev) {
        carouselPrev.classList.toggle('hidden', currentPostIndex === 0);
    }
    if (carouselNext) {
        carouselNext.classList.toggle('hidden', currentPostIndex === currentPostData.images.length - 1);
    }
}

function closePostModalFn() {
    postModal.style.display = 'none';
    document.body.style.overflow = '';
}

// ===== 6. FUNCIONES DEL PERFIL =====
function renderPosts() {
    let html = '';
    
    carruseles.forEach(post => {
        html += `
            <div class="grid-item" data-id="${post.id}" style="background: linear-gradient(135deg, ${post.color}, ${adjustColor(post.color)});">
                <div class="grid-item-content">
                    <i class="fas ${post.icon}"></i>
                    <p>${post.title}</p>
                </div>
                <div class="multi-icon">
                    <i class="fas fa-images"></i> ${post.images.length}
                </div>
            </div>
        `;
    });
    
    postsGrid.innerHTML = html;
    
    // Agregar eventos a cada post
    document.querySelectorAll('.grid-item').forEach(item => {
        item.addEventListener('click', () => {
            const postId = parseInt(item.dataset.id);
            openPostModal(postId);
        });
    });
}

function adjustColor(hex) {
    return hex;
}

function updateFollowButton() {
    const btnText = isFollowing ? 'Siguiendo' : 'Seguir';
    const btnBg = isFollowing ? '#363636' : '#0095f6';
    
    followBtn.textContent = btnText;
    followBtn.style.backgroundColor = btnBg;
    followBtn.style.color = 'white';
    
    followBtnMobile.textContent = btnText;
    followBtnMobile.style.backgroundColor = btnBg;
    followBtnMobile.style.color = 'white';
}

function showNotification(message, isSuccess = true) {
    notificationMessage.textContent = message;
    const icon = notificationModal.querySelector('i');
    icon.style.color = isSuccess ? '#ed4956' : '#8e8e8e';
    notificationModal.style.display = 'block';
    
    setTimeout(() => {
        notificationModal.style.display = 'none';
    }, 2000);
}

// ===== 7. EVENTOS =====
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    updateFollowButton();
    showWelcomeModal();
    
    console.log('🚀 Página cargada correctamente');
    console.log('📸 Total de carruseles:', carruseles.length);
    carruseles.forEach((post, i) => {
        console.log(`Carrusel ${i+1}: ${post.images.length} imágenes`);
    });
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
    showNotification(isFollowing ? '¡Ahora sigues al laboratorio! ❤️' : 'Has dejado de seguir al laboratorio', isFollowing);
});

followBtnMobile.addEventListener('click', () => {
    followBtn.click();
});

messageBtn.addEventListener('click', () => {
    showNotification('📱 Mensaje enviado (modo demostración)');
});

messageBtnMobile.addEventListener('click', () => {
    showNotification('📱 Mensaje enviado (modo demostración)');
});

notificationsIcon.addEventListener('click', () => {
    showNotification('🔔 No tienes notificaciones nuevas');
});

postsStat.addEventListener('click', () => showNotification('📸 2 publicaciones (carruseles)'));
followersStat.addEventListener('click', () => showNotification(`👥 ${followersCount.toLocaleString()} seguidores`));
followingStat.addEventListener('click', () => showNotification('👤 Siguiendo a 15 cuentas'));

postsTab.addEventListener('click', () => {
    showNotification('📱 Mostrando propuesta principal');
});
reelsTab.addEventListener('click', () => {
    showNotification('🎥 Próximamente: ejemplos en video');
});
savedTab.addEventListener('click', () => {
    showNotification('🔖 Guarda esta propuesta para revisarla después');
});

if (closePostModal) closePostModal.addEventListener('click', closePostModalFn);
if (carouselPrev) carouselPrev.addEventListener('click', prevSlide);
if (carouselNext) carouselNext.addEventListener('click', nextSlide);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (postModal.style.display === 'block') closePostModalFn();
        if (welcomeModal.style.display === 'block') closeWelcomeModalFn();
    }
});