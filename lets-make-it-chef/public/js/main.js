var formfield = document.getElementById('formfield');

function add(){
  var newField = document.createElement('input');
  newField.setAttribute('type','text');
  newField.setAttribute('name','text');
  newField.setAttribute('class','text');
  newField.setAttribute('siz',50);
  newField.setAttribute('placeholder','Ingredient');

  formfield.appendChild(newField);

//   var newFieldAmount = document.createElement('input');
//   newFieldAmount.setAttribute('type','text');
//   newFieldAmount.setAttribute('name','text');
//   newFieldAmount.setAttribute('class','text');
//   newFieldAmount.setAttribute('siz',50);
//   newFieldAmount.setAttribute('placeholder','Ingredient');
//   formfield.appendChild(newFieldAmount);
}

function remove(){
  var input_tags = formfield.getElementsByTagName('input');
 
  }
