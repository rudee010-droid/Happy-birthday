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

// Add interactive birthday message
function addInteractiveMessage() {
    const messageSection = document.querySelector('.birthday-message');
    
    messageSection.addEventListener('click', function() {
        const surpriseMessage = document.createElement('div');
        surpriseMessage.className = 'surprise-message';
        surpriseMessage.innerHTML = `
            <h3>🎉 Surprise! 🎉</h3>
            <p>You're amazing just the way you are! Keep shining bright! ✨</p>
        `;
        surpriseMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ff6b6b, #ffe66d);
            color: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 1000;
            text-align: center;
            animation: popIn 0.5s ease-out;
        `;
        
        document.body.appendChild(surpriseMessage);
        
        setTimeout(() => {
            surpriseMessage.style.animation = 'popOut 0.5s ease-in';
            setTimeout(() => {
                document.body.removeChild(surpriseMessage);
            }, 500);
        }, 3000);
    });
}

// Add CSS for animations
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popIn {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
            70% {
                transform: translate(-50%, -50%) scale(1.1);
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
        
        @keyframes popOut {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Create floating balloons on click
function createFloatingBalloons() {
    document.addEventListener('click', function(e) {
        const balloon = document.createElement('div');
        balloon.className = 'click-balloon';
        balloon.textContent = '🎈';
        balloon.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            font-size: 2rem;
            pointer-events: none;
            z-index: 100;
            animation: floatUp 3s ease-out forwards;
        `;
        
        document.body.appendChild(balloon);
        
        setTimeout(() => {
            document.body.removeChild(balloon);
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

// Add birthday music (optional - commented out by default)
function addBirthdayMusic() {
    // Uncomment the following lines if you want to add birthday music
    /*
    const audio = new Audio('birthday-song.mp3'); // Add your birthday music file
    audio.loop = true;
    
    // Play music when user interacts with the page
    document.addEventListener('click', function() {
        audio.play().catch(e => console.log('Audio play failed:', e));
    }, { once: true });
    */
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateAge();
    addInteractiveMessage();
    addAnimationStyles();
    createFloatingBalloons();
    addBirthdayMusic();
    
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
