'use strict';

var uri = '/app/common/scripting/scriptrecord.nl';

exports.URI = {
    scriptrecord: uri,
    suitelet: uri,
    restlet: '/app/site/hosting/restlet.nl'
};

exports.port = process.env.PORT || 3030;