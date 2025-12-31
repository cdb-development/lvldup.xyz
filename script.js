// 1. FAILSAFE PRELOADER (Ensures the site shows up no matter what)
const dismissLoader = () => {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.classList.add("loader-hidden");
        // Start Typewriter ONLY after loader is gone
        initTypewriter();
    }
};

// Force dismiss after 3 seconds even if page hasn't "fully" loaded
setTimeout(dismissLoader, 3000);

// Dismiss immediately when everything is ready
window.addEventListener("load", dismissLoader);

// 2. TYPEWRITER ENGINE
function initTypewriter() {
    const target = document.getElementById('typewriter');
    if (target && typeof Typewriter !== 'undefined') {
        new Typewriter('#typewriter', {
            strings: ['Precision.', 'Innovation.', 'Performance.', 'The Future.'],
            autoStart: true,
            loop: true,
            cursor: '|'
        });
    }
}

// 3. COMMAND PALETTE LOGIC
const palette = document.getElementById("command-palette");
window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        palette.classList.toggle("hidden");
        document.getElementById("palette-input").focus();
    }
    if (e.key === "Escape") palette.classList.add("hidden");
});

// 4. AUDIO ENGINE
const music = document.getElementById("bg-music");
const audioIcon = document.getElementById("audio-icon");
window.toggleMusic = function() { // Added to window scope for HTML access
    if (music.paused) {
        music.play().catch(e => console.log("Audio play blocked by browser. Click page first."));
        audioIcon.classList.replace("fa-volume-mute", "fa-volume-up");
    } else {
        music.pause();
        audioIcon.classList.replace("fa-volume-up", "fa-volume-mute");
    }
};

// 5. CUSTOM CURSOR
const dot = document.querySelector(".cursor-dot");
const outline = document.querySelector(".cursor-outline");
window.addEventListener("mousemove", (e) => {
    if(dot && outline) {
        dot.style.left = e.clientX + "px";
        dot.style.top = e.clientY + "px";
        outline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 400, fill: "forwards" });
    }
});

// 6. THEME TOGGLE
window.toggleTheme = function() {
    const current = document.documentElement.getAttribute('data-theme');
    const target = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', target);
    const themeBtnIcon = document.querySelector('#theme-toggle i');
    if(themeBtnIcon) {
        themeBtnIcon.className = target === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
    if(palette) palette.classList.add("hidden");
};
document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

// 7. PARTICLES & TILT INITIALIZATION
if (typeof tsParticles !== 'undefined') {
    tsParticles.load("tsparticles", {
        particles: {
            number: { value: 40 },
            color: { value: "#6366f1" },
            links: { enable: true, opacity: 0.1, color: "#6366f1" },
            move: { enable: true, speed: 0.5 }
        }
    });
}

if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), { 
        max: 15, 
        speed: 400, 
        glare: true, 
        "max-glare": 0.2 
    });
}