/* =========================================================
   JAY CLASSIC
   PROFESSIONAL WEBSITE APPLICATION
   Freelancing • Digital Skills • Online Work
   Referral • VIP • VVIP • Payments • Reviews
========================================================= */


/* =========================================================
   1. SUPABASE CONFIGURATION
========================================================= */

const SUPABASE_URL = "https://cjcyjsgcsgqeqanxwitq.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_F7taABXLhqRbRlkBygPF6A_pMphViS5";

let supabaseClient = null;

try {

    if (window.supabase) {

        supabaseClient =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_KEY
            );
    }

} catch (error) {

    console.error(
        "Supabase initialization failed:",
        error
    );
}


/* =========================================================
   2. GLOBAL STATE
========================================================= */

const JayClassic = {

    member: null,

    referralCode: null,

    referralCount: 0,

    tier: "Regular",

    reviews: [],

    initialized: false
};


/* =========================================================
   3. DOM HELPERS
========================================================= */

function $(selector) {

    return document.querySelector(selector);
}

function $$(selector) {

    return document.querySelectorAll(selector);
}


/* =========================================================
   4. PAGE LOADER
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        try {

            await initializeJayClassic();

        } catch (error) {

            console.error(
                "Initialization error:",
                error
            );

        } finally {

            setTimeout(
                hidePageLoader,
                500
            );
        }
    }
);


function hidePageLoader() {

    const loader =
        $(".page-loader");

    if (loader) {

        loader.classList.add(
            "hidden"
        );
    }
}


/* =========================================================
   5. MAIN INITIALIZATION
========================================================= */

async function initializeJayClassic() {

    if (JayClassic.initialized) {
        return;
    }

    JayClassic.initialized = true;

    initializeTheme();

    initializeMobileMenu();

    initializeHeader();

    initializeSmoothScrolling();

    initializeBackToTop();

    initializeForms();

    initializeReferralSystem();

    initializeShareButtons();

    initializeIntersectionAnimations();

    updateCurrentYear();

    await loadReviews();

    await restoreMemberSession();
}


/* =========================================================
   6. DARK / LIGHT MODE
========================================================= */

function initializeTheme() {

    const savedTheme =
        localStorage.getItem(
            "jayClassicTheme"
        );

    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );
    }

    updateThemeButton();

    const themeToggle =
        $("#themeToggle");

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            toggleTheme
        );
    }
}


function toggleTheme() {

    document.body.classList.toggle(
        "dark-mode"
    );

    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );

    localStorage.setItem(
        "jayClassicTheme",
        isDark ? "dark" : "light"
    );

    updateThemeButton();
}


function updateThemeButton() {

    const icon =
        $("#themeIcon");

    if (!icon) {
        return;
    }

    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );

    icon.textContent =
        isDark ? "☀️" : "🌙";

    icon.setAttribute(
        "aria-label",
        isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
    );
}


/* =========================================================
   7. MOBILE MENU
========================================================= */

function initializeMobileMenu() {

    const menuButton =
        $("#menuToggle");

    const mobileMenu =
        $("#mobileMenu");

    if (!menuButton || !mobileMenu) {
        return;
    }

    menuButton.addEventListener(
        "click",
        () => {

            const active =
                mobileMenu.classList.toggle(
                    "active"
                );

            menuButton.textContent =
                active ? "✕" : "☰";

            menuButton.setAttribute(
                "aria-expanded",
                String(active)
            );
        }
    );

    $$(".mobile-nav-link").forEach(
        link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );
        }
    );

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeMobileMenu();
            }
        }
    );

    document.addEventListener(
        "click",
        event => {

            if (
                mobileMenu.classList.contains(
                    "active"
                ) &&
                !mobileMenu.contains(
                    event.target
                ) &&
                !menuButton.contains(
                    event.target
                )
            ) {

                closeMobileMenu();
            }
        }
    );
}


function closeMobileMenu() {

    const mobileMenu =
        $("#mobileMenu");

    const menuButton =
        $("#menuToggle");

    if (mobileMenu) {

        mobileMenu.classList.remove(
            "active"
        );
    }

    if (menuButton) {

        menuButton.textContent = "☰";

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );
    }
}


