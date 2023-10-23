var formfield = document.getElementById('formfield');

function add(){
  var newField = document.createElement('input');
  newField.setAttribute('type','text');
  newField.setAttribute('name','text');
  newField.setAttribute('class','text');
  newField.setAttribute('size',50);
  newField.setAttribute('placeholder','Ingredient');

  formfield.appendChild(newField);
}




// let i = 0;

// function add(i) {
//   return `<tr data-index=${i}>
//       <td>${i}</td>
//       <td><input type="text" name="name-${i}"></td>
//       <td><input type="text" name="phone-${i}"></td>
//       <td><input type="text" name="Email-${i}"></td>
//       <td><button onclick="removeRow(${i})">Remove <i class="fa fa-minus"></i></button></td>
//     </tr>`
// }

// for (i = 0; i < 4; i ++) {
//   $('tbody').append(rowTemplate(i));
// }

// function remove(){
//   var input_tags = formfield.getElementsByTagName('input');
 
//   }
