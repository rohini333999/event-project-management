const addeventForm = document.getElementById("addevent-form");

const eventErrMsg = document.getElementById("event-err-msg");
const successMsg = document.getElementById("success-msg");
const addEventSuccess = document.getElementById("add-event-success");

const addEventCancel = document.getElementById("add-event-cancel");
const homeButton = document.getElementById("home-button");
const logoContainer = document.getElementById("logo-container");

const allInputElements = document.querySelectorAll("select,input,textarea");
const nextButton = document.getElementById("next-button");
const endDateErr = document.getElementById("end-date-err");

const showLogin = document.getElementById("show-login");
const newEventContainer = document.getElementById("new-event-container");

addEventSuccess.classList.add("no-display");

console.log(allInputElements);

let validObject = { validStartDate: true, validEndDate: true };

function getInputs() {
  let allEvents = {};

  allInputElements.forEach((each) => {
    allEvents[each.name] = each.value;
  });
  return allEvents;
}

if (localStorage.getItem("loginUser")) {
  signup.textContent = "Logout";
  showLogin.classList.add("no-display");
} else {
  signup.textContent = "Login";
  newEventContainer.classList.add("no-display");
}

signup.addEventListener("click", () => {
  console.log("signup", signup.textContent);
  if (signup.textContent === "Logout") {
    signup.textContent = "Login";

    localStorage.removeItem("loginUser");
    window.location.href = "/login";
  } else if (signup.textContent === "Login") {
    window.location.href = "/login";
  }
});

function checkEmpty(value, error) {
  if (value === "") {
    error.textContent = "Required*";
  } else {
    error.textContent = "";
  }
}

function checkEvent(event) {
  let eventValue = event.target.value;
  let errorValue = event.target.nextSibling;

  checkEmpty(eventValue, errorValue);
}

function checkDescription(event) {
  let eventValue = event.target.value;
  let errorValue = event.target.nextSibling;

  checkEmpty(eventValue, errorValue);
}

function checkLocation(event) {
  let eventValue = event.target.value;
  let errorValue = event.target.nextSibling;

  checkEmpty(eventValue, errorValue);
}

function checkLocationUrl(event) {
  let eventValue = event.target.value;
  let errorValue = event.target.nextSibling;

  if (eventValue === "") {
    errorValue.textContent = "Required*";
  } else {
    errorValue.textContent = "";
  }
}

function checkFee(event) {
  let eventValue = event.target.value;
  let errorValue = event.target.nextSibling;

  if (eventValue === "") {
    errorValue.textContent = "Required*";
  } else if (!/^[0-9]+$/.test(eventValue)) {
    errorValue.textContent = "Please enter valid fee value";
  } else {
    errorValue.textContent = "";
  }
}

function checkStartDate(event) {
  console.log("check start date", event.target.value);
  let allEvents = getInputs();

  let date1 = new Date(allEvents.end_date);
  let date2 = new Date(event.target.value);

  if (event.target.value === "") {
    endDateErr.textContent = "Please enter Event end date";

    validObject.validStartDate = false;
  }
  if (date1 < date2) {
    endDateErr.textContent = "Start date must be before end date";

    validObject.validStartDate = false;
  } else {
    endDateErr.textContent = "";
    validObjectvalidStartDate = true;
  }
}
function checkEndDate(event) {
  console.log("check end date", event.target.value);
  let allEvents = getInputs();

  let date1 = new Date(allEvents.start_date);
  let date2 = new Date(event.target.value);

  if (event.target.value === "") {
    endDateErr.textContent = "Please enter Event end date";

    validObject.validEndDate = false;
  }
  if (date1 > date2) {
    endDateErr.textContent = "Start date must be before end date";

    validObject.validEndDate = false;
  } else {
    endDateErr.textContent = "";
    validObject.validEndDate = true;
  }
}

if (addeventForm) {
  addeventForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("target", event.target.name);

    let emptyFields = [];
    let eventList = {};
    let allValid = true;

    Object.keys(validObject).forEach((each) => {
      if (validObject[each] === false) {
        allValid = false;
      }
    });
    allInputElements.forEach((each) => {
      console.log(each.value);
      console.log(each.name);
      if (each.value === "") {
        console.log("entered");

        emptyFields.push(each.name);
      } else {
        if (each.name === "start_time" || each.name === "end_time") {
          let [h, m] = each.value.split(":");

          let meridian =
            ((h % 12 ? h % 12 : 12) + ":" + m, h >= 12 ? "PM" : "AM");

          console.log(meridian);
          eventList[each.name] = each.value + " " + meridian;
        } else {
          eventList[each.name] = each.value;
        }
      }
    });

    if (emptyFields.length !== 0) {
      eventErrMsg.textContent = "All fields are required";
    } else if (allValid) {
      let users_id = JSON.parse(localStorage.getItem("loginUser"))["id"];

      console.log("users_id", users_id);

      eventList["users_id"] = users_id;
      console.log("Eventslist", JSON.stringify(eventList));

      let url = "http://localhost:3000/api/v1/events";

      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventList),
      };

      try {
        const response = await fetch(url, options);

        const postEvent = await response.json();
        console.log("response", response);

        if (!response.ok) {
          throw new Error("Error:", response.status);
        } else {
          console.log("postEvent", postEvent);

          addEventSuccess.classList.remove("no-display");
          addeventForm.reset();
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  });
}

addEventCancel.addEventListener("click", () => {
  addEventSuccess.classList.add("no-display");
});

nextButton.addEventListener("click", () => {
  addEventSuccess.classList.add("no-display");
});

homeButton.addEventListener("click", () => {
  window.location.href = "/";
});

logoContainer.addEventListener("click", () => {
  window.location.href = "/";
});