/* =========================================================
   8. HEADER SCROLL EFFECT
========================================================= */

function initializeHeader() {

    const header =
        $(".header");

    if (!header) {
        return;
    }

    const handleScroll = () => {

        if (window.scrollY > 20) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );
        }
    };

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

    handleScroll();
}


/* =========================================================
   9. SMOOTH SCROLLING
========================================================= */

function initializeSmoothScrolling() {

    $$('a[href^="#"]').forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
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

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                    closeMobileMenu();
                }
            );
        }
    );
}


/* =========================================================
   10. BACK TO TOP
========================================================= */

function initializeBackToTop() {

    const button =
        $(".back-to-top");

    if (!button) {
        return;
    }

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
        { passive: true }
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
   11. CURRENT YEAR
========================================================= */

function updateCurrentYear() {

    const year =
        $("#year");

    if (year) {

        year.textContent =
            new Date().getFullYear();
    }
}


/* =========================================================
   12. REFERRAL SYSTEM
========================================================= */

function initializeReferralSystem() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const referral =
        params.get("ref");

    if (referral) {

        const cleanReferral =
            referral
                .trim()
                .toUpperCase();

        if (
            cleanReferral.length >= 4 &&
            cleanReferral.length <= 30
        ) {

            localStorage.setItem(
                "jayClassicReferral",
                cleanReferral
            );
        }
    }

    const savedReferral =
        localStorage.getItem(
            "jayClassicReferral"
        );

    if (savedReferral) {

        const referralInputs =
            $$(
                '[name="referralCode"], #referralCode'
            );

        referralInputs.forEach(
            input => {

                input.value =
                    savedReferral;
            }
        );
    }

    updateReferralDisplay();
}


/* =========================================================
   13. CREATE REFERRAL CODE
========================================================= */

function generateReferralCode(
    name = ""
) {

    const cleaned =
        name
            .replace(
                /[^a-zA-Z0-9]/g,
                ""
            )
            .toUpperCase()
            .slice(0, 6);

    const random =
        Math.random()
            .toString(36)
            .substring(2, 7)
            .toUpperCase();

    return (
        "JAY-" +
        (cleaned || "USER") +
        "-" +
        random
    );
}


/* =========================================================
   14. DETERMINE MEMBER TIER
========================================================= */

function calculateTier(
    referralCount
) {

    const count =
        Number(referralCount) || 0;

    if (count >= 10) {

        return "VVIP";
    }

    if (count >= 3) {

        return "VIP";
    }

    return "Regular";
}


/* =========================================================
   15. TIER REQUIREMENTS
========================================================= */

function getTierRequirement(
    tier
) {

    if (tier === "VVIP") {

        return {
            minimum: 10,
            next: 10
        };
    }

    if (tier === "VIP") {

        return {
            minimum: 3,
            next: 10
        };
    }

    return {
        minimum: 0,
        next: 3
    };
}


/* =========================================================
   16. UPDATE REFERRAL DASHBOARD
========================================================= */

function updateReferralDisplay() {

    const count =
        JayClassic.referralCount;

    const tier =
        JayClassic.tier;

    const badge =
        $(".tier-badge");

    if (badge) {

        badge.textContent =
            tier.toUpperCase();

        badge.classList.remove(
            "regular-tier",
            "vip-tier",
            "vvip-tier"
        );

        if (tier === "VVIP") {

            badge.classList.add(
                "vvip-tier"
            );

        } else if (tier === "VIP") {

            badge.classList.add(
                "vip-tier"
            );

        } else {

            badge.classList.add(
                "regular-tier"
            );
        }
    }

    const countElement =
        $("[data-referral-count]");

    if (countElement) {

        countElement.textContent =
            count;
    }

    const tierElements =
        $$("[data-member-tier]");

    tierElements.forEach(
        element => {

            element.textContent =
                tier;
        }
    );

    const progress =
        calculateProgress(
            count
        );

    const progressFill =
        $(".progress-fill");

    if (progressFill) {

        progressFill.style.width =
            `${progress}%`;
    }

    const progressText =
        $("[data-referral-progress]");

    if (progressText) {

        if (tier === "VVIP") {

            progressText.textContent =
                "VVIP unlocked — you have reached 10 verified referrals.";

        } else if (tier === "VIP") {

            const remaining =
                Math.max(
                    10 - count,
                    0
                );

            progressText.textContent =
                `${remaining} more verified referral${remaining === 1 ? "" : "s"} to reach VVIP.`;

        } else {

            const remaining =
                Math.max(
                    3 - count,
                    0
                );

            progressText.textContent =
                `${remaining} more verified referral${remaining === 1 ? "" : "s"} to reach VIP.`;
        }
    }

    updateReferralLink();
}


