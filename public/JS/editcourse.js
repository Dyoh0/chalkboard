// document.getElementById("editbtt").addEventListener("click", function () {
//   location.href = "/editcourse";
// });

document.getElementById("deletebtt").addEventListener("click", (e) => {
  if (confirm("Are you sure you want to delete this course?") == false) {
    e.preventDefault();
  }
});