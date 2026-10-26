// --- 1. EFFET MAGNÉTIQUE POUR TOUS LES BOUTONS ---
const magneticBtns = document.querySelectorAll('.magnetic-btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', function (e) {
        const position = btn.getBoundingClientRect();
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
    });

    btn.addEventListener('mouseleave', function () {
        btn.style.transform = 'translate(0px, 0px)';
    });
});

// --- 2. GESTION DE LA MODALE VIMEO CORRIGÉE ---
const modal = document.getElementById('video-modal');
const closeBtn = document.getElementById('close-btn');
const iframe = document.querySelector('#video-modal iframe');

// Ouvrir la modale au clic sur le bouton de l'accueil
const heroPlayBtn = document.getElementById('play-btn');
if (heroPlayBtn) {
    heroPlayBtn.addEventListener('click', () => {
        if (modal) modal.classList.add('active');

        // 1. Ajouter dynamiquement autoplay=1 pour forcer la lecture au clic
        if (iframe) {
            let currentSrc = iframe.src;
            if (!currentSrc.includes('autoplay=1')) {
                iframe.src = currentSrc + (currentSrc.includes('?') ? '&' : '?') + 'autoplay=1';
            }

            // 2. Forcer le plein écran natif
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
            } else if (iframe.webkitRequestFullscreen) { /* Safari */
                iframe.webkitRequestFullscreen();
            }
        }
    });
}

// Fermer la modale et couper TOUT (son + vidéo + plein écran)
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        if (modal) modal.classList.remove('active');

        // 1. Sortir du plein écran si le navigateur y est encore
        if (document.fullscreenElement || document.webkitFullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }

        // 2. Couper net la vidéo et le son en rechargeant l'iframe sans l'autoplay
        if (iframe) {
            let cleanSrc = iframe.src.replace('&autoplay=1', '').replace('?autoplay=1', '');
            iframe.src = cleanSrc;
        }
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        if (modal) modal.classList.remove('active');
        if (player) {
            player.pause();
            player.setCurrentTime(0);
        }
    });
}
// --- 4. ANIMATIONS AU DÉFILEMENT (REVEAL) ---
const reveals = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, revealOptions);

reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
});

// --- 5. SMART SCROLL (Le Header intelligent) ---
const header = document.querySelector('header');
let lastScroll = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('cache');
    } else {
        header.classList.remove('cache');
    }
    lastScroll = currentScroll;
});

// --- 6. INDICATEUR GLISSANT (L'effet Apple) ---
const indicator = document.querySelector('.nav-indicator');
const navLinksItems = document.querySelectorAll('nav ul li a');
const navMenuContainer = document.querySelector('nav ul');

navLinksItems.forEach(link => {
    link.addEventListener('mouseenter', function () {
        const largeur = this.offsetWidth;
        const positionGauche = this.offsetLeft;
        indicator.style.width = `${largeur}px`;
        indicator.style.left = `${positionGauche}px`;
        indicator.style.opacity = '1';
    });
});

if (navMenuContainer) {
    navMenuContainer.addEventListener('mouseleave', () => {
        indicator.style.opacity = '0';
    });
}