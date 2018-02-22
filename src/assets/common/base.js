/**
 * Created by kyn on 17/9/24.
 * 封装一些公用方法
 */
const Common = {
  ajax(options) {
  /**
   * 传入方式默认为对象
   * */
  options = options || {};
  /**
   * 默认为GET请求
   * */
  options.type = (options.type || "GET").toUpperCase();
  /**
   * 返回值类型默认为json
   * */
  options.dataType = options.dataType || 'json';
  /**
   * 默认为异步请求
   * */
  options.async = options.async || true;
  /**
   * 对需要传入的参数的处理
   * */
  var params = this.getParams(options.data);
  var xhr;
  /**
   * 创建一个 ajax请求
   * W3C标准和IE标准
   */
  if (window.XMLHttpRequest){
    /**
     * W3C标准
     * */
    xhr = new XMLHttpRequest();
  }else{
    /**
     * IE标准
     * @type {ActiveXObject}
     */
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4){
      var status = xhr.status;
      if (status >= 200 && status < 300 ){
        options.success && options.success(xhr.responseText,xhr.responseXML);
      }else{
        options.fail && options.fail(status);
      }
    }
  };
  if (options.type == 'GET'){
    xhr.open("GET",options.url + '?' + params ,options.async);
    xhr.send(null)
  }else if (options.type == 'POST'){
    /**
     *打开请求
     * */
    xhr.open('POST',options.url,options.async);
    /**
     * POST请求设置请求头
     * */
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    /**
     * 发送请求参数
     */
    xhr.send(params);
  }
},
  getParams(data) {
  var arr = [];
  for (var param in data){
    arr.push(encodeURIComponent(param) + '=' +encodeURIComponent(data[param]));
  }
  // console.log(arr);
  arr.push(('randomNumber=' + Math.random()).replace('.'));
  // console.log(arr);
  return arr.join('&');
},
/**
 * 判断是否登陆
 * @param cb
 */
checkLogin(successCb,errorCb){
  "use strict";
  this.ajax({
    url:"/api/wns/app/checklogin",
    dataType:"json",
    type:"post",
    async:false,
    success:function (response,xml) {
      var res = JSON.parse(response);
      if (res.code == 1){

      }else{

        setTimeout( function (){
          location.hash = "#login"
        },2000);
      }
    }
  })
},
/**
 * 写入cookie
 * @param key
 * @param val
 * @param day
 */
setCookies(key, val, day) {
  //获取当前日期
  var expiresDate = new Date();
  //设置生存期，一天后过期
  expiresDate.setDate(expiresDate.getDate() + (day ? day : 1));
  document.cookie = key + "=" + val + ";expires= " + expiresDate.toGMTString() + ";path=/";//标记已经访问了站点
},
/**
 * 获取cookies
 * @param key
 */
getCookies(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
},
/**
 * 删除cookies
 * @param key
 */
delCookies(key) {
  //获取当前日期
  var expiresDate = new Date();
  //设置生存期，一天后过期
  expiresDate.setDate(expiresDate.getDate() - 100);
  document.cookie = key + "=;expires= " + expiresDate.toGMTString() + ";path=/";//标记已经访问了站点
},
/**
 * 清空所有cookies
 */
delAllCookies() {
  //获取所有的cookies key
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--;) {
      this.delCookies(keys[i]);
    }
  }
},
/**
 * 是否是手机号
 * @param mobile
 * @returns {boolean}
 */
isMobile(mobile) {
  var reg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/;
  if (mobile == '' || !reg.test(mobile)) {
    return false;
  }
  return true;
},
/**
 * 是否是身份证号码
 * @param cardNo
 * @returns {boolean}
 */
isIdCardNo(cardNo)
{
  if(cardNo == '' || !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/i.test(cardNo)){
    return false;
  }
  return true;
},
/**
 * 当前时间生成
 */
curentTime()
{
  var now = new Date();

  var year = now.getFullYear();       //年
  var month = now.getMonth() + 1;     //月
  var day = now.getDate();            //日


  var clock = year + "-";

  if(month < 10)
    clock += "0";

  clock += month + "-";

  if(day < 10)
    clock += "0";

  clock += day;


  return(clock);
},
  /**
   * 公用处理数据---格式化金额  保留2位小数 千分位逗号
   * @param {type} number
   * @param {type} decimals
   * @param {type} thousands_sep
   * @param {type} dec_point
   * @param {type} roundtag  舍入参数，默认 "round" 四舍五入 ,"ceil" 向上取,"floor"向下取,
   * @returns {unresolved}
   */
  priceFormat: function(number, decimals, thousands_sep, dec_point, roundtag) {
    /*
     * 参数说明：
     * number：要格式化的数字
     * decimals：保留几位小数
     * dec_point：小数点符号
     * thousands_sep：千分位符号
     * roundtag:舍入参数，默认 "round" 四舍五入 ,"ceil" 向上取,"floor"向下取,
     * */
    //if(!number) return 0.00*1;
    if (number === null || number == 0){
      return "0.00"
    } else{
      if (decimals == undefined) {
        decimals = 2
      }
      number = (number + '').replace(/[^0-9+-Ee.]/g, '');
      roundtag = roundtag || "round"; //"ceil","floor","round"
      var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
          var s = n.toString();
          var sArr = s.split(".");
          var m = 0;
          try {
            m += sArr[1].length;
          } catch (e) {}

          if (prec > m) {
            return s;
            /*'' + Number(s.replace(".", "")) / Math.pow(10, m);*/
          } else {
            sArr[1] = Math[roundtag](Number(sArr[1]) / Math.pow(10, m - prec));
            while (sArr[1].toString().length < prec) {
              sArr[1] = '0' + sArr[1];
            }
            return sArr.join('.');
          }
        };
      s = (prec ? toFixedFix(n, prec) : '' + Math.floor(n)).split('.');
      var re = /(-?\d+)(\d{3})/;
      while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
      }

      if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
      }
      return s.join(dec);

    }

  }
};


export {              //export 导出的时候  import引入的时候 用对象的方式引入{}   export default 导出的时候是唯一的
  Common
}
