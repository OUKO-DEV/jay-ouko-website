```javascript
document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       ELEMENTS
    ================================= */

    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");

    /* ================================
       DARK MODE
    ================================= */

    function applyTheme(theme) {
        if (theme === "dark") {
            body.classList.add("dark-mode");
        } else {
            body.classList.remove("dark-mode");
        }

        updateThemeIcon();
    }

    function updateThemeIcon() {
        if (!themeToggle) return;

        const icon = themeToggle.querySelector("i");

        if (!icon) return;

        if (body.classList.contains("dark-mode")) {
            icon.className = "fa-solid fa-sun";
            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );
            themeToggle.setAttribute(
                "title",
                "Switch to light mode"
            );
        } else {
            icon.className = "fa-solid fa-moon";
            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );
            themeToggle.setAttribute(
                "title",
                "Switch to dark mode"
            );
        }
    }

    // Load saved theme
    const savedTheme =
        localStorage.getItem("jayClassicTheme");

    if (savedTheme === "dark") {
        applyTheme("dark");
    } else {
        applyTheme("light");
    }

    // Theme button
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {

            const isDark =
                body.classList.contains("dark-mode");

            if (isDark) {
                applyTheme("light");

                localStorage.setItem(
                    "jayClassicTheme",
                    "light"
                );
            } else {
                applyTheme("dark");

                localStorage.setItem(
                    "jayClassicTheme",
                    "dark"
                );
            }

            // Button animation
            themeToggle.animate(
                [
                    {
                        transform: "rotate(0deg) scale(1)"
                    },
                    {
                        transform: "rotate(180deg) scale(1.15)"
                    },
                    {
                        transform: "rotate(360deg) scale(1)"
                    }
                ],
                {
                    duration: 500,
                    easing: "ease"
                }
            );
        });
    }


    /* ================================
       MOBILE MENU
    ================================= */

    const menuToggle =
        document.getElementById("menuToggle");

    const navbar =
        document.getElementById("navbar");

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            const open =
                navbar.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                open
            );

            const icon =
                menuToggle.querySelector("i");

            if (icon) {
                icon.className = open
                    ? "fa-solid fa-xmark"
                    : "fa-solid fa-bars";
            }
        });

        document.querySelectorAll(".nav-link")
            .forEach(link => {

                link.addEventListener("click", () => {

                    navbar.classList.remove("active");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    const icon =
                        menuToggle.querySelector("i");

                    if (icon) {
                        icon.className =
                            "fa-solid fa-bars";
                    }
                });
            });
    }


    /* ================================
       HEADER SCROLL
    ================================= */

    const header =
        document.querySelector(".header");

    function handleHeader() {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener(
        "scroll",
        handleHeader,
        { passive: true }
    );

    handleHeader();


    /* ================================
       BACK TO TOP
    ================================= */

    const backToTop =
        document.getElementById("backToTop");

    function handleBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    }

    window.addEventListener(
        "scroll",
        handleBackToTop,
        { passive: true }
    );

    handleBackToTop();

    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        );
    }


    /* ================================
       SMOOTH NAVIGATION
    ================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetID =
                    link.getAttribute("href");

                if (
                    !targetID ||
                    targetID === "#"
                ) return;

                const target =
                    document.querySelector(targetID);

                if (!target) return;

                event.preventDefault();

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const position =
                    target.offsetTop -
                    headerHeight -
                    10;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });
            }
        );
    });


    /* ================================
       SCROLL ANIMATIONS
    ================================= */

    const revealElements =
        document.querySelectorAll(`
            .section-heading,
            .service-card,
            .program-card,
            .portfolio-card,
            .review-card,
            .stat-card,
            .class-card,
            .registration-info,
            .registration-form,
            .review-form-wrapper,
            .contact-info,
            .contact-form,
            .info-box
        `);

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {
                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }
                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach(element => {
        observer.observe(element);
    });


    /* ================================
       CONTACT FORM
    ================================= */

    const contactForm =
        document.getElementById("contactForm");

    const contactStatus =
        document.getElementById(
            "contactMessageStatus"
        );

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const name =
                    document.getElementById(
                        "contactName"
                    )?.value.trim();

                const email =
                    document.getElementById(
                        "contactEmail"
                    )?.value.trim();

                const subject =
                    document.getElementById(
                        "contactSubject"
                    )?.value.trim();

                const message =
                    document.getElementById(
                        "contactMessage"
                    )?.value.trim();

                if (!name || !email || !message) {

                    showMessage(
                        contactStatus,
                        "Please fill in all required fields.",
                        "error"
                    );

                    return;
                }

                const emailBody =
                    encodeURIComponent(
`Hello Jay Classic,

