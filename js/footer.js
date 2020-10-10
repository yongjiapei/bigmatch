/*判断如果登录就修改内容*/
//修改右上角登录信心
if (getCookie('token')) {
    $('.hd2r div').remove();

    var list = '';
    if(getCookie('group') == 1){ //创业者的菜单
        list = '<a href="/user/user_wsgrxx.html">完善个人信息</a>\n' +
                '<a href="/user/user.html" >我的消息</a>\n' +
                '<a href="/user/user_wdgz.html" >我的关注</a>\n' +
                '<a href="/user/user_wdxm.html" >我的项目</a>\n' +
                '<a href="/user/user_wdbm.html" >我的报名</a>\n' +
                '<a href="/user/user_wdsc.html" >我的收藏</a>\n' +
                '<a href="/user/user_wdpl.html" >我的评论</a>\n' +
                '<a href="/user/user_zhaq.html" >账户安全</a>';
    }
    if(getCookie('group') == 2){ //评委的菜单
        $('.hd2r .hd2ra1').remove();//评委不用发布项目
        list = '<a href="/user/pingwei_home.html">完善个人信息</a>\n' +
            '<a href="/user/user.html" >我的消息</a>\n' +
            '<a href="/user/user_wdgz.html" >我的关注</a>\n' +
            '<a href="/user/pingwei_info2.html">我评审的项目</a>\n' +
            '<a href="/user/user_wdsc.html" >我的收藏</a>\n' +
            '<a href="/user/user_wdpl.html" >我的评论</a>\n' +
            '<a href="/user/user_zhaq.html" >账户安全</a>';
    }

    $('.hd2r').append('<div class="hd2rw posrelative">\n' +
        '\t\t\t\t\t\t<a href="/user/user.html" class="ydl disflex marl20">\n' +
        '\t\t\t\t\t\t\t<i><img class="disblock w100 h100" src="'+imgpath+ getCookie('avatar') +'"/></i>\n' +
        '\t\t\t\t\t\t\t<p class="flex1">'+ getCookie('nickname') +'</p>\n' +
        '\t\t\t\t\t\t</a>\n' +
        '\t\t\t\t\t\t<div class="hd2rhide">'+list+'<a class="active" onclick="logout()">退出</a>\n' +
        '\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t</div>');
}

/*修改个人中心的 用户信息*/
if(getCookie('nickname')){
    /*个人中心*/
    $('#userName').html(getCookie('realname'));
    $('#userAvatar').attr('src',imgpath+getCookie('avatar'));

    if(getCookie('group') == 1){
        $('#userInfo').html(getCookie('address_prov').split(',')[0]+'|'+getCookie('typeName'));
        /*修改菜单*/
        $('.usl2 a').each(function () {
            if($(this).html() == "我评审的项目"){
                $(this).remove();
            }
        })
    }

    /*评委没有发布项目*/
    if(getCookie('group') == 2){
        $('#userInfo').html(getCookie('address_prov').split(',')[0]+'|'+getCookie('typeName'));
        $('.xi2r1bot a').each(function () {
            if($(this).html() == '发布项目'){//评委不需要发布项目
                $(this).remove();
            }
            /*修改评委的个人信息*/
            if($(this).html() == '完善个人信息'){//评委不需要发布项目
                $(this).attr('href','pingwei_home.html');
            }
        })
        /*修改菜单*/
        $('.usl2 a').each(function () {
            if($(this).html() == "我的项目" || $(this).html() == "我的报名"){
                $(this).remove();
            }
        })
    }

    /*账号安全 个人信息*/
    $('#userNickname').html(getCookie('realname'));
    $('#userPhone').html(getCookie('phone'));
    if(getCookie('email')){
        $('#userEmail').html(getCookie('email'));
    }

}

