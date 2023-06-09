const loginForm = document.getElementById("account-form");

const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const loginSuccessMsg = document.getElementById("login-success-msg");

const goHome = document.getElementById("go-home");
const email = document.getElementById("email");
const password = document.getElementById("password");

let isEmail = true;
let isPassword = true;

function checkEmail(event) {
  if (event.target.value === "") {
    emailError.textContent = "Required*";
    isEmail = false;
  } else {
    emailError.textContent = "";
    isEmail = false;
  }
}

function checkPassword(event) {
  if (event.target.value === "") {
    passwordError.textContent = "Required*";
    isPassword = false;
  } else {
    passwordError.textContent = "";
    isPassword = true;
  }
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
    console.log("valid");

    let url = "http://localhost:3000/api/v1/users";
    try {
      const response = await fetch(url);
      const allUsers = await response.json();

      console.log("all users", allUsers);

      const validUser = allUsers.find((each) => {
        return each.email === email.value && each.password === password.value;
      });
      if (validUser !== undefined) {
        loginSuccessMsg.textContent = "Login successfully";
        goHome.textContent = "Go to home page";

        loginForm.reset();

        document.cookie = `user_id=${JSON.stringify(validUser.id)}`;

        // document.getElementById("cookie-value").textContent = "";
        console.log("coockie", document.cookie);
        localStorage.setItem("loginUser", JSON.stringify(validUser));
      } else {
        loginSuccessMsg.textContent = "Invalid Details";

        goHome.textContent = "";
      }
    } catch (error) {
      console.log("error", error);
    }
  }
});
