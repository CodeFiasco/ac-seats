function ignoreCase(str) {
    return {$regex : new RegExp(str, "i")};
}

module.exports = {
    init: (server, app) => {
        server.get('/campus/:location', (req, res) => {
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