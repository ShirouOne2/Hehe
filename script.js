// ── Gallery Data ──────────────────────────────────────
// Add or remove entries here. img paths are relative to index.html.
const data = [
    { img: "images/img1.jpg", text: "Hellooo beautiful, Thank you for coming into my life." },
    { img: "images/img2.jpg", text: "Sorry kung ganito lang kaya ko ibigay ngayon." },
    { img: "images/img3.jpg", text: "I just want you to know na, i care a lot." },
    { img: "images/img4.jpg", text: "Na every single moment with you is my favourite memory." },
    { img: "images/img5.jpg", text: "Na every walk with you feels like the beginning of something beautiful." },
    { img: "images/img6.jpg", text: "Na ikaw yung nag tatanggal ng pagod ko everytime na down ako." },
    { img: "images/img7.jpg", text: "Ill be dependent on you and i hope na ikaw rin sakin." },
    { img: "images/img8.jpg", text: "Yun laaang hshsh arte ba? next mo naaa hehe." },
    { img: "images/img9.gif", text: "I love you so much mahal ♡♡." },
    { img: "images/img10.jpg", text: "Will you be my Valentines Again?." }
];

let currentIndex = 0;

function updateGallery() {
    const img  = document.getElementById('gallery-img');
    const desc = document.getElementById('image-description');
    const ctr  = document.getElementById('img-counter');

    // Fade out
    img.classList.add('changing');
    desc.classList.add('changing');

    setTimeout(() => {
        img.src          = data[currentIndex].img;
        desc.textContent = data[currentIndex].text;
        ctr.textContent  = `${currentIndex + 1} / ${data.length}`;

        // Fade back in once loaded
        img.onload = () => img.classList.remove('changing');
        if (img.complete) img.classList.remove('changing'); // already cached
        desc.classList.remove('changing');
    }, 320);
}

function nextImg() {
    currentIndex = (currentIndex + 1) % data.length;
    updateGallery();
}

function prevImg() {
    currentIndex = (currentIndex - 1 + data.length) % data.length;
    updateGallery();
}

// ── Music Player ──────────────────────────────────────
const audio   = document.getElementById('main-audio');
const playBtn = document.getElementById('play-btn');
const timeTxt = document.getElementById('time');
const bar     = document.getElementById('progress');
const artDot  = document.getElementById('art-dot');

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '⏸';
        artDot.classList.add('spinning');
    } else {
        audio.pause();
        playBtn.innerHTML = '▶';
        artDot.classList.remove('spinning');
    }
});

audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const m = Math.floor(audio.currentTime / 60);
    const s = Math.floor(audio.currentTime % 60);
    timeTxt.textContent = `${m}:${s < 10 ? '0' + s : s}`;
    bar.style.width = (audio.currentTime / audio.duration * 100) + '%';
});

audio.addEventListener('ended', () => {
    playBtn.innerHTML = '▶';
    artDot.classList.remove('spinning');
    bar.style.width = '0%';
});

// Click-to-seek on the progress track
document.getElementById('progress-track').addEventListener('click', (e) => {
    if (!audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
});

// ── Floating Petals ───────────────────────────────────
const layer = document.getElementById('petalLayer');
const PETAL_COUNT = 18;

for (let i = 0; i < PETAL_COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.cssText = `
        left:                ${Math.random() * 100}%;
        width:               ${8  + Math.random() * 10}px;
        height:              ${10 + Math.random() * 12}px;
        animation-duration:  ${7  + Math.random() * 10}s;
        animation-delay:     ${-Math.random() * 12}s;
    `;
    layer.appendChild(p);
}