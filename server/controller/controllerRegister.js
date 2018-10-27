const fs = require('fs');
const path = require('path');

const controllerDirs = [
    'rest',
    'web'
];

module.exports = {
    load: (server, app) => {

        controllerDirs.forEach(dir => {
            const normalizedPath = path.join(__dirname, dir);

            fs.readdirSync(normalizedPath).forEach((filename) => {
                require(`${normalizedPath}/${filename}`).init(server, app);
            });
        });
    }
}