const resetEmployeeForm=()=>{
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

const validateEmployeForm=()=>{
    var empid=$('#empId').val().trim();
    var empName=$('#empName').val().trim();
    var empSalary=$('#empSalary').val().trim();
    var hra=$('#hra').val().trim();
    var da=$('#da').val().trim();
    var deduction=$('#deduction').val().trim();
    if(empid==""){
        alert("Please enter employee id!");
        $('#empId').focus();
        return "";
    }
    if(empName==""){
        alert("Please enter employee name!");
        $('#empName').focus();
        return "";
    }
    if(empSalary==""){
        alert("Please enter employee salary!");
        $('#empSalary').focus();
        return "";
    }
    if(hra==""){
        alert("Please enter HRA!");
        $('#hra').focus();
        return "";
    }
    if(da==""){
        alert("Please enter DA!");
        $('#da').focus();
        return "";
    }
    if(deduction==""){
        alert("Please enter Deduction!");
        $('#deduction').focus();
        return "";
    }
    var empData={
        id:empid,
        name:empName,
        salary:empSalary,
        hra:hra,
        da:da,
        deduction:deduction
    }
    console.log(JSON.stringify(empData))
    return JSON.stringify(empData)

}

const saveEmployeeForm=()=>{
    // alert("Clicked")
    let ValidForm=validateEmployeForm();
    if(ValidForm=="")
    {
        return ""
    }
    var putReqStr = createPUTRequest("90931496|-31949302813772162|90960247",
ValidForm, "EMPLOYEE", "EMP-REL");
alert(putReqStr);
jQuery.ajaxSetup({async: false});
var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
"http://api.login2explore.com:5577", "/api/iml");
alert(JSON.stringify(resultObj));
jQuery.ajaxSetup({async: true});
resetEmployeeForm();

}