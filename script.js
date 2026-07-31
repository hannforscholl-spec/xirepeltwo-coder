document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. LOADING SCREEN
       ========================================================================== */
    const loadingScreen = document.getElementById('loading-screen');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
        }, 500);
    });

    /* ==========================================================================
       2. NAVBAR STICKY & HAMBURGER MENU
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // Sticky Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Toggle Mobile Menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close Menu on Link Click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /* ==========================================================================
       3. HERO TYPING EFFECT
       ========================================================================== */
    const typingTextElement = document.getElementById('typing-text');
    const words = ["XI RPL 2", "Software Engineer", "Future Developers", "Creative Creators"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();

    /* ==========================================================================
       4. SCROLL ANIMATION (INTERSECTION OBSERVER)
       ========================================================================== */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger Counter if section contains statistics
                if (entry.target.classList.contains('stats')) {
                    startCounters();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-card, .stats');
    elementsToReveal.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       9. COUNT UP ANIMATION (STATISTIK)
       ========================================================================== */
    let counterStarted = false;

    function startCounters() {
        if (counterStarted) return;
        counterStarted = true;

        const counters = document.querySelectorAll('.counter');
        const speed = 200;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

        // Function Navigasi Slider Anggota
const slider = document.getElementById('studentsSlider');
const slideLeftBtn = document.getElementById('slideLeft');
const slideRightBtn = document.getElementById('slideRight');

if (slider && slideLeftBtn && slideRightBtn) {
    slideLeftBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: -320, // Jarak geser ke kiri (px)
            behavior: 'smooth'
        });
    });

    slideRightBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: 320, // Jarak geser ke kanan (px)
            behavior: 'smooth'
        });
    });
}

    /* ==========================================================================
       RIPPLE EFFECT ON BUTTONS
       ========================================================================== */
    const rippleButtons = document.querySelectorAll('.btn-ripple');

    rippleButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    /* ==========================================================================
       BACK TO TOP BUTTON & ACTIVE NAVBAR LINK ON SCROLL
       ========================================================================== */
    const backToTopBtn = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Back to top visibility
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        // Active Link Highlights on Scroll
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${currentSection}`) {
                a.classList.add('active');
            }
        });
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       PARALLAX EFFECT LIGHT
       ========================================================================== */
    window.addEventListener('scroll', () => {
        const parallaxTarget = document.querySelector('.hero-image');
        if (parallaxTarget) {
            let scrolled = window.pageYOffset;
            parallaxTarget.style.transform = `translateY(${scrolled * 0.08}px)`;
        }
    });

    /* ==========================================================================
       FORM SUBMISSION PREVENT DEFAULT
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Pesan Anda berhasil dikirim! Terima kasih telah menghubungi XI RPL 2.');
            contactForm.reset();
        });
    }

});