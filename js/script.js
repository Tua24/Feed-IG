// ============================================
// PROPUESTA DE REDES - PERFIL CON 2 CARRUSELES
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

// Elementos del modal de bienvenida
const welcomeModal = document.getElementById('welcomeModal');
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

// 2. VARIABLES DE ESTADO
let isFollowing = false;
let followersCount = 1529;
let currentPostIndex = 0;
let currentPostData = null;

// 3. DATOS DE LOS 2 CARRUSELES
const carruseles = [
    {
        id: 1,
        title: '📱 Estrategia de Contenido',
        icon: 'fa-mobile-screen',
        color: '#405de6',
        images: [
            { icon: 'fa-mobile-screen', title: 'Feed Visual', desc: 'Publicaciones con identidad científica' },
            { icon: 'fa-film', title: 'Reels Educativos', desc: 'Contenido viral sobre el laboratorio' },
            { icon: 'fa-users', title: 'Community Building', desc: 'Conexión con la audiencia' }
        ],
        caption: 'Propuesta de contenido para Instagram: combinamos divulgación científica con estética profesional. Cada publicación está pensada para educar e inspirar.',
        likes: 234,
        comments: 18,
        time: 'Hace 2 horas'
    },
    {
        id: 2,
        title: '🔬 Divulgación Científica',
        icon: 'fa-flask',
        color: '#833ab4',
        images: [
            { icon: 'fa-microscope', title: 'Detrás del Laboratorio', desc: 'Muestra el día a día de la investigación' },
            { icon: 'fa-dna', title: 'Descubrimientos', desc: 'Comparte los avances del laboratorio' },
            { icon: 'fa-users', title: 'Equipo Humano', desc: 'Presenta a los científicos y sus historias' }
        ],
        caption: 'La ciencia necesita comunicarse de forma atractiva. Esta propuesta muestra cómo humanizar el laboratorio y acercarlo a la comunidad.',
        likes: 189,
        comments: 24,
        time: 'Hace 5 horas'
    }
];

// 4. FUNCIONES DEL MODAL DE BIENVENIDA

// Mostrar modal de bienvenida (solo la primera vez)
function showWelcomeModal() {
    // Verificar si ya se mostró antes (usando localStorage)
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    
    if (!hasSeenWelcome) {
        welcomeModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    }
}

// Cerrar modal de bienvenida
function closeWelcomeModal() {
    welcomeModal.style.display = 'none';
    document.body.style.overflow
}