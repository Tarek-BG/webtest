let selectedFile;
let jsonData = [];

document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
});

document.getElementById('button').addEventListener("click", () => {
    if (selectedFile) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: "binary" });
            workbook.SheetNames.forEach(sheet => {
                jsonData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                document.getElementById("jsondata").innerHTML = JSON.stringify(jsonData, undefined, 4);
                localStorage.setItem('jsonData', JSON.stringify(jsonData));
            });
        }
    }
});
