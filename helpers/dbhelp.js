const pool = require('./db');

const dbHelpers = {
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
  
  
};

module.exports = dbHelpers;
