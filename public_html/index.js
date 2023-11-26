const resetEmployeeForm=()=>{
    // alert("Clicked")
    // document.getElementById('empId').value = "";
    // document.getElementById('empName').value = "";
    // document.getElementById('empSalary').value = "";
    // document.getElementById('hra').value = "";
    // document.getElementById('da').value = "";
    // document.getElementById('deduction').value = "";

    $('#empId').val("");
    $('#empName').val("");
    $('#empSalary').val("");
    $('#hra').val("");
    $('#da').val("");
    $('#deduction').val("");
    $('#empId').prop("disabled",false);
    $('#saveButton').prop("disabled",true);
    $('#changeButton').prop("disabled",true);
    $('#resetButton').prop("disabled",true);
    $('#empId').focus();

}