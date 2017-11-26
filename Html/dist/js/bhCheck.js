var Bh = Bh || {};
Bh.check = Bh.check || {};// 用于存放临时的数据或者对象
Bh.check.Rules = {
    CHS: {
        validator: function (value, param) {
            return /^[\u0391-\uFFE5]+$/.test(value);
        },
        message: '请输入汉字'
    },
    EN: {// 验证英语
        validator: function (value) {
            return /^[A-Za-z]+$/i.test(value);
        },
        message: '请输入英文'
    },
    IP: {// 验证IP地址
        validator: function (value) {
            return /\d+\.\d+\.\d+\.\d+/.test(value);
        },
        message: 'IP地址格式不正确'
    },
    ZIP: {
        validator: function (value, param) {
            return /^[0-9]\d{5}$/.test(value);
        },
        message: '邮政编码不存在'
    },
    Email: {
        validator: function (value, param) {
            return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value);
        },
        message: '邮箱格式不正确'
    },
    QQ: {
        validator: function (value, param) {
            return /^[1-9]\d{4,10}$/.test(value);
        },
        message: 'QQ号码不正确'
    },
    Mobile: {
        validator: function (value, param) {
            return /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value);
        },
        message: '手机号码不正确'
    },
    Phone: {
        validator: function (value, param) {
            return /^(\d{3}-|\d{4}-)?(\d{8}|\d{7})?(-\d{1,6})?$/.test(value);
        },
        message: '电话号码不正确'
    },
    MobileAndPhone: {
        validator: function (value, param) {
            return /(^([0\+]\d{2,3})\d{3,4}\-\d{3,8}$)|(^([0\+]\d{2,3})\d{3,4}\d{3,8}$)|(^([0\+]\d{2,3}){0,1}13\d{9}$)|(^\d{3,4}\d{3,8}$)|(^\d{3,4}\-\d{3,8}$)/.test(value);
        },
        message: '请正确输入电话号码'
    },
    Number: {
        validator: function (value, param) {
            return /^[0-9]+.?[0-9]*$/.test(value);
        },
        message: '请输入数字'
    },
    Money: {
        validator: function (value, param) {
            return (/^(([1-9]\d*)|\d)(\.\d{1,2})?$/).test(value);
        },
        message: '请输入正确的金额'

    },
    mone: {
        validator: function (value, param) {
            return (/^(([1-9]\d*)|\d)(\.\d{1,2})?$/).test(value);
        },
        message: '请输入整数或小数'

    },
    integer: {
        validator: function (value, param) {
            return /^[+]?[1-9]\d*$/.test(value);
        },
        message: '请输入最小为1的整数'
    },
    integ: {
        validator: function (value, param) {
            return /^[+]?[0-9]\d*$/.test(value);
        },
        message: '请输入整数'
    },
    range: {
        validator: function (value, param) {
            if (/^[1-9]\d*$/.test(value)) {
                return value >= parseFloat(param[0]) && value <= parseFloat(param[1]);
            } else {
                return false;
            }
        },
        message: '输入的数字在{0}到{1}之间'
    },
    required: {
        validator: function (value) {
            if (value == undefined || value == "") {
                return false;
            } else {
                return true;
            }
        },
        message: '不能为空'
    },
    minLength: {
        validator: function (value, param) {
            return value.length >= param[0];
        },
        message: '至少输入{0}个字'
    },
    maxLength: {
        validator: function (value, param) {
            return value.length <= param[0];
        },
        message: '最多{0}个字'
    },
    //select即选择框的验证
    selectValid: {
        validator: function (value, param) {
            if (value == param[0]) {
                return false;
            } else {
                return true;
            }
        },
        message: '请选择'
    },
    idCode: {
        validator: function (value, param) {
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
        },
        message: '请输入正确的身份证号'
    },
    loginName: {
        validator: function (value, param) {
            return /^[\u0391-\uFFE5\w]+$/.test(value);
        },
        message: '登录名称只允许汉字、英文字母、数字及下划线。'
    },
    equalTo: {
        validator: function (value, param) {
            return value == $(param[0]).val();
        },
        message: '两次输入的字符不一至'
    },
    englishOrNum: {// 只能输入英文和数字
        validator: function (value) {
            return /^[a-zA-Z0-9_ ]{1,}$/.test(value);
        },
        message: '请输入英文、数字、下划线或者空格'
    },
    xiaoshu: {
        validator: function (value) {
            return /^(([1-9]+)|([0-9]+\.[0-9]{1,2}))$/.test(value);
        },
        message: '最多保留两位小数！'
    },
    ddPrice: {
        validator: function (value, param) {
            if (/^[1-9]\d*$/.test(value)) {
                return value >= param[0] && value <= param[1];
            } else {
                return false;
            }
        },
        message: '请输入1到100之间正整数'
    },
    decimal: {
        validator: function (value, param) {
            return $.isNumeric(value);
        },
        message: '请输入正确的数值'
    },
    jretailUpperLimit: {
        validator: function (value, param) {
            if (/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(value)) {
                return parseFloat(value) > parseFloat(param[0]) && parseFloat(value) <= parseFloat(param[1]);
            } else {
                return false;
            }
        },
        message: '请输入0到100之间的最多俩位小数的数字'
    },
    rateCheck: {
        validator: function (value, param) {
            if (/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(value)) {
                return parseFloat(value) > parseFloat(param[0]) && parseFloat(value) <= parseFloat(param[1]);
            } else {
                return false;
            }
        },
        message: '请输入0到1000之间的最多俩位小数的数字'
    }
}
//"^//d+$"　　//非负整数（正整数 + 0）
//"^[0-9]*[1-9][0-9]*$"　　//正整数
//"^((-//d+)|(0+))$"　　//非正整数（负整数 + 0）
//"^-[0-9]*[1-9][0-9]*$"　　//负整数
//"^-?//d+$"　　　　//整数
//"^//d+(//.//d+)?$"　　//非负浮点数（正浮点数 + 0）
//"^(([0-9]+//.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*//.[0-9]+)|([0-9]*[1-9][0-9]*))$"　　//正浮点数
//"^((-//d+(//.//d+)?)|(0+(//.0+)?))$"　　//非正浮点数（负浮点数 + 0）
//"^(-(([0-9]+//.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*//.[0-9]+)|([0-9]*[1-9][0-9]*)))$"　　//负浮点数
//"^(-?//d+)(//.//d+)?$"　　//浮点数