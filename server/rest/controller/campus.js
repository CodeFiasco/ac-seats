const tokenManager = require('../jwt/tokenManager');

module.exports = {
    init: (server) => {

        // list campuses
        server.get('/campus', (req, res) => {
            Campus.find({}, 'location', (err, campuses) => {
                res.json(campuses);
            });
        });

        // single campus
        server.get('/campus/:location', (req, res) => {
            Campus.findOne({location: {$regex : new RegExp(req.params.location, "i")}}, (err, campus) => {
                if (!campus) {
                    res.status(404);
                    return res.json({error: 'invalid location'});
                }
                res.json(campus);
            });
        });

        // create campus
        server.post('/campus', tokenManager.validate, (req, res) => {
            if (!req.body.location) {
                return res.status(400).json({error: 'location missing'});
            }

            console.log(req.body);
            const campus = new Campus(req.body);
    
            campus.save((err, c) => {
                res.status(201).json({
                    path: `/campus/${c.location}`
                });
            });
        });
    }
}