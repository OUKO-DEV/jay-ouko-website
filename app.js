/* =========================================================
   JAY CLASSIC
   SUPABASE + MEMBERS + REFERRALS SYSTEM
   ========================================================= */

/* =========================================================
   1. SUPABASE CONFIGURATION
   ========================================================= */

const SUPABASE_URL = "https://cjcyjsgcsgqeqanxwitq.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_F7taABXLhqRbRlkBygPF6A_pMphViS5";

let supabaseClient = null;

try {
    if (window.supabase) {
        supabaseClient = window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_KEY
        );
        console.log("Jay Classic: Supabase connected.");
    } else {
        console.error("Supabase library was not loaded.");
    }
} catch (error) {
    console.error("Supabase connection error:", error);
}


/* =========================================================
   2. GLOBAL STATE
   ========================================================= */

const JayClassic = {
    member: null,
    referralCode: "",
    referralCount: 0,
    tier: "Regular",
    initialized: false
};


/* =========================================================
   3. START APPLICATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", async () => {

    initializeTheme();
    initializeMobileMenu();
    initializeHeader();
    initializeSmoothScrolling();
    initializeBackToTop();
    initializeForms();
    initializeReferralSystem();
    initializeShareButtons();
    initializeAnimations();
    initializeYear();

    await restoreMember();

    loadReviews();

    JayClassic.initialized = true;

    console.log("Jay Classic initialized.");
});


/* =========================================================
   4. THEME
   ========================================================= */

function initializeTheme() {

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    if (!themeToggle) return;

    const savedTheme = localStorage.getItem("jayClassicTheme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");

        if (themeIcon) {
            themeIcon.textContent = "☀️";
        }
    }

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "jayClassicTheme",
            isDark ? "dark" : "light"
        );

        if (themeIcon) {
            themeIcon.textContent = isDark ? "☀️" : "🌙";
        }
    });
}


/* =========================================================
   5. MOBILE MENU
   ========================================================= */

function initializeMobileMenu() {

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

        const expanded =
            mobileMenu.classList.contains("active");

        menuToggle.setAttribute(
            "aria-expanded",
            expanded ? "true" : "false"
        );
    });

    document
        .querySelectorAll(".mobile-nav-link")
        .forEach(link => {

            link.addEventListener("click", () => {
                mobileMenu.classList.remove("active");
            });

        });
}


/* =========================================================
   6. HEADER
   ========================================================= */

function initializeHeader() {

    const header = document.querySelector(".header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });
}


/* =========================================================
   7. SMOOTH SCROLLING
   ========================================================= */

function initializeSmoothScrolling() {

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });
}


/* =========================================================
   8. BACK TO TOP
   ========================================================= */

function initializeBackToTop() {

    const button =
        document.getElementById("backToTop");

    if (!button) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {
            button.classList.add("show");
        } else {
            button.classList.remove("show");
        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });
}


/* =========================================================
   9. YEAR
   ========================================================= */

function initializeYear() {

    const year =
        document.getElementById("year");

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }
}


/* =========================================================
   10. REFERRAL SYSTEM
   ========================================================= */

function initializeReferralSystem() {

    const params =
        new URLSearchParams(window.location.search);

    const referral =
        params.get("ref");

    if (referral) {

        localStorage.setItem(
            "jayClassicReferral",
            referral.trim().toUpperCase()
        );

        const referralInput =
            document.getElementById("referralCode");

        if (referralInput) {
            referralInput.value =
                referral.trim().toUpperCase();
        }
    }

    const storedReferral =
        localStorage.getItem("jayClassicReferral");

    if (storedReferral) {

        const input =
            document.getElementById("referralCode");

        if (input && !input.value) {
            input.value = storedReferral;
        }
    }

    updateReferralDisplay();
}


/* =========================================================
   11. REFERRAL TIER
   ========================================================= */

function calculateTier(count) {

    count = Number(count) || 0;

    if (count >= 10) {
        return "VVIP";
    }

    if (count >= 3) {
        return "VIP";
    }

    return "Regular";
}


