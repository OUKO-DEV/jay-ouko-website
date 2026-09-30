```javascript
/* =========================================================
   JAY OUKO PORTFOLIO
   COMPLETE JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   1. PAGE LOADER
========================================================= */

window.addEventListener("load", () => {
  const loader = document.querySelector(".page-loader");

  if (loader) {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 500);
  }
});


/* =========================================================
   2. DOM ELEMENTS
========================================================= */

const body = document.body;

const header = document.querySelector(".site-header");

const menuToggle = document.querySelector(".menu-toggle");

const navbar = document.querySelector(".navbar");

const themeToggle = document.querySelector(".theme-toggle");

const backToTop = document.querySelector(".back-to-top");

const chatbot = document.querySelector(".chatbot");

const chatbotToggle = document.querySelector(".chatbot-toggle");

const chatbotClose = document.querySelector(".chatbot-close");

const chatbotForm = document.querySelector(".chatbot-form");

const chatbotInput = document.querySelector(".chatbot-form input");

const chatbotMessages = document.querySelector(".chatbot-messages");


/* =========================================================
   3. MOBILE MENU
========================================================= */

if (menuToggle && navbar) {

  menuToggle.addEventListener("click", () => {

    const isOpen = navbar.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);

    body.classList.toggle("menu-open", isOpen);

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

  });


  /* CLOSE MENU WHEN LINK IS CLICKED */

  const navLinks = navbar.querySelectorAll("a");

  navLinks.forEach((link) => {

    link.addEventListener("click", () => {

      navbar.classList.remove("open");

      menuToggle.classList.remove("active");

      body.classList.remove("menu-open");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });

}


/* =========================================================
   4. CLOSE MOBILE MENU WITH ESC
========================================================= */

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    if (navbar) {
      navbar.classList.remove("open");
    }

    if (menuToggle) {
      menuToggle.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );
    }

    body.classList.remove("menu-open");

  }

});


/* =========================================================
   5. HEADER SCROLL EFFECT
========================================================= */

function updateHeader() {

  if (!header) return;

  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

}


window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);

updateHeader();


/* =========================================================
   6. DARK / LIGHT THEME
========================================================= */

const savedTheme = localStorage.getItem("jayOukoTheme");

if (savedTheme === "light") {

  body.classList.add("light-theme");

}


function updateThemeIcon() {

  if (!themeToggle) return;

  const icon = themeToggle.querySelector("i");

  if (!icon) return;

  if (body.classList.contains("light-theme")) {

    icon.className = "fa-solid fa-moon";

    themeToggle.setAttribute(
      "aria-label",
      "Switch to dark mode"
    );

    themeToggle.setAttribute(
      "title",
      "Switch to dark mode"
    );

  } else {

    icon.className = "fa-solid fa-sun";

    themeToggle.setAttribute(
      "aria-label",
      "Switch to light mode"
    );

    themeToggle.setAttribute(
      "title",
      "Switch to light mode"
    );

  }

}


updateThemeIcon();


if (themeToggle) {

  themeToggle.addEventListener("click", () => {

    body.classList.toggle("light-theme");

    const currentTheme =
      body.classList.contains("light-theme")
        ? "light"
        : "dark";

    localStorage.setItem(
      "jayOukoTheme",
      currentTheme
    );

    updateThemeIcon();

  });

}


/* =========================================================
   7. ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll(
  "section[id]"
);

const navigationLinks = document.querySelectorAll(
  ".nav-link"
);


function updateActiveNavigation() {

  if (!sections.length) return;

  let currentSection = "";

  sections.forEach((section) => {

    const sectionTop =
      section.offsetTop - 140;

    const sectionHeight =
      section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY <
        sectionTop + sectionHeight
    ) {

      currentSection = section.id;

    }

  });


  navigationLinks.forEach((link) => {

    link.classList.remove("active");

    const target =
      link.getAttribute("href");

    if (
      target === `#${currentSection}`
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


