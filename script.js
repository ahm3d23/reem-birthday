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

const photo = document.getElementById("photo");
const title = document.getElementById("title");
const message = document.getElementById("message");
const counter = document.getElementById("counter");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

function showSlide(newIndex) {
  index = (newIndex + slides.length) % slides.length;

  photo.classList.add("fade");
  message.parentElement.style.opacity = "0";
  message.parentElement.style.transform = "translateY(10px)";

  clearTimeout(photo._timer);

  photo._timer = setTimeout(() => {
    const slide = slides[index];
    photo.src = slide.image;
    title.textContent = slide.title;
    message.textContent = slide.message;
    counter.textContent = `${index + 1} / ${slides.length}`;

    requestAnimationFrame(() => {
      photo.classList.remove("fade");
      message.parentElement.style.opacity = "1";
      message.parentElement.style.transform = "translateY(0)";
    });
  }, 300);
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
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) { showSlide(index + 1); resetAutoplay(); }
    else { showSlide(index - 1); resetAutoplay(); }
  }
}, { passive: true });

showSlide(0);
startAutoplay();
