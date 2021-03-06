let express = require('express');
let router = express.Router();
let axios = require('axios');
let RateLimit = require('express-rate-limit');

let WormholeHTTP = axios.create({
  baseURL: process.env.RPC_BASEURL
});
let username = process.env.RPC_USERNAME;
let password = process.env.RPC_PASSWORD;

let config = {
  transactionRateLimit1: undefined,
  transactionRateLimit2: undefined,
  transactionRateLimit3: undefined,
  transactionRateLimit4: undefined,
  transactionRateLimit5: undefined,
  transactionRateLimit6: undefined,
  transactionRateLimit7: undefined,
  transactionRateLimit8: undefined,
  transactionRateLimit9: undefined,
  transactionRateLimit10: undefined,
  transactionRateLimit11: undefined,
  transactionRateLimit12: undefined,
  transactionRateLimit13: undefined
};

let i = 1;
while(i < 14) {
  config[`transactionRateLimit${i}`] = new RateLimit({
    windowMs: 60000, // 1 hour window
    delayMs: 0, // disable delaying - full speed until the max limit is reached
    max: 60, // start blocking after 60 requests
    handler: function (req, res, /*next*/) {
      res.format({
        json: function () {
          res.status(500).json({ error: 'Too many requests. Limits are 60 requests per minute.' });
        }
      });
    }
  });
  i++;
}

router.get('/', config.transactionRateLimit1, (req, res, next) => {
  res.json({ status: 'transaction' });
});

