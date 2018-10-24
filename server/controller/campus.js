const tokenManager = require('../jwt/tokenManager');

function ignoreCase(str) {
    return {$regex : new RegExp(str, "i")};
}

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

        // create cadet related to campus
        server.post('/campus/:location/cadet', (req, res) => {
            Campus.findOne({location: ignoreCase(req.params.location)}, (err, campus) => {
                const cadet = new Cadet(req.body);
                campus.cadets.push(cadet);

                cadet.save(() => {
                    campus.save((err, updatedModel) => {
                        res.status(201).send();
                    });
                });
            });
        });

        server.get('/:location', (req, res) => {
            Campus.findOne({location: ignoreCase(req.params.location)}, (err, campus) => {
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