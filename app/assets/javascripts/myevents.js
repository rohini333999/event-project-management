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
