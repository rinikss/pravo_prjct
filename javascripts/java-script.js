document.addEventListener("DOMContentLoaded", function () {
  const typeSpeed = 25;
  const frameSpeed = 180;

  function setupTypingScreen({
    textId,
    fullText,
    characterSelector,
    arrowHitId,
  }) {
    const textEl = document.getElementById(textId);
    if (!textEl) return;

    fullText = textEl.dataset.fulltext || fullText;

    const arrowHit = arrowHitId ? document.getElementById(arrowHitId) : null;
    const characterEl = characterSelector
      ? document.querySelector(characterSelector)
      : null;

    let i = 0;
    let typingTimer = null;
    let frameTimer = null;

    function startFrames() {
      if (!characterEl || frameTimer) return;
      frameTimer = setInterval(() => {
        characterEl.classList.toggle("frame-b");
      }, frameSpeed);
    }

    function stopFrames() {
      if (frameTimer) {
        clearInterval(frameTimer);
        frameTimer = null;
      }
      if (characterEl) characterEl.classList.remove("frame-b");
    }

    function finish() {
      if (typingTimer) {
        clearTimeout(typingTimer);
        typingTimer = null;
      }
      textEl.textContent = fullText;
      textEl.classList.add("done");
      if (arrowHit) {
        arrowHit.querySelector(".next-arrow").classList.add("visible");
        arrowHit.removeAttribute("aria-disabled");
      }
      stopFrames();
      i = fullText.length;
    }

    function type() {
      if (i < fullText.length) {
        textEl.textContent += fullText.charAt(i);
        i++;
        typingTimer = setTimeout(type, typeSpeed);
      } else {
        finish();
      }
    }

    const textField = textEl.closest(".text_field, .nbc_box, p");
    if (textField) {
      textField.addEventListener("click", () => {
        if (!textEl.classList.contains("done")) finish();
      });
    }

    if (arrowHit) {
      arrowHit.addEventListener("click", (e) => {
        if (!textEl.classList.contains("done")) {
          e.preventDefault();
          finish();
        }
      });
    }

    startFrames();
    type();
  }

  setupTypingScreen({
    textId: "textContent",
    fullText:
      "Привет. Я Брайан Уильямс, ведущий NBC Nightly News. За годы в журналистике я многое повидал. Был в горячих точках, летал в зоны боевых действий ради того, чтобы ты получал правду из первых уст. В 2003 году я летел на военном вертолёте Chinook прямо над зоной конфликта в Ираке. И вдруг ракета попала в наш вертолёт. Я реально думал, что это конец. Мы упали и выжили чудом. Я много раз рассказывал эту историю солдатам, зрителям, на ток-шоу. Этот момент изменил меня, ведь именно так я понял ценность репортажа с передовой.",
    characterSelector: ".character",
    arrowHitId: "nextArrowHit",
  });

  setupTypingScreen({
    textId: "textContent2",
    fullText:
      "Ты веришь, что настоящий журналист должен рисковать жизнью, чтобы донести правду? Я здесь, чтобы рассказать тебе всё как есть.",
    characterSelector: ".character",
  });

  setupTypingScreen({
    textId: "textContent3",
    fullText:
      "Ладно. Правда в том... что в тот вертолёт ракета не попадала. Она попала в вертолет который летел рядом. Я не был в опасности, но рассказывал эту историю снова и снова и со временем сам в нее поверил.",
    characterSelector: ".character3",
    arrowHitId: "nextArrowHit3",
  });
});