/* =========================================================
   12. REFERRAL PROGRESS
   ========================================================= */

function getNextTierTarget(count) {

    count = Number(count) || 0;

    if (count < 3) {
        return 3;
    }

    if (count < 10) {
        return 10;
    }

    return 10;
}


/* =========================================================
   13. UPDATE REFERRAL DISPLAY
   ========================================================= */

function updateReferralDisplay() {

    const count =
        JayClassic.referralCount || 0;

    const tier =
        calculateTier(count);

    JayClassic.tier = tier;

    const countElements = [
        document.getElementById("referralCount"),
        document.getElementById("memberReferralCount")
    ];

    countElements.forEach(element => {

        if (element) {
            element.textContent = count;
        }

    });

    const tierElements = [
        document.getElementById("tier"),
        document.getElementById("memberTier"),
        document.getElementById("tierBadge")
    ];

    tierElements.forEach(element => {

        if (element) {

            element.textContent =
                tier;

            element.classList.remove(
                "regular",
                "vip",
                "vvip"
            );

            element.classList.add(
                tier.toLowerCase()
            );
        }

    });

    const progress =
        document.getElementById("referralProgress");

    if (progress) {

        let percentage = 100;

        if (count < 3) {
            percentage =
                Math.min((count / 3) * 100, 100);
        } else if (count < 10) {
            percentage =
                Math.min((count / 10) * 100, 100);
        }

        progress.style.width =
            `${percentage}%`;
    }

    const nextTarget =
        document.getElementById("nextTierTarget");

    if (nextTarget) {
        nextTarget.textContent =
            getNextTierTarget(count);
    }

    const nextMessage =
        document.getElementById("nextTierMessage");

    if (nextMessage) {

        if (tier === "Regular") {
            nextMessage.textContent =
                `${3 - count} more verified referral(s) to reach VIP.`;
        } else if (tier === "VIP") {
            nextMessage.textContent =
                `${10 - count} more verified referral(s) to reach VVIP.`;
        } else {
            nextMessage.textContent =
                "You have reached VVIP.";
        }
    }
}


/* =========================================================
   14. GENERATE REFERRAL CODE
   ========================================================= */

function generateReferralCode(name) {

    const cleanName =
        String(name || "MEMBER")
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "")
            .substring(0, 8);

    const random =
        Math.random()
            .toString(36)
            .substring(2, 7)
            .toUpperCase();

    return `JAY-${cleanName}-${random}`;
}


/* =========================================================
   15. CREATE REFERRAL LINK
   ========================================================= */

function getReferralLink() {

    if (!JayClassic.referralCode) {
        return window.location.origin +
            window.location.pathname;
    }

    return `${window.location.origin}${window.location.pathname}?ref=${encodeURIComponent(JayClassic.referralCode)}`;
}


/* =========================================================
   16. DISPLAY REFERRAL LINK
   ========================================================= */

function updateReferralLink() {

    const link =
        getReferralLink();

    const elements = [
        document.getElementById("referralLink"),
        document.getElementById("memberReferralLink")
    ];

    elements.forEach(element => {

        if (element) {
            element.value = link;
            element.textContent = link;
        }

    });
}


/* =========================================================
   17. COPY REFERRAL LINK
   ========================================================= */

async function copyReferralLink() {

    const link =
        getReferralLink();

    try {

        await navigator.clipboard.writeText(link);

        showToast(
            "Referral link copied successfully."
        );

    } catch (error) {

        showToast(
            "Copy failed. Please copy the link manually."
        );
    }
}


/* =========================================================
   18. SHARE REFERRAL
   ========================================================= */

async function shareReferral() {

    const link =
        getReferralLink();

    const message =
        `Join Jay Classic using my referral link: ${link}`;

    if (navigator.share) {

        try {

            await navigator.share({
                title: "Jay Classic",
                text: message,
                url: link
            });

        } catch (error) {
            console.log("Share cancelled.");
        }

        return;
    }

    window.open(
        `https://wa.me/?text=${encodeURIComponent(message)}`,
        "_blank"
    );
}