/*头像上传*/
$("#imgfile").change(function(e) {
    /*回显*/
    var file = e.target.files[0];
    var imgSrc;
    if (!/image\/\w+/.test(file.type)) {
        layer.msg("只能上传图片！",{icon:2,time:2000});
        return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
        imgSrc = this.result;
        $("#imgfile_path").parent().show();
        $("#imgfile_path").attr("src", imgSrc);
    };

    /*上传*/
    var formData = new FormData();
    formData.append("imgfile",$('#imgfile')[0].files[0]);

    $.ajax({
        url:domain+'/upload/push',
        dataType:'json',
        type:'POST',
        data: formData,
        processData : false, // 使数据不做处理
        contentType : false, // 不要设置Content-Type请求头
        success: function(res){
            $('#avatar').val(res.data['url']);
            console.log(res['msg']);
        }
    });
});

/*判断是否登录 myhref  onclick="isLogin(this)"  */
function isLogin(obj) {
    if(!getCookie('token')){
         layer.msg('请登录!',{
             icon:1,time:2000,
             end:function () {
                 location.href = '/login.html';
             }
         });
    }else {
        location.href = $(obj).attr('myhref');
    }
}

//退出
function logout(){
    delCookie('token');
    delCookie('group');
    delCookie('nickname');
    delCookie('phone');
    delCookie('avatar');
    delCookie('typeName');
    delCookie('address_prov');
    delCookie('realname');
    delCookie('avatar');
    delCookie('email');
    location.href = '/index.html';
}

/*推荐课程*/
function tuijianClass() {
    url_get('/course/getThreeCourse',{},function (res) {
        $('#tuijianlist').html('')
        var list = res.data;
        for (var i in list){
            var tags = '';
            for	(var k in list[i]['tags'] ){
                tags += '<i class="biaoqian">' + list[i]['tags'][k] + '</i>';
            }
            $('#tuijianlist').append('<a href="/cypx_info.html?id='+list[i]['id']+'" class="fl m3ba m3bacp disblock hvimghover">\n' +
                '\t\t\t\t\t\t\t\t<div class="img"><div class="hvimg" style="background: url('+imgpath+list[i]['thumb']+');"></div></div>\n' +
                '\t\t\t\t\t\t\t\t<div class="txt">\n' +
                '\t\t\t\t\t\t\t\t\t<h3>'+list[i]['title']+'</h3>\n' +
                '\t\t\t\t\t\t\t\t\t<p>'+tags+'</p>\n' +
                '\t\t\t\t\t\t\t\t\t<div class="txtb clearfix">\n' +
                '\t\t\t\t\t\t\t\t\t\t<div class="fl">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t<span><img class="middle mr5" src="images/eye_03.png">'+list[i]['browse']+'</span>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t<span><img class="middle mr5" src="images/pl_03.png">'+list[i]['commentNum']+'</span>\n' +
                '\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t<i class="fr">'+getTime(list[i]['push_time'])+'</i>\n' +
                '\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t</a>')
        }
    })
}

/*评论*/
function getComment(){
    url_get('/News/newComment',{
        id:$('#new_id').val(),
        page:page,
        limit:pageSize
    },function (res) {
        // $('#pinglun').html('');
        var str = '';
        var list = [];
        if(res.data.length == 0){
            $('#addcomment').html('没有更多评论了')
            return;
        }
        for (var i in res.data){
            str = '';
            if(res.data[i]['recomment']){
                str = '<div class="plba2">';
                list = res.data[i]['recomment'];
                for (var k in list){
                    str += '<div class="disflex plba2a">\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="plbimg">\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<img src="'+imgpath+list[k]['avatar']+'">\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="plbtxt flex1">\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3>'+list[k]['realnameB']+'</h3>\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>回复<i>'+list[k]['realnameA']+'：</i>'+list[k]['content']+'</p>\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="plbtxtb clearfix">\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="fl">'+getTime(list[k]['create_time'])+'</span>\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="fr plbtxtbr">\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="hf_click" onclick="huifu('+res.data[i]['id']+','+list[k]['id']+')" data-name="@'+list[k]['realnameB']+'">回复</span>\n' +

                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span><img class="middle mr5" src="images/plico2_03.png">'+list[k]['praise']+'</span>\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                        '\t\t\t\t\t\t\t\t\t\t\t\t\t</div>';
                }
                str += '</div>';
            }

            $('#pinglun').append('<div class="plba">\n' +
                '\t\t\t\t\t\t\t\t\t\t<div class="plba1 disflex">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t<div class="plbimg">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t<img src="'+imgpath+res.data[i]['avatar']+'">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t<div class="plbtxt flex1">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t<h3>'+res.data[i]['realname']+'</h3>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t<p>'+res.data[i]['content']+'</p>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t<div class="plbtxtb clearfix">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="fl">'+getTime(res.data[i]['create_time'])+'</span>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="fr plbtxtbr">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="hf_click" onclick="huifu('+res.data[i]['id']+')" data-name="@'+res.data[i]['realname']+'">回复</span>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span><img class="middle mr5" src="images/plico1_03.png">'+res.data[i]['views']+'</span>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span><img class="middle mr5" src="images/plico2_03.png">'+res.data[i]['praise']+'</span>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +str+
                '\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t</div>');
        }

    })
}

