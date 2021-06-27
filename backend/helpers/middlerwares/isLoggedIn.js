const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { failureHandler } =  require('../response');

exports.auth = async (req, res, next) => {
    try {
        let err;

        const token = req.header('Authorization');

        // check if token is valid and hasn't expired
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({token});

        if (!user){
            err = new Error('Please Register first');
            err.statusCode = 401;
            throw err;
        }

        next();

    } catch (e) {
      failureHandler(res,e.message,e.statusCode);
    }
};
