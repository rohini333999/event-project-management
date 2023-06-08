const pageError = document.getElementById("page-error");
const eventDetailsContainer = document.getElementById(
  "event-details-container"
);
const loader = document.getElementById("loader");

loader.classList.add("no-display");

if (localStorage.getItem("loginUser")) {
  signup.textContent = "Logout";
} else {
  signup.textContent = "Login";
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

function clickRegister() {
  console.log("register");
}
eventDetailsContainer.addEventListener("click", async (event) => {
  if (event.target.name === "register") {
    if (signup.textContent === "Login") {
      console.log(event.target.nextElementSibling.innerHTML);

      event.target.nextElementSibling.innerHTML += `
       please <a href="/login">Login</a> to continue
      `;
    } else if (signup.textContent === "Logout") {
      let getUser = JSON.parse(localStorage.getItem("loginUser"));

      let currentUrl = new URL(window.location.href);
      let pathname = currentUrl.pathname.split("/");
      let paramId = parseInt(pathname.pop());

      console.log(getUser.id, paramId);
      let url = "http://localhost:3000/api/v1/register";

      let postIds = { users_id: getUser.id, events_id: paramId };

      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postIds),
      };

      try {
        const response = await fetch(url, options);
        const result = await fetch(response);
        if (!response.ok) {
          console.log("error");
        } else {
          console.log(result);

          event.target.textContent = "Added";
          event.target.classList.add("after-register");
        }
      } catch (error) {
        console.log("error:", error);
        pageError.textContent = "Error in displaying page..Please try again";

        eventDetailsContainer.classList.add("no-display");
        pageError.classList.remove("no-display");
      }
    }
  }
});
