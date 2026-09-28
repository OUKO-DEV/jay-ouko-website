/* =========================================================
   JAY CLASSIC
   MASTER APP.JS
   Supabase + Registration + Referrals + Reviews
   Payments + Classes + Contact + Dashboard
========================================================= */

"use strict";

/* =========================================================
   1. SUPABASE CONFIGURATION
========================================================= */

const SUPABASE_URL =
    "https://cjcyjsgcsgqeqanxwitq.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_F7taABXLhqRbRlkBygPF6A_pMphViS5";

let supabaseClient = null;


/* =========================================================
   2. GLOBAL STATE
========================================================= */

const JayClassic = {

    member: null,

    reviews: [],

    plans: [],

    theme: "light",

    referralCode: null,

    isLoading: false

};


/* =========================================================
   3. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeSupabase();

    initializeTheme();

    initializeNavigation();

    initializeForms();

    initializeReferralSystem();

    initializeBackToTop();

    initializeScrollAnimations();

    initializeYear();

    restoreMember();

    loadReviews();

    loadMembershipPlans();

    readReferralFromURL();

    hidePageLoader();

    console.log("Jay Classic initialized.");

});


/* =========================================================
   4. SUPABASE INITIALIZATION
========================================================= */

function initializeSupabase() {

    try {

        if (
            !window.supabase ||
            typeof window.supabase.createClient !== "function"
        ) {

            console.error(
                "Supabase library was not loaded."
            );

            return;

        }

        supabaseClient =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_KEY
            );

        console.log(
            "Jay Classic: Supabase connected."
        );

    } catch (error) {

        console.error(
            "Supabase initialization error:",
            error
        );

        supabaseClient = null;
    }
}


/* =========================================================
   5. PAGE LOADER
========================================================= */

function hidePageLoader() {

    const loader =
        document.getElementById("pageLoader");

    if (!loader) return;

    setTimeout(() => {

        loader.classList.add("hidden");

    }, 500);
}


/* =========================================================
   6. THEME
========================================================= */

function initializeTheme() {

    const savedTheme =
        localStorage.getItem(
            "jayClassicTheme"
        );

    if (savedTheme === "dark") {

        JayClassic.theme = "dark";

        document.body.classList.add(
            "dark-mode"
        );

    } else {

        JayClassic.theme = "light";

        document.body.classList.remove(
            "dark-mode"
        );
    }

    updateThemeIcon();

    const themeButton =
        document.getElementById(
            "themeToggle"
        );

    if (themeButton) {

        themeButton.addEventListener(
            "click",
            toggleTheme
        );
    }
}


function toggleTheme() {

    const isDark =
        document.body.classList.toggle(
            "dark-mode"
        );

    JayClassic.theme =
        isDark ? "dark" : "light";

    localStorage.setItem(
        "jayClassicTheme",
        JayClassic.theme
    );

    updateThemeIcon();

    showToast(
        "Theme Updated",
        isDark
            ? "Dark mode enabled."
            : "Light mode enabled.",
        "success"
    );
}


function updateThemeIcon() {

    const icon =
        document.getElementById(
            "themeIcon"
        );

    if (!icon) return;

    if (JayClassic.theme === "dark") {

        icon.className =
            "fa-solid fa-sun";

    } else {

        icon.className =
            "fa-solid fa-moon";
    }
}


/* =========================================================
   7. NAVIGATION
========================================================= */

function initializeNavigation() {

    const menuButton =
        document.getElementById(
            "menuToggle"
        );

    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );

    if (
        menuButton &&
        mobileMenu
    ) {

        menuButton.addEventListener(
            "click",
            () => {

                const opened =
                    mobileMenu.classList.toggle(
                        "active"
                    );

                menuButton.setAttribute(
                    "aria-expanded",
                    opened ? "true" : "false"
                );

                mobileMenu.setAttribute(
                    "aria-hidden",
                    opened ? "false" : "true"
                );

                const icon =
                    menuButton.querySelector(
                        "i"
                    );

                if (icon) {

                    icon.className =
                        opened
                            ? "fa-solid fa-xmark"
                            : "fa-solid fa-bars";
                }

            }
        );
    }


    document
        .querySelectorAll(
            ".mobile-nav-link"
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });


    document
        .querySelectorAll(
            ".nav-link"
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });


    initializeSmoothScrolling();

    initializeActiveNavigation();
}


function closeMobileMenu() {

    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );

    const menuButton =
        document.getElementById(
            "menuToggle"
        );

    if (!mobileMenu) return;

    mobileMenu.classList.remove(
        "active"
    );

    if (menuButton) {

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        const icon =
            menuButton.querySelector(
                "i"
            );

        if (icon) {

            icon.className =
                "fa-solid fa-bars";
        }
    }
}


function initializeSmoothScrolling() {

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetId =
                        anchor.getAttribute(
                            "href"
                        );

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

                    if (!target) return;

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });
}


function initializeActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const links =
        document.querySelectorAll(
            ".nav-link"
        );

    if (
        !sections.length ||
        !links.length
    ) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id =
                        entry.target.id;

                    links.forEach(link => {

                        link.classList.remove(
                            "active"
                        );

                        if (
                            link.getAttribute(
                                "href"
                            ) === `#${id}`
                        ) {

                            link.classList.add(
                                "active"
                            );
                        }

                    });

                });

            },
            {
                rootMargin:
                    "-25% 0px -65% 0px"
            }
        );


    sections.forEach(section => {

        observer.observe(section);

    });
}


