const pool = require("../connection/database");

module.exports = {
  createCommentModel: (setData) => {
    return new Promise((resolve, reject) => {
      pool.query("INSERT INTO comment SET ?", setData, (error, result) => {
        if (error) {
          return reject(error);
        }

        const newCommentId = setData.id;

        // Second query: Get the complete comment information with the user's name and date
        pool.query(
          "SELECT comment.id AS comment_id, comment.content, comment.created_at AS comment_created_at, comment.updated_at AS comment_updated_at, " +
            "user.id AS user_id, user.username " +
            "FROM comment " +
            "JOIN user ON comment.userId = user.id " +
            "WHERE comment.id = ?",
          [newCommentId],
          (error, resultWithUserInfo) => {
            if (error) {
              return reject(error);
            }

            const newData = {
              ...resultWithUserInfo[0], // Use the first result of the second query
            };

            return resolve(newData);
          }
        );
      });
    });
  },
  getAllCommentModel: () => {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT comment.id AS comment_id, comment.content, comment.created_at AS comment_created_at, comment.updated_at AS comment_updated_at, " +
          "user.id AS user_id, user.username " +
          "FROM comment " +
          "JOIN user ON comment.userId = user.id " +
          "ORDER BY comment.created_at DESC",

        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  },

  getAllOwnCommentModel: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT comment.id AS comment_id, comment.content, comment.created_at AS comment_created_at, comment.updated_at AS comment_updated_at, " +
          "user.id AS user_id, user.username " +
          "FROM comment " +
          "JOIN user ON comment.userId = user.id " +
          "WHERE comment.userId = ? " +
          "ORDER BY comment.created_at DESC",
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
