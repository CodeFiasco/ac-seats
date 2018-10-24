const tokenManager = require('../jwt/tokenManager');

module.exports = {
    init: (server) => {

        server.post('/login', (req, res) => {
            tokenManager.create(req.body, (err, token) => {
                if (err) {
                    return res.status(401).json({
                        error: err.toString()
                    });
                }

                res.json({
                    token: token
                });
            });
        });
    }
}