document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navList.classList.toggle('active'); // Ensure CSS supports this class for mobile view
        });
    }

    // Dropdown functionality
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');

    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = btn.parentElement;
            dropdown.classList.toggle('active');

            // Close other dropdowns
            dropdownBtns.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    otherBtn.parentElement.classList.remove('active');
                }
            });
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown') && !e.target.closest('.dropdown-btn')) { // Improved check
            dropdownBtns.forEach(btn => btn.parentElement.classList.remove('active'));
        }
    });

    // Navbar Scroll Effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Back To Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Project Gallery functionality
    const mainImage = document.getElementById('mainImage');
    const thumbs = document.querySelectorAll('.thumb');

    if (mainImage && thumbs.length > 0) {
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const img = thumb.getAttribute('data-img');
                if (img) {
                    mainImage.src = img;
                    thumbs.forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                    
                    // Optional: Smooth scroll to main image on mobile
                    if (window.innerWidth < 768) {
                        mainImage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            });
        });
    }
    // Club Events Slideshow Functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (slides.length > 0) {
        let slideIndex = 1;
        let slideTimer;

        // Initialize
        showSlides(slideIndex);
        startSlideTimer();

        // Control buttons
        if(prevBtn) prevBtn.addEventListener('click', () => plusSlides(-1));
        if(nextBtn) nextBtn.addEventListener('click', () => plusSlides(1));

        // Dot controls
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const n = parseInt(dot.getAttribute('data-slide'));
                currentSlide(n);
            });
        });

        function plusSlides(n) {
            clearInterval(slideTimer);
            showSlides(slideIndex += n);
            startSlideTimer();
        }

        function currentSlide(n) {
            clearInterval(slideTimer);
            showSlides(slideIndex = n);
            startSlideTimer();
        }

        function showSlides(n) {
            let i;
            if (n > slides.length) {slideIndex = 1}
            if (n < 1) {slideIndex = slides.length}
            
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
                slides[i].classList.remove('active');
            }
            
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            
            slides[slideIndex-1].style.display = "block";
            // Trigger reflow to restart fade animation usually, but we rely on simple display toggle here
            setTimeout(() => slides[slideIndex-1].classList.add('active'), 10); 
            
            if(dots.length > 0) {
                dots[slideIndex-1].className += " active";
            }
        }

        function startSlideTimer() {
            slideTimer = setInterval(() => {
                plusSlides(1);
            }, 5000); // Change image every 5 seconds
        }
    }

    // Scroll Animation Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Target elements with .reveal, .reveal-up, .reveal-left, .reveal-right
    // Also automatically target common sections if they don't have explicit classes yet (optional, but safer to be explicit in HTML)
    document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right').forEach(el => {
        el.classList.add('reveal'); // Ensure base class helps with logic if needed, but CSS handles specific classes
        observer.observe(el);
    });
    // Background Dimming Effect on Scroll
    const bgOverlay = document.querySelector('.background-overlay');
    if (bgOverlay) {
        window.addEventListener('scroll', () => {
            // Adjust 800 to control how quickly it dims (800px)
            const scrollLimit = 800; 
            const maxOpacity = 0.9; // Matches the contact page dullness
            const scrollPercent = Math.min(window.scrollY / scrollLimit, 1);
            bgOverlay.style.opacity = scrollPercent * maxOpacity;
        });
    }

});