/* =========================================================
   17. REFERRAL PROGRESS
========================================================= */

function calculateProgress(
    count
) {

    const referralCount =
        Math.max(
            Number(count) || 0,
            0
        );

    if (referralCount >= 10) {
        return 100;
    }

    return Math.min(
        (referralCount / 10) * 100,
        100
    );
}


/* =========================================================
   18. REFERRAL LINK
========================================================= */

function updateReferralLink() {

    const input =
        $("#referralLink");

    if (!input) {
        return;
    }

    if (!JayClassic.referralCode) {

        input.value =
            "Register to generate your referral link";

        return;
    }

    const baseUrl =
        window.location.origin +
        window.location.pathname;

    input.value =
        `${baseUrl}?ref=${encodeURIComponent(
            JayClassic.referralCode
        )}`;
}


/* =========================================================
   19. COPY REFERRAL LINK
========================================================= */

async function copyReferralLink() {

    const input =
        $("#referralLink");

    if (
        !input ||
        !JayClassic.referralCode
    ) {

        showMessage(
            "Register first",
            "Your personal referral link will be created after registration.",
            "warning"
        );

        return;
    }

    try {

        await navigator.clipboard.writeText(
            input.value
        );

        showMessage(
            "Link copied",
            "Your referral link is ready to share.",
            "success"
        );

    } catch (error) {

        input.select();

        document.execCommand(
            "copy"
        );

        showMessage(
            "Link copied",
            "Your referral link has been copied.",
            "success"
        );
    }
}


/* =========================================================
   20. SHARE REFERRAL LINK
========================================================= */

function initializeShareButtons() {

    const copyButton =
        $("#copyReferralBtn");

    if (copyButton) {

        copyButton.addEventListener(
            "click",
            copyReferralLink
        );
    }

    const shareButtons =
        $$(".share-btn");

    shareButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const platform =
                        button.dataset.share;

                    shareReferral(
                        platform
                    );
                }
            );
        }
    );
}


function shareReferral(
    platform
) {

    if (!JayClassic.referralCode) {

        showMessage(
            "Register first",
            "Create your Jay Classic account before sharing your referral link.",
            "warning"
        );

        return;
    }

    const link =
        `${window.location.origin}${window.location.pathname}?ref=${encodeURIComponent(
            JayClassic.referralCode
        )}`;

    const message =
        `Join Jay Classic for freelancing, digital skills and online work. Register using my referral link: ${link}`;

    let shareUrl = "";

    if (platform === "whatsapp") {

        shareUrl =
            `https://wa.me/?text=${encodeURIComponent(
                message
            )}`;

    } else if (platform === "facebook") {

        shareUrl =
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                link
            )}`;

    } else if (platform === "twitter") {

        shareUrl =
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                message
            )}`;

    } else {

        if (
            navigator.share
        ) {

            navigator.share({
                title:
                    "Jay Classic",
                text:
                    message,
                url:
                    link
            });

            return;
        }
    }

    if (shareUrl) {

        window.open(
            shareUrl,
            "_blank",
            "noopener,noreferrer"
        );
    }
}


/* =========================================================
   21. RESTORE MEMBER SESSION
========================================================= */

async function restoreMemberSession() {

    if (!supabaseClient) {
        return;
    }

    try {

        const savedEmail =
            localStorage.getItem(
                "jayClassicMemberEmail"
            );

        if (!savedEmail) {
            return;
        }

        const {
            data,
            error
        } =
            await supabaseClient
                .from("registrations")
                .select("*")
                .eq(
                    "email",
                    savedEmail
                )
                .maybeSingle();

        if (error) {

            console.warn(
                "Member lookup:",
                error.message
            );

            return;
        }

        if (data) {

            JayClassic.member =
                data;

            JayClassic.referralCode =
                data.referral_code ||
                generateReferralCode(
                    data.name
                );

            JayClassic.referralCount =
                Number(
                    data.referral_count
                ) || 0;

            JayClassic.tier =
                calculateTier(
                    JayClassic.referralCount
                );

            updateReferralDisplay();

            showMemberDashboard();
        }

    } catch (error) {

        console.error(
            "Session restore error:",
            error
        );
    }
}