/*加载更多*/
function addcomment() {
    page++;
    getComment()
}


/*发送私信*/
function sendSiXin(){
    // /letter/pushLetter
}


var areaData = [];
function getArea() {
    /*获取地区*/
    url_get('/address/getAddress','',function (res) {
        areaData = res.data;
        $('#prov_name').html('<option value="">请选择</option>');
        $('#city_name').html('<option value="">请选择</option>');
        $('#addressid').html('<option value="">请选择</option>');
        for(var i in areaData){
            $('#prov_name').append('<option value="'+areaData[i]['id']+'">'+areaData[i]['prov_name']+'</option>');
        }
    })
}


/*根据个人信息 设置地区默认值 */
function setArea(addressid){
    var isArea = setInterval(function () {

        if(areaData.length > 0){ //如果地区数据返回了  就结束
            /*先找到区县的id*/
            var city='',county='',cityArr='',countyArr='';
            for(var i in areaData){
                city = areaData[i]['content'];
                for (var c in city){
                    county = city[c]['content'];
                    for(var k in county){
                        /*找到区县的id  将这个区县的所有数据渲染出来*/
                        if(county[k]['county_code'] == addressid){
                            countyArr = county;
                            $('#addressid').html('<option value="">请选择</option>');
                            for(var kk in county){
                                if(county[kk]['county_code'] == addressid){
                                    $('#addressid').append('<option value="'+county[kk]['county_code']+'" selected>'+county[kk]['county_name']+'</option>');
                                }else{
                                    $('#addressid').append('<option value="'+county[kk]['county_code']+'">'+county[kk]['county_name']+'</option>');
                                }
                            }
                            break;
                        }
                    }
                    /*如果市里面有数据 将这个省下的所有数据渲染出来*/
                    if(countyArr){
                        cityArr = city;

                        $('#city_name').html('<option value="">请选择</option>');
                        for(var cc in city){
                            if(city[cc]['id'] == city[c]['id']){
                                $('#city_name').append('<option value="'+city[cc]['id']+'" selected>'+city[cc]['city_name']+'</option>');
                            }else{
                                $('#city_name').append('<option value="'+city[cc]['id']+'">'+city[cc]['city_name']+'</option>');
                            }
                        }

                        break;
                    }
                }
                /*如果市里面有数据 将这个省下的所有数据渲染出来*/
                if(cityArr){
                    $('#prov_name').html('<option value="">请选择</option>');
                    for(var ii in areaData){
                        if(areaData[ii]['id'] == areaData[i]['id']){
                            $('#prov_name').append('<option value="'+areaData[ii]['id']+'" selected>'+areaData[ii]['prov_name']+'</option>');
                        }else{
                            $('#prov_name').append('<option value="'+areaData[ii]['id']+'">'+areaData[ii]['prov_name']+'</option>');
                        }
                    }

                    break;
                }
            }
            /*如果为空 没有设置 显示请选择*/
            clearInterval(isArea)
        }
    },500)
}

/*省下拉切换事件*/
$('#prov_name').change(function () {
    $('#city_name').html('<option value="">请选择</option>');
    $('#addressid').html('<option value="">请选择</option>');

    var city = '',county='';
    for(var i in areaData){

        if(areaData[i]['id'] == $('#prov_name').val()){
            city = areaData[i]['content'];
            console.log(city)
            for (var c in city){
                $('#city_name').append('<option value="'+city[c]['id']+'">'+city[c]['city_name']+'</option>');
            }
        }
    }
})

