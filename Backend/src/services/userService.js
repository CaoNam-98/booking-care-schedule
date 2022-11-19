// Service dùng để nhận data từ controller và thao tác xử lý với database
// Hash password
import bcrypt from 'bcryptjs';
// Connect DB
import db from '../models/index';

let handleUserLogin = (email, password) => {
   return new Promise(async(resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                // get info user
                let user = await db.User.findOne({
                    where: { email: email },
                    // Get some field as email, roleId, not get all field
                    attributes: ['email', 'roleId', 'password'],
                    raw: true
                })
                // Why I must check user exist => because user can be deleted while you're checking in database
                if (user) {
                    // User already exist -> compare password
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found~`;
                }
            } else {
                // return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't  exist in your system. Plz try other email !`;
            }
            resolve(userData);
        } catch(e) {
            reject(e);
        }
   })
}

// find user
let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch(e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin
}