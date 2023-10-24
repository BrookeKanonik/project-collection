var formfield = document.getElementById('formfield');

//do i need to add an i = 0 , and have ingredient${i} for mongodb to not yell at me if there are two different names?

function add(){
  var newField = document.createElement('input');
  newField.setAttribute('type','text');
  newField.setAttribute('name','text');
  newField.setAttribute('class','text');
  newField.setAttribute('size',50);
  newField.setAttribute('placeholder','Ingredient');

  formfield.appendChild(newField);
}

function remove(){
  var input_tags = formfield.getElementsByTagName('input');
  if(input_tags.length > 2) {
    formfield.removeChild(input_tags[(input_tags.length) - 1]);
  }
}


// let i = 0;

// function rowTemplate(i) {
//   return `<tr data-index=${i}>
//       <td>${i}</td>
//       <td><input type="text" name="ingredient-${i}"></td> 
//       <td><input type="text" name="amount-${i}"></td>
//       <td><button onclick="removeRow(${i})">Remove <i class="fa fa-minus"></i></button></td>
//     </tr>`
// }

// for (i = 0; i < 4; i ++) {
//   $('table').append(rowTemplate(i));
// }

// function add() {
//   $('table').append(rowTemplate(i));
//   i++;
// }
