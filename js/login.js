

function SearchUser() {
    var email = document.getElementById("email").value;
    var pass = document.getElementById("PasswordIn").value;
    if (email =="" && pass == ""){
        alert("Fill all fileds please !");
        return;
    }
    var Fname , Lname;
    // Fetch the local storage that was created in the sign-up page
    var RetrievedUsers = JSON.parse(localStorage.getItem("Users"));

    // Users Local Storage store {Fname , Lname , Email , Password};
    var Emailfound = false;
    var PasswordCorrect = false;
    if (localStorage.getItem("Users")){
        for (var i = 0; i < RetrievedUsers.length; i++) {
            if (email == RetrievedUsers[i].Email) {
                Emailfound = true;
                // Check the password only if the email is found
                if (pass == RetrievedUsers[i].Password) {
                    PasswordCorrect = true;
                    Fname = RetrievedUsers[i].Fname;
                    Lname = RetrievedUsers[i].Lname;
                    break; // No need to continue the loop once the correct password is found
                }
            }
        }
    }
    

    if (Emailfound && PasswordCorrect) {
        // Email and password are correct
        alert("Login successful");
        localStorage.setItem("current user",`${Fname} ${Lname}`);
        window.location.href = "dashboard.html";
        // Add further actions if needed
    } else if (Emailfound && !PasswordCorrect) {
        // Password incorrect
        alert("Please enter the correct password");
    } else {
        // Email not found
        var modal = new bootstrap.Modal(document.getElementById('exampleModal6'));
        modal.show();

    }
}


