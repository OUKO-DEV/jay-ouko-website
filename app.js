/* =========================================================
   JAY CLASSIC - COMPLETE APP.JS
   Freelancing & Online Works Website
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. PAGE LOADER
       ===================================================== */

    const pageLoader = document.querySelector(".page-loader");

    const hideLoader = () => {
        if (pageLoader) {
            pageLoader.classList.add("hidden");

            setTimeout(() => {
                pageLoader.style.display = "none";
            }, 500);
        }
    };

    window.addEventListener("load", hideLoader);

    // Backup loader timeout
    setTimeout(hideLoader, 2500);


    /* =====================================================
       2. DARK MODE / LIGHT MODE
       ===================================================== */

    const themeToggle = document.querySelector(".theme-toggle");
    const body = document.body;

    const savedTheme = localStorage.getItem("jayClassicTheme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
    }

    const updateThemeButton = () => {
        if (!themeToggle) return;

        const isDark = body.classList.contains("dark-mode");

        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "title",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

        // If button contains an icon
        const icon = themeToggle.querySelector("i");

        if (icon) {
            icon.className = isDark
                ? "fas fa-sun"
                : "fas fa-moon";
        }

        // If button contains text instead
        if (!icon && themeToggle.textContent.trim() !== "") {
            themeToggle.textContent = isDark ? "☀️" : "🌙";
        }
    };

    updateThemeButton();

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {

            body.classList.toggle("dark-mode");

            const isDark = body.classList.contains("dark-mode");

            localStorage.setItem(
                "jayClassicTheme",
                isDark ? "dark" : "light"
            );

            updateThemeButton();
        });
    }


    /* =====================================================
       3. MOBILE MENU
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");

            const isOpen = mobileMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            // Change menu icon
            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.className = isOpen
                    ? "fas fa-times"
                    : "fas fa-bars";
            }
        });


        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.className = "fas fa-bars";
                }
            });
        });


        // Close menu with Escape
        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {

                mobileMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.className = "fas fa-bars";
                }
            }
        });
    }


    /* =====================================================
       4. HEADER SCROLL EFFECT
       ===================================================== */

    const header = document.querySelector(".header");

    const handleHeaderScroll = () => {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleHeaderScroll);

    handleHeaderScroll();


    /* =====================================================
       5. SMOOTH SCROLLING
       ===================================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                const headerHeight =
                    header ? header.offsetHeight : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    /* =====================================================
       6. BACK TO TOP BUTTON
       ===================================================== */

    const backToTop = document.querySelector(".back-to-top");

    const handleBackToTop = () => {

        if (!backToTop) return;

        if (window.scrollY > 500) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    };

    window.addEventListener("scroll", handleBackToTop);

    handleBackToTop();

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }


    /* =====================================================
       7. CURRENT YEAR
       ===================================================== */

    const currentYear = document.querySelector("#currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       8. SERVICE CARD ANIMATION
       ===================================================== */

    const serviceCards =
        document.querySelectorAll(".service-card");

    serviceCards.forEach((card, index) => {

        card.style.animationDelay =
            `${index * 0.08}s`;

    });


    /* =====================================================
       9. REVIEW STAR SYSTEM
       ===================================================== */

    const reviewForm =
        document.querySelector(".review-form");

    const reviewGrid =
        document.querySelector(".reviews-grid");

    const reviewStars =
        document.querySelectorAll(
            ".review-form .star-input, .review-form .rating-star"
        );

    let selectedRating = 5;


    // Support buttons with data-rating
    const ratingButtons =
        document.querySelectorAll(
            "[data-rating]"
        );

    ratingButtons.forEach(button => {

        button.addEventListener("click", () => {

            const rating =
                Number(button.dataset.rating);

            if (
                rating >= 1 &&
                rating <= 5
            ) {
                selectedRating = rating;
            }

            updateRatingDisplay(selectedRating);
        });

    });


    function updateRatingDisplay(rating) {

        ratingButtons.forEach(button => {

            const buttonRating =
                Number(button.dataset.rating);

            if (buttonRating <= rating) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }

        });
    }

    updateRatingDisplay(selectedRating);


    /* =====================================================
       10. REVIEW FORM
       ===================================================== */

    if (reviewForm) {

        reviewForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const nameInput =
                reviewForm.querySelector(
                    'input[name="name"], #reviewName'
                );

            const roleInput =
                reviewForm.querySelector(
                    'input[name="role"], input[name="location"], #reviewRole'
                );

            const commentInput =
                reviewForm.querySelector(
                    'textarea[name="comment"], #reviewComment'
                );

            const ratingInput =
                reviewForm.querySelector(
                    'select[name="rating"], input[name="rating"]:checked'
                );


            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";

            const role =
                roleInput
                    ? roleInput.value.trim()
                    : "";

            const comment =
                commentInput
                    ? commentInput.value.trim()
                    : "";

            let rating = selectedRating;

            if (ratingInput) {

                const inputRating =
                    Number(ratingInput.value);

                if (
                    inputRating >= 1 &&
                    inputRating <= 5
                ) {
                    rating = inputRating;
                }
            }


            // Validation
            if (!name) {

                showMessage(
                    "Please enter your name.",
                    "error"
                );

                if (nameInput) nameInput.focus();

                return;
            }


            if (!comment) {

                showMessage(
                    "Please write your review.",
                    "error"
                );

                if (commentInput) commentInput.focus();

                return;
            }


            // Create review
            const review = {
                id: Date.now(),
                name: name,
                role: role || "Jay Classic Client",
                comment: comment,
                rating: rating,
                date: new Date().toLocaleDateString()
            };


            saveReview(review);

            addReviewToPage(review);


            // Reset form
            reviewForm.reset();

            selectedRating = 5;

            updateRatingDisplay(selectedRating);


            showMessage(
                "Thank you! Your review has been submitted on this device.",
                "success"
            );

        });
    }


    /* =====================================================
       11. SAVE REVIEWS TO LOCAL STORAGE
       ===================================================== */

    function getSavedReviews() {

        try {

            const reviews =
                localStorage.getItem(
                    "jayClassicReviews"
                );

            return reviews
                ? JSON.parse(reviews)
                : [];

        } catch (error) {

            console.error(
                "Could not load reviews:",
                error
            );

            return [];
        }
    }


    function saveReview(review) {

        const reviews =
            getSavedReviews();

        reviews.unshift(review);

        // Keep maximum 20 locally stored reviews
        const limitedReviews =
            reviews.slice(0, 20);

        localStorage.setItem(
            "jayClassicReviews",
            JSON.stringify(limitedReviews)
        );
    }


    /* =====================================================
       12. DISPLAY SAVED REVIEWS
       ===================================================== */

    if (reviewGrid) {

        const savedReviews =
            getSavedReviews();

        savedReviews.reverse().forEach(review => {
            addReviewToPage(review, false);
        });

    }


    function addReviewToPage(review, animate = true) {

        if (!reviewGrid) return;


        const reviewCard =
            document.createElement("article");

        reviewCard.className = "review-card";


        if (animate) {
            reviewCard.style.opacity = "0";
            reviewCard.style.transform =
                "translateY(20px)";
        }


        const stars =
            "★".repeat(review.rating) +
            "☆".repeat(5 - review.rating);


        const avatarLetter =
            escapeHTML(
                review.name
                    .charAt(0)
                    .toUpperCase()
            );


        reviewCard.innerHTML = `

            <div class="review-stars"
                 aria-label="${review.rating} out of 5 stars">
                ${stars}
            </div>

            <p class="review-text">
                "${escapeHTML(review.comment)}"
            </p>

            <div class="review-author">

                <div class="review-avatar">
                    ${avatarLetter}
                </div>

                <div>
                    <strong>
                        ${escapeHTML(review.name)}
                    </strong>

                    <span>
                        ${escapeHTML(review.role)}
                    </span>
                </div>

            </div>

        `;


        reviewGrid.prepend(reviewCard);


        if (animate) {

            requestAnimationFrame(() => {

                reviewCard.style.transition =
                    "all 0.5s ease";

                reviewCard.style.opacity = "1";

                reviewCard.style.transform =
                    "translateY(0)";
            });

        }
    }


    /* =====================================================
       13. HTML ESCAPE SECURITY
       ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =====================================================
       14. REGISTRATION FORM
       ===================================================== */

    const registrationForm =
        document.querySelector(".registration-form");


    if (registrationForm) {

        registrationForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const name =
                    getFormValue(
                        registrationForm,
                        "name"
                    );

                const email =
                    getFormValue(
                        registrationForm,
                        "email"
                    );

                const phone =
                    getFormValue(
                        registrationForm,
                        "phone"
                    );

                const service =
                    getFormValue(
                        registrationForm,
                        "service"
                    );

                const message =
                    getFormValue(
                        registrationForm,
                        "message"
                    );


                if (!name) {

                    showMessage(
                        "Please enter your name.",
                        "error"
                    );

                    return;
                }


                if (!email && !phone) {

                    showMessage(
                        "Please provide your email or phone number.",
                        "error"
                    );

                    return;
                }


                const subject =
                    encodeURIComponent(
                        "Jay Classic Registration"
                    );


                const emailBody =
                    encodeURIComponent(
                        `Hello Jay Classic,

I would like to register.

Name: ${name}
Email: ${email || "Not provided"}
Phone: ${phone || "Not provided"}
Service/Class: ${service || "Not specified"}

Message:
${message || "No additional message."}

Thank you.`
                    );


                const mailto =
                    `mailto:emmanuelouko21@gmail.com?subject=${subject}&body=${emailBody}`;


                // Open email
                window.location.href = mailto;


                // Save registration locally
                const registration = {
                    id: Date.now(),
                    name: name,
                    email: email,
                    phone: phone,
                    service: service,
                    message: message,
                    date: new Date().toISOString()
                };


                saveRegistration(
                    registration
                );


                showMessage(
                    "Your registration details are ready to send by email.",
                    "success"
                );

            }
        );
    }


    /* =====================================================
       15. FORM VALUE HELPER
       ===================================================== */

    function getFormValue(form, name) {

        const field =
            form.querySelector(
                `[name="${name}"], #${name}`
            );

        return field
            ? field.value.trim()
            : "";
    }


    /* =====================================================
       16. SAVE REGISTRATIONS
       ===================================================== */

    function saveRegistration(data) {

        try {

            const registrations =
                JSON.parse(
                    localStorage.getItem(
                        "jayClassicRegistrations"
                    )
                ) || [];


            registrations.unshift(data);


            localStorage.setItem(
                "jayClassicRegistrations",
                JSON.stringify(
                    registrations.slice(0, 50)
                )
            );

        } catch (error) {

            console.error(
                "Could not save registration:",
                error
            );

        }
    }


    /* =====================================================
       17. WHATSAPP BUTTONS
       ===================================================== */

    const whatsappButtons =
        document.querySelectorAll(
            ".whatsapp-button, [data-whatsapp]"
        );


    whatsappButtons.forEach(button => {

        button.addEventListener("click", (event) => {

            event.preventDefault();


            const customMessage =
                button.dataset.whatsappMessage ||
                "Hello Jay Classic, I would like to know more about your services.";


            /*
             * IMPORTANT:
             *
             * WhatsApp requires a valid Kenyan mobile
             * number in international format.
             *
             * Replace the number below with your actual
             * WhatsApp mobile number if different.
             */

            const whatsappNumber =
                "254700000000";


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(customMessage)}`;


            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        });

    });


    /* =====================================================
       18. EMAIL BUTTONS
       ===================================================== */

    const emailButtons =
        document.querySelectorAll(
            ".email-button, [data-email]"
        );


    emailButtons.forEach(button => {

        button.addEventListener("click", (event) => {

            event.preventDefault();


            const subject =
                button.dataset.emailSubject ||
                "Jay Classic Inquiry";


            const body =
                button.dataset.emailMessage ||
                "Hello Jay Classic, I would like to know more about your services.";


            window.location.href =
                `mailto:emmanuelouko21@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        });

    });


    /* =====================================================
       19. CONTACT FORM
       ===================================================== */

    const contactForm =
        document.querySelector(".contact-form");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const name =
                    getFormValue(
                        contactForm,
                        "name"
                    );

                const email =
                    getFormValue(
                        contactForm,
                        "email"
                    );

                const message =
                    getFormValue(
                        contactForm,
                        "message"
                    );


                if (!name) {

                    showMessage(
                        "Please enter your name.",
                        "error"
                    );

                    return;
                }


                if (!email) {

                    showMessage(
                        "Please enter your email.",
                        "error"
                    );

                    return;
                }


                if (!message) {

                    showMessage(
                        "Please enter your message.",
                        "error"
                    );

                    return;
                }


                const subject =
                    encodeURIComponent(
                        `Jay Classic Contact - ${name}`
                    );


                const body =
                    encodeURIComponent(
                        `Hello Jay Classic,

Name: ${name}
Email: ${email}

Message:
${message}`
                    );


                window.location.href =
                    `mailto:emmanuelouko21@gmail.com?subject=${subject}&body=${body}`;


                showMessage(
                    "Opening your email application...",
                    "success"
                );

            }
        );
    }


    /* =====================================================
       20. MESSAGE SYSTEM
       ===================================================== */

    function showMessage(message, type = "success") {

        // Remove previous message
        const oldMessage =
            document.querySelector(
                ".js-message"
            );

        if (oldMessage) {
            oldMessage.remove();
        }


        const messageBox =
            document.createElement("div");


        messageBox.className =
            `js-message ${type}`;


        messageBox.textContent =
            message;


        Object.assign(
            messageBox.style,
            {
                position: "fixed",
                top: "90px",
                right: "20px",
                maxWidth: "360px",
                padding: "15px 20px",
                borderRadius: "12px",
                zIndex: "99999",
                fontSize: "14px",
                fontWeight: "600",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                background: type === "error"
                    ? "#ffe5e5"
                    : "#e7f8ed",
                color: type === "error"
                    ? "#b42318"
                    : "#137333"
            }
        );


        document.body.appendChild(
            messageBox
        );


        setTimeout(() => {

            messageBox.style.opacity = "0";
            messageBox.style.transform =
                "translateY(-10px)";
            messageBox.style.transition =
                "all 0.3s ease";

            setTimeout(() => {
                messageBox.remove();
            }, 300);

        }, 3500);
    }


    /* =====================================================
       21. COPY CONTACT DETAILS
       ===================================================== */

    const copyButtons =
        document.querySelectorAll(
            "[data-copy]"
        );


    copyButtons.forEach(button => {

        button.addEventListener("click", async () => {

            const text =
                button.dataset.copy;


            if (!text) return;


            try {

                await navigator.clipboard.writeText(
                    text
                );


                const original =
                    button.textContent;


                button.textContent =
                    "Copied!";


                setTimeout(() => {

                    button.textContent =
                        original;

                }, 1500);


            } catch (error) {

                console.error(
                    "Copy failed:",
                    error
                );

                showMessage(
                    "Unable to copy automatically.",
                    "error"
                );

            }

        });

    });


    /* =====================================================
       22. SOCIAL LINKS
       ===================================================== */

    const socialLinks =
        document.querySelectorAll(
            ".social-link"
        );


    socialLinks.forEach(link => {

        link.addEventListener("click", () => {

            const platform =
                link.dataset.platform;


            if (platform) {

                console.log(
                    `Opening ${platform}`
                );

            }

        });

    });


    /* =====================================================
       23. ONLINE CLASS BUTTON
       ===================================================== */

    const classButtons =
        document.querySelectorAll(
            ".class-button, [data-class-link]"
        );


    classButtons.forEach(button => {

        button.addEventListener(
            "click",
            (event) => {

                const link =
                    button.dataset.classLink;


                if (
                    link &&
                    link !== "#"
                ) {

                    event.preventDefault();

                    window.open(
                        link,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }

            }
        );

    });


    /* =====================================================
       24. SERVICE BUTTONS
       ===================================================== */

    const serviceButtons =
        document.querySelectorAll(
            "[data-service]"
        );


    serviceButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const service =
                    button.dataset.service;


                const registrationForm =
                    document.querySelector(
                        ".registration-form"
                    );


                if (
                    registrationForm &&
                    service
                ) {

                    const serviceField =
                        registrationForm.querySelector(
                            '[name="service"], #service'
                        );


                    if (serviceField) {
                        serviceField.value =
                            service;
                    }

                    registrationForm.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }

            }
        );

    });


    /* =====================================================
       25. INTERSECTION OBSERVER ANIMATIONS
       ===================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".service-card, .job-card, .review-card, .step, .feature-item"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries, obs) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "in-view"
                            );

                            obs.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        animatedElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        animatedElements.forEach(element => {

            element.classList.add(
                "in-view"
            );

        });

    }


    /* =====================================================
       26. PREVENT EMPTY LINKS
       ===================================================== */

    const emptyLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );


    emptyLinks.forEach(link => {

        link.addEventListener(
            "click",
            (event) => {

                const hasAction =
                    link.dataset.action ||
                    link.dataset.classLink ||
                    link.dataset.whatsapp;


                if (!hasAction) {

                    event.preventDefault();

                }

            }
        );

    });


    /* =====================================================
       27. ONLINE STATUS
       ===================================================== */

    const statusDots =
        document.querySelectorAll(
            ".status-dot"
        );


    statusDots.forEach(dot => {

        dot.setAttribute(
            "title",
            "Jay Classic is available online"
        );

    });


    /* =====================================================
       28. KEYBOARD ACCESSIBILITY
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            // Press "/" to focus registration form
            if (
                event.key === "/" &&
                !isTyping(event.target)
            ) {

                const registration =
                    document.querySelector(
                        ".registration-form input"
                    );


                if (registration) {

                    event.preventDefault();

                    registration.focus();

                }
            }

        }
    );


    function isTyping(element) {

        if (!element) return false;

        const tag =
            element.tagName.toLowerCase();

        return (
            tag === "input" ||
            tag === "textarea" ||
            tag === "select"
        );

    }


    /* =====================================================
       29. PREVENT DOUBLE FORM SUBMISSION
       ===================================================== */

    const forms =
        document.querySelectorAll("form");


    forms.forEach(form => {

        form.addEventListener(
            "submit",
            () => {

                const submitButton =
                    form.querySelector(
                        'button[type="submit"]'
                    );


                if (submitButton) {

                    setTimeout(() => {

                        submitButton.disabled =
                            false;

                    }, 2000);

                }

            }
        );

    });


    /* =====================================================
       30. CONSOLE BRANDING
       ===================================================== */

    console.log(
        "%c JAY CLASSIC ",
        "background:#111;color:#fff;font-size:20px;font-weight:bold;padding:8px 15px;border-radius:8px;"
    );

    console.log(
        "%c Freelancing • Digital Skills • Online Opportunities ",
        "font-size:14px;color:#666;"
    );

    console.log(
        "Jay Classic website initialized successfully."
    );

});