/* =========================================================
   8. BACK TO TOP
========================================================= */

function updateBackToTop() {

  if (!backToTop) return;

  if (window.scrollY > 500) {

    backToTop.classList.add("visible");

  } else {

    backToTop.classList.remove("visible");

  }

}


window.addEventListener(
  "scroll",
  updateBackToTop,
  { passive: true }
);

updateBackToTop();


if (backToTop) {

  backToTop.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

}


/* =========================================================
   9. TYPING EFFECT
========================================================= */

const typingElement =
  document.querySelector(".typing-text");


const typingWords = [
  "Web Developer",
  "Freelancer",
  "Graphic Designer",
  "Digital Marketer",
  "AI Tools Creator"
];


let wordIndex = 0;

let characterIndex = 0;

let deleting = false;


function typingEffect() {

  if (!typingElement) return;


  const currentWord =
    typingWords[wordIndex];


  if (!deleting) {

    characterIndex++;

  } else {

    characterIndex--;

  }


  typingElement.textContent =
    currentWord.substring(
      0,
      characterIndex
    );


  let typingSpeed =
    deleting ? 55 : 90;


  if (
    !deleting &&
    characterIndex === currentWord.length
  ) {

    typingSpeed = 1500;

    deleting = true;

  }


  if (
    deleting &&
    characterIndex === 0
  ) {

    deleting = false;

    wordIndex =
      (wordIndex + 1) %
      typingWords.length;

    typingSpeed = 400;

  }


  setTimeout(
    typingEffect,
    typingSpeed
  );

}


typingEffect();


/* =========================================================
   10. SCROLL REVEAL
========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "revealed"
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


revealElements.forEach((element) => {

  revealObserver.observe(element);

});


/* =========================================================
   11. PORTFOLIO FILTER
========================================================= */

const filterButtons =
  document.querySelectorAll(".filter-btn");

const portfolioCards =
  document.querySelectorAll(".portfolio-card");


filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    filterButtons.forEach((btn) => {

      btn.classList.remove("active");

    });


    button.classList.add("active");


    const selectedFilter =
      button.dataset.filter;


    portfolioCards.forEach((card) => {

      const category =
        card.dataset.category;


      if (
        selectedFilter === "all" ||
        category === selectedFilter
      ) {

        card.classList.remove("hidden");

      } else {

        card.classList.add("hidden");

      }

    });

  });

});


/* =========================================================
   12. ANIMATED COUNTERS
========================================================= */

const counters =
  document.querySelectorAll(
    "[data-count]"
  );


function animateCounter(element) {

  const target =
    Number(
      element.dataset.count
    );


  const duration = 1600;

  const startTime =
    performance.now();


  function updateCounter(currentTime) {

    const elapsed =
      currentTime - startTime;


    const progress =
      Math.min(
        elapsed / duration,
        1
      );


    const eased =
      1 -
      Math.pow(
        1 - progress,
        3
      );


    const currentValue =
      Math.floor(
        eased * target
      );


    element.textContent =
      currentValue;


    if (progress < 1) {

      requestAnimationFrame(
        updateCounter
      );

    } else {

      element.textContent =
        target;

    }

  }


  requestAnimationFrame(
    updateCounter
  );

}


if (counters.length) {

  const counterObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            animateCounter(
              entry.target
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.5
      }
    );


  counters.forEach((counter) => {

    counterObserver.observe(
      counter
    );

  });

}


/* =========================================================
   13. CHATBOT
========================================================= */

function openChatbot() {

  if (!chatbot) return;

  chatbot.classList.add("open");

}


function closeChatbot() {

  if (!chatbot) return;

  chatbot.classList.remove("open");

}


if (chatbotToggle) {

  chatbotToggle.addEventListener(
    "click",
    () => {

      chatbot.classList.toggle("open");

    }
  );

}


