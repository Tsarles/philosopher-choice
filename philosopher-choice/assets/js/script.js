// Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Hero animation
        gsap.to('.hero-content', {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "power3.out",
            delay: 0.5
        });

        // Scroll-triggered animations
        gsap.to('.section-title', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.section-title',
                start: 'top 80%'
            }
        });

        gsap.to('.handwritten-intro', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.handwritten-intro',
                start: 'top 80%'
            }
        });

        // Quote cards animation
        gsap.fromTo('.quote-card', 
            { opacity: 0, y: 50, scale: 0.9 },
            { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: '.quotes-grid',
                    start: 'top 70%'
                }
            }
        );

        // Writing animation
        const quotes = [
            "Life can only be understood backwards; but it must be lived forwards.",
            "Anxiety is the dizziness of freedom.",
            "The most common form of despair is not being who you are.",
            "To dare is to lose one's footing momentarily. Not to dare is to lose oneself.",
            "Truth is subjectivity.",
            "The crowd is untruth.",
            "The function of prayer is not to influence God, but rather to change the nature of the one who prays."
        ];

        let currentQuoteIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        const writingElement = document.getElementById('writingText');

        function typeWriter() {
            const currentQuote = quotes[currentQuoteIndex];
            
            if (isDeleting) {
                writingElement.innerHTML = currentQuote.substring(0, currentCharIndex) + '<span class="cursor-writing"></span>';
                currentCharIndex--;
                
                if (currentCharIndex < 0) {
                    isDeleting = false;
                    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
                    setTimeout(typeWriter, 800);
                    return;
                }
            } else {
                writingElement.innerHTML = currentQuote.substring(0, currentCharIndex) + '<span class="cursor-writing"></span>';
                currentCharIndex++;
                
                if (currentCharIndex > currentQuote.length) {
                    isDeleting = true;
                    setTimeout(typeWriter, 3000);
                    return;
                }
            }
            
            setTimeout(typeWriter, isDeleting ? 30 : 80);
        }

        // Start typewriter when section is visible
        ScrollTrigger.create({
            trigger: '.animated-quote',
            start: 'top 60%',
            onEnter: () => {
                setTimeout(typeWriter, 1000);
            },
            once: true
        });

        // Modal functionality
        const modalOverlays = document.querySelectorAll('.modal-overlay');
        const quoteCards = document.querySelectorAll('.quote-card');
        const closeButtons = document.querySelectorAll('.close-modal');

        quoteCards.forEach(card => {
            card.addEventListener('click', () => {
                const modalId = card.getAttribute('data-modal');
                const modal = document.getElementById(`modal-${modalId}`);
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent background scroll
                }
            });
        });

        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal-overlay');
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Restore scroll
            });
        });

        // Also close modal when clicking outside the modal content
        modalOverlays.forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