router.post('/burnBCHGetWHC/:amount', config.transactionRateLimit2, (req, res, next) => {
  let params = [
    parseInt(req.params.amount)
  ];
  if(req.query.redeemAddress) {
    params.push(req.query.redeemAddress);
  }

  WormholeHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_burnbchgetwhc",
      method: "whc_burnbchgetwhc",
      params: params
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/participateCrowdSale/:fromAddress/:toAddress/:amount', config.transactionRateLimit3, (req, res, next) => {
  let params = [
    req.params.fromAddress,
    req.params.toAddress,
    req.params.amount
  ];
  if(req.query.redeemAddress) {
    params.push(req.query.redeemAddress);
  }
  if(req.query.referenceAmount) {
    params.push(req.query.referenceAmount);
  }

  WormholeHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_particrowsale",
      method: "whc_particrowsale",
      params: params
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/send/:fromAddress/:toAddress/:propertyId/:amount', config.transactionRateLimit4, (req, res, next) => {
  let params = [
    req.params.fromAddress,
    req.params.toAddress,
    parseInt(req.params.propertyId),
    req.params.amount
  ];
  if(req.query.redeemAddress) {
    params.push(req.query.redeemAddress);
  }
  if(req.query.referenceAmount) {
    params.push(req.query.referenceAmount);
  }
  WormholeHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_send",
      method: "whc_send",
      params: params
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/all/:fromAddress/:toAddress/:ecosystem', config.transactionRateLimit5, (req, res, next) => {
  let params = [
    req.params.fromAddress,
    req.params.toAddress,
    parseInt(req.params.ecosystem)
  ];
  if(req.query.redeemAddress) {
    params.push(req.query.redeemAddress);
  }
  if(req.query.referenceAmount) {
    params.push(req.query.referenceAmount);
  }
  WormholeHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_sendall",
      method: "whc_sendall",
      params: params
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/changeIssuer/:fromAddress/:toAddress/:propertyId', config.transactionRateLimit6, (req, res, next) => {
  WormholeHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_sendchangeissuer",
      method: "whc_sendchangeissuer",
      params: [
        req.params.fromAddress,
        req.params.toAddress,
        parseInt(req.params.propertyId)
      ]
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/closeCrowdSale/:fromAddress/:propertyId', config.transactionRateLimit7, (req, res, next) => {
  WormholeHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_sendclosecrowdsale",
      method: "whc_sendclosecrowdsale",
      params: [
        req.params.fromAddress,
        parseInt(req.params.propertyId)
      ]
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/grant/:fromAddress/:toAddress/:propertyId/:amount', config.transactionRateLimit8, (req, res, next) => {
  let params = [
    req.params.fromAddress,
    req.params.toAddress,
    parseInt(req.params.propertyId),
    req.params.amount
  ];
  if(req.query.memo) {
    params.push(req.query.memo);
  }
  WormholeHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_sendgrant",
      method: "whc_sendgrant",
      params: params
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/crowdSale/:fromAddress/:ecosystem/:propertyPrecision/:previousId/:category/:subcategory/:name/:url/:data/:propertyIdDesired/:tokensPerUnit/:deadline/:earlyBonus/:undefine/:totalNumber', config.transactionRateLimit9, (req, res, next) => {
  WormholeHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_sendissuancecrowdsale",
      method: "whc_sendissuancecrowdsale",
      params: [
        req.params.fromAddress,
        parseInt(req.params.ecosystem),
        parseInt(req.params.propertyPrecision),
        parseInt(req.params.previousId),
        req.params.category,
        req.params.subcategory,
        req.params.name,
        req.params.url,
        req.params.data,
        parseInt(req.params.propertyIdDesired),
        req.params.tokensPerUnit,
        parseInt(req.params.deadline),
        parseInt(req.params.earlyBonus),
        parseInt(req.params.undefine),
        req.params.totalNumber
      ]
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/fixed/:fromAddress/:ecosystem/:propertyPrecision/:previousId/:category/:subcategory/:name/:url/:data/:totalNumber', config.transactionRateLimit1, (req, res, next) => {
  WormholeHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_sendissuancefixed",
      method: "whc_sendissuancefixed",
      params: [
        req.params.fromAddress,
        parseInt(req.params.ecosystem),
        parseInt(req.params.propertyPrecision),
        parseInt(req.params.previousId),
        req.params.category,
        req.params.subcategory,
        req.params.name,
        req.params.url,
        req.params.data,
        req.params.totalNumber
      ]
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/managed/:fromAddress/:ecosystem/:propertyPrecision/:previousId/:category/:subcategory/:name/:url/:data', config.transactionRateLimit10, (req, res, next) => {
  WormholeHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_sendissuancemanaged",
      method: "whc_sendissuancemanaged",
      params: [
        req.params.fromAddress,
        parseInt(req.params.ecosystem),
        parseInt(req.params.propertyPrecision),
        parseInt(req.params.previousId),
        req.params.category,
        req.params.subcategory,
        req.params.name,
        req.params.url,
        req.params.data
      ]
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/rawTx/:fromAddress/:rawTransaction', config.transactionRateLimit11, (req, res, next) => {
  let params = [
    req.params.fromAddress,
    req.params.rawTransaction
  ];
  if(req.query.referenceAddress) {
    params.push(req.query.referenceAddress);
  }
  if(req.query.redeemAddress) {
    params.push(req.query.redeemAddress);
  }
  if(req.query.referenceAmount) {
    params.push(req.query.referenceAmount);
  }
  WormholeHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_sendrawtx",
      method: "whc_sendrawtx",
      params: params
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/revoke/:fromAddress/:propertyId/:amount', config.transactionRateLimit12, (req, res, next) => {
  let params = [
    req.params.fromAddress,
    parseInt(req.params.propertyId),
    req.params.amount
  ];
  if(req.query.memo) {
    params.push(req.query.memo);
  }

  console.log(params)
  WormholeHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_sendrevoke",
      method: "whc_sendrevoke",
      params: params
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

router.post('/STO/:fromAddress/:propertyId/:amount', config.transactionRateLimit13, (req, res, next) => {
  let params = [
    req.params.fromAddress,
    parseInt(req.params.propertyId),
    req.params.amount
  ];
  if(req.query.redeemAddress) {
    params.push(req.query.redeemAddress);
  }
  if(req.query.distributionProperty) {
    params.push(parseInt(req.query.distributionProperty));
  }
  WormholeHTTP({
    method: 'post',
    auth: {
      username: username,
      password: password
    },
    data: {
      jsonrpc: "1.0",
      id:"whc_sendsto",
      method: "whc_sendsto",
      params: params
    }
  })
  .then((response) => {
    res.json(response.data.result);
  })
  .catch((error) => {
    res.send(error.response.data.error.message);
  });
});

module.exports = router;
