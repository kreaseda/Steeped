document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("rain-audio");
  const soundToggle = document.getElementById("sound-toggle");
  const sections = {
    menu: document.getElementById("main-menu"),
    sip: document.getElementById("sip-room"),
    infusions: document.getElementById("infusions-room"),
    echoes: document.getElementById("echoes-room")
  };

  let muted = false;

  document.body.addEventListener("click", () => {
    audio.volume = 0.3;
    audio.play().catch(() => console.log("Autoplay blocked"));
  }, { once: true });

  soundToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    muted = !muted;
    audio.muted = muted;
    soundToggle.textContent = muted ? "sound off" : "sound";
  });

  function showSection(key) {
    for (let k in sections) {
      sections[k].style.display = "none";
    }

    sections[key].style.display = key === "menu" ? "flex" : "block";

    document.body.className = "";
    if (key === "sip") {
      document.body.classList.add("sip-bg");
    } else if (key === "infusions") {
      document.body.classList.add("infusions-bg");
    } else if (key === "echoes") {
      document.body.classList.add("echoes-bg");
    } else {
      document.body.classList.add("default-bg");
    }

    const rain = document.querySelector(".rain-window");
    const candle = document.querySelector(".candle-flicker");
    const showAmbient = key === "menu";
    rain.style.display = showAmbient ? "block" : "none";
    candle.style.display = showAmbient ? "block" : "none";

    if (audio.paused) {
      audio.volume = 0.3;
      audio.play().catch(() => console.log("Autoplay blocked"));
    }
  }

  // Echoes interaction logic
// ...existing code...
  // Echoes interaction logic
  const glitch = document.getElementById("glitchOverlay");
  const echoAudio = document.getElementById("echoSound");
  const echoTrigger = document.getElementById("echo-trigger");
  const calmTrigger = document.getElementById("calm-trigger"); // Add this line

  if (echoTrigger && echoAudio && glitch) {
    echoTrigger.addEventListener("click", () => {
      glitch.classList.remove("hidden");
      echoAudio.play();
    });

    echoAudio.addEventListener("ended", () => {
      glitch.classList.add("hidden");
    });

    // Add Calm button logic
   if (calmTrigger) {
  calmTrigger.addEventListener("click", () => {
    glitch.classList.add("hidden");
    echoAudio.pause();
    echoAudio.currentTime = 0;
    calmTrigger.classList.add("fade-out");
    setTimeout(() => {
      calmTrigger.style.display = "none";
    }, 1000); // Match the CSS transition
  });
}

  }
// ...existing code...

  // Nav buttons
  document.getElementById("takeasip-link").addEventListener("click", () => showSection("sip"));
  document.getElementById("infusions-link").addEventListener("click", () => showSection("infusions"));
  document.getElementById("echoes-link").addEventListener("click", () => showSection("echoes"));

  // Back buttons
  document.getElementById("back-menu-1").addEventListener("click", () => showSection("menu"));
  document.getElementById("back-menu-2").addEventListener("click", () => showSection("menu"));
  document.getElementById("back-menu-3").addEventListener("click", () => showSection("menu"));

  // Load on menu
  showSection("menu");
});
