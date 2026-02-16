// ====== ANO no rodapé ======
const anoEl = document.getElementById("ano");
if (anoEl) anoEl.textContent = new Date().getFullYear();

// ====== MENU MOBILE (hamburger) ======
const body = document.body;
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu"); // mais direto
const menuClose = document.getElementById("menuClose");
const menuOverlay = document.getElementById("menuOverlay");

function openMenu() {
  body.classList.add("menu-open");
  if (menuToggle) menuToggle.setAttribute("aria-expanded", "true");
  if (menuOverlay) menuOverlay.hidden = false;
}

function closeMenu() {
  body.classList.remove("menu-open");
  if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
  if (menuOverlay) menuOverlay.hidden = true;
}

// Toggle no botão
if (menuToggle) {
  menuToggle.setAttribute("aria-expanded", "false");

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (body.classList.contains("menu-open")) closeMenu();
    else openMenu();
  });
}

// Fecha clicando no overlay
if (menuOverlay) {
  menuOverlay.addEventListener("click", closeMenu);
}

// Fecha no botão X do drawer
if (menuClose) {
  menuClose.addEventListener("click", closeMenu);
}

// Fecha ao clicar em um link do menu (âncoras)
if (menu) {
  menu.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", () => closeMenu());
  });
}

// ESC fecha
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// ====== MODAL DA GALERIA ======
// ====== MODAL DA GALERIA (com navegação) ======
const modal = document.getElementById("modal");
const modalBg = document.getElementById("modalBg");
const modalCloseBtn = document.getElementById("modalClose");
const modalImg = document.getElementById("modalImg");
const modalPrev = document.getElementById("modalPrev");
const modalNext = document.getElementById("modalNext");

const thumbs = Array.from(document.querySelectorAll(".foto"));
let currentIndex = -1;

function openModalByIndex(index) {
  if (!modal || !modalImg) return;
  if (index < 0 || index >= thumbs.length) return;

  const src = thumbs[index].getAttribute("data-img");
  if (!src) return;

  currentIndex = index;
  modalImg.src = src;
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  if (!modal || !modalImg) return;
  modal.setAttribute("aria-hidden", "true");
  modalImg.src = "";
  currentIndex = -1;
}

function prevImg() {
  if (currentIndex === -1) return;
  const nextIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
  openModalByIndex(nextIndex);
}

function nextImg() {
  if (currentIndex === -1) return;
  const nextIndex = (currentIndex + 1) % thumbs.length;
  openModalByIndex(nextIndex);
}

thumbs.forEach((btn, i) => {
  btn.addEventListener("click", () => openModalByIndex(i));
});

if (modalBg) modalBg.addEventListener("click", closeModal);
if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);

if (modalPrev) modalPrev.addEventListener("click", (e) => { e.stopPropagation(); prevImg(); });
if (modalNext) modalNext.addEventListener("click", (e) => { e.stopPropagation(); nextImg(); });

document.addEventListener("keydown", (e) => {
  // ESC fecha
  if (e.key === "Escape") closeModal();

  // só navega se o modal estiver aberto
  if (!modal || modal.getAttribute("aria-hidden") === "true") return;

  if (e.key === "ArrowLeft") prevImg();
  if (e.key === "ArrowRight") nextImg();
});

