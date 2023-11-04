const helper = require("../helper/response.helper");
const {
    createUserModel,
    getAllUserModel,
    getUserByIdModel,
    updateUserModel,
    deleteUserModel,
} = require("../model/user.model");

module.exports = {
    createUser: async (req, res) => {
        try {
            const bodyData = JSON.parse(Object.keys(req.body)[0]);
            const { username, email, password, phone } = bodyData;

            const setData = {
                username,
                email,
                password,
                phone
            };

            const result = await createUserModel(setData);
            return helper.response(res, 200, "Success create user", result);
        } catch (error) {
            return helper.response(res, 400, "Bad Request", error);
        }
    },
    getAllUser: async (req, res) => {
        try {
            const result = await getAllUserModel();
            return helper.response(res, 200, "Success get all user", result);
        } catch (error) {
            return helper.response(res, 400, "Bad Request", error);
        }
    },
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await getUserByIdModel(id);

            if (result.length > 0) {
                return helper.response(
                    res,
                    200,
                    `Success get user by id ${id}`,
                    result
                );
            } else {
                return helper.response(
                    res,
                    404,
                    `User by id ${id} not found`,
                    null
                );
            }
        } catch (error) {
            return helper.response(res, 400, "Bad Request", error);
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const bodyData = JSON.parse(Object.keys(req.body)[0]);
            const { username, email, password, phone } = bodyData;

            const setData = {
                username,
                email,
                password,
                phone,
            };

            const checkId = await getUserByIdModel(id);
            if (checkId.length > 0) {
                const result = await updateUserModel(setData, id);
                return helper.response(
                    res,
                    200,
                    `Success update user by id ${id}`,
                    result
                );
            } else {
                return helper.response(
                    res,
                    404,
                    `User by id ${id} not found`,
                    null
                );
            }
        } catch (error) {
            return helper.response(res, 400, "Bad Request", error);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const checkId = await getUserByIdModel(id);
            if (checkId.length > 0) {
                const result = await deleteUserModel(id);
                return helper.response(
                    res,
                    200,
                    `Success delete user by id ${id}`,
                    result
                );
            } else {
                return helper.response(
                    res,
                    404,
                    `User by id ${id} not found`,
                    null
                );
            }
        } catch (error) {
            return helper.response(res, 400, "Bad Request", error);
        }
    },
};
