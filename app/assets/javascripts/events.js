const pageError = document.getElementById("page-error");
const eventDetailsContainer = document.getElementById(
  "event-details-container"
);
const loader = document.getElementById("loader");
const signup = document.getElementById("signup");

loader.classList.add("no-display");

signup.addEventListener("click", () => {
  console.log("signup", signup.textContent);
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
  console.log("register");
  function getCookie(name) {
    const cookieValue = decodeURIComponent(document.cookie);
    const cookieArray = cookieValue.split("; ");

    let result = null;
    cookieArray.forEach((value) => {
      if (value.indexOf(name) == 0) {
        result = value.substring(name.length + 1);
        console.log(result);
      }
    });
    return result;
  }
  console.log("getcookie", getCookie("user_id"));
  let checkLogin = getCookie("user_id");
  if (checkLogin) {
    let currentUrl = new URL(window.location.href);
    let pathname = currentUrl.pathname.split("/");
    let paramId = parseInt(pathname.pop());

    console.log(getCookie("user_id"), paramId);
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
  } else {
    window.location.href = "/login";
  }
}
// eventDetailsContainer.addEventListener("click", async (event) => {
//   if (event.target.name === "register") {
//     if (signup.textContent === "Login") {
//       console.log(event.target.nextElementSibling.innerHTML);

//       event.target.nextElementSibling.innerHTML += `
//        please <a href="/login">Login</a> to continue
//       `;
//     } else if (signup.textContent === "Logout") {
//       function getCookie(name) {
//         const cookieValue = decodeURIComponent(document.cookie);
//         const cookieArray = cookieValue.split("; ");

//         let result = null;
//         cookieArray.forEach((value) => {
//           if (value.indexOf(name) == 0) {
//             result = value.substring(name.length + 1);
//             console.log(result);
//           }
//         });
//         return result;
//       }
//       console.log("getcookie", getCookie("user_id"));

//       let currentUrl = new URL(window.location.href);
//       let pathname = currentUrl.pathname.split("/");
//       let paramId = parseInt(pathname.pop());

//       console.log(getCookie("user_id"), paramId);
//       let url = "http://localhost:3000/api/v1/register";

//       let postIds = { users_id: getCookie("user_id"), events_id: paramId };

//       let options = {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(postIds),
//       };

//       try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         if (!response.ok) {
//           console.log("error");
//         } else {
//           console.log(result);

//           event.target.textContent = "Added";
//           event.target.classList.add("after-register");
//         }
//       } catch (error) {
//         console.log("error:", error);
//         pageError.textContent = "Error in displaying page..Please try again";

//         eventDetailsContainer.classList.add("no-display");
//         pageError.classList.remove("no-display");
//       }
//     }
//   }
// });