Name: ${name}
Email: ${email}

Message:
${message}`
                    );

                const emailSubject =
                    encodeURIComponent(
                        subject ||
                        `Website message from ${name}`
                    );

                showMessage(
                    contactStatus,
                    "Opening your email application...",
                    "success"
                );

                window.location.href =
                    `mailto:emmanuelouko21@gmail.com?subject=${emailSubject}&body=${emailBody}`;

                contactForm.reset();
            }
        );
    }


    /* ================================
       REGISTRATION FORM
    ================================= */

    const registrationForm =
        document.getElementById(
            "registrationForm"
        );

    const registrationMessage =
        document.getElementById(
            "registrationMessage"
        );

    if (registrationForm) {

        registrationForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const name =
                    document.getElementById(
                        "registerName"
                    )?.value.trim();

                const email =
                    document.getElementById(
                        "registerEmail"
                    )?.value.trim();

                const phone =
                    document.getElementById(
                        "registerPhone"
                    )?.value.trim();

                const interest =
                    document.getElementById(
                        "registerInterest"
                    )?.value.trim();

                if (!name || !email || !phone) {

                    showMessage(
                        registrationMessage,
                        "Please fill in your name, email and phone number.",
                        "error"
                    );

                    return;
                }

                const emailBody =
                    encodeURIComponent(
`Hello Jay Classic,

I would like to register for the free online classes.

