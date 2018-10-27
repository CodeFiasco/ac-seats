
module.exports = {
    init: (server, app) => {
        server.get('/dashboard', (req, res) => {
            Campus.find({}, 'location', (err, campuses) => {
                const page = '/dashboard';
                const queryParams = { campuses };
                app.render(req, res, page, queryParams);
            });
        });
    }
}