/* =========================================================
   JAY CLASSIC
   MASTER APP.JS
   Dashboard + Registration + Classes + Zoom +
   Reviews + Payments + Referrals + Notifications
========================================================= */

"use strict";


/* =========================================================
   1. SUPABASE CONFIGURATION
========================================================= */

const SUPABASE_URL =
    "https://cjcyjsgcsgqeqanxwitq.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_FillYourExistingPublishableKeyHere";


let supabaseClient = null;


if (
    window.supabase &&
    SUPABASE_URL &&
    SUPABASE_KEY &&
    !SUPABASE_KEY.includes("FillYour")
) {

    try {

        supabaseClient =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_KEY
            );

    } catch (error) {

        console.warn(
            "Supabase could not be initialized:",
            error
        );

    }

}


/* =========================================================
   2. DOM HELPERS
========================================================= */

const $ = (selector) =>
    document.querySelector(selector);


const $$ = (selector) =>
    document.querySelectorAll(selector);


/* =========================================================
   3. LOCAL STORAGE
========================================================= */

const STORAGE_KEYS = {

    theme: "jayClassicTheme",

    member: "jayClassicMember",

    notifications: "jayClassicNotifications",

    applications: "jayClassicApplications",

    classes: "jayClassicClasses",

    activity: "jayClassicActivity"

};


function getStorage(key, fallback = null) {

    try {

        const data =
            localStorage.getItem(key);

        return data
            ? JSON.parse(data)
            : fallback;

    } catch {

        return fallback;

    }

}


function setStorage(key, value) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    } catch (error) {

        console.warn(
            "Storage error:",
            error
        );

    }

}


/* =========================================================
   4. TOAST SYSTEM
========================================================= */

let toastTimer;


function showToast(
    title,
    message,
    type = "success"
) {

    const toast = $("#toast");

    if (!toast) return;


    const titleEl =
        $("#toastTitle");

    const messageEl =
        $("#toastMessage");

    const icon =
        toast.querySelector(".toast-icon i");


    titleEl.textContent = title;

    messageEl.textContent = message;


    if (type === "error") {

        icon.className =
            "fa-solid fa-circle-exclamation";

    } else if (type === "info") {

        icon.className =
            "fa-solid fa-circle-info";

    } else {

        icon.className =
            "fa-solid fa-check";

    }


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 4500);

}


/* =========================================================
   5. PAGE LOADER
========================================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            const loader =
                $("#pageLoader");

            if (loader) {

                loader.classList.add("hidden");

            }

        }, 500);

    }
);


/* =========================================================
   6. CURRENT YEAR
========================================================= */

const year =
    $("#currentYear");

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   7. THEME
========================================================= */

function loadTheme() {

    const theme =
        localStorage.getItem(
            STORAGE_KEYS.theme
        );


    if (theme === "dark") {

        document.body.classList.add("dark");

    }


    updateThemeIcon();

}


function updateThemeIcon() {

    const icon =
        $("#themeIcon");

    if (!icon) return;


    icon.className =
        document.body.classList.contains("dark")
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";

}


const themeToggle =
    $("#themeToggle");


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );


            localStorage.setItem(
                STORAGE_KEYS.theme,
                document.body.classList.contains("dark")
                    ? "dark"
                    : "light"
            );


            updateThemeIcon();

        }
    );

}


loadTheme();


/* =========================================================
   8. MOBILE MENU
========================================================= */

const menuToggle =
    $("#menuToggle");

const mobileMenu =
    $("#mobileMenu");


if (
    menuToggle &&
    mobileMenu
) {

    menuToggle.addEventListener(
        "click",
        () => {

            const open =
                mobileMenu.classList.toggle(
                    "show"
                );


            menuToggle.setAttribute(
                "aria-expanded",
                open
            );


            const icon =
                menuToggle.querySelector("i");


            icon.className =
                open
                    ? "fa-solid fa-xmark"
                    : "fa-solid fa-bars";

        }
    );


    $$(".mobile-nav-link").forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "show"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    const icon =
                        menuToggle.querySelector("i");

                    icon.className =
                        "fa-solid fa-bars";

                }
            );

        }
    );

}


/* =========================================================
   9. HEADER SCROLL
========================================================= */

const header =
    $("#header");


window.addEventListener(
    "scroll",
    () => {

        if (!header) return;


        header.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

    },
    { passive: true }
);