Name: ${name}
Email: ${email}
Phone: ${phone}
Interest: ${interest || "Not specified"}`
                    );

                const emailSubject =
                    encodeURIComponent(
                        `Free Class Registration - ${name}`
                    );

                showMessage(
                    registrationMessage,
                    "Opening your email application...",
                    "success"
                );

                window.location.href =
                    `mailto:emmanuelouko21@gmail.com?subject=${emailSubject}&body=${emailBody}`;

                registrationForm.reset();
            }
        );
    }


    /* ================================
       REVIEWS
    ================================= */

    const reviewForm =
        document.getElementById("reviewForm");

    const reviewsContainer =
        document.getElementById(
            "reviewsContainer"
        );

    const reviewMessage =
        document.getElementById(
            "reviewMessage"
        );

    let reviews =
        JSON.parse(
            localStorage.getItem(
                "jayClassicReviews"
            ) || "[]"
        );

    function renderReviews() {

        if (
            !reviewsContainer ||
            reviews.length === 0
        ) return;

        reviewsContainer.innerHTML = "";

        reviews.forEach(review => {

            const card =
                document.createElement("div");

            card.className =
                "review-card reveal visible";

            const stars =
                "★".repeat(review.rating) +
                "☆".repeat(
                    5 - review.rating
                );

            card.innerHTML = `
                <div class="review-stars">
                    ${stars}
                </div>

                <p class="review-text"></p>

                <div class="review-author">
                    <strong></strong>
                    <small>${review.date}</small>
                </div>
            `;

            card.querySelector(
                ".review-text"
            ).textContent =
                `"${review.text}"`;

            card.querySelector(
                "strong"
            ).textContent =
                review.name;

            reviewsContainer.appendChild(card);
        });
    }

    if (reviewForm) {

        reviewForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const name =
                    document.getElementById(
                        "reviewName"
                    )?.value.trim();

                const rating =
                    Number(
                        document.getElementById(
                            "reviewRating"
                        )?.value
                    );

                const text =
                    document.getElementById(
                        "reviewText"
                    )?.value.trim();

                if (
                    !name ||
                    !rating ||
                    !text
                ) {

                    showMessage(
                        reviewMessage,
                        "Please complete all review fields.",
                        "error"
                    );

                    return;
                }

                reviews.unshift({
                    name,
                    rating,
                    text,
                    date:
                        new Date()
                            .toLocaleDateString()
                });

                reviews =
                    reviews.slice(0, 20);

                localStorage.setItem(
                    "jayClassicReviews",
                    JSON.stringify(reviews)
                );

                renderReviews();

                showMessage(
                    reviewMessage,
                    "Thank you! Your review has been added.",
                    "success"
                );

                reviewForm.reset();
            }
        );
    }

    renderReviews();


    /* ================================
       AI CHATBOT
    ================================= */

    const chatButton =
        document.getElementById("chatButton");

    const chatWindow =
        document.getElementById("chatWindow");

    const closeChat =
        document.getElementById("closeChat");

    const chatInput =
        document.getElementById("chatInput");

    const sendChat =
        document.getElementById("sendChat");

    const chatMessages =
        document.getElementById("chatMessages");

    function openChat() {

        if (!chatWindow) return;

        chatWindow.classList.add("active");

        chatWindow.setAttribute(
            "aria-hidden",
            "false"
        );

        setTimeout(() => {
            chatInput?.focus();
        }, 200);
    }

    function closeChatBox() {

        if (!chatWindow) return;

        chatWindow.classList.remove("active");

        chatWindow.setAttribute(
            "aria-hidden",
            "true"
        );
    }

    chatButton?.addEventListener(
        "click",
        openChat
    );

    closeChat?.addEventListener(
        "click",
        closeChatBox
    );

    function addMessage(
        message,
        type
    ) {

        if (!chatMessages) return;

        const element =
            document.createElement("div");

        element.className =
            `chat-message ${type}`;

        element.textContent =
            message;

        chatMessages.appendChild(
            element
        );

        chatMessages.scrollTop =
            chatMessages.scrollHeight;
    }

    function botReply(input) {

        const text =
            input.toLowerCase();

        if (
            text.includes("hello") ||
            text.includes("hi") ||
            text.includes("hey")
        ) {
            return "Hello 👋 Welcome to Jay Classic! How can I help you today?";
        }

        if (
            text.includes("service") ||
            text.includes("what do you do")
        ) {
            return "Jay Classic offers web development, graphic design, digital marketing, freelancing support, AI tools and digital services.";
        }

        if (
            text.includes("freelanc") ||
            text.includes("online job")
        ) {
            return "Jay Classic focuses on freelancing and online digital opportunities. You can contact Jay for guidance or digital services.";
        }

        if (
            text.includes("class") ||
            text.includes("9 pm") ||
            text.includes("9pm")
        ) {
            return "Free online classes are available daily at 9:00 PM through TikTok. You can register on the Classes section.";
        }

        if (text.includes("canva")) {
            return "Canva is included among the digital programs. It can help you learn graphic design and content creation.";
        }

        if (text.includes("twiva")) {
            return "Twiva is one of the programs featured by Jay Classic for people interested in creator and digital opportunities.";
        }

        if (
            text.includes("contact") ||
            text.includes("email")
        ) {
            return "You can contact Jay Classic at emmanuelouko21@gmail.com or through the WhatsApp button.";
        }

        if (
            text.includes("price") ||
            text.includes("cost")
        ) {
            return "Project pricing depends on the service and requirements. Contact Jay for a current quotation.";
        }

        if (
            text.includes("register")
        ) {
            return "You can register using the registration form in the Free Online Classes section.";
        }

        return "I can help with Jay Classic services, freelancing, online classes, Canva, Twiva, portfolio and contact information.";
    }

    function sendMessage() {

        if (!chatInput) return;

        const message =
            chatInput.value.trim();

        if (!message) return;

        addMessage(
            message,
            "user"
        );

        chatInput.value = "";

        setTimeout(() => {

            addMessage(
                botReply(message),
                "bot"
            );

        }, 500);
    }

    sendChat?.addEventListener(
        "click",
        sendMessage
    );

    chatInput?.addEventListener(
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


    /* ================================
       ESCAPE
    ================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") return;

            navbar?.classList.remove(
                "active"
            );

            closeChatBox();
        }
    );


    /* ================================
       CURRENT YEAR
    ================================= */

    const year =
        document.getElementById(
            "currentYear"
        );

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    /* ================================
       HELPER
    ================================= */

    function showMessage(
        element,
        message,
        type
    ) {

        if (!element) return;

        element.textContent = message;

        element.className =
            `form-message ${type}`;

        element.style.opacity = "1";

        setTimeout(() => {
            element.style.opacity = "0";
        }, 5000);
    }


    /* ================================
       PAGE READY
    ================================= */

    document.body.classList.add(
        "page-loaded"
    );

    console.log(
        "Jay Classic — Website Ready 🚀"
    );

});
```
