function toggleMenu() {
    const navItems = document.getElementById('nav-items');
    if (navItems.classList.contains('active')) {
        navItems.classList.remove('active');
    } else {
        navItems.classList.add('active');
    }
}
function toggleSearch() {
    const searchLogin = document.querySelector('.search-login');
    searchLogin.classList.toggle('active');
}

function smoothScroll(target) {
    const element = document.querySelector(target);
    window.scrollTo({
        top: element.offsetTop - 70, 
        behavior: 'smooth'
    });
}

function fadeInSections() {
    const sections = document.querySelectorAll('.fade-in');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
}

function initializeEventCards() {
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('click', () => {
            card.querySelector('.event-card-inner').classList.toggle('flipped');
        });
    });
}

function initializeEventSlider() {
    const slider = document.querySelector('.event-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

document.addEventListener('DOMContentLoaded', function() {

    const menuIcon = document.querySelector('.menu-icon');
    if (menuIcon) {
        menuIcon.addEventListener('click', toggleMenu);
    }

    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', toggleSearch);
    }

    document.addEventListener('click', function(event) {
        const navbar = document.querySelector('.navbar');
        const navButtons = document.querySelector('.nav-buttons');
        const searchLogin = document.querySelector('.search-login');

        if (!navbar.contains(event.target) && !navButtons.contains(event.target)) {
            navButtons.classList.remove('active');
            searchLogin.classList.remove('active');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
        });
    });

    window.addEventListener('scroll', fadeInSections);
    fadeInSections(); 

    initializeEventCards();

    initializeEventSlider();
});

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
    });
}

const currentYear = new Date().getFullYear();
const copyrightElement = document.querySelector('#copyright-year');
if (copyrightElement) {
    copyrightElement.textContent = currentYear;
}