/* =========================================================
   10. BACK TO TOP
========================================================= */

const backToTop =
    $("#backToTop");


window.addEventListener(
    "scroll",
    () => {

        if (!backToTop) return;


        backToTop.classList.toggle(
            "show",
            window.scrollY > 500
        );

    },
    { passive: true }
);


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


/* =========================================================
   11. REVEAL ANIMATIONS
========================================================= */

const revealElements =
    $$(".reveal");


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

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

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        element => {

            observer.observe(element);

        }
    );

} else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* =========================================================
   12. NAVIGATION ACTIVE STATE
========================================================= */

const sections =
    $$("main section[id]");

const navLinks =
    $$(".nav-link");


window.addEventListener(
    "scroll",
    () => {

        let current =
            "home";


        sections.forEach(
            section => {

                const top =
                    section.offsetTop - 150;


                if (
                    window.scrollY >= top
                ) {

                    current =
                        section.id;

                }

            }
        );


        navLinks.forEach(
            link => {

                link.classList.toggle(
                    "active",
                    link.getAttribute("href") ===
                    `#${current}`
                );

            }
        );

    },
    { passive: true }
);


/* =========================================================
   13. NOTIFICATIONS
========================================================= */

function getNotifications() {

    return getStorage(
        STORAGE_KEYS.notifications,
        []
    );

}


function saveNotification(
    title,
    message,
    icon = "fa-bell"
) {

    const notifications =
        getNotifications();


    notifications.unshift({

        id: Date.now(),

        title,

        message,

        icon,

        createdAt:
            new Date().toISOString()

    });


    setStorage(
        STORAGE_KEYS.notifications,
        notifications.slice(0, 20)
    );


    renderNotifications();

}


function renderNotifications() {

    const list =
        $("#notificationList");

    const badge =
        $("#notificationBadge");


    if (!list || !badge) return;


    const notifications =
        getNotifications();


    badge.textContent =
        notifications.length;


    if (!notifications.length) {

        list.innerHTML = `

            <div class="empty-state">

                <i class="fa-regular fa-bell-slash"></i>

                <p>
                    No new notifications
                </p>

            </div>

        `;

        return;

    }


    list.innerHTML =
        notifications.map(
            notification => `

            <div class="notification-item">

                <i class="fa-solid ${notification.icon}"></i>

                <div>

                    <strong>
                        ${escapeHtml(notification.title)}
                    </strong>

                    <p>
                        ${escapeHtml(notification.message)}
                    </p>

                </div>

            </div>

        `
        ).join("");

}


const notificationButton =
    $("#notificationButton");

const notificationPanel =
    $("#notificationPanel");

const closeNotifications =
    $("#closeNotifications");


if (notificationButton) {

    notificationButton.addEventListener(
        "click",
        () => {

            notificationPanel.classList.toggle(
                "show"
            );

        }
    );

}


if (closeNotifications) {

    closeNotifications.addEventListener(
        "click",
        () => {

            notificationPanel.classList.remove(
                "show"
            );

        }
    );

}


renderNotifications();


/* =========================================================
   14. ACTIVITY
========================================================= */

function getActivity() {

    return getStorage(
        STORAGE_KEYS.activity,
        []
    );

}


function addActivity(
    title,
    description
) {

    const activity =
        getActivity();


    activity.unshift({

        title,

        description,

        time:
            new Date().toISOString()

    });


    setStorage(
        STORAGE_KEYS.activity,
        activity.slice(0, 10)
    );


    renderActivity();

}


function renderActivity() {

    const container =
        $("#activityTimeline");


    if (!container) return;


    const activity =
        getActivity();


    if (!activity.length) {

        container.innerHTML = `

            <div class="activity-item">

                <span class="activity-dot"></span>

                <div>

                    <strong>
                        Welcome to Jay Classic
                    </strong>

                    <p>
                        Your dashboard is ready.
                    </p>

                </div>

            </div>

        `;

        return;

    }


    container.innerHTML =
        activity.map(
            item => `

            <div class="activity-item">

                <span class="activity-dot"></span>

                <div>

                    <strong>
                        ${escapeHtml(item.title)}
                    </strong>

                    <p>
                        ${escapeHtml(item.description)}
                    </p>

                </div>

            </div>

        `
        ).join("");

}


