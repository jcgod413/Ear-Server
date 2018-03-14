// const _ = require('lodash');
const jwt = require('jsonwebtoken');
const express = require('express');

const router = express.Router();
const { meApi, servicesApi, districtsApi, userApi, translatorApi } = require('../../app/api');
const { apiResponse } = require('../../http');
const config = require('../../config');
const { userAuth } = require('../../auth');

function onlyTranslator(req, res, next) {
  if (req.user.translatorId === undefined) {
    return res.status(403).send({ message: '권한이 없습니다.' });
  }
  next();
}

// onlyTranslator check function

router.get('/me', userAuth, apiResponse(meApi.getMe))
  .put('/me', userAuth, apiResponse(meApi.modify))
  .delete('/me', userAuth, apiResponse(meApi.delete))
  .get('/me/service', userAuth, apiResponse(meApi.getService));

router.get('/user', userAuth, apiResponse(userApi.get))
  .put('/user', userAuth, apiResponse(userApi.modify))
  .delete('/user', userAuth, apiResponse(userApi.delete))
  .get('/user/all', userAuth, apiResponse(userApi.getAll));

router.get('/translator', userAuth, apiResponse(translatorApi.get))
  .put('/translator', userAuth, onlyTranslator, apiResponse(translatorApi.modify))
  .delete('/translator', userAuth, onlyTranslator, apiResponse(translatorApi.delete))
  .get('/translator/all', userAuth, apiResponse(translatorApi.getAll));

router.get('/district', userAuth, apiResponse(districtsApi.get))
  .get('/district/member', userAuth, apiResponse(districtsApi.member))
  .post('/district', userAuth, onlyTranslator, apiResponse(districtsApi.add))
  .delete('/district', userAuth, onlyTranslator, apiResponse(districtsApi.delete))
  .put('/district', userAuth, onlyTranslator, apiResponse(districtsApi.modify));

router.get('/services', userAuth, apiResponse(servicesApi.get))
  .get('/services/find', userAuth, apiResponse(servicesApi.find))
  .post('/services', userAuth, apiResponse(servicesApi.add))
  .delete('/services', userAuth, apiResponse(servicesApi.delete))
  .put('/services', userAuth, apiResponse(servicesApi.modify));

module.exports = router;
