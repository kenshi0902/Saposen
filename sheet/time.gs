function onEdit(){
  var as = SpreadsheetApp.getActiveSpreadsheet();
  const rng = as.getActiveCell();
  const act = as.getActiveSheet().getSheetName();
  var flag = rng.getValue();
  const cb = [7, 9, 16, 18, 20, 22, 25, 27, 29, 31, 33]

  if(act == "セクション用"){
    for(i=0;i<99;i++){
      if(rng.getColumn() == cb[i] && rng.getRow() != 1){
        if(flag == true || flag != ""){
          rng.offset(0,1).setValue(new Date());
        }else if(flag == false || ("" != rng.offset(0,1).getValue())){
          rng.offset(0,1).setValue("")
        }
      }
    }
  }
}
