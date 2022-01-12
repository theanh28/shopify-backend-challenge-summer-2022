const router = require('express').Router();

/**
 * Now, instead of the usual API creation, we automate/try to reuse code by applying
 * factory design pattern. Since CRUD operations are similar among different documents
 * in a project, we can capture some common steps (get query and params from request, 
 * turn variables into MongoDB-like syntax, create new document instance, etc.) and put
 * them into these Factory functions. Follow them to see more details.
 */
const {
  getManyFactory,
  getOneFactory,
  hideFactory,
  postFactory,
  putFactory,
} = require('../../apiFactory');
const { aqp } = require('../../apiHelper');

// (future): add middlewares for authentication, roles (admin, users, ...)

const { Inventory, validate } = require('./inventorys.model');

const internalField = ['isHidden', 'hiddenAt'];

const transformDocument = async (doc) => {
  for (field in doc) {
    if (internalField.includes(field)) {
      doc[field] = undefined;
    }
  }
};

// Now we create CRUD APIs using the factory functions
getManyFactory({ router, model: Inventory, transformDocument });
getOneFactory({ router, model: Inventory, transformDocument });
hideFactory({ router, model: Inventory, transformDocument });
postFactory({ router, model: Inventory, validate, transformDocument });
putFactory({ router, model: Inventory, validate, transformDocument });

// Custom route
router.get('/count', async (req, res) => {
  try {
    const {skip, limit, filter} = aqp(req.query);

    countPromise = Inventory.find(filter).skip(skip).limit(limit).count().exec();

    const count = await countPromise;

    return res.json(count);
  } catch (err) {
    return res.status(400).send({ message: 'Bad request' });
  }
});

module.exports = router;