if (chatbotClose) {

  chatbotClose.addEventListener(
    "click",
    closeChatbot
  );

}


/* CLOSE CHATBOT OUTSIDE */

document.addEventListener(
  "click",
  (event) => {

    if (!chatbot) return;

    if (
      chatbot.classList.contains("open") &&
      !chatbot.contains(event.target)
    ) {

      closeChatbot();

    }

  }
);


/* =========================================================
   14. CHATBOT RESPONSES
========================================================= */

const chatbotReplies = [

  {
    keywords: [
      "price",
      "pricing",
      "cost",
      "charge",
      "how much"
    ],

    response:
      "My services have different packages depending on the project. You can check the pricing section or contact me directly for a custom quote."
  },

  {
    keywords: [
      "website",
      "web",
      "site"
    ],

    response:
      "I can help with responsive websites, landing pages, portfolio websites and business websites."
  },

  {
    keywords: [
      "graphic",
      "design",
      "logo"
    ],

    response:
      "I offer graphic design services including social media graphics, promotional designs, branding materials and other digital designs."
  },

  {
    keywords: [
      "marketing",
      "digital marketing",
      "social media"
    ],

    response:
      "I can help with digital marketing, social media content, online promotion and basic growth strategies."
  },

  {
    keywords: [
      "ai",
      "artificial intelligence",
      "automation"
    ],

    response:
      "I work with AI tools for productivity, content creation, automation and digital workflows."
  },

  {
    keywords: [
      "contact",
      "email",
      "hire",
      "work"
    ],

    response:
      "You can contact Jay through emmanuelouko21@gmail.com or use the contact form on this website."
  },

  {
    keywords: [
      "class",
      "classes",
      "course",
      "training"
    ],

    response:
      "Online learning sessions are available through my social media channels. Check the Classes section for the current schedule."
  }

];


function getChatbotReply(message) {

  const lowerMessage =
    message.toLowerCase();


  for (
    const item of chatbotReplies
  ) {

    const matched =
      item.keywords.some(
        (keyword) =>
          lowerMessage.includes(
            keyword
          )
      );


    if (matched) {

      return item.response;

    }

  }


  return (
    "Thanks for your message. " +
    "For a specific project or quotation, " +
    "please contact me through email or WhatsApp."
  );

}


function addChatMessage(
  message,
  type = "bot"
) {

  if (!chatbotMessages) return;


  const wrapper =
    document.createElement("div");


  wrapper.className =
    type === "user"
      ? "user-message"
      : "bot-message";


  const paragraph =
    document.createElement("p");


  paragraph.textContent =
    message;


  if (type === "bot") {

    const icon =
      document.createElement("div");


    icon.className =
      "message-icon";


    icon.innerHTML =
      '<i class="fa-solid fa-robot"></i>';


    wrapper.appendChild(icon);

  }


  wrapper.appendChild(
    paragraph
  );


  chatbotMessages.appendChild(
    wrapper
  );


  chatbotMessages.scrollTop =
    chatbotMessages.scrollHeight;

}


if (chatbotForm) {

  chatbotForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const message =
        chatbotInput.value.trim();


      if (!message) return;


      addChatMessage(
        message,
        "user"
      );


      chatbotInput.value = "";


      setTimeout(() => {

        const reply =
          getChatbotReply(
            message
          );


        addChatMessage(
          reply,
          "bot"
        );

      }, 500);

    }
  );

}


/* =========================================================
   15. CHATBOT QUICK ACTIONS
========================================================= */

const quickActionButtons =
  document.querySelectorAll(
    ".chatbot-quick-actions button"
  );


quickActionButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const message =
          button.textContent.trim();


        addChatMessage(
          message,
          "user"
        );


        setTimeout(() => {

          const reply =
            getChatbotReply(
              message
            );


          addChatMessage(
            reply,
            "bot"
          );

        }, 400);

      }
    );

  }
);


/* =========================================================
   16. REVIEW FORM
========================================================= */

