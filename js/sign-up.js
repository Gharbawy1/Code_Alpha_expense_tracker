var Users = [];

const FnameIn = document.querySelector("#FnameIn");
const LnameIn = document.querySelector("#LnameIn");
const EmailIn = document.querySelector("#EmailIn");
const PassIn = document.querySelector("#PasswordIn");
const signUpButton = document.getElementById('sign-up');

signUpButton.addEventListener("click", () => {

    // VALIDTAE THE EMAIL AND PASSWORD .. UPDATE 
    if (SearchForRegisterdUser()) {
        var modal = new bootstrap.Modal(document.getElementById('exampleModal5'));
        modal.show();
    }
    else {
        if (FnameIn.value !="" && LnameIn.value!="" && EmailIn.value!="" && PassIn.value!=""){
            let User = {
                Fname: FnameIn.value,
                Lname: LnameIn.value,
                Email: EmailIn.value,
                Password: PassIn.value
            }
            Users.push(User);
            localStorage.setItem("Users", JSON.stringify(Users));
        }else{
            alert("fill all siled");
        }
    }



})

function SearchForRegisterdUser() {
    if (localStorage.getItem("Users")) {
        var found = false;
        // found emails
        var FoundedUsers = JSON.parse(localStorage.getItem("Users"));
        for (var i = 0; i < FoundedUsers.length; i++) {
            if (EmailIn.value == FoundedUsers[i].Email) {
                // found email with the same enterd email !
                return true;
            }
        }
    } 
    else {
        return false;
        // not found an old user with the same email sign up sucssesfully
    }

}