renderActivity();


/* =========================================================
   15. REGISTRATION
========================================================= */

const registrationForm =
    $("#registrationForm");


if (registrationForm) {

    registrationForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const button =
                $("#registrationSubmitBtn");


            const member = {

                name:
                    $("#regName").value.trim(),

                email:
                    $("#regEmail").value.trim().toLowerCase(),

                phone:
                    $("#regPhone").value.trim(),

                skill:
                    $("#regSkill").value,

                referralCode:
                    $("#referralCode").value.trim(),

                message:
                    $("#regMessage").value.trim(),

                membership:
                    "Regular",

                registeredAt:
                    new Date().toISOString()

            };


            if (
                !member.name ||
                !member.email ||
                !member.phone ||
                !member.skill
            ) {

                showToast(
                    "Missing Details",
                    "Please complete all required fields.",
                    "error"
                );

                return;

            }


            button.disabled = true;

            button.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Registering...
            `;


            try {

                /*
                   Store locally first so the dashboard
                   can work immediately.
                */

                setStorage(
                    STORAGE_KEYS.member,
                    member
                );


                /*
                   Optional Supabase registration.

                   This does not assume a particular database
                   table because your existing database structure
                   may be different.
                */


                if (supabaseClient) {

                    try {

                        await supabaseClient
                            .from("registrations")
                            .insert([{

                                name:
                                    member.name,

                                email:
                                    member.email,

                                phone:
                                    member.phone,

                                skill:
                                    member.skill,

                                referral_code:
                                    member.referralCode,

                                message:
                                    member.message

                            }]);

                    } catch (databaseError) {

                        console.warn(
                            "Registration database notice:",
                            databaseError
                        );

                    }

                }


                addActivity(
                    "Registration completed",
                    "Your Jay Classic member profile was created."
                );


                saveNotification(
                    "Registration Successful",
                    "Your Jay Classic member profile has been created.",
                    "fa-user-check"
                );


                updateDashboard(
                    member
                );


                showToast(
                    "Registration Successful",
                    `Welcome to Jay Classic, ${member.name}.`
                );


                registrationForm.reset();


                document
                    .querySelector("#dashboard")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });


            } catch (error) {

                console.error(error);

                showToast(
                    "Registration Error",
                    "Something went wrong. Please try again.",
                    "error"
                );

            } finally {

                button.disabled = false;

                button.innerHTML = `
                    <i class="fa-solid fa-user-plus"></i>
                    Create My Account
                `;

            }

        }
    );

}


/* =========================================================
   16. CLASS REGISTRATION
========================================================= */

const classForm =
    $("#classRegistrationForm");


if (classForm) {

    classForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const button =
                $("#classSubmitBtn");


            const registration = {

                name:
                    $("#className").value.trim(),

                email:
                    $("#classEmail").value.trim().toLowerCase(),

                phone:
                    $("#classPhone").value.trim(),

                className:
                    $("#classNameSelect").value,

                registeredAt:
                    new Date().toISOString(),

                status:
                    "Registered"

            };


            if (
                !registration.name ||
                !registration.email ||
                !registration.phone ||
                !registration.className
            ) {

                showToast(
                    "Missing Details",
                    "Please complete all class registration fields.",
                    "error"
                );

                return;

            }


            button.disabled = true;

            button.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Registering...
            `;


            try {

                const classes =
                    getStorage(
                        STORAGE_KEYS.classes,
                        []
                    );


                classes.unshift(
                    registration
                );


                setStorage(
                    STORAGE_KEYS.classes,
                    classes
                );


                if (supabaseClient) {

                    try {

                        await supabaseClient
                            .from("class_registrations")
                            .insert([{

                                name:
                                    registration.name,

                                email:
                                    registration.email,

                                phone:
                                    registration.phone,

                                class_name:
                                    registration.className

                            }]);

                    } catch (error) {

                        console.warn(
                            "Class database notice:",
                            error
                        );

                    }

                }


                addActivity(
                    "Class registration completed",
                    `${registration.className} registration submitted.`
                );


                saveNotification(
                    "Class Registration Confirmed",
                    `You registered for ${registration.className}.`,
                    "fa-graduation-cap"
                );


                showToast(
                    "Class Registered",
                    `You are registered for ${registration.className}.`
                );


                classForm.reset();


                updateAllDashboardStats();


            } catch (error) {

                console.error(error);

                showToast(
                    "Registration Error",
                    "Could not complete class registration.",
                    "error"
                );

            } finally {

                button.disabled = false;

                button.innerHTML = `
                    <i class="fa-solid fa-check"></i>
                    Register Now
                `;

            }

        }
    );

}


