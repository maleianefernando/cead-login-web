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
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Recovery type selection
   */
  let recovery;

  on("click", ".recovery-by-email", () => {
    recovery = {
        type: "email",
        label: "Seu endereço email",
        name: "email",
        id: "email",
        inputType: "email"
    };
  });

  on("click", ".recovery-by-phone", () => {
    recovery = {
        type: "phone",
        label: "Numero de telefone",
        name: "phone",
        id: "phone",
        inputType: "number"
    };
  });

  on(
    "click",
    ".recovery-by",
    () => {
      select(".information-card .text-center.info").textContent = "";
      select(".card-body.recovery").insertAdjacentHTML(
        "beforeend",
        `
            <div class="d-flex justify-content-center loading">
                <div class="spinner-grow text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-success" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            `
      );

      setTimeout(() => {
        select(".loading").innerHTML = '';
        select(".information-card .text-center.info").textContent = `Insira o seu ${recovery.type === 'phone' ? 'numero de telefone' : 'endereço email'} para receber o código de verificação.`;
        select(".card-body.recovery").insertAdjacentHTML(
          "beforeend",
          `
            <form class="row g-3 needs-validation recovery-form recovery-form-${recovery.type}" data-type=${recovery.type} novalidate>
                <div class="col-12">
                    <label for="${recovery.id}" class="form-label">${recovery.label}</label>
                    <div class="input-group has-validation">
                        <span class="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="${recovery.inputType}" name="${recovery.name}" class="form-control" id="${recovery.id}" required>
                        <div class="invalid-feedback">Please enter your username.</div>
                    </div>
                </div>
                <div class="col-12">
                    <button class="btn btn-primary w-100" type="submit">Recuperar</button>
                </div>
            </form>
        `
        );
      }, 1500);
    },
    true
  );
})();
