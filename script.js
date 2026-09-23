// --- 1. EFFET MAGNÉTIQUE DU BOUTON ACCUEIL ---
const magneticBtn = document.getElementById('play-btn');

magneticBtn.addEventListener('mousemove', function (e) {
    const position = magneticBtn.getBoundingClientRect();
    // Calcule la position de la souris par rapport au centre du bouton
    const x = e.clientX - position.left - position.width / 2;
    const y = e.clientY - position.top - position.height / 2;

    // Déplace subtilement le bouton vers la souris
    magneticBtn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
});

magneticBtn.addEventListener('mouseleave', function (e) {
    // Le bouton revient à sa place quand la souris le quitte
    magneticBtn.style.transform = 'translate(0px, 0px)';
});

// --- 2. GESTION DE LA MODALE ET DE LA VIDÉO ---
const modal = document.getElementById('video-modal');
const closeBtn = document.getElementById('close-btn');
const mainVideo = document.getElementById('main-demoreel');
const bgVideo = document.querySelector('.bg-video'); // La vidéo d'arrière-plan

const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.querySelector('.progress-bar');
const progressContainer = document.querySelector('.progress-bar-container');

// Ouvrir la modale au clic sur le bouton magnétique
magneticBtn.addEventListener('click', () => {
    modal.classList.add('active'); // Affiche la modale
    if (bgVideo) bgVideo.pause(); // Met l'arrière-plan en pause
    mainVideo.play(); // Lance la demoreel
    playPauseBtn.textContent = 'Pause';
});

// Fermer la modale au clic sur "Fermer"
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active'); // Cache la modale
    mainVideo.pause(); // Met la demoreel en pause
    mainVideo.currentTime = 0; // Remet la demoreel à zéro
    if (bgVideo) bgVideo.play(); // Relance la vidéo d'arrière-plan
});

// --- 3. CONTRÔLES VIDÉO PERSONNALISÉS ---

// Bouton Play/Pause dans le lecteur
playPauseBtn.addEventListener('click', () => {
    if (mainVideo.paused) {
        mainVideo.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        mainVideo.pause();
        playPauseBtn.textContent = 'Play';
    }
});

// Mise à jour de la barre de progression pendant la lecture
mainVideo.addEventListener('timeupdate', () => {
    const progress = (mainVideo.currentTime / mainVideo.duration) * 100;
    progressBar.style.width = `${progress}%`;
});

// Cliquer sur la barre de progression pour avancer/reculer
progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    mainVideo.currentTime = clickPosition * mainVideo.duration;
});
// --- 4. ANIMATIONS AU DÉFILEMENT (REVEAL) ---
const reveals = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // L'élément entre dans l'écran : on lance l'animation
            entry.target.classList.add('active');
        } else {
            // L'élément sort de l'écran : on retire l'animation pour la prochaine fois
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

    // Si on descend et qu'on a dépassé le haut de page
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('cache');
    }
    // Si on remonte
    else {
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
        // On calcule la taille du mot et sa position par rapport au parent <ul>
        const largeur = this.offsetWidth;
        const positionGauche = this.offsetLeft;

        // On donne ces dimensions à la bulle magique
        indicator.style.width = `${largeur}px`;
        indicator.style.left = `${positionGauche}px`;
        indicator.style.opacity = '1'; // On la fait apparaître
    });
});

// Quand la souris quitte complètement le menu, on cache la bulle
navMenuContainer.addEventListener('mouseleave', () => {
    indicator.style.opacity = '0';
});