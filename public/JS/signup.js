window.addEventListener("DOMContentLoaded", function () {
  let bttn = document.getElementById("submit");
  bttn.addEventListener("click", checkpw);
});

function checkpw(event) {
  let pw = document.getElementById("password");
  let cpw = document.getElementById("confirmpassword");
  if (pw.value != cpw.value) {
    document.getElementById("errormsg").innerText = "Passwords must match.";
    event.preventDefault();
  }
}