/* =========================================================
   22. SHOW MEMBER DASHBOARD
========================================================= */

function showMemberDashboard() {

    const memberArea =
        $(".member-area-section");

    if (memberArea) {

        memberArea.style.display =
            "block";
    }

    const memberName =
        $("[data-member-name]");

    if (
        memberName &&
        JayClassic.member
    ) {

        memberName.textContent =
            JayClassic.member.name ||
            "Member";
    }

    const email =
        $("[data-member-email]");

    if (
        email &&
        JayClassic.member
    ) {

        email.textContent =
            JayClassic.member.email ||
            "";
    }
}


/* =========================================================
   23. REGISTRATION
========================================================= */

function initializeForms() {

    const registrationForm =
        $("#registrationForm");

    if (registrationForm) {

        registrationForm.addEventListener(
            "submit",
            handleRegistration
        );
    }

    const reviewForm =
        $("#reviewForm");

    if (reviewForm) {

        reviewForm.addEventListener(
            "submit",
            handleReviewSubmission
        );
    }

    const contactForm =
        $("#contactForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            handleContactSubmission
        );
    }

    const paymentForm =
        $("#paymentForm");

    if (paymentForm) {

        paymentForm.addEventListener(
            "submit",
            handlePaymentSubmission
        );
    }
}


/* =========================================================
   24. HANDLE REGISTRATION
========================================================= */

