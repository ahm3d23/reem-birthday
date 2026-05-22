const slides = [
  {
    image: "assets/reem-looking-away.jpeg",
    title: "The Eyes",
    message: "These are the eyes I fell in love with from first sight."
  },
  {
    image: "assets/reem-drawing.jpeg",
    title: "The First Drawing",
    message: "It was the first time I knew I had potential, and you were the first thing that I wanted to draw."
  },
  {
    image: "assets/reem-1.jpeg",
    title: "The Light",
    message: "Happy birthday, Reem. You have a way of making ordinary moments feel unforgettable."
  },
  {
    image: "assets/reem-2.jpeg",
    title: "The Smile",
    message: "May your birthday be as beautiful, soft, and special as the happiness you bring without even trying."
  }
];

let index = 0;
let autoplayTimer = null;
let moving = false;

const photo = document.getElementById("photo");
const photoNext = document.getElementById("photoNext");
const title = document.getElementById("title");
const message = document.getElementById("message");
const counter = document.getElementById("counter");
const dots = document.getElementById("dots");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const msgBox = message.parentElement;

slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.className = "dot" + (i === 0 ? " active" : "");
  dots.appendChild(dot);
});

function updateDots() {
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

const cache = new Set();

function preload(src) {
  if (cache.has(src)) return;
  cache.add(src);
  const img = new Image();
  img.src = src;
}

slides.forEach(s => preload(s.image));

function showSlide(newIndex) {
  if (moving) return;
  newIndex = (newIndex + slides.length) % slides.length;
  if (newIndex === index) return;
  moving = true;

  const slide = slides[newIndex];
  const prevImg = index % 2 === 0 ? photo : photoNext;
  const nextImg = index % 2 === 0 ? photoNext : photo;

  nextImg.classList.remove("hidden");

  nextImg.style.transition = "none";
  nextImg.style.opacity = "0";
  nextImg.style.transform = "scale(1.08)";
  nextImg.src = slide.image;

  void nextImg.offsetHeight;

  nextImg.style.transition = "";
  nextImg.style.opacity = "1";
  nextImg.style.transform = "scale(1)";

  prevImg.style.transform = "scale(1.08)";
  prevImg.style.opacity = "0";

  msgBox.style.opacity = "0";
  msgBox.style.transform = "translateY(10px)";

  setTimeout(() => {
    prevImg.style.transform = "";
    prevImg.style.opacity = "";
    prevImg.classList.add("hidden");

    index = newIndex;
    title.textContent = slide.title;
    message.textContent = slide.message;
    counter.textContent = `${index + 1} / ${slides.length}`;
    updateDots();

    requestAnimationFrame(() => {
      msgBox.style.opacity = "1";
      msgBox.style.transform = "translateY(0)";
    });

    moving = false;
  }, 550);
}

function startAutoplay() {
  stopAutoplay();
  autoplayTimer = setInterval(() => showSlide(index + 1), 6000);
}

function stopAutoplay() {
  clearInterval(autoplayTimer);
  autoplayTimer = null;
}

function resetAutoplay() {
  stopAutoplay();
  startAutoplay();
}

nextBtn.addEventListener("click", () => { showSlide(index + 1); resetAutoplay(); });
prevBtn.addEventListener("click", () => { showSlide(index - 1); resetAutoplay(); });

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") { showSlide(index + 1); resetAutoplay(); }
  if (event.key === "ArrowLeft") { showSlide(index - 1); resetAutoplay(); }
});

let touchStartX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener("touchend", (e) => {
  const diff = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) { showSlide(index + 1); resetAutoplay(); }
    else { showSlide(index - 1); resetAutoplay(); }
  }
}, { passive: true });

photoNext.classList.add("hidden");
showSlide(0);
startAutoplay();
