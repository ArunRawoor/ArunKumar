/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var empDBName = "EMP-DB";
var empRelationName = "EmpData";
var connToken = "90932848|-31949282068191668|90947870";

$("#empid").focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}
function getEmpIdAsJsonObj() {
    var empid = $("#empid").val();
    var jsonStr = {
        id: empid
    };
    return JSON.stringify(jsonStr);

}
function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("empname").val(record.name);
    $("empsal").val(record.salary);
    $("emphra").val(record.hra);
    $("empda").val(record.da);
    $("empdeduction").val(record.deduction);
}
function resetForm() {
    $("#empid").val("");
    $("#empname").val("");
    $("#empsal").val("");
    $("#emphra").val("");
    $("#empda").val("");
    $("#empdeduct").val("");
    $("#empid").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);

}

function validateAndGetFormData() {
    var empid, empname, empsal, hra, da, deduct;

    empid = $("#empid").val();
    empname = $("#empname").val();
    empsal = $("#empsal").val();
    hra = $("#hra").val();
    da = $("#da").val();
    deduct = $("#deduct").val();

    if (empid === "") {
        alert("Emp ID Required ");
        $("#empid").focus();
        return "";
    }
    if (empname === "") {
        alert("Employee Name is Required ");
        $("#empname").focus();
        return "";
    }

    if (empsal === "") {
        alert("Emp Salary is Required ");
        $("#empsal").focus();
        return "";
    }
    if (hra === "") {
        alert("HRA is Required ");
        $("#hra").focus();
        return "";
    }
    if (da === "") {
        alert("DA is Required ");
        $("#da").focus();
        return "";
    }
    if (deduct === "") {
        alert("Deduct is Required ");
        $("#deduct").focus();
        return "";
    }

    var jsonStrObj = {
        id: empid,
        name: empname,
        salary: empsal,
        hra: hra,
        da: da,
        deduction: deduct

    };
    return JSON.stringify(jsonStrObj);
}

function getEmp() {
    var empIdJsonObj = getEmpIdAsJsonObj();
    var getRequest = creatGET_BY_KEYRequest(connToken, empDBName, empRelationName, empIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);

    jQuery.ajaxSetup({async: true});

    if (resJsonObj.status === 400) {
        $("#save").prop("desabled", false);
        $("#reset").prop("desabled", false);
        $("#empname").focus();
    } else if (resJsonObj.status === 200) {
        $("#empid").prop("disabled", true);
        fillData(resJsonObj);

        $("#change").prop("desabled", false);
        $("#reset").prop("desabled", false);
        $("#empname").focus();

    }
}

function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return "";
    }
    var putRequest = creatPUTRequest(connToken, jsonStrObj, empDBName, empRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#empid").focus();
}


function changeData() {
    $("#change").prop("desabled", true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, empDBName, empRelationName, localStorage.getItem("recno"));

    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#empid").focus();
}




