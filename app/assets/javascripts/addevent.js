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

let validObject = { validStartDate: true, validEndDate: true };

logoContainer.addEventListener("click", () => {
  window.location.href = "/";
});

signup.addEventListener("click", () => {
  if (signup.textContent === "Logout") {
    document.cookie = "user_id=null;max-age=0;";

    window.location.href = "/";
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
  let errorValue = event.target.nextElementSibling;

  checkEmpty(eventValue, errorValue);
}

function checkDescription(event) {
  let eventValue = event.target.value;
  let errorValue = event.target.nextElementSibling;

  checkEmpty(eventValue, errorValue);
}

function checkLocation(event) {
  let eventValue = event.target.value;
  let errorValue = event.target.nextElementSibling;

  checkEmpty(eventValue, errorValue);
}

function checkLocationUrl(event) {
  let eventValue = event.target.value;
  let errorValue = event.target.nextElementSibling;

  if (eventValue === "") {
    errorValue.textContent = "Required*";
  } else {
    errorValue.textContent = "";
  }
}

function checkFee(event) {
  let eventValue = event.target.value;
  let errorValue = event.target.nextElementSibling;

  if (eventValue === "") {
    errorValue.textContent = "Required*";
  } else if (!/^[0-9]+$/.test(eventValue)) {
    errorValue.textContent = "Please enter valid fee value";
  } else {
    errorValue.textContent = "";
  }
}

function checkStartDate(event) {
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

    let emptyFields = [];
    let eventList = {};
    let allValid = true;

    Object.keys(validObject).forEach((each) => {
      if (validObject[each] === false) {
        allValid = false;
      }
    });
    allInputElements.forEach((each) => {
      if (each.value === "") {
        emptyFields.push(each.name);
      } else {
        if (each.name === "start_time" || each.name === "end_time") {
          let [h, m] = each.value.split(":");

          let meridian =
            ((h % 12 ? h % 12 : 12) + ":" + m, h >= 12 ? "PM" : "AM");

          eventList[each.name] = each.value + " " + meridian;
        } else {
          eventList[each.name] = each.value;
        }
      }
    });

    if (emptyFields.length !== 0) {
      alert("Please enter all the values");
    } else if (allValid) {
      function getCookie(name) {
        const cookieValue = decodeURIComponent(document.cookie);
        const cookieArray = cookieValue.split("; ");

        let result = null;
        cookieArray.forEach((value) => {
          if (value.indexOf(name) == 0) {
            result = value.substring(name.length + 1);
          }
        });
        return result;
      }

      eventList["users_id"] = getCookie("user_id");

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

        if (!response.ok) {
          throw new Error("Error:", response.status);
        } else {
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
