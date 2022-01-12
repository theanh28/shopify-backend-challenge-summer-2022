const router = require('express').Router();

const {
  getManyFactory,
  getOneFactory,
  hideFactory,
  postFactory,
  putFactory,
} = require('../../apiFactory');
const { aqp } = require('../../apiHelper');

// (future): add middlewares for authentication, roles (admin, users, ...)

const { Warehouse, validate } = require('./warehouses.model');

const allowedReturnFields = ['name', 'address', 'id', 'lastModified'];

const transformDocument = async (doc) => {
  for (const field in Object.keys(doc)) {
    if (!allowedReturnFields.includes(field)) {
      doc[field] = undefined;
    }
  }
};

// Now we create CRUD APIs using the factory functions
getManyFactory({router, model: Warehouse, transformDocument});
getOneFactory({router, model: Warehouse, transformDocument});
hideFactory({router, model: Warehouse, transformDocument});
postFactory({router, model: Warehouse, validate, transformDocument})
putFactory({router, model: Warehouse, validate, transformDocument});

// Custom route
router.get('/count', async (req, res) => {
  try {
    const {skip, limit, filter} = aqp(req.query);
    
    countPromise = Warehouse.find(filter).skip(skip).limit(limit).count().exec();

    const count = await countPromise;

    return res.json(count);
  } catch (err) {
    return res.status(400).send({ message: 'Bad request' });
  }
});

module.exports = router;
