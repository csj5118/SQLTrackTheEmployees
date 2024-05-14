const pool = require('../db/db');

const dbhelp = {
  async getAllDepartments() {
    const query = 'SELECT * FROM department';
    const { rows } = await pool.query(query);
    return rows;
  },
  
  async getAllRoles() {
    const query = 'SELECT * FROM role';
    const { rows } = await pool.query(query);
    return rows;
  },
  
  async getAllEmployees() {
    const query = 'SELECT * FROM employee';
    const { rows } = await pool.query(query);
    return rows;
  },

  async addDepartment(departmentName) {
    const query = 'INSERT INTO department (name) VALUES ($1) RETURNING *';
    const values = [departmentName];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async addRole(title, salary, departmentId) {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *';
    const values = [title, salary, departmentId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async addEmployee(firstName, lastName, roleId, managerId) {
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [firstName, lastName, roleId, managerId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async updateEmployeeRole(employeeId, roleId) {
    const query = 'UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *';
    const values = [roleId, employeeId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
};

module.exports = dbhelp;