/* =========================================================
   19. SHARE BUTTONS
   ========================================================= */

function initializeShareButtons() {

    const copyButtons =
        document.querySelectorAll(
            "[data-copy-referral]"
        );

    copyButtons.forEach(button => {

        button.addEventListener(
            "click",
            copyReferralLink
        );

    });

    const shareButtons =
        document.querySelectorAll(
            "[data-share-referral]"
        );

    shareButtons.forEach(button => {

        button.addEventListener(
            "click",
            shareReferral
        );

    });

    const whatsappButtons =
        document.querySelectorAll(
            "[data-share-whatsapp]"
        );

    whatsappButtons.forEach(button => {

        button.addEventListener("click", () => {

            const link =
                getReferralLink();

            const message =
                `Join Jay Classic using my referral link: ${link}`;

            window.open(
                `https://wa.me/?text=${encodeURIComponent(message)}`,
                "_blank"
            );

        });

    });
}


/* =========================================================
   20. RESTORE MEMBER
   ========================================================= */

async function restoreMember() {

    if (!supabaseClient) return;

    const email =
        localStorage.getItem(
            "jayClassicMemberEmail"
        );

    if (!email) return;

    try {

        const { data, error } =
            await supabaseClient
                .from("members")
                .select("*")
                .eq("email", email)
                .maybeSingle();

        if (error) {
            console.error(
                "Member restore error:",
                error
            );
            return;
        }

        if (!data) return;

        setMemberState(data);

        console.log(
            "Jay Classic member restored:",
            data.email
        );

    } catch (error) {

        console.error(
            "Unexpected member restore error:",
            error
        );
    }
}


/* =========================================================
   21. SET MEMBER STATE
   ========================================================= */

function setMemberState(member) {

    JayClassic.member =
        member;

    JayClassic.referralCode =
        member.referral_code || "";

    JayClassic.referralCount =
        Number(member.referral_count) || 0;

    JayClassic.tier =
        calculateTier(
            JayClassic.referralCount
        );

    updateReferralDisplay();
    updateReferralLink();
    updateMemberUI();
}


/* =========================================================
   22. UPDATE MEMBER UI
   ========================================================= */

function updateMemberUI() {

    if (!JayClassic.member) return;

    const member =
        JayClassic.member;

    const nameElements = [
        document.getElementById("memberName"),
        document.getElementById("dashboardName")
    ];

    nameElements.forEach(element => {

        if (element) {
            element.textContent =
                member.name || "Member";
        }

    });

    const emailElements = [
        document.getElementById("memberEmail"),
        document.getElementById("dashboardEmail")
    ];

    emailElements.forEach(element => {

        if (element) {
            element.textContent =
                member.email || "";
        }

    });

    const status =
        document.getElementById("membershipStatus");

    if (status) {
        status.textContent =
            member.membership_status || "active";
    }

    const memberArea =
        document.getElementById("memberArea");

    if (memberArea) {
        memberArea.classList.add("active");
    }
}


/* =========================================================
   23. REGISTRATION
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
            handleReview
        );
    }

    const contactForm =
        document.getElementById(
            "contactForm"
        );

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            handleContact
        );
    }

    const paymentForm =
        document.getElementById(
            "paymentForm"
        );

    if (paymentForm) {

        paymentForm.addEventListener(
            "submit",
            handlePayment
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
}


/* =========================================================
   24. HANDLE MEMBER REGISTRATION
   ========================================================= */

