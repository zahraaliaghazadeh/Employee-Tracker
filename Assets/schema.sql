DROP database IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  salary  DECIMAL(10,4) NULL,
  departmentid INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (departmentid) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  roleid INT NOT NULL,
  managerid INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(roleid) REFERENCES role(id),
 FOREIGN KEY (managerid) REFERENCES employee(id)
  
);
