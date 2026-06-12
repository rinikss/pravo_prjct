document.addEventListener("DOMContentLoaded", function () {
  const fullText =
    "Привет. Я Брайан Уильямс, ведущий NBC Nightly News. За годы в журналистике я многое повидал. Был в горячих точках, летал в зоны боевых действий ради того, чтобы ты получал правду из первых уст. В 2003 году я летел на военном вертолёте Chinook прямо над зоной конфликта в Ираке. И вдруг ракета попала в наш вертолёт. Я реально думал, что это конец. Мы упали и выжили чудом. Я много раз рассказывал эту историю солдатам, зрителям, на ток-шоу. Этот момент изменил меня, ведь именно так я понял ценность репортажа с передовой.";

  const textEl = document.getElementById("textContent");
  const arrowEl = document.getElementById("nextArrow");
  const characterEl = document.querySelector(".character");

  let i = 0;
  const typeSpeed = 25;
  const frameSpeed = 180;

  let typingTimer = null;
  let frameTimer = null;

  function startCharacterAnimation() {
    if (frameTimer) return;
    frameTimer = setInterval(() => {
      characterEl.classList.toggle("frame-b");
    }, frameSpeed);
  }

  function stopCharacterAnimation() {
    if (frameTimer) {
      clearInterval(frameTimer);
      frameTimer = null;
    }
    characterEl.classList.remove("frame-b");
  }

  function typeWriter() {
    if (i < fullText.length) {
      textEl.textContent += fullText.charAt(i);
      i++;
      typingTimer = setTimeout(typeWriter, typeSpeed);
    } else {
      finishTyping();
    }
  }

  function finishTyping() {
    if (typingTimer) {
      clearTimeout(typingTimer);
      typingTimer = null;
    }
    textEl.textContent = fullText;
    textEl.classList.add("done");
    arrowEl.classList.add("visible");
    stopCharacterAnimation();
    i = fullText.length;
  }

  document.querySelector(".text_field").addEventListener("click", () => {
    if (!textEl.classList.contains("done")) {
      finishTyping();
    } else {
      console.log("Переход дальше");
    }
  });

  startCharacterAnimation();
  typeWriter();
});
