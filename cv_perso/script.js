// ======================================
// COMPTEUR DE VISITES (localStorage)
// ======================================
function initVisitCounter() {
    let visitCount = localStorage.getItem('visitCount');

    if (visitCount === null) {
        visitCount = 0;
    }

    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('visitCount', visitCount);

    document.getElementById('visit-count').textContent = visitCount;
}

// ======================================
// MODE SOMBRE/CLAIR
// ======================================
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Charger le thème depuis localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    // Toggle du thème
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// ======================================
// MENU MOBILE
// ======================================
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ======================================
// ANIMATIONS AU SCROLL
// ======================================
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    sections.forEach(section => {
        section.classList.add('animate');
        observer.observe(section);
    });
}

// ======================================
// COMPTEURS ANIMÉS
// ======================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-value');
    let started = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                started = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 secondes
                    const increment = target / (duration / 16); // 60 FPS
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                });
            }
        });
    });

    observer.observe(document.querySelector('.hero-stats'));
}

// ======================================
// BARRES DE PROGRESSION DES COMPÉTENCES
// ======================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ======================================
// CARROUSEL DE PROJETS
// ======================================
function initCarousel() {
    const carousel = document.querySelector('.projects-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    const projectCards = document.querySelectorAll('.project-card');

    let currentIndex = 0;
    let filteredProjects = Array.from(projectCards);

    function updateCarousel() {
        // Cacher toutes les cartes
        projectCards.forEach(card => card.classList.add('hidden'));

        // Afficher seulement la carte courante des projets filtrés
        if (filteredProjects.length > 0) {
            filteredProjects.forEach(card => card.classList.add('hidden'));
            filteredProjects[currentIndex].classList.remove('hidden');
        }

        // Mettre à jour les indicateurs
        indicators.forEach((indicator, index) => {
            if (index < filteredProjects.length) {
                indicator.style.display = 'block';
                indicator.classList.toggle('active', index === currentIndex);
            } else {
                indicator.style.display = 'none';
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % filteredProjects.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
        updateCarousel();
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Navigation par indicateurs
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (index < filteredProjects.length) {
                currentIndex = index;
                updateCarousel();
            }
        });
    });

    // Auto-play optionnel (désactivé par défaut)
    // setInterval(nextSlide, 5000);

    // Fonction pour filtrer les projets
    window.filterProjects = function(category) {
        if (category === 'all') {
            filteredProjects = Array.from(projectCards);
        } else {
            filteredProjects = Array.from(projectCards).filter(card =>
                card.getAttribute('data-category') === category
            );
        }
        currentIndex = 0;
        updateCarousel();
    };

    updateCarousel();
}

// ======================================
// FILTRAGE DES PROJETS
// ======================================
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterBtns.forEach(b => b.classList.remove('active'));

            // Ajouter la classe active au bouton cliqué
            btn.classList.add('active');

            // Filtrer les projets
            const filter = btn.getAttribute('data-filter');
            window.filterProjects(filter);
        });
    });
}

// ======================================
// VALIDATION DU FORMULAIRE EN TEMPS RÉEL
// ======================================
function initFormValidation() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    // Règles de validation
    const validators = {
        name: (value) => {
            if (value.trim().length < 2) {
                return 'Le nom doit contenir au moins 2 caractères';
            }
            if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(value)) {
                return 'Le nom ne peut contenir que des lettres';
            }
            return '';
        },
        email: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return 'Veuillez entrer une adresse email valide';
            }
            return '';
        },
        subject: (value) => {
            if (value.trim().length < 3) {
                return 'Le sujet doit contenir au moins 3 caractères';
            }
            return '';
        },
        message: (value) => {
            if (value.trim().length < 10) {
                return 'Le message doit contenir au moins 10 caractères';
            }
            return '';
        }
    };

    // Fonction de validation d'un champ
    function validateField(input, validator) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        const error = validator(input.value);

        if (error) {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            errorMessage.textContent = error;
        } else if (input.value.trim() !== '') {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
            errorMessage.textContent = '';
        } else {
            formGroup.classList.remove('error', 'success');
            errorMessage.textContent = '';
        }

        return !error;
    }

    // Validation en temps réel
    nameInput.addEventListener('input', () => validateField(nameInput, validators.name));
    emailInput.addEventListener('input', () => validateField(emailInput, validators.email));
    subjectInput.addEventListener('input', () => validateField(subjectInput, validators.subject));
    messageInput.addEventListener('input', () => validateField(messageInput, validators.message));

    // Validation à la perte de focus
    nameInput.addEventListener('blur', () => validateField(nameInput, validators.name));
    emailInput.addEventListener('blur', () => validateField(emailInput, validators.email));
    subjectInput.addEventListener('blur', () => validateField(subjectInput, validators.subject));
    messageInput.addEventListener('blur', () => validateField(messageInput, validators.message));

    // Soumission du formulaire
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Valider tous les champs
        const isNameValid = validateField(nameInput, validators.name);
        const isEmailValid = validateField(emailInput, validators.email);
        const isSubjectValid = validateField(subjectInput, validators.subject);
        const isMessageValid = validateField(messageInput, validators.message);

        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Simulation d'envoi (en production, envoyer à un serveur)
            console.log('Formulaire soumis:', {
                name: nameInput.value,
                email: emailInput.value,
                subject: subjectInput.value,
                message: messageInput.value
            });

            // Afficher le message de succès
            const successMessage = document.querySelector('.form-success-message');
            successMessage.classList.add('show');

            // Ajouter de l'XP (gamification)
            addXP(50);

            // Réinitialiser le formulaire après 3 secondes
            setTimeout(() => {
                form.reset();
                document.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('success', 'error');
                });
                successMessage.classList.remove('show');
            }, 3000);
        }
    });
}

