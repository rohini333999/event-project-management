const addeventForm = document.getElementById("addevent-form");

const eventErrMsg = document.getElementById("event-err-msg");
const successMsg = document.getElementById("success-msg");
const addEventSuccess = document.getElementById("add-event-success");

const addEventCancel = document.getElementById("add-event-cancel");
const homeButton = document.getElementById("home-button");
const logoContainer = document.getElementById("logo-container");

const allInputElements = document.querySelectorAll("input");
addEventSuccess.classList.add("no-display");

console.log("yrferf", localStorage.getItem("loginUser"));
localStorage.getItem("loginUser")
  ? (signup.textContent = "Logout")
  : (signup.textContent = "Login");

signup.addEventListener("click", () => {
  console.log("signup", signup.textContent);
  if (signup.textContent === "Logout") {
    signup.textContent = "Login";

    localStorage.removeItem("loginUser");
    window.location.href = "/";
  } else if (signup.textContent === "Login") {
    window.location.href = "/login";
  }
});

if (addeventForm) {
  console.log("in submit");
  addeventForm.addEventListener("submit", (event) => {
    console.log("submit");
    event.preventDefault();

    let emptyFields = [];
    allInputElements.forEach((each) => {
      console.log(each.value);
      console.log(each.name);
      if (each.value === "") {
        console.log("entered");

        emptyFields.push(each.name);
      }
    });
    console.log(emptyFields);
    if (emptyFields.length !== 0) {
      eventErrMsg.textContent = "All fields are required";
    } else {
      addEventSuccess.classList.remove("no-display");
      addeventForm.reset();
    }
  });
}

addEventCancel.addEventListener("click", () => {
  addEventSuccess.classList.add("no-display");
});

homeButton.addEventListener("click", () => {
  window.location.href = "/";
});

logoContainer.addEventListener("click", () => {
  window.location.href = "/";
});