/*市下拉切换事件*/
$('#city_name').change(function () {
    $('#addressid').html('<option value="">请选择</option>');
    var city = '',county='';
    for(var i in areaData){
        if(areaData[i]['id'] == $('#prov_name').val()){
            city = areaData[i]['content'];
            for (var c in city){
                if(city[c]['id'] == $('#city_name').val()){
                    county = city[c]['content'];
                    for (var k in county) {
                        $('#addressid').append('<option value="'+county[k]['county_code']+'">'+county[k]['county_name']+'</option>');
                    }
                }
            }
        }
    }
})

/*获取学历*/
function getEducation() {
    url_get('/member/getEducation','',function (res) {
        $('#education').html('<option value="">请选择</option>')
        for (var i in res.data){
            $('#education').append('<option value="'+res.data[i]['id']+'">'+res.data[i]['name']+'</option>');
        }
    })
}

/*公司规模*/
function getBusScale() {
    url_get('/setting/getBusScale','',function (res) {
        $('#BusScale').html('<option value="">请选择</option>')
        for (var i in res.data){
            $('#BusScale').append('<option value="'+res.data[i]['id']+'">'+res.data[i]['name']+'</option>');
        }
    })
}

/*团队规模*/
function getTeamScale() {
    url_get('/setting/getTeamScale','',function (res) {
        $('#TeamScale').html('<option value="">请选择</option>')
        for (var i in res.data){
            $('#TeamScale').append('<option value="'+res.data[i]['id']+'">'+res.data[i]['name']+'</option>');
        }
    })
}

/*融资需求*/
function getBusFinance() {
    url_get('/setting/getBusFinance','',function (res) {
        $('#BusFinance').html('<option value="">请选择</option>')
        for (var i in res.data){
            $('#BusFinance').append('<option value="'+res.data[i]['id']+'">'+res.data[i]['name']+'</option>');
        }
    })
}

/*身份类别*/
function getIdent() {
    url_get('/setting/getIdent','',function (res) {
        $('#Ident').html('')
        for (var i in res.data){
            $('#Ident').append('<label><input type="checkbox" name="qyxx" value="'+res.data[i]['id']+'" />'+res.data[i]['name']+'</label>');
        }
    })
}

// ide_category 	array 	身份类别 [1,2..] 多选代表id
// invest_stage 	array 	投资阶段 [1,2..] 多选代表id
// invest_address 	array 	投资地区 [1,2..] 多选代表id
// invest_field 	array 	投资关注领域 [1,2..] 多选代表id
// invest_quota 	array 	投资额度 [1,2..] 多选代表id
/*获取地区数据*/
function getProvList() {
    url_get('/address/getProvList','',function (res) {
        $('#ProvList').html('<option value="">请选择</option>')
        for (var i in res.data){
            $('#ProvList').append('<option value="'+res.data[i]['id']+'">'+res.data[i]['prov_name']+'</option>');
        }
    })
}

/*获取地区数据复选框*/
function getProvListChecked() {
    url_get('/address/getProvList','',function (res) {
        $('#ProvList').html('')
        for (var i in res.data){
            $('#ProvList').append('<label><input type="checkbox" value="'+res.data[i]['id']+'" />'+res.data[i]['name']+'</label>');
        }
    })
}

/*获取行业领域*/
function getIndustry() {
    url_get('/setting/getIndustry','',function (res) {
        $('#industry').html('<option value="">请选择</option>')
        for (var i in res.data){
            $('#industry').append('<option value="'+res.data[i]['id']+'">'+res.data[i]['name']+'</option>');
        }
    })
}
/*获取行业领域复选框*/
function getIndustryChecked() {
    url_get('/setting/getIndustry','',function (res) {
        $('#industry').html('')
        for (var i in res.data){
            $('#industry').append('<label><input type="checkbox" value="'+res.data[i]['id']+'" />'+res.data[i]['name']+'</label>');
        }
    })
}

