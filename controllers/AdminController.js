const {Admin} = require('../models');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {sendSuccessResponse, sendUnauthorizedResponse, sendCatchResponse, sendValidationResponse} = require("../helper/responseHelper");
const accessTokenSecret = process.env.SECRET_TOKEN || 'youraccesstokensecret';
const tokenValidationTime = process.env.TOKEN_VALIDATION_TIME;
const { body,validationResult} = require('express-validator');
const CryptoJS = require("crypto-js");
const {use} = require("express/lib/router");

exports.validate = (method) => {
    switch (method) {
        case 'login': {
            return [
                body('email').not().isEmpty(),
                body('password').not().isEmpty()
            ]
        }
        case 'registration': {
            return [
                body('name').not().isEmpty(),
                body('email').not().isEmpty(),
                body('password').not().isEmpty()
            ]
        }
    }
}

exports.login = async (req, res) => {

    try {
        const errors = validationResult(req);
        const { email, password } = req.body;

        if (!errors.isEmpty()) {
            return sendValidationResponse(res, errors);
        }

        let user = await Admin.findOne({
            raw: true,
            where: {
                email: email,
                status: 1
            }
        });

        user = user.toObject();

        var hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_TOKEN);

        let dbPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (user && (dbPassword === password)) {

            // Generate an access token
            user.token = jwt.sign({
                id: user._id,
                email: user.email,
                role: 'admin',
                createdAt: user.createdAt
            }, accessTokenSecret, {expiresIn: tokenValidationTime});

            delete user.password;
            delete user.__v;

            return sendSuccessResponse(res,"Login successfully", user)
        } else {
            return sendUnauthorizedResponse(res,{})
        }
    } catch (err) {
        console.log(err);
        return sendCatchResponse(res, err)
    }
}


exports.register = async (req, res) => {

    try {
        const errors = validationResult(req);
        const { name, email, password } = req.body;

        if (!errors.isEmpty()) {
            return sendValidationResponse(res, errors);
        }

        // Create user in our database
        let user = await Admin.create({
            name: name,
            email: email.toLowerCase(),
            emailVerifiedAt: new Date(),
            status: "active",
            password: CryptoJS.AES.encrypt(
              password,
              process.env.SECRET_TOKEN
            ).toString(),
        });

        user = user.toObject();

        delete user.password;
        delete user.__v;

        // Create token
        user.token = jwt.sign(
          {
              id: user._id,
              email: user.email,
              role: 'admin',
              createdAt: user.createdAt
          },
          accessTokenSecret,
          {
              expiresIn: tokenValidationTime,
          }
        );

        return sendSuccessResponse(res,"Registered successfully", user)
    } catch (err) {
        return sendCatchResponse(res, err)
    }
}