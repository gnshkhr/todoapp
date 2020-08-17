 class Item {

     constructor(itemName) {

         this.itemName = itemName;

     }
 }

 let task = [

     new Item("welcome to my todo application"),

     new Item("Pay utility bills"),

     new Item("Pay EMI"),

 ];

 function addTask() {

     //1. Read the values from form and Convert it into object 
     let task1 = new Item(newtask.value);

     //3. Push object to array
     task.push(task1);

     //4. Print the table with updated array
     readTask();

 }


 function readTask() {



     console.log("Read function called ");

     let tablerows = "";

     for (let index in task) {


         tablerows += "<div class='item'>";
         tablerows += '<td><input type="checkbox" class="myCheck"  id="myCheck' + index + ' " onclick="myFunction(' + index + ')"></td>';
         tablerows += "<td><input type='text' id= 'input_item" + index + "' class= 'input_item' disabled value='" + task[index].itemName + "'</td>";
         tablerows += "<td><button id= 'edit" + index + "'  class='edit_button' onclick = 'enable(" + index + ")'><i class='far fa-edit'></i></button></td>";
         tablerows += "<td><button id= 'delete" + index + "'  class='delete_button' onclick = 'deleteTask(" + index + ")' ><i class='fas fa-trash-alt'></i></button></td>";
         tablerows += "<td class='savetd'><button id= 'save" + index + "'  class='save_button' onclick = 'updateTask(" + index + ")'><i class='far fa-save'></i> </button></td>";
         tablerows += "<td class='closetd'><button id= 'close" + index + "'  class='close_button' onclick = 'closeTask(" + index + ")' ><i class='far fa-window-close'></i></button></td>";
         tablerows += "<input type='hidden' id='pos'>";
         //tablerows += "</td>";
         tablerows += "</div>";


     }
     //document.write("<br>");
     taskrows.innerHTML = tablerows;

     $('savetd').hide();
     $('#closetd').hide();


 }


 function deleteTask(index) {


     console.log("Delete Function called for row " + index);

     let isDelete = confirm("Do you want to delete row?");

     if (isDelete) {

         task.splice(index, 1);
         readTask();
     }

 }


 function editTask(index) {

     this.enable();

     //  const input = document.querySelector('.input_item');
     //  input.removeattribute('disabled');

     //$('test').removeAttr('disabled');

     //  console.log(inputTask.disabled)
     alert("welcome")

     // inputt.disabled = false;
     //1. Read the values from form and Convert it into object 
     //  let course = new Course(courseCode.value, courseName.value, courseFees.value, courseDuration.value, courseType.value);

     //  //3. Edit Object into array at selected position
     //  task[pos.value] = course;

     //4. Print the table with updated array
     readTask();
     hideUpdate();
 }

 function enable(index) {
     alert("Delete Function called for row " + index);

     //  document.getElementById('input_item').style.color = "red";
     //  document.getElementById('input_item').disabled = false;

     //  document.getElementById('test').disabled = false;
     document.getElementById('input_item' + index).disabled = false;
     document.getElementById('input_item' + index).style.color = "red";
     pos.value = index;

     $('#edit' + index).hide();
     $('#delete' + index).hide();

     $('#save' + index).show();
     $('#close' + index).show();


 }

 function updateTask(index) {
     alert("Update Function called for row " + index);

     // document.getElementById('test').disabled = true;

     var id1 = document.getElementsByClassName("input_item")[index].value;
     alert(id1);

     //1. Read the values from form and Convert it into object 
     let task2 = new Item(id1);

     //3. Edit Object into array at selected position
     task[pos.value] = task2;



     //4. Print the table with updated array
     readTask();


     $('#edit' + index).show();
     $('#delete' + index).show();

     $('#save' + index).hide();
     $('#close' + index).hide();
 }

 function closeTask(index) {
     //alert("close Function called for row " + index);
     document.getElementById('input_item' + index).disabled = true;
     document.getElementById('input_item' + index).style.color = "white";

     $('#edit' + index).show();
     $('#delete' + index).show();

     $('#save' + index).hide();
     $('#close' + index).hide();
     readTask();

     // document.getElementById('test').disabled = true;
 }

 function myFunction(index) {
     // Get the checkbox
     var checkBox = document.getElementsByClassName("myCheck")[index];
     // Get the output text
     ///var text = document.getElementById("text");

     // If the checkbox is checked, display the output text
     if (checkBox.checked == true) {
         //  text.style.display = "block";
         alert("checked" + index)
         document.getElementById('input_item' + index).disabled = true;
         document.getElementById('input_item' + index).style.color = "green";
         // readTask();

     } else {
         //  text.style.display = "none";
         document.getElementById('input_item' + index).style.color = "white";
     }
 }