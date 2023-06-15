const pageError = document.getElementById("page-error");
const eventDetailsContainer = document.getElementById(
  "event-details-container"
);

const signup = document.getElementById("signup");
const registerButton = document.getElementById("register-button");

async function getRegister() {
  let url = "http://localhost:3000/api/v1/register";
  const response = await fetch(url);
}

signup.addEventListener("click", () => {
  if (signup.textContent === "Logout") {
    document.cookie = "user_id=null;path=/;max-age=0;";

    window.location.href = "/";
  } else if (signup.textContent === "Login") {
    window.location.href = "/login";
  }
});

function clickLogoContainer() {
  window.location.href = "/";
}

async function clickRegister(event) {
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

  let checkLogin = getCookie("user_id");
  if (checkLogin) {
    let currentUrl = new URL(window.location.href);
    let pathname = currentUrl.pathname.split("/");
    let paramId = parseInt(pathname.pop());

    let url = "http://localhost:3000/api/v1/register";

    let postIds = { users_id: getCookie("user_id"), events_id: paramId };

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postIds),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (!response.ok) {
        console.log("error");
      } else {
        event.target.textContent = "Added";
        event.target.classList.add("after-register");
      }
    } catch (error) {
      console.log("error:", error);
      pageError.textContent = "Error in displaying page..Please try again";

      eventDetailsContainer.classList.add("no-display");
      pageError.classList.remove("no-display");
    }
  } else {
    window.location.href = "/login";
  }
}
