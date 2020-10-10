/*
       <div class="bmfoot">
            <div class="bmba bmba_yyzz disflex">
                <span class="bmbal"><h3 class="bmfoot_tit">联系人信息</h3></span>
            </div>
        </div>
* */
var BM = {
    elem: 'bmform',//表单容器id
    match_id: '', //赛事id
    areaData: '',//地区的三维数组
    groupData: '',//分组的三维数组
    init: function (res) {
        this.match_id = match_id;
        if(res.elem){
            this.elem = res.elem;
        }
        this.render(res.data);
    },
    render: function (data) { /*初始化表单*/
        if (!data['setting'] && !data['filed'] ){
            layer.msg('空字段',{icon:2,time:2000});
            return;
        }

        $('#'+this.elem).html('');
        var _this = this;
        // 基础字段设置
        var setting = data['setting'];
        console.log("获取表单数据")
        console.log(data)
        var _html = '';
        for(var i in setting){
            switch (setting[i]['type']) {
                case "1":
                    _html += _this.setImage(setting[i]);
                    break;
                case "2":
                    _html += _this.setText(setting[i]);
                    break;
                case "3":
                    _html += _this.setOrder(setting[i]);
                    break;
                case "4":
                    _html += _this.setDate(setting[i]);
                    break;
                case "5":
                    _html += _this.setSelect(setting[i]);
                    break;
                case "6":
                    _html += _this.setTextArea(setting[i]);
                    break;
                case "7":
                    _html += _this.setFiles(setting[i]);
                    break;
                case "8":
                    _html += _this.setArea(setting[i]);
                    break;
                case "9":
                    _html += _this.setGroup(setting[i]);
                    break;
                case "10":
                    _html += _this.setLeader(setting[i]);
                    break;
                case 1:
                    _html += _this.setImage(setting[i]);
                    break;
                case 2:
                    _html += _this.setText(setting[i]);
                    break;
                case 3:
                    _html += _this.setOrder(setting[i]);
                    break;
                case 4:
                    _html += _this.setDate(setting[i]);
                    break;
                case 5:
                    _html += _this.setSelect(setting[i]);
                    break;
                case 6:
                    _html += _this.setTextArea(setting[i]);
                    break;
                case 7:
                    _html += _this.setFiles(setting[i]);
                    break;
                case 8:
                    _html += _this.setArea(setting[i]);
                    break;
                case 9:
                    _html += _this.setGroup(setting[i]);
                    break;
                case 10:
                    _html += _this.setLeader(setting[i]);
                    break;
            }
        }


        /*附加 自定义 字段*/
        if(match_id >= 0){
            _html += '<div class="bmfoot"></div>';
        }

        $('#'+this.elem).append(_html);

        _html = '';
        /*自定义字段*/
        if (data['filed']){
            var filed = data['filed'];
            for(var i in filed){
                switch (filed[i]['type']) {
                    case "1":
                        _html += _this.setImage(filed[i]);
                        break;
                    case "2":
                        _html += _this.setText(filed[i]);
                        break;
                    case "3":
                        _html += _this.setOrder(filed[i]);
                        break;
                    case "4":
                        _html += _this.setDate(filed[i]);
                        break;
                    case "5":
                        _html += _this.setSelect(filed[i]);
                        break;
                    case "6":
                        _html += _this.setTextArea(filed[i]);
                        break;
                    case "7":
                        _html += _this.setFiles(filed[i]);
                        break;
                    case "8":
                        _html += _this.setArea(filed[i]);
                        break;
                    case "9":
                        _html += _this.setGroup(filed[i]);
                        break;
                    case "10":
                        _html += _this.setLeader(filed[i]);
                        break;
                    case 1:
                        _html += _this.setImage(filed[i]);
                        break;
                    case 2:
                        _html += _this.setText(filed[i]);
                        break;
                    case 3:
                        _html += _this.setOrder(filed[i]);
                        break;
                    case 4:
                        _html += _this.setDate(filed[i]);
                        break;
                    case 5:
                        _html += _this.setSelect(filed[i]);
                        break;
                    case 6:
                        _html += _this.setTextArea(filed[i]);
                        break;
                    case 7:
                        _html += _this.setFiles(filed[i]);
                        break;
                    case 8:
                        _html += _this.setArea(filed[i]);
                        break;
                    case 9:
                        _html += _this.setGroup(filed[i]);
                        break;
                    case 10:
                        _html += _this.setLeader(filed[i]);
                        break;
                }
            }
        }

        $('#'+this.elem).find('.bmfoot').append(_html);

        /*添加元素事件*/
        this.addEvent();

    },
    /*添加元素事件*/
    addEvent:function(){
        var _this = this;
        _this.uploadFiles();
        _this.uploadFile();
        _this.getArea();

        /*省下拉切换事件*/
        $('#prov_name').change(function () {
            $('#city_name').html('<option value="">请选择</option>');
            $('#addressid').html('<option value="">请选择</option>');
            var areaData = _this.areaData;
            var city = '', county = '';
            for (var i in areaData) {

                if (areaData[i]['id'] == $('#prov_name').val()) {
                    city = areaData[i]['content'];
                    for (var c in city) {
                        $('#city_name').append('<option value="' + city[c]['id'] + '">' + city[c]['city_name'] + '</option>');
                    }
                }
            }
        })

        /*市下拉切换事件*/
        $('#city_name').change(function () {
            $('#addressid').html('<option value="">请选择</option>');
            var city = '', county = '';
            var areaData = _this.areaData;
            for (var i in areaData) {
                if (areaData[i]['id'] == $('#prov_name').val()) {
                    city = areaData[i]['content'];
                    for (var c in city) {
                        if (city[c]['id'] == $('#city_name').val()) {
                            county = city[c]['content'];
                            for (var k in county) {
                                $('#addressid').append('<option value="' + county[k]['county_code'] + '">' + county[k]['county_name'] + '</option>');
                            }
                        }
                    }

                }
            }
        })

        if(match_id >= 0){
            _this.getGroup();
        }

        /*一级分组下拉切换事件*/
        $('#group_one').change(function () {
            $('#group_two').html('<option value="">请选择</option>');
            $('#group_id').html('<option value="">请选择</option>');
            var groupData = _this.groupData;
            var group_two = '';
            for (var i in groupData) {
                if (groupData[i]['id'] == $('#group_one').val()) {
                    group_two = groupData[i]['children'];
                    for (var c in group_two) {
                        $('#group_two').append('<option value="' + group_two[c]['id'] + '">' + group_two[c]['name'] + '</option>');
                    }
                }
            }
        })

        /*二级分组下拉切换事件*/
        $('#group_two').change(function () {
            $('#group_id').html('<option value="">请选择</option>');
            var group_two = '', group_id = '';
            var groupData = _this.groupData;
            for (var i in groupData) {
                if (groupData[i]['id'] == $('#group_one').val()) {
                    group_two = groupData[i]['children'];
                    for (var c in group_two) {
                        if (group_two[c]['id'] == $('#group_two').val()) {
                            group_id = group_two[c]['children'];
                            for (var k in group_id) {
                                $('#group_id').append('<option value="' + group_id[c]['id'] + '">' + group_id[c]['county_name'] + '</option>');
                            }
                        }
                    }

                }
            }
        })

        /*重新加载表单*/
        $('#group_id').change(function () {
            group_id = $(this).val();
            getFormOne();
        })


        /*添加项目成员*/
        $('#leader').click(function () {

            var name = '负责人';
            if($('#leader').attr('tname') == 'member'){
                name = '成员';
            }

            if($('.leader').length > $('#leader').attr('num')){
                layer.msg(name+'最多添加'+$('#leader').attr('num')+'人',{icon:2,time:2000});
                return;
            }


            $('#leader').before('<div class="leader">\n' +
                '    <div class="bmba disflex">\n' +
                '        <span class="bmbal"><i class="colorred">*</i>'+name+'名称</span>\n' +
                '        <div class="bmbar bmbar_ipt flex1 marl20">\n' +
                '            <input placeholder="请输入" type="text" class="name" value=""/>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '    <div class="bmba bmba_yyzz disflex">\n' +
                '        <span class="bmbal"><i class="colorred">*</i>头像</span>\n' +
                '        <div class="bmbar flex1 marl20">\n' +
                '            <div class="bmbar_file disflex">\n' +
                '                <!--已上传状态-->\n' +
                '                <div class="bmbar_filea bmbar_filea_img posrelative">\n' +
                '                    <img src=""/>\n' +
                '                </div>\n' +
                '                <div class="bmbar_filea posrelative">\n' +
                '                    <input type="file" name="" class="thumb_file" value="" />\n' +
                '                    <input type="hidden" class="thumb" value="" />\n' +
                '                    <i><img src="images/add_03.png"/><p>点击上传</p></i>\n' +
                '                </div>\n' +
                '                <div class="bmbar_file_txt marl20">\n' +
                '                    <h3>温馨提示：</h3>\n' +
                '                    <p>1、建议上传图片尺寸宽度不超过1000像素；</p>\n' +
                '                    <p>2、支持格式jpg、png、jpge,大小不超过2M;</p>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '    <div class="bmba disflex">\n' +
                '        <span class="bmbal"><i class="colorred">*</i>联系方式</span>\n' +
                '        <div class="bmbar bmbar_ipt flex1 marl20">\n' +
                '            <input placeholder="请输入" type="text" class="phone" ruleVal="mobilephone" value=""/>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '    <div class="bmba disflex">\n' +
                '        <span class="bmbal"><i class="colorred">*</i>证件号类型</span>\n' +
                '        <div class="bmbar bmbar_ipt flex1 marl20">\n' +
                '            <select class="cardtype">\n' +
                '                <option value="1">身份证</option>\n' +
                '                <option value="2">护照</option>\n' +
                '                <option value="3">港澳台通行证</option>\n' +
                '            </select>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '    <div class="bmba disflex">\n' +
                '        <span class="bmbal"><i class="colorred">*</i>证件号</span>\n' +
                '        <div class="bmbar bmbar_ipt flex1 marl20">\n' +
                '            <input placeholder="请输入" type="text" class="cardid" value=""/>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '    <div class="bmba disflex">\n' +
                '        <span class="bmbal"><i class="colorred">*</i>职务</span>\n' +
                '        <div class="bmbar bmbar_ipt flex1 marl20">\n' +
                '            <input placeholder="请输入" type="text" class="position" value=""/>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>');
            _this.uploadFile();
        })

        /*切换主体 显示不同的字段*/
        $('#subject').change(function () {
            $('.bmba').hide();
            $('.leader .bmba').show();
            if($(this).val() == 1){// 1企业2团队
                $('.bmba').each(function () {
                    console.log($(this).find("[name='name']"))
                    if($(this).find("#subject").length > 0){$(this).show()}
                    if($(this).find("[name='name']").length  > 0){$(this).show()}
                    if($(this).find("[name='register_time']").length  > 0){$(this).show()}
                    if($(this).find("[name='legal_name']").length  > 0){$(this).show()}
                    if($(this).find("[name='cardid']").length  > 0){$(this).show()}
                    if($(this).find("[name='address']").length  > 0){$(this).show()}
                    if($(this).find("[name='work_content']").length  > 0){$(this).show()}
                    if($(this).find("[name='how_money']").length  > 0){$(this).show()}
                    if($(this).find("[name='email']").length > 0){$(this).show()}
                    if($(this).find("[name='web_url']").length > 0){$(this).show()}
                    if($(this).find("[name='finan']").length > 0){$(this).show()}
                    if($(this).find("[name='license']").length  > 0){$(this).show()}
                })
            }else if($(this).val() == 2){
                $('.bmba').each(function () {
                    if($(this).find("#subject").length > 0){$(this).show()}
                    if($(this).find("[name='name']").length > 0){$(this).show()}
                    if($(this).find("[name='team_type']").length > 0){$(this).show()}
                    if($(this).find("[name='register_time']").length > 0){$(this).show()}
                    if($(this).find("[name='description']").length > 0){$(this).show()}
                })
            }
        })
    },
    /*
        class  判断是否必填
        ruleVal 记录验证规则
        id 是提交的name值
    */
    setText: function (data) {    // 2 单行文本
        var _this = this;
        var arr = _this.isRequired(data['required']);

        var formEl = '<div class="bmba disflex">\n' +
            '\t\t\t\t\t\t<span class="bmbal">' + arr['required'] + data['cn_name'] + '</span>\n' +
            '\t\t\t\t\t\t<div class="bmbar bmbar_ipt flex1 marl20">\n' +
            '\t\t\t\t\t\t\t<input placeholder="' + data['cn_name'] + '" type="text" ruleVal="' + data['rule'] + '" class="' + arr['reqClass'] + '" name="'+ data['name'] +'" id="' + data['name'] + '" value="' + (data['val']?data['val']:'') + '" />\n' +
            '\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t</div>';
        return formEl;
    },
    setOrder: function (data) {    // 3 单选
        var _this = this;
        var arr = _this.isRequired(data['required']);
        var radio = '';
        for (var i in data['value']) { //默认值
            if (data['value'][i]['id'] == data['val']) {
                radio += '<label><input type="radio" name="'+ data['name'] +'" value="' + data['value'][i]['id'] + '" checked />' + data['value'][i]['name'] + '</label>';
            } else {
                radio += '<label><input type="radio" name="'+ data['name'] +'" value="' + data['value'][i]['id'] + '" />' + data['value'][i]['name'] + '</label>';
            }
        }

        var formEl = '<div class="bmba disflex">\n' +
            '\t\t\t\t\t\t<span class="bmbal">' + arr['required'] + data['cn_name'] + '</span>\n' +
            '\t\t\t\t\t\t<div class="bmbar bmbar_radio flex1 marl20 ' + arr['reqClass'] + '" ruleVal="' + data['rule'] + '" id="' + data['name'] + '">' + radio + '</div>\n' +
            '\t\t\t\t\t</div>';
        return formEl;
    },
    setDate: function (data) {    // 4 日期
        var _this = this;
        var arr = _this.isRequired(data['required']);

        var formEl = '<div class="bmba disflex">\n' +
            '\t\t\t\t\t\t<span class="bmbal">' + arr['required'] + data['cn_name'] + '</span>\n' +
            '\t\t\t\t\t\t<div class="bmbar bmbar_ipt bmbar_ipt_time flex1 marl20">\n' +
            '\t\t\t\t\t\t\t<input  type="date" class="sang_Calender ' + arr['reqClass'] + '" ruleVal="' + data['rule'] + '" id="' + data['name'] + '" name="'+ data['name'] +'" value="' + data['val'] + '" />\n' +
            '\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t</div>';
        return formEl;
    },
    setSelect: function (data) {    // 5 下拉
        var _this = this;
        var arr = _this.isRequired(data['required']);

        var options = '<option value="">请选择</option>';
        for (var i in data['value']) { //默认值
            if (data['value'][i]['id'] == data['val']) {
                options += '<option value="' + data['value'][i]['id'] + '" selected>' + data['value'][i]['name'] + '</option>';
            } else {
                options += '<option value="' + data['value'][i]['id'] + '">' + data['value'][i]['name'] + '</option>';
            }
        }

        var formEl = '<div class="bmba disflex">\n' +
            '\t\t\t\t\t\t<span class="bmbal">' + arr['required'] + data['cn_name'] + '</span>\n' +
            '\t\t\t\t\t\t<div class="bmbar bmbar_ipt flex1 marl20">\n' +
            '\t\t\t\t\t\t\t<select class="' + arr['reqClass'] + '" ruleVal="' + data['rule'] + '" id="' + data['name'] + '" name="'+ data['name'] +'">' + options + '</select>\n' +
            '\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t</div>';
        return formEl;
    },
    setTextArea: function (data) {    // 6 多行文本
        var _this = this;
        var arr = _this.isRequired(data['required']);

        var formEl = '<div class="bmba disflex">\n' +
            '\t\t\t\t\t\t<span class="bmbal">' + arr['required'] + data['cn_name'] + '</span>\n' +
            '\t\t\t\t\t\t<div class="bmbar bmbar_ipt flex1 marl20">\n' +
            '\t\t\t\t\t\t\t<textarea placeholder="请输入" class="' + arr['reqClass'] + '" ruleVal="' + data['rule'] + '" id="' + data['name'] + '" name="'+ data['name'] +'">' + data['val'] + '</textarea>\n' +
            '\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t</div>';
        return formEl;
    },
    setFiles: function (data) {    // 7 多文件上传
        var _this = this;
        var arr = _this.isRequired(data['required']);

        var accept="*/*";
        if(data['rule']){
            accept = data['rule'].split(':')[1];
        }

        var formEl = '<div class="bmba disflex">\n' +
            '\t\t\t\t\t\t<span class="bmbal">' + arr['required'] + data['cn_name'] + '</span>\n' +
            '\t\t\t\t\t\t<div class="bmbar flex1 marl20" id="file_' + data['name'] + '">\n' +
            '\t\t\t\t\t\t\t<div class="disflex flex_center bmbafile2">\n' +
            '\t\t\t\t\t\t\t\t<div class="bmbafile2a posrelative">\n' +
            '\t\t\t\t\t\t\t\t\t<input type="hidden" autocomplete="off" class="' + arr['reqClass'] + '" ruleVal="' + data['rule'] + '" name="'+ data['name'] +'" id="val_' + data['name'] + '">\n' +
            '\t\t\t\t\t\t\t\t\t<input type="file" name="" class="multiple_file" id="' + data['name'] + '" value="" accept="'+accept+'">\n' +
            '\t\t\t\t\t\t\t\t\t<p>+ '+data['cn_name']+'</p>\n' +
            '\t\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t\t\t<div class="bmbafile2_txt flex1">\n' +
            '\t\t\t\t\t\t\t\t\t文件要求为JPG、JPEG、BMP、PNG、PDF、DOC/DOCX、PPT、PPTX,ZIP,RAR格式,最多不能超过4个文件,大小不超过50M，其他附件可以是专利、著作权、荣誉资质等\n' +
            '\t\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t</div>';

        return formEl;
    },
    setImage: function (data) {    // 1 单图片上传
        var _this = this;
        var arr = _this.isRequired(data['required']);

        var formEl = '<div class="bmba disflex">\n' +
            '\t\t\t\t\t\t<span class="bmbal">' + arr['required'] + data['cn_name'] + '</span>\n' +
            '\t\t\t\t\t\t<div class="bmbar flex1 marl20" >\n' +
            '\t\t\t\t\t\t\t<div class="bmbar_file disflex">\n' +
            '\t\t\t\t\t\t\t\t<!--已上传状态-->\n' +
            '\t\t\t\t\t\t\t\t<div class="bmbar_filea bmbar_filea_img posrelative" style="display: none">\n' +
            '\t\t\t\t\t\t\t\t\t<img src="' + data['val'] + '"/>\n' +
            '\t\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t\t\t<div class="bmbar_filea posrelative">\n' +
            '\t\t\t\t\t\t\t\t\t<input type="file" name="" class="thumb_file" value="" />\n' +
            '\t\t\t\t\t\t\t\t\t<input type="hidden" name="'+ data['name'] +'" id="' + data['name'] + '" class="' + arr['reqClass'] + '" ruleVal="' + data['rule'] + '"   value="' + data['val'] + '" />\n' +
            '\t\t\t\t\t\t\t\t\t<i><img src="images/add_03.png"/><p>点击上传</p></i>\n' +
            '\t\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t\t\t<div class="bmbar_file_txt marl20">\n' +
            '\t\t\t\t\t\t\t\t\t<h3>温馨提示：</h3>\n' +
            '\t\t\t\t\t\t\t\t\t<p>1、建议上传图片尺寸为 200* 200像素或等比例图片;</p>\n' +
            '\t\t\t\t\t\t\t\t\t<p>2、支持格式jpg、png、jpge,大小不超过2M;</p>\n' +
            '\t\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t</div>';


        return formEl;
    },
    setArea: function (data) {    // 8 地区三级菜单
        var _this = this;
        var arr = _this.isRequired(data['required']);

        var formEl = '<div class="bmba disflex">\n' +
            '\t\t\t\t\t\t<span class="bmbal">' + arr['required'] + data['cn_name'] + '</span>\n' +
            '\t\t\t\t\t\t<div class="bmbar bmbar_ipt flex1 marl20 disflex">\n' +
            '\t\t\t\t\t\t\t<div class="bmbar_ipt_three">\n' +
            '\t\t\t\t\t\t\t\t<select id="prov_name"></select>\n' +
            '\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t\t<div class="bmbar_ipt_three marl20">\n' +
            '\t\t\t\t\t\t\t\t<select id="city_name"></select>\n' +
            '\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t\t<div class="bmbar_ipt_three marl20">\n' +
            '\t\t\t\t\t\t\t\t<select id="addressid" name="' + data['name'] + '" class="' + arr['reqClass'] + '" ruleVal="' + data['rule'] + '"></select>\n' +
            '\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t</div>';

        return formEl;



    },
    setGroup: function (data) {    // 9 分组三级菜单
        var _this = this;
        var arr = _this.isRequired(data['required']);

        var formEl = '<div class="bmba disflex">\n' +
            '\t\t\t\t\t\t<span class="bmbal">' + arr['required'] + data['cn_name'] + '</span>\n' +
            '\t\t\t\t\t\t<div class="bmbar bmbar_ipt flex1 marl20 disflex">\n' +
            '\t\t\t\t\t\t\t<div class="bmbar_ipt_three">\n' +
            '\t\t\t\t\t\t\t\t<select id="group_one" ></select>\n' +
            '\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t\t<div class="bmbar_ipt_three marl20">\n' +
            '\t\t\t\t\t\t\t\t<select id="group_two" ></select>\n' +
            '\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t\t<div class="bmbar_ipt_three marl20">\n' +
            '\t\t\t\t\t\t\t\t<select id="group_id" name="' + data['name'] + '" class="' + arr['reqClass'] + '" ruleVal="' + data['rule'] + '"></select>\n' +
            '\t\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t\t</div>\n' +
            '\t\t\t\t\t</div>';

        return formEl;


    },
    setLeader: function (data) {    // 10 项目负责人
        var _this = this;
        // var arr = _this.isRequired(data['required']);
        var num = data['value']
        var name = '负责人名称',btnName = '添加项目负责人';
        if(data['name'] == 'member'){
            name = '成员名称',btnName = '添加成员';
        }

        var formEl = '<div class="leader">\n' +
            '    <div class="bmba disflex">\n' +
            '        <span class="bmbal"><i class="colorred">*</i>'+name+'</span>\n' +
            '        <div class="bmbar bmbar_ipt flex1 marl20">\n' +
            '            <input placeholder="请输入" type="text" class="name" value=""/>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <div class="bmba bmba_yyzz disflex">\n' +
            '        <span class="bmbal"><i class="colorred">*</i>头像</span>\n' +
            '        <div class="bmbar flex1 marl20">\n' +
            '            <div class="bmbar_file disflex">\n' +
            '                <!--已上传状态-->\n' +
            '                <div class="bmbar_filea bmbar_filea_img posrelative" style="display: none">\n' +
            '                    <img src=""/>\n' +
            '                </div>\n' +
            '                <div class="bmbar_filea posrelative">\n' +
            '                    <input type="file" name="" class="thumb_file" value="" />\n' +
            '                    <input type="hidden" class="thumb" value="" />\n' +
            '                    <i><img src="images/add_03.png"/><p>点击上传</p></i>\n' +
            '                </div>\n' +
            '                <div class="bmbar_file_txt marl20">\n' +
            '                    <h3>温馨提示：</h3>\n' +
            '                    <p>1、建议上传图片尺寸宽度不超过1000像素；</p>\n' +
            '                    <p>2、支持格式jpg、png、jpge,大小不超过2M;</p>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <div class="bmba disflex">\n' +
            '        <span class="bmbal"><i class="colorred">*</i>联系方式</span>\n' +
            '        <div class="bmbar bmbar_ipt flex1 marl20">\n' +
            '            <input placeholder="请输入" type="text" class="phone" value=""/>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <div class="bmba disflex">\n' +
            '        <span class="bmbal"><i class="colorred">*</i>证件号类型</span>\n' +
            '        <div class="bmbar bmbar_ipt flex1 marl20">\n' +
            '            <select class="cardtype">\n' +
            '                <option value="1">身份证</option>\n' +
            '                <option value="2">护照</option>\n' +
            '                <option value="3">港澳台通行证</option>\n' +
            '            </select>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <div class="bmba disflex">\n' +
            '        <span class="bmbal"><i class="colorred">*</i>证件号</span>\n' +
            '        <div class="bmbar bmbar_ipt flex1 marl20">\n' +
            '            <input placeholder="请输入" type="text" class="cardid" value=""/>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <div class="bmba disflex">\n' +
            '        <span class="bmbal"><i class="colorred">*</i>职务</span>\n' +
            '        <div class="bmbar bmbar_ipt flex1 marl20">\n' +
            '            <input placeholder="请输入" type="text" class="position" value=""/>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>\n' +
            '<div class="mt_30 textcenter" id="leader" num = '+num+' tname="'+data['name']+'">\n' +
            '    <a class="addlxr"><img class="middle mr5" src="images/add_03.png"/>'+btnName+'</a>\n' +
            '</div>';
        return formEl;
    },
    /*是否必填*/
    isRequired: function (data) {
        var required = '', reqClass = '';
        if (data == 1) { //是否必填
            reqClass = 'required';
            required = '<i class="colorred">*</i>';
        }
        return {required: required, reqClass: reqClass};
    },

    /*获取分组三级*/
    getGroup: function () {//获取分组
        var _this = this;
        url_get('/matchform/match_form_group', {
            match_id: _this.match_id,
            token: getCookie('token')
        }, function (res) {
            var groupData = res.data;
            $('#group_one').html('<option value="">请选择</option>');
            $('#group_two').html('<option value="">请选择</option>');
            $('#group_id').html('<option value="">请选择</option>');
            for (var i in groupData) {
                $('#group_one').append('<option value="' + groupData[i]['id'] + '">' + groupData[i]['name'] + '</option>');
            }
            _this.groupData = groupData
        })
    },

    /*获取地区三级*/
    getArea: function () {//获取地区
        var _this = this;
        /*获取地区*/
        url_get('/address/getAddress', '', function (res) {
            var areaData = res.data;
            $('#prov_name').html('<option value="">请选择</option>');
            $('#city_name').html('<option value="">请选择</option>');
            $('#addressid').html('<option value="">请选择</option>');
            for (var i in areaData) {
                $('#prov_name').append('<option value="' + areaData[i]['id'] + '">' + areaData[i]['prov_name'] + '</option>');
            }
            _this.areaData = areaData;
        })
    },
    /*设置地区默认值 */
    setDefArea: function (addressid) {
        if (!addressid) return;
        var areaData = this.areaData;
        var isArea = setInterval(function () {
            if (areaData) { //如果地区数据返回了  就结束
                /*先找到区县的id*/
                var city = '', county = '', cityArr = '', countyArr = '';
                for (var i in areaData) {
                    city = areaData[i]['content'];
                    for (var c in city) {
                        county = city[c]['content'];
                        for (var k in county) {
                            /*找到区县的id  将这个区县的所有数据渲染出来*/
                            if (county[k]['id'] == addressid) {
                                countyArr = county;
                                $('#addressid').html('<option value="">请选择</option>');
                                for (var kk in county) {
                                    if (county[kk]['id'] == addressid) {
                                        $('#addressid').append('<option value="' + county[kk]['id'] + '" selected>' + county[kk]['county_name'] + '</option>');
                                    } else {
                                        $('#addressid').append('<option value="' + county[kk]['id'] + '">' + county[kk]['county_name'] + '</option>');
                                    }
                                }
                                break;
                            }
                        }
                        /*如果市里面有数据 将这个省下的所有数据渲染出来*/
                        if (countyArr) {
                            cityArr = city;

                            $('#city_name').html('<option value="">请选择</option>');
                            for (var cc in city) {
                                if (city[cc]['id'] == city[c]['id']) {
                                    $('#city_name').append('<option value="' + city[cc]['id'] + '" selected>' + city[cc]['county_name'] + '</option>');
                                } else {
                                    $('#city_name').append('<option value="' + city[cc]['id'] + '">' + city[cc]['county_name'] + '</option>');
                                }
                            }

                            break;
                        }
                    }
                    /*如果市里面有数据 将这个省下的所有数据渲染出来*/
                    if (cityArr) {
                        $('#prov_name').html('<option value="">请选择</option>');
                        for (var ii in areaData) {
                            if (areaData[ii]['id'] == areaData[i]['id']) {
                                $('#prov_name').append('<option value="' + areaData[ii]['id'] + '" selected>' + areaData[ii]['county_name'] + '</option>');
                            } else {
                                $('#prov_name').append('<option value="' + areaData[ii]['id'] + '">' + areaData[ii]['county_name'] + '</option>');
                            }
                        }

                        break;
                    }
                }
                /*如果为空 没有设置 显示请选择*/
                clearInterval(isArea)
            }
        }, 500)
    },

    uploadFile: function () {  /*添加上传事件*/
        /*上传成员照片*/
        $(".thumb_file").change(function (e) {
            var that = this;
            /*回显*/
            var file = e.target.files[0];
            var imgSrc;
            if (!/image\/\w+/.test(file.type)) {
                layer.msg("只能上传图片！",{icon:2,time:2000});
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                imgSrc = this.result;
                $(that).parent().prev().show();
                $(that).parent().prev().find('img').attr("src", imgSrc);
            };

            /*上传*/
            var formData = new FormData();
            formData.append("imgfile", $(that)[0].files[0]);

            $.ajax({
                url: domain + '/upload/push',
                dataType: 'json',
                type: 'POST',
                data: formData,
                processData: false, // 使数据不做处理
                contentType: false, // 不要设置Content-Type请求头
                success: function (res) {
                    $(that).next().val(res.data['url']);
                    console.log(res['msg']);
                }
            });
        });
    },

    /*附件上传*/
    uploadFiles: function () {
        /*头像上传*/
        $(".multiple_file").change(function (e) {
            /*回显*/
            var id = $(this).attr('id');
            var file = e.target.files[0];
            var name = file.name,
                size = sizeTostr(file.size),
                time = getNowTime();

            /*回显附件信息*/
            $("#file_" + id).append('\t\t\t\t\t\t\t<div class="bmbafile_a mt_25 disflex flex_center">\n' +
                '\t\t\t\t\t\t\t\t<div class="bmbafile_a_l disflex flex1">\n' +
                '\t\t\t\t\t\t\t\t\t<i><img src="../images/xmjhs_03.png"/></i>\n' +
                '\t\t\t\t\t\t\t\t\t<div class="bmbafile_a_l_txt flex1">\n' +
                '\t\t\t\t\t\t\t\t\t\t<p>' + name + '</p>\n' +
                '\t\t\t\t\t\t\t\t\t\t<span>大小：' + size + '</span>\n' +
                '\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t<div class="bmbafile_a_r disflex">\n' +
                '\t\t\t\t\t\t\t\t\t<span>上传时间：' + time + '</span>\n' +
                '\t\t\t\t\t\t\t\t\t<a onclick="delThis(this,\'' + id + '\',\'' + name + '\')" style="cursor: pointer">删除</a>\n' +
                '\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t</div>');


            /*上传*/
            var formData = new FormData();
            formData.append("imgfile", file);

            $.ajax({
                url: domain + '/upload/push',
                dataType: 'json',
                type: 'POST',
                data: formData,
                processData: false, // 使数据不做处理
                contentType: false, // 不要设置Content-Type请求头
                success: function (res) {
                    if ($('#val_' + id).val() == '') {
                        $('#val_' + id).val(name + ';' + res.data['url']);
                        // $('#val_' + id).val(res.data['url']);
                    } else {
                        $('#val_' + id).val($('#val_' + id).val() + "^" + name + ':' + res.data['url']);
                        // $('#val_' + id).val($('#val_' + id).val() + ","  + res.data['url']);
                    }
                    console.log(res['msg']);
                }
            });
        });
    },

};

