


$(function () {

    var loading = layer.load(1, {
        shade: false,
        time: 2*1000
    });
    url_get("/member/getUserDetail",{
        user_id:getParams('id'),
        token:getCookie('token'),
        u_token:getCookie('token'),
    },function (res) {
        layer.close(loading);

        if(res.data){

            // console.log(res);
            var info=res.data;

            $('.user_nick_name').text(info.nickname);
            $('.nickname').text(info.nickname);

            $('#sortdes').text(info.sortdes);

            var city_name='';

            if(info.address_prov.length>0){
                city_name=info.address_prov[0];

                $('#address_prov').text(city_name);
            }

            $('#gz_num').text(info.gz_num);
            //判断是否已关注
            if(info.is_guanzhu==1){
                $('#is_guanzhu').html('已关注('+info.gz_num+')');
                $('#is_guanzhu').attr('onclick','d_guanzhu()');

            }

            $('#add_type_name').text(city_name+' | '+info.typeName);

            $('#avatar').attr('src',imgpath+res.data.avatar);

        }

    });

    $('#share-1').share();

    // alert(getParams('id'));
    //更换链接
    $('#info_url').attr('href','xmk_grzl.html?id='+getParams('id'));
    $('#fb_xm_url').attr('href','xmk_fbxm.html?id='+getParams('id'));
    $('#cj_url').attr('href','xmk_cjbs.html?id='+getParams('id'));
    $('#sc_url').attr('href','xmk_tdsc.html?id='+getParams('id'));
    $('#gz_url').attr('href','xmk_gzdr.html?id='+getParams('id'));



});



function sixin(id=0,obj=0){

    var nickname=0;



    if(obj){
        nickname=$(obj).attr('data-name');
    }
    // console.log(nickname);

    if(parseInt(id)>0||nickname!=0){
        localStorage.setItem('sx_user_id',id);
       $('#user_nick_name').text(nickname)
    }else{
        localStorage.clear();
    }

    $("body").addClass("body_hidden");
    $(".tc").addClass("tc_active");

    $("#content").focus();

    // $(".content").emoji({
    // 	showTab: true,
    // 	animation: 'fade',
    // 	icons: [{
    // 		name: "贴吧表情",
    // 		path: "emoji/img/tieba/",
    // 		maxNum: 50,
    // 		file: ".jpg",
    // 		placeholder: ":{alias}:",
    // 		alias: {
    // 			1: "hehe",
    // 			2: "haha",
    // 			3: "tushe",
    // 			4: "a",
    // 			5: "ku",
    // 			6: "lu",
    // 			7: "kaixin",
    // 			8: "han",
    // 			9: "lei",
    // 			10: "heixian",
    // 			11: "bishi",
    // 			12: "bugaoxing",
    // 			13: "zhenbang",
    // 			14: "qian",
    // 			15: "yiwen",
    // 			16: "yinxian",
    // 			17: "tu",
    // 			18: "yi",
    // 			19: "weiqu",
    // 			20: "huaxin",
    // 			21: "hu",
    // 			22: "xiaonian",
    // 			23: "neng",
    // 			24: "taikaixin",
    // 			25: "huaji",
    // 			26: "mianqiang",
    // 			27: "kuanghan",
    // 			28: "guai",
    // 			29: "shuijiao",
    // 			30: "jinku",
    // 			31: "shengqi",
    // 			32: "jinya",
    // 			33: "pen",
    // 			34: "aixin",
    // 			35: "xinsui",
    // 			36: "meigui",
    // 			37: "liwu",
    // 			38: "caihong",
    // 			39: "xxyl",
    // 			40: "taiyang",
    // 			41: "qianbi",
    // 			42: "dnegpao",
    // 			43: "chabei",
    // 			44: "dangao",
    // 			45: "yinyue",
    // 			46: "haha2",
    // 			47: "shenli",
    // 			48: "damuzhi",
    // 			49: "ruo",
    // 			50: "OK"
    // 		},
    // 		title: {
    // 			1: "呵呵",
    // 			2: "哈哈",
    // 			3: "吐舌",
    // 			4: "啊",
    // 			5: "酷",
    // 			6: "怒",
    // 			7: "开心",
    // 			8: "汗",
    // 			9: "泪",
    // 			10: "黑线",
    // 			11: "鄙视",
    // 			12: "不高兴",
    // 			13: "真棒",
    // 			14: "钱",
    // 			15: "疑问",
    // 			16: "阴脸",
    // 			17: "吐",
    // 			18: "咦",
    // 			19: "委屈",
    // 			20: "花心",
    // 			21: "呼~",
    // 			22: "笑脸",
    // 			23: "冷",
    // 			24: "太开心",
    // 			25: "滑稽",
    // 			26: "勉强",
    // 			27: "狂汗",
    // 			28: "乖",
    // 			29: "睡觉",
    // 			30: "惊哭",
    // 			31: "生气",
    // 			32: "惊讶",
    // 			33: "喷",
    // 			34: "爱心",
    // 			35: "心碎",
    // 			36: "玫瑰",
    // 			37: "礼物",
    // 			38: "彩虹",
    // 			39: "星星月亮",
    // 			40: "太阳",
    // 			41: "钱币",
    // 			42: "灯泡",
    // 			43: "茶杯",
    // 			44: "蛋糕",
    // 			45: "音乐",
    // 			46: "haha",
    // 			47: "胜利",
    // 			48: "大拇指",
    // 			49: "弱",
    // 			50: "OK"
    // 		}
    // 	}, {
    // 		path: "emoji/img/qq/",
    // 		maxNum: 91,
    // 		excludeNums: [41, 45, 54],
    // 		file: ".gif",
    // 		placeholder: "#qq_{alias}#"
    // 	}]
    // });

}
$(".close_tc").click(function(){
    $("body").removeClass("body_hidden");
    $(".tc").removeClass("tc_active");
    $(".emoji_btn").hide();
});



function submit_sx() {

    var  content=$('#content').val();

    if(!content){
        layer.msg('请输入私信信息');
        return false;
    }

    var id=getParams('id');

    if(localStorage.getItem('sx_user_id')){
        id=localStorage.getItem('sx_user_id');
    }

    var data={
        user_id:id,
        token:getCookie('token'),
        content:content
    };



    url_post('/letter/pushLetter',data,function (res) {

        layer.msg(res.msg,{icon:1,time:2000});

        $("body").removeClass("body_hidden");
        $(".tc").removeClass("tc_active");
        $(".emoji_btn").hide();
// 			刷新当前页面.
    })

}


// 关注
function guanzhu(){
    // 获取 关注的用户uid

    var uid=getParams('id');

    url_post('/Judges/userFollow',{
        obj_user_id:uid,
        token:getCookie('token')
    },function (res) {
        layer.msg(res.msg,{icon:1,time:2000});
        window.location.reload();
// 			刷新当前页面.

    })
// 		alert(uid);
}

//	取消关注评委
function d_guanzhu() {

    var uid=getParams('id');

    url_post('/Judges/delFollow',{
        obj_user_id:uid,
        token:getCookie('token')
    },function (res) {
        layer.msg(res.msg,{icon:1,time:2000});
        window.location.reload();
// 			刷新当前页面.
    })
}