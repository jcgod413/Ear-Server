const { userApi, translatorApi } = require('../../app/public');
const { apiResponse } = require('../../http');
const express = require('express');

const router = express.Router();

router.post('/user/verify', apiResponse(userApi.verify))
  .post('/user/login', apiResponse(userApi.login))
  .post('/user/signup', apiResponse(userApi.signup))
  .get('/user/certificate', apiResponse(userApi.certificate))
  .get('/user/verify', apiResponse(userApi.verify));

router.post('/translator/verify', apiResponse(translatorApi.verify))
  .post('/translator/login', apiResponse(translatorApi.login))
  .post('/translator/signup', apiResponse(translatorApi.signup))
  .get('/translator/certificate', apiResponse(translatorApi.certificate))
  .get('/translator/verify', apiResponse(translatorApi.verify));

module.exports = router;
