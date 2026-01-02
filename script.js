document.addEventListener('DOMContentLoaded', () => {
    const contactButton = document.querySelector('#section1 button');
    const headerButton = document.querySelector('.header-button');
    const modal = document.getElementById('contactModal');
    const card = document.getElementById('contactCard');
    const closeButton = document.getElementById('closeButton');

    const yearSpan = document.getElementById("year");
    yearSpan.textContent = new Date().getFullYear();

    // Slideshow functionality
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-advance slides every 3 seconds
    setInterval(nextSlide, 3000);
    
    let isDragging = false;
    let startX, startY, initialX, initialY;
    let currentX = 0, currentY = 0, currentRotationX = 0, currentRotationY = 0;

    // Open modal
    if (contactButton) {
        contactButton.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    }

    headerButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Close modal on arrow click
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        resetCard();
    });

    // Mouse events for rotation
    card.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = currentX;
        initialY = currentY;
        card.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        currentX = initialX + deltaX;
        currentY = initialY + deltaY;
        currentRotationY = currentX * 0.1;
        currentRotationX = -currentY * 0.1;
        card.style.transform = `rotateY(${currentRotationY}deg) rotateX(${currentRotationX}deg)`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        card.style.cursor = 'grab';
    });

    // Touch events for rotation
    card.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isDragging = true;
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        initialX = currentX;
        initialY = currentY;
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        currentX = initialX + deltaX;
        currentY = initialY + deltaY;
        currentRotationY = currentX * 0.1;
        currentRotationX = -currentY * 0.1;
        card.style.transform = `rotateY(${currentRotationY}deg) rotateX(${currentRotationX}deg)`;
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    function resetCard() {
        currentX = 0;
        currentY = 0;
        currentRotationX = 0;
        currentRotationY = 0;
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    }

    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});
