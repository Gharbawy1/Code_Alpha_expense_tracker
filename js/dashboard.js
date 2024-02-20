document.addEventListener("DOMContentLoaded",()=>{
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

        if (localStorage.getItem("rowData")){
            for (var i = 0; i < storedCategories.length; i++) {
                if (storedCategories[i].OwnerEmail == OwnerEmail){
                    var span = document.createElement('span');
                    span.classList.add('badge', 'text-bg-warning');
                    span.textContent = storedCategories[i].category;
                    if (storedCategories[i].type.toLowerCase().trim() == "income"){
                        span.style.height = "25px";
                        span.style.backgroundColor = "#008000"; 
                        }
                        else if (storedCategories[i].type.toLowerCase().trim() == "expense"){
                            span.style.height = "25px";
                            span.style.backgroundColor = "#9d2929";
                        }
                    categoriesDiv.appendChild(span);
    
                }   
            }
        }
        
        // now we have to fetch the local storage with key "Transactions"
        var RetrievedTransactions = JSON.parse(localStorage.getItem("Transactions"));
        if (localStorage.getItem("Transactions")){
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
        
})




function CalcTotalIncome() {
    // we want to fetch the local storage to get the amount of each transactions has '+' sign
    // we make the amount if its category income '+ '+ Amount
    // console.log();

    var storedTransactions = localStorage.getItem("Transactions");
    var transactions = JSON.parse(storedTransactions);
    var Total = 0;
    if (localStorage.getItem("Transactions")){
        for (var i = 0; i < transactions.length; i++) {
            if (transactions[i].OwnerEmail == localStorage.getItem("current user")){
                if (transactions[i].Amount[0] == "+") {
                    Total += convertToNumber(transactions[i].Amount);
                }
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
    if(localStorage.getItem("Transactions")){
        for (var i = 0; i < transactions.length; i++) {
            if (transactions[i].OwnerEmail == localStorage.getItem("current user")){
            if (transactions[i].Amount[0] == "-") {
                Total += convertToNumber(transactions[i].Amount);
            }
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