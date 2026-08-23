/* =========================================================
   script.js — logika interaktif surprise page untuk Tiara
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initAmbientDecor();
  initOpening();
  initScrollReveal();
  initTinyCards();
  initQuiz();
  initSecretButton();
  initFinalButton();
  initModal();
});

/* =========================================================
   1. DEKORASI AMBIENT: FLOATING HEARTS + SPARKLES
========================================================= */
function initAmbientDecor() {
  const layer = document.getElementById("ambientLayer");
  if (!layer) return;

  const hearts = ["💗", "💕", "💖", "🩷"];
  const sparkles = ["✨", "⭐", "🌟"];

  function spawnHeart() {
    const span = document.createElement("span");
    span.className = "floating-heart";
    span.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    span.style.left = Math.random() * 100 + "vw";
    span.style.fontSize = 14 + Math.random() * 18 + "px";
    span.style.setProperty("--drift", (Math.random() * 60 - 30) + "px");
    span.style.animationDuration = 9 + Math.random() * 7 + "s";
    layer.appendChild(span);
    setTimeout(() => span.remove(), 17000);
  }

  function spawnSparkle() {
    const span = document.createElement("span");
    span.className = "floating-sparkle";
    span.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    span.style.left = Math.random() * 100 + "vw";
    span.style.fontSize = 10 + Math.random() * 14 + "px";
    layer.appendChild(span);
    setTimeout(() => span.remove(), 9000);
  }

  setInterval(spawnHeart, 1500);
  setInterval(spawnSparkle, 1000);
  for (let n = 0; n < 4; n++) setTimeout(spawnHeart, n * 300);
}

/* =========================================================
   2. OPENING SCREEN -> MASUK KE HALAMAN UTAMA
========================================================= */
function initOpening() {
  const openBtn = document.getElementById("openBtn");
  const opening = document.getElementById("opening");
  const mainContent = document.getElementById("mainContent");
  if (!openBtn || !opening || !mainContent) return;

  openBtn.addEventListener("click", () => {
    burstHeartsBurst(40);

    opening.classList.add("is-leaving");

    setTimeout(() => {
      opening.hidden = true;
      mainContent.hidden = false;
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
      initScrollReveal(); // pastikan reveal observer jalan setelah konten muncul
    }, 550);
  });
}

/* =========================================================
   3. FADE-IN SETIAP SECTION SAAT DI-SCROLL
========================================================= */
let revealObserver = null;
function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal:not(.is-visible)");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("is-visible"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
  }

  targets.forEach((t) => revealObserver.observe(t));
}

/* =========================================================
   4. CARD "HAL-HAL KECIL" YANG BISA DIKLIK
========================================================= */
function initTinyCards() {
  const cards = document.querySelectorAll(".tiny-card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.remove("is-clicked");
      void card.offsetWidth;
      card.classList.add("is-clicked");

      const msg = card.dataset.msg || "Aku suka semua tentang kamu. 💗";
      openModal(msg, "💗");
    });
  });
}

/* =========================================================
   5. QUIZ "KALAU KAMU BERTANYA"
========================================================= */
function initQuiz() {
  const buttons = document.querySelectorAll(".btn-quiz");
  const response = document.getElementById("quizResponse");
  if (!buttons.length || !response) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      response.hidden = false;
      response.classList.remove("is-visible");
      void response.offsetWidth;
      burstConfetti(30);
    });
  });
}

/* =========================================================
   6. SECRET BUTTON
========================================================= */
function initSecretButton() {
  const btn = document.getElementById("secretBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    burstHeartsBurst(50);
    openModal("Aku cuma mau bilang... makasih ya udah jadi seseorang yang berarti. 💗", "🤫");
  });
}

