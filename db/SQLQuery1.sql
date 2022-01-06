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

*/
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