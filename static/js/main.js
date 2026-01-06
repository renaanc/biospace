document.addEventListener("DOMContentLoaded", function () {
  console.log("Biospace carregado com sucesso 🚀");

  /* =====================
     COOKIE (CSRF)
     ===================== */
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

  /* =====================
     LIKE BUTTON
     ===================== */
  const likeBtn = document.getElementById("like-btn");

  if (likeBtn) {
    const likeUrl = likeBtn.dataset.likeUrl;
    const csrfToken = getCookie("csrftoken");

    likeBtn.addEventListener("click", () => {
      fetch(likeUrl, {
        method: "POST",
        headers: { "X-CSRFToken": csrfToken },
        credentials: "include",
      })
        .then(res => res.json())
        .then(data => {
          document.getElementById("like-count").innerText = data.likes_count;
        });
    });
  }

  /* =====================
     SCROLL SUAVE
     ===================== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* =====================
     MENU ATIVO (DESKTOP)
     ===================== */
  const currentUrl = window.location.pathname;
  document.querySelectorAll(".site-nav a").forEach(link => {
    if (link.getAttribute("href") === currentUrl) {
      link.classList.add("active");
    }
  });

  /* =====================
     THEME TOGGLE (GLOBAL)
     ===================== */
  const themeButtons = document.querySelectorAll("#theme-toggle");
  const html = document.documentElement;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
  }

  function updateThemeIcon(theme) {
    themeButtons.forEach(btn => {
      btn.textContent = theme === "dark" ? "☀️" : "🌙";
    });
  }

  themeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const newTheme =
        html.getAttribute("data-theme") === "dark" ? "light" : "dark";

      html.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
    });
  });

  /* =====================
     MOBILE SIDEBAR ✅
     ===================== */
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".mobile-sidebar");

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });

    sidebar.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        sidebar.classList.remove("active");
      });
    });
  } else {
    console.warn("Sidebar mobile ou botão não encontrados");
  }
});
