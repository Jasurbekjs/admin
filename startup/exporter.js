
// Third party packages

const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const express = require("express");
const Joi = require("joi");
const jsonParser = require("body-parser").json();
const config = require("config");

// DAO

const userDAO = require(ROOT_DIR + "/dao/user/userDAO.js");
const clientDAO = require(ROOT_DIR + "/dao/base/clientDAO.js");

//MIDDLEWARE

const auth = require(ROOT_DIR + "/middlewares/auth.js");
const pagExt = require(ROOT_DIR + "/middlewares/paginationExtractor.js");

const isAdmin = require(ROOT_DIR + "/middlewares/roleCheck/isAdmin.js");

//UTIL

const timeParser = require(ROOT_DIR + "/util/timeParser.js");

module.exports = {
	Sequelize, bcrypt, jwt, _, express, Joi, jsonParser, config,

	userDAO, clientDAO,

	auth, pagExt, isAdmin,

	timeParser
}