// ======================================
// SYSTÈME DE GAMIFICATION - XP
// ======================================
function addXP(amount) {
    const xpFill = document.getElementById('xp-fill');
    const xpText = document.getElementById('xp-text');
    const levelElement = document.getElementById('user-level');

    // Récupérer l'XP actuel depuis localStorage
    let currentXP = parseInt(localStorage.getItem('userXP') || '0');
    let currentLevel = parseInt(localStorage.getItem('userLevel') || '1');
    const xpPerLevel = 10000;

    // Ajouter l'XP
    currentXP += amount;

    // Vérifier si on monte de niveau
    if (currentXP >= xpPerLevel) {
        currentXP = currentXP - xpPerLevel;
        currentLevel++;

        // Animation de montée de niveau
        showLevelUpAnimation(currentLevel);
    }

    // Mettre à jour l'affichage
    const percentage = (currentXP / xpPerLevel) * 100;
    xpFill.style.width = percentage + '%';
    xpText.textContent = `${currentXP}/${xpPerLevel} XP`;
    levelElement.textContent = currentLevel;

    // Sauvegarder dans localStorage
    localStorage.setItem('userXP', currentXP);
    localStorage.setItem('userLevel', currentLevel);
}

function showLevelUpAnimation(level) {
    // Créer une notification de montée de niveau
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: linear-gradient(135deg, #f59e0b, #fbbf24);
        color: white;
        padding: 2rem 3rem;
        border-radius: 15px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        text-align: center;
        font-size: 1.5rem;
        font-weight: bold;
        transition: transform 0.5s ease;
    `;
    notification.innerHTML = `
        <i class="fas fa-star" style="font-size: 3rem; display: block; margin-bottom: 1rem;"></i>
        Niveau ${level} atteint !
    `;

    document.body.appendChild(notification);

    // Animation d'apparition
    setTimeout(() => {
        notification.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 100);

    // Retirer après 3 secondes
    setTimeout(() => {
        notification.style.transform = 'translate(-50%, -50%) scale(0)';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ======================================
// BOUTON CTA - SCROLL VERS PROJETS
// ======================================
function initCTAButton() {
    const ctaButton = document.querySelector('.cta-button');

    ctaButton.addEventListener('click', () => {
        document.getElementById('projects').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// ======================================
// NAVIGATION SMOOTH SCROLL
// ======================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ======================================
// CHARGER L'XP DEPUIS LOCALSTORAGE
// ======================================
function loadUserProgress() {
    const xpFill = document.getElementById('xp-fill');
    const xpText = document.getElementById('xp-text');
    const levelElement = document.getElementById('user-level');

    const currentXP = parseInt(localStorage.getItem('userXP') || '0');
    const currentLevel = parseInt(localStorage.getItem('userLevel') || '1');
    const xpPerLevel = 10000;

    const percentage = (currentXP / xpPerLevel) * 100;
    xpFill.style.width = percentage + '%';
    xpText.textContent = `${currentXP}/${xpPerLevel} XP`;
    levelElement.textContent = currentLevel;
}

// ======================================
// INITIALISATION AU CHARGEMENT
// ======================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser toutes les fonctionnalités
    initVisitCounter();
    initThemeToggle();
    initMobileMenu();
    initScrollAnimations();
    initCounters();
    initSkillBars();
    initCarousel();
    initProjectFilters();
    initFormValidation();
    initCTAButton();
    initSmoothScroll();
    loadUserProgress();

    console.log('Portfolio initialisé avec succès ! 🚀');
});

// ======================================
// EASTER EGG - Badge secret
// ======================================
let secretCodeIndex = 0;
const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

document.addEventListener('keydown', (e) => {
    if (e.key === secretCode[secretCodeIndex]) {
        secretCodeIndex++;
        if (secretCodeIndex === secretCode.length) {
            unlockSecretBadge();
            secretCodeIndex = 0;
        }
    } else {
        secretCodeIndex = 0;
    }
});

function unlockSecretBadge() {
    const lockedBadge = document.querySelector('.badge.locked');
    if (lockedBadge && lockedBadge.classList.contains('locked')) {
        lockedBadge.classList.remove('locked');
        lockedBadge.title = 'Konami Master';
        lockedBadge.innerHTML = '<i class="fas fa-gamepad"></i>';

        // Notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            animation: slideIn 0.5s ease;
        `;
        notification.innerHTML = `
            <i class="fas fa-unlock"></i>
            Badge secret débloqué ! +100 XP
        `;

        document.body.appendChild(notification);

        // Ajouter de l'XP
        addXP(100);

        // Sauvegarder l'état du badge
        localStorage.setItem('secretBadgeUnlocked', 'true');

        setTimeout(() => notification.remove(), 3000);
    }
}

// Vérifier si le badge secret a déjà été débloqué
if (localStorage.getItem('secretBadgeUnlocked') === 'true') {
    const lockedBadge = document.querySelector('.badge.locked');
    if (lockedBadge) {
        lockedBadge.classList.remove('locked');
        lockedBadge.title = 'Konami Master';
        lockedBadge.innerHTML = '<i class="fas fa-gamepad"></i>';
    }
}
