var connectionToken = "90931496|-31949302813772162|90960247";
var databaseName = "EMPLOYEE";
var relationName = "EMP-REL";
var baseURL = "http://api.login2explore.com:5577";
var endPointUrlIML = "/api/iml";
var endPointUrlIRL = "/api/irl";

const resetEmployeeForm = () => {
  $("#empId").val("");
  $("#empName").val("");
  $("#empSalary").val("");
  $("#hra").val("");
  $("#da").val("");
  $("#deduction").val("");
  $("#empId").prop("disabled", false);
  $("#saveButton").prop("disabled", true);
  $("#changeButton").prop("disabled", true);
  $("#resetButton").prop("disabled", true);
  $("#empId").focus();
};
const saveRecord=(JsonObj)=>{
    var Data=JSON.parse(JsonObj.data)
    localStorage.setItem('record_no',Data.rec_no)
}


const validateEmployeForm = () => {
  var empid = $("#empId").val().trim();
  var empName = $("#empName").val().trim();
  var empSalary = $("#empSalary").val().trim();
  var hra = $("#hra").val().trim();
  var da = $("#da").val().trim();
  var deduction = $("#deduction").val().trim();
  if (empid == "") {
    alert("Please enter employee id!");
    $("#empId").focus();
    return "";
  }
  if (empName == "") {
    alert("Please enter employee name!");
    $("#empName").focus();
    return "";
  }
  if (empSalary == "") {
    alert("Please enter employee salary!");
    $("#empSalary").focus();
    return "";
  }
  if (hra == "") {
    alert("Please enter HRA!");
    $("#hra").focus();
    return "";
  }
  if (da == "") {
    alert("Please enter DA!");
    $("#da").focus();
    return "";
  }
  if (deduction == "") {
    alert("Please enter Deduction!");
    $("#deduction").focus();
    return "";
  }
  var empData = {
    id: empid,
    name: empName,
    salary: empSalary,
    hra: hra,
    da: da,
    deduction: deduction,
  };
  console.log(JSON.stringify(empData));
  return JSON.stringify(empData);
};

const saveEmployeeForm = () => {
  // alert("Clicked")
  let ValidForm = validateEmployeForm();
  if (ValidForm == "") {
    return "";
  }
  var putReqStr = createPUTRequest(
    connectionToken,
    ValidForm,
    databaseName,
    relationName
  );
  alert(putReqStr);
  jQuery.ajaxSetup({ async: false });
  var resultObj = executeCommandAtGivenBaseUrl(
    putReqStr,
    baseURL,
    endPointUrlIML
  );
  alert(JSON.stringify(resultObj));
  jQuery.ajaxSetup({ async: true });
  resetEmployeeForm();
  $("#empId").focus();
};

const changeEmployeedata = () => {
  $("#changeButton").prop("disabled", true);
  let ValidForm = validateEmployeForm();
//   if (ValidForm == "") {
//     return "";
//   }

  var updateRequest = createUPDATERecordRequest(
    connectionToken,
    ValidForm,
    databaseName,
    relationName,
    localStorage.getItem("record_no")
  );
  alert(updateRequest);
  jQuery.ajaxSetup({ async: false });
  var resultObj = executeCommandAtGivenBaseUrl(
    updateRequest,
    baseURL,
    endPointUrlIML
  );
  alert(JSON.stringify(resultObj));
  jQuery.ajaxSetup({ async: true });
  resetEmployeeForm();
  $("#empId").focus();
};

function getEmpIdAsJsonObj(){
    var empid=$("#empId").val();
    var empidstr={
        id:empid
    }
    return JSON.stringify(empidstr)
}

const fillData=(JsonObj)=>{
    saveRecord(JsonObj)
    var data=JSON.parse(JsonObj.data).record
    $("#empName").val(data.name)
  $("#empSalary").val(data.salary);
  $("#hra").val(data.hra);
  $("#da").val(data.da);
  $("#deduction").val(data.deduction);

}

const getEmployeeRecord = () => {
  var empIdJsonObj = getEmpIdAsJsonObj();
  var getRequest = createGET_BY_KEYRequest(
    connectionToken,
    databaseName,
    relationName,
    empIdJsonObj
  );
  jQuery.ajaxSetup({ async: false });

  var resultObj = executeCommandAtGivenBaseUrl(
    getRequest,
    baseURL,
    endPointUrlIRL
  );
  jQuery.ajaxSetup({ async: true });
  if(resultObj.status===400)
  {
    $("#saveButton").prop("disabled", false);
    $("#resetButton").prop("disabled", false);
    $("#empName").focus()

  }else if(resultObj.status===200)
  {
    $("#empId").prop("disabled", true);
    fillData(resultObj)
    $("#changeButton").prop("disabled", false);
    $("#resetButton").prop("disabled", false);
    $("#empName").focus()
  }
};


