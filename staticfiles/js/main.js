document.addEventListener("DOMContentLoaded", function () {
  console.log("Biospace carregado com sucesso 🚀");

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + "=")) {
          cookieValue = decodeURIComponent(cookie.slice(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  // =====================
  // LIKE BUTTON
  // =====================
  const likeBtn = document.getElementById("like-btn");

  if (likeBtn) {
    console.log("Like button encontrado ✅");

    const likeUrl = likeBtn.dataset.likeUrl;
    const csrfToken = getCookie("csrftoken");

    likeBtn.addEventListener("click", () => {
      console.log("Clique no like");

      fetch(likeUrl, {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
      })
        .then(res => res.json())
        .then(data => {
          console.log("Resposta do servidor:", data);
          document.getElementById("like-count").innerText = data.likes_count;
        });
    });
  }

  // =====================
  // SCROLL SUAVE
  // =====================
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // =====================
  // MENU ATIVO
  // =====================
  const currentUrl = window.location.pathname;
  const navLinks = document.querySelectorAll(".site-nav a");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentUrl) {
      link.classList.add("active");
    }
  });
});

// =====================
// THEME TOGGLE (fora do DOMContentLoaded)
// =====================
const toggle = document.getElementById("theme-toggle");

if (toggle) {
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    toggle.textContent = currentTheme === "dark" ? "☀️" : "🌙";
  }

  toggle.addEventListener("click", () => {
    let theme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    toggle.textContent = theme === "dark" ? "☀️" : "🌙";
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".mobile-menu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
});
