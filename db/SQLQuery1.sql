/*
CREATE DATABASE db_introweb

use db_introweb

create table usuarios
(
	id int IDENTITY(1,1) primary key,
	name varchar (100) not null,
	email varchar (100) unique,
	password varchar(256) not null
);


select * from usuarios

--drop table usuarios


insert into usuarios values('hola','hola@hola', HASHBYTES('MD5', '1234'))


select id,email from usuarios where email='lestertb123@gmail.com' and password=HASHBYTES('MD5', '1234');
select * from usuarios


select id,email,name from usuarios where email='lestertb123@gmail.com' and password=HASHBYTES('MD5', '1234');


CREATE TABLE workflows
(
	id_workflow int primary key,
	id_usuario int,
	name varchar (100),
	description varchar (100),
	creation_date varchar(100)
	foreign key (id_usuario) references usuarios,
);

--drop table workflows

insert into workflows values (1,1,'test11', 'testDescri11', '5/1/2022')
insert into workflows values (5,2,'test555', 'testDescri555', '5/1/2022')

select * from workflows

select id_workflow,name,description, creation_date  from workflows where id_usuario=1
select id_workflow,name,description, creation_date from workflows where id_usuario=2


UPDATE workflows SET name = 'edit1', description = 'edit1' WHERE id_workflow = 16358;


--DELETE FROM table_name WHERE condition;



CREATE TABLE notes
(
	id_auto int IDENTITY(1,1) primary key,
	id_note varchar(10),
	id_workflow int,
	description varchar (200),
	p_top int,
	p_right int,
	p_bottom int,
	p_left int,
	color varchar (20)
	foreign key (id_workflow) references workflows
);

select * from notes

select * from workflows

insert into notes values('1n',19904,'texto',849.689208984375,10,10,10)

--drop table notes

select * from notes where id_workflow = 19904


--delete from notes where id_note = '1n' and id_workflow = 98996


select * from notes where id_workflow = 27594




--update notes set description =  where id_note = '' and id_workflow = ;



CREATE TABLE colsWorkFlow
(
	id_auto int IDENTITY(1,1) primary key,
	id_col int,
	id_workflow int,
	description varchar (200),
	foreign key (id_workflow) references workflows
);

--drop table colsWorkFlow

select * from colsWorkFlow



select distinct id_workflow from colsWorkFlow

*/