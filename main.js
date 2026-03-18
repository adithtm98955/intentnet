// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.replace('fa-bars', 'fa-times');
                } else {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    }
    
    // Close menu on link click
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn.querySelector('i')) {
                    mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });

    // Setup basic GSAP hero animations automatically
    if (typeof gsap !== 'undefined') {
        const heroTitle = document.querySelector('.hero h1');
        const heroSub = document.querySelector('.hero .subtext');
        const heroBtns = document.querySelector('.hero-actions');
        
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        
        if (heroTitle) {
            heroTl.to(heroTitle, { y: 0, opacity: 1, duration: 1, delay: 0.2 });
        }
        if (heroSub) {
            heroTl.to(heroSub, { y: 0, opacity: 1, duration: 1 }, '-=0.6');
        }
        if (heroBtns) {
            heroTl.to(heroBtns, { y: 0, opacity: 1, duration: 1 }, '-=0.6');
        }

        // Setup ScrollTrigger for all elements with .gsap-reveal
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            gsap.utils.toArray('.gsap-reveal').forEach((elem) => {
                gsap.to(elem, {
                    scrollTrigger: {
                        trigger: elem,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            });

            gsap.utils.toArray('.gsap-reveal-left').forEach((elem) => {
                gsap.to(elem, {
                    scrollTrigger: {
                        trigger: elem,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            });

            gsap.utils.toArray('.gsap-reveal-right').forEach((elem) => {
                gsap.to(elem, {
                    scrollTrigger: {
                        trigger: elem,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            });

            // Stagger animations for grid items container
            gsap.utils.toArray('.stagger-container').forEach((container) => {
                const items = container.children;
                gsap.fromTo(items, 
                    { y: 50, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: container,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        },
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.15,
                        ease: 'power2.out'
                    }
                );
            });
        }
    }
});
