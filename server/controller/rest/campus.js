const tokenManager = require('../../jwt/tokenManager');
const CAMPUS_API_ROOT = '/api/campus';

function ignoreCase(str) {
    return {$regex : new RegExp(str, "i")};
}

module.exports = {
    init: (server) => {

        // list campus
        server.get(CAMPUS_API_ROOT, (req, res) => {
            Campus.find({}, 'location', (err, campuses) => {
                res.json(campuses);
            });
        });

        // create campus
        server.post(CAMPUS_API_ROOT, tokenManager.validate, (req, res) => {
            if (!req.body.location) {
                return res.status(400).json({error: 'location missing'});
            }
            
            const campus = new Campus(req.body);
            
            campus.save((err, c) => {
                if (err) {
                    return res.status(500).json({error: 'error creating campus'})
                }

                res.status(201).json({
                    path: `/campus/${c.location}`
                });
            });
        });

        // list bootcamp cadets
        server.get(`${CAMPUS_API_ROOT}/:location/cadet`, tokenManager.validate, (req, res) => {
            Campus.findOne({location: ignoreCase(req.params.location)}, (err, campus) => {
                if (!campus) {
                    return res.status(404).json({error: 'invalid location'});
                }

                res.json(campus);
            });
        });

        // create cadet related to campus
        server.post(`${CAMPUS_API_ROOT}/:location/cadet`, tokenManager.validate, (req, res) => {
            Campus.findOne({location: ignoreCase(req.params.location)}, (err, campus) => {
                if (!campus) {
                    return res.status(404).json({error: 'invalid location'});
                }

                const cadet = new Cadet(req.body);
                campus.cadets.push(cadet);

                campus.save((err) => {
                    if (err) {
                        return res.status(500).json({error: 'error persisting changes'})
                    }

                    res.status(201).send();
                });
            });
        });

        // update campus cadet list
        server.put(`${CAMPUS_API_ROOT}/:location/cadet`, tokenManager.validate, (req, res) => {
            if (!req.body.cadets) {
                return res.status(400).json({error: 'invalid request'});
            }

            Campus.findOne({location: ignoreCase(req.params.location)}, (err, campus) => {
                if (!campus) {
                    return res.status(404).json({error: 'invalid location'});
                }

                campus.cadets = req.body.cadets;

                campus.save(() => {
                    res.status(201).send();
                });
            });
        });
    }
}