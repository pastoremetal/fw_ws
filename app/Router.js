module.exports = {
    Router: function () {
        let routes = {
            "SND_LGI": { class: './controllers/SND_LGI', validations: {} },
            "VLD_APP": { class: './controllers/VLD_APP', validations: {} },
            "GET_CNR": { class: './controllers/GET_CNR', validations: {} },
            "SND_INS_CHA": {
                class: './controllers/CHARACTER/SND_INS_CHA', validations: {
                    req_ssn_key: true
                }
            }
        };

        let testValidations = (validations, message, client) => {
            for (i in validations) {
                if (validations[i] === true)
                    switch (i) {
                        case 'req_ssn_key':
                            if (message.ssn_key !== client.getSessionKey())
                                return "WRONG SESSION KEY";
                            break;
                    };
            };
            return true;
        };

        this.getController = function (controller, message, client) {
            if (routes[controller] != undefined) {
                console.log("VALIDATING CONTROLLER");
                let validationRes = testValidations(routes[controller].validations, message, client);
                if (validationRes === true)
                    return require(routes[controller].class);
                else
                    throw validationRes;
            } else
                throw "INVALID CONTROLLER";
        }

        //console.log(routes);
    }
};