const reviewForm =
  document.querySelector(
    "#reviewForm"
  );


const reviewStatus =
  document.querySelector(
    "#reviewStatus"
  );


const reviewsList =
  document.querySelector(
    ".reviews-list"
  );


const reviewName =
  document.querySelector(
    "#reviewName"
  );


const reviewRating =
  document.querySelector(
    "#reviewRating"
  );


const reviewMessage =
  document.querySelector(
    "#reviewMessage"
  );


function getSavedReviews() {

  try {

    return JSON.parse(
      localStorage.getItem(
        "jayOukoReviews"
      )
    ) || [];

  } catch (error) {

    return [];

  }

}


function saveReviews(reviews) {

  localStorage.setItem(
    "jayOukoReviews",
    JSON.stringify(reviews)
  );

}


function renderReviews() {

  if (!reviewsList) return;


  const reviews =
    getSavedReviews();


  reviewsList.innerHTML = "";


  reviews
    .slice()
    .reverse()
    .forEach((review) => {

      const card =
        document.createElement("article");


      card.className =
        "review-item";


      const header =
        document.createElement("div");


      header.className =
        "review-item-header";


      const name =
        document.createElement("strong");


      name.className =
        "review-item-name";


      name.textContent =
        review.name;


      const stars =
        document.createElement("span");


      stars.className =
        "review-item-stars";


      stars.textContent =
        "★".repeat(
          Number(review.rating)
        );


      header.appendChild(name);

      header.appendChild(stars);


      const message =
        document.createElement("p");


      message.textContent =
        review.message;


      card.appendChild(header);

      card.appendChild(message);


      reviewsList.appendChild(card);

    });

}


renderReviews();


if (reviewForm) {

  reviewForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const name =
        reviewName?.value.trim();


      const rating =
        reviewRating?.value;


      const message =
        reviewMessage?.value.trim();


      if (
        !name ||
        !rating ||
        !message
      ) {

        if (reviewStatus) {

          reviewStatus.textContent =
            "Please complete all review fields.";

        }

        return;

      }


      const reviews =
        getSavedReviews();


      reviews.push({

        name,

        rating,

        message,

        date:
          new Date().toISOString()

      });


      saveReviews(reviews);

      renderReviews();


      reviewForm.reset();


      if (reviewStatus) {

        reviewStatus.textContent =
          "Thank you! Your review has been added.";

      }


      setTimeout(() => {

        if (reviewStatus) {

          reviewStatus.textContent =
            "";

        }

      }, 4000);

    }
  );

}


/* =========================================================
   17. CONTACT FORM
========================================================= */

const contactForm =
  document.querySelector(
    "#contactForm"
  );


const contactStatus =
  document.querySelector(
    "#contactStatus"
  );


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const formData =
        new FormData(
          contactForm
        );


      const name =
        formData.get("name") ||
        "";


      const email =
        formData.get("email") ||
        "";


      const subject =
        formData.get("subject") ||
        "Website enquiry";


      const message =
        formData.get("message") ||
        "";


      const bodyText =
        `Hello Jay Ouko,

Name: ${name}
Email: ${email}

Message:
${message}`;


      const mailto =
        "mailto:emmanuelouko21@gmail.com" +
        "?subject=" +
        encodeURIComponent(
          subject
        ) +
        "&body=" +
        encodeURIComponent(
          bodyText
        );


      window.location.href =
        mailto;


      if (contactStatus) {

        contactStatus.textContent =
          "Opening your email application...";

      }

    }
  );

}


/* =========================================================
   18. HIRE BUTTONS
========================================================= */

const hireButtons =
  document.querySelectorAll(
    "[data-hire]"
  );


hireButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const service =
          button.dataset.hire ||
          "a service";


        const subject =
          `Project enquiry - ${service}`;


        const message =
          `Hello Jay Ouko,

I am interested in your ${service} service.

I would like to discuss my project with you.

Thank you.`;


        const mailto =
          "mailto:emmanuelouko21@gmail.com" +
          "?subject=" +
          encodeURIComponent(
            subject
          ) +
          "&body=" +
          encodeURIComponent(
            message
          );


        window.location.href =
          mailto;

      }
    );

  }
);


/* =========================================================
   19. WHATSAPP LINKS
========================================================= */

const whatsappLinks =
  document.querySelectorAll(
    'a[href*="wa.me"]'
  );


whatsappLinks.forEach(
  (link) => {

    link.addEventListener(
      "click",
      () => {

        /* WhatsApp opens normally.
           This handler exists so future
           tracking can be added safely. */

        console.log(
          "WhatsApp contact opened."
        );

      }
    );

  }
);


/* =========================================================
   20. SMOOTH INTERNAL LINKS
========================================================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach((link) => {

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


        if (!target) return;


        event.preventDefault();


        const headerHeight =
          header
            ? header.offsetHeight
            : 0;


        const targetPosition =
          target.offsetTop -
          headerHeight;


        window.scrollTo({

          top:
            targetPosition,

          behavior:
            "smooth"

        });

      }
    );

  });


/* =========================================================
   21. SERVICE CARD HOVER ACCESSIBILITY
========================================================= */

const serviceCards =
  document.querySelectorAll(
    ".service-card"
  );


serviceCards.forEach(
  (card) => {

    card.addEventListener(
      "mouseenter",
      () => {

        card.style.setProperty(
          "--card-active",
          "1"
        );

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.setProperty(
          "--card-active",
          "0"
        );

      }
    );

  }
);


/* =========================================================
   22. CURRENT YEAR
========================================================= */

const yearElements =
  document.querySelectorAll(
    ".current-year"
  );


yearElements.forEach(
  (element) => {

    element.textContent =
      new Date().getFullYear();

  }
);


/* =========================================================
   23. PREVENT EMPTY FORM SUBMISSION
========================================================= */

document
  .querySelectorAll("form")
  .forEach((form) => {

    form.addEventListener(
      "invalid",
      () => {

        form.classList.add(
          "has-error"
        );

      },
      true
    );

  });


/* =========================================================
   24. ONLINE STATUS
========================================================= */

function updateOnlineStatus() {

  const status =
    document.querySelector(
      ".status-badge"
    );


  if (!status) return;


  const text =
    status.querySelector(
      "span:last-child"
    );


  if (!text) return;


  if (navigator.onLine) {

    text.textContent =
      "Available for freelance work";

  } else {

    text.textContent =
      "Currently offline";

  }

}


window.addEventListener(
  "online",
  updateOnlineStatus
);

window.addEventListener(
  "offline",
  updateOnlineStatus
);


/* =========================================================
   25. LAZY IMAGE LOADING
========================================================= */

document
  .querySelectorAll("img")
  .forEach((image) => {

    if (
      !image.hasAttribute(
        "loading"
      )
    ) {

      image.setAttribute(
        "loading",
        "lazy"
      );

    }

  });


/* =========================================================
   26. ERROR-SAFE EXTERNAL LINKS
========================================================= */

document
  .querySelectorAll(
    'a[target="_blank"]'
  )
  .forEach((link) => {

    const existingRel =
      link.getAttribute("rel") ||
      "";


    if (
      !existingRel.includes(
        "noopener"
      )
    ) {

      link.setAttribute(
        "rel",
        `${existingRel} noopener noreferrer`
          .trim()
      );

    }

  });


/* =========================================================
   27. INITIALIZATION MESSAGE
========================================================= */

console.log(
  "%cJay Ouko Portfolio loaded successfully.",
  "font-size:16px;font-weight:bold;"
);

console.log(
  "Website: Jay Ouko | Freelancing & Digital Services"
);


/* =========================================================
   END OF APP.JS
========================================================= */
```
