const accountForm = document.getElementById("account-form");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");

const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");
const successMsg = document.getElementById("success-msg");

const allElements = document.querySelectorAll("input");

let nameValid = true;
let emailValid = true;

let passwordValid = true;
let confirmPasswordValid = true;

function clickLogoContainer() {
  window.location.href = "/";
}

function checkUsername(event) {
  if (event.target.value.trim() === "") {
    nameError.textContent = "Required*";
    nameValid = false;
  } else if (!/^[a-zA-Z\s]+$/.test(event.target.value)) {
    nameError.textContent = "Enter valid username";
    nameValid = false;
  } else {
    nameError.textContent = "";
    nameValid = true;
  }
}

function checkEmail(event) {
  if (event.target.value.trim() === "") {
    console.log("trim");
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

let passwordValue;
let confirmPasswordValue;

function checkPassword(event) {
  let passwordInput = event.target.value;
  if (passwordInput.trim() === "") {
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
function checkConfirmPassword(event) {
  let confirmPasswordInput = event.target.value;
  if (confirmPasswordInput.trim() === "") {
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

function blurname(event) {
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

function makeRequest(method, url, data) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          resolve(response);
        } else {
          reject(xhr.status);
        }
      }
    };

    xhr.send(JSON.stringify(data));
  });
}

let mail = "rohini@gmail.com";
let url = `http://localhost:3000/signup?email=${mail}`;

async function getUser() {
  const response = await fetch(url);
  const allUsers = await response.json();
  console.log(allUsers);
}

getUser();
if (accountForm) {
  accountForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    allElements.forEach((input) => {
      if (input.value === "") {
        if (input.name === "fullname") {
          nameError.textContent = "Required*";

          nameValid = false;
        } else if (input.name === "email") {
          emailError.textContent = "Required*";

          emailValid = false;
        } else if (input.name === "password") {
          passwordError.textContent = "Required*";

          passwordValid = false;
        } else if (input.name === "confirmPassword") {
          confirmPasswordError.textContent = "Required*";

          confirmPasswordValid = false;
        }
      }
    });

    if (passwordValue !== confirmPasswordValue) {
      confirmPasswordError.textContent = "Password must be same";

      confirmPasswordValid = false;
    } else if (
      nameValid &&
      emailValid &&
      passwordValid &&
      confirmPasswordValid
    ) {
      const usersList = {
        fullname: "",
        email: "",
        password: "",
      };

      allElements.forEach((input) => {
        if (input.name === "fullname") {
          usersList.fullname = input.value;
        } else if (input.name === "email") {
          usersList.email = input.value;
        } else if (input.name === "password") {
          usersList.password = input.value;
        }
      });

      console.log("userslist", usersList);
      let url = `http://localhost:3000/signup?email=${usersList.email}`;

      try {
        const response = await fetch(url);
        const allUsers = await response.json();

        console.log(response);

        if (!response.ok) {
          throw new Error("Error:", response.status);
        } else if (allUsers.result.length !== 0) {
          successMsg.textContent = "User already exists, Login to continue";
          accountForm.reset();
        } else {
          async function postData() {
            try {
              let response = await makeRequest(
                "POST",
                "http://localhost:3000/api/v1/users",
                usersList
              );
              console.log(response);
              successMsg.textContent = "User registered successfully";
              accountForm.reset();
            } catch (error) {
              console.log("Error:", error);
            }
          }

          postData();
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  });
}
