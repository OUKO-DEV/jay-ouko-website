```javascript
/* =========================================================
   JAY CLASSIC — PROFESSIONAL WEBSITE APP.JS
   Modern interactions, animations, chatbot & forms
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENT SELECTOR HELPER
    ===================================================== */
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */
    const menuToggle = $("#menuToggle");
    const navbar = $("#navbar");

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen = navbar.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", isOpen);

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-xmark", isOpen);
            }
        });

        // Close menu after clicking a navigation link
        $$(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (event) => {
            if (
                navbar.classList.contains("active") &&
                !navbar.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                navbar.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });
    }


    /* =====================================================
       DARK / LIGHT MODE
    ===================================================== */
    const themeToggle = $("#themeToggle");
    const body = document.body;

    const savedTheme = localStorage.getItem("jayClassicTheme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
    }

    function updateThemeIcon() {
        if (!themeToggle) return;

        const icon = themeToggle.querySelector("i");

        if (!icon) return;

        if (body.classList.contains("dark-mode")) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
            themeToggle.setAttribute("aria-label", "Switch to light mode");
            themeToggle.setAttribute("title", "Light mode");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
            themeToggle.setAttribute("aria-label", "Switch to dark mode");
            themeToggle.setAttribute("title", "Dark mode");
        }
    }

    updateThemeIcon();

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {

            body.classList.toggle("dark-mode");

            const isDark = body.classList.contains("dark-mode");

            localStorage.setItem(
                "jayClassicTheme",
                isDark ? "dark" : "light"
            );

            updateThemeIcon();

            // Small visual feedback
            themeToggle.animate(
                [
                    { transform: "scale(1)" },
                    { transform: "scale(1.2)" },
                    { transform: "scale(1)" }
                ],
                {
                    duration: 350,
                    easing: "ease-out"
                }
            );
        });
    }


    /* =====================================================
       SMOOTH SCROLLING
    ===================================================== */
    $$('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = $(targetId);

            if (!target) return;

            event.preventDefault();

            const header = $(".header");

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */
    const header = $(".header");

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeaderScroll, {
        passive: true
    });

    handleHeaderScroll();


    /* =====================================================
       BACK TO TOP
    ===================================================== */
    const backToTop = $("#backToTop");

    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    }

    window.addEventListener("scroll", updateBackToTop, {
        passive: true
    });

    updateBackToTop();

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            backToTop.animate(
                [
                    { transform: "translateY(0)" },
                    { transform: "translateY(-8px)" },
                    { transform: "translateY(0)" }
                ],
                {
                    duration: 400
                }
            );
        });
    }


    /* =====================================================
       SCROLL REVEAL ANIMATIONS
    ===================================================== */
    const revealElements = $$(`
        .section-heading,
        .about-content,
        .about-stats,
        .service-card,
        .program-card,
        .class-card,
        .registration-info,
        .registration-form,
        .review-card,
        .review-form-wrapper,
        .contact-info,
        .contact-form,
        .portfolio-card,
        .stat-card,
        .info-box
    `);

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);
            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       STAGGER CARD ANIMATIONS
    ===================================================== */
    const cardGroups = [
        ".services-grid .service-card",
        ".programs-grid .program-card",
        ".reviews-grid .review-card",
        ".about-stats .stat-card"
    ];

    cardGroups.forEach(group => {

        $$(group).forEach((card, index) => {

            card.style.transitionDelay =
                `${Math.min(index * 0.08, 0.5)}s`;

        });
    });


    /* =====================================================
       ANIMATED STAT COUNTERS
    ===================================================== */
    const counters = $$(".counter");

    function animateCounter(element) {

        const target =
            parseInt(
                element.getAttribute("data-target") ||
                element.textContent.replace(/\D/g, "")
            );

        if (!target || isNaN(target)) return;

        const duration = 1800;
        const startTime = performance.now();

        function updateCounter(currentTime) {

            const elapsed = currentTime - startTime;

            const progress = Math.min(
                elapsed / duration,
                1
            );

            // Smooth easing
            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            const currentValue =
                Math.floor(target * easedProgress);

            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    if (counters.length) {

        const counterObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    animateCounter(entry.target);

                    observer.unobserve(entry.target);
                });

            },
            {
                threshold: 0.6
            }
        );

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */
    const sections = $$("section[id]");
    const navLinks = $$(".nav-link");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       BUTTON RIPPLE EFFECT
    ===================================================== */
    $$("button, .btn").forEach(button => {

        button.addEventListener("click", function (event) {

            const rect =
                this.getBoundingClientRect();

            const ripple =
                document.createElement("span");

            ripple.className = "ripple";

            ripple.style.left =
                `${event.clientX - rect.left}px`;

            ripple.style.top =
                `${event.clientY - rect.top}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 650);
        });
    });


    /* =====================================================
       REGISTRATION FORM
    ===================================================== */
    const registrationForm = $("#registrationForm");
    const registrationMessage = $("#registrationMessage");

    if (registrationForm) {

        registrationForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const name =
                    $("#registerName")?.value.trim();

                const email =
                    $("#registerEmail")?.value.trim();

                const phone =
                    $("#registerPhone")?.value.trim();

                const interest =
                    $("#registerInterest")?.value.trim();

                const message =
                    $("#registerMessage")?.value.trim();

                if (!name || !email || !phone) {

                    showFormMessage(
                        registrationMessage,
                        "Please fill in your name, email and phone number.",
                        "error"
                    );

                    return;
                }

                if (!isValidEmail(email)) {

                    showFormMessage(
                        registrationMessage,
                        "Please enter a valid email address.",
                        "error"
                    );

                    return;
                }

                const subject =
                    encodeURIComponent(
                        `Jay Classic Class Registration - ${name}`
                    );

                const body =
                    encodeURIComponent(
`Hello Jay Classic,

I would like to register for the free online classes.

Name: ${name}
Email: ${email}
Phone: ${phone}
Interest: ${interest || "Not specified"}

Message:
${message || "No additional message."}

Thank you.`
                    );

                showFormMessage(
                    registrationMessage,
                    "Registration details prepared. Your email app will open next.",
                    "success"
                );

                window.location.href =
                    `mailto:emmanuelouko21@gmail.com?subject=${subject}&body=${body}`;

                registrationForm.reset();
            }
        );
    }


    /* =====================================================
       REVIEW FORM
    ===================================================== */
    const reviewForm = $("#reviewForm");
    const reviewsContainer = $("#reviewsContainer");
    const reviewMessage = $("#reviewMessage");

    let reviews =
        JSON.parse(
            localStorage.getItem("jayClassicReviews") || "[]"
        );

    if (reviewForm) {

        reviewForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const name =
                    $("#reviewName")?.value.trim();

                const rating =
                    $("#reviewRating")?.value;

                const text =
                    $("#reviewText")?.value.trim();

                if (!name || !rating || !text) {

                    showFormMessage(
                        reviewMessage,
                        "Please complete all review fields.",
                        "error"
                    );

                    return;
                }

                const newReview = {
                    name,
                    rating: Number(rating),
                    text,
                    date: new Date().toLocaleDateString()
                };

                reviews.unshift(newReview);

                // Keep the browser storage small
                reviews =
                    reviews.slice(0, 20);

                localStorage.setItem(
                    "jayClassicReviews",
                    JSON.stringify(reviews)
                );

                renderReviews();

                showFormMessage(
                    reviewMessage,
                    "Thank you! Your review has been added.",
                    "success"
                );

                reviewForm.reset();
            }
        );
    }

    function renderReviews() {

        if (!reviewsContainer) return;

        if (!reviews.length) return;

        reviewsContainer.innerHTML = "";

        reviews.forEach(review => {

            const card =
                document.createElement("div");

            card.className =
                "review-card reveal visible";

            const stars =
                "★".repeat(review.rating) +
                "☆".repeat(5 - review.rating);

            card.innerHTML = `
                <div class="review-stars"
                     aria-label="${review.rating} out of 5 stars">
                    ${stars}
                </div>

                <p class="review-text"></p>

                <div class="review-author">
                    <strong></strong>
                    <small>${review.date}</small>
                </div>
            `;

            card.querySelector(".review-text").textContent =
                `"${review.text}"`;

            card.querySelector("strong").textContent =
                review.name;

            reviewsContainer.appendChild(card);
        });
    }

    renderReviews();


    /* =====================================================
       CONTACT FORM
    ===================================================== */
    const contactForm = $("#contactForm");
    const contactStatus = $("#contactMessageStatus");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const name =
                    $("#contactName")?.value.trim();

                const email =
                    $("#contactEmail")?.value.trim();

                const subject =
                    $("#contactSubject")?.value.trim();

                const message =
                    $("#contactMessage")?.value.trim();

                if (!name || !email || !message) {

                    showFormMessage(
                        contactStatus,
                        "Please complete the required fields.",
                        "error"
                    );

                    return;
                }

                if (!isValidEmail(email)) {

                    showFormMessage(
                        contactStatus,
                        "Please enter a valid email address.",
                        "error"
                    );

                    return;
                }

                const mailSubject =
                    encodeURIComponent(
                        subject ||
                        `Website message from ${name}`
                    );

                const mailBody =
                    encodeURIComponent(
`Hello Jay,

You have received a new message from your website.

Name: ${name}
Email: ${email}

Message:
${message}`
                    );

                showFormMessage(
                    contactStatus,
                    "Opening your email application...",
                    "success"
                );

                window.location.href =
                    `mailto:emmanuelouko21@gmail.com?subject=${mailSubject}&body=${mailBody}`;

                contactForm.reset();
            }
        );
    }


    /* =====================================================
       AI CHATBOT
    ===================================================== */
    const chatButton = $("#chatButton");
    const chatWindow = $("#chatWindow");
    const closeChat = $("#closeChat");
    const chatInput = $("#chatInput");
    const sendChat = $("#sendChat");
    const chatMessages = $("#chatMessages");

    function openChat() {

        if (!chatWindow) return;

        chatWindow.classList.add("active");
        chatWindow.classList.add("open");

        chatWindow.setAttribute(
            "aria-hidden",
            "false"
        );

        if (chatInput) {
            setTimeout(() => {
                chatInput.focus();
            }, 250);
        }
    }

    function closeChatWindow() {

        if (!chatWindow) return;

        chatWindow.classList.remove("active");
        chatWindow.classList.remove("open");

        chatWindow.setAttribute(
            "aria-hidden",
            "true"
        );
    }

    if (chatButton) {
        chatButton.addEventListener(
            "click",
            openChat
        );
    }

    if (closeChat) {
        closeChat.addEventListener(
            "click",
            closeChatWindow
        );
    }

    function addChatMessage(message, type) {

        if (!chatMessages) return;

        const messageElement =
            document.createElement("div");

        messageElement.className =
            `chat-message ${type}`;

        messageElement.textContent =
            message;

        chatMessages.appendChild(
            messageElement
        );

        chatMessages.scrollTop =
            chatMessages.scrollHeight;
    }

    function getBotResponse(input) {

        const text =
            input.toLowerCase().trim();

        if (
            text.includes("hello") ||
            text.includes("hi") ||
            text.includes("hey")
        ) {
            return "Hello 👋 Welcome to Jay Classic! I can help you with services, online classes, Canva, Twiva, freelancing and contact information.";
        }

        if (
            text.includes("service") ||
            text.includes("what do you do")
        ) {
            return "Jay Classic provides web development, graphic design, digital marketing, freelancing support, AI tools and other digital services.";
        }

        if (
            text.includes("freelanc") ||
            text.includes("online job")
        ) {
            return "Jay Classic focuses on freelancing and online digital work. You can contact Jay for help with web development, design, digital marketing and other online services.";
        }

        if (
            text.includes("class") ||
            text.includes("lesson") ||
            text.includes("9pm") ||
            text.includes("9 pm") ||
            text.includes("training")
        ) {
            return "The free online classes are held daily at 9:00 PM through TikTok. You can register through the registration form on this website.";
        }

        if (text.includes("canva")) {
            return "Canva is one of the programs featured by Jay Classic. You can learn practical graphic design and content creation skills using Canva.";
        }

        if (text.includes("twiva")) {
            return "Twiva is one of the programs featured on Jay Classic for people interested in digital opportunities and creator-focused work.";
        }

        if (
            text.includes("portfolio") ||
            text.includes("project")
        ) {
            return "You can explore Jay Classic's portfolio section to see examples of digital, web and creative work.";
        }

        if (
            text.includes("price") ||
            text.includes("cost") ||
            text.includes("charge") ||
            text.includes("how much")
        ) {
            return "Pricing depends on the service and project requirements. Please contact Jay directly for a current quotation.";
        }

        if (
            text.includes("email") ||
            text.includes("contact")
        ) {
            return "You can contact Jay Classic by email at emmanuelouko21@gmail.com or through WhatsApp using the WhatsApp button on the website.";
        }

        if (
            text.includes("whatsapp") ||
            text.includes("phone")
        ) {
            return "You can use the floating WhatsApp button on the website to contact Jay directly.";
        }

        if (
            text.includes("register") ||
            text.includes("registration")
        ) {
            return "You can register for the free online classes using the registration form in the Classes section.";
        }

        if (
            text.includes("thank")
        ) {
            return "You're welcome! 😊 I'm here whenever you need help.";
        }

        return "I can help you with Jay Classic's services, freelancing, online classes, Canva, Twiva, portfolio and contact information. Try asking about one of those.";
    }

    function sendMessage() {

        if (!chatInput) return;

        const message =
            chatInput.value.trim();

        if (!message) return;

        addChatMessage(
            message,
            "user"
        );

        chatInput.value = "";

        // Typing indicator
        const typing =
            document.createElement("div");

        typing.className =
            "chat-message bot typing";

        typing.textContent =
            "Jay Classic Assistant is typing...";

        if (chatMessages) {
            chatMessages.appendChild(typing);

            chatMessages.scrollTop =
                chatMessages.scrollHeight;
        }

        setTimeout(() => {

            typing.remove();

            const response =
                getBotResponse(message);

            addChatMessage(
                response,
                "bot"
            );

        }, 650);
    }

    if (sendChat) {
        sendChat.addEventListener(
            "click",
            sendMessage
        );
    }

    if (chatInput) {

        chatInput.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {
                    event.preventDefault();

                    sendMessage();
                }
            }
        );
    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */
    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") return;

            if (navbar) {
                navbar.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon =
                    menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );
                }
            }

            closeChatWindow();
        }
    );


    /* =====================================================
       EXTERNAL LINKS
    ===================================================== */
    $$('a[href^="http"]').forEach(link => {

        if (
            !link.href.includes(
                window.location.hostname
            )
        ) {
            link.setAttribute(
                "target",
                "_blank"
            );

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );
        }
    });


    /* =====================================================
       FORM MESSAGE HELPER
    ===================================================== */
    function showFormMessage(
        element,
        message,
        type
    ) {

        if (!element) return;

        element.textContent = message;

        element.classList.remove(
            "success",
            "error"
        );

        element.classList.add(type);

        element.style.opacity = "1";

        setTimeout(() => {

            element.style.opacity = "0";

        }, 6000);
    }


    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */
    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);
    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */
    const currentYear =
        $("#currentYear");

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       HERO PARALLAX EFFECT
    ===================================================== */
    const heroCard = $(".hero-card");

    if (heroCard && window.innerWidth > 768) {

        document.addEventListener(
            "mousemove",
            event => {

                const x =
                    (window.innerWidth / 2 -
                    event.clientX) / 60;

                const y =
                    (window.innerHeight / 2 -
                    event.clientY) / 60;

                heroCard.style.transform =
                    `perspective(1000px)
                     rotateY(${-x}deg)
                     rotateX(${y}deg)
                     translateY(0)`;
            }
        );
    }


    /* =====================================================
       SERVICE CARD HOVER EFFECT
    ===================================================== */
    $$(".service-card, .program-card").forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.style.transform =
                    "translateY(-8px)";
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";
            }
        );
    });


    /* =====================================================
       TYPING EFFECT FOR HERO
    ===================================================== */
    const typingText =
        $(".typing-text");

    if (typingText) {

        const words = [
            "Freelancer",
            "Web Developer",
            "Graphic Designer",
            "Digital Marketer",
            "AI Tools Specialist"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentWord =
                words[wordIndex];

            if (!deleting) {

                typingText.textContent =
                    currentWord.substring(
                        0,
                        charIndex + 1
                    );

                charIndex++;

                if (
                    charIndex ===
                    currentWord.length
                ) {
                    deleting = true;

                    setTimeout(
                        typeEffect,
                        1500
                    );

                    return;
                }

            } else {

                typingText.textContent =
                    currentWord.substring(
                        0,
                        charIndex - 1
                    );

                charIndex--;

                if (charIndex === 0) {

                    deleting = false;

                    wordIndex =
                        (wordIndex + 1) %
                        words.length;
                }
            }

            setTimeout(
                typeEffect,
                deleting ? 55 : 90
            );
        }

        typeEffect();
    }


    /* =====================================================
       PAGE LOADED
    ===================================================== */
    document.body.classList.add("page-loaded");

    console.log(
        "Jay Classic website loaded successfully 🚀"
    );

});
```