/*获取项目阶段*/
function getProjectPhase() {
    url_get('/setting/getProjectPhase','',function (res) {
        $('#ProjectPhase').html('<option value="">请选择</option>')
        for (var i in res.data){
            $('#ProjectPhase').append('<option value="'+res.data[i]['id']+'">'+res.data[i]['name']+'</option>');
        }
    })
}

/*获取项目阶段复选框*/
function getProjectPhaseChecked() {
    url_get('/setting/getProjectPhase','',function (res) {
        $('#ProjectPhase').html('')
        for (var i in res.data){
            $('#ProjectPhase').append('<label><input type="checkbox" value="'+res.data[i]['id']+'" />'+res.data[i]['name']+'</label>');
        }
    })
}

/*投资额度*/
function getInvestment() {
    url_get('/setting/getInvestment','',function (res) {
        $('#Investment').html('<option value="">请选择</option>')
        for (var i in res.data){
            $('#Investment').append('<option value="'+res.data[i]['id']+'">'+res.data[i]['name']+'</option>');
        }
    })
}
/*投资额度复选框*/
function getInvestmentChecked() {
    url_get('/setting/getInvestment','',function (res) {
        $('#Investment').html('')
        for (var i in res.data){
            $('#Investment').append('<label><input type="checkbox" value="'+res.data[i]['id']+'" />'+res.data[i]['name']+'</label>');
        }
    })
}


/*投资币种*/
function getAmountType() {
    url_get('/setting/getAmountType','',function (res) {
        $('#AmountType').html('<option value="">请选择</option>')
        for (var i in res.data){
            $('#AmountType').append('<option value="'+res.data[i]['id']+'">'+res.data[i]['name']+'</option>');
        }
    })
}




/*项目库*/
/*获取地区数据 项目库*/
function getProvList_i(cname) {
    url_get('/address/getProvList','',function (res) {
        for (var i in res.data){
            $('#ProvList').before('<i cname="'+cname+'" class="'+cname+'" value="'+res.data[i]['id']+'">'+res.data[i]['prov_name']+'</i>');
        }
        addCheck()
    })
}
/*获取行业领域 项目库*/
function Industry(cname) {
    url_get('/Project/Industry','',function (res) {
        for (var i in res.data){
            $('#Industry').before('<i cname="'+cname+'" class="'+cname+'" value="'+res.data[i]['id']+'">'+res.data[i]['name']+'</i>');
        }
        addCheck()
    })
}

/*获取项目阶段 项目库*/
function projectPhase(cname) {
    url_get('/Project/projectPhase','',function (res) {
        for (var i in res.data){
            $('#projectPhase').before('<i cname="'+cname+'" class="'+cname+'" value="'+res.data[i]['id']+'">'+res.data[i]['name']+'</i>');
        }
        addCheck()
    })
}

/*获取融资需求 项目库*/
function financingNeeds(cname) {
    url_get('/Project/financingNeeds','',function (res) {
        for (var i in res.data){
            $('#financingNeeds').before('<i cname="'+cname+'" class="'+cname+'" value="'+res.data[i]['id']+'">'+res.data[i]['name']+'</i>');
        }
        addCheck()
    })
}


/*创业培训*/
/*获取培训方向*/
function trainDirection(cname) {
    url_get('/Training/trainDirection','',function (res) {
        for (var i in res.data){
            $('#Direction').append('<i cname="'+cname+'" class="'+cname+'" value="'+res.data[i]['id']+'">'+res.data[i]['name']+'</i>');
        }
        addCheck()
    })
}
/*获取培训方向*/
function trainingType(cname) {
    url_get('/Training/trainingType','',function (res) {
        for (var i in res.data){
            $('#trainingType').append('<i cname="'+cname+'" class="'+cname+'" value="'+res.data[i]['id']+'">'+res.data[i]['name']+'</i>');
        }
        addCheck()
    })
}
/*获取标签*/
function trainingTags(cname) {
    url_get('/Training/trainingTags','',function (res) {
        for (var i in res.data){
            $('#trainingTags').before('<i cname="'+cname+'" class="'+cname+'" value="'+res.data[i]['id']+'">'+res.data[i]['name']+'</i>');
        }
        addCheck()
    })
}