async function handleRegistration(
    event
) {

    event.preventDefault();

    const form =
        event.currentTarget;

    const name =
        getValue(
            "#studentName"
        );

    const email =
        getValue(
            "#studentEmail"
        );

    const phone =
        getValue(
            "#studentPhone"
        );

    const service =
        getValue(
            "#skill"
        );

    const message =
        getValue(
            "#studentMessage"
        );

    const referralCode =
        getValue(
            "#referralCode"
        ) ||
        localStorage.getItem(
            "jayClassicReferral"
        ) ||
        "";

    if (
        !name ||
        !email ||
        !phone ||
        !service
    ) {

        showMessage(
            "Complete the form",
            "Please fill in all required registration fields.",
            "warning"
        );

        return;
    }

    if (!isValidEmail(email)) {

        showMessage(
            "Invalid email",
            "Please enter a valid email address.",
            "warning"
        );

        return;
    }

    if (!supabaseClient) {

        showMessage(
            "Connection problem",
            "The registration service is currently unavailable.",
            "error"
        );

        return;
    }

    const button =
        form.querySelector(
            'button[type="submit"]'
        );

    setButtonLoading(
        button,
        true,
        "Registering..."
    );

    try {

        const referralCodeForNewMember =
            generateReferralCode(
                name
            );

        const registrationData = {

            name:
                name,

            email:
                email.toLowerCase(),

            phone:
                phone,

            service:
                service,

            message:
                message,

            referral_code:
                referralCodeForNewMember,

            referred_by:
                referralCode || null,

            referral_count:
                0,

            tier:
                "Regular",

            membership_status:
                "active"
        };

        const {
            data,
            error
        } =
            await supabaseClient
                .from("registrations")
                .insert(
                    registrationData
                )
                .select()
                .single();

        if (error) {

            if (
                error.code ===
                "23505"
            ) {

                showMessage(
                    "Already registered",
                    "This email may already have a Jay Classic registration.",
                    "warning"
                );

            } else {

                throw error;
            }

            return;
        }

        JayClassic.member =
            data;

        JayClassic.referralCode =
            data.referral_code ||
            referralCodeForNewMember;

        JayClassic.referralCount = 0;

        JayClassic.tier =
            "Regular";

        localStorage.setItem(
            "jayClassicMemberEmail",
            email.toLowerCase()
        );

        updateReferralDisplay();

        showMemberDashboard();

        form.reset();

        showMessage(
            "Registration successful",
            `Welcome to Jay Classic, ${name}. Your referral code is ${JayClassic.referralCode}.`,
            "success"
        );

        setTimeout(
            () => {

                const dashboard =
                    $(".member-area-section");

                if (dashboard) {

                    dashboard.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }

            },
            800
        );

    } catch (error) {

        console.error(
            "Registration error:",
            error
        );

        showMessage(
            "Registration failed",
            "We could not complete your registration. Please try again.",
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
   25. REVIEW SYSTEM
========================================================= */

async function handleReviewSubmission(
    event
) {

    event.preventDefault();

    const form =
        event.currentTarget;

    const name =
        getValue(
            "#reviewName"
        );

    const rating =
        Number(
            getValue(
                "#reviewRating"
            )
        );

    const comment =
        getValue(
            "#reviewMessage"
        );

    if (
        !name ||
        !rating ||
        !comment
    ) {

        showMessage(
            "Complete the review",
            "Please provide your name, rating and comment.",
            "warning"
        );

        return;
    }

    if (
        rating < 1 ||
        rating > 5
    ) {

        showMessage(
            "Invalid rating",
            "Please choose a rating from 1 to 5.",
            "warning"
        );

        return;
    }

    if (!supabaseClient) {

        showMessage(
            "Connection problem",
            "The review service is unavailable right now.",
            "error"
        );

        return;
    }

    const button =
        form.querySelector(
            'button[type="submit"]'
        );

    setButtonLoading(
        button,
        true,
        "Publishing..."
    );

    try {

        const reviewData = {

            name:
                name,

            role:
                "Jay Classic Community",

            comment:
                comment,

            rating:
                rating
        };

        const {
            error
        } =
            await supabaseClient
                .from("reviews")
                .insert(
                    reviewData
                );

        if (error) {
            throw error;
        }

        form.reset();

        showMessage(
            "Review submitted",
            "Thank you for sharing your experience with Jay Classic.",
            "success"
        );

        await loadReviews();

    } catch (error) {

        console.error(
            "Review error:",
            error
        );

        showMessage(
            "Review failed",
            "Your review could not be submitted. Please try again.",
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
   26. LOAD REVIEWS
========================================================= */

async function loadReviews() {

    if (!supabaseClient) {
        return;
    }

    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .from("reviews")
                .select(
                    "name, role, comment, rating, created_at"
                )
                .order(
                    "created_at",
                    {
                        ascending: false
                    }
                );

        if (error) {
            throw error;
        }

        JayClassic.reviews =
            data || [];

        renderReviews(
            JayClassic.reviews
        );

        updateAverageRating(
            JayClassic.reviews
        );

    } catch (error) {

        console.warn(
            "Could not load reviews:",
            error.message
        );
    }
}


/* =========================================================
   27. RENDER REVIEWS
========================================================= */

function renderReviews(
    reviews
) {

    const grid =
        $(".reviews-grid");

    if (!grid) {
        return;
    }

    if (!reviews.length) {
        return;
    }

    grid.innerHTML = "";

    reviews.forEach(
        review => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "review-card";

            const rating =
                Math.max(
                    1,
                    Math.min(
                        5,
                        Number(
                            review.rating
                        ) || 5
                    )
                );

            const stars =
                "★".repeat(
                    rating
                ) +
                "☆".repeat(
                    5 - rating
                );

            const author =
                escapeHTML(
                    review.name ||
                    "Jay Classic Member"
                );

            const role =
                escapeHTML(
                    review.role ||
                    "Community Member"
                );

            const comment =
                escapeHTML(
                    review.comment ||
                    ""
                );

            const initials =
                getInitials(
                    review.name
                );

            card.innerHTML = `

                <div class="review-stars">
                    ${stars}
                </div>

                <p>
                    “${comment}”
                </p>

                <div class="review-author">

                    <div class="review-avatar">
                        ${initials}
                    </div>

                    <div>

                        <strong>
                            ${author}
                        </strong>

                        <span>
                            ${role}
                        </span>

                    </div>

                </div>
            `;

            grid.appendChild(
                card
            );
        }
    );
}


/* =========================================================
   28. AVERAGE RATING
========================================================= */

function updateAverageRating(
    reviews
) {

    const score =
        $(".rating-score > strong");

    const stars =
        $(".rating-score .stars");

    const label =
        $(".rating-score span");

    if (!reviews.length) {

        if (score) {
            score.textContent = "—";
        }

        if (stars) {
            stars.textContent =
                "☆☆☆☆☆";
        }

        if (label) {
            label.textContent =
                "No community reviews yet";
        }

        return;
    }

    const ratings =
        reviews.map(
            review =>
                Number(
                    review.rating
                ) || 0
        );

    const total =
        ratings.reduce(
            (sum, value) =>
                sum + value,
            0
        );

    const average =
        total /
        ratings.length;

    if (score) {

        score.textContent =
            average.toFixed(1);
    }

    if (stars) {

        const rounded =
            Math.round(
                average
            );

        stars.textContent =
            "★".repeat(
                rounded
            ) +
            "☆".repeat(
                5 - rounded
            );
    }

    if (label) {

        label.textContent =
            `${reviews.length} community review${
                reviews.length === 1
                    ? ""
                    : "s"
            }`;
    }

    updateRatingBars(
        ratings
    );
}


/* =========================================================
   29. RATING BARS
========================================================= */

function updateRatingBars(
    ratings
) {

    const rows =
        $$(".rating-bar-row");

    if (!rows.length) {
        return;
    }

    const total =
        ratings.length;

    rows.forEach(
        row => {

            const value =
                Number(
                    row.dataset.rating
                );

            if (
                !value ||
                value < 1 ||
                value > 5
            ) {
                return;
            }

            const count =
                ratings.filter(
                    rating =>
                        rating === value
                ).length;

            const percentage =
                total
                    ? (count / total) *
                      100
                    : 0;

            const bar =
                row.querySelector(
                    ".rating-bar div"
                );

            const number =
                row.querySelector(
                    ".rating-count"
                );

            if (bar) {

                bar.style.width =
                    `${percentage}%`;
            }

            if (number) {

                number.textContent =
                    count;
            }
        }
    );
}


/* =========================================================
   30. CONTACT FORM
========================================================= */

async function handleContactSubmission(
    event
) {

    event.preventDefault();

    const form =
        event.currentTarget;

    const name =
        getValue(
            "#contactName"
        );

    const email =
        getValue(
            "#contactEmail"
        );

    const service =
        getValue(
            "#contactService"
        );

    const message =
        getValue(
            "#contactMessage"
        );

    if (
        !name ||
        !email ||
        !message
    ) {

        showMessage(
            "Complete the form",
            "Please fill in your name, email and message.",
            "warning"
        );

        return;
    }

    if (!isValidEmail(email)) {

        showMessage(
            "Invalid email",
            "Please enter a valid email address.",
            "warning"
        );

        return;
    }

    const button =
        form.querySelector(
            'button[type="submit"]'
        );

    setButtonLoading(
        button,
        true,
        "Preparing..."
    );

    try {

        const subject =
            `Jay Classic Website Inquiry${
                service
                    ? " - " + service
                    : ""
            }`;

        const body = `
Hello Jay Ouko,

My name is ${name}.

Email: ${email}

Service:
${service || "General inquiry"}

Message:
${message}

Sent from the Jay Classic website.
        `.trim();

        const mailto =
            `mailto:emmanuelouko21@gmail.com?subject=${encodeURIComponent(
                subject
            )}&body=${encodeURIComponent(
                body
            )}`;

        window.location.href =
            mailto;

        form.reset();

        showMessage(
            "Message prepared",
            "Your email application should open with the message ready to send.",
            "success"
        );

    } catch (error) {

        console.error(
            "Contact error:",
            error
        );

        showMessage(
            "Could not prepare message",
            "Please contact Jay Classic through WhatsApp or email.",
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
   31. PAYMENT SUBMISSION
========================================================= */

async function handlePaymentSubmission(
    event
) {

    event.preventDefault();

    const form =
        event.currentTarget;

    const name =
        getFormValue(
            form,
            "paymentName"
        );

    const email =
        getFormValue(
            form,
            "paymentEmail"
        );

    const phone =
        getFormValue(
            form,
            "paymentPhone"
        );

    const plan =
        getFormValue(
            form,
            "paymentPlan"
        );

    const transactionCode =
        getFormValue(
            form,
            "transactionCode"
        );

    if (
        !name ||
        !email ||
        !phone ||
        !plan ||
        !transactionCode
    ) {

        showMessage(
            "Complete payment details",
            "Please provide all required payment information.",
            "warning"
        );

        return;
    }

    if (!supabaseClient) {

        showMessage(
            "Payment service unavailable",
            "Please try again later or contact Jay Classic.",
            "error"
        );

        return;
    }

    const button =
        form.querySelector(
            'button[type="submit"]'
        );

    setButtonLoading(
        button,
        true,
        "Submitting..."
    );

    try {

        const paymentData = {

            name:
                name,

            email:
                email.toLowerCase(),

            phone:
                phone,

            plan:
                plan,

            transaction_code:
                transactionCode,

            status:
                "pending",

            submitted_at:
                new Date().toISOString()
        };

        const {
            error
        } =
            await supabaseClient
                .from("payments")
                .insert(
                    paymentData
                );

        if (error) {
            throw error;
        }

        form.reset();

        showMessage(
            "Payment submitted",
            "Your transaction has been submitted for verification.",
            "success"
        );

    } catch (error) {

        console.error(
            "Payment submission error:",
            error
        );

        showMessage(
            "Payment submission failed",
            "Check your transaction details and try again.",
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
   32. FORM VALUE HELPERS
========================================================= */

function getValue(
    selector
) {

    const element =
        $(selector);

    return element
        ? element.value.trim()
        : "";
}


function getFormValue(
    form,
    name
) {

    const element =
        form.elements[name];

    return element
        ? element.value.trim()
        : "";
}


/* =========================================================
   33. EMAIL VALIDATION
========================================================= */

function isValidEmail(
    email
) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);
}


/* =========================================================
   34. BUTTON LOADING
========================================================= */

function setButtonLoading(
    button,
    loading,
    text = "Please wait..."
) {

    if (!button) {
        return;
    }

    if (loading) {

        button.dataset.originalText =
            button.innerHTML;

        button.disabled = true;

        button.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            ${text}
        `;

    } else {

        button.disabled = false;

        if (
            button.dataset.originalText
        ) {

            button.innerHTML =
                button.dataset.originalText;
        }
    }
}


/* =========================================================
   35. TOAST MESSAGE
========================================================= */

let toastTimer = null;

function showMessage(
    title,
    message,
    type = "success"
) {

    let toast =
        $(".toast");

    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.className =
            "toast";

        toast.innerHTML = `

            <div class="toast-icon">
                <i class="fas fa-check"></i>
            </div>

            <div class="toast-content">

                <strong>
                    Message
                </strong>

                <p>
                    Notification
                </p>

            </div>

            <button
                type="button"
                aria-label="Close notification"
            >
                ×
            </button>
        `;

        document.body.appendChild(
            toast
        );

        toast
            .querySelector("button")
            .addEventListener(
                "click",
                () => {

                    toast.classList.remove(
                        "show"
                    );
                }
            );
    }

    const icon =
        toast.querySelector(
            ".toast-icon i"
        );

    const titleElement =
        toast.querySelector(
            ".toast-content strong"
        );

    const messageElement =
        toast.querySelector(
            ".toast-content p"
        );

    if (titleElement) {

        titleElement.textContent =
            title;
    }

    if (messageElement) {

        messageElement.textContent =
            message;
    }

    if (icon) {

        if (type === "error") {

            icon.className =
                "fas fa-times";

        } else if (
            type === "warning"
        ) {

            icon.className =
                "fas fa-exclamation";

        } else {

            icon.className =
                "fas fa-check";
        }
    }

    toast.classList.add(
        "show"
    );

    clearTimeout(
        toastTimer
    );

    toastTimer =
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
   36. ESCAPE HTML
========================================================= */

function escapeHTML(
    value
) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        String(
            value ?? ""
        );

    return div.innerHTML;
}


/* =========================================================
   37. INITIALS
========================================================= */

function getInitials(
    name
) {

    const words =
        String(
            name || "JC"
        )
            .trim()
            .split(
                /\s+/
            )
            .filter(Boolean);

    if (!words.length) {
        return "JC";
    }

    return words
        .slice(0, 2)
        .map(
            word =>
                word
                    .charAt(0)
                    .toUpperCase()
        )
        .join("");
}


/* =========================================================
   38. INTERSECTION ANIMATIONS
========================================================= */

function initializeIntersectionAnimations() {

    if (
        !("IntersectionObserver" in window)
    ) {
        return;
    }

    const elements =
        $$(".service-card, .job-card, .membership-card");

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";

                            observer.unobserve(
                                entry.target
                            );
                        }
                    }
                );

            },
            {
                threshold: 0.08
            }
        );

    elements.forEach(
        element => {

            element.style.opacity =
                "0";

            element.style.transform =
                "translateY(20px)";

            element.style.transition =
                "opacity .6s ease, transform .6s ease";

            observer.observe(
                element
            );
        }
    );
}


/* =========================================================
   39. WHATSAPP BUTTONS
========================================================= */

$$(
    'a[href*="wa.me"]'
).forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                try {

                    const currentRef =
                        JayClassic.referralCode;

                    if (
                        currentRef
                    ) {

                        const href =
                            link.getAttribute(
                                "href"
                            );

                        if (
                            href &&
                            !href.includes(
                                "ref="
                            )
                        ) {

                            const separator =
                                href.includes(
                                    "?"
                                )
                                    ? "&"
                                    : "?";

                            link.setAttribute(
                                "href",
                                `${href}${separator}ref=${encodeURIComponent(
                                    currentRef
                                )}`
                            );
                        }
                    }

                } catch (error) {

                    console.warn(
                        "WhatsApp referral update failed.",
                        error
                    );
                }
            }
        );
    }
);


/* =========================================================
   40. REGISTRATION REFERRAL DISPLAY
========================================================= */

function injectReferralFieldIfNeeded() {

    const form =
        $("#registrationForm");

    if (!form) {
        return;
    }

    let input =
        $("#referralCode");

    if (input) {
        return;
    }

    const savedReferral =
        localStorage.getItem(
            "jayClassicReferral"
        );

    if (!savedReferral) {
        return;
    }

    const group =
        document.createElement(
            "div"
        );

    group.className =
        "form-group";

    group.innerHTML = `

        <label for="referralCode">
            Referral Code
        </label>

        <input
            type="text"
            id="referralCode"
            name="referralCode"
            value="${escapeHTML(
                savedReferral
            )}"
            readonly
        >
    `;

    const messageField =
        $("#studentMessage");

    if (
        messageField &&
        messageField.closest(
            ".form-group"
        )
    ) {

        messageField
            .closest(
                ".form-group"
            )
            .before(group);

    } else {

        form.appendChild(
            group
        );
    }
}


/* =========================================================
   41. INITIAL REFERRAL FIELD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setTimeout(
            injectReferralFieldIfNeeded,
            300
        );
    }
);


/* =========================================================
   42. MEMBER LOGOUT
========================================================= */

function logoutJayClassicMember() {

    localStorage.removeItem(
        "jayClassicMemberEmail"
    );

    JayClassic.member = null;

    JayClassic.referralCode = null;

    JayClassic.referralCount = 0;

    JayClassic.tier = "Regular";

    const memberArea =
        $(".member-area-section");

    if (memberArea) {

        memberArea.style.display =
            "none";
    }

    showMessage(
        "Logged out",
        "Your local Jay Classic member session has been cleared.",
        "success"
    );
}


/* =========================================================
   43. GLOBAL JAY CLASSIC API
========================================================= */

window.JayClassic = {

    getMember: () =>
        JayClassic.member,

    getTier: () =>
        JayClassic.tier,

    getReferralCount: () =>
        JayClassic.referralCount,

    getReferralCode: () =>
        JayClassic.referralCode,

    copyReferralLink,

    shareReferral,

    logout:
        logoutJayClassicMember,

    showMessage
};


/* =========================================================
   44. DEVELOPMENT STATUS
========================================================= */

console.log(
    "Jay Classic application loaded successfully."
);

console.log(
    "Referral system:",
    "Regular 0–2 | VIP 3–9 | VVIP 10+"
);
