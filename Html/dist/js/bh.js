function ajaxPost(url, params, callback,errorCallback) {
    var result = null;
    var headers = {};
    headers['CSRFToken'] = jQuery("#csrftoken").val();
    jQuery.ajax({
        type: 'post',
        async: false,
        url: url,
        data: params,
        dataType: 'json',
        success: function (data, status) {
            result = data;
            if (!data.success) {
                errorCallback.call(this,data,status);
            }else{
                if (callback) {
                    callback.call(this, data, status);
                }
            }
        },
        error: function (err) {
            errorCallback.call(this,err,status);
        }
    });

    return result;
};
var getBhObject = function (obj) {
    var objId = "Bh_" + $(obj).attr("id");
    return $("body").data(objId);
};
var setBhObject= function(obj,bhObject) {
    var objId = "Bh_" + $(obj).attr("id");
    $("body").data(objId,bhObject);
    return bhObject;
};
//递归删除空属性防止把null变成空值
var deleteEmptyProp = function deleteEmptyProp(obj) {
    for (var a in obj) {
        if (typeof (obj[a]) === "object" && obj[a] !== null) {
            deleteEmptyProp(obj[a]);
        }
        else {
            if (!obj[a]) {
                delete obj[a];
            }
        }
    }
    return obj;
};
/**
 * 格式化日期
 */
