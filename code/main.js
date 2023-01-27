document.addEventListener("DOMContentLoaded", () => {
  createCursor();
});

function createCursor() {
  const ballLargeWidth = document
    .getElementsByClassName("cursor-ball--large")[0]
    .getBoundingClientRect().width;

  const ballSmallWidth = document
    .getElementsByClassName("cursor-ball--small")[0]
    .getBoundingClientRect().width;

  document.body.addEventListener("mousemove", (e) =>
    onMouseMove(e, ballLargeWidth, ballSmallWidth)
  );
}

function onMouseMove(e, wL, wS) {
  console.log(wL, wS);
  gsap.to(".cursor-ball--large", {
    x: e.pageX - wL / 2,
    y: e.pageY - wL / 2,
    ease: "expo.out",
    duration: 1.5,
  });

  gsap.to(".cursor-ball--small", {
    x: e.pageX - wS / 2,
    y: e.pageY - wS / 2,
    ease: "expo.out",
  });
}
