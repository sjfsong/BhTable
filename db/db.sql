CREATE DATABASE `bhtable` CHARACTER SET utf8 COLLATE utf8_general_ci;
drop table if exists `product`;
create table `product`(
  	`id` int(11) NOT NULL AUTO_INCREMENT comment '序号',
	`code` varchar(64) not null comment '商品编码',
	`category_code` varchar(10) not null comment '商品类别编码',
	`name` nvarchar(100) not null comment '商品名称',
	`price` decimal(8,2) not null comment '单价',
	`qty` int not null comment '库存数量',
	`description` nvarchar(100) comment '描述',
	`create_time` datetime null comment '创建时间',
	`update_time` datetime null comment '修改时间',
	primary key(`id`)
)  DEFAULT CHARSET=utf8 comment '商品表';
drop table if exists `product_category`;
create table `product_category`(
  	`id` int(11) NOT NULL AUTO_INCREMENT comment '序号',
	`code` varchar(10) not null comment '类别编码',
	`name` nvarchar(100) not null comment '类别名称',
	`description` nvarchar(100) comment '描述',
	`create_time` datetime null comment '创建时间',
	`update_time` datetime null comment '修改时间',
	primary key(`id`)
) DEFAULT CHARSET=utf8 comment '商品类别';
drop table if exists `userinfo`;
create table `userinfo`(
  	`id` int(11) NOT NULL AUTO_INCREMENT comment '序号',
	`user_name` varchar(20) not null comment '用户名',
	`password` varchar(20) not null comment '密码',
	`name` nvarchar(50) not null comment '姓名',
	`description` nvarchar(100) comment '描述',
	`last_login_time` datetime null comment '最后登录时间',
	`last_login_id` varchar(15) null comment '最后登录IP',
	`create_time` datetime null comment '创建时间',
	`update_time` datetime null comment '修改时间',
	primary key(`id`)
) DEFAULT CHARSET=utf8  comment '用户表';