function $(arg) {
  var rate= 1149;
  var result="";
  if (arg == undefined) {
    result = rate;
  } else {
    result = arg*rate;
  }
document.write("환율은" + result + "입니다<br />");
}

/*function $(arg) {
  var rate= 1149;

  if (arg == undefined) {
    document.write(rate);

  } else {
    document.write(arg*rate);
  }

}*/
