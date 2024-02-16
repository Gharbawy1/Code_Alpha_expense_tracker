
let emails  = ["ahmed@gmail.com" , "mohamed@gmail.com" ,"aml@gmail.com" ];
localStorage.setItem("emails",JSON.stringify(emails));

function SearchUser(){
    var email = document.getElementById("email").value;
    var RetrievedEmails = JSON.parse(localStorage.getItem("emails"));
    var found = false;
    for (var i =0;i<RetrievedEmails.length;i++){
        if (email == RetrievedEmails[i]){
            window.location.href = "dashboard.html";
            found = true;
            localStorage.setItem("current user",email);
            break;
        }
    }
    if (found == false){
        alert("user not found please sign up");
    }
}
