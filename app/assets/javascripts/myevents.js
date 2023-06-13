let signup = document.getElementById("signup");

function clickLogoContainer() {
  window.location.href = "/";
}

signup.addEventListener("click", () => {
  console.log("signup", signup.textContent);
  if (signup.textContent === "Logout") {
    document.cookie = "user_id=null;max-age=0;";

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
