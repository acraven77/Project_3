//I wanted to use pure vanilla JavaScript for this project.


/* ================================================================
Global Variables
================================================================ */

var paySelect = document.getElementById('payment');
var colorSel = document.getElementById('color');
var colorDiv = document.getElementById('colors-js-puns');
var mainForm = document.getElementsByTagName("form")[0];
var actFieldSet = document.getElementsByClassName('activities')[0];
var payFieldSet = mainForm.querySelector('fieldset:nth-of-type(4)');
var otherJobField = document.getElementById('other-title');
var basicInfofieldset = document.getElementsByTagName("fieldset")[0];
var paypalDiv = payFieldSet.children[7];
var bitcoinDiv = payFieldSet.children[8];
var ccNumber = document.getElementById('cc-num');
var zipNumber = document.getElementById('zip');
var cvvNumber = document.getElementById('cvv');
var email = document.getElementById('mail');
var fullName = document.getElementById('name');
var otherJobField = document.getElementById('other-title');


/* ================================================================
Functions
================================================================ */


//This function hides the error messages and the "other" job input. I wasn't
//sure if we were supposed to add the HTML for the error messages dynamically
//or statically to the index page. I figured this way at least if JS is
//disabled then the errors will show and the other field. I chose to create
//error messages instead of highlight the field in red.
function hideElements() {
  colorSel.style.display = "none";
  colorDiv.querySelector("label[for=color").style.display = "none";
  otherJobField.style.display = 'none';
  document.getElementById('nameError').style.display = 'none';
  document.getElementById('emailError').style.display = 'none';
  document.getElementById('jobError').style.display = 'none';
  document.getElementById('designError').style.display = 'none';
  document.getElementById('activityError').style.display = 'none';
  document.getElementById('ccError').style.display = 'none';
  document.getElementById('zipError').style.display = 'none';
  document.getElementById('cvvError').style.display = 'none';
}
hideElements();


//Function to hide or show the "other" job field.
function jobRoleSelect() {
  var jobRole = document.getElementById('title').value;

  if (jobRole === "other") {
    otherJobField.style.display = '';
  } else {
    otherJobField.style.display = 'none';
  }
  if (jobRole === "job-role") {
    document.getElementById('jobError').style.display = '';
  } else if (jobRole !== "job-role") {
      document.getElementById('jobError').style.display = 'none';
  }
}


//Function to display shirt options based of off choice selected.
function shirtDesign() {
  var design = document.getElementById('design').value;

  colorSel.style.display = "";
  colorDiv.querySelector("label[for=color").style.display = "";

  if (design === "heart js") {
    for (var i = 3; i <= 5; i++) {
      colorSel[i].style.display = "";
    }
    for (var x = 0; x <= 2; x++) {
      colorSel[x].style.display = "none";
    }
    colorSel.querySelector("option[value=tomato]").selected = true;

  } else if (design === "js puns") {
      for (var y = 0; y <= 2; y++) {
        colorSel[y].style.display = "";
      }
      for (var v = 3; v <= 5; v++) {
        colorSel[v].style.display = "none";
      }
      colorSel.querySelector("option[value=cornflowerblue]").selected = true;

    } else if (design === "select") {
        colorSel.style.display = "none";
        colorDiv.querySelector("label[for=color").style.display = "none";
    }
  if (design === "select") {
    document.getElementById('designError').style.display = '';
  } else if (design !== "select") {
      document.getElementById('designError').style.display = 'none';
    }
}


//Function that disables other classes that conflict with selected.
function activities() {

  if (mainForm.querySelector('input[name=js-frameworks').checked) {
    mainForm.querySelector('input[name=express').disabled = true;
    mainForm.querySelector('input[name=express').parentNode.style.color = "slategray";
  } else if (!mainForm.querySelector('input[name=js-frameworks').checked) {
      mainForm.querySelector('input[name=express').disabled = false;
      mainForm.querySelector('input[name=express').parentNode.style.color = "#000";
  }
  if (mainForm.querySelector('input[name=express').checked) {
    mainForm.querySelector('input[name=js-frameworks').disabled = true;
    mainForm.querySelector('input[name=js-frameworks').parentNode.style.color = "slategray";
  } else if (!mainForm.querySelector('input[name=express').checked) {
      mainForm.querySelector('input[name=js-frameworks').disabled = false;
      mainForm.querySelector('input[name=js-frameworks').parentNode.style.color = "#000";
  }
  if (mainForm.querySelector('input[name=js-libs').checked) {
    mainForm.querySelector('input[name=node').disabled = true;
    mainForm.querySelector('input[name=node').parentNode.style.color = "slategray";
  } else if (!mainForm.querySelector('input[name=js-libs').checked) {
      mainForm.querySelector('input[name=node').disabled = false;
      mainForm.querySelector('input[name=node').parentNode.style.color = "#000";
  }
  if (mainForm.querySelector('input[name=node').checked) {
    mainForm.querySelector('input[name=js-libs').disabled = true;
    mainForm.querySelector('input[name=js-libs').parentNode.style.color = "slategray";
  } else if (!mainForm.querySelector('input[name=node').checked) {
      mainForm.querySelector('input[name=js-libs').disabled = false;
      mainForm.querySelector('input[name=js-libs').parentNode.style.color = "#000";
  }
}


