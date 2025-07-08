
// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('light-mode')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Floating Particles
function createParticles() {
    const particleContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particleContainer.appendChild(particle);
    }
}

createParticles();

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorTrail = document.querySelector('.cursor-trail');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorTrail.style.left = e.clientX + 'px';
        cursorTrail.style.top = e.clientY + 'px';
    }, 100);
});

// Interactive Elements
document.querySelectorAll('a, button, .tech-btn, .project-card, .achievement-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.backgroundColor = 'var(--accent)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.backgroundColor = 'var(--primary)';
    });
});

// Tech Stack Animations
const techButtons = document.querySelectorAll('.tech-btn');
techButtons.forEach((btn, index) => {
    btn.style.animationDelay = `${index * 0.1}s`;
    btn.classList.add('fade-in');
});

// Presentation Modal Function
function openPresentation(presentationId) {
    alert(`Opening presentation: ${presentationId}\n\nThis would typically open a PowerPoint presentation or PDF in a new tab/modal.`);
    // In a real implementation, you would open the actual presentation file
    // window.open(`/presentations/${presentationId}.pptx`, '_blank');
}

// Contact Form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        this.reset();
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }, 2000);
});

// Floating Resume Button
document.querySelector('.floating-resume').addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,Darshan Ved - Resume\n\nThis is a demo resume file.';
    link.download = 'Darshan_Ved_Resume.txt';
    link.click();
});

// Dynamic Text Animation
const textItems = document.querySelectorAll('.text-item');
textItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 4}s`;
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.animated-bg');
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
});

// Counter Animation for Stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current) + '+';
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        }
    }, 20);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target.querySelector('.stat-number');
            const target = parseInt(number.textContent);
            animateCounter(number, target);
            statsObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// Matrix rain effect (Easter egg)
let matrixActive = false;
document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyM' && e.altKey && !matrixActive) {
        createMatrixRain();
        matrixActive = true;
        setTimeout(() => {
            document.querySelectorAll('.matrix-char').forEach(el => el.remove());
            matrixActive = false;
        }, 5000);
    }
});

function createMatrixRain() {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    for (let i = 0; i < 100; i++) {
        const matrixChar = document.createElement('div');
        matrixChar.className = 'matrix-char';
        matrixChar.textContent = chars[Math.floor(Math.random() * chars.length)];
        matrixChar.style.position = 'fixed';
        matrixChar.style.left = Math.random() * window.innerWidth + 'px';
        matrixChar.style.top = '-20px';
        matrixChar.style.color = '#00ff00';
        matrixChar.style.fontSize = '20px';
        matrixChar.style.zIndex = '10000';
        matrixChar.style.pointerEvents = 'none';
        matrixChar.style.animation = `matrix-fall ${2 + Math.random() * 3}s linear forwards`;
        document.body.appendChild(matrixChar);
    }
}

console.log('🚀 Portfolio loaded! Press Alt+M for a surprise...');
