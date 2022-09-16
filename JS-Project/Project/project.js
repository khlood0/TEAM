
var form = document.getElementById('form');
var    emailError = document.getElementById('email-error');
var   passwordError = document.getElementById('password-error');
var   sumbitError = document.getElementById('submit-error');

function validatemail(){
    var email = document.getElementById('email').value;

if(email.length == 0){
    emailError.innerHTML="Email is required";
    return false;
}
if(!email.match( /^([a-zA-Z0-9]+)@([a-zA-Z]+)\.([a-z]){2,4}$/)){
           emailError.innerHTML="Email Invalid";
           return false;
}
else{
          emailError.innerHTML='<i class="fa fa-check-circle"></i>';
          return true;
}
}

function validatepass(){
    var  password = document.getElementById('password').value; 
   
    if(password.length == 0){
        passwordError.innerHTML="Password is required";
        return false;
    }    
    if(!password.match( /^[a-zA-Z0-9]{4,8}$/)){
        passwordError.innerHTML="Password Invalid ";
        return false;
}
else{
    passwordError.innerHTML='<i class="fa fa-check-circle"></i>';
       return true;
}
}

function validatsumbit(){
    if(!validatemail() || validatepass()){
        sumbitError.style.display='block';
        sumbitError.innerHTML="Please fix error to sumbit"
        setTimeout(function() {sumbitError.style.display='none';},3000)
        return false;
    }
}

function signUp  (e) {
    if (validatepass() && validatemail() == true){
    var fname = document.getElementById('fname').value,
        lname = document.getElementById('lname').value,
        email = document.getElementById('email').value,
        pwd = document.getElementById('password').value; 
    var formData = JSON.parse(localStorage.getItem('formData')) || [];
    var exist = formData.length && 
        JSON.parse(localStorage.getItem('formData')).some(data => 
            data.email.toLowerCase() == email.toLowerCase()
        );

    if(!exist){
        formData.push({ fname, lname, email, pwd });
        localStorage.setItem('formData', JSON.stringify(formData));
        document.querySelector('form').reset();
        document.getElementById('fname').focus();
        alert("Account Created.\n\nPlease Sign In using the link below.");
    }
    else{
        alert("You have already account");
    }
    e.preventDefault();
}
else{
    alert("You have enter validate email and password");
}
}


function signIn(e)
 {
    var email = document.getElementById('email').value, pwd = document.getElementById('pwd').value;
    var formData = JSON.parse(localStorage.getItem('formData')) || [];
    var exist = formData.length && 
    JSON.parse(localStorage.getItem('formData')).some(data => data.email.toLowerCase() == email && data.pwd.toLowerCase() == pwd);
    if(!exist){
        alert("Incorrect password or email");
    }
    else{
        alert("Login Successful");
        window.location.href = "main.html";
    }
    e.preventDefault();
}



  




















