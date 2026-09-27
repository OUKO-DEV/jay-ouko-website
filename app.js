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