async function handleRegistration(event) {

    event.preventDefault();

    if (!supabaseClient) {

        showToast(
            "Supabase is not connected."
        );

        return;
    }

    const form =
        event.target;

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

    const referralCode =
        getValue("referralCode")
        || localStorage.getItem(
            "jayClassicReferral"
        )
        || "";

    if (!name || !email || !phone) {

        showToast(
            "Please complete all required fields."
        );

        return;
    }

    try {

        /* Check whether member already exists */

        const { data: existingMember, error: existingError } =
            await supabaseClient
                .from("members")
                .select("*")
                .eq("email", email)
                .maybeSingle();

        if (existingError) {
            throw existingError;
        }

        if (existingMember) {

            setMemberState(existingMember);

            localStorage.setItem(
                "jayClassicMemberEmail",
                email
            );

            showToast(
                "This email is already registered."
            );

            return;
        }


        /* Check referral */

        let referredBy = null;

        if (referralCode) {

            const { data: referrer, error: referrerError } =
                await supabaseClient
                    .from("members")
                    .select("id, referral_code")
                    .eq(
                        "referral_code",
                        referralCode.toUpperCase()
                    )
                    .maybeSingle();

            if (referrerError) {
                throw referrerError;
            }

            if (referrer) {

                referredBy =
                    referrer.referral_code;
            }
        }


        /* Generate member referral code */

        const newReferralCode =
            generateReferralCode(name);


        /* Create member */

        const memberData = {

            name: name,

            email: email,

            phone: phone,

            referral_code:
                newReferralCode,

            referral_count: 0,

            tier: "Regular",

            referred_by:
                referredBy,

            membership_status:
                "active",

            is_verified: false
        };


        const { data: member, error: memberError } =
            await supabaseClient
                .from("members")
                .insert(memberData)
                .select()
                .single();

        if (memberError) {
            throw memberError;
        }


        /* Save member locally */

        localStorage.setItem(
            "jayClassicMemberEmail",
            email
        );

        setMemberState(member);


        /* Create referral record */

        if (referredBy) {

            const { data: referrer } =
                await supabaseClient
                    .from("members")
                    .select("id, referral_code")
                    .eq(
                        "referral_code",
                        referredBy
                    )
                    .maybeSingle();

            if (referrer) {

                const { error: referralError } =
                    await supabaseClient
                        .from("referrals")
                        .insert({

                            referrer_id:
                                referrer.id,

                            referred_member_id:
                                member.id,

                            status:
                                "pending",

                            referral_code:
                                referredBy
                        });

                if (referralError) {

                    console.error(
                        "Referral creation error:",
                        referralError
                    );
                }
            }
        }


        /* Record activity */

        await supabaseClient
            .from("referral_activity")
            .insert({

                member_id:
                    member.id,

                activity_type:
                    "registration",

                referral_code:
                    referredBy || null,

                details:
                    skill
                        ? `Registered for ${skill}. ${message || ""}`
                        : message || "New Jay Classic member."
            });


        showToast(
            "Registration successful! Welcome to Jay Classic."
        );

        form.reset();

        updateReferralDisplay();
        updateReferralLink();

    } catch (error) {

        console.error(
            "Registration error:",
            error
        );

        showToast(
            "Registration failed. Please try again."
        );
    }
}


/* =========================================================
   25. REVIEWS
   ========================================================= */

async function handleReview(event) {

    event.preventDefault();

    if (!supabaseClient) {
        showToast("Supabase is not connected.");
        return;
    }

    const name =
        getValue("reviewName");

    const rating =
        Number(
            getValue("reviewRating")
        );

    const message =
        getValue("reviewMessage");

    if (!name || !rating || !message) {

        showToast(
            "Please complete the review form."
        );

        return;
    }

    try {

        const { error } =
            await supabaseClient
                .from("reviews")
                .insert({

                    name: name,

                    rating: rating,

                    message: message,

                    approved: true
                });

        if (error) {
            throw error;
        }

        showToast(
            "Thank you for your review!"
        );

        event.target.reset();

        await loadReviews();

    } catch (error) {

        console.error(
            "Review error:",
            error
        );

        showToast(
            "Unable to submit review."
        );
    }
}


/* =========================================================
   26. LOAD REVIEWS
   ========================================================= */

