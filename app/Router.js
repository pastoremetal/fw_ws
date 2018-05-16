﻿module.exports = {
    Router: function () {
        let routes = {
            "SND_LGI": { class: './controllers/SND_LGI', object: null },
            "VLD_APP": { class: './controllers/VLD_APP', object: null}
        };

        this.getController = function (controller) {
            if (routes[controller] != undefined)
                return require(routes[controller].class);
            else
                throw "INVALID CONTROLLER";
        }

        //console.log(routes);
    }
};