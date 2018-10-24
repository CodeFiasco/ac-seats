const jwt = require('jsonwebtoken');
const adminName = process.env.ADMIN_NAME || 'admin';
const adminPassword = process.env.ADMIN_PASSWORD || 'admin';

const secret = process.env.JWT_SCRET || 'somerandomstring';
const authorizationType = 'Bearer ';

const tokenManager = {
    validate: (req, res, next) => {
        const auth = req.get('Authorization');

        if (!auth || !auth.startsWith(authorizationType)) {
            return res.status(401).send();
        }

        const token = auth.replace(authorizationType, '');

        jwt.verify(token, secret, (err, decoded) => {
            if (err || !decoded.admin) {
                return res.status(401).send();
            }

            next();
        });
    },

    create: (obj, cb) => {
        if (obj.name !== adminName || obj.password !== adminPassword) {
            return cb(new Error('invalid credentials'));
        }

        jwt.sign({admin: true}, secret, cb);
    }
};

module.exports = tokenManager;