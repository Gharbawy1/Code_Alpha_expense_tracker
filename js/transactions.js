    document.addEventListener("DOMContentLoaded",()=>{

        // fetch the local storage for the categories and push it into the select and create the options
    // Fetch the categories from local storage
    var storedCategories = JSON.parse(localStorage.getItem("rowData")) || [];
    // Get the select element by its ID
    var selectElement = document.getElementById("select-category");
    // Iterate over the stored categories and create options
    var OwnerEmail = localStorage.getItem("current user");

    for (var i = 0; i < storedCategories.length; i++) {
        if (storedCategories[i].OwnerEmail == OwnerEmail){
            var option = document.createElement("option");
        option.textContent = storedCategories[i].category;
        selectElement.appendChild(option);
        }   
    }
    // now we have to fetch the local storage with key "Transactions"
    var RetrievedTransactions = JSON.parse(localStorage.getItem("Transactions"));
    for (var i = 0; i < RetrievedTransactions.length; i++) {
            if (RetrievedTransactions[i].OwnerEmail == OwnerEmail){
            var category = RetrievedTransactions[i].category;
            var Date = RetrievedTransactions[i].Date;
            var Amount = RetrievedTransactions[i].Amount;


            var table = document.getElementById("dataTable");
            var tbody = table.getElementsByTagName("tbody")[0];

            // Create a new row and cells
            var newRow = tbody.insertRow();
            var cell1 = newRow.insertCell(0);// Date
            cell1.style.border = "none";
            var cell2 = newRow.insertCell(1);// Amount
            cell2.style.border = "none";
            var cell3 = newRow.insertCell(2);//category
            cell3.style.border = "none";
            var cell4 = newRow.insertCell(3);// delete button
            cell4.innerHTML = '<button onclick="deleteRowAndLocalStorage(this)" style="background-color:transparent;border:none; color:#ae2b3d;"><i class="fa-solid fa-trash"></i></button>';
            cell4.innerHTML += '<button onclick="deleteRowAndLocalStorage(this)" style="background-color:transparent;border:none; color:#ae2b3d;padding-left:10px;"><i class="fa-solid fa-pen"></i></button>';

            cell4.style.border = "none";

            cell1.textContent = category;
            cell2.textContent = Date;
            
            // cell3.textContent = ;   
            if (RetrievedTransactions[i].Amount[0] == '-'){
                var Am = convertToNumber(RetrievedTransactions[i].Amount);
                cell3.textContent =  '- '+formatter.format(Am);
            }else{
                var Am = convertToNumber(RetrievedTransactions[i].Amount);
                cell3.textContent =  '+ '+formatter.format(Am);
            }
            }
        }
 
    })





    