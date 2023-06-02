const loginForm = document.getElementById("account-form");

const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const successMsg = document.getElementById("success-msg");

const goHome = document.getElementById("go-home");
const email = document.getElementById("email");
const password = document.getElementById("password");

let isEmail = true;
let isPassword = true;

function checkEmail(event) {
  let getEmail = JSON.parse(localStorage.getItem("users"));

  if (getEmail[0].email !== event.target.value) {
    isEmail = false;
    emailError.textContent = "Email not registered! Please signup";
  } else {
    emailError.textContent = "";
    isEmail = true;
  }
  return isEmail;
}

function checkPassword(value1, value2) {
  let getpassword = JSON.parse(localStorage.getItem("users"));
  console.log(getpassword[0].password, value2);
  if (getpassword[0].email === value1 && getpassword[0].password !== value2) {
    isPassword = false;
    passwordError.textContent = "Password is incorrect";
  } else {
    passwordError.textContent = "";
    isPassword = true;
  }
  return isPassword;
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (email.value === "") {
    emailError.textContent = "Required*";
  } else if (password.value === "") {
    passwordError.textContent = "Required*";
  }

  checkPassword(email.value, password.value);

  if (isEmail && isPassword) {
    console.log("valid");
    let loginUser = { email: email.value, password: password.value };

    localStorage.setItem("loginUser", JSON.stringify(loginUser));
    successMsg.textContent = "Login successfully";
    goHome.textContent = "Go to home page";
    loginForm.reset();
  }
});
