(function () {
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach((e) => e.addEventListener(type, listener));
    } else {
      select(el, all).addEventListener(type, listener);
    }
  };

  /**
   * Observe DOM mutations/changes to add submit eventt listener to added form
   */
  const observer = new MutationObserver(() => {
    on("submit", "form.recovery-form", (e) => {
      e.preventDefault();
      handleRecoveryForm(
        select("form.recovery-form").getAttribute("data-type")
      );
      console.log(select("form.recovery-form").getAttribute("data-type"));
      observer.disconnect();
    });
  });
  observer.observe(select(".card-body.recovery"), {
    childList: true,
    subtree: true,
  });

  function handleRecoveryForm(type) {}
})();