/*删除附件*/
function delThis(obj, id, name) {
    var path = $('#val_' + id).val(),
        arr = path.split('^');
    for (var i in arr) { //删除表单里面的数据
        if (arr[i].indexOf(name) > -1) {
            arr.splice(i, 1);
        }
    }
    $('#val_' + id).val(arr.join('^'));
    $(obj).parent().parent().remove();
}


/*暂存数据 获取字段  验证并返回 */
function saveData() {
    var setting = [], data = {}, flag = 1;
    if (fileds['setting']) {
        setting = fileds['setting']
    }
    if (fileds['filed']) {
        setting = setting.concat(fileds['filed']);
    }

    var typeid = $('#subject').val();
    for (var i in setting) {
        console.log(setting[i])
        if(typeid == 1){ // 1企业2团队
            /*项目主体是企业的话   如果是团队的字段就跳过*/
            subjectNames = ["team_type","description"];
            if(subjectNames.indexOf(setting[i]['name']) > -1){
                continue;
            }
        }else if(typeid == 2){
            /*项目主体是团队的话   如果是企业的字段就跳过*/
            subjectNames = ["legal_name","cardid","address","work_content","phase","how_money","email","web_url","finan","license"];
            if(subjectNames.indexOf(setting[i]['name']) > -1){
                continue;
            }
        }

        /*项目负责人*/
        if (setting[i]['type'] == 10) {
            data['leader'] = [];
            data['member'] = [];
            $('.leader').each(function () {
                var nn='负责人';
                if(setting[i]['name'] == 'member'){
                    nn = '成员';
                }
                var name = $(this).find('.name').val(),
                    phone = $(this).find('.phone').val(),
                    thumb = $(this).find('.thumb').val(),
                    cardtype = $(this).find('.cardtype').val(),
                    cardid = $(this).find('.cardid').val(),
                    position = $(this).find('.position').val();
                if (!name) {
                    layer.msg('项目'+nn+':请输入'+nn+'名称',{icon:2,time:2000});
                    flag = 2;
                    return;
                }
                if (!phone) {
                    layer.msg('项目'+nn+':请输入正确的联系方式',{icon:2,time:2000});
                    flag = 2;
                    return;
                }
                if (!thumb) {
                    layer.msg('项目'+nn+':请上传头像',{icon:2,time:2000});
                    flag = 2;return;
                }
                if (!cardtype) {
                    layer.msg('项目'+nn+':请选择证件号类型',{icon:2,time:2000});
                    flag = 2;return;
                }
                if (!cardid) {
                    layer.msg('项目'+nn+':请输入证件号',{icon:2,time:2000});
                    flag = 2;return;
                }
                if (!position) {
                    layer.msg('项目'+nn+':请输入职务',{icon:2,time:2000});
                    flag = 2;return;
                }

                if (!isZuojiNo(phone) || !isPhoneNo(phone)) {
                    layer.msg('项目'+nn+':请输入正确的联系方式',{icon:2,time:2000});
                    flag = 2;
                }
                if (cardtype == 1) {
                    if (!isCardNo(cardid)) {
                        layer.msg('项目'+nn+':请输入正确的证件号码',{icon:2,time:2000});
                        flag = 2;return;
                    }
                } else if (cardtype == 2) {
                    if (!checkPassport(cardid)) {
                        layer.msg('项目'+nn+':请输入正确的证件号码',{icon:2,time:2000});
                        flag = 2;return;
                    }
                } else if (cardtype == 3) {
                    if (!checkGAT(cardid)) {
                        layer.msg('项目'+nn+':请输入正确的证件号码',{icon:2,time:2000});
                        flag = 2;return;
                    }
                }
                /*成员信息*/
                if(setting[i]['name'] == 'member'){
                    delete data.leader;
                    data['member'].push({
                        name: name,
                        phone: phone,
                        thumb: thumb,
                        cardtype: cardtype,
                        cardid: cardid,
                        position: position
                    })
                }else{/*项目负责人的数据*/
                    data['leader'].push({
                        name: name,
                        phone: phone,
                        thumb: thumb,
                        cardtype: cardtype,
                        cardid: cardid,
                        position: position
                    })
                }
            })
            continue;
        }
        /*地区单独获取 地区是三级的  但是限制不需要必选到最后一级*/
        if (setting[i]['type'] == 8) {
            if ($('#addressid').val() != '') {
                data[setting[i]['name']] = $('#addressid').val();
            } else if ($('#city_name').val() != '') {
                data[setting[i]['name']] = $('#city_name').val();
            } else {
                data[setting[i]['name']] = $('#prov_name').val();
            }
            if (!data[setting[i]['name']]) {
                layer.msg('请选择地区',{icon:2,time:2000});
                return;
            }
            continue;
        }
        /*分组三级   是如果有子集就必须选子集  如果没子集  就不用选子集*/
        if (setting[i]['type'] == 9) {
            if ($('#group_id').val() != '') {
                data[setting[i]['name']] = $('#group_id').val();
            } else if ($('#group_two').val() != '') {
                data[setting[i]['name']] = $('#group_two').val();
            } else {
                data[setting[i]['name']] = $('#group_one').val();
            }
            if ($('#group_id option').length > 1 && $('#group_id').val() == '') {
                layer.msg('请选择完整的分组',{icon:2,time:2000});
                return;
            }
            if ($('#group_two option').length > 1 && $('#group_two').val() == '') {
                layer.msg('请选择完整的分组',{icon:2,time:2000});
                return;
            }

            if (!data[setting[i]['name']]) {
                layer.msg('请选择分组',{icon:2,time:2000});
                return;
            }
            continue;
        }

        /* 多文件上传 搞成json [{"path":"https:\/\/cmpmatchapi.digilinx.net.cn\/uploads\/20200902\/2c413336d1567635ea4cb721408a5421.doc","name":"\u6d4f\u89c8\u5668\u8bbe\u7f6e\u8bf4\u660e.doc"}]*/
        if (setting[i]['type'] == 7) {
            // data[setting[i]['name']] = [];
            data[setting[i]['name']] = {};
            var filedVal = $('[name="' + setting[i]['name'] + '"]').val();
            var filearr = filedVal.split('^');
            var filebrr =[];
            for(var f in filearr){
                filebrr = filearr[f].split(';');
                data[setting[i]['name']] = JSON.stringify({ name:filebrr[0], path:filebrr[1] });
                // data[setting[i]['name']].push({
                //     name:filebrr[0],
                //     path:filebrr[1]
                // })
            }
            continue;
        }



        /*获取通用值*/
        var filedVal = $('[name="' + setting[i]['name'] + '"]').val();

        if ('addresscode' == setting[i]['name']) {
            filedVal = $('#addressid').val();
        }
        /*必填验证*/
        if ($('[name="' + setting[i]['name'] + '"]').hasClass('required') && !filedVal) {
            layer.msg('请填写:' + setting[i]['cn_name'],{icon:2,time:2000});
            return;
        }

        /*规则验证*/
        if(setting[i]['rule']){
            var ruleinfo = checkRule(filedVal, setting[i]['cn_name'], setting[i]['rule'])
            if (ruleinfo['code'] == 0) {
                layer.msg(ruleinfo['val'],{icon:2,time:2000});
                return;
            }
        }

        /*保存数据*/
        data[setting[i]['name']] = filedVal;
    }

    if (flag == 2) {
        layer.msg('保存失败!',{icon:2,time:2000});
        return '';
    } else {
         layer.msg('保存成功!',{icon:1,time:2000});
        /*存入cookie*/
        setCookie('bm' + sub_num, JSON.stringify(data));
        return data;
    }

}


