    document.addEventListener("DOMContentLoaded",function(){
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
            var type = stordata[i].type.trim().toLowerCase();
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

            if (type.trim().toLowerCase() == "expense") {
                cell3.style.color = "#ae2b3d";
                cell3.style.fontWeight = "bolder";
                cell3.style.fontFamily = "cursive";

            } else if (type.trim().toLowerCase() == "income") {
                cell3.style.color = "#227354";
                cell3.style.fontWeight = "bolder";
                cell3.style.fontFamily = "cursive";
            
            }
    }
        }
    }



    })
    
    



function deleteRowAndLocalStorage(button){
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
