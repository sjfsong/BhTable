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
                    <h3 class="box-title">简单例子：查询、显示、分页、服务器端排序</h3>
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

<script src="<c:url value="/resources/plugins/jquery/jquery-3.2.1.js" />"></script>
<script src="<c:url value="/resources/plugins/bootstrap/js/bootstrap.min.js" />"></script>
<script src="<c:url value="/resources/dist/js/adminlte.min.js" />"></script>
<script src="<c:url value="/resources/plugins/layer-v3.1.0/layer.js" />"></script>
<script src="<c:url value="/resources/dist/js/bhCheck.js" />"></script>
<script src="<c:url value="/resources/dist/js/bh.js" />"></script>
<script language="JavaScript">
    $(function () {
        $("#btnGetnData").on("click",function () {
            ajaxPost("batchCreateData",null,function () {
                $("#bhTable").bhTable().loadData();
            },function () {
                layer.alert("操作失败!",{icon:2});
            });
        });
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
            searchDiv:$("#gridSearch"),
        });
    })
</script>
</body>
</html>
