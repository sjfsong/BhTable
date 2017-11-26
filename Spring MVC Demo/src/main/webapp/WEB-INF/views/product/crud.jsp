<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>BH</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link href="<c:url value="/resources/plugins/bootstrap/css/bootstrap.min.css" />" rel="stylesheet">
    <link href="<c:url value="/resources/plugins/font-awesome/css/font-awesome.min.css" />" rel="stylesheet">
    <link href="<c:url value="/resources/dist/css/AdminLTE.min.css" />" rel="stylesheet">
    <link href="<c:url value="/resources/dist/css/skins/_all-skins.css" />" rel="stylesheet">
    <link href="<c:url value="/resources/dist/css/bh.css" />" rel="stylesheet">
</head>
<style>
    .img_container > i, .img_container2 > i {
        position:relative;
        top: calc(50% - 10px); /* 50% - 3/4 of icon height */
    }
</style>
<!-- ADD THE CLASS layout-top-nav TO REMOVE THE SIDEBAR. -->
<body class="hold-transition skin-blue layout-top-nav">
<div class="wrapper">
    <header class="main-header">
        <nav class="navbar navbar-static-top">
            <div class="navbar-header">
                <span class="navbar-brand">QQ群:<b>552596594</b> </span>
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
                    <i class="fa fa-bars"></i>
                </button>
            </div>
            <div class="collapse navbar-collapse pull-left" id="navbar-collapse">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="simp">简单例子</a>
                    </li>
                    <li>
                        <a href="basic">基本例子</a>
                    </li>
                    <li>
                        <a href="crud">完整CRUD</a>
                    </li>
                    <li>
                        <a href="#" id="btnGetnData">批量生成数据</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <!-- Full Width Column -->
    <div class="content-wrapper">
        <!-- Main content -->
        <section class="content">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">CRUD</h3>
                </div>
                <div id="bhTable"></div>
            </div>
            <!-- /.box -->
        </section>
        <!-- /.container -->
    </div>
    <div id="gridSearch">
        <form class="form-inline">
            <div class="form-group">
                <label for="txtQueryCode">编码</label>
                <input type="text" class="form-control input-sm" id="txtQueryCode" name="code">
            </div>
            <div class="form-group">
                <label for="txtQueryName">名称</label>
                <input type="text" class="form-control input-sm" id="txtQueryName" name="name">
            </div>
            <button type="button" class="btn btn-default btn-sm bg-blue bh-table-btn-query"><i class="fa fa-search"></i></button>
        </form>
    </div>
    <!-- /.content-wrapper -->
    <footer class="main-footer">
        <div class="container">
            <div class="pull-right hidden-xs">
                <b>Version</b> 2.4.0
            </div>
            <strong>Copyright &copy; 2017-2017 <a href="#">BH大数据</a>.</strong> All rights
            reserved.
        </div>
    </footer>
</div>
<div style="display: none;width: 500px" id="dvUpdate">
    <section class="content">
        <form id="frmUpdate">
            <input type="hidden" name="id" id="id"/>
            <div class="row">
                <div class="col-sm-4 form-group">
                    <label for="code">编码</label>
                    <div class="controls">
                        <input type="text" class="form-control input-sm" name="code" id="code" placeholder="编码" data-check="required;maxLength(10)"/>
                    </div>
                </div>
                <div class="col-sm-4 form-group">
                    <label for="name" class="control-label">名称</label>
                    <div class="controls">
                        <input type="text" class="form-control input-sm" id="name" name="name" data-check="required;maxLength(40)"/>
                    </div>
                </div>
                <div class="col-sm-4 form-group">
                    <label for="categoryCode" class="control-label"> 类别</label>
                    <div class="controls">
                        <select class="form-control input-sm" name="categoryCode" id="categoryCode" placeholder="类别" data-check="required" >
                            <option value="apple">苹果(apple)</option>
                            <option value="xiaomi">小米(xiaomi)</option>
                            <option value="huawei">华为(huawei)</option>
                            <option value="lenovo">联想(lenovo)</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-4 form-group">
                    <label for="price">单价</label>
                    <div class="controls">
                        <input type="text" class="form-control input-sm" name="price" id="price" placeholder="单价" data-check="required"/>
                    </div>
                </div>
                <div class="col-sm-4 form-group">
                    <label for="qty" class="control-label">库存数量</label>
                    <div class="controls">
                        <input type="text" class="form-control input-sm" id="qty" name="qty" placeholder="库存数量" data-check="required"/>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 form-group">
                    <label for="description" class="control-label">备注</label>
                    <div class="controls">
                        <input type="text" class="form-control input-sm" name="description" id="description" placeholder="备注"  data-check="maxLength(100)" />
                    </div>
                </div>
            </div>
        </form>
    </section>
