var db_conn_key=config.DB_conn_key;

$("#empId").focus();

function validateAndGetFormData() {
  var empIdVar = $("#empId").val();
  if (empIdVar === "") {
    alert("Employee ID required Value");
    $("#empId").focus();
    return "";
  }

  var empNameVar = $("#empName").val();
  if (empNameVar === "") {
    alert("Employee Name required Value");
    $("#empName").focus();
    return "";
  }

  var empEmailVar = $("#empEmail").val();
  if (empEmailVar === "") {
    alert("Employee Email required Value");
    $("#empEmail").focus();
    return "";
  }

  var jsonStrObj = {
    empId: empIdVar,
    empName: empNameVar,
    empEmail: empEmailVar,
  };

  return JSON.stringify(jsonStrObj);
}

// This method is used to create PUT JSON request.

function createPUTRequest(connToken, jsonObj, dbName, relName) {
  var putRequest ="{\n"
    +"\"token\": \""
    +connToken
    +"\","
    +"\"dbName\": \""
    +dbName
    +"\",\n" + "\"cmd\" : \"PUT\",\n"
    +"\"rel\" : \""
    +relName + "\","
    +"\"jsonStr\": \n"
    +jsonObj
    +"\n"
    +"}";
  return putRequest;
}

function executeCommand(reqString, dbBaseURL, apiEndPointURL) {
  var url = dbBaseURL + apiEndPointURL;
  var jsonObj;
  $.post(url, reqString, function (result) {
    jsonObj = JSON.parse(result);
  }).fail(function (result) {
    var dataJsonObj = result.responseText;
    jsonObj = JSON.parse(dataJsonObj);
  });

  return jsonObj;
}

function resetForm() {
  $("#empId").val("");
  $("#empName").val("");
  $("#empEmail").val("");
  $("#empId").focus("");
}

function saveEmployee() {
  var jsonStr = validateAndGetFormData();
  if (jsonStr === "") {
    return;
  }

  var putReqStr = createPUTRequest(
    db_conn_key,
    jsonStr,
    "SAMPLE",
    "EMP-REL"
  );
  alert(putReqStr);
  jQuery.ajaxSetup({ async: false });
  var resultObj = executeCommand(
    putReqStr,
    "http://api.login2explore.com:5577",
    "/api/iml"
  );
  alert(JSON.stringify(resultObj));
  jQuery.ajaxSetup({ async: true });

  resetForm();
}
