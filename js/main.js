// array for store categories in lcoal storage to display it in select input 
var categories = [];
const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
var storedData = JSON.parse(localStorage.getItem("rowData")) || []; // for categories


function toggleFormWindow() {
    var modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    modal.show();
}

function formatAmount(value) {
    document.getElementById("AmountInput").value = '$ ' + value;
}


document.addEventListener("DOMContentLoaded", function () {
    if (this.location.pathname == "/category.html") {
        // mean i from the gategory page then load all data below to category page
        // Retrieve the stored data from localStorage or create an array
        if (storedData.length == 0) {
            console.log("no data stored");
        }
        else {
            // if i store data in local storage the go to local get data loop on it and take the object data and display it
            var stordata = JSON.parse(localStorage.getItem("rowData"));
            var OwnerEmail = localStorage.getItem("current user");

            for (var i = 0; i < stordata.length; i++) {
                if (stordata[i].OwnerEmail == OwnerEmail){
                var category = stordata[i].category;
                // push all stored data category in local storage
                var type = stordata[i].type;
                // Get the table and tbody elements
                var table = document.getElementById("dataTable");
                var tbody = table.getElementsByTagName("tbody")[0];

                // Create a new row and cells
                var newRow = tbody.insertRow();
                var cell2 = newRow.insertCell(0);
                cell2.style.border = "none";
                var cell3 = newRow.insertCell(1);
                cell3.style.border = "none";
                var cell4 = newRow.insertCell(2);
                cell4.style.border = "none";
                cell4.innerHTML = '<button onclick="deleteRowAndLocalStorage(this)" style="background-color:transparent;border:none; color:#ae2b3d;"><i class="fa-solid fa-trash"></i></button>';

                // Populate the cells with user input values
                cell2.textContent = category;
                cell3.textContent = type;
                if (type == "expense") {
                    cell3.style.color = "#ae2b3d";
                    cell3.style.fontWeight = "bolder";
                    cell3.style.fontFamily = "cursive";

                } else if (type == "income") {
                    cell3.style.color = "#227354";
                    cell3.style.fontWeight = "bolder";
                    cell3.style.fontFamily = "cursive";
                
                }
        }
            }
        }
    }
    else if (this.location.pathname == "/transactions.html") {
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
        

    }
    else if (this.location.pathname == "/dashboard.html") {
    CalcTotalIncome();
    CalcTotalExpense();
    calcBalance();
    // fetch the local storage for the categories and push it into the select and create the options
        // Fetch the categories from local storage
        var storedCategories = JSON.parse(localStorage.getItem("rowData")) || [];
        // Get the select element by its ID
        var selectElement = document.getElementById("select-category");
        // Iterate over the stored categories and create options
        var OwnerEmail = localStorage.getItem("current user");
        var categoriesDiv = document.querySelector('.cell.Categories');

        for (var i = 0; i < storedCategories.length; i++) {
            if (storedCategories[i].OwnerEmail == OwnerEmail){
                var span = document.createElement('span');
                span.classList.add('badge', 'text-bg-warning');
                span.textContent = storedCategories[i].category;
                if (storedCategories[i].type == "income"){
                    span.style.height = "25px";
                    span.style.backgroundColor = "#008000"; 
                    }
                    else if (storedCategories[i].type == "expense"){
                        span.style.height = "25px";
                        span.style.backgroundColor = "#9d2929";
                    }
                categoriesDiv.appendChild(span);

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
                newRow.style.textAlign="center";    
                var cell1 = newRow.insertCell(0);// Date
                cell1.style.border = "none";
                var cell2 = newRow.insertCell(1);// Amount
                cell2.style.border = "none";
                var cell3 = newRow.insertCell(2);//category
                cell3.style.border = "none";
                

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
    }
    else if (this.location.pathname == "/index.html")
    {
        if (localStorage.getItem("current user") != null){
            document.getElementById("authntication-btns").style.visibility= "hidden";
            document.getElementById("go-to-dash").style.visibility= "visible";
            document.getElementById("go-to-dash").onclick = function (){
                window.location.href = "dashboard.html";
            }
        }
        else {
            document.getElementById("authntication-btns").style.visibility= "visible";
            document.getElementById("go-to-dash").style.visibility= "hidden";
        }
    }

});


function AddTransaction() {
    // we want to take all categories from the local storage "rowData"to insert its value to the select options
    // Get the table and tbody elements
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
    cell4.style.border = "none";

    // Populate the cells with user input values
    var category1 = document.getElementById("select-category").value;
    var Date1 = document.getElementById("DateInput").value;
    var Amount1 = document.getElementById("AmountInput").value;


    cell1.textContent = category1;
    cell2.textContent = Date1;

    // we want to check if the category in income or expense to add + or - search about the category in local if found then check if the index type
    var storedCategories = JSON.parse(localStorage.getItem("rowData")) || []; // rowData[i] = object{category,type}
    // Check if the category exists in the stored categories
    var categoryIndex;
    for (var i = 0; i < storedCategories.length; i++) {
        if (storedCategories[i].category == category1) {
            categoryIndex = i;
            break;
        }
    }
    if (storedCategories[categoryIndex].type == "expense") {
        Amount1 = '- ' + Amount1;
    }
    else if (storedCategories[categoryIndex].type == "income") {
        Amount1 = '+ ' + Amount1;
    }
    cell3.textContent = Amount1;
    // this transaction has an own this own in local storage called "curren user"
    // in the last update 2/16 we will update the transaction object and make its owner the email
    // validate the current user
    var email = localStorage.getItem("current user");

    var newTransaction = {
        OwnerEmail: email,
        category: category1,
        Date: Date1,
        Amount: Amount1,
    }
    // Retrieve existing transactions from localStorage or initialize an empty array
    var transactions = JSON.parse(localStorage.getItem("Transactions")) || [];

    // Add the new transaction to the array
    transactions.push(newTransaction);

    // Store the updated transactions array in localStorage
    localStorage.setItem("Transactions", JSON.stringify(transactions));
    // // NOW WE RECORD EACH
}

function addCategory() {
    if (this.location.pathname == "/category.html") {
        var typeInput = document.getElementById('typeInput');
        var typeval = typeInput.value;
        if (typeval != "expense" && typeval != "income") {
            // wrong input 
            var modal = new bootstrap.Modal(document.getElementById('exampleModal5'));
            modal.show();
            return;
        }

        // Get user input values or use data from the argument
        var category = document.getElementById('categoryInput').value;
        categories.push(category);
        localStorage.setItem("categories", JSON.stringify(categories));// after add any category in category section update this key storage and delete if deleted 

        var type = document.getElementById('typeInput').value;

        // Get the table and tbody elements
        var table = document.getElementById("dataTable");
        var tbody = table.getElementsByTagName("tbody")[0];

        // Create a new row and cells
        var newRow = tbody.insertRow();
        var cell2 = newRow.insertCell(0);
        cell2.style.border = "none";
        var cell3 = newRow.insertCell(1);
        cell3.style.border = "none";
        var cell4 = newRow.insertCell(2);
        cell4.style.border = "none";
        cell4.innerHTML = '<button onclick="deleteRowAndLocalStorage(this)" style="background-color:transparent;border:none; color:#ae2b3d;"><i class="fa-solid fa-trash"></i></button>';

        // Populate the cells with user input values
        cell2.textContent = category;
        cell3.textContent = type;

        if (type == "expense") {
            cell3.style.color = "#ae2b3d";
            cell3.style.fontWeight = "bolder";
            cell3.style.fontFamily = "cursive";
        }
        else if (type == "income") {
            cell3.style.color = "#227354";
            cell3.style.fontWeight = "bolder";
            cell3.style.fontFamily = "cursive";
        }

        // Save the new row data to localStorage by creating an object
        var Email = localStorage.getItem("current user");
        var newRowData = { 
            OwnerEmail:Email,
            category: category,
            type: type
        };
        storedData.push(newRowData);
        // local storage name is row data
        localStorage.setItem("rowData", JSON.stringify(storedData));

        // Clear input fields
        document.getElementById("categoryInput").value = "";
        document.getElementById("typeInput").value = "";

        updateNumOfItems();
        // Close the form window

    }
}




function deleteRowAndLocalStorage(button) {
    if (this.location.pathname == "/category.html") {
        // Get the row to be deleted
        var row = button.parentNode.parentNode;

        // Get the table and tbody elements
        var table = document.getElementById("dataTable");
        var tbody = table.getElementsByTagName("tbody")[0];

        // Get the row index
        var rowIndex = row.rowIndex;

        // Get the stored data from localStorage
        var storedData = JSON.parse(localStorage.getItem("rowData")) || [];

        // Remove the corresponding item from storedData array
        storedData.splice(rowIndex - 2, 1); // from index rowindex-2 remove 1 item zero based 

        // Update the local storage
        localStorage.setItem("rowData", JSON.stringify(storedData));

        // Delete the row
        tbody.removeChild(row);
    }
    else if (this.location.pathname == "/transactions.html") {

        var row = button.parentNode.parentNode;

        // Get the table and tbody elements
        var table = document.getElementById("dataTable");
        var tbody = table.getElementsByTagName("tbody")[0];

        // Get the row index
        var rowIndex = row.rowIndex;

        // Get the stored data from localStorage
        var storedData = JSON.parse(localStorage.getItem("Transactions")) || [];

        // Remove the corresponding item from storedData array
        storedData.splice(rowIndex - 2, 1); // from index rowindex-2 remove 1 item zero based 

        // Update the local storage
        localStorage.setItem("Transactions", JSON.stringify(storedData));

        // Delete the row
        tbody.removeChild(row);
    }
    updateNumOfItems();
}




function updateNumOfItems() {
    var table = document.getElementById("dataTable");
    var tbody = table.getElementsByTagName("tbody")[0];
    var caption = document.getElementById("tableCaption");

    // Get the number of rows
    var numRows = tbody.rows.length - 1;

    // Update the caption with the number of rows
    caption.textContent = "Number of Categories : " + numRows;
    caption.style.color = "wheat";
}
function convertToNumber(amountString) {
    // Remove the dollar sign and convert the remaining string to a number
    return parseFloat(amountString.replace(/[^\d.]+/g, ''));
}
function CalcTotalIncome() {
    // we want to fetch the local storage to get the amount of each transactions has '+' sign
    // we make the amount if its category income '+ '+ Amount
    // console.log();

    var storedTransactions = localStorage.getItem("Transactions");
    var transactions = JSON.parse(storedTransactions);
    var Total = 0;
    for (var i = 0; i < transactions.length; i++) {
        if (transactions[i].OwnerEmail == localStorage.getItem("current user")){
            if (transactions[i].Amount[0] == "+") {
                Total += convertToNumber(transactions[i].Amount);
            }
        }
    }
    localStorage.setItem("TotalIncome", Total);
    var TotalIncome = document.getElementById("totalIncome");
    TotalIncome.innerText = formatter.format(Total);


}
function CalcTotalExpense() {
    // we want to fetch the local storage to get the amount of each transactions has '+' sign
    // we make the amount if its category income '+ '+ Amount
    // console.log();

    var storedTransactions = localStorage.getItem("Transactions");
    var transactions = JSON.parse(storedTransactions);
    var Total = 0;
    for (var i = 0; i < transactions.length; i++) {
        if (transactions[i].OwnerEmail == localStorage.getItem("current user")){
        if (transactions[i].Amount[0] == "-") {
            Total += convertToNumber(transactions[i].Amount);
        }
    }
    }
    localStorage.setItem("TotalExpense", Total);
    var TotalIncome = document.getElementById("totalExpense");
    TotalIncome.innerText = formatter.format(Total);
}
function calcBalance() {
    var income = parseFloat(localStorage.getItem("TotalIncome"));
    var expense = parseFloat(localStorage.getItem("TotalExpense"));
    var Total = income - expense;
    document.getElementById("Balance").innerHTML = formatter.format(Total);
}





function reveal() {
    var reveals = document.querySelectorAll(".sec");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}
window.addEventListener("scroll", reveal);