//Function that will add the total span and total the cost of the classes
//selected.
var totalAmount = function() {
  var total = document.getElementById('total');
  var num = document.getElementById('num');
  var checkbox = mainForm.querySelectorAll('input[type=checkbox]');

  if (!total) {
    var total = document.createElement("span");
    var num = document.createElement("span");
    actFieldSet.appendChild(total);
    actFieldSet.appendChild(num);
    total.id = 'total';
    total.innerText = 'Total: $';
    num.id = 'num';
    num.innerHTML = parseInt(this.value);

  } else if (!this.checked) {
      num.innerHTML = parseInt(num.innerHTML) - parseInt(this.value);

    } else {
      num.innerHTML = parseInt(num.innerHTML) + parseInt(this.value);
    }
  if (parseInt(num.innerHTML) === 0) {
      num.parentNode.removeChild(num);
      total.parentNode.removeChild(total);
  }

  for (var i = 0; i < checkbox.length; i++) {
    if (checkbox[i].checked === true) {
      document.getElementById('activityError').style.display = 'none';
      break;
    } else if (checkbox[i].checked === false) {
        document.getElementById('activityError').style.display = '';
      }
  }
}


//This function binds an "onchange" method and value to each checkbox.
function bindCheckboxes(input, val) {
  var checkbox = input.querySelector('input[type=checkbox]');
  var allCheckbox = mainForm.querySelector('input[name=all]');

    allCheckbox.value = 200;
    allCheckbox.onchange = totalAmount;

    checkbox.value = val;
    checkbox.onchange = totalAmount;
}


//For loop that runs through each checkbox and send each one to get bound
//with onchange.
for (var i = 2; i < actFieldSet.children.length; i++) {
  bindCheckboxes(actFieldSet.children[i], 100)
}


//Function to hide or display payment info.
function paymentInfo() {
  var creditCardDiv = document.getElementById('credit-card');

  if (paySelect.querySelector('option[value=credit_card]').selected) {
    creditCardDiv.style.display = '';
  } else {
    creditCardDiv.style.display = 'none';
  }
  if (paySelect.querySelector('option[value=paypal]').selected) {
    paypalDiv.style.display = '';
  } else {
    paypalDiv.style.display = 'none';
  }
  if (paySelect.querySelector('option[value=bitcoin]').selected) {
    bitcoinDiv.style.display = '';
  } else {
    bitcoinDiv.style.display = 'none';
  }
}


//Function hides payment options except for credit card.
function hidePayOptions() {
  paypalDiv.style.display = 'none';
  bitcoinDiv.style.display = 'none';
  paySelect.querySelector('option[value=credit_card]').selected = true;
}
hidePayOptions();


//Function to auto validate email and name fields and hide or display errors.
var nameEmailValidate = function() {

  if (fullName.value) {
    document.getElementById('nameError').style.display = 'none';
  } else if (!name.value) {
    document.getElementById('nameError').style.display = '';
    }
  if (email.value.includes('@') && email.value.includes('.')) {
    document.getElementById('emailError').style.display = 'none';
  } else if (!email.value.includes('@') || !email.value.includes('.')) {
      document.getElementById('emailError').style.display = '';
    }
}


//Function to auto validate credit card fields and hide or display errors.
var ccValidate = function() {

  if (ccNumber.value.length >= 13 && ccNumber.value.length <= 16) {
    document.getElementById('ccError').style.display = 'none';
  } else if (ccNumber.value.length < 16 || ccNumber.value.length > 16) {
      document.getElementById('ccError').style.display = '';
  }
  if (zipNumber.value.length === 5) {
      document.getElementById('zipError').style.display = 'none';
  } else {
      document.getElementById('zipError').style.display = '';
  }
  if (cvvNumber.value.length === 3) {
      document.getElementById('cvvError').style.display = 'none';
  } else {
      document.getElementById('cvvError').style.display = '';
  }
}


//Function to bind oninput method to credit card, name and email fields.
function bindInputs() {
  ccNumber.oninput = ccValidate;
  zipNumber.oninput = ccValidate;
  cvvNumber.oninput = ccValidate;
  email.oninput = nameEmailValidate;
  fullName.oninput = nameEmailValidate;
}
bindInputs();


//This function validates all fields on submit and will not submit the form if
//a section or field is not filled out. I used a variable to keep track if
//each field has a value or not.
function validateOnSubmit() {
  var name = document.getElementById('name');
  var jobRole = document.getElementById('title').value;
  var design = document.getElementById('design').value;
  var checkbox = mainForm.querySelectorAll('input[type=checkbox]');
  var fieldError = '';
  var checkboxError = '';

  if (!name.value) {
    document.getElementById('nameError').style.display = '';
    fieldError += 'field1';
  }
  if (!email.value) {
    document.getElementById('emailError').style.display = '';
    fieldError += 'field2';
  }
  if (jobRole === 'job-role') {
    document.getElementById('jobError').style.display = '';
    fieldError += 'field3';
  }
  if (design === "select") {
    document.getElementById('designError').style.display = '';
    fieldError += 'field4';
  }
  for (var i = 0; i < checkbox.length; i++) {
    if (checkbox[i].checked === true) {
      checkboxError += 'checkbox' + [i];
    }
  }
  if (checkboxError.length === 0) {
    document.getElementById('activityError').style.display = '';
    fieldError += 'field5';
  }
  if (!ccNumber.value) {
    document.getElementById('ccError').style.display = '';
    fieldError += 'field6';
  }
  if (!zipNumber.value) {
    document.getElementById('zipError').style.display = '';
    fieldError += 'field7';
  }
  if (!cvvNumber.value) {
    document.getElementById('cvvError').style.display = '';
    fieldError += 'field8';
  }
  if (fieldError.length > 0 || checkboxError.length > 0) {
  return false;
  }
}

//This runs after page loads and focuses on the name input.
window.onload = function() {
  document.getElementById('name').focus();
}
