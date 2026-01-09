window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) preloader.style.display = "none";
});
const toggle = document.getElementById("theme-toggle");
const body = document.body;
const setTheme = (isDark) => {
  body.classList.toggle("dark", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
  if (toggle) toggle.textContent = isDark ? "☀️" : "🌙";
};
toggle?.addEventListener("click", () =>
  setTheme(!body.classList.contains("dark"))
);
if (localStorage.getItem("theme") === "dark") setTheme(!0);
const heroText = "Front End Developer | TypeScript | JavaScript | React";
let heroIndex = 0;
const heroTarget = document.querySelector(".typed-text");
function typeHero() {
  if (heroTarget && heroIndex < heroText.length) {
    heroTarget.textContent += heroText.charAt(heroIndex);
    heroIndex++;
    setTimeout(typeHero, 60);
  }
}
const aboutDescription =
  "Passionate Front-End Developer specializing in ReactJS, TypeScript, and JavaScript, creating dynamic, responsive web applications. Skilled in HTML, CSS, and Redux, with a focus on building scalable, maintainable solutions that enhance user experience and performance.";
let aboutIndex = 0;
const aboutTarget = document.getElementById("about-text");
function typeAbout() {
  if (aboutTarget && aboutIndex < aboutDescription.length) {
    aboutTarget.textContent += aboutDescription.charAt(aboutIndex);
    aboutIndex++;
    setTimeout(typeAbout, 5);
  } else if (aboutTarget) {
    aboutTarget.style.textAlign = "justify";
  }
}
const img = document.getElementById("heroImg");
if (img) {
  img.addEventListener("load", () => img.classList.add("show"));
  if (img.complete) img.classList.add("show");
}
const observerOptions = { threshold: 0.2 };
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      if (entry.target.id === "skills") {
        document.querySelectorAll(".bar div").forEach((bar) => {
          bar.style.width = bar.dataset.level + "%";
        });
      }
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);
document
  .querySelectorAll(".fade, #skills")
  .forEach((el) => scrollObserver.observe(el));
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("show");
  });
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
      navLinks.classList.remove("show");
    }
  });
}
const personalData = {
  softSkills: ["Problem-solving", "Strong communication", "Collaboration"],
  interests: [
    "Coding challenges",
    "Learning Swedish 🇸🇪",
    "Table tennis & Padel",
    "Board games",
    "Video games",
  ],
  tools: [
    "Git",
    "Jira",
    "Postman",
    "Bitbucket",
    "Confluence",
    "REST APIs",
    "MUI",
    "React Testing Library",
  ],
  engineering: ["ArcMap", "Wolfram Mathematica", "AutoCAD", "MS Office"],
  contact: [
    {
      icon: "📧",
      label: "safari.arash@gmail.com",
      link: "mailto:safari.arash@gmail.com",
    },
    { icon: "📱", label: "076 294 1124", link: "tel:+46762941124" },
    {
      icon: "🔗",
      label: "LinkedIn Profile",
      link: "https://www.linkedin.com/in/safariarash",
    },
    { icon: "📍", label: "Stockholm", link: "#" },
  ],
};
function renderExtraInfo() {
  const metaContainer = document.getElementById("personal-meta-container");
  if (metaContainer) {
    metaContainer.innerHTML = `
      <div class="personal-meta">
        <p><strong>Soft Skills:</strong> ${personalData.softSkills.join(
          ", "
        )}</p>
        <p><strong>Interests:</strong> ${personalData.interests.join(", ")}</p>
      </div>`;
  }
  const skillsContainer = document.getElementById("extra-skills-container");
  if (skillsContainer) {
    const toolsHtml = personalData.tools
      .map((t) => `<span class="tech-badge">${t}</span>`)
      .join("");
    const engHtml = personalData.engineering
      .map((e) => `<span class="tech-badge gray">${e}</span>`)
      .join("");
    skillsContainer.innerHTML = `
      <p class="sub-heading">Tools & Technologies</p>
      <div class="tech-stack">${toolsHtml}</div>
      <p class="sub-heading">Other Software</p>
      <div class="tech-stack">${engHtml}</div>`;
  }
  const contactContainer = document.getElementById("contact-info-container");
  if (contactContainer) {
    contactContainer.innerHTML = personalData.contact
      .map(
        (item) => `
      <div class="info-item">
        <span>${item.icon}</span>
        <a href="${item.link}" ${
          item.link.startsWith("http") ? 'target="_blank"' : ""
        }>${item.label}</a>
      </div>`
      )
      .join("");
  }
}
const testimonials = [
  {
    name: "Tobias Gårdner",
    position: "CEO and Founder of Ecombooster.io",
    text: "Arash was a vital part of our cross-functional team, contributing to everything from API design discussions to UX studies. He successfully delivered end-to-end features using React, TypeScript, and Git, ensuring quality through automated testing.",
  },
  {
    name: "Angelica Matilda Götlund",
    position: "Frontend Developer | Ecombooster",
    text: "Working with Arash at Ecombooster was a pleasure. He was always there to help whenever anyone needed support, and his friendly and reliable nature made him an exceptional colleague. I highly recommend Arash to any team looking for a dependable and collaborative team member.",
  },
];
function renderTestimonials() {
  const container = document.getElementById("testimonial-container");
  const dotsContainer = document.getElementById("testimonial-dots");
  if (!container || !dotsContainer) return;
  container.innerHTML = testimonials
    .map(
      (t, index) => `
    <div class="testimonial-card ${
      index === 0 ? "active" : ""
    }" data-index="${index}">
      <p class="quote">"${t.text}"</p>
      <div class="testimonial-author">
        <strong>${t.name}</strong>
        <span>${t.position}</span>
      </div>
    </div>`
    )
    .join("");

  dotsContainer.innerHTML = testimonials
    .map(
      (_, index) => `
    <span class="dot ${
      index === 0 ? "active" : ""
    }" onclick="goToSlide(${index})"></span>
  `
    )
    .join("");

  let current = 0;
  const cards = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".dot");

  window.goToSlide = function (index) {
    cards[current].classList.remove("active");
    dots[current].classList.remove("active");

    current = index;

    cards[current].classList.add("active");
    dots[current].classList.add("active");
  };

  setInterval(() => {
    let next = (current + 1) % cards.length;
    goToSlide(next);
  }, 10000);
}

