import moment from "moment";
function formatDate(date) {
  if (date == null || date == "") return "-";
  var mt = new moment(date);
  return mt.format("DD/MM/yyyy");
}
function getToastNotification(status, message) {
  return {
    description: message,
    status: status,
    duration: 2000,
    isClosable: true,
    position: "top-right",
  };
}
function getAuthDetails() {
  var data = localStorage.getItem("auth");
  if (data == null) {
    return null;
  }
  const obj = JSON.parse(data);
  return obj;
}
export default {
  getToastNotification,
  formatDate,
  getAuthDetails,
};
