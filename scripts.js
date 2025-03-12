document.addEventListener("DOMContentLoaded", () => {
    let table = document.getElementById("data-table").getElementsByTagName('tbody')[0];

    // Function to create a new row
    function createRow(no, nim, nama, kelas, prodi, alamat) {
        let row = table.insertRow();
        row.innerHTML = `
            <td>${no}</td>
            <td class="editable" data-field="nim">${nim}</td>
            <td class="editable" data-field="nama">${nama}</td>
            <td class="editable" data-field="kelas">${kelas}</td>
            <td class="editable" data-field="prodi">${prodi}</td>
            <td class="editable" data-field="alamat">${alamat}</td>
            <td><button class="delete">Delete</button></td>
        `;
    }

    // Dummy data
    let initialData = [
        { no: 1, nim: '123456789', nama: 'Alice', kelas: 'A', prodi: 'TI', alamat: 'Bandung' },
        { no: 2, nim: '234567890', nama: 'Bob', kelas: 'B', prodi: 'SI', alamat: 'Jakarta' },
        { no: 3, nim: '345678901', nama: 'Charlie', kelas: 'C', prodi: 'TI', alamat: 'Surabaya' },
        { no: 4, nim: '456789012', nama: 'David', kelas: 'D', prodi: 'TI', alamat: 'Yogyakarta' },
        { no: 5, nim: '567890123', nama: 'Eve', kelas: 'E', prodi: 'SI', alamat: 'Bali' }
    ];

    // Load initial data
    initialData.forEach((data, index) => createRow(data.no, data.nim, data.nama, data.kelas, data.prodi, data.alamat));

    // Add new row
    document.getElementById("add-row").addEventListener("click", () => {
        let rowCount = table.rows.length + 1;
        createRow(rowCount, '000000000', 'New Student', 'X', 'Y', 'Z');
    });

    // Delete row
    table.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
            let rowIndex = e.target.parentElement.parentElement.rowIndex - 1; // Adjust for header row
            e.target.parentElement.parentElement.remove();
            deleteRowData(rowIndex);
        }
    });

    // Editable cells
    table.addEventListener("dblclick", (e) => {
        if (e.target.classList.contains("editable")) {
            let currentText = e.target.textContent;
            let input = document.createElement("input");
            input.type = "text";
            input.value = currentText;
            let okButton = document.createElement("button");
            okButton.textContent = "OK";
            let cancelButton = document.createElement("button");
            cancelButton.textContent = "Cancel";
            e.target.innerHTML = "";
            e.target.appendChild(input);
            e.target.appendChild(okButton);
            e.target.appendChild(cancelButton);

            okButton.addEventListener("click", () => {
                e.target.textContent = input.value;
                saveData();
            });

            cancelButton.addEventListener("click", () => {
                e.target.textContent = currentText;
            });
        }
    });

    // Save data to cookie
    function saveData() {
        let rows = table.getElementsByTagName('tr');
        let data = [];
        for (let row of rows) {
            let cells = row.getElementsByTagName('td');
            let rowData = {
                no: cells[0].textContent,
                nim: cells[1].textContent,
                nama: cells[2].textContent,
                kelas: cells[3].textContent,
                prodi: cells[4].textContent,
                alamat: cells[5].textContent
            };
            data.push(rowData);
        }
        document.cookie = "tableData=" + JSON.stringify(data) + "; max-age=31536000; path=/";
    }

    // Load data from cookie
    function loadData() {
        let cookieData = document.cookie.replace(/(?:(?:^|.*;\s*)tableData\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if (cookieData) {
            let data = JSON.parse(cookieData);
            table.innerHTML = "";
            data.forEach((data) => createRow(data.no, data.nim, data.nama, data.kelas, data.prodi, data.alamat));
        }
    }

    // Delete row data from cookie
    function deleteRowData(index) {
        let cookieData = document.cookie.replace(/(?:(?:^|.*;\s*)tableData\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if (cookieData) {
            let data = JSON.parse(cookieData);
            data.splice(index, 1);
            document.cookie = "tableData=" + JSON.stringify(data) + "; max-age=31536000; path=/";
        }
    }

    loadData();
});