/* =========================================================
   7. TOMBOL SURPRISE TERAKHIR
========================================================= */
function initFinalButton() {
  const btn = document.getElementById("finalBtn");
  const message = document.getElementById("finalMessage");
  if (!btn || !message) return;

  btn.addEventListener("click", () => {
    message.hidden = false;
    burstConfetti(200);
    burstHeartsBurst(60);
    setTimeout(() => {
      message.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
  });
}

/* =========================================================
   8. MODAL GENERIK
========================================================= */
let modalOverlayEl, modalTextEl, modalEmojiEl, modalCloseEl;

function initModal() {
  modalOverlayEl = document.getElementById("modalOverlay");
  modalTextEl = document.getElementById("modalText");
  modalEmojiEl = document.getElementById("modalEmoji");
  modalCloseEl = document.getElementById("modalClose");
  if (!modalOverlayEl) return;

  modalCloseEl.addEventListener("click", closeModal);
  modalOverlayEl.addEventListener("click", (e) => {
    if (e.target === modalOverlayEl) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function openModal(text, emoji) {
  if (!modalOverlayEl) return;
  modalTextEl.textContent = text;
  modalEmojiEl.textContent = emoji || "💗";
  modalOverlayEl.classList.add("is-active");
}

function closeModal() {
  if (!modalOverlayEl) return;
  modalOverlayEl.classList.remove("is-active");
}

/* =========================================================
   9. FLOATING HEARTS BURST (banyak hati muncul sekaligus)
========================================================= */
function burstHeartsBurst(count = 40) {
  const layer = document.getElementById("ambientLayer");
  if (!layer) return;
  const hearts = ["💗", "💕", "💖", "🩷", "❤️"];

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const span = document.createElement("span");
      span.className = "floating-heart";
      span.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      span.style.left = Math.random() * 100 + "vw";
      span.style.fontSize = 16 + Math.random() * 20 + "px";
      span.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
      span.style.animationDuration = 6 + Math.random() * 5 + "s";
      layer.appendChild(span);
      setTimeout(() => span.remove(), 12000);
    }, i * 30);
  }
}

/* =========================================================
   10. CONFETTI (canvas, ringan, tanpa library)
========================================================= */
const confettiCanvas = document.getElementById("confettiCanvas");
const confettiCtx = confettiCanvas ? confettiCanvas.getContext("2d") : null;
let confettiParticles = [];
let confettiAnimId = null;

function resizeConfettiCanvas() {
  if (!confettiCanvas) return;
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeConfettiCanvas);
resizeConfettiCanvas();

const confettiColors = ["#ff8fb3", "#ffd6e8", "#c9b6ff", "#ffe6a7", "#ffffff", "#8a6fd1"];

function burstConfetti(count = 150) {
  if (!confettiCtx || count <= 0) return;

  for (let i = 0; i < count; i++) {
    confettiParticles.push({
      x: Math.random() * confettiCanvas.width,
      y: -20 - Math.random() * 200,
      size: 5 + Math.random() * 6,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      speedY: 2 + Math.random() * 3,
      speedX: (Math.random() - 0.5) * 2.5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
      shape: Math.random() > 0.5 ? "circle" : "rect",
      life: 0,
      maxLife: 200 + Math.random() * 80,
    });
  }

  if (!confettiAnimId) {
    confettiAnimId = requestAnimationFrame(animateConfetti);
  }
}

function animateConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confettiParticles.forEach((p) => {
    p.x += p.speedX;
    p.y += p.speedY;
    p.rotation += p.rotationSpeed;
    p.life++;

    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate((p.rotation * Math.PI) / 180);
    confettiCtx.fillStyle = p.color;
    confettiCtx.globalAlpha = Math.max(0, 1 - p.life / p.maxLife);

    if (p.shape === "circle") {
      confettiCtx.beginPath();
      confettiCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      confettiCtx.fill();
    } else {
      confettiCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    }
    confettiCtx.restore();
  });

  confettiParticles = confettiParticles.filter(
    (p) => p.life < p.maxLife && p.y < confettiCanvas.height + 40
  );

  if (confettiParticles.length > 0) {
    confettiAnimId = requestAnimationFrame(animateConfetti);
  } else {
    confettiAnimId = null;
  }
}