/* =========================================================
   8. REFERRAL URL
========================================================= */

function readReferralFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const referral =
        params.get("ref");

    if (!referral) return;

    const cleaned =
        referral
            .trim()
            .toUpperCase();

    if (!cleaned) return;

    JayClassic.referralCode =
        cleaned;

    const input =
        document.getElementById(
            "referralCodeInput"
        );

    if (input) {

        input.value =
            cleaned;

        input.setAttribute(
            "readonly",
            "readonly"
        );

    }

    localStorage.setItem(
        "jayClassicReferralCode",
        cleaned
    );

    showToast(
        "Referral Detected",
        `Referral code ${cleaned} has been applied.`,
        "success"
    );
}


/* =========================================================
   9. RESTORE SAVED REFERRAL
========================================================= */

function restoreSavedReferral() {

    const saved =
        localStorage.getItem(
            "jayClassicReferralCode"
        );

    if (!saved) return;

    const input =
        document.getElementById(
            "referralCodeInput"
        );

    if (!input) return;

    input.value = saved;
}


/* =========================================================
   10. FORM INITIALIZATION
========================================================= */

function initializeForms() {

    const registrationForm =
        document.getElementById(
            "registrationForm"
        );

    if (registrationForm) {

        registrationForm.addEventListener(
            "submit",
            handleRegistration
        );
    }


    const reviewForm =
        document.getElementById(
            "reviewForm"
        );

    if (reviewForm) {

        reviewForm.addEventListener(
            "submit",
            handleReviewSubmission
        );
    }


    const contactForm =
        document.getElementById(
            "contactForm"
        );

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            handleContactSubmission
        );
    }


    const paymentForm =
        document.getElementById(
            "paymentForm"
        );

    if (paymentForm) {

        paymentForm.addEventListener(
            "submit",
            handlePaymentSubmission
        );
    }


    const classForm =
        document.getElementById(
            "classRegistrationForm"
        );

    if (classForm) {

        classForm.addEventListener(
            "submit",
            handleClassRegistration
        );
    }


    restoreSavedReferral();
}


/* =========================================================
   11. REGISTRATION
========================================================= */

async function handleRegistration(event) {

    event.preventDefault();

    if (!supabaseClient) {

        showToast(
            "Connection Error",
            "Supabase is not connected.",
            "error"
        );

        return;
    }


    const button =
        document.getElementById(
            "registrationSubmitBtn"
        );


    const name =
        getValue("studentName");

    const email =
        getValue("studentEmail")
            .toLowerCase();

    const phone =
        getValue("studentPhone");

    const skill =
        getValue("skill");

    const message =
        getValue("studentMessage");

    const referralInput =
        getValue("referralCodeInput");


    if (
        !name ||
        !email ||
        !phone ||
        !skill
    ) {

        showToast(
            "Missing Information",
            "Please complete all required fields.",
            "error"
        );

        return;
    }


    setButtonLoading(
        button,
        true,
        "Creating Profile..."
    );


    try {

        /* -------------------------------------------------
           CHECK DUPLICATE EMAIL
        ------------------------------------------------- */

        const {
            data: existingEmail,
            error: emailError
        } = await supabaseClient
            .from("members")
            .select(
                "id,name,email,phone,referral_code,referral_count,tier,membership_status,is_verified,created_at"
            )
            .eq(
                "email",
                email
            )
            .limit(1);


        if (emailError) {

            console.error(
                "Email check error:",
                emailError
            );
        }


        if (
            existingEmail &&
            existingEmail.length > 0
        ) {

            const existing =
                existingEmail[0];

            saveMemberLocally(
                existing
            );

            showMemberDashboard(
                existing
            );

            showToast(
                "Account Found",
                "This email already has a Jay Classic member profile. Your dashboard has been restored.",
                "info"
            );

            setButtonLoading(
                button,
                false
            );

            return;
        }


        /* -------------------------------------------------
           CHECK DUPLICATE PHONE
        ------------------------------------------------- */

        const {
            data: existingPhone
        } = await supabaseClient
            .from("members")
            .select(
                "id,name,email,phone,referral_code,referral_count,tier,membership_status,is_verified,created_at"
            )
            .eq(
                "phone",
                phone
            )
            .limit(1);


        if (
            existingPhone &&
            existingPhone.length > 0
        ) {

            showToast(
                "Phone Already Registered",
                "This phone number is already connected to a member profile.",
                "error"
            );

            setButtonLoading(
                button,
                false
            );

            return;
        }


        /* -------------------------------------------------
           FIND REFERRER
        ------------------------------------------------- */

        let referrer = null;

        const referralCode =
            (
                referralInput ||
                localStorage.getItem(
                    "jayClassicReferralCode"
                ) ||
                ""
            )
                .trim()
                .toUpperCase();


        if (referralCode) {

            const {
                data: referrerData,
                error: referrerError
            } =
                await supabaseClient
                    .from("members")
                    .select(
                        "id,name,email,phone,referral_code,referral_count,tier"
                    )
                    .eq(
                        "referral_code",
                        referralCode
                    )
                    .limit(1);


            if (
                referrerError
            ) {

                console.error(
                    "Referrer lookup error:",
                    referrerError
                );

            } else if (
                referrerData &&
                referrerData.length
            ) {

                referrer =
                    referrerData[0];
            }
        }


        /* -------------------------------------------------
           GENERATE REFERRAL CODE
        ------------------------------------------------- */

        const newReferralCode =
            await generateUniqueReferralCode(
                name
            );


        /* -------------------------------------------------
           CREATE MEMBER
        ------------------------------------------------- */

        const memberPayload = {

            name: name,

            email: email,

            phone: phone,

            referral_code:
                newReferralCode,

            referral_count: 0,

            tier: "Regular",

            referred_by:
                referrer
                    ? referrer.referral_code
                    : null,

            membership_status:
                "active",

            is_verified: false

        };


        const {
            data: memberData,
            error: memberError
        } = await supabaseClient
            .from("members")
            .insert(
                [memberPayload]
            )
            .select()
            .single();


        if (memberError) {

            console.error(
                "Member registration error:",
                memberError
            );

            showToast(
                "Registration Failed",
                memberError.message ||
                "Unable to create your member profile.",
                "error"
            );

            return;
        }


        /* -------------------------------------------------
           SAVE LOCALLY
        ------------------------------------------------- */

        saveMemberLocally(
            memberData
        );


        /* -------------------------------------------------
           CREATE REFERRAL
        ------------------------------------------------- */

        if (referrer) {

            const referralPayload = {

                referrer_id:
                    referrer.id,

                referred_member_id:
                    memberData.id,

                status:
                    "pending",

                referral_code:
                    referrer.referral_code

            };


            const {
                error: referralError
            } = await supabaseClient
                .from("referrals")
                .insert(
                    [referralPayload]
                );


            if (referralError) {

                console.error(
                    "Referral creation error:",
                    referralError
                );

            }


            await recordReferralActivity(
                memberData.id,
                "registration_referred",
                referrer.referral_code,
                `Registered using referral code ${referrer.referral_code}`
            );

        } else {

            await recordReferralActivity(
                memberData.id,
                "registration",
                memberData.referral_code,
                "New member registration"
            );

        }


        /* -------------------------------------------------
           CLEAR FORM
        ------------------------------------------------- */

        event.target.reset();

        localStorage.removeItem(
            "jayClassicReferralCode"
        );


        /* -------------------------------------------------
           SHOW DASHBOARD
        ------------------------------------------------- */

        showMemberDashboard(
            memberData
        );


        showToast(
            "Welcome to Jay Classic",
            `Your member profile has been created. Your referral code is ${memberData.referral_code}.`,
            "success"
        );


        /* -------------------------------------------------
           SCROLL TO DASHBOARD
        ------------------------------------------------- */

        setTimeout(() => {

            const dashboard =
                document.getElementById(
                    "memberArea"
                );

            if (dashboard) {

                dashboard.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }

        }, 600);


    } catch (error) {

        console.error(
            "Registration exception:",
            error
        );

        showToast(
            "Registration Error",
            "Something went wrong while creating your profile.",
            "error"
        );

    } finally {

        setButtonLoading(
            button,
            false
        );

    }
}


