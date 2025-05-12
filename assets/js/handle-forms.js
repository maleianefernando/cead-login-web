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
  try {
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
  } catch (error) {
    console.log("mutation observer");
  }

  try {
    on("submit", ".login-form", (e) => {
      e.preventDefault();
      handleLoginForm();
    });
  } catch (error) {}

  const api = axios.create({
    baseURL: `http://localhost:8000/api/cead/v1`,
    // timeout: 1000,
    Headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });

  window.onload = () => {
    // handleLoginForm();
  };

  function handleRecoveryForm(type) {}

  function handleLoginForm() {
    executeSpinner();
    const username = select(".login-form .form-control#username").value;
    const password = select(".login-form .form-control#password").value;

    api
      .post("/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        const data = response.data;
        const jwt = data.access_token;
        sessionStorage.setItem("token", jwt);
        console.log(decodeJWT(jwt));
      })
      .catch(function (error) {
        const usernameErrors = error.response.data.errors.username;
        const passwordErrors = error.response.data.errors.password;

        const fields = [
          [0, "username"],
          [1, "password"],
        ];
        const errors = [usernameErrors, passwordErrors];
        fields.forEach((field) => {
          select(`.login-form .${field[1]}.invalid-feedback`).textContent = !(
            errors[field[0]] === undefined
          )
            ? errors[field[0]]
            : "";
          // console.log(errors[field[0]]);
        });
      });
  }

  function decodeJWT(token) {
    const jwt = token;

    const base64 = jwt.split(".")[1];
    const json = atob(base64);
    return (decoded = JSON.parse(json));
    // console.log();
  }

  function executeSpinner() {
    const spinnerHTMLCode = `
      <div
        class="spinner-border spinner-border-sm text-success"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    `;
    select(`.login-form .invalid-feedback`, true).forEach((e) => {
      e.innerHTML = spinnerHTMLCode;
    });
  }
})();
