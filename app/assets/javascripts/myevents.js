let signup = document.getElementById("signup");

function clickLogoContainer() {
  window.location.href = "/";
}

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
if (!getCookie("user_id")) {
  window.location.href = "/login";
}

signup.addEventListener("click", () => {
  if (signup.textContent === "Logout") {
    document.cookie = "user_id=null;max-age=0;";
    document.cookie = "role=null;path=/;max-age=0";

    window.location.href = "/";
  } else if (signup.textContent === "Login") {
    window.location.href = "/login";
  }
});

async function removeEvent(event, eventId, userId) {
  let url = `http://localhost:3000/api/v1/register/`;
  let response = await fetch(url);
  let allRegister = await response.json();

  let deleteRegister = allRegister.find((each) => {
    return each.users_id === userId && each.events_id === eventId;
  });
  console.log(deleteRegister.id);
  if (deleteRegister) {
    let deleteUrl = `http://localhost:3000/api/v1/register/${deleteRegister.id}`;
    let options = {
      method: "DELETE",
    };
    let deleteResponse = await fetch(deleteUrl, options);
    let result = await deleteResponse.json();
    location.reload();
    console.log("delete", result);
  }
}
