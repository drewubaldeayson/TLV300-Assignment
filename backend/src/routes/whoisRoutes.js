const express = require('express');
const router = express.Router();
const WhoisController = require('../controllers/whoisController');
const requestValidator = require('../middleware/requestValidator');

//WHOIS lookup route to get the domain details
router.post('/whois-lookup', 
    requestValidator(['domainName', 'infoType']),
    WhoisController.lookup
);

module.exports = router;