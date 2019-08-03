//自定义cookie
function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  let path='/';
 // document.cookie = c_name + "=" +  encodeURIComponent(value)+';expires' +exdate.toGMTString()+';path='+path+';domain='+domain;  设置成功后不在登陆
 document.cookie = c_name + "=" +  encodeURIComponent(value)+';expires' + exdate.toGMTString()+';path='+path;
};
function setCookie_(c_name, value) {
  let path='/';
  document.cookie = c_name + "=" +  encodeURIComponent(value)+';path='+path;
};
function getCookie(cname){
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}
//删除cookies
function delCookie(name){
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval=getCookie(name);
  if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
export {
  setCookie,
  setCookie_,
  getCookie,
  delCookie
}