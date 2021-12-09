/* Information from 
https://stackoverflow.com/questions/40842033/repeat-add-div-after-clicking-the-button?, rq=1 
https://stackoverflow.com/questions/40436906/how-to-remove-last-element-using-jquery 
 and https://www.w3schools.com/jquery/html_clone.asp was used to create this file.
*/

$(function() {
  var qnum = 0;
  const questioncopy = $(".questionform").clone();
  $("#buttonaddquestion").on("click", () => {
    qnum++;
    questioncopy.clone().appendTo("#container");
    $("#container").contents().last().attr("id", qnum)
  });


  $("body").on("click", ".deletebutton", () => {
    if (qnum == 0) {
      alert("That's a bad idea, my guy.")
    }
    else {
      $("#container").contents().last().remove();
      qnum--;
    }
  })
});