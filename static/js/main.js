document.addEventListener("DOMContentLoaded", () => {
  console.log("Biospace carregado com sucesso 🚀");

  /* =====================
     COOKIE (CSRF)
     ===================== */
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      document.cookie.split(";").forEach(cookie => {
        cookie = cookie.trim();
        if (cookie.startsWith(name + "=")) {
          cookieValue = decodeURIComponent(cookie.slice(name.length + 1));
        }
      });
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
          const count = document.getElementById("like-count");
          if (count) count.innerText = data.likes_count;
        });
    });
  }

  /* =====================
     SCROLL SUAVE
     ===================== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
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

  function updateThemeIcon(theme) {
    themeButtons.forEach(btn => {
      btn.textContent = theme === "dark" ? "☀️" : "🌙";
    });
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
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
     MOBILE SIDEBAR
     ===================== */
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".mobile-sidebar");
  const overlay = document.querySelector(".sidebar-overlay");

  const isMobile = () => window.innerWidth < 768;

  if (menuToggle && sidebar && overlay) {
    const openSidebar = () => {
      if (!isMobile()) return;

      sidebar.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    const closeSidebar = () => {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    };

    menuToggle.addEventListener("click", openSidebar);
    overlay.addEventListener("click", closeSidebar);

    sidebar.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeSidebar);
    });
  }

});
