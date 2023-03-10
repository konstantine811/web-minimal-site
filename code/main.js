// class names
const classNameBallLg = "cursor-ball--large";
const classNameBallSm = "cursor-ball--small";
const linkNavigate = "link-navigate";
const textAnim = "txt-anim";
const textAnimLetter = `${textAnim}-letter`;
const iconAnim = "icon-anim";
// audio
let audioUiHover;
let audioUiClick;
let audioWhoosh;
let audioSuround;
let isEnableSound = false;

document.addEventListener("DOMContentLoaded", () => {
  audioUiHover = document.getElementById("sound-hover");
  audioUiClick = document.getElementById("sound-click");
  audioWhoosh = document.getElementById("sound-whoosh");
  audioSuround = document.getElementById("sound-suround");
  audioSuround.loop = true;
  audioUiClick.currentTime = 0.6;
  createCursor();
  customNavigate();
});

window.addEventListener("blur", () => {
  if (isEnableSound) {
    audioSuround.pause();
  }
});

window.addEventListener("focus", () => {
  if (isEnableSound) {
    audioSuround.play();
  }
});

function onEnableSound(status) {
  audioUiClick.play();
  isEnableSound = status;
  if (isEnableSound) {
    audioSuround.play();
  }
  gsap.to(".popup", {
    keyframes: [
      {
        opacity: 0,
        filter: "blur(0px)",
        ease: "expo.out",
        pointerEvents: "none",
        duration: 2.5,
      },
      { display: "none" },
    ],
  });
  animText();
}

function createCursor() {
  const hoverable = document.querySelectorAll(".hoverable");
  const ballLargeWidth = document
    .getElementsByClassName(classNameBallLg)[0]
    .getBoundingClientRect().width;

  const ballSmallWidth = document
    .getElementsByClassName(classNameBallSm)[0]
    .getBoundingClientRect().width;

  document.body.addEventListener("mousemove", (e) =>
    onMouseMove(e, ballLargeWidth, ballSmallWidth)
  );
  for (let hoverEl of hoverable) {
    hoverEl.addEventListener("mouseenter", onMouseEnter);
    hoverEl.addEventListener("mouseleave", onMouseLeave);
  }

  document.addEventListener("touchstart", onMouseEnter, false);
}

function onMouseMove(e, wL, wS) {
  gsap.to(`.${classNameBallLg}`, {
    x: e.pageX - wL / 2,
    y: e.pageY - wL / 2,
    ease: "expo.out",
    duration: 1.5,
  });

  gsap.to(`.${classNameBallSm}`, {
    x: e.pageX - wS / 2,
    y: e.pageY - wS / 2,
    ease: "expo.out",
  });
}

function onMouseEnter() {
  audioUiHover.play();
  gsap.to(`.${classNameBallLg}`, {
    scale: 2,
    ease: "back.out(1.7)",
    duration: 0.6,
    overwrite: true,
  });
}

function onMouseLeave() {
  audioUiHover.pause();
  audioUiHover.currentTime = 0;
  gsap.to(`.${classNameBallLg}`, {
    scale: 1,
    ease: "expo.out",
    duration: 0.4,
    overwrite: true,
  });
}

function splitElToLetter(el, className) {
  el.innerHTML = el.textContent.replace(
    /\S/g,
    `<span class='${className}'>$&</span>`
  );
}

function animText() {
  if (isEnableSound) {
    audioWhoosh.play();
  }
  const txtEl = document.querySelectorAll(`.${textAnim}`);
  for (let el of txtEl) {
    splitElToLetter(el, `${textAnimLetter}`);
  }
  gsap.from(`.${textAnimLetter}`, {
    y: 100,
    opacity: 0,
    filter: "blur(5px)",

    duration: 2,
    ease: "circ.out",
    stagger: 0.05,
  });

  gsap.from(`.${iconAnim}`, {
    y: 10,
    opacity: 0,
    scale: 0.5,
    filter: "blur(5px)",
    duration: 2,
    ease: "circ.out",
    stagger: 0.3,
  });
}

function customNavigate() {
  const linkEl = document.querySelectorAll(`.${linkNavigate}`);
  for (let el of linkEl) {
    const hrefValue = el.getAttribute("href");
    el.addEventListener("click", (event) => {
      event.preventDefault();
      if (hrefValue !== "") {
        audioUiClick.play();

        gsap.to(`.${textAnimLetter}`, {
          y: -10,
          opacity: 0,
          filter: "blur(5px)",
          duration: 1,
          ease: "circ.out",
          stagger: 0.01,
          overwrite: true,
        });

        gsap.to(`.${iconAnim}`, {
          y: -10,
          scale: 0,
          filter: "blur(5px)",
          duration: 2,
          ease: "circ.out",
          stagger: 0.3,
          overwrite: true,
        });
        setTimeout(() => {
          window.location.href = hrefValue;
        }, 1500);
      }
    });
  }
}