/* =========================================================
   17. DASHBOARD LOGIN
========================================================= */

const dashboardLoginForm =
    $("#dashboardLoginForm");


if (dashboardLoginForm) {

    dashboardLoginForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const email =
                $("#dashboardEmail")
                    .value
                    .trim()
                    .toLowerCase();


            if (!email) {

                showToast(
                    "Email Required",
                    "Enter the email you registered with.",
                    "error"
                );

                return;

            }


            const member =
                getStorage(
                    STORAGE_KEYS.member
                );


            if (
                !member ||
                member.email !== email
            ) {

                showToast(
                    "Member Not Found",
                    "No local member profile matches that email.",
                    "error"
                );

                return;

            }


            updateDashboard(
                member
            );


            showToast(
                "Dashboard Opened",
                `Welcome back, ${member.name}.`
            );


            document
                .querySelector("#dashboard")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

}


/* =========================================================
   18. UPDATE DASHBOARD
========================================================= */

function updateDashboard(member) {

    if (!member) return;


    const initials =
        member.name
            .split(" ")
            .map(word => word[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();


    const dashboardLogin =
        $("#dashboardLogin");

    const dashboardContent =
        $("#dashboardContent");


    if (dashboardLogin)
        dashboardLogin.classList.add("hidden");


    if (dashboardContent)
        dashboardContent.classList.remove("hidden");


    const nameElements = [

        $("#dashboardName"),

        $("#fullDashboardName"),

        $("#heroUserName")

    ];


    nameElements.forEach(
        element => {

            if (element)
                element.textContent =
                    member.name;

        }
    );


    const avatars = [

        $("#dashboardAvatar")

    ];


    avatars.forEach(
        element => {

            if (element)
                element.textContent =
                    initials;

        }
    );


    updateAllDashboardStats();

}


/* =========================================================
   19. DASHBOARD LOGOUT
========================================================= */

const dashboardLogout =
    $("#dashboardLogout");


if (dashboardLogout) {

    dashboardLogout.addEventListener(
        "click",
        () => {

            $("#dashboardContent")
                ?.classList.add("hidden");


            $("#dashboardLogin")
                ?.classList.remove("hidden");


            showToast(
                "Logged Out",
                "Your dashboard has been closed.",
                "info"
            );

        }
    );

}


/* =========================================================
   20. DASHBOARD STATS
========================================================= */

function updateAllDashboardStats() {

    const classes =
        getStorage(
            STORAGE_KEYS.classes,
            []
        );


    const applications =
        getStorage(
            STORAGE_KEYS.applications,
            []
        );


    const member =
        getStorage(
            STORAGE_KEYS.member
        );


    const referralCount =
        getReferralCount();


    const classCount =
        member
            ? classes.filter(
                item =>
                    item.email === member.email
              ).length
            : classes.length;


    const applicationCount =
        member
            ? applications.filter(
                item =>
                    item.email === member.email
              ).length
            : applications.length;


    setText(
        "#heroApplications",
        applicationCount
    );


    setText(
        "#dashboardApplications",
        applicationCount
    );


    setText(
        "#fullApplications",
        applicationCount
    );


    setText(
        "#heroClasses",
        classCount
    );


    setText(
        "#dashboardClasses",
        classCount
    );


    setText(
        "#fullClasses",
        classCount
    );


    setText(
        "#heroReferrals",
        referralCount
    );


    setText(
        "#referralCount",
        referralCount
    );


    setText(
        "#fullReferrals",
        referralCount
    );


    setText(
        "#heroMembership",
        member?.membership || "Regular"
    );


    setText(
        "#fullMembership",
        member?.membership || "Regular"
    );


    updateReferralProgress(
        referralCount
    );

}


function setText(
    selector,
    value
) {

    const element =
        $(selector);

    if (element)
        element.textContent =
            value;

}


/* =========================================================
   21. REFERRAL SYSTEM
========================================================= */

function getReferralCount() {

    const member =
        getStorage(
            STORAGE_KEYS.member
        );


    if (!member) return 0;


    return Number(
        localStorage.getItem(
            `jayReferral_${member.email}`
        ) || 0
    );

}


function generateReferralCode(
    name
) {

    const base =
        name
            .replace(/[^a-zA-Z]/g, "")
            .substring(0, 5)
            .toUpperCase();


    return `${base}${Math.floor(
        1000 + Math.random() * 9000
    )}`;

}


function getReferralLink() {

    const member =
        getStorage(
            STORAGE_KEYS.member
        );


    if (!member) return "";


    let code =
        member.referralCode;


    if (!code) {

        code =
            generateReferralCode(
                member.name
            );

        member.referralCode =
            code;

        setStorage(
            STORAGE_KEYS.member,
            member
        );

    }


    return `${window.location.origin}${window.location.pathname}?ref=${encodeURIComponent(code)}`;

}


function updateReferralProgress(
    count
) {

    const goal = 10;


    const percentage =
        Math.min(
            100,
            Math.round(
                (count / goal) * 100
            )
        );


    setText(
        "#referralProgressText",
        `${percentage}%`
    );


    const bar =
        $("#referralProgress");


    if (bar) {

        bar.style.width =
            `${percentage}%`;

    }


    const input =
        $("#referralLink");


    if (input) {

        input.value =
            getReferralLink();

    }

}


updateAllDashboardStats();


/* =========================================================
   22. COPY REFERRAL
========================================================= */

const copyReferral =
    $("#copyReferral");


if (copyReferral) {

    copyReferral.addEventListener(
        "click",
        async () => {

            const link =
                $("#referralLink")?.value;


            if (!link) {

                showToast(
                    "Dashboard Required",
                    "Open your member dashboard first.",
                    "error"
                );

                return;

            }


            try {

                await navigator.clipboard.writeText(
                    link
                );


                showToast(
                    "Copied",
                    "Your referral link has been copied."
                );

            } catch {

                showToast(
                    "Copy Failed",
                    "Please copy the link manually.",
                    "error"
                );

            }

        }
    );

}


/* =========================================================
   23. SOCIAL SHARING
========================================================= */

const shareWhatsApp =
    $("#shareWhatsApp");


if (shareWhatsApp) {

    shareWhatsApp.addEventListener(
        "click",
        () => {

            const link =
                getReferralLink();


            const text =
                `Join Jay Classic and explore digital skills and online work: ${link}`;


            window.open(
                `https://wa.me/?text=${encodeURIComponent(text)}`,
                "_blank"
            );

        }
    );

}


const shareFacebook =
    $("#shareFacebook");


if (shareFacebook) {

    shareFacebook.addEventListener(
        "click",
        () => {

            const link =
                getReferralLink();


            window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
                "_blank"
            );

        }
    );

}


const nativeShare =
    $("#nativeShare");


if (nativeShare) {

    nativeShare.addEventListener(
        "click",
        async () => {

            const link =
                getReferralLink();


            if (
                navigator.share
            ) {

                try {

                    await navigator.share({

                        title:
                            "Jay Classic",

                        text:
                            "Join Jay Classic",

                        url:
                            link

                    });

                } catch {

                    // User cancelled sharing.

                }

            } else {

                try {

                    await navigator.clipboard.writeText(
                        link
                    );


                    showToast(
                        "Link Copied",
                        "Sharing is not supported here, so the link was copied."
                    );

                } catch {

                    showToast(
                        "Sharing Unavailable",
                        "Please copy your referral link manually.",
                        "error"
                    );

                }

            }

        }
    );

}


/* =========================================================
   24. PAYMENT FORM
========================================================= */

const paymentForm =
    $("#paymentForm");


if (paymentForm) {

    paymentForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const button =
                $("#paymentSubmitBtn");


            const payment = {

                name:
                    $("#paymentName").value.trim(),

                email:
                    $("#paymentEmail")
                        .value
                        .trim()
                        .toLowerCase(),

                phone:
                    $("#paymentPhone").value.trim(),

                plan:
                    $("#paymentPlan").value,

                transactionCode:
                    $("#transactionCode")
                        .value
                        .trim(),

                status:
                    "Pending Verification",

                createdAt:
                    new Date().toISOString()

            };


            if (
                !payment.name ||
                !payment.email ||
                !payment.phone ||
                !payment.plan ||
                !payment.transactionCode
            ) {

                showToast(
                    "Missing Details",
                    "Complete all payment fields.",
                    "error"
                );

                return;

            }


            button.disabled = true;

            button.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Submitting...
            `;


            try {

                const applications =
                    getStorage(
                        STORAGE_KEYS.applications,
                        []
                    );


                applications.unshift({

                    type:
                        "Payment",

                    ...payment

                });


                setStorage(
                    STORAGE_KEYS.applications,
                    applications
                );


                if (supabaseClient) {

                    try {

                        await supabaseClient
                            .from("payments")
                            .insert([{

                                name:
                                    payment.name,

                                email:
                                    payment.email,

                                phone:
                                    payment.phone,

                                plan:
                                    payment.plan,

                                transaction_code:
                                    payment.transactionCode,

                                status:
                                    payment.status

                            }]);

                    } catch (error) {

                        console.warn(
                            "Payment database notice:",
                            error
                        );

                    }

                }


                addActivity(
                    "Payment submitted",
                    "Your payment is waiting for verification."
                );


                saveNotification(
                    "Payment Submitted",
                    "Your payment details have been received and are pending verification.",
                    "fa-money-bill-transfer"
                );


                showToast(
                    "Payment Submitted",
                    "Your payment is now pending verification."
                );


                paymentForm.reset();


                updateAllDashboardStats();


            } catch (error) {

                console.error(error);

                showToast(
                    "Payment Error",
                    "Unable to submit payment.",
                    "error"
                );

            } finally {

                button.disabled = false;

                button.innerHTML = `
                    <i class="fa-solid fa-paper-plane"></i>
                    Submit Payment
                `;

            }

        }
    );

}


/* =========================================================
   25. APPLICATION TRACKING
========================================================= */

const trackingButton =
    $("#trackApplicationBtn");


if (trackingButton) {

    trackingButton.addEventListener(
        "click",
        () => {

            const email =
                $("#trackingEmail")
                    .value
                    .trim()
                    .toLowerCase();


            if (!email) {

                showToast(
                    "Email Required",
                    "Enter your registered email.",
                    "error"
                );

                return;

            }


            trackApplications(
                email
            );

        }
    );

}


function trackApplications(
    email
) {

    const container =
        $("#trackingResults");


    const applications =
        getStorage(
            STORAGE_KEYS.applications,
            []
        );


    const classes =
        getStorage(
            STORAGE_KEYS.classes,
            []
        );


    const paymentResults =
        applications.filter(
            item =>
                item.email === email
        );


    const classResults =
        classes.filter(
            item =>
                item.email === email
        );


    const results = [

        ...paymentResults.map(
            item => ({

                type:
                    item.type || "Application",

                title:
                    item.plan
                        ? `${item.plan} Membership`
                        : "Application",

                status:
                    item.status ||
                    "Submitted",

                date:
                    item.createdAt

            })
        ),

        ...classResults.map(
            item => ({

                type:
                    "Class",

                title:
                    item.className,

                status:
                    item.status ||
                    "Registered",

                date:
                    item.registeredAt

            })
        )

    ];


    if (!results.length) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-file-circle-xmark"></i>

                <h3>
                    No records found
                </h3>

                <p>
                    We could not find applications for this email.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        results.map(
            result => `

            <div class="tracking-card">

                <span class="tracking-status">
                    ${escapeHtml(result.status)}
                </span>

                <h3>
                    ${escapeHtml(result.title)}
                </h3>

                <p>
                    ${escapeHtml(result.type)}
                </p>

                <small>
                    ${formatDate(result.date)}
                </small>

            </div>

        `
        ).join("");

}


/* =========================================================
   26. REVIEWS
========================================================= */

const reviewForm =
    $("#reviewForm");


function getLocalReviews() {

    return getStorage(
        "jayClassicReviews",
        []
    );

}


if (reviewForm) {

    reviewForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const button =
                $("#reviewSubmitBtn");


            const review = {

                name:
                    $("#reviewName")
                        .value
                        .trim(),

                rating:
                    Number(
                        $("#reviewRating")
                            .value
                    ),

                message:
                    $("#reviewMessage")
                        .value
                        .trim(),

                createdAt:
                    new Date().toISOString()

            };


            if (
                !review.name ||
                !review.rating ||
                !review.message
            ) {

                showToast(
                    "Missing Details",
                    "Complete the review form.",
                    "error"
                );

                return;

            }


            button.disabled = true;

            button.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Submitting...
            `;


            try {

                const reviews =
                    getLocalReviews();


                reviews.unshift(
                    review
                );


                setStorage(
                    "jayClassicReviews",
                    reviews
                );


                if (supabaseClient) {

                    try {

                        await supabaseClient
                            .from("reviews")
                            .insert([{

                                name:
                                    review.name,

                                rating:
                                    review.rating,

                                message:
                                    review.message

                            }]);

                    } catch (error) {

                        console.warn(
                            "Review database notice:",
                            error
                        );

                    }

                }


                saveNotification(
                    "Review Submitted",
                    "Thank you for sharing your experience.",
                    "fa-star"
                );


                addActivity(
                    "Review submitted",
                    "Thank you for reviewing Jay Classic."
                );


                showToast(
                    "Review Submitted",
                    "Thank you for your feedback."
                );


                reviewForm.reset();


                renderReviews();


            } catch (error) {

                console.error(error);

                showToast(
                    "Review Error",
                    "Could not submit your review.",
                    "error"
                );

            } finally {

                button.disabled = false;

                button.innerHTML = `
                    <i class="fa-solid fa-star"></i>
                    Submit Review
                `;

            }

        }
    );

}