/* =========================================================
   12. REFERRAL CODE GENERATOR
========================================================= */

async function generateUniqueReferralCode(
    name
) {

    const cleanName =
        String(name || "JAY")
            .replace(
                /[^a-zA-Z0-9]/g,
                ""
            )
            .toUpperCase()
            .slice(
                0,
                4
            ) || "JAY";


    for (
        let attempt = 0;
        attempt < 10;
        attempt++
    ) {

        const random =
            Math.floor(
                1000 +
                Math.random() *
                9000
            );


        const code =
            `JC-${cleanName}-${random}`;


        if (!supabaseClient) {

            return code;
        }


        const {
            data,
            error
        } = await supabaseClient
            .from("members")
            .select("id")
            .eq(
                "referral_code",
                code
            )
            .limit(1);


        if (error) {

            console.warn(
                "Referral code check failed:",
                error
            );

            return code;
        }


        if (
            !data ||
            data.length === 0
        ) {

            return code;
        }
    }


    return `JC-${Date.now()}`;
}


/* =========================================================
   13. SAVE MEMBER LOCALLY
========================================================= */

function saveMemberLocally(
    member
) {

    if (!member) return;

    JayClassic.member =
        member;

    localStorage.setItem(
        "jayClassicMemberEmail",
        member.email
    );
}


/* =========================================================
   14. RESTORE MEMBER
========================================================= */

async function restoreMember() {

    if (!supabaseClient) {
        return;
    }


    const savedEmail =
        localStorage.getItem(
            "jayClassicMemberEmail"
        );


    if (!savedEmail) {
        return;
    }


    try {

        const {
            data,
            error
        } = await supabaseClient
            .from("members")
            .select(
                "id,name,email,phone,referral_code,referral_count,tier,referred_by,membership_status,is_verified,created_at,updated_at"
            )
            .eq(
                "email",
                savedEmail
            )
            .limit(1);


        if (error) {

            console.error(
                "Restore member error:",
                error
            );

            return;
        }


        if (
            data &&
            data.length > 0
        ) {

            saveMemberLocally(
                data[0]
            );

            showMemberDashboard(
                data[0]
            );
        }

    } catch (error) {

        console.error(
            "Restore member exception:",
            error
        );
    }
}


/* =========================================================
   15. SHOW MEMBER DASHBOARD
========================================================= */

