document.addEventListener("DOMContentLoaded", function () {
  console.log("Biospace carregado com sucesso 🚀");


    // CSRF token
  const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value;
  if (csrfToken) {
    console.log("CSRF token carregado:", csrfToken);
  } else {
    console.warn("Token CSRF não encontrado.");
  }

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

document.addEventListener("DOMContentLoaded", () => {
  const likeBtn = document.getElementById("like-btn");
  if (!likeBtn) return;

  const slug = likeBtn.dataset.slug;
  const csrfToken = getCookie("csrftoken");

  likeBtn.addEventListener("click", () => {
    fetch(`/like/${slug}/`, {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken,
      },
      credentials: "same-origin",
    })
    .then(res => res.json())
    .then(data => {
      document.getElementById("like-count").innerText = data.likes_count;
    });
  });
});

  // Exemplo de requisição com fetch usando o CSRF token
function postComCsrf(url, data) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken, // Envia o token CSRF no cabeçalho
    },
    body: JSON.stringify(data),
  });
}

  // Exemplo: efeito de scroll suave para âncoras
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

  // Exemplo: destaque no menu ativo
  const currentUrl = window.location.pathname;
  const navLinks = document.querySelectorAll(".site-nav a");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentUrl) {
      link.classList.add("active");
    }
  });
});

// Theme toggle
const toggle = document.getElementById("theme-toggle");
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


