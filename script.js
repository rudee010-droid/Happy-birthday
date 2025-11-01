// Calculate Aastha's current age
function calculateAge() {
    const birthDate = new Date(2005, 10, 1); // November 1, 2005 (month is 0-indexed)
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // If birthday hasn't occurred this year yet, subtract 1
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

// Update age in the DOM
function updateAge() {
    const ageElement = document.getElementById('age');
    const age = calculateAge();
    ageElement.textContent = age;
}

// Gallery functionality
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.modal-nav.prev');
    const nextBtn = document.querySelector('.modal-nav.next');
    
    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.querySelector('img').src,
        caption: item.querySelector('.photo-overlay span').textContent
    }));

    // Open modal on gallery item click
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            openModal();
        });
    });

    function openModal() {
        modal.style.display = 'block';
        updateModalContent();
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    function updateModalContent() {
        modalImg.src = images[currentIndex].src;
        modalCaption.textContent = images[currentIndex].caption;
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        updateModalContent();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateModalContent();
    }

    // Event listeners
    closeModal.addEventListener('click', closeModalFunc);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'Escape') closeModalFunc();
        }
    });

    // Add swipe support for touch devices
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    modal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showNext(); // Swipe left
            } else {
                showPrev(); // Swipe right
            }
        }
    }
}

// Add interactive effects
function addInteractiveEffects() {
    // Add random animation delays to characteristic cards
    const cards = document.querySelectorAll('.characteristic-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add floating effect to favorite cards with different timings
    const favoriteCards = document.querySelectorAll('.favorite-card');
    favoriteCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Interactive photo effect
    const photoFrame = document.querySelector('.photo-frame');
    photoFrame.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(5deg)';
    });
    
    photoFrame.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });

    // Add click effects to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Create floating balloons on click
function createFloatingBalloons() {
    document.addEventListener('click', function(e) {
        const balloons = ['🎈', '🎈', '🎈', '🎈', '🎈'];
        const balloon = balloons[Math.floor(Math.random() * balloons.length)];
        
        const balloonElement = document.createElement('div');
        balloonElement.textContent = balloon;
        balloonElement.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            font-size: 2rem;
            pointer-events: none;
            z-index: 100;
            animation: floatUp 3s ease-out forwards;
        `;
        
        document.body.appendChild(balloonElement);
        
        setTimeout(() => {
            document.body.removeChild(balloonElement);
        }, 3000);
    });
    
    // Add animation for click balloons
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) scale(0.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add birthday countdown
function addBirthdayCountdown() {
    const today = new Date();
    const isBirthday = today.getMonth() === 10 && today.getDate() === 1; // November 1
    
    if (!isBirthday) {
        const nextBirthday = new Date(today.getFullYear(), 10, 1);
        if (today > nextBirthday) {
            nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
        }
        
        const diffTime = nextBirthday - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        const countdownElement = document.createElement('div');
        countdownElement.className = 'countdown';
        countdownElement.innerHTML = `
            <p>Only <span style="color: var(--accent); font-weight: bold; font-size: 1.5rem;">${diffDays}</span> days until Aastha's next birthday! 🎂</p>
        `;
        countdownElement.style.cssText = `
            text-align: center;
            margin: 30px 0;
            padding: 20px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 20px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            font-size: 1.2rem;
        `;
        
        const ageCounter = document.querySelector('.age-counter');
        ageCounter.parentNode.insertBefore(countdownElement, ageCounter);
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateAge();
    initializeGallery();
    addInteractiveEffects();
    createFloatingBalloons();
    addBirthdayCountdown();
});