/*验证字段*/
function checkRule(val, name, rule) {
    if (!rule || !val) {//如果没有规则  直接返回
        return {'code': 1, val: val};
    }
    var arr = rule.split(':');
    switch (arr[0]) {
        case 'integer':
            if (!(typeof value === 'number' && !isNaN(value))) {
                return {'code': '0', val: name + ':请输入数字'};
            }
            break;
        case 'in':
            if (arr[1].indexOf(val) == -1) {
                return {'code': '0', val: name + ':值必须为（' + arr[1] + '）'};
            }
            break;
        case 'max':
            if (val.length > arr[1]) {
                return {'code': '0', val: name + ':长度不能大于' + arr[1]};
            }
            break;
        case 'idCard':
            if (!isCardNo(val)) {
                return {'code': '0', val: name + ':请输入正确的证件号码'};
            }
            break;
        case 'email':
            if (!isemail(val)) {
                return {'code': '0', val: name + ':请输入正确的地址'};
            }
            break;
        case 'url':
            if (!isURL(val)) {
                return {'code': '0', val: name + ':请输入正确的地址'};
            }
            break;
        case 'date':
            if (!isDate(val)) {
                return {'code': '0', val: name + ':请输入正确的格式'};
            }
            break;
        case 'mobilephone':
            if (!isZuojiNo(val) || !isPhoneNo(val)) {
                return {'code': '0', val: name + ':请输入正确的联系方式'};
            }
            break;
        case 'mobile':
            if (!isZuojiNo(val)) {
                return {'code': '0', val: name + ':请输入正确的联系方式'};
            }
            break;
        case 'phone':
            if (!isPhoneNo(val)) {
                return {'code': '0', val: name + ':请输入正确的联系方式'};
            }
            break;
    }

    return {'code': 1, val: val};
}