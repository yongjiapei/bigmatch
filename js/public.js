$(function () {
    $('.tab_head ul li').click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var index = $('.tab_head ul li').index($(this));
        $('.tab_content ul li.tab_content_li').eq(index).show().siblings().hide();
    });
    $('.tab_head1 ul li').hover(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var index = $('.tab_head1 ul li').index($(this));
        $('.tab_content1 ul li.tab_content_li').eq(index).show().siblings().hide();
    });
    //遍历bn
    $(".swiper-wrapper-bn .swiper-slide").each(function () {
        var bg = $(this).find(".bnimg").data("background");
        $(this).find(".bnimg").css({"background": 'url(' + bg + ')'})
    });

    /*
    var swiper = new Swiper('.swiper-container-bn', {
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
        navigation: {
            nextEl: '.swiper-button-next-bn',
            prevEl: '.swiper-button-prev-bn',
        },
        pagination: {
            el: '.swiper-pagination',
        },
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });
    */
/*
    var swiper = new Swiper('.swiper-container-m1', {
        loop: true,
        pagination: {
            el: '.swiper-pagination-m1',
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });
    */
    // var swiper = new Swiper('.swiper-container-m1', {
    //     observer: true,//修改swiper自己或子元素时，自动初始化swiper
    //     observeParents: true,//修改swiper的父元素时，自动初始化swiper
    //     pagination: {
    //         el: '.swiper-pagination-m1',
    //     },
    //     loop: true,
    //     autoplay: {
    //         delay: 2500,
    //         disableOnInteraction: false,
    //     },
    // });
    /*
    var swiper = new Swiper('.swiper-container-m5', {
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper

        navigation: {
            nextEl: '.swiper-button-next-m5',
            prevEl: '.swiper-button-prev-m5',
        },
        slidesPerView: 3,
        spaceBetween: 40,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });
    */
    /*
    var swiper = new Swiper('.swiper-container-cypx', {
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
        navigation: {
            nextEl: '.swiper-button-next-bn',
            prevEl: '.swiper-button-prev-bn',
        },
        pagination: {
            el: '.swiper-pagination-cypx',
            clickable: true,
        },
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });
*/
    //回复
    $(".hf_click").click(function () {
        var nm = $(this).data("name");
        $(".form-control").val(nm + ' ');
        $(".form-control").focus();
    })

    //选中
    $('.ucheck_a').on('click', function (e) {
        if ($(this).hasClass("ucheck_active")) {
            $(this).removeClass("ucheck_active");
        } else {
            $(this).addClass("ucheck_active");
        }
        e.stopPropagation();
    })
    $('.ucheck_all').on('click', function (e) {
        $(this).toggleClass("ucheck_active");
        if ($(".ucheck_a").hasClass("ucheck_active")) {
            $(".ucheck_a").removeClass("ucheck_active");
            $(".ucheck_a input[type='checkbox']").prop('checked', false);
        } else {
            $(".ucheck_a").addClass("ucheck_active");
            $(".ucheck_a input[type='checkbox']").prop('checked', true);
        }
        e.stopPropagation();
    })

})


/*全局变量  公共方法*/
var domain = 'https://cmpmatch.digilinx.net.cn/api';
var imgpath = 'https://cmpmatch-files.oss-cn-beijing.aliyuncs.com';
var pageSize = 6;
/*分页条数*/

//设置cookie
function setCookie(name, value) {
    if (!name || !value) return;
    var Days = 30;//默认30天
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toUTCString() + ";path=/";
}

//获取cookie
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return decodeURIComponent(arr[2]);
    return '';
}

//删除cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval) document.cookie = name + "=;expires=" + exp.toUTCString() + ";path=/";
}

function getParams(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return '';
}

// 注:时间戳转时间（ios手机NaN）
function getTime(ns) {
    if (!ns) return '';
    var date = new Date(parseInt(ns) * 1000);
    var year = date.getFullYear();
    var mon = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minu = date.getMinutes();
    var sec = date.getSeconds();
    // return year+'-'+mon+'-'+day+' '+hours+':'+minu+':'+sec;
    return year + '-' + mon + '-' + day;
}

/*获取当前时间*/
function getNowTime() {
    var date = new Date();
    var year = date.getFullYear();
    var mon = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minu = date.getMinutes();
    var sec = date.getSeconds();
    // return year+'-'+mon+'-'+day+' '+hours+':'+minu+':'+sec;
    return year + '-' + mon + '-' + day;
}

// 验证中文名称
function isChinaName(name) {
    var pattern = /^[\u4E00-\u9FA5]{1,6}$/;
    return pattern.test(name);
}

// 验证手机号
function isPhoneNo(phone) {
    var pattern = /^1[34578]\d{9}$/;
    return pattern.test(phone);
}

// 验证身份证
function isCardNo(card) {
    var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return pattern.test(card);
}

// 验证URL
function isURL(url) {
    var pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
    return pattern.test(url);
}

// 验证时间
function isDate(dd) {
    var pattern = /^(\d{4})-(\d{2})-(\d{2})$/;
    return pattern.test(dd);
}

function isemail(email) {
    var myreg = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    if (!myreg.test(email)) {
        //layer.msg('请输入正确邮箱地址');
        return false;
    } else {
        return true;
    }
}


// 验证座机
function isZuojiNo(phone) {
    var pattern = /^0?1[35]\d{9}$/;
    var pattern1 = /^(\d{2,4}[-_－—]?)?\d{3,8}([-_－—]?\d{3,8})?([-_－—]?\d{1,7})?$/;
    return (pattern.test(phone) || pattern1.test(phone));
}

//验证护照号码
function checkPassport(code) {
    var pattern = /^((1[45]\d{7})|(G\d{8})|(P\d{7})|(S\d{7,8}))?$/;
    return pattern.test(code);
}

//港澳通行证
function checkGAT(code) {//var re = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/;
    var pattern = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/;
    return pattern.test(code);
}

/*文件大小转换*/
function sizeTostr(size) {
    var data = "";
    if (size < 0.1 * 1024) { //如果小于0.1KB转化成B
        data = size.toFixed(2) + "B";
    } else if (size < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB
        data = (size / 1024).toFixed(2) + "KB";
    } else if (size < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB
        data = (size / (1024 * 1024)).toFixed(2) + "MB";
    } else { //其他转化成GB
        data = (size / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }
    var sizestr = data + "";
    var len = sizestr.indexOf("\.");
    var dec = sizestr.substr(len + 1, 2);
    if (dec == "00") {//当小数点后为00时 去掉小数部分
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
    }
    return sizestr;
}


/*获取评委的类型: 评委类型:
1 -> 创业导师
2 -> 投资人
3 -> 专家学者
0 -> 未选择*/
function getUserType(v) {
    switch (v) {
        case 0:
            return '未选择';
            break;
        case 1:
            return '创业导师';
            break;
        case 2:
            return '投资人';
            break;
        case 3:
            return '专家学者';
            break;
        default:
            return '';
            break;
    }
}


/*流量统计 	类型 1创业比赛 2赛事咨询 3培训课程 4评委专家 5项目库 6首页 7资料下载*/
function setbrowse(type = '') {
    url_post('/Setting/setbrowse', {type: type}, function (res) {
    })
}


function url_get(url, params, success) {

    $.ajax({
        type: "get",
        url: domain + url,
        data: params,
        // xhrFields: {
        //     withCredentials: true
        // },
        dataType: 'json',
        success: function (data) {
            // 0代表失败 1代表成功
            if (data.code == 1) {
                success(data);
            } else {
                console.log(data.msg);
                // alert(data.msg);
            }

            // if (data.error == '301') {
            //     setCookie('mycookie', "");
            //     window.parent.location.href = "/home/login.html";
            // }
            // if (data.error == '501') {
            //     alert('您没有权限进行此操作');
            //     return;
            // }
        },
        error: function (error) {
            console.log('网络出错:' + url);
        }
    });
}

function url_post(url, params, success) {

    $.ajax({
        type: "post",
        url: domain + url,
        data: params,
        // xhrFields: {
        //     withCredentials: true
        // },
        dataType: 'json',
        success: function (data) {
            if (data.code == 1) {
                success(data);
            } else {
                console.log(data.msg);
                // alert(data.msg);
            }
            // if (data.error == '301') {
            //     setCookie('mycookie', "");
            //     window.parent.location.href = "/home/login.html";
            // }
            // if (data.error == '501') {
            //
            //     alert('您没有权限进行此操作');
            //     return;
            // }
            // success(data);
        },
        error: function (error) {
            console.log('网络出错:' + url);
        }
    });
}

/**
 ** 分页函数
 ** 参数：page=页数,totalPage=总页数
 ** 返回值：html字符串
 **/
function LoadPage(page, totalPage, pagesize = 10, getdata) {
    var htmlPage = '<div class="layui-box layui-laypage layui-laypage-default" id="layui-laypage-1">';
    //上一页
    if (page == 1) {
        htmlPage += '<a class="pagea">上一页</a>';
    } else {
        htmlPage += '<a class="pagea" onclick="onPage(' + (parseInt(page) - 1) + ')">上一页</a>';
    }
    //首页
    if (page > 5) {
        htmlPage += '<a onclick="onPage(1)">1</a>';
    }
    //页数
    var start = page > 4 ? page - 4 : 1;
    var end = (totalPage - start) > 4 ? start + 4 : totalPage;
    for (var i = start; i <= end; i++) {
        if (i == page) {
            htmlPage += '<a class="active" onclick="onPage(' + i + ')" data-page="' + i + '">' + i + '</a>';
        } else {
            htmlPage += '<a onclick="onPage(' + i + ')" data-page="' + i + '">' + i + '</a>';
        }
    }
    //下一页
    if (page == totalPage) {
        htmlPage += '<a class="pagea">下一页</a>';
    } else {
        htmlPage += '<a class="pagea" onclick="onPage(' + (parseInt(page) + 1) + ')">下一页</a>'
    }

    htmlPage += '\t<div class="fl pgb">\n' +
        '\t\t\t\t\t\t\t\t\t<span class="marl10 fl">到</span>\n' +
        '\t\t\t\t\t\t\t\t\t<input class="fl" type="text" name="" id="page_num" value="">\n' +
        '\t\t\t\t\t\t\t\t\t<span class="fl">页</span>\n' +
        '\t\t\t\t\t\t\t\t\t<a class="pagea1" onclick="onPage($(\'#page_num\').val())">确定</a>\n' +
        '\t\t\t\t\t\t\t\t</div>';

    return htmlPage;
}


/**
 ** 分页函数
 ** 参数：page=页数,totalPage=总页数
 ** 返回值：html字符串
 *
 *
 // $("#page").html(LoadPage(data.page, data.total_page, data.pagesize));
 // if(parseInt(data.page) > 1){
//     $('#page .layui-laypage-prev').removeClass('layui-disabled')
// }
 **/
function LoadPage_bak(page, totalPage, pagesize = 10) {
    var htmlPage = '<div class="layui-box layui-laypage layui-laypage-default" id="layui-laypage-1">';
    //上一页
    if (page == 1) {
        htmlPage += '<a href="javascript:;" class="layui-laypage-prev layui-disabled" data-page="0">上一页</a>';
    } else {
        htmlPage += '<a href="javascript:;" class="layui-laypage-prev layui-disabled" data-page="' + page + '" onclick="onPage(' + (parseInt(page) - 1) + ')">上一页</a>';
    }
    //首页
    if (page > 5) {
        htmlPage += '<a href="javascript:void(0);" onclick="onPage(1)">1</a>';
    }
    //页数
    var start = page > 4 ? page - 4 : 1;
    var end = (totalPage - start) > 8 ? start + 8 : totalPage;
    for (var i = start; i <= end; i++) {
        if (i == page) {
            htmlPage += '<span class="layui-laypage-curr"><em class="layui-laypage-em"></em><em>' + i + '</em></span>';
        } else {
            htmlPage += '<a href="javascript:;" onclick="onPage(' + i + ')" data-page="' + i + '">' + i + '</a>';
        }
    }
    //下一页
    if (page == totalPage) {
        htmlPage += '<a href="javascript:;" class="layui-laypage-next layui-disabled" >下一页</a>';
    } else {
        htmlPage += '<a href="javascript:;" onclick="onPage(' + (parseInt(page) + 1) + ')" class="layui-laypage-next" >下一页</a>'
    }


    // htmlPage += '<span class="layui-laypage-limits"><select lay-ignore="" onchange="setpagesize(this)">';
    // for (let index = 1; index <= 5; index++) {
    //     let nums = index * 10;
    //     if (pagesize == nums) {
    //         htmlPage += '<option value="'+nums+'" selected>'+nums+' 条/页</option>';
    //     } else {
    //         htmlPage += '<option value="'+nums+'">'+nums+' 条/页</option>';
    //     }
    //
    // }
    //
    // htmlPage += '</select></span></div>';

    return htmlPage;
}
