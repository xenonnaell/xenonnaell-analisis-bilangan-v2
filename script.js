(function initLoading(){

  const screen = document.getElementById("loadingScreen");
  const track = document.getElementById("loadingTrack");
  const bar = document.getElementById("loadingBarFill");
  const whale = document.getElementById("loadingWhale");
  const label = document.getElementById("loadingLabel");
  const decor = document.getElementById("loadingDecor");

  if (!screen || !track || !bar || !whale || !label || !decor) return;

  let progress = 0;
  let finished = false;

  function placeWhale(value){
    const trackWidth = track.clientWidth;
    const whaleWidth = whale.offsetWidth;

    const maxLeft = Math.max(
      0,
      trackWidth - whaleWidth
    );

    whale.style.left =
      (value / 100) * maxLeft + "px";
  }

  function createBubble(amount = 3){

    const whaleRect = whale.getBoundingClientRect();
    const screenRect = screen.getBoundingClientRect();

    for(let i = 0; i < amount; i++){

      const bubble = document.createElement("img");

      bubble.src = "bubble.png";
      bubble.className = "loading-bubble";
      bubble.alt = "";

      const startX =
        whaleRect.left -
        screenRect.left +
        whaleRect.width * (0.58 + Math.random() * 0.20);

      const startY =
        whaleRect.top -
        screenRect.top +
        whaleRect.height * (0.05 + Math.random() * 0.15);

      const size =
        8 + Math.random() * 14;

      const drift =
        (Math.random() * 70 - 35) + "px";

      const rise =
        -(70 + Math.random() * 100) + "px";

      const duration =
        (1.7 + Math.random() * 1.2) + "s";

      bubble.style.left = startX + "px";
      bubble.style.top = startY + "px";
      bubble.style.width = size + "px";
      bubble.style.height = size + "px";

      bubble.style.setProperty(
        "--bubble-drift",
        drift
      );

      bubble.style.setProperty(
        "--bubble-rise",
        rise
      );

      bubble.style.setProperty(
        "--bubble-duration",
        duration
      );

      decor.appendChild(bubble);

      setTimeout(() => {
        bubble.remove();
      }, 3200);
    }
  }

  const bubbleTimer = setInterval(() => {

    if(finished) return;

    createBubble(
      Math.random() > .45 ? 2 : 3
    );

  }, 650);

  function update(value){

    progress = Math.min(100,value);

    bar.style.width =
      progress + "%";

    label.textContent =
      "LOADING... " +
      Math.floor(progress) +
      "%";

    placeWhale(progress);
  }

  const startTime = performance.now();
  const duration = 2400;

  function animate(now){

    if(finished) return;

    const elapsed =
      now - startTime;

    const raw =
      Math.min(1,elapsed / duration);

    const eased =
      1 - Math.pow(1 - raw,3);

    update(eased * 100);

    if(raw < 1){

      requestAnimationFrame(animate);

    }else{

      finished = true;

      clearInterval(bubbleTimer);

      progress = 100;

      update(100);

      createBubble(5);

      label.textContent =
        "COMPLETE";

      setTimeout(() => {

        screen.classList.add(
          "loading-done"
        );

        setTimeout(() => {

          screen.style.display =
            "none";

          const app =
            document.getElementById("pages");

          if(app){
            document.body.style.overflow =
              "auto";
          }

        },600);

      },500);
    }
  }

  placeWhale(0);

  window.addEventListener(
    "resize",
    () => placeWhale(progress)
  );

  requestAnimationFrame(animate);

})();
