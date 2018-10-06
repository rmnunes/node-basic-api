
module.exports = function (app) {

    /**
    * Controllers (route handlers).
    */
    const user = require('./user/user.controller');
    
    /**
    * Primary app routes.
    */
    app.use('/user', user);
    
}