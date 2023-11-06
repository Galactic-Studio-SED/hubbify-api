const pool = require("../connection/database");

module.exports = {
  createUserModel: (setData) => {
    return new Promise((resolve, reject) => {
      pool.query("INSERT INTO user SET ?", setData, (error, result) => {
        if (error) {
          return reject(error);
        }
        const newData = {
          id: result.insertId,
          ...setData,
        };
        return resolve(newData);
      });
    });
  },
  getAllUserModel: () => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM user", (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
  getUserByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM user WHERE id = ?`, [id], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
  updateUserModel: (setData, id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        "UPDATE user SET ? WHERE id = ?",
        [setData, id],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          const newData = {
            id,
            ...setData,
          };
          return resolve(newData);
        }
      );
    });
  },
  deleteUserModel: (id) => {
    return new Promise((resolve, reject) => {
      pool.query("DELETE FROM user WHERE id = ?", id, (error, result) => {
        if (error) {
          return reject(error);
        }
        const newData = {
          id,
        };
        return resolve(newData);
      });
    });
  },

  getUserByEmail: async (email) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM user WHERE email = ?`,
        [email],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  },
  updateUserToken: async (id, token) => {
    return new Promise((resolve, reject) => {
      pool.query(
        "UPDATE user SET token = ? WHERE id = ?",
        [token, id],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(token);
        }
      );
    });
  },
};