const contactForm = document.getElementById("contact-form");
contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const statusText = document.getElementById("form-status");
  const formData = new FormData(contactForm);
  statusText.textContent = "Sending...";
  const response = await fetch(contactForm.action, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  });
  if (response.ok) {
    statusText.textContent = "Message sent successfully ✅";
    statusText.className = "success";
    contactForm.reset();
  } else {
    statusText.textContent = "Oops! There was a problem sending your message.";
    statusText.className = "error";
  }
});
const githubUsername = "ArashSafarighouzhdi";
const projectsContainer = document.getElementById("projects-container");
async function fetchProjects() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${githubUsername}/repos`
    );
    if (!res.ok) throw new Error("API Limit or Error");
    const repos = await res.json();
    const filtered = repos.filter(
      (repo) => !repo.fork && repo.topics?.includes("portfolio")
    );
    if (filtered.length === 0) {
      projectsContainer.innerHTML =
        "<p>No projects found with 'portfolio' topic.</p>";
      return;
    }
    projectsContainer.innerHTML = filtered
      .map(
        (repo) => `
      <div class="project-card" data-repo-name="${repo.name}">
        <h3>${repo.name}</h3>
        <p class="project-desc">${
          repo.description || "No description provided."
        }</p>
        <div class="tech-stack">${repo.topics
          .filter((t) => t !== "portfolio")
          .map((t) => `<span class="tech-badge">${t}</span>`)
          .join("")}</div>
        <div class="project-links">
          <span class="view-details-btn">Details</span>
          ${
            repo.homepage
              ? `<a href="${repo.homepage}" target="_blank" class="demo-link">Live Demo 🔗</a>`
              : ""
          }
        </div>
      </div>`
      )
      .join("");
    attachModalEvents();
  } catch (err) {
    projectsContainer.innerHTML =
      "<p>Error loading projects. Check back later!</p>";
  }
}
function attachModalEvents() {
  document.querySelectorAll(".view-details-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const repoName = e.target.closest(".project-card").dataset.repoName;
      const res = await fetch(
        `https://api.github.com/repos/${githubUsername}/${repoName}`
      );
      const data = await res.json();
      document.getElementById("modal-title").textContent = data.name;
      document.getElementById("modal-description").textContent =
        data.description || "No description provided.";
      const githubLink = document.getElementById("modal-github");
      const liveLink = document.getElementById("modal-live");
      githubLink.href = data.html_url;
      githubLink.className = "modal-btn outline";
      if (data.homepage) {
        liveLink.href = data.homepage;
        liveLink.style.display = "inline-flex";
        liveLink.className = "modal-btn primary";
      } else {
        liveLink.style.display = "none";
      }
      document.getElementById("project-modal").style.display = "flex";
    });
  });
}
document.querySelector(".close")?.addEventListener("click", () => {
  document.getElementById("project-modal").style.display = "none";
});
function openTab(tabName) {
  document
    .querySelectorAll(".tab-content")
    .forEach((c) => c.classList.remove("active"));
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  document.getElementById(tabName)?.classList.add("active");
  event.currentTarget.classList.add("active");
}
document.addEventListener("DOMContentLoaded", () => {
  renderExtraInfo();
  setTimeout(typeHero, 500);
  setTimeout(typeAbout, 1000);
  setTimeout(() => {
    renderTestimonials();
  }, 1500);
  setTimeout(() => {
    fetchProjects();
  }, 2500);
});
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});