function renderReviews() {

    const container =
        $("#reviewsContainer");


    if (!container) return;


    const reviews =
        getLocalReviews();


    if (!reviews.length) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fa-regular fa-star"></i>

                <p>
                    Be the first to leave a review.
                </p>

            </div>

        `;

        updateRatingStats([]);

        return;

    }


    container.innerHTML =
        reviews.map(
            review => `

            <article class="review-card">

                <div class="review-card-header">

                    <div class="review-avatar">

                        ${escapeHtml(
                            review.name
                                .charAt(0)
                                .toUpperCase()
                        )}

                    </div>

                    <div>

                        <strong>
                            ${escapeHtml(review.name)}
                        </strong>

                        <div class="stars">

                            ${"★".repeat(
                                review.rating
                            )}

                            ${"☆".repeat(
                                5 - review.rating
                            )}

                        </div>

                    </div>

                </div>

                <p>
                    ${escapeHtml(
                        review.message
                    )}
                </p>

            </article>

        `
        ).join("");


    updateRatingStats(
        reviews
    );

}


function updateRatingStats(
    reviews
) {

    const averageElement =
        $("#averageRating");

    const starsElement =
        $("#averageStars");

    const countElement =
        $("#reviewCount");


    if (!reviews.length) {

        if (averageElement)
            averageElement.textContent =
                "0.0";

        if (starsElement)
            starsElement.textContent =
                "☆☆☆☆☆";

        if (countElement)
            countElement.textContent =
                "0 reviews";

        return;

    }


    const total =
        reviews.reduce(
            (sum, review) =>
                sum + Number(review.rating),
            0
        );


    const average =
        total / reviews.length;


    if (averageElement)
        averageElement.textContent =
            average.toFixed(1);


    if (starsElement) {

        const rounded =
            Math.round(average);

        starsElement.textContent =
            "★".repeat(rounded) +
            "☆".repeat(5 - rounded);

    }


    if (countElement)
        countElement.textContent =
            `${reviews.length} review${reviews.length === 1 ? "" : "s"}`;

}


renderReviews();


/* =========================================================
   27. CONTACT FORM
========================================================= */

const contactForm =
    $("#contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                $("#contactName")
                    .value
                    .trim();


            const email =
                $("#contactEmail")
                    .value
                    .trim();


            const subject =
                $("#contactSubject")
                    .value
                    .trim();


            const message =
                $("#contactMessage")
                    .value
                    .trim();


            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                showToast(
                    "Missing Details",
                    "Complete all contact fields.",
                    "error"
                );

                return;

            }


            saveNotification(
                "Message Ready",
                "Your message has been prepared for Jay Classic.",
                "fa-envelope"
            );


            addActivity(
                "Contact request created",
                `Subject: ${subject}`
            );


            showToast(
                "Message Ready",
                "Your message has been recorded. You can also contact us directly by WhatsApp or email."
            );


            contactForm.reset();

        }
    );

}


/* =========================================================
   28. QUICK HELP ASSISTANT
========================================================= */

const quickHelpButton =
    $("#quickHelpButton");

const quickHelpPanel =
    $("#quickHelpPanel");

const closeQuickHelp =
    $("#closeQuickHelp");


if (quickHelpButton) {

    quickHelpButton.addEventListener(
        "click",
        () => {

            quickHelpPanel.classList.toggle(
                "show"
            );

        }
    );

}


if (closeQuickHelp) {

    closeQuickHelp.addEventListener(
        "click",
        () => {

            quickHelpPanel.classList.remove(
                "show"
            );

        }
    );

}


const helpAnswers = {

    registration: `
        To register, open the Registration section,
        enter your name, email, phone and skill, then
        click "Create My Account". Your confirmation
        appears immediately on the website.
    `,

    classes: `
        Jay Classic online classes are scheduled every
        day at 9:00 PM. Select your preferred class and
        complete the class registration form.
    `,

    zoom: `
        Register for the class first. When the class is
        ready, use the "Join Zoom Class" button in the
        Academy section. Replace the placeholder Zoom
        URL in index.html with your actual Zoom meeting link.
    `,

    payment: `
        Use the M-Pesa number shown in the Payment Center,
        complete your payment, then submit your transaction
        code for verification.
    `,

    tracking: `
        Go to Application Center, enter the same email
        address you used during registration and click
        Track.
    `,

    contact: `
        You can contact Jay Classic through
        emmanuelouko21@gmail.com or WhatsApp using the
        contact buttons on the website.
    `

};


$$("[data-help]").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const type =
                    button.dataset.help;


                const answer =
                    $("#quickHelpAnswer");


                if (answer) {

                    answer.textContent =
                        helpAnswers[type] ||
                        "Please use the contact section for assistance.";

                }

            }
        );

    }
);


/* =========================================================
   29. URL REFERRAL CODE
========================================================= */

function detectReferralCode() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const referral =
        params.get("ref");


    if (!referral) return;


    const referralInput =
        $("#referralCode");


    if (referralInput) {

        referralInput.value =
            referral;

    }


    showToast(
        "Referral Detected",
        "Your referral code has been added to registration.",
        "info"
    );

}


detectReferralCode();


/* =========================================================
   30. ZOOM BUTTON SAFETY
========================================================= */

const zoomButton =
    $("#zoomJoinButton");


if (zoomButton) {

    zoomButton.addEventListener(
        "click",
        event => {

            const href =
                zoomButton.getAttribute(
                    "href"
                );


            if (
                !href ||
                href === "ZOOM-LINK-HERE"
            ) {

                event.preventDefault();


                showToast(
                    "Zoom Link Not Added",
                    "Replace ZOOM-LINK-HERE in index.html with your real Zoom meeting link.",
                    "info"
                );

            }

        }
    );

}


/* =========================================================
   31. ESCAPE HTML
========================================================= */

function escapeHtml(
    value
) {

    return String(value ?? "")
        .replace(
            /[&<>"']/g,
            character => ({

                "&": "&amp;",

                "<": "&lt;",

                ">": "&gt;",

                '"': "&quot;",

                "'": "&#039;"

            })[character]
        );

}


/* =========================================================
   32. DATE FORMATTER
========================================================= */

function formatDate(
    value
) {

    if (!value)
        return "Date unavailable";


    try {

        return new Intl.DateTimeFormat(
            "en-KE",
            {
                dateStyle: "medium",
                timeStyle: "short"
            }
        ).format(
            new Date(value)
        );

    } catch {

        return "Date unavailable";

    }

}


/* =========================================================
   33. INITIALIZE MEMBER
========================================================= */

const existingMember =
    getStorage(
        STORAGE_KEYS.member
    );


if (existingMember) {

    updateDashboard(
        existingMember
    );

}


/* =========================================================
   34. KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            notificationPanel
                ?.classList.remove("show");

            quickHelpPanel
                ?.classList.remove("show");

            mobileMenu
                ?.classList.remove("show");

        }

    }
);


/* =========================================================
   35. FINAL INITIALIZATION
========================================================= */

renderNotifications();

renderActivity();

renderReviews();

updateAllDashboardStats();


console.log(
    "Jay Classic platform initialized successfully."
);
