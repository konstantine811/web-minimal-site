const classNameBallLg = "cursor-ball--large";
const classNameBallSm = "cursor-ball--small";

document.addEventListener("DOMContentLoaded", () => {
  createCursor();
});

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
  gsap.to(`.${classNameBallLg}`, {
    scale: 2,
    ease: "back.out(1.7)",
    duration: 0.6,
    overwrite: true,
  });
}

function onMouseLeave() {
  gsap.to(`.${classNameBallLg}`, {
    scale: 1,
    ease: "expo.out",
    duration: 0.4,
    overwrite: true,
  });
}