function showMemberDashboard(
    member
) {

    if (!member) return;


    JayClassic.member =
        member;


    const login =
        document.getElementById(
            "dashboardLogin"
        );

    const content =
        document.getElementById(
            "dashboardContent"
        );


    if (login) {

        login.classList.add(
            "hidden"
        );
    }


    if (content) {

        content.classList.remove(
            "hidden"
        );
    }


    const welcome =
        document.getElementById(
            "memberWelcome"
        );

    if (welcome) {

        welcome.textContent =
            `Welcome, ${member.name}`;
    }


    updateDashboard(
        member
    );
}


/* =========================================================
   16. UPDATE DASHBOARD
========================================================= */

function updateDashboard(
    member
) {

    if (!member) return;


    const count =
        Number(
            member.referral_count || 0
        );


    const tier =
        calculateTier(
            count
        );


    /* -----------------------------------------------------
       UPDATE LOCAL MEMBER TIER
    ----------------------------------------------------- */

    member.tier =
        tier;

    member.referral_count =
        count;


    /* -----------------------------------------------------
       REFERRAL COUNTER
    ----------------------------------------------------- */

    const countElement =
        document.getElementById(
            "referralCount"
        );

    if (countElement) {

        animateNumber(
            countElement,
            count
        );
    }


    /* -----------------------------------------------------
       TIER BADGE
    ----------------------------------------------------- */

    const badge =
        document.getElementById(
            "tierBadge"
        );


    if (badge) {

        badge.textContent =
            tier;

        badge.className =
            `tier-badge ${tier.toLowerCase()}`;
    }


    /* -----------------------------------------------------
       REFERRAL LINK
    ----------------------------------------------------- */

    const referralLink =
        document.getElementById(
            "referralLink"
        );


    if (referralLink) {

        referralLink.value =
            createReferralLink(
                member.referral_code
            );
    }


    /* -----------------------------------------------------
       PROGRESS
    ----------------------------------------------------- */

    updateReferralProgress(
        count,
        tier
    );
}


/* =========================================================
   17. CALCULATE TIER
========================================================= */

function calculateTier(
    referralCount
) {

    const count =
        Number(
            referralCount || 0
        );


    if (count >= 10) {

        return "VVIP";
    }


    if (count >= 3) {

        return "VIP";
    }


    return "Regular";
}


/* =========================================================
   18. REFERRAL PROGRESS
========================================================= */

function updateReferralProgress(
    count,
    tier
) {

    const progress =
        document.getElementById(
            "referralProgress"
        );


    const progressText =
        document.getElementById(
            "referralProgressText"
        );


    const message =
        document.getElementById(
            "referralMessage"
        );


    let percentage = 0;

    let currentText =
        `${count} / 3`;

    let messageText =
        "";


    if (count < 3) {

        percentage =
            Math.min(
                100,
                (count / 3) * 100
            );

        currentText =
            `${count} / 3`;

        messageText =
            `${3 - count} more verified referral${
                3 - count === 1
                    ? ""
                    : "s"
            } to reach VIP.`;

    } else if (count < 10) {

        percentage =
            Math.min(
                100,
                (count / 10) * 100
            );

        currentText =
            `${count} / 10`;

        messageText =
            `${10 - count} more verified referral${
                10 - count === 1
                    ? ""
                    : "s"
            } to reach VVIP.`;

    } else {

        percentage = 100;

        currentText =
            `${count}+`;

        messageText =
            "Congratulations! You have reached VVIP.";

    }


    if (progress) {

        progress.style.width =
            `${percentage}%`;
    }


    if (progressText) {

        progressText.textContent =
            currentText;
    }


    if (message) {

        message.textContent =
            messageText;
    }
}


/* =========================================================
   19. CREATE REFERRAL LINK
========================================================= */

function createReferralLink(
    referralCode
) {

    if (!referralCode) {
        return "";
    }


    const base =
        window.location.href
            .split("?")[0]
            .split("#")[0];


    return `${base}?ref=${encodeURIComponent(
        referralCode
    )}#registration`;
}


/* =========================================================
   20. REFERRAL BUTTONS
========================================================= */

function initializeReferralSystem() {

    const copyButton =
        document.getElementById(
            "copyReferralBtn"
        );

    if (copyButton) {

        copyButton.addEventListener(
            "click",
            copyReferralLink
        );
    }


    const whatsapp =
        document.getElementById(
            "shareWhatsApp"
        );

    if (whatsapp) {

        whatsapp.addEventListener(
            "click",
            shareReferralWhatsApp
        );
    }


    const facebook =
        document.getElementById(
            "shareFacebook"
        );

    if (facebook) {

        facebook.addEventListener(
            "click",
            shareReferralFacebook
        );
    }


    const native =
        document.getElementById(
            "nativeShare"
        );

    if (native) {

        native.addEventListener(
            "click",
            shareReferralNative
        );
    }


    const logout =
        document.getElementById(
            "logoutBtn"
        );

    if (logout) {

        logout.addEventListener(
            "click",
            logoutMember
        );
    }


    restoreSavedReferral();
}


async function copyReferralLink() {

    if (!JayClassic.member) {

        showToast(
            "Register First",
            "Create a member profile before sharing a referral link.",
            "info"
        );

        return;
    }


    const link =
        createReferralLink(
            JayClassic.member.referral_code
        );


    try {

        await navigator.clipboard.writeText(
            link
        );

        showToast(
            "Copied",
            "Your referral link has been copied.",
            "success"
        );

    } catch (error) {

        const input =
            document.getElementById(
                "referralLink"
            );

        if (input) {

            input.select();

            document.execCommand(
                "copy"
            );
        }

        showToast(
            "Copied",
            "Your referral link has been copied.",
            "success"
        );
    }
}


