document.addEventListener("DOMContentLoaded", () => {
  
  // 1. ANIMASI MATH BUBBLES DI LOADING SCREEN
  const mathContainer = document.getElementById('math-bubbles-container');
  const mathSymbols = ['√', 'i', 'z=a+bi', 'π', '+', '-', '∞'];
  
  function createMathBubble() {
    if (!mathContainer) return;
    const bubble = document.createElement('div');
    bubble.classList.add('math-bubble');
    // Pilih simbol random
    bubble.innerText = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
    
    // Posisi X random
    bubble.style.left = Math.random() * 100 + 'vw';
    
    // Ukuran dan durasi random biar natural
    const size = Math.random() * 1.5 + 0.5;
    bubble.style.transform = `scale(${size})`;
    const duration = Math.random() * 3 + 2; // 2-5 detik
    bubble.style.animationDuration = duration + 's';
    
    mathContainer.appendChild(bubble);
    
    // Hapus elemen setelah animasi selesai biar ga berat
    setTimeout(() => {
      bubble.remove();
    }, duration * 1000);
  }

  // Bikin bubble baru setiap 300ms selama loading
  const bubbleInterval = setInterval(createMathBubble, 300);

  // 2. LOGIKA LOADING & SINKRONISASI PAUS
  const loadingScreen = document.getElementById("loading-screen");
  const progressBar = document.getElementById("progress-bar");
  const progressPercent = document.getElementById("progress-percent");
  const loadingWhale = document.getElementById("loading-whale");
  const appContainer = document.getElementById("app-container");
  const textDots = document.getElementById("dots");

  let progress = 0;
  let dotCount = 0;

  const loadingInterval = setInterval(() => {
    // Tambah progress (bisa diubah kecepatannya)
    progress += Math.random() * 3; 
    if (progress > 100) progress = 100;

    // Update UI
    progressBar.style.width = progress + "%";
    progressPercent.innerText = Math.floor(progress) + "%";

    // Sinkronisasi posisi Paus
    if (loadingWhale) {
      // Hitung sisa ruang di track biar paus ga bablas keluar kotak
      const trackWidth = loadingWhale.parentElement.clientWidth;
      const whaleWidth = loadingWhale.clientWidth;
      const maxLeft = trackWidth - whaleWidth;
      
      const whalePos = (progress / 100) * maxLeft;
      loadingWhale.style.left = whalePos + "px";
    }

    // Animasi titik-titik (LOADING...)
    dotCount++;
    textDots.innerText = ".".repeat(dotCount % 4);

    // KETIKA 100% COMPLETE
    if (progress === 100) {
      clearInterval(loadingInterval);
      clearInterval(bubbleInterval);
      
      document.getElementById("loading-text").innerHTML = "COMPLETE!";
      
      // Tunggu bentar biar user liat tulisan complete
      setTimeout(() => {
        loadingScreen.style.opacity = "0"; // Fade out effect
        
        // Benar-benar hapus/hide loading screen setelah fade out selesai
        setTimeout(() => {
          loadingScreen.remove(); // Sesuai request: bener-bener diilangin biar ga konflik
          appContainer.classList.remove("hidden");
          document.body.style.overflow = "auto"; // Balikin scroll
        }, 500);
      }, 800);
    }
  }, 50); // Kecepatan update (ms)
});