var formatDate = function formatDate(date, format) {
    if (date) {
        date = (typeof date === "number") ? new Date(date) : date;
        return date.Format(format);
    }
};
Date.prototype.Format = function (fmt) {
    var o = {
        "m+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "i+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds()
        // 毫秒
    };
    if (/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o){
        if (new RegExp("(" + k + ")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};
/**
 * 比较两个时间的大小 d1>d2 返回大于0
 */
var dateDiff = function DateDiff(d1, d2) {
    var result = Date.parse(d1.replace(/-/g, "/")) - Date.parse(d2.replace(/-/g, "/"));
    return result;
};
/**
 * 字符串转日期
 * @returns {number}
 */
String.prototype.strToDate = function () {
    if (this && this !== "") {
        return Date.parse(this.replace(/-/g, "/"));
    }
    else{
        return "";
    }
};
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}
String.prototype.format = function () {
    if (arguments.length === 0) {
        return this;
    }
    for (var s = this, i = 0; i < arguments.length; i++){
        s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    }
    return s;
};
var getCheckRules = function (ruleStr){
    var rules = [];
    if(ruleStr === undefined || ruleStr === ""){
        return rules;
    }
    var ruleStrs = ruleStr.split(';');
    $.each(ruleStrs,function (i,v) {
        var str = v;
        var iLength = str.length;
        var bracket = 0;
        var ruleName = "";
        var params = "";
        for(var i=0;i<iLength;i++)
        {
            var tmpStr = str.substring(i,i+1);
            if(tmpStr === "("){
                bracket = bracket +1 ;
                continue;
            }
            if(bracket === 0) {
                ruleName += tmpStr;
            }else {
                if (tmpStr !== ")") {
                    params += tmpStr;
                }
            }
        }
        if(params === ""){
            rules.push({rule:ruleName});
        }else{
            rules.push({rule:ruleName,params:params.split(",")});
        }
    });
    return rules;
};
var getOptions = function (item) {
    var option = $(item).data("bh-options");
    if (option !== undefined && option !== "") {
        option = option.replace(/'/g, '"');
        return $.parseJSON("{" + option + "}");
    }
    return undefined;
};
var getClosest = function (item,key) {
    var elements = $(item).closest(key);
    if(elements.length >0){
        return elements[0];
    }else {
        return undefined;
    }
};
var findItem = function (item,key1,key2) {
    var elements = getClosest(item,key1);
    if(elements !== undefined){
        var childItems = $(elements).find(key2);
        if(childItems.length >0){
            return childItems[0];
        }
    };
    return undefined;
};
var getCaption = function (item) {
    var fieldText = $(item).attr("placeholder");
    if(fieldText === undefined || fieldText === ""){
        var object = findItem(item,".form-group",".control-label");
        if(object !== undefined){
            fieldText = $(object).text();
        }
    }
    return fieldText;
};
var getFieldName = function (item) {
    return item.attr("name");
};
var getButton = function (params) {
    if(!params.show){
        return "";
    };
    return  "<button type=\"button\" class=\"bh-icon-button bh-icon-button-" + params.tag + " btn btn-default btn-sm bg-"+ params.color +"\" data-original-title=\"" + params.title + "\"  data-toggle=\"tooltip\"><i class=\"" + params.icon + "\"></i></button>";
};
var BhObject = function (element, options) {
    var self = this;
    self.$element = $(element);
    self.options = $.extend({}, self.default, getOptions(self.$element), options);
    this.version = "1.0.0.0";
    return self;
};
BhObject.prototype.getOptions = function () {
    var self = this;
    return self.options;
};
BhObject.prototype.constructor = BhObject;
//BhForm
var BhForm = function (element, options) {
    var self = this;
    self = $.extend(true, {}, (new BhObject(element, options)), self);
    return self;
};

BhForm.prototype.validate = function(){
    var self = this;
    var result = true;
    var elems = self.$element.find('textarea[name],select[name], input[name]').not(':file');
    elems.each(function (ind, elem) {
        if($(elem).bhElement().validate() == false){
            result = false;
        }
    });
    return result;
};
/**
 * 获取表单数据
 */
BhForm.prototype.getValue = function () {
    var self = this;
    var data = {};
    var elems = self.$element .find('textarea[name],input[name], select[name], textarea[name]').not(':file');
    elems.each(function (ind, elem) {
        data[$(elem).bhElement().fieldName] = $(elem).bhElement().getValue();
    });
    return data;
};
BhForm.prototype.addError = function (errors) {
    var self = this;
    var elems = self.$element .find('textarea[name],input[name], select[name], textarea[name]').not(':file');
    elems.each(function (ind, elem) {
        var fieldName = $(elem).bhElement().fieldName;
        if(errors[fieldName]){
            $(elem).bhElement().addError(errors[fieldName]);
        }
    });
};
/**
 *    表单数据回填
 * @param json_data 回填的数据
 */
BhForm.prototype.setData = function (json_data) {
    var self = this;
    if (!json_data){
        return;
    }
    var form = self.$element;
    var elements = form.find('input[name], select[name], textarea[name]').not(':file');
    elements.each(function (index, value) {
        $(value).bhElement().setValue(json_data);
    });
    return self;
};
/**
 * 表单重置
 */
BhForm.prototype.clear = function () {
    var self = this;
    var form = self.$element;
    var elems = form.find('textarea[name],input[name], select[name], textarea[name]').not(':file');
    elems.each(function (ind, elem) {
        $(elem).bhElement().clear();
    });
    return self;
};
BhForm.prototype.constructor = BhForm;
//BhElement
var BhElement = function (element, options) {
    var self = this;
    self = $.extend(true, {}, (new BhObject(element, options)), self);
    self.caption = getCaption(self.$element);
    self.fieldName = getFieldName(self.$element);
    self.checkRules = getCheckRules(self.$element.data("check"));
    self.$element.on("change", function () {
        self.validate();
    });
    self.$element.on("blur", function () {
        self.validate();
    });
    return self;
};
BhElement.prototype.getValue = function () {
    return this.$element.val();
};
BhElement.prototype.setValue = function (value) {
    var self = this;
    self.removeError();
    if(typeof value === "object"){
        var fieldName = self.fieldName;
        return self.$element.val(value[fieldName]);
    }else{
        self.$element.val(value);
    }
    return self;
};
BhElement.prototype.constructor = BhElement;
BhElement.prototype.addError = function (text, type) {
    var self = this;
    text = text || "";
    self.$element.closest('.form-group').addClass('has-error');
    self.$element.closest('.form-group').append("<span class='text-danger'>" + text + "</span>");
};
BhElement.prototype.removeError = function () {
    var self = this;
    self.$element.closest(".form-group").removeClass("has-error");
    self.$element.closest(".form-group").find(".text-danger").remove();
};
BhElement.prototype.clear = function () {
    var self = this;
    var fieldName = self.fieldName;
    self.$element.val("");
    self.removeError();
    var value = self.getValue();
    if(value === undefined || value === "" || value == null){
        $.each(self.checkRules, function (i, value) {
            if (value.rule === "required") {
                self.addError("");
                return false;
            }
        });
    }
    return self;
};
BhElement.prototype.validate = function () {
    var self = this;
    self.removeError();
    if (!self.checkRules) {
        return true;
    }
    var value = self.getValue();
    var checkResult = true;
    $.each(self.checkRules, function (index, ruleItem) {
        var rule = Bh.check.Rules[ruleItem.rule];
        if (rule == undefined) {
            throw new Error("验证规则不存在");
        }
        var messag = self.caption + rule.message;
        if (false == rule.validator.call(this, value, ruleItem.params)) {
            if (ruleItem.params != undefined) {
                $.each(ruleItem.params, function (i, v) {
                    messag = messag.replace("{" + i + "}", v);
                });
            }
            checkResult = false;
            self.addError(messag);
            return false;
        }
    });
    return checkResult;
};
BhElement.prototype.default = { type: 'BhElement' };
BhElement.prototype.constructor = BhElement;
//BhDateTime
var BhDateTime= function (element, options) {
    var self = this;
    self = $.extend(true, {}, (new BhElement(element, options)), self);
    self.$element.datepicker(self.options);
    self.$element.on('changeDate', function(ev){
        self.$element.datepicker('hide');
    });
    return self;
};
BhDateTime.prototype.getValue = function () {
    return this.$element.val();
};
BhDateTime.prototype.setValue = function (value) {
    this.$element.val(value).trigger("change");
};
BhDateTime.prototype.reset = function () {
    this.$element.val("").trigger("change");
};
BhDateTime.prototype.defaults={
    clearBtn: true,
    language: "zh-CN",
    forceParse: false,
    calendarWeeks: true,
    autoclose: false,
    todayHighlight: true,
    toggleActive: true
};
BhDateTime.prototype.constructor = BhDateTime;
//BhTable
var BhTable = function (element, options) {
    var self = this;
    self = $.extend(true, {}, (new BhObject(element, options)), self);
    self.options = $.extend(true, {},self.default, self.options);
    // 表格横向自适应
    self.init();
    self.initMethod();
    if(self.options.url !== undefined){
        self.loadData();
    }
    return self;
};
/**
 * 初始化表格
 */
BhTable.prototype.init = function () {
    var self = this;
    //设置按钮的默认操作
    $.each(self.options.defaultButtuns,function (index,value) {
        if(value.tag === "refresh"){
            value.click = function () {
                self.reLoadData();
            };
        }
    });
    var buttons = [];
    $.each(self.options.buttons,function (i,v) {
        var btn = $.extend({},v);
        $.each(self.options.defaultButtuns,function (index,value) {
            if(v.tag === value.tag){
                btn = $.extend(value,btn);
                return false;
            }
        });
        if(btn.show){
            buttons.push(btn);
        }
    });
    self.options.buttons = buttons;

    var rowButtons = [];
    $.each(self.options.rowButtons,function (i,v) {
        var rowBtn = $.extend({},v);
        $.each(self.options.defaultRowButtons,function (index,value) {
            if(v.tag === value.tag){
                rowBtn = $.extend(value,rowBtn);
                return false;
            }
        });
        if(rowBtn.show){
            rowButtons.push(rowBtn);
        }
    });
    self.options.rowButtons = rowButtons;

    //计算宽度
    var html = "          <!-- Table Head -->\n" +
        "          <div class=\"bh-table-controls bh-table-search-div\">\n" +
        "          </div>\n" +
        "          <!-- Table Body -->\n" +
        "          <div class=\"box-body no-padding\">\n" +
        "            <div class=\"table-responsive\">\n";

    var coldumnWidthSum = 170;
    $.each(self.options.columns,function (index,column) {
        if(column.width){
            coldumnWidthSum += column.width;
        }else{
            coldumnWidthSum = undefined;
            return false;
        }
    });

    if(self.options.width) {
        html += "              <table class=\"table table-hover table-striped table-bordered\" style='min-width: " + self.options.width  + "px'>\n";
    }else if(coldumnWidthSum){
        html += "              <table class=\"table table-hover table-striped table-bordered\" style='min-width: " + coldumnWidthSum + "px'>\n";
    }else{
        html += "              <table class=\"table table-hover table-striped table-bordered\">\n";
    }
    //设置底部导航条
    html += "  <thead class=\"bh-table-head\"><tr></tr></thead><tbody class='bh-table-tbody'></tbody></table>\n" +
        "         </div>\n" +
        "          </div>\n" +
        "          <div class=\"box-footer no-padding\">\n" +
        "            <div class=\"bh-table-controls bh-table-menubar\">\n";
    $.each(self.options.buttons,function (index,value) {
        html += getButton(value);
    });
    $.each(self.options.custmButtons,function (index,value) {
        html += getButton(value);
    });
    if(self.options.paging){
        html += "              <div class=\"pull-right\">\n<span class='bh-table-record-info'></span>\n" +
            "                <div class=\"btn-group\">\n" +
            "                  <button type=\"button\" class=\"bh-table-page-button bh-table-page-button-first btn btn-default btn-sm\" data-original-title=\"首页\"  data-toggle=\"tooltip\"><i class=\"fa fa-step-backward\"></i></button>\n" +
            "                  <button type=\"button\" class=\"bh-table-page-button bh-table-page-button-previous btn btn-default btn-sm\" data-original-title=\"上一页\"  data-toggle=\"tooltip\"><i class=\"fa fa-chevron-left\"></i></button>\n" +
            "                  <button type=\"button\" class=\"bh-table-page-button bh-table-page-button-next btn btn-default btn-sm\" data-original-title=\"下一页\"  data-toggle=\"tooltip\"><i class=\"fa fa-chevron-right\"></i></button>\n" +
            "                  <button type=\"button\" class=\"bh-table-page-button bh-table-page-button-last btn btn-default btn-sm\" data-original-title=\"末页\"  data-toggle=\"tooltip\"><i class=\"fa  fa-step-forward\"></i></button>\n" +
            "                </div>\n" +
            "                <select class=\"bh-table-page-select input-sm\">\n" +
            "                  <option>10</option>\n" +
            "                  <option>30</option>\n" +
            "                  <option>50</option>\n" +
            "                  <option>100</option>\n" +
            "                </select>\n" +
            "              </div>\n";
    }else{
        html += "              <div class=\"pull-right\">\n<span class='bh-table-record-info'></span></div>\n";
    }
    html += "            </div>\n" +
        "          </div>"
    self.$element.append(html);
    if(self.options.searchDiv){
        self.options.searchDiv.appendTo(self.$element.find(".bh-table-search-div"));
    }
    //初始化表格头
    if(self.options.checkColumn){
        var checkHtml = "<th style='width: 70px'><input type='checkbox' class='bh-table-heade-check'/></th>";
        self.$element.find(".bh-table-head>tr").append(checkHtml);
    };
    $.each(self.options.columns,function (index,column) {
        var headHtml = "";
        if(column.width){
            headHtml += "<td style='width: " +  column.width + "px' ";
        }else{
            headHtml += "<td";
        }
        if(column.sotrable){
            var sortField = column.name;
            if(column.sortField){
                sortField = column.sortField;
            }
            headHtml += " class='bh-table-head-sort' data-sort-column='" + sortField + "'>";
            headHtml += "<i class=\"fa fa-caret-up bh-sort-up bh-table-head-sort-disabled\"></i><i class=\"fa fa-caret-down bh-sort-down bh-table-head-sort-disabled\"></i>";
        }else{
            headHtml += ">";
        }
        headHtml += column.title + "</th>";
        self.$element.find(".bh-table-head>tr").append(headHtml);
    });
    if(self.options.rowButtons.length>0 || self.rowButtons){
        var editHtml = "<th style='width: 100px'></th>";
        self.$element.find(".bh-table-head>tr").append(editHtml);
    }
};
BhTable.prototype.initMethod =function () {
    var self = this;
    var setRowStatus = function (row,selected) {
        if(selected && !row.hasClass("bh-table-selected")){
            row.addClass("bh-table-selected");
            row.find('td:first-child input:checkbox').prop('checked', true);
        }
        if(!selected && row.hasClass("bh-table-selected")){
            row.removeClass("bh-table-selected");
            row.find('td:first-child input:checkbox').prop('checked', false);
        }
    };
    self.options.searchDiv.find(".bh-table-btn-query").on("click",function () {
        self.loadData();
    });
    $.each(self.options.buttons,function (index,value) {
        self.$element.find(".bh-icon-button-"+value.tag).on("click",function () {
            var rows = self.getSelectData();
            value.click.call(this,rows);
        });
    });
    self.$element.on("click",".bh-table-row-editor",function () {
        var $this = $(this);
        var index = $this.parent().parent().parent().index();
        var data = self.data.list[index];
        $.each(self.options.rowFunction,function (tag,value) {
            if($this.hasClass("bh-table-row-editor-"+tag)){
                value.call(this,data,index);
                return false;
            }
        });
    });
    $.each(self.options.rowButtons,function (index,value) {
        self.$element.find(".bh-table-row-editor-"+value.tag).on("click",function () {
            var rows = self.getSelectData();
            value.click.call(this,rows);
        });
    });
    $.each(self.options.custmButtons,function (index,value) {
        self.$element.find(".bh-icon-button-"+value.tag).on("click",function () {
            var rows = self.getSelectData();
            value.click.call(this,rows);
        });
    });
    self.$element.on("click","tbody>tr>td",function () {
        var $this = $(this);
        if($this.hasClass('bh-table-td-editor') || $this.hasClass('bh-table-td-checked')){
            return;
        }
        var selected = false;
        if($(this).closest("tr").hasClass("bh-table-selected")){
            selected = true;
        }
        self.$element.find("tr.bh-table-selected").removeClass("bh-table-selected");
        $(this).closest('table').find('tr > td:first-child input:checkbox').prop('checked', false);
        setRowStatus($(this).closest("tr"),!selected);
    });
    self.$element.on("click","tbody > tr > td:first-child",function () {
        var selected = false;
        if($(this).closest("tr").hasClass("bh-table-selected")){
            selected = true;
        }
        setRowStatus($(this).closest("tr"),!selected);
    });
    self.$element.find('.bh-table-head th input:checkbox').on('click' , function(){
        var that = this;
        $(this).closest('table').find('tbody>tr')
            .each(function(){
                setRowStatus($(this),that.checked);
            });
    });
    self.$element.on("click",".bh-table-head-sort",function () {
        var sort = "none";
        if(!$(this).find(".bh-sort-up").hasClass("bh-table-head-sort-disabled")){
            sort = "asc";
        }
        if(!$(this).find(".bh-sort-down").hasClass("bh-table-head-sort-disabled")){
            sort="desc";
        }
        if(sort === "none"){
            $(this).find(".bh-sort-up").removeClass("bh-table-head-sort-disabled");
            $(this).find(".bh-sort-down").addClass("bh-table-head-sort-disabled");
            sort = "asc";
        }else if(sort === "desc"){
            $(this).find(".bh-sort-up").addClass("bh-table-head-sort-disabled");
            $(this).find(".bh-sort-down").addClass("bh-table-head-sort-disabled");
            sort = "none";
        }else{
            $(this).find(".bh-sort-up").addClass("bh-table-head-sort-disabled");
            $(this).find(".bh-sort-down").removeClass("bh-table-head-sort-disabled");
            sort = "desc";
        }
        var sortColumen = $(this).attr("data-sort-column");
        if(sort === "none" && self.options.sortColumn[sortColumen]){
            delete self.options.sortColumn[sortColumen];
        }else{
            self.options.sortColumn[sortColumen] = sortColumen + " " + sort;
        }
        self.reLoadData();
    });
    self.$element.find("[data-toggle='tooltip']").tooltip();
    self.$element.on("click",".bh-table-page-button",function () {
        var $this = $(this);
        if($this.hasClass("disabled")){
            return;
        }
        if($this.hasClass("bh-table-page-button-previous")){
            self.options.page.pageNow = self.options.page.pageNow - 1;
        }else if ($this.hasClass("bh-table-page-button-first")){
            self.options.page.pageNow = 1;
        }else if ($this.hasClass("bh-table-page-button-last")){
            self.options.page.pageNow = self.options.page.pages;
        }else if ($this.hasClass("bh-table-page-button-next")){
            self.options.page.pageNow = self.options.page.pageNow + 1;
        }
        self.reLoadData();
    });
    self.$element.find(".bh-table-page-select").change(function () {
        self.options.page.pageNow = 1;
        self.reLoadData();
    });
};
BhTable.prototype.getSort = function () {
    var self = this;
    var result = "";
    $.each(self.options.sortColumn,function (index,value) {
        if(result === ""){
            result += value;
        }else{
            result += "," + value;
        }
    });
    return result;
};
BhTable.prototype.setData = function (data) {
    var self = this;
    self.options.rowFunction = {};
    self.data = $.extend({},data);
    $.each(data.list,function (index,row) {
        row.rowButtons = [];
        if(self.options.rowButtons && self.options.rowButtons.length>0){
            $.each(self.options.rowButtons,function (i,v) {
                row.rowButtons.push($.extend({},v));
            });
        }
        if(self.options.formatRow) {
            self.options.formatRow(row);
        }
    });
    if(self.options.paging){
        self.options.page.pages = data.pages;
        self.options.page.endRow = data.endRow;
        self.options.page.firstPage = data.firstPage;
        self.options.page.hasNextPage = data.hasNextPage;
        self.options.page.hasPreviousPage = data.hasPreviousPage;
        self.options.page.isFirstPage = data.isFirstPage;
        self.options.page.isLastPage = data.isLastPage;
        self.options.page.lastPage = data.lastPage;
        self.options.page.nextPage = data.nextPage;
        self.options.page.startRow = data.startRow;
        self.options.page.total = data.total;
        self.options.page.endRow = data.endRow;
        self.options.page.pageNow = data.pageNum;
    }
    self.$element.find(".bh-table-tbody>tr").remove();
    $.each(data.list,function (i,row) {
        //初始化表体
        var htmlText = "<tr>"
        if(self.options.checkColumn){
            htmlText += "<td class='center bh-table-td-checked'><input type='checkbox' class='bh-table-row-check' /></td>";
        }
        $.each(self.options.columns,function (index,column) {
            htmlText += "<td>";
            if(row[column.name]){
                htmlText += row[column.name];
            }
            htmlText += "</td>";
        });
        var buttons = [];
        $.each(row.rowButtons,function (index,value) {
            if(value.show === true) {
                buttons.push(value);
                if(!self.options.rowFunction[value.tag]){
                    self.options.rowFunction[value.tag] = value.click;
                }
            }
        });
        if(buttons.length >0){
            htmlText += "<td class='bh-table-td-editor'><div>";
            $.each(buttons,function (index,value) {
                htmlText += "<a  class='bh-table-row-editor bh-table-row-editor-" + value.tag  + "' href=\"#\"><i class=\"fa " +  value.icon +" text-" + value.color + " ui-icon \" data-original-title=\"" +  value.title  +  "\"  data-toggle=\"tooltip\"></i></a>";
            });
            htmlText += "</div</td>";
        }
        htmlText += "</tr>";
        self.$element.find(".bh-table-tbody").append(htmlText);
    });
    //设置分页信息
    if(self.options.paging) {
        var recordInfo = "页数:" + data.pageNum + "/" + data.pages + ",记录数:" + data.total + ",当前:" + data.startRow + "-" + data.endRow;
        self.$element.find(".bh-table-record-info").html(recordInfo);
        if (data.isFirstPage) {
            if (!self.$element.find(".bh-table-page-button-first").hasClass("disabled")) {
                self.$element.find(".bh-table-page-button-first").addClass("disabled");
            }
        } else {
            self.$element.find(".bh-table-page-button-first").removeClass("disabled");
        }
        if (data.hasPreviousPage) {
            self.$element.find(".bh-table-page-button-previous").removeClass("disabled");
        } else {
            if (!self.$element.find(".bh-table-page-button-previous").hasClass("disabled")) {
                self.$element.find(".bh-table-page-button-previous").addClass("disabled");
            }
        }
        if (data.hasNextPage) {
            self.$element.find(".bh-table-page-button-next").removeClass("disabled");
        } else {
            if (!self.$element.find(".bh-table-page-button-next").hasClass("disabled")) {
                self.$element.find(".bh-table-page-button-next").addClass("disabled");
            }
        }
        if (data.isLastPage) {
            if (!self.$element.find(".bh-table-page-button-last").hasClass("disabled")) {
                self.$element.find(".bh-table-page-button-last").addClass("disabled");
            }
        } else {
            self.$element.find(".bh-table-page-button-last").removeClass("disabled");
        }
        self.$element.find(".bh-table-tbody").find("[data-toggle='tooltip']").tooltip();
    }else{
        var recordInfo = "记录数:" + data.total;
        self.$element.find(".bh-table-record-info").html(recordInfo);
    }
    self.$element.find('.bh-table-head th input:checkbox').prop("checked",false);
};
BhTable.prototype.editRow = function (index) {
    var self = this;
    if(!self.options.trEditRow) {
        //初始化表体
        var htmlText = "<tr>"
        htmlText += "<td class='center'><label><input type='checkbox' class='ace' /><span class='lbl'></span></label></td>";
        $.each(self.options.columns, function (index, column) {
            htmlText += "<td>"
            if (column.editable) {
                htmlText += "<input type='text' class='form-control input-sm' name='" + column.name + "' ";
                if (self.data.list[index][column.name]) {
                    htmlText += "value = '" + self.data.list[index][column.name] + "'";
                }
                htmlText += ">";
            } else {
                if (self.data.list[index][column.name]) {
                    htmlText += self.data.list[index][column.name];
                }
            }
            htmlText += "</td>";
        });
        htmlText += "<td><div>";
        htmlText += "    <button type=\"button\" class=\"btn btn-default btn-sm bh-table-row-editor bh-table-row-editor-save  bg-green\" data-original-title=\"保存\"  data-toggle=\"tooltip\"><i class=\"fa fa-check\"></i></button>";
        htmlText += "    <button type=\"button\" class=\"btn btn-default btn-sm bh-table-row-editor bh-table-row-editor-cancel bg-red\" data-original-title=\"取消\"  data-toggle=\"tooltip\"><i class=\"fa fa-close\"></i></button>";
        htmlText += "</div</td>";
        htmlText += "</tr>";
        self.$element.find("tbody>tr:eq(" + index + ")").after(htmlText);
    }else{
        self.options.trEditRow.insertAfter(self.$element.find("tbody>tr:eq(" + index + ")"));
        self.options.trEditRow.removeClass("bh-table-edit-row");
    }
    self.$element.find("tbody>tr:eq("+ index +")").remove();
    self.$element.find(".bh-table-tbody").find("[data-toggle='tooltip']").tooltip();
    self.status = "edit";
};
BhTable.prototype.newRow = function () {
    var self = this;
    if(self.status !== "view"){
        return;
    }
    //初始化表体
    var htmlText = "<tr>"
    htmlText += "<td class='center'><input type='checkbox'/></td>";
    $.each(self.options.columns,function (index,column) {
        htmlText += "<td><input type='text' class='form-control input-sm' name='" + column.name + "'></td>";
    });
    htmlText += "<td><div class='btn-group'><div class='ui-pg-div'>";
    htmlText += "<div class='row_edit'>";
    htmlText += "    <span class='ui-icon ui-ico fa fa-check green  row_edit_save' data-original-title='保存'></span>";
    htmlText += "    <span class='ui-icon ui-icon fa fa-close red row_edit_cancel' data-original-title='放弃'></span>";
    htmlText += "</div>";
    htmlText += "</div></div></td>";
    htmlText += "</tr>";
    self.$element.find("tbody").append(htmlText);
    self.status = "add";
}
BhTable.prototype.cancelEdit = function (index) {
    var self = this;
    if(self.status !== "edit" && self.status !== "add" ){
        return;
    }
    if(self.status === "edit") {
        var rowData = self.data.list[index];
        //初始化表体
        var htmlText = "<tr>"
        htmlText += "<td class='center'><input type='checkbox' /></td>";
        $.each(self.options.columns, function (i, column) {
            htmlText += "<td>";
            if (column.name && self.data.list[index][column.name]) {

                htmlText += self.data.list[index][column.name];
            }
            htmlText += "</td>";
        });
        htmlText += "<td><div>";
        htmlText += "    <button type=\"button\" class=\"btn btn-default btn-sm bh-table-row-editor bh-table-row-editor-edit  bg-blue\" data-original-title=\"修改\"  data-toggle=\"tooltip\"><i class=\"fa fa-pencil\"></i></button>";
        htmlText += "    <button type=\"button\" class=\"btn btn-default btn-sm bh-table-row-editor bh-table-row-editor-delete bg-orange\" data-original-title=\"删除\"  data-toggle=\"tooltip\"><i class=\"fa fa-trash\"></i></button>";
        htmlText += "</div</td>";
        htmlText += "</tr>";
        self.$element.find("tbody>tr:eq(" + index + ")").after(htmlText);
    }
    self.$element.find("tbody>tr:eq(" + index + ")").remove();
    self.status = "view";
};
BhTable.prototype.loadData = function() {
    var self = this;
    var queryMethod = self.options.queryMethod;
    var pageInfo = {};
    var parmas = {};
    if(queryMethod !== undefined){
        parmas = queryMethod();
        pageInfo = $.extend(pageInfo,self.options.queryParams,parmas);
    }else if(self.options.searchDiv) {
        parmas = self.options.searchDiv.find("form").bhForm().getValue();
        pageInfo = $.extend(pageInfo,self.options.queryParams,parmas);
    }
    self.options.params = parmas;
    self.options.page.pageNow = 1;
    pageInfo.pageSize = self.$element.find(".bh-table-page-select").val();
    pageInfo.pageNow = 1;
    pageInfo.sortString = self.getSort();
    if(self.options.params){
        pageInfo = $.extend(self.options.params,pageInfo);
    }
    ajaxPost(self.options.url,pageInfo,function (result) {
        self.setData(result.data);
    });
};
BhTable.prototype.reLoadData = function() {
    var self = this;
    if(self.options.url){
        var params = {};
        if(self.options.paging) {
            params.pageSize = self.$element.find(".bh-table-page-select").val();
            params.pageNow = self.options.page.pageNow;
        }
        params.sortString = self.getSort();
        if(self.options.params){
            params = $.extend(self.options.params,params);
        }
        ajaxPost(self.options.url,params,function (result) {
            self.setData(result.data);
        });
    }else{
        self.setData(self.data);
    }
};
//选中行
BhTable.prototype.getSelectData = function () {
    var selectData = [];
    var self = this;
    self.$element.find("tbody>tr").each(function () {
        if($(this).hasClass("bh-table-selected")){
            var index = $(this).index();
            selectData.push(self.data.list[index]);
        }
    });
    return selectData;
};
BhTable.prototype.default = {
    pageSize:10,
    rowList:[10,20,30],
    autowidth: true,
    sortColumn:{},
    page:{},
    rowButtons:false,
    paging:true,
    loadComplete : function() {
        var table = this;
        setTimeout(function(){
            $('.navtable .ui-pg-button').tooltip({container:'body'});
            $(table).find('.ui-pg-div').tooltip({container:'body'});
        }, 0);
    },
    defaultButtuns:[{tag:"add",show:true,title:"增加",color:"blue",icon:"fa fa-plus",click:function(){}},
        {tag:"edit",show:true,title:"编辑",color:"green",icon:"fa  fa-pencil-square-o",click:function(){}},
        {tag:"delete",show:true,title:"删除",color:"red",icon:"fa fa-trash-o",click:function () {}},
        {tag:"senior_search",show:true,title:"高级查询",color:"orange",icon:"fa fa-search-plus",click:function (){}},
        {tag:"refresh",show:true,title:"刷新",color:"yellow",icon:"fa fa-refresh"}],
    defaultRowButtons:[{tag:"edit",show:false,color:"blue",title:"编辑",icon:"fa-pencil-square-o"},
        {tag:"delete",show:false,color:"yellow",title:"删除",icon:"fa-trash"}],
    formatRow:undefined,
    queryParams:{}
};
BhTable.prototype.constructor = BhTable;

$.fn.bhForm = function (options) {
    var self = this;
    var bhObject = getBhObject(self);
    if(!bhObject){
        bhObject = new BhForm(this, options);
        setBhObject(self,bhObject);
    }
    return bhObject;
};
$.fn.bhTable = function (options) {
    var bhObject = getBhObject(this);
    if(!bhObject){
        bhObject = new BhTable(this, options);
        setBhObject(this,bhObject);
    }
    return bhObject;
};
$.fn.bhElement = function (options) {
    var obj = $(this);
    if (obj.length === 1 ){
        var bhObject = getBhObject(obj);
        if(bhObject){
            return bhObject;
        }
    }
    this.each(function () {
        var $this = $(this),
            data = getBhObject($this);
        if (!data) {
            data = new BhElement(this, options);
            setBhObject($this,data);
        }
    });
    if (obj.length === 1) {
        return getBhObject(obj);
    }
};