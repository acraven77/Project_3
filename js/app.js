//I wanted to use pure vanilla JavaScript for this project.
//I went for all 3 exceeds expectations


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
var paypalDiv = payFieldSet.children[9];
var bitcoinDiv = payFieldSet.children[10];
var ccNumber = document.getElementById('cc-num');
var zipNumber = document.getElementById('zip');
var cvvNumber = document.getElementById('cvv');
var email = document.getElementById('mail');
var fullName = document.getElementById('name');
var otherJobField = document.getElementById('other-title');
var creditCardDiv = document.getElementById('credit-card');
var total = document.getElementById('total');
var num = document.getElementById('num');

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
  total.style.display = "none";
  num.style.display = "none";
  colorDiv.querySelector("label[for=color]").style.display = "none";
  otherJobField.style.display = 'none';
  document.getElementById('nameError').style.display = 'none';
  document.getElementById('emailError').style.display = 'none';
  document.getElementById('validEmailError').style.display = 'none';
  document.getElementById('jobError').style.display = 'none';
  document.getElementById('designError').style.display = 'none';
  document.getElementById('activityError').style.display = 'none';
  document.getElementById('validCcError').style.display = 'none';
  document.getElementById('payOptionError').style.display = 'none';
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
  colorDiv.querySelector("label[for=color]").style.display = "";

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
        colorDiv.querySelector("label[for=color]").style.display = "none";
    }
  if (design === "select") {
    document.getElementById('designError').style.display = '';
  } else if (design !== "select") {
      document.getElementById('designError').style.display = 'none';
    }
}


//Function that disables other classes that conflict with selected.
function activities() {

  if (mainForm.querySelector('input[name=js-frameworks]').checked) {
    mainForm.querySelector('input[name=express]').disabled = true;
    mainForm.querySelector('input[name=express]').parentNode.style.color = "slategray";
  } else if (!mainForm.querySelector('input[name=js-frameworks]').checked) {
      mainForm.querySelector('input[name=express]').disabled = false;
      mainForm.querySelector('input[name=express]').parentNode.style.color = "#000";
  }
  if (mainForm.querySelector('input[name=express]').checked) {
    mainForm.querySelector('input[name=js-frameworks]').disabled = true;
    mainForm.querySelector('input[name=js-frameworks]').parentNode.style.color = "slategray";
  } else if (!mainForm.querySelector('input[name=express]').checked) {
      mainForm.querySelector('input[name=js-frameworks]').disabled = false;
      mainForm.querySelector('input[name=js-frameworks]').parentNode.style.color = "#000";
  }
  if (mainForm.querySelector('input[name=js-libs]').checked) {
    mainForm.querySelector('input[name=node]').disabled = true;
    mainForm.querySelector('input[name=node]').parentNode.style.color = "slategray";
  } else if (!mainForm.querySelector('input[name=js-libs]').checked) {
      mainForm.querySelector('input[name=node]').disabled = false;
      mainForm.querySelector('input[name=node]').parentNode.style.color = "#000";
  }
  if (mainForm.querySelector('input[name=node]').checked) {
    mainForm.querySelector('input[name=js-libs]').disabled = true;
    mainForm.querySelector('input[name=js-libs]').parentNode.style.color = "slategray";
  } else if (!mainForm.querySelector('input[name=node]').checked) {
      mainForm.querySelector('input[name=js-libs]').disabled = false;
      mainForm.querySelector('input[name=js-libs]').parentNode.style.color = "#000";
  }
}


//Function that will add the total span and total the cost of the classes
//selected.
var totalAmount = function() {
  var checkbox = mainForm.querySelectorAll('input[type=checkbox]');

  if (total.style.display) {
    total.style.display = "";
    num.style.display = "";
    num.innerHTML = parseInt(this.value);

  } else if (!this.checked) {
    num.innerHTML = parseInt(num.innerHTML) - parseInt(this.value);

  } else {
    num.innerHTML = parseInt(num.innerHTML) + parseInt(this.value);
  }
  if (parseInt(num.innerHTML) === 0) {
    total.style.display = "none";
    num.style.display = "none";
  }

  for (var i = 0; i < checkbox.length; i++) {
    if (checkbox[i].checked === true) {
      document.getElementById('activityError').style.display = 'none';
      break;
    } else if (checkbox[i].checked === false) {
        document.getElementById('activityError').style.display = '';
      }
  }
};


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
for (var i = 2; i < (actFieldSet.children.length - 2); i++) {
  bindCheckboxes(actFieldSet.children[i], 100);
}


//Function to hide or display payment info.
function paymentInfo() {

  if (paySelect.querySelector('option[value=credit_card]').selected) {
    creditCardDiv.style.display = '';
    ccNumber.value = '';
    zipNumber.value = '';
    cvvNumber.value = '';
    document.getElementById('ccError').style.display = '';
    document.getElementById('zipError').style.display = '';
    document.getElementById('cvvError').style.display = '';
  } else {
    creditCardDiv.style.display = 'none';
    document.getElementById('ccError').style.display = 'none';
    document.getElementById('validCcError').style.display = 'none';
    document.getElementById('zipError').style.display = 'none';
    document.getElementById('cvvError').style.display = 'none';
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
  if (paySelect.querySelector('option[value=select_method]').selected) {
    document.getElementById('payOptionError').style.display = '';
  } else {
    document.getElementById('payOptionError').style.display = 'none';
  }
}


//Function hides payment options except for credit card.
function hidePayOptions() {
  paypalDiv.style.display = 'none';
  bitcoinDiv.style.display = 'none';
  paySelect.querySelector('option[value=credit_card]').selected = true;
}
hidePayOptions();


//Function to auto validate email field and hide or display errors.
var emailValidate = function() {

  if (email.value.includes('@') && email.value.includes('.')) {
    document.getElementById('validEmailError').style.display = 'none';
  } else if (!email.value.includes('@') || !email.value.includes('.')) {
      document.getElementById('validEmailError').style.display = '';
      document.getElementById('emailError').style.display = 'none';
    }
};


//Function to auto validate name field and hide or display errors.
var nameValidate = function() {

  if (fullName.value) {
    document.getElementById('nameError').style.display = 'none';
  } else if (!fullName.value) {
    document.getElementById('nameError').style.display = '';
    }
};


//Function to auto validate credit card fields and hide or display errors.
//This function does not check to see if it is a valid credit card number (I
//wasn't sure if that was a requirement) it just checks if it is a number and
//it's between 13 - 16.
var ccValidate = function() {

  if (isNaN(ccNumber.value)) {
    document.getElementById('ccError').style.display = 'none';
    document.getElementById('validCcError').style.display = '';
  } else if (ccNumber.value.length < 13 || ccNumber.value.length > 16) {
      document.getElementById('ccError').style.display = 'none';
      document.getElementById('validCcError').style.display = '';
  } else {
      document.getElementById('ccError').style.display = 'none';
      document.getElementById('validCcError').style.display = 'none';
  }
  if (isNaN(zipNumber.value)) {
    document.getElementById('zipError').style.display = '';
  } else if (zipNumber.value.length !== 5) {
      document.getElementById('zipError').style.display = '';
  } else {
      document.getElementById('zipError').style.display = 'none';
  }
  if (isNaN(cvvNumber.value)) {
    document.getElementById('cvvError').style.display = '';
  } else if (cvvNumber.value.length !== 3) {
      document.getElementById('cvvError').style.display = '';
  } else {
      document.getElementById('cvvError').style.display = 'none';
  }
};


//Function to bind oninput method to credit card, name and email fields.
function bindInputs() {
  ccNumber.oninput = ccValidate;
  zipNumber.oninput = ccValidate;
  cvvNumber.oninput = ccValidate;
  email.oninput = emailValidate;
  fullName.oninput = nameValidate;
}
bindInputs();


//This function validates all fields on submit and will not submit the form if
//a section or field is not filled out. I used a variable to keep track if
//each field has a value or not.
function validateOnSubmit() {
  var jobRole = document.getElementById('title').value;
  var design = document.getElementById('design').value;
  var checkbox = mainForm.querySelectorAll('input[type=checkbox]');
  var fieldError = '';
  var checkboxError = '';

  if (!fullName.value) {
    document.getElementById('nameError').style.display = '';
    fieldError += 'field1';
  }
  if (!email.value) {
    document.getElementById('emailError').style.display = '';
    document.getElementById('validEmailError').style.display = 'none';
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
  if (!ccNumber.value && paySelect.querySelector('option[value=credit_card]').selected) {
    document.getElementById('ccError').style.display = '';
    document.getElementById('validCcError').style.display = 'none';
    fieldError += 'field6';
  }
  if (!zipNumber.value && paySelect.querySelector('option[value=credit_card]').selected) {
    document.getElementById('zipError').style.display = '';
    fieldError += 'field7';
  }
  if (!cvvNumber.value && paySelect.querySelector('option[value=credit_card]').selected) {
    document.getElementById('cvvError').style.display = '';
    fieldError += 'field8';
  }
  if (fieldError.length > 0 || checkboxError.length === 0) {
  return false;
  }
}

//This runs after page loads and focuses on the name input.
window.onload = function() {
  document.getElementById('name').focus();
};
