// Previous JavaScript remains the same, add these Laddu-specific functions

// Laddu special effects
function addLadduSpecialEffects() {
    // Add Laddu candy cursor effect
    document.addEventListener('mousemove', function(e) {
        if (Math.random() < 0.02) { // 2% chance to create candy
            createFloatingCandy(e.clientX, e.clientY);
        }
    });

    // Add Laddu love notes that appear randomly
    setInterval(createLoveNote, 10000); // Every 10 seconds
}

function createFloatingCandy(x, y) {
    const candies = ['🍬', '🍭', '🍫', '💝', '💖'];
    const candy = candies[Math.floor(Math.random() * candies.length)];
    
    const candyElement = document.createElement('div');
    candyElement.textContent = candy;
    candyElement.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 100;
        animation: candyFloat 2s ease-out forwards;
    `;
    
    document.body.appendChild(candyElement);
    
    setTimeout(() => {
        document.body.removeChild(candyElement);
    }, 2000);
}

function createLoveNote() {
    const loveMessages = [
        "Laddu loves Aastha!",
        "You're my everything!",
        "My beautiful Aastha 💝",
        "Love you forever!",
        "You make me so happy!",
        "My sweet Aastha 🍬"
    ];
    
    const message = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    
    const note = document.createElement('div');
    note.textContent = message;
    note.style.cssText = `
        position: fixed;
        right: 20px;
        top: ${100 + Math.random() * 200}px;
        background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        font-weight: bold;
        box-shadow: 0 5px 15px rgba(255,107,107,0.4);
        z-index: 1000;
        animation: loveNoteSlide 4s ease-in-out forwards;
    `;
    
    document.body.appendChild(note);
    
    setTimeout(() => {
        note.style.animation = 'loveNoteFadeOut 0.5s ease-out forwards';
        setTimeout(() => {
            document.body.removeChild(note);
        }, 500);
    }, 3500);
}

// Add Laddu CSS animations
function addLadduAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes candyFloat {
            0% {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) scale(0.5);
                opacity: 0;
            }
        }
        
        @keyframes loveNoteSlide {
            0% {
                transform: translateX(100%);
                opacity: 0;
            }
            20% {
                transform: translateX(0);
                opacity: 1;
            }
            80% {
                transform: translateX(0);
                opacity: 1;
            }
            100% {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes loveNoteFadeOut {
            0% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Laddu's special birthday surprise
function addLadduSurprise() {
    const surpriseButton = document.createElement('button');
    surpriseButton.textContent = '💝 Laddu\'s Special Surprise 💝';
    surpriseButton.className = 'laddu-surprise-btn';
    surpriseButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
        color: white;
        border: none;
        padding: 15px 25px;
        border-radius: 25px;
        font-weight: bold;
        font-size: 1.1rem;
        cursor: pointer;
        box-shadow: 0 5px 20px rgba(255,107,107,0.4);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    surpriseButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 8px 25px rgba(255,107,107,0.6)';
    });
    
    surpriseButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 5px 20px rgba(255,107,107,0.4)';
    });
    
    surpriseButton.addEventListener('click', showLadduSurprise);
    
    document.body.appendChild(surpriseButton);
}

function showLadduSurprise() {
    const surpriseModal = document.createElement('div');
    surpriseModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        animation: surpriseFadeIn 0.5s ease;
    `;
    
    surpriseModal.innerHTML = `
        <div class="surprise-content" style="
            background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
            padding: 40px;
            border-radius: 30px;
            text-align: center;
            color: white;
            max-width: 500px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            animation: surprisePopIn 0.5s ease;
        ">
            <h2 style="font-size: 2.5rem; margin-bottom: 20px;">💖 For My Aastha 💖</h2>
            <p style="font-size: 1.3rem; line-height: 1.6; margin-bottom: 25px;">
                You're the most amazing person I've ever known. 
                Every moment with you is precious, and I feel so lucky to have you in my life. 
                Happy Birthday to the love of my life! 🎂💝
            </p>
            <p style="font-size: 1.5rem; font-weight: bold; margin-bottom: 30px;">
                Forever yours,<br>Your Laddu 🍬
            </p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: white;
                color: #ff6b6b;
                border: none;
                padding: 12px 30px;
                border-radius: 25px;
                font-weight: bold;
                font-size: 1.1rem;
                cursor: pointer;
                transition: all 0.3s ease;
            ">Close</button>
        </div>
    `;
    
    document.body.appendChild(surpriseModal);
    
    // Add surprise animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes surpriseFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes surprisePopIn {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateAge();
    addInteractiveMessage();
    addAnimationStyles();
    createFloatingBalloons();
    addBirthdayMusic();
    initializeGallery();
    addGalleryAnimations();
    addLadduSpecialEffects();
    addLadduAnimations();
    addLadduSurprise();
    
    // Add a birthday countdown if it's not her birthday
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
            <p>Only <span>${diffDays}</span> days until Aastha's next birthday! 🎂</p>
            <div class="laddu-countdown-note">"Can't wait to celebrate with you! - Laddu"</div>
        `;
        countdownElement.style.cssText = `
            text-align: center;
            margin: 20px 0;
            padding: 15px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        `;
        
        document.querySelector('.container').appendChild(countdownElement);
    }
});
