const BaseController = require('./base.controller'),
    UserHandler = require('../handler/user.handler');

const util = require("util");

class UserController extends BaseController {
    constructor() {
        super();
        this._userHandle = new UserHandler();
        this._passport = require('passport');
    }

    get(req, res, next) {
        let responseManager = this._responseManager;
        let that = this;
        this._passport.authenticate('jwt-rs-auth', {
            onVerified: function (token, user) {
                that._userHandle.getUserInfo(req, user, responseManager.getDefaultResponseHandler(res));
            },
            onFailure: function (error) {
                responseManager.respondWithError(res, error.status || 401, error.message);
            }
        })(req, res, next);
    }

    create(req, res) {
        let responseManager = this._responseManager;
        this.authenticate(req, res, () => {
            this._userHandle.createNewUser(req, responseManager.getDefaultResponseHandler(res));
        });
    }

    authenticate(req, res, callback) {
        let responseManager = this._responseManager;
        this._passport.authenticate('secret-key-auth', {
            onVerified: callback,
            onFailure: function (error) {
                responseManager.respondWithError(res, error.status || 401, error.message);
            }
        })(req, res);
    }
}

module.exports = UserController;