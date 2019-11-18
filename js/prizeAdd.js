let token= $.cookie('token');
let agencyId= $.cookie('agencyId');//商户ID，登录的时候返回的memberId
let serverIp_ = localStorage.getItem("serverIp");

let urlParamInfo=urlParam();
let from = urlParamInfo.from;
if(from == 0){
    $('.delBtn').hide();
}
let configurationId = urlParamInfo.configurationId;

//返回
$(".back").click(function () {
    window.location.href="prizeSetting.html?configurationId="+configurationId;
});

//获取单个奖品设置信息
function findPrize() {
    if(from == 1){
        let goodId = urlParamInfo.goodId;
        $.ajax({
            headers: {
                "token": token
            },
            type: "get",
            url: serverIp_+"/agency/good/get/" + goodId,
            data: '',
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                console.log("获取单个奖品配置信息成功")
                console.log(data);
                $('#prizeName').val(data.data.name);
                $('#probability').val(data.data.probability);//中奖概率
                $('#price').val(data.data.price);          //奖品价值
                // $('#returnRate').text(data.data.returnRate+"%");//返奖比例
                // if(data.data.grounding == 0){
                //     $('#grounding').text("否");//是否上架
                // }else{
                //     $('#grounding').text("是");//是否上架
                // }
                $('#promote').val(data.data.promote);//是否促销模式
                $('#description').val(data.data.description);//奖品说明
                document.getElementById('img3').src = data.data.icon;//图片url
                $("#img3").css("display", "block");
            }
        });
    }
}
findPrize();

//上传奖品图片
function changepic() {
    $('#errorTip').text("上传中...");
    let f=document.getElementById('file').files[0];
    let imgSize = f.size;
    if(imgSize>1024*1024*10){
        return alert("上传图片不能超过10M");
    }else{
        let formdata = new FormData();
        if(f != ""){
            formdata.append('icon',f);
        }
        $.ajax({
            headers: {
                "token": token
            },
            type: "post",
            url: serverIp_+"/agency/good/upload",
            data: formdata,
            dataType: "json",
            cache: false,
            contentType: false,
            processData: false,
            success:function(data){
                $('#errorTip').text("上传成功！");
                console.log(data)
                document.getElementById('img3').src = data.data;
                $("#img3").css("display", "block");
            },
            error:function(){
                $('#errorTip').text("上传失败！");
            }
        });
    }
};

function savePrize() {
    let prizeName = $('#prizeName').val();
    let probability = $('#probability').val();//中奖概率
    let price = $('#price').val();          //奖品价值
    // let returnRate = $('#returnRate').val();//返奖比例
    // let grounding = $('#grounding').val();//是否上架
    let promote = $('#promote').val();//是否促销模式
    let description = $('#description').val();//奖品说明
    let icon = document.getElementById('img3').src;//图片url
    if(prizeName == ''){
        $('#errorTip').text("奖品名称不能为空");
        return;
    }
    if(probability > 100){
        $('#errorTip').text('请输入0~100的数字');
        $('#probability').val(0);
        return;
    }
    if(price == ''){
        $('#errorTip').text('奖品价值不能为空');
        return;
    }
    // if(returnRate < 0 && returnRate > 100){
    //     alert('请输入0~100的数字');
    //     return;
    // }
    if(description == ''){
        $('#errorTip').text('奖品说明不能为空');
        return;
    }
    if(icon == ''){
        $('#errorTip').text('请上传奖品图片');
        return;
    }
    if(from == 0){
        $.ajax({
            headers: {
                "token": token
            },
            type: "post",
            url: serverIp_+"/agency/good/add",
            data: JSON.stringify({
                "businessId":agencyId,
                "configurationId": configurationId,
                "name": prizeName,
                "probability": probability,
                "returnRate": 0,
                "price": price,
                "promote": promote,
                "icon": icon,
                "description": description
            }),
            contentType: 'application/json;charset=UTF-8',
            dataType: "json",
            success: function(data) {
                console.log("奖品保存成功")
                console.log(data);
                window.location.href = "prizeSetting.html?configurationId=" + configurationId;
            }
        });
    }else{
        $.ajax({
            headers: {
                "token": token
            },
            type: "post",
            url: serverIp_+"/agency/good/update",
            data: JSON.stringify({
                "businessId":agencyId,
                "configurationId": configurationId,
                "id": urlParamInfo.goodId,
                "name": prizeName,
                "probability": probability,
                "price": price,
                "promote": promote,
                "icon": icon,
                "description": description
            }),
            contentType: 'application/json;charset=UTF-8',
            dataType: "json",
            success: function(data){
                console.log("奖品修改成功")
                console.log(data);
                window.location.href="prizeSetting.html?configurationId="+configurationId;
            }
        });
    }
    return false;
};

//删除某个奖品
function delPrize() {
    let goodId = urlParamInfo.goodId;
    $.ajax({
        headers: {
            "token": token
        },
        type: "delete",
        url: serverIp_+"/agency/good/delete/"+goodId,
        data: '',
        contentType: 'application/json;charset=UTF-8',
        dataType: "json",
        success: function(data){
            console.log("奖品删除成功")
            console.log(data);
            window.location.href="prizeSetting.html?configurationId="+configurationId;
        }
    });
}