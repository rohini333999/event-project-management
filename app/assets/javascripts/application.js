const accountForm = document.getElementById("account-form");
const fullname = document.getElementById("fullname");

const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");

const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");
const successMsg = document.getElementById("success-msg");

const allElements = document.querySelectorAll("input");
console.log("input", allElements);

let nameValid = true;
let emailValid = true;
let passwordValid = true;
let confirmPasswordValid = true;

function checkUsername(event) {
  if (event.target.value === "") {
    nameError.textContent = "Required*";
    nameValid = false;
  } else if (!/^[a-zA-Z\s]+$/.test(event.target.value)) {
    console.log("key user");
    nameError.textContent = "Enter valid username";
    nameValid = false;
  } else {
    nameError.textContent = "";
    nameValid = true;
  }
}

function checkEmail(event) {
  if (event.target.value === "") {
    emailError.textContent = "Required*";
    emailValid = false;
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(event.target.value)
  ) {
    emailError.textContent = "Enter valid mail";
    emailValid = false;
  } else {
    emailError.textContent = "";
    emailValid = true;
  }
}

function checkPassword(event) {
  let passwordValue;
  let confirmPasswordValue;
  if (event.target.name === "password") {
    let passwordInput = event.target.value;
    if (passwordInput === "") {
      passwordError.textContent = "Required*";

      passwordValid = false;
    } else if (String(passwordInput.length) < 6) {
      passwordError.textContent = "Password must have min 6 characters";

      passwordValid = false;
    } else {
      passwordValue = passwordInput;
      passwordError.textContent = "";
      passwordValid = true;
    }
  }
  if ((event.target.name = "confirmPassword")) {
    let confirmPasswordInput = event.target.value;
    if (confirmPasswordInput === "") {
      confirmPasswordError.textContent = "Required*";

      confirmPasswordValid = false;
    } else if (confirmPasswordInput !== passwordValue) {
      confirmPasswordError.textContent = "Password must be same";

      confirmPasswordValid = false;
    } else {
      confirmPasswordValue = confirmPasswordInput;
      confirmPasswordError.textContent = "";

      confirmPasswordValid = true;
    }
  }
  if (passwordValue === confirmPasswordValue) {
    confirmPasswordError.textContent = "Password must be same";

    confirmPasswordValid = false;
  }
}

function checkSamePassword(event) {}

function blurname(event) {
  console.log("blurna,e");
  if (event.target.value === "") {
    nameError.textContent = "Required*";
  }
}

function blurEmail(event) {
  if (event.target.value === "") {
    emailError.textContent = "Required*";
  }
}

function blurPassword(event) {
  if (event.target.value === "") {
    passwordError.textContent = "Requied*";
  }
}

function blurConfirmPassword(event) {
  if (event.target.value === "") {
    confirmPasswordError.textContent = "Required*";
  }
}

accountForm.addEventListener("submit", (event) => {
  event.preventDefault();

  allElements.forEach((input) => {
    console.log("value", input.value);
    console.log("name", input.name);
  });

  if (nameValid && emailValid && passwordValid && confirmPasswordValid) {
    const usersList = [];

    usersList.push({
      name: fullname.value,
      email: email.value,
      password: password.value,
    });
    console.log("useslist", JSON.stringify(usersList));
    localStorage.setItem("users", JSON.stringify(usersList));
    successMsg.textContent = "User registered successfully";
  }
});
