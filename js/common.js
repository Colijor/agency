//正式红点点互动公众号appId
var wxAppId = "wx6e84b8672a525584";
//此处函数方法不能写在$(function(){})里面
    function urlParam() {
        var str=location.search.slice(1);//获得当前页面URL参数
        console.log(str);
        var arr=str.split("&");//把一个字符串分割成字符串数组
        var urlParamInfo=new Object();
        for(var i=0;i < arr.length;i++){
            var num=arr[i].indexOf("=");
            if(num>0){
                var name=arr[i].substring(0,num);
                var value=arr[i].substr(num+1);
                urlParamInfo[name]=decodeURI(value);
            }
        };
        console.log(urlParamInfo);
        return urlParamInfo;
    }

    //置顶
var _scroll =function () {
    if ($(window).scrollTop() > 1) {
        $(".set_top").css("display","block");
    }else {
        $(".set_top").css("display","none");
    };
    $(".set_top").click(function () {
        console.log("jiangjie")
        $('html,body').stop().animate({"scrollTop":"0px"},1000);
        return false;
    })
};
$(document).ready($(window).scroll(_scroll))

