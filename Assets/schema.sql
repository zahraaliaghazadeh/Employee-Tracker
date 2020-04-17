DROP database IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
--   roleid INT NOT NULL,
--   managerid INT NOT NULL,
  
--   PRIMARY KEY (employeeid),
--   FOREIGN KEY (roleid),
  roleid INT NOT NULL REFERENCES role(id),
--   I am trying to say here that two or more employees can have one manager to report to
  managerid INT NULL REFERENCES employee(id),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  salary  DECIMAL(10,4) NULL,
--   departmentid INT NOT NULL,
--   FOREIGN KEY (departmentid)
  departmentid INT NOT NULL REFERENCES department(id),
  PRIMARY KEY (id)

);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

