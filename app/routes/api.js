const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const AIController = require('../controllers/AIController');
const deleteController = require('../controllers/deleteController');
const saveController = require('../controllers/saveController');
const showController = require('../controllers/showController');
const witchController = require('../controllers/witchController');
const upload = multer({ storage: multer.memoryStorage() });
router.get('/show', showController.showController);
router.get('/witch', witchController.witchController);
router.post('/AI', upload.single('image'), AIController.AIController); 
router.get('/save', saveController.saveController);
router.get('/delete', deleteController.deleteController);

module.exports = router;
