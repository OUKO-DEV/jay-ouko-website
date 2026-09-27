/* =========================================================
   JAY CLASSIC
   SUPABASE CONNECTED APP.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", async () => {

    /* =====================================================
       SUPABASE CONFIGURATION
       ===================================================== */

    const SUPABASE_URL =
        "https://cjcyjsgcsgqeqanxwitq.supabase.co";

    /*
       IMPORTANT:
       Use ONLY your Supabase PUBLISHABLE/ANON key here.

       NEVER put your Supabase SECRET/SERVICE-ROLE key
       inside this file.
    */

    const SUPABASE_PUBLISHABLE_KEY =
        "PASTE_YOUR_PUBLISHABLE_KEY_HERE";


    let supabaseClient = null;

    if (
        window.supabase &&
        SUPABASE_PUBLISHABLE_KEY !==
        "PASTE_YOUR_PUBLISHABLE_KEY_HERE"
    ) {

        supabaseClient =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_PUBLISHABLE_KEY
            );

        console.log(
            "Jay Classic: Supabase connected."
        );

    } else {

        console.warn(
            "Jay Classic: Supabase is not configured yet."
        );

    }


    /* =====================================================
       PAGE LOADER
       ===================================================== */

    const pageLoader =
        document.querySelector(".page-loader");

    function hideLoader() {

        if (!pageLoader) return;

        pageLoader.classList.add("hidden");

        setTimeout(() => {
            pageLoader.style.display = "none";
        }, 500);
    }

    window.addEventListener("load", hideLoader);

    setTimeout(hideLoader, 2500);


    /* =====================================================
       DARK / LIGHT MODE
       ===================================================== */

    const themeToggle =
        document.querySelector(".theme-toggle");

    const body =
        document.body;

    const savedTheme =
        localStorage.getItem("jayClassicTheme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
    }

    function updateThemeButton() {

        if (!themeToggle) return;

        const isDark =
            body.classList.contains("dark-mode");

        themeToggle.setAttribute(
            "aria-label",
            isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "title",
            isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

        const icon =
            themeToggle.querySelector("i");

        if (icon) {

            icon.className =
                isDark
                    ? "fas fa-sun"
                    : "fas fa-moon";
        }
    }

    updateThemeButton();

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                body.classList.toggle(
                    "dark-mode"
                );

                const isDark =
                    body.classList.contains(
                        "dark-mode"
                    );

                localStorage.setItem(
                    "jayClassicTheme",
                    isDark
                        ? "dark"
                        : "light"
                );

                updateThemeButton();
            }
        );
    }


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileMenu =
        document.querySelector(".mobile-menu");

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener(
            "click",
            () => {

                mobileMenu.classList.toggle(
                    "active"
                );

                const isOpen =
                    mobileMenu.classList.contains(
                        "active"
                    );

                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen
                        ? "true"
                        : "false"
                );

                const icon =
                    menuToggle.querySelector("i");

                if (icon) {

                    icon.className =
                        isOpen
                            ? "fas fa-times"
                            : "fas fa-bars";
                }
            }
        );


        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileMenu.classList.remove(
                            "active"
                        );

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }
                );
            });
    }


    /* =====================================================
       HEADER SCROLL
       ===================================================== */

    const header =
        document.querySelector(".header");

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 40) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );
        }
    }

    window.addEventListener(
        "scroll",
        handleHeaderScroll
    );

    handleHeaderScroll();


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                function (event) {

                    const targetID =
                        this.getAttribute("href");

                    if (
                        !targetID ||
                        targetID === "#"
                    ) return;

                    const target =
                        document.querySelector(
                            targetID
                        );

                    if (!target) return;

                    event.preventDefault();

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const position =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight;

                    window.scrollTo({
                        top: position,
                        behavior: "smooth"
                    });
                }
            );
        });


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    const backToTop =
        document.querySelector(".back-to-top");

    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {

            backToTop.classList.add(
                "visible"
            );

        } else {

            backToTop.classList.remove(
                "visible"
            );
        }
    }

    window.addEventListener(
        "scroll",
        updateBackToTop
    );

    updateBackToTop();

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


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const currentYear =
        document.querySelector("#currentYear");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       REVIEW SYSTEM
       ===================================================== */

    const reviewForm =
        document.querySelector(".review-form");

    const reviewGrid =
        document.querySelector(".reviews-grid");

    let selectedRating = 5;


    /* -----------------------------------------------------
       RATING BUTTONS
       ----------------------------------------------------- */

    const ratingButtons =
        document.querySelectorAll(
            "[data-rating]"
        );

    ratingButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const rating =
                    Number(
                        button.dataset.rating
                    );

                if (
                    rating >= 1 &&
                    rating <= 5
                ) {

                    selectedRating =
                        rating;
                }

                updateRatingDisplay(
                    selectedRating
                );
            }
        );
    });


    function updateRatingDisplay(
        rating
    ) {

        ratingButtons.forEach(
            button => {

                const buttonRating =
                    Number(
                        button.dataset.rating
                    );

                button.classList.toggle(
                    "active",
                    buttonRating <= rating
                );
            }
        );
    }

    updateRatingDisplay(
        selectedRating
    );


    /* =====================================================
       LOAD REVIEWS FROM SUPABASE
       ===================================================== */

    async function loadReviews() {

        if (!supabaseClient) {

            console.warn(
                "Supabase not connected."
            );

            return;
        }

        if (!reviewGrid) return;


        const {
            data,
            error
        } = await supabaseClient
            .from("reviews")
            .select("*")
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


        if (error) {

            console.error(
                "Could not load reviews:",
                error
            );

            return;
        }


        /*
           Remove old dynamically loaded reviews
           but leave HTML reviews if you want them.
        */

        data.forEach(review => {

            addReviewToPage(
                review,
                false
            );

        });


        updateAverageRating(
            data
        );
    }


    /* =====================================================
       SUBMIT REVIEW TO SUPABASE
       ===================================================== */

    if (reviewForm) {

        reviewForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                const nameInput =
                    reviewForm.querySelector(
                        '[name="name"], #reviewName'
                    );

                const roleInput =
                    reviewForm.querySelector(
                        '[name="role"], [name="location"], #reviewRole'
                    );

                const commentInput =
                    reviewForm.querySelector(
                        '[name="comment"], #reviewComment'
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


                let rating =
                    selectedRating;


                if (ratingInput) {

                    const inputRating =
                        Number(
                            ratingInput.value
                        );

                    if (
                        inputRating >= 1 &&
                        inputRating <= 5
                    ) {

                        rating =
                            inputRating;
                    }
                }


                if (!name) {

                    showMessage(
                        "Please enter your name.",
                        "error"
                    );

                    return;
                }


                if (!comment) {

                    showMessage(
                        "Please write your review.",
                        "error"
                    );

                    return;
                }


                if (!supabaseClient) {

                    showMessage(
                        "Supabase is not connected yet.",
                        "error"
                    );

                    return;
                }


                const submitButton =
                    reviewForm.querySelector(
                        'button[type="submit"]'
                    );


                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.textContent =
                        "Submitting...";
                }


                const {
                    data,
                    error
                } = await supabaseClient
                    .from("reviews")
                    .insert([
                        {
                            name: name,
                            role:
                                role ||
                                "Jay Classic Client",
                            comment: comment,
                            rating: rating
                        }
                    ])
                    .select()
                    .single();


                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        "Submit Review";
                }


                if (error) {

                    console.error(
                        "Review submission error:",
                        error
                    );

                    showMessage(
                        "Unable to submit your review. Please try again.",
                        "error"
                    );

                    return;
                }


                /*
                   Add the newly submitted review
                   immediately to the page.
                */

                addReviewToPage(
                    data,
                    true
                );


                reviewForm.reset();

                selectedRating = 5;

                updateRatingDisplay(
                    selectedRating
                );


                showMessage(
                    "Thank you! Your review has been submitted.",
                    "success"
                );
            }
        );
    }


    /* =====================================================
       ADD REVIEW TO PAGE
       ===================================================== */

    function addReviewToPage(
        review,
        animate = true
    ) {

        if (!reviewGrid) return;


        const reviewCard =
            document.createElement(
                "article"
            );

        reviewCard.className =
            "review-card";


        if (animate) {

            reviewCard.style.opacity =
                "0";

            reviewCard.style.transform =
                "translateY(20px)";
        }


        const rating =
            Number(review.rating) || 5;


        const stars =
            "★".repeat(rating) +
            "☆".repeat(5 - rating);


        const name =
            escapeHTML(
                review.name
            );


        const role =
            escapeHTML(
                review.role ||
                "Jay Classic Client"
            );


        const comment =
            escapeHTML(
                review.comment
            );


        const avatar =
            escapeHTML(
                String(
                    review.name || "J"
                )
                .charAt(0)
                .toUpperCase()
            );


        reviewCard.innerHTML = `

            <div class="review-stars">
                ${stars}
            </div>

            <p class="review-text">
                "${comment}"
            </p>

            <div class="review-author">

                <div class="review-avatar">
                    ${avatar}
                </div>

                <div>
                    <strong>
                        ${name}
                    </strong>

                    <span>
                        ${role}
                    </span>
                </div>

            </div>

        `;


        reviewGrid.prepend(
            reviewCard
        );


        if (animate) {

            requestAnimationFrame(
                () => {

                    reviewCard.style.transition =
                        "all 0.5s ease";

                    reviewCard.style.opacity =
                        "1";

                    reviewCard.style.transform =
                        "translateY(0)";
                }
            );
        }
    }


    /* =====================================================
       AVERAGE RATING
       ===================================================== */

    function updateAverageRating(
        reviews
    ) {

        if (!reviews.length) return;


        const total =
            reviews.reduce(
                (sum, review) =>
                    sum +
                    Number(review.rating),
                0
            );


        const average =
            total / reviews.length;


        const scoreElement =
            document.querySelector(
                ".rating-score"
            );


        if (scoreElement) {

            scoreElement.textContent =
                average.toFixed(1);
        }


        const ratingCount =
            document.querySelector(
                "[data-rating-count]"
            );


        if (ratingCount) {

            ratingCount.textContent =
                `${reviews.length} reviews`;
        }
    }


    /* =====================================================
       HTML SECURITY
       ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );
    }


    /* =====================================================
       REGISTRATION SYSTEM
       ===================================================== */

    const registrationForm =
        document.querySelector(
            ".registration-form"
        );


    if (registrationForm) {

        registrationForm.addEventListener(
            "submit",
            async event => {

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


                if (!supabaseClient) {

                    showMessage(
                        "Supabase is not connected yet.",
                        "error"
                    );

                    return;
                }


                const submitButton =
                    registrationForm.querySelector(
                        'button[type="submit"]'
                    );


                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.textContent =
                        "Registering...";
                }


                const {
                    data,
                    error
                } = await supabaseClient
                    .from("registrations")
                    .insert([
                        {
                            name: name,
                            email: email || null,
                            phone: phone || null,
                            service:
                                service || null,
                            message:
                                message || null
                        }
                    ])
                    .select()
                    .single();


                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        "Register Now";
                }


                if (error) {

                    console.error(
                        "Registration error:",
                        error
                    );

                    showMessage(
                        "Registration failed. Please try again.",
                        "error"
                    );

                    return;
                }


                console.log(
                    "Registration saved:",
                    data
                );


                /*
                   Create an email as an additional
                   notification option.
                */

                const subject =
                    encodeURIComponent(
                        "Jay Classic New Registration"
                    );


                const emailBody =
                    encodeURIComponent(
                        `Hello Jay Classic,

A new registration has been submitted.

Name: ${name}
Email: ${email || "Not provided"}
Phone: ${phone || "Not provided"}
Service/Class: ${service || "Not specified"}

Message:
${message || "No additional message."}
`
                    );


                /*
                   Open the visitor's email application.
                   The registration is ALREADY saved
                   in Supabase before this happens.
                */

                window.location.href =
                    `mailto:emmanuelouko21@gmail.com?subject=${subject}&body=${emailBody}`;


                registrationForm.reset();


                showMessage(
                    "Registration successful! Your details have been saved.",
                    "success"
                );
            }
        );
    }


    /* =====================================================
       FORM VALUE HELPER
       ===================================================== */

    function getFormValue(
        form,
        name
    ) {

        const field =
            form.querySelector(
                `[name="${name}"], #${name}`
            );

        return field
            ? field.value.trim()
            : "";
    }


    /* =====================================================
       CONTACT FORM
       ===================================================== */

    const contactForm =
        document.querySelector(
            ".contact-form"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

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


                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    showMessage(
                        "Please complete all required fields.",
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
            }
        );
    }


    /* =====================================================
       WHATSAPP BUTTON
       ===================================================== */

    document
        .querySelectorAll(
            ".whatsapp-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    const number =
                        button.dataset.whatsapp;

                    if (!number) {

                        /*
                           No WhatsApp number has been
                           configured yet.
                        */

                        return;
                    }


                    event.preventDefault();


                    const message =
                        button.dataset.whatsappMessage ||
                        "Hello Jay Classic, I would like to know more about your services.";


                    const url =
                        `https://wa.me/${number}?text=${encodeURIComponent(message)}`;


                    window.open(
                        url,
                        "_blank",
                        "noopener,noreferrer"
                    );
                }
            );
        });


    /* =====================================================
       GENERAL MESSAGE
       ===================================================== */

    function showMessage(
        message,
        type = "success"
    ) {

        const old =
            document.querySelector(
                ".js-message"
            );

        if (old) old.remove();


        const box =
            document.createElement(
                "div"
            );


        box.className =
            `js-message ${type}`;


        box.textContent =
            message;


        Object.assign(
            box.style,
            {
                position: "fixed",
                top: "90px",
                right: "20px",
                maxWidth: "380px",
                padding: "15px 20px",
                borderRadius: "12px",
                zIndex: "99999",
                fontSize: "14px",
                fontWeight: "600",
                boxShadow:
                    "0 10px 30px rgba(0,0,0,.15)",
                background:
                    type === "error"
                        ? "#ffe5e5"
                        : "#e7f8ed",
                color:
                    type === "error"
                        ? "#b42318"
                        : "#137333"
            }
        );


        document.body.appendChild(
            box
        );


        setTimeout(
            () => {

                box.style.opacity =
                    "0";

                box.style.transform =
                    "translateY(-10px)";

                box.style.transition =
                    "all .3s ease";


                setTimeout(
                    () => box.remove(),
                    300
                );

            },
            3500
        );
    }


    /* =====================================================
       SCROLL ANIMATIONS
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
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "in-view"
                                );

                                observer.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        animatedElements.forEach(
            element =>
                observer.observe(element)
        );
    }


    /* =====================================================
       INITIALIZE DATABASE DATA
       ===================================================== */

    await loadReviews();


    /* =====================================================
       SUCCESS MESSAGE
       ===================================================== */

    console.log(
        "%c JAY CLASSIC ",
        "background:#111;color:#fff;font-size:20px;font-weight:bold;padding:8px 15px;border-radius:8px;"
    );

    console.log(
        "Jay Classic website initialized successfully."
    );

});
