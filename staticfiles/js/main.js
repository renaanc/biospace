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

document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     THEME TOGGLE (GLOBAL)
     ===================== */

  const themeButtons = document.querySelectorAll("#theme-toggle");
  const html = document.documentElement;

  // aplica tema salvo
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
      const currentTheme = html.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";

      html.setAttribute("data-theme", currentTheme);
      localStorage.setItem("theme", currentTheme);
      updateThemeIcon(currentTheme);
    });
  });



/* =====================
   MOBILE SIDEBAR
   ===================== */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".mobile-sidebar");

  if (!menuToggle || !sidebar) {
    console.warn("Menu toggle ou sidebar não encontrados");
    return;
  }

  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });

  sidebar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("active");
    });
  });
});


});
