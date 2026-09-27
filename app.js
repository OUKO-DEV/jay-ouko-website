// ==================== SUPABASE CONNECTION ====================

const SUPABASE_URL = "https://cjcyjsgcsgqeqanxwitq.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_F7taABXLhqRbRlkBygPF6A_pMphViS5";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);// Jay Ouko Website

document.addEventListener("DOMContentLoaded", function () {

    console.log("Jay Ouko website loaded successfully!");

    // Smooth navigation
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {
        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

});
function sendQuote() {
    const name = document.getElementById("quoteName").value.trim();
    const email = document.getElementById("quoteEmail").value.trim();
    const service = document.getElementById("quoteService").value;
    const budget = document.getElementById("quoteBudget").value;
    const message = document.getElementById("quoteMessage").value.trim();

    if (!name || !email || !service || !budget || !message) {
        alert("Please fill in all the fields before sending.");
        return;
    }

    const whatsappMessage =
        "Hello Jay Ouko!%0A%0A" +
        "I would like to request a quote.%0A%0A" +
        "Name: " + encodeURIComponent(name) + "%0A" +
        "Email: " + encodeURIComponent(email) + "%0A" +
        "Service: " + encodeURIComponent(service) + "%0A" +
        "Budget: " + encodeURIComponent(budget) + "%0A" +
        "Project Details: " + encodeURIComponent(message);

    const whatsappURL =
        "https://wa.me/254142617814?text=" + whatsappMessage;

    window.open(whatsappURL, "_blank");
}
/* DARK / LIGHT MODE */

function toggleTheme() {
    const body = document.body;
    const button = document.getElementById("themeToggle");

    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        button.textContent = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        button.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("theme");
    const button = document.getElementById("themeToggle");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");

        if (button) {
            button.textContent = "☀️ Light Mode";
        }
    }
});
// ==================== PUBLIC TESTIMONIALS ====================

const testimonialForm = document.getElementById("testimonialForm");
const testimonialMessage = document.getElementById("testimonialMessage");
const testimonialGrid = document.querySelector(".testimonial-grid");

// Load existing reviews from Supabase
async function loadTestimonials() {
    if (!testimonialGrid) return;

    const { data, error } = await supabaseClient
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Could not load testimonials:", error);
        return;
    }

    data.forEach((testimonial) => {
        const card = document.createElement("div");
        card.className = "testimonial-card";

        const stars = "★".repeat(testimonial.rating) +
                      "☆".repeat(5 - testimonial.rating);

        card.innerHTML = `
            <div class="stars">${stars}</div>
            <p>"${escapeHTML(testimonial.comment)}"</p>
            <h3>${escapeHTML(testimonial.name)}</h3>
            <span>Website Visitor</span>
        `;

        testimonialGrid.appendChild(card);
    });
}

// Protect the page from HTML being entered into comments
function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// Submit a new review
if (testimonialForm) {

    testimonialForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const name = document.getElementById("testimonialName").value.trim();
        const rating = Number(
            document.getElementById("testimonialRating").value
        );
        const comment = document.getElementById("testimonialComment").value.trim();

        testimonialMessage.textContent = "Submitting your review...";

        const { error } = await supabaseClient
            .from("testimonials")
            .insert([
                {
                    name: name,
                    rating: rating,
                    comment: comment
                }
            ]);

        if (error) {
            console.error("Submission error:", error);

            testimonialMessage.textContent =
                "Sorry, your review could not be submitted. Please try again.";

            return;
        }

        testimonialMessage.textContent =
            "Thank you! Your review has been submitted successfully. ⭐";

        testimonialForm.reset();

        // Refresh the displayed reviews
        testimonialGrid.innerHTML = "";
        await loadTestimonials();
    });
}

// Load reviews when the website opens
loadTestimonials();