function shareReferralWhatsApp() {

    if (!JayClassic.member) {

        showToast(
            "Register First",
            "Create your member profile before sharing.",
            "info"
        );

        return;
    }


    const link =
        createReferralLink(
            JayClassic.member.referral_code
        );


    const text =
        `Join me on Jay Classic and learn digital skills, online work and more.\n\nJoin here:\n${link}`;


    const whatsappURL =
        `https://wa.me/?text=${encodeURIComponent(
            text
        )}`;


    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );
}


function shareReferralFacebook() {

    if (!JayClassic.member) {

        showToast(
            "Register First",
            "Create your member profile before sharing.",
            "info"
        );

        return;
    }


    const link =
        createReferralLink(
            JayClassic.member.referral_code
        );


    const facebookURL =
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            link
        )}`;


    window.open(
        facebookURL,
        "_blank",
        "noopener,noreferrer,width=700,height=500"
    );
}


async function shareReferralNative() {

    if (!JayClassic.member) {

        showToast(
            "Register First",
            "Create your member profile before sharing.",
            "info"
        );

        return;
    }


    const link =
        createReferralLink(
            JayClassic.member.referral_code
        );


    const shareData = {

        title:
            "Jay Classic",

        text:
            "Join Jay Classic and grow your digital skills.",

        url:
            link
    };


    if (
        navigator.share
    ) {

        try {

            await navigator.share(
                shareData
            );

        } catch (error) {

            if (
                error.name !==
                "AbortError"
            ) {

                console.error(
                    "Share error:",
                    error
                );
            }
        }

    } else {

        await copyReferralLink();

    }
}


/* =========================================================
   21. LOGOUT
========================================================= */

function logoutMember() {

    JayClassic.member =
        null;


    localStorage.removeItem(
        "jayClassicMemberEmail"
    );


    const login =
        document.getElementById(
            "dashboardLogin"
        );

    const content =
        document.getElementById(
            "dashboardContent"
        );


    if (login) {

        login.classList.remove(
            "hidden"
        );
    }


    if (content) {

        content.classList.add(
            "hidden"
        );
    }


    showToast(
        "Signed Out",
        "Your dashboard has been closed on this device.",
        "success"
    );
}


/* =========================================================
   22. REVIEW SUBMISSION
========================================================= */

async function handleReviewSubmission(
    event
) {

    event.preventDefault();


    if (!supabaseClient) {

        showToast(
            "Connection Error",
            "Supabase is not connected.",
            "error"
        );

        return;
    }


    const button =
        document.getElementById(
            "reviewSubmitBtn"
        );


    const name =
        getValue("reviewName");

    const rating =
        Number(
            getValue("reviewRating")
        );

    const message =
        getValue("reviewMessage");


    if (
        !name ||
        !rating ||
        !message
    ) {

        showToast(
            "Incomplete Review",
            "Please enter your name, rating and review.",
            "error"
        );

        return;
    }


    if (
        rating < 1 ||
        rating > 5
    ) {

        showToast(
            "Invalid Rating",
            "Rating must be between 1 and 5 stars.",
            "error"
        );

        return;
    }


    setButtonLoading(
        button,
        true,
        "Submitting..."
    );


    try {

        const {
            error
        } = await supabaseClient
            .from("reviews")
            .insert(
                [{
                    name: name,
                    rating: rating,
                    message: message,
                    approved: true
                }]
            );


        if (error) {

            console.error(
                "Review submission error:",
                error
            );

            showToast(
                "Review Failed",
                error.message ||
                "Your review could not be submitted.",
                "error"
            );

            return;
        }


        event.target.reset();


        showToast(
            "Review Submitted",
            "Thank you for sharing your experience.",
            "success"
        );


        await loadReviews();


    } catch (error) {

        console.error(
            "Review exception:",
            error
        );

        showToast(
            "Review Error",
            "Something went wrong.",
            "error"
        );

    } finally {

        setButtonLoading(
            button,
            false
        );
    }
}


/* =========================================================
   23. LOAD REVIEWS
========================================================= */

async function loadReviews() {

    if (!supabaseClient) {

        console.warn(
            "Supabase is not connected."
        );

        return;
    }


    try {

        const {
            data,
            error
        } = await supabaseClient
            .from("reviews")
            .select(
                "id,name,rating,message,approved,created_at"
            )
            .eq(
                "approved",
                true
            );


        if (error) {

            console.error(
                "Load reviews error:",
                error
            );

            return;
        }


        JayClassic.reviews =
            (data || []).sort(
                (a, b) =>
                    new Date(
                        b.created_at
                    ) -
                    new Date(
                        a.created_at
                    )
            );


        renderReviews(
            JayClassic.reviews
        );

        updateRatingSummary(
            JayClassic.reviews
        );


    } catch (error) {

        console.error(
            "Unexpected reviews error:",
            error
        );

        JayClassic.reviews = [];

        updateRatingSummary([]);

    }
}


/* =========================================================
   24. RENDER REVIEWS
========================================================= */

function renderReviews(
    reviews
) {

    const container =
        document.getElementById(
            "reviewsContainer"
        );


    if (!container) {
        return;
    }


    if (
        !reviews ||
        reviews.length === 0
    ) {

        container.innerHTML = `

            <article class="review-card">

                <div class="review-top">

                    <div class="review-avatar">
                        J
                    </div>

                    <div>

                        <h4>
                            Jay Classic Community
                        </h4>

                        <span>
                            Be the first to review
                        </span>

                    </div>

                </div>

                <div class="review-stars">
                    ★★★★★
                </div>

                <p>
                    No community reviews have been submitted yet.
                    Your experience can be the first.
                </p>

            </article>

        `;

        return;
    }


    container.innerHTML =
        reviews
            .slice(0, 12)
            .map(
                review =>
                    createReviewCard(
                        review
                    )
            )
            .join("");
}


function createReviewCard(
    review
) {

    const name =
        escapeHTML(
            review.name ||
            "Jay Classic Member"
        );


    const message =
        escapeHTML(
            review.message ||
            ""
        );


    const rating =
        Math.max(
            1,
            Math.min(
                5,
                Number(
                    review.rating || 0
                )
            )
        );


    const initial =
        escapeHTML(
            (
                review.name ||
                "J"
            )
                .charAt(0)
                .toUpperCase()
        );


    const stars =
        "★".repeat(rating) +
        "☆".repeat(
            5 - rating
        );


    const date =
        review.created_at
            ? formatDate(
                review.created_at
            )
            : "";


    return `

        <article class="review-card">

            <div class="review-top">

                <div class="review-avatar">
                    ${initial}
                </div>

                <div>

                    <h4>
                        ${name}
                    </h4>

                    <span>
                        ${date}
                    </span>

                </div>

            </div>

            <div class="review-stars">
                ${stars}
            </div>

            <p>
                ${message}
            </p>

        </article>

    `;
}


/* =========================================================
   25. RATING SUMMARY
========================================================= */

function updateRatingSummary(
    reviews
) {

    const averageElement =
        document.getElementById(
            "averageRating"
        );

    const starsElement =
        document.getElementById(
            "averageStars"
        );

    const countElement =
        document.getElementById(
            "reviewCount"
        );


    if (
        !reviews ||
        reviews.length === 0
    ) {

        if (averageElement) {

            averageElement.textContent =
                "5.0";
        }

        if (starsElement) {

            starsElement.textContent =
                "★★★★★";
        }

        if (countElement) {

            countElement.textContent =
                "Community reviews";
        }

        return;
    }


    const total =
        reviews.reduce(
            (
                sum,
                review
            ) =>
                sum +
                Number(
                    review.rating || 0
                ),
            0
        );


    const average =
        total /
        reviews.length;


    const rounded =
        Math.round(
            average
        );


    if (averageElement) {

        averageElement.textContent =
            average.toFixed(1);
    }


    if (starsElement) {

        starsElement.textContent =
            "★".repeat(
                rounded
            ) +
            "☆".repeat(
                5 - rounded
            );
    }


    if (countElement) {

        countElement.textContent =
            `${reviews.length} ${
                reviews.length === 1
                    ? "review"
                    : "reviews"
            }`;
    }
}


/* =========================================================
   26. CONTACT FORM
========================================================= */

async function handleContactSubmission(
    event
) {

    event.preventDefault();


    if (!supabaseClient) {

        showToast(
            "Connection Error",
            "Supabase is not connected.",
            "error"
        );

        return;
    }


    const button =
        document.getElementById(
            "contactSubmitBtn"
        );


    const name =
        getValue("contactName");

    const email =
        getValue("contactEmail")
            .toLowerCase();

    const service =
        getValue("contactService");

    const message =
        getValue("contactMessage");


    if (
        !name ||
        !email ||
        !message
    ) {

        showToast(
            "Incomplete Form",
            "Please fill in your name, email and message.",
            "error"
        );

        return;
    }


    setButtonLoading(
        button,
        true,
        "Sending..."
    );


    try {

        const {
            error
        } = await supabaseClient
            .from("contact_messages")
            .insert(
                [{
                    name: name,
                    email: email,
                    service:
                        service || null,
                    message: message,
                    status: "new"
                }]
            );


        if (error) {

            console.error(
                "Contact submission error:",
                error
            );

            showToast(
                "Message Failed",
                error.message ||
                "Your message could not be sent.",
                "error"
            );

            return;
        }


        event.target.reset();


        showToast(
            "Message Sent",
            "Thank you. Your message has been received.",
            "success"
        );


    } catch (error) {

        console.error(
            "Contact exception:",
            error
        );

        showToast(
            "Message Error",
            "Something went wrong.",
            "error"
        );

    } finally {

        setButtonLoading(
            button,
            false
        );
    }
}


/* =========================================================
   27. PAYMENT FORM
========================================================= */

async function handlePaymentSubmission(
    event
) {

    event.preventDefault();


    if (!supabaseClient) {

        showToast(
            "Connection Error",
            "Supabase is not connected.",
            "error"
        );

        return;
    }


    const button =
        document.getElementById(
            "paymentSubmitBtn"
        );


    const name =
        getValue("paymentName");

    const email =
        getValue("paymentEmail")
            .toLowerCase();

    const phone =
        getValue("paymentPhone");

    const plan =
        getValue("paymentPlan");

    const transactionCode =
        getValue("transactionCode")
            .toUpperCase();


    if (
        !name ||
        !email ||
        !phone ||
        !plan ||
        !transactionCode
    ) {

        showToast(
            "Incomplete Payment",
            "Please complete all payment fields.",
            "error"
        );

        return;
    }


    setButtonLoading(
        button,
        true,
        "Submitting..."
    );


    try {

        /* -------------------------------------------------
           FIND MEMBER
        ------------------------------------------------- */

        let memberId = null;


        const {
            data: memberData
        } = await supabaseClient
            .from("members")
            .select("id")
            .eq(
                "email",
                email
            )
            .limit(1);


        if (
            memberData &&
            memberData.length > 0
        ) {

            memberId =
                memberData[0].id;
        }


        /* -------------------------------------------------
           FIND PLAN PRICE
        ------------------------------------------------- */

        let amount = 0;


        const {
            data: planData
        } = await supabaseClient
            .from("membership_plans")
            .select(
                "name,price"
            )
            .eq(
                "name",
                plan
            )
            .limit(1);


        if (
            planData &&
            planData.length > 0
        ) {

            amount =
                Number(
                    planData[0].price || 0
                );
        }


        /* -------------------------------------------------
           CREATE PAYMENT
        ------------------------------------------------- */

        const paymentPayload = {

            member_id:
                memberId,

            name:
                name,

            email:
                email,

            phone:
                phone,

            plan:
                plan,

            amount:
                amount,

            transaction_code:
                transactionCode,

            status:
                "pending"

        };


        const {
            error
        } = await supabaseClient
            .from("payments")
            .insert(
                [paymentPayload]
            );


        if (error) {

            console.error(
                "Payment submission error:",
                error
            );

            showToast(
                "Payment Submission Failed",
                error.message ||
                "Unable to submit payment verification.",
                "error"
            );

            return;
        }


        event.target.reset();


        showToast(
            "Payment Submitted",
            "Your transaction has been submitted for verification.",
            "success"
        );


    } catch (error) {

        console.error(
            "Payment exception:",
            error
        );

        showToast(
            "Payment Error",
            "Something went wrong.",
            "error"
        );

    } finally {

        setButtonLoading(
            button,
            false
        );
    }
}


/* =========================================================
   28. CLASS REGISTRATION
========================================================= */

async function handleClassRegistration(
    event
) {

    event.preventDefault();


    if (!supabaseClient) {

        showToast(
            "Connection Error",
            "Supabase is not connected.",
            "error"
        );

        return;
    }


    const button =
        document.getElementById(
            "classSubmitBtn"
        );


    const name =
        getValue("className");

    const email =
        getValue("classEmail")
            .toLowerCase();

    const phone =
        getValue("classPhone");

    const className =
        getValue("classNameSelect");


    if (
        !name ||
        !email ||
        !phone ||
        !className
    ) {

        showToast(
            "Incomplete Registration",
            "Please complete all class registration fields.",
            "error"
        );

        return;
    }


    setButtonLoading(
        button,
        true,
        "Registering..."
    );


    try {

        let memberId = null;


        const {
            data: memberData
        } = await supabaseClient
            .from("members")
            .select("id")
            .eq(
                "email",
                email
            )
            .limit(1);


        if (
            memberData &&
            memberData.length
        ) {

            memberId =
                memberData[0].id;
        }


        const {
            error
        } = await supabaseClient
            .from("class_registrations")
            .insert(
                [{
                    member_id:
                        memberId,

                    name:
                        name,

                    email:
                        email,

                    phone:
                        phone,

                    class_name:
                        className
                }]
            );


        if (error) {

            console.error(
                "Class registration error:",
                error
            );

            showToast(
                "Registration Failed",
                error.message ||
                "Unable to register for the class.",
                "error"
            );

            return;
        }


        event.target.reset();


        showToast(
            "Class Registration Complete",
            `You are registered for ${className}. Classes are scheduled daily at 9:00 PM.`,
            "success"
        );


    } catch (error) {

        console.error(
            "Class registration exception:",
            error
        );

        showToast(
            "Registration Error",
            "Something went wrong.",
            "error"
        );

    } finally {

        setButtonLoading(
            button,
            false
        );
    }
}


/* =========================================================
   29. REFERRAL ACTIVITY
========================================================= */

async function recordReferralActivity(
    memberId,
    activityType,
    referralCode,
    details
) {

    if (!supabaseClient) {
        return;
    }


    try {

        const {
            error
        } = await supabaseClient
            .from("referral_activity")
            .insert(
                [{
                    member_id:
                        memberId,

                    activity_type:
                        activityType,

                    referral_code:
                        referralCode || null,

                    details:
                        details || null
                }]
            );


        if (error) {

            console.warn(
                "Referral activity error:",
                error
            );
        }

    } catch (error) {

        console.warn(
            "Referral activity exception:",
            error
        );
    }
}


/* =========================================================
   30. MEMBERSHIP PLANS
========================================================= */

async function loadMembershipPlans() {

    if (!supabaseClient) {
        return;
    }


    try {

        const {
            data,
            error
        } = await supabaseClient
            .from("membership_plans")
            .select(
                "id,name,description,price,duration_days,benefits,is_active,created_at"
            )
            .eq(
                "is_active",
                true
            );


        if (error) {

            console.error(
                "Membership plans error:",
                error
            );

            return;
        }


        JayClassic.plans =
            data || [];


        console.log(
            "Membership plans loaded:",
            JayClassic.plans
        );


    } catch (error) {

        console.error(
            "Membership plans exception:",
            error
        );
    }
}


/* =========================================================
   31. BACK TO TOP
========================================================= */

function initializeBackToTop() {

    const button =
        document.getElementById(
            "backToTop"
        );


    if (!button) return;


    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY >
                500
            ) {

                button.classList.add(
                    "show"
                );

            } else {

                button.classList.remove(
                    "show"
                );
            }

        },
        {
            passive: true
        }
    );


    button.addEventListener(
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
   32. SCROLL ANIMATIONS
========================================================= */

function initializeScrollAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!elements.length) {
        return;
    }


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;
    }


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
                threshold: 0.1
            }
        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );
}


/* =========================================================
   33. YEAR
========================================================= */

function initializeYear() {

    const year =
        document.getElementById(
            "year"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();
    }
}


/* =========================================================
   34. TOAST SYSTEM
========================================================= */

function showToast(
    title,
    message,
    type = "success"
) {

    const toast =
        document.getElementById(
            "toast"
        );

    const toastTitle =
        document.getElementById(
            "toastTitle"
        );

    const toastMessage =
        document.getElementById(
            "toastMessage"
        );

    const toastIcon =
        document.getElementById(
            "toastIcon"
        );


    if (!toast) {

        console.log(
            title,
            message
        );

        return;
    }


    if (toastTitle) {

        toastTitle.textContent =
            title;
    }


    if (toastMessage) {

        toastMessage.textContent =
            message;
    }


    if (toastIcon) {

        if (type === "error") {

            toastIcon.innerHTML =
                '<i class="fa-solid fa-xmark"></i>';

        } else if (
            type === "info"
        ) {

            toastIcon.innerHTML =
                '<i class="fa-solid fa-info"></i>';

        } else {

            toastIcon.innerHTML =
                '<i class="fa-solid fa-check"></i>';
        }
    }


    toast.classList.remove(
        "success",
        "error",
        "info"
    );


    toast.classList.add(
        type
    );


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.jayClassicToastTimer
    );


    window.jayClassicToastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            5000
        );
}


/* =========================================================
   35. TOAST CLOSE
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            event.target.closest(
                "#toastClose"
            )
        ) {

            const toast =
                document.getElementById(
                    "toast"
                );

            if (toast) {

                toast.classList.remove(
                    "show"
                );
            }
        }

    }
);


/* =========================================================
   36. BUTTON LOADING
========================================================= */

function setButtonLoading(
    button,
    loading,
    loadingText = "Processing..."
) {

    if (!button) return;


    if (loading) {

        if (
            !button.dataset.originalHTML
        ) {

            button.dataset.originalHTML =
                button.innerHTML;
        }


        button.disabled = true;

        button.classList.add(
            "loading"
        );


        button.innerHTML = `

            <span class="button-spinner"></span>

            ${loadingText}

        `;

    } else {

        button.disabled = false;

        button.classList.remove(
            "loading"
        );


        if (
            button.dataset.originalHTML
        ) {

            button.innerHTML =
                button.dataset.originalHTML;
        }
    }
}


/* =========================================================
   37. GET FORM VALUE
========================================================= */

function getValue(
    id
) {

    const element =
        document.getElementById(
            id
        );


    if (!element) {
        return "";
    }


    return String(
        element.value || ""
    ).trim();
}


/* =========================================================
   38. NUMBER ANIMATION
========================================================= */

function animateNumber(
    element,
    target
) {

    if (!element) return;


    const end =
        Number(
            target || 0
        );


    const start =
        Number(
            element.textContent
                .replace(
                    /[^0-9]/g,
                    ""
                )
        ) || 0;


    if (start === end) {

        element.textContent =
            String(end);

        return;
    }


    const duration =
        500;


    const startTime =
        performance.now();


    function update(
        currentTime
    ) {

        const progress =
            Math.min(
                (
                    currentTime -
                    startTime
                ) /
                duration,
                1
            );


        const value =
            Math.round(
                start +
                (
                    end -
                    start
                ) *
                progress
            );


        element.textContent =
            String(value);


        if (
            progress < 1
        ) {

            requestAnimationFrame(
                update
            );

        }

    }


    requestAnimationFrame(
        update
    );
}


/* =========================================================
   39. DATE FORMAT
========================================================= */

function formatDate(
    dateValue
) {

    try {

        return new Intl.DateTimeFormat(
            "en-KE",
            {
                year: "numeric",
                month: "short",
                day: "numeric"
            }
        ).format(
            new Date(
                dateValue
            )
        );

    } catch (error) {

        return "";
    }
}


/* =========================================================
   40. ESCAPE HTML
========================================================= */

function escapeHTML(
    value
) {

    return String(
        value || ""
    )
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


/* =========================================================
   41. GLOBAL API
========================================================= */

window.JayClassic =
    JayClassic;


/* =========================================================
   42. DEBUG HELPERS
========================================================= */

window.JayClassicDebug = {

    getMember: () =>
        JayClassic.member,

    getReviews: () =>
        JayClassic.reviews,

    getPlans: () =>
        JayClassic.plans,

    getSupabase: () =>
        supabaseClient,

    reloadReviews: () =>
        loadReviews(),

    reloadPlans: () =>
        loadMembershipPlans()

};


/* =========================================================
   43. CONSOLE MESSAGE
========================================================= */

console.log(
    "%c Jay Classic ",
    "background:#2563eb;color:white;font-size:18px;font-weight:bold;padding:8px 14px;border-radius:8px;"
);

console.log(
    "Digital platform initialized."
);