</div>
<script src="<c:url value="/resources/plugins/jquery/jquery-3.2.1.js" />"></script>
<script src="<c:url value="/resources/plugins/bootstrap/js/bootstrap.min.js" />"></script>
<script src="<c:url value="/resources/dist/js/adminlte.min.js" />"></script>
<script src="<c:url value="/resources/plugins/layer-v3.1.0/layer.js" />"></script>
<script src="<c:url value="/resources/dist/js/bhCheck.js" />"></script>
<script src="<c:url value="/resources/dist/js/bh.js" />"></script>
<script src="<c:url value="/resources/plugins/input-mask/jquery.inputmask.js" />"></script>
<script src="<c:url value="/resources/plugins/input-mask/jquery.inputmask.extensions.js" />"></script>
<script src="<c:url value="/resources/plugins/input-mask/jquery.inputmask.numeric.extensions.js" />"></script>
<script language="JavaScript">
    $(function () {
        $("#btnGetnData").on("click",function () {
            ajaxPost("batchCreateData",null,function () {
                $("#bhTable").bhTable().loadData();
            },function () {
                layer.alert("操作失败!",{icon:2});
            });
        });
        $("#qty").inputmask('integer',{ rightAlignNumerics: false});
        $("#price").inputmask('decimal',{ rightAlignNumerics:false,digits: 2});
        $("#bhTable").bhTable({
            url:"listByPage",
            height: 400,
            width:1100,
            columns: [
                {name: 'id',title: "序号",width: 50,key: true, sotrable:true},
                {name: 'code', title: "编码",width: 100,sotrable:true},
                {name: 'name', title: "名称", width: 200, sotrable:true},
                {name: 'categoryName', title: "类别", index: 'categoryName',sortField:'category_code',sotrable:true, width: 100},
                {name: 'price', title: "单价",width: 50, sotrable:true},
                {name: 'qty', title: "库存数量", width: 100, sotrable:true},
                {name: 'description', title: "备注", width: 400, sotrable: false}
            ],
            rowEditColumn:true,
            checkColumn:true,
            searchDiv:$("#gridSearch"),
            buttons:[{tag:"add",show:true,click:function () {
                $("#frmUpdate").bhForm().clear();
                //捕获页
                layer.open({
                    type: 1,
                    skin: 'layui-layer-lan',
                    area: ['550px', '390px'], //宽高
                    shadeClose: false, //显示模态窗口
                    closeBtn:0,
                    resize: false,
                    title: '修改数据', //不显示标题
                    content: $("#dvUpdate"), //捕获的元素
                    btn: ['提交', '取消'],
                    yes: function(index, layero){
                        if($("#frmUpdate").bhForm().validate()){
                            var data = $("#frmUpdate").bhForm().getValue();
                            ajaxPost("saveProduct",data,function (result) {
                                $("#bhTable").bhTable().reLoadData();
                                layer.close(index);
                            },function (result) {
                                if(result.messageId == 'E000001'){
                                    $("#frmUpdate").bhForm().addError(result.data);
                                }else{
                                    layer.alert('保存失败!', {icon: 2});
                                }
                            });
                        }
                    },btn2: function(index, layero){
                        layer.close(index);
                    }
                });
            }},
            {tag:"delete",show:true,click:function (rows) {
                if(rows.length == 0){
                    layer.alert('请选择要删除的记录!', {icon: 1});
                    return;
                };
                var ids=[];
                $.each(rows,function (i,v) {
                   ids.push(v.id);
                });
                layer.confirm('是否确认删除？', {
                    btn: ['Yes', 'No'],icon:"3"
                }, function(index, layero){
                    ajaxPost("deleteByKeys",{data:ids.join(',')},function () {
                        $("#bhTable").bhTable().reLoadData();
                        layer.close(index);
                    },function () {
                        layer.alert('删除失败!', {icon: 2});
                    });
                });
            }},
            {tag:"refresh",show:true}],
            rowButtons:[{tag:"edit",show:true,click:function (row,index) {
                $("#frmUpdate").bhForm().setData(row);
                //捕获页
                layer.open({
                    type: 1,
                    skin: 'layui-layer-lan',
                    area: ['550px', '410px'], //宽高
                    shadeClose: false, //显示模态窗口
                    closeBtn:0,
                    resize: false,
                    title: '修改数据', //不显示标题
                    content: $("#dvUpdate"), //捕获的元素
                    btn: ['提交', '取消'],
                    yes: function(index, layero){
                        if($("#frmUpdate").bhForm().validate()){
                            var data = $("#frmUpdate").bhForm().getValue();
                            ajaxPost("saveProduct",data,function (result) {
                                $("#bhTable").bhTable().reLoadData();
                                layer.close(index);
                            },function (result) {
                                if(result.messageId == 'E000001'){
                                    $("#frmUpdate").bhForm().addError(result.data);
                                }else{
                                    layer.alert('保存失败!', {icon: 2});
                                }
                            });
                        }
                    },btn2: function(index, layero){
                        layer.close(index);
                    }
                });
            }},{tag:"delete",show:true,click:function (row,index) {
                layer.confirm('是否确认删除？', {
                    btn: ['Yes', 'No'],icon:"3"
                }, function(index, layero){
                    ajaxPost("deleteByKeys",{data:row.id},function () {
                        $("#bhTable").bhTable().reLoadData();
                        layer.close(index);
                    },function () {
                        layer.alert('删除失败!', {icon: 2});
                    });
                });
            }}]
        });
    })
</script>
</body>
</html>
