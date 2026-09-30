```javascript
/* =========================================================
   JAY CLASSIC APP
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");
    const themeToggle = document.getElementById("themeToggle");
    const backToTop = document.getElementById("backToTop");
    const currentYear = document.getElementById("currentYear");

    const registrationForm =
        document.getElementById("registrationForm");

    const reviewForm =
        document.getElementById("reviewForm");

    const contactForm =
        document.getElementById("contactForm");


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            navbar.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (navbar.classList.contains("active")) {

                if (icon) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                }

                menuToggle.setAttribute(
                    "aria-label",
                    "Close navigation menu"
                );

            } else {

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }

        });


        /* Close menu after clicking a link */

        const navLinks =
            navbar.querySelectorAll(".nav-link");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                navbar.classList.remove("active");

                const icon =
                    menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", (event) => {

            const clickedInsideMenu =
                navbar.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle &&
                navbar.classList.contains("active")
            ) {

                navbar.classList.remove("active");

                const icon =
                    menuToggle.querySelector("i");

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

    const savedTheme =
        localStorage.getItem("jayClassicTheme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

    }


    function updateThemeIcon() {

        if (!themeToggle) {
            return;
        }

        const icon =
            themeToggle.querySelector("i");

        if (!icon) {
            return;
        }

        if (
            document.body.classList.contains("dark-mode")
        ) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

        }

    }


    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const isDark =
                document.body.classList.contains("dark-mode");

            localStorage.setItem(
                "jayClassicTheme",
                isDark ? "dark" : "light"
            );

            updateThemeIcon();

        });

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    function handleBackToTop() {

        if (!backToTop) {
            return;
        }

        if (window.scrollY > 400) {

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

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections =
        document.querySelectorAll("main section[id]");

    const navLinks =
        document.querySelectorAll(".nav-link");


    function updateActiveNavigation() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 150;


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === "#" + currentSection
            ) {

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
       REGISTRATION FORM
    ===================================================== */

    if (registrationForm) {

        registrationForm.addEventListener(
            "submit",
            (event) => {

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
                    )?.value;

                const message =
                    document.getElementById(
                        "registerMessage"
                    )?.value.trim();

                const status =
                    document.getElementById(
                        "registrationMessage"
                    );


                if (
                    !name ||
                    !email ||
                    !phone ||
                    !interest
                ) {

                    showMessage(
                        status,
                        "Please fill in all required fields.",
                        "error"
                    );

                    return;

                }


                if (!isValidEmail(email)) {

                    showMessage(
                        status,
                        "Please enter a valid email address.",
                        "error"
                    );

                    return;

                }


                /*
                   For now, the form prepares an email
                   to Jay Classic.
                */

                const subject =
                    encodeURIComponent(
                        "Jay Classic Online Class Registration"
                    );


                const body =
                    encodeURIComponent(
`Hello Jay,

I would like to register for your online classes.

Name: ${name}
Email: ${email}
Phone/WhatsApp: ${phone}
Topic: ${interest}

Message:
${message || "No additional message."}

Thank you.`
                    );


                window.location.href =
                    `mailto:emmanuelouko21@gmail.com?subject=${subject}&body=${body}`;


                showMessage(
                    status,
                    "Opening your email app...",
                    "success"
                );

            }
        );

    }


    /* =====================================================
       REVIEW FORM
    ===================================================== */

    if (reviewForm) {

        reviewForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "reviewName"
                    )?.value.trim();

                const rating =
                    document.getElementById(
                        "reviewRating"
                    )?.value;

                const comment =
                    document.getElementById(
                        "reviewText"
                    )?.value.trim();

                const status =
                    document.getElementById(
                        "reviewMessage"
                    );


                if (
                    !name ||
                    !rating ||
                    !comment
                ) {

                    showMessage(
                        status,
                        "Please complete all review fields.",
                        "error"
                    );

                    return;

                }


                /*
                   Local review display.

                   This makes the review appear immediately
                   on the page. A database such as Supabase
                   can be connected later for permanent
                   online reviews.
                */

                addReviewToPage(
                    name,
                    rating,
                    comment
                );


                showMessage(
                    status,
                    "Thank you! Your review has been added.",
                    "success"
                );


                reviewForm.reset();

            }
        );

    }


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

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

                const status =
                    document.getElementById(
                        "contactMessageStatus"
                    );


                if (
                    !name ||
                    !email ||
                    !subject ||
                    !message
                ) {

                    showMessage(
                        status,
                        "Please fill in all fields.",
                        "error"
                    );

                    return;

                }


                if (!isValidEmail(email)) {

                    showMessage(
                        status,
                        "Please enter a valid email address.",
                        "error"
                    );

                    return;

                }


                const emailSubject =
                    encodeURIComponent(
                        `Jay Classic Website: ${subject}`
                    );


                const emailBody =
                    encodeURIComponent(
`Hello Jay,

You have received a new message from your Jay Classic website.

Name: ${name}
Email: ${email}

Subject:
${subject}

Message:
${message}

Sent from the Jay Classic website.`
                    );


                window.location.href =
                    `mailto:emmanuelouko21@gmail.com?subject=${emailSubject}&body=${emailBody}`;


                showMessage(
                    status,
                    "Opening your email app...",
                    "success"
                );

            }
        );

    }


    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);

    }


    /* =====================================================
       FORM MESSAGE HELPER
    ===================================================== */

    function showMessage(
        element,
        message,
        type
    ) {

        if (!element) {
            return;
        }

        element.textContent = message;

        element.style.display = "block";

        if (type === "error") {

            element.style.opacity = "0.8";

        } else {

            element.style.opacity = "1";

        }


        setTimeout(() => {

            if (element) {
                element.textContent = "";
            }

        }, 6000);

    }


    /* =====================================================
       ADD REVIEW TO PAGE
    ===================================================== */

    function addReviewToPage(
        name,
        rating,
        comment
    ) {

        const reviewsContainer =
            document.getElementById(
                "reviewsContainer"
            );


        if (!reviewsContainer) {
            return;
        }


        const reviewCard =
            document.createElement("article");

        reviewCard.className =
            "review-card";


        const stars =
            document.createElement("div");

        stars.className =
            "review-stars";


        const ratingNumber =
            Number(rating);


        for (
            let i = 1;
            i <= 5;
            i++
        ) {

            const star =
                document.createElement("i");

            star.className =
                i <= ratingNumber
                    ? "fas fa-star"
                    : "far fa-star";

            stars.appendChild(star);

        }


        const reviewText =
            document.createElement("p");

        reviewText.textContent =
            comment;


        const reviewer =
            document.createElement("h4");

        reviewer.textContent =
            name;


        reviewCard.appendChild(stars);

        reviewCard.appendChild(reviewText);

        reviewCard.appendChild(reviewer);


        reviewsContainer.prepend(
            reviewCard
        );

    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


    /* =====================================================
       ESCAPE KEY CLOSES MOBILE MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                navbar &&
                navbar.classList.contains("active")
            ) {

                navbar.classList.remove("active");


                if (menuToggle) {

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

            }

        }
    );


    /* =====================================================
       EXTERNAL LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[target="_blank"]'
    ).forEach((link) => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* =====================================================
       PAGE LOADED
    ===================================================== */

    console.log(
        "Jay Classic App loaded successfully."
    );

});
```
