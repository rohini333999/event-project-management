const accountForm = document.getElementById("account-form");

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

let passwordValue;
let confirmPasswordValue;

function checkPassword(event) {
  console.log("targetname", event.target.name);

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
function checkConfirmPassword(event) {
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
  } else if (nameValid && emailValid && passwordValid && confirmPasswordValid) {
    const usersList = {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    allElements.forEach((input) => {
      if (input.name === "fullname") {
        usersList.fullname = input.value;
      } else if (input.name === "email") {
        usersList.email = input.value;
      } else if (input.name === "password") {
        usersList.password = input.value;
      } else if (input.name === "confirmPassword") {
        usersList.confirmPassword = input.value;
      }
    });

    console.log("userslist", usersList);
    let url = "http://localhost:3000/api/v1/users";

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usersList),
    };

    try {
      const response = await fetch(url);
      console.log("postresponse", response);
      const allUsers = await response.json();

      console.log("allusers", allUsers);
      const existMail = allUsers.filter((each) => {
        return each.email === usersList.email;
      });
      console.log("exits", existMail);

      if (!response.ok) {
        throw new Error("Error:", response.status);
      } else if (existMail.length !== 0) {
        successMsg.textContent = "User already exists, Login to continue";
        accountForm.reset();
      } else {
        const postResponse = await fetch(url, options);
        const result = await postResponse.json();
        successMsg.textContent = "User registered successfully";
        console.log(result);

        if (!response.ok) {
          throw new Error("error:" + response.status);
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }
});
