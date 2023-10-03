function onEdit(e){
  // variables
  var startRow = 2;
  var targetColumn = 1;
  var ws = "test_123";

  // get modified row and column
  var row = e.range.getRow();
  var col = e.range.getColumn();

  console.log(col)

  if(col === targetColumn && row > startRow && e.source.getActiveSheet().getName() === ws){

    var currentDate = formatDate(new Date());
    var email = e.user.getEmail()

    e.source.getActiveSheet().getRange(row,5).setValue(currentDate);
    if(e.source.getActiveSheet().getRange(row,4).getValue() == ""){
      e.source.getActiveSheet().getRange(row,4).setValue(currentDate);
    }
    e.source.getActiveSheet().getRange(row,6).setValue(email);
    // END IF check if date created exists
  }// END IF check column, row, sheet

}// END function addTimestamp


function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}