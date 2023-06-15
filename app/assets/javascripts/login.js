const loginForm = document.getElementById("login-form");

const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const loginSuccessMsg = document.getElementById("login-success-msg");

const goHome = document.getElementById("go-home");
const email = document.getElementById("email");
const password = document.getElementById("password");

const invalidError = document.getElementById("invalid-error");

let isEmail = true;
let isPassword = true;

function clickLogoContainer() {
  window.location.href = "/";
}

function checkEmail(event) {
  if (event.target.value.trim() === "") {
    emailError.textContent = "Required*";
    isEmail = false;
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(event.target.value)
  ) {
    emailError.textContent = "Enter valid mail";
    isEmail = false;
  } else {
    emailError.textContent = "";
    isEmail = true;
  }
}

function checkPassword(event) {
  if (event.target.value.trim() === "") {
    passwordError.textContent = "Required*";
    isPassword = false;
  } else {
    passwordError.textContent = "";
    isPassword = true;
  }
}
console.log("coockie", document.cookie);

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  console.log("utc", date.toUTCString());

  let expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires};path=/;`;
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (email.value === "") {
    emailError.textContent = "Required*";

    isEmail = false;
  } else if (password.value === "") {
    passwordError.textContent = "Required*";

    isPassword = false;
  } else {
    emailError.textContent = "";
    passwordError.textContent = "";

    isEmail = true;
    isPassword = true;
  }

  if (isEmail && isPassword) {
    let url = "http://localhost:3000/api/v1/users";

    try {
      const response = await fetch(url);
      const allUsers = await response.json();

      console.log("all users", allUsers);

      const validUser = allUsers.find((each) => {
        return each.email === email.value && each.password === password.value;
      });
      if (validUser !== undefined) {
        invalidError.textContent = "";
        loginSuccessMsg.textContent = "Login successfully";
        goHome.textContent = "You will redirect to Home page";

        loginForm.reset();
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);

        console.log("coockie", document.cookie);

        setCookie("user_id", validUser.id, 1);
        setCookie("role", validUser.role, 1);
      } else {
        invalidError.textContent = "Details not found";

        goHome.textContent = "";
      }
    } catch (error) {
      console.log("error", error);
    }
  }
});
