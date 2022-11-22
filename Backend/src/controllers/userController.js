import userService from '../services/userService';

let handleLogin = async (req, res) => {
    // Check email exist
    // compare password
    // return userInfo
    // access_token: JWT 
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs paramater!'
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    // when userData = undefind => result = {}
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    // Query param => query
    // body => body
    let id = req.query.id; // All, Id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    // console.log(users);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers
}