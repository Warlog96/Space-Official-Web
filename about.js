// Animated counter for stats
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);

        let current = 0;
        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                clearInterval(counter);
                stat.textContent = target;
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Intersection Observers
document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    const projectCards = document.querySelectorAll('.project-card');

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    const cardsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    if (document.querySelector('.about-stats')) {
        document.querySelectorAll('.stat-number').forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    projectCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        cardsObserver.observe(card);
    });
});


