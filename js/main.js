// array for store categories in lcoal storage to display it in select input 
var categories = [];
var storedData = JSON.parse(localStorage.getItem("rowData")) || []; // for categories
const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });


function toggleTransFormWindow(){
    document.getElementById("update-btn").style.display = "none";
    document.getElementById("add-trans-btn").style.display = "block";
    var modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    modal.show();
}


function toggleFormCatWindow() {
    document.getElementById("update-btn").style.display = "none";
    document.getElementById("add-cat-btn").style.display = "block";
    var modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    modal.show();
}

function formatAmount(value) {
    document.getElementById("AmountInput").value = '$ ' + value;
}


document.addEventListener("DOMContentLoaded", function () {
    // show the intro panel    
    if (localStorage.getItem("current user") != null){
            document.getElementById("authntication-btns").style.visibility= "hidden";
            document.getElementById("go-to-dash").style.visibility= "visible";
            document.getElementById("go-to-dash").onclick = function (){
                window.location.href = "dashboard.html";
            }
        }
        else {
            var modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
            modal.show();
            document.getElementById("authntication-btns").style.visibility= "visible";
            document.getElementById("go-to-dash").style.visibility= "hidden";
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
    cell4.innerHTML = '<button onclick="deleteRowAndLocalStorage(this)" style="background-color:transparent;border:none; color:#ae2b3d;margin-right:40px;"><i class="fa-solid fa-trash"></i></button>';
    cell4.innerHTML += '<button onclick="UpdateTransaction(this)" style="background-color:transparent;border:none; color:#ae2b3d;"><i class="fa-solid fa-pen"></i></button>';

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

    // if (this.location.pathname == "/category.html") { this is problem
        var typeInput = document.getElementById('typeInput');
        var typeval = typeInput.value.toLowerCase().trim();
        // console.log(typeval);
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

        var type = document.getElementById('typeInput').value.toLowerCase().trim();

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
        cell4.innerHTML = '<button onclick="deleteRowAndLocalStorage(this)" style="background-color:transparent;margin-right:40px;border:none; color:#ae2b3d;"><i class="fa-solid fa-trash"></i></button>';
        cell4.innerHTML += '<button onclick="UpdateTransaction(this)" style="background-color:transparent;border:none; color:#ae2b3d;"><i class="fa-solid fa-pen"></i></button>';

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
// }

function UpdateCategory(button){
    var row = button.parentNode.parentNode;
    var IndexOfrow = row.rowIndex; // select row index
    
    // fetch the local storages
    var storedCategoriesInCateoriesLocation = JSON.parse(localStorage.getItem("categories"));
    var storedCategoriesInRowDataLocation = JSON.parse(localStorage.getItem("rowData"));

    console.log("hello");
    toggleFormCatWindow(); // display add window

    document.getElementById("categoryInput").value = row.cells[0].textContent;
    document.getElementById("typeInput").value = row.cells[1].textContent;
    
    // toggle btns
    document.getElementById("update-btn").style.display = "block";
    document.getElementById("add-cat-btn").style.display = "none";

    


    var upd = document.getElementById("update-btn");
    upd.addEventListener("click",()=>{
        storedCategoriesInRowDataLocation[IndexOfrow-2].category = document.getElementById("categoryInput").value;
        storedCategoriesInRowDataLocation[IndexOfrow-2].type = document.getElementById("typeInput").value;

        localStorage.setItem("categories",JSON.stringify(storedCategoriesInCateoriesLocation));
        localStorage.setItem("rowData",JSON.stringify(storedCategoriesInRowDataLocation));
        
        row.cells[0].innerHTML = document.getElementById("categoryInput").value;
        row.cells[1].textContent = document.getElementById("typeInput").value;
        
        this.location.href = "category.html"; // refresh the page


    })

}

function UpdateTransaction(button){
    var row = button.parentNode.parentNode;
    var IndexOfrow = row.rowIndex; // select row index
    
    // fetch the local storages
    var storedCategoriesInTransactions = JSON.parse(localStorage.getItem("Transactions"));

    toggleTransFormWindow(); // display add window

    document.getElementById("select-category").value = row.cells[0].textContent;
    document.getElementById("DateInput").value = row.cells[1].textContent;
    document.getElementById("AmountInput").value = row.cells[2].textContent;
    
    
    // toggle btns
    document.getElementById("update-btn").style.display = "block";
    document.getElementById("add-trans-btn").style.display = "none";

    


    var upd = document.getElementById("update-btn");
    upd.addEventListener("click",()=>{
        // update array the update local storage
        storedCategoriesInTransactions[IndexOfrow-2].category = document.getElementById("select-category").value;
        storedCategoriesInTransactions[IndexOfrow-2].Date = document.getElementById("DateInput").value;
        storedCategoriesInTransactions[IndexOfrow-2].Amount = document.getElementById("AmountInput").value;

        localStorage.setItem("Transactions",JSON.stringify(storedCategoriesInTransactions));
        
        row.cells[0].textContent = document.getElementById("select-category").value;
        row.cells[1].textContent = document.getElementById("DateInput").value;
        row.cells[1].textContent = document.getElementById("AmountInput").value;

        this.location.href = "transactions.html"; // refresh the page


    })

}













function convertToNumber(amountString) {
    // Remove the dollar sign and convert the remaining string to a number
    return parseFloat(amountString.replace(/[^\d.]+/g, ''));
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