async function loadReviews() {

    if (!supabaseClient) return;

    try {

        const { data, error } =
            await supabaseClient
                .from("reviews")
                .select("*")
                .eq("approved", true)
                .order(
                    "created_at",
                    { ascending: false }
                );

        if (error) {
            throw error;
        }

        JayClassic.reviews =
            data || [];

        renderReviews(
            JayClassic.reviews
        );

    } catch (error) {

        console.error(
            "Load reviews error:",
            error
        );
    }
}


/* =========================================================
   27. RENDER REVIEWS
   ========================================================= */

function renderReviews(reviews) {

    const container =
        document.getElementById(
            "reviewsContainer"
        );

    if (!container) return;

    if (!reviews.length) {

        container.innerHTML =
            `<p class="empty-state">
                No reviews yet. Be the first to leave a review.
            </p>`;

        updateRatingOverview([]);

        return;
    }

    container.innerHTML =
        reviews.map(review => {

            const stars =
                "★".repeat(
                    Number(review.rating)
                ) +
                "☆".repeat(
                    5 - Number(review.rating)
                );

            return `
                <article class="review-card">
                    <div class="review-rating">
                        ${stars}
                    </div>

                    <p class="review-message">
                        ${escapeHTML(review.message)}
                    </p>

                    <strong class="review-name">
                        ${escapeHTML(review.name)}
                    </strong>
                </article>
            `;

        }).join("");

    updateRatingOverview(reviews);
}


/* =========================================================
   28. RATING OVERVIEW
   ========================================================= */

function updateRatingOverview(reviews) {

    const averageElement =
        document.getElementById(
            "averageRating"
        );

    const totalElement =
        document.getElementById(
            "totalReviews"
        );

    if (!reviews.length) {

        if (averageElement) {
            averageElement.textContent =
                "0.0";
        }

        if (totalElement) {
            totalElement.textContent =
                "0";
        }

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

    if (averageElement) {
        averageElement.textContent =
            average.toFixed(1);
    }

    if (totalElement) {
        totalElement.textContent =
            reviews.length;
    }
}


/* =========================================================
   29. CONTACT FORM
   ========================================================= */

async function handleContact(event) {

    event.preventDefault();

    if (!supabaseClient) {
        showToast("Supabase is not connected.");
        return;
    }

    const name =
        getValue("contactName");

    const email =
        getValue("contactEmail");

    const service =
        getValue("contactService");

    const message =
        getValue("contactMessage");

    if (!name || !email || !message) {

        showToast(
            "Please complete the required fields."
        );

        return;
    }

    try {

        const { error } =
            await supabaseClient
                .from("contact_messages")
                .insert({

                    name: name,

                    email: email,

                    service:
                        service || null,

                    message: message,

                    status: "new"
                });

        if (error) {
            throw error;
        }

        showToast(
            "Message sent successfully!"
        );

        event.target.reset();

    } catch (error) {

        console.error(
            "Contact error:",
            error
        );

        showToast(
            "Unable to send your message."
        );
    }
}


/* =========================================================
   30. PAYMENT SUBMISSION
   ========================================================= */

async function handlePayment(event) {

    event.preventDefault();

    if (!supabaseClient) {
        showToast("Supabase is not connected.");
        return;
    }

    const name =
        getValue("paymentName");

    const email =
        getValue("paymentEmail");

    const phone =
        getValue("paymentPhone");

    const plan =
        getValue("paymentPlan");

    const amount =
        Number(
            getValue("paymentAmount")
        ) || 0;

    const transactionCode =
        getValue("transactionCode");

    if (!name || !email || !phone || !plan) {

        showToast(
            "Please complete the payment form."
        );

        return;
    }

    try {

        const paymentData = {

            member_id:
                JayClassic.member
                    ? JayClassic.member.id
                    : null,

            name: name,

            email: email,

            phone: phone,

            plan: plan,

            amount: amount,

            transaction_code:
                transactionCode || null,

            status: "pending"
        };

        const { error } =
            await supabaseClient
                .from("payments")
                .insert(paymentData);

        if (error) {
            throw error;
        }

        showToast(
            "Payment submitted for verification."
        );

        event.target.reset();

    } catch (error) {

        console.error(
            "Payment error:",
            error
        );

        showToast(
            "Unable to submit payment."
        );
    }
}


/* =========================================================
   31. CLASS REGISTRATION
   ========================================================= */

async function handleClassRegistration(event) {

    event.preventDefault();

    if (!supabaseClient) {
        showToast("Supabase is not connected.");
        return;
    }

    const name =
        getValue("className");

    const email =
        getValue("classEmail");

    const phone =
        getValue("classPhone");

    const className =
        getValue("classTitle");

    if (!name || !email || !phone) {

        showToast(
            "Please complete the class registration."
        );

        return;
    }

    try {

        const { error } =
            await supabaseClient
                .from("class_registrations")
                .insert({

                    member_id:
                        JayClassic.member
                            ? JayClassic.member.id
                            : null,

                    name: name,

                    email: email,

                    phone: phone,

                    class_name:
                        className || null
                });

        if (error) {
            throw error;
        }

        showToast(
            "Class registration successful!"
        );

        event.target.reset();

    } catch (error) {

        console.error(
            "Class registration error:",
            error
        );

        showToast(
            "Unable to register for the class."
        );
    }
}


/* =========================================================
   32. LOGOUT
   ========================================================= */

function logoutMember() {

    JayClassic.member = null;
    JayClassic.referralCode = "";
    JayClassic.referralCount = 0;
    JayClassic.tier = "Regular";

    localStorage.removeItem(
        "jayClassicMemberEmail"
    );

    updateReferralDisplay();

    showToast(
        "You have been logged out."
    );

    setTimeout(() => {
        window.location.reload();
    }, 700);
}


/* =========================================================
   33. TOAST
   ========================================================= */

function showToast(message) {

    let toast =
        document.getElementById(
            "jayToast"
        );

    if (!toast) {

        toast =
            document.createElement("div");

        toast.id =
            "jayToast";

        toast.className =
            "toast";

        document.body.appendChild(
            toast
        );
    }

    toast.textContent =
        message;

    toast.classList.add("show");

    clearTimeout(
        toast._timeout
    );

    toast._timeout =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3500);
}


/* =========================================================
   34. GET FORM VALUE
   ========================================================= */

function getValue(id) {

    const element =
        document.getElementById(id);

    if (!element) {
        return "";
    }

    return String(
        element.value || ""
    ).trim();
}


/* =========================================================
   35. ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   36. ANIMATIONS
   ========================================================= */

function initializeAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );

    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {

        elements.forEach(element => {
            element.classList.add("visible");
        });

        return;
    }

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

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

    elements.forEach(element => {
        observer.observe(element);
    });
}


/* =========================================================
   37. WHATSAPP REFERRAL LINKS
   ========================================================= */

function initializeWhatsAppReferralLinks() {

    document
        .querySelectorAll(
            'a[href*="wa.me"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    const href =
                        link.getAttribute("href");

                    if (!href) return;

                    if (
                        href.includes(
                            "join"
                        ) ||
                        href.includes(
                            "referral"
                        )
                    ) {

                        const referralLink =
                            getReferralLink();

                        const message =
                            `Join Jay Classic using my referral link: ${referralLink}`;

                        link.href =
                            `https://wa.me/254142617814?text=${encodeURIComponent(message)}`;
                    }

                }
            );

        });
}


/* =========================================================
   38. GLOBAL API
   ========================================================= */

window.JayClassic = {

    getMember: () =>
        JayClassic.member,

    getReferralCode: () =>
        JayClassic.referralCode,

    getReferralCount: () =>
        JayClassic.referralCount,

    getTier: () =>
        JayClassic.tier,

    getReferralLink: () =>
        getReferralLink(),

    copyReferralLink:
        copyReferralLink,

    shareReferral:
        shareReferral,

    logout:
        logoutMember,

    showToast:
        showToast
};


/* =========================================================
   39. INITIALIZE WHATSAPP
   ========================================================= */

initializeWhatsAppReferralLinks();
