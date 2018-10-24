const tokenManager = require('../jwt/tokenManager');

module.exports = {
    init: (server, app) => {

        
        // list campuses
        server.get('/campus', (req, res) => {
            Campus.find({}, 'location', (err, campuses) => {
                res.json(campuses);
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

        server.get('/:location', (req, res) => {
            Campus.findOne({location: {$regex : new RegExp(req.params.location, "i")}}, (err, campus) => {
                if (!campus) {
                    return app.render(req, res, '/index');
                }

                const page = '/room';
                const queryParams = { campus };
                app.render(req, res, page, queryParams);
            });
        });
    }
}