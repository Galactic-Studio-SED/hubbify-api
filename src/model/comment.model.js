const pool = require("../connection/database");

module.exports = {
  createCommentModel: (setData) => {
    return new Promise((resolve, reject) => {
      pool.query("INSERT INTO comment SET ?", setData, (error, result) => {
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
  getAllCommentModel: () => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM comment", (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },

  getAllOwnCommentModel: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT * FROM comment WHERE userId = ?",
        [id],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  },

  getCommentByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM comment WHERE id = ?`,
        [id],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  },

  getCommentByIdAndUserIdModel: (id, userId) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM comment WHERE id = ? AND userId = ?`,
        [id, userId],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  },

  updateCommentModel: (setData, id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        "UPDATE comment SET ? WHERE id = ?",
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
  deleteCommentModel: (id) => {
    return new Promise((resolve, reject) => {
      pool.query("DELETE FROM comment WHERE id = ?", id, (error, result) => {
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
};
