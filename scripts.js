let data = [
    { No: 1, NIM: "123456789", Nama: "Andi", Kelas: "A", Prodi: "Informatika", Alamat: "Jakarta" },
    { No: 2, NIM: "987654321", Nama: "Budi", Kelas: "B", Prodi: "Informatika", Alamat: "Bandung" },
    { No: 3, NIM: "123123123", Nama: "Cici", Kelas: "C", Prodi: "Informatika", Alamat: "Surabaya" },
    { No: 4, NIM: "456456456", Nama: "Dedi", Kelas: "D", Prodi: "Informatika", Alamat: "Medan" },
    { No: 5, NIM: "789789789", Nama: "Eka", Kelas: "E", Prodi: "Informatika", Alamat: "Yogyakarta" }
];

function renderTable() {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "";

    data.forEach((item, index) => {
        const row = document.createElement("tr");
        
        Object.keys(item).forEach(key => {
            const cell = document.createElement("td");
            cell.textContent = item[key];
            
            if (key !== "No") {
                cell.addEventListener("dblclick", () => makeEditable(cell, index, key));
            }
            
            row.appendChild(cell);
        });
        
        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteRow(index));
        
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        
        tableBody.appendChild(row);
    });
}

function makeEditable(cell, rowIndex, field) {
    const originalValue = cell.textContent;
    cell.innerHTML = `<input type="text" value="${originalValue}"><button onclick="saveEdit(this, ${rowIndex}, '${field}')">OK</button><button onclick="cancelEdit(this, '${originalValue}')">Cancel</button>`;
}

function saveEdit(button, rowIndex, field) {
    const cell = button.parentNode;
    const newValue = cell.querySelector("input").value;
    data[rowIndex][field] = newValue;
    saveData();
    renderTable();
}

function cancelEdit(button, originalValue) {
    const cell = button.parentNode;
    cell.textContent = originalValue;
}

function deleteRow(index) {
    data.splice(index, 1);
    saveData();
    renderTable();
}

function addRow() {
    data.push({ No: data.length + 1, NIM: "000000000", Nama: "Edit Me", Kelas: "X", Prodi: "Your Prodi", Alamat: "Your Address" });
    saveData();
    renderTable();
}

function saveData() {
    document.cookie = `tableData=${JSON.stringify(data)}; path=/; max-age=31536000`; // 1 year
}

function loadData() {
    const cookieData = document.cookie.split("; ").find(row => row.startsWith("tableData="));
    if (cookieData) {
        data = JSON.parse(cookieData.split("=")[1]);
    }
    renderTable();
}

document.getElementById("addRowButton").addEventListener("click", addRow);

window.onload = loadData;
