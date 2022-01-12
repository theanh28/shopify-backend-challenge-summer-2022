/**
 * A factory design pattern allows the creation of
 * CRUD routes to be 'automatic'
 *
 * How? Each 'Factory' function grab the express router
 * and plug a corresponding function to it.
 * Ex: GET /inventorys
 * can be built by calling getManyFactory() with model Inventory
 * and suitable functions (checkout ./inventorys/inventorys.route.js)
 *
 * Since CRUD operations between different documents are relatively
 * similar, we can abstractize those steps.
 * => Less code as each CRUD function creation are reusing these
 */
const { model } = require('mongoose');
const { router } = require('../express');
const { PathRegexes } = require('./constants');
const { aqp } = require('./apiHelper');

/**
 * @param {Object} params
 * @param {import('express').IRouter} params.Router
 * @param {import('mongoose').Model} params.model
 * @param {(document: Object) => any } params.transformDocument removes/transforms some fields
 *                                                              from the returned document
 */
const getManyFactory = ({ router, model, transformDocument = () => {} }) => {
  router.get(PathRegexes.ROOT, async (req, res) => {
    const params = req.body;

    try {
      // (future): add 'filter', 'sort', 'search', etc. + query parser
      // parse query step
      const { skip, limit, filter } = aqp(req.query);

      // mongoDb search step
      const docsPromise = model.find(filter).skip(skip).limit(limit).exec();

      // count step (for content range)
      const countPromise = model.countDocuments(filter);

      let [docs, count] = await Promise.all([docsPromise, countPromise]);

      // (future): add getPermission() and others in the function params
      // to facilitate authorization. E.g:
      // if (!getPermission(req.user))
      //    return res.status(401).send({ message: 'Unauthorized' });

      // pagination support step
      res.set({ 'Content-Range': `items ${skip}-${limit}/${count}` });
      res.set('Access-Control-Expose-Headers', 'Content-Range');

      // transform each returned document step
      transformPromises = docs.map((doc) => transformDocument(doc));
      await Promise.all(transformPromises);

      return res.json(docs);
    } catch (err) {
      return res.status(400).send({ message: 'Bad request' });
    }
  });
};

// APIs below follow a similar style of capturing common steps
/**
 * @param {Object} params
 * @param {import('express').IRouter} params.Router
 * @param {import('mongoose').Model} params.model
 * @param {(document: Object) => any } params.transformDocument removes/transforms some fields
 *                                                              from the returned document
 */
const getOneFactory = ({ router, model, transformDocument = () => {} }) => {
  router.get(PathRegexes.ID, async (req, res) => {
    const params = req.body;
    const paramsId = req.path.slice(1);

    try {
      const getOneFilter = { _id: paramsId };

      const doc = await model.findOne(getOneFilter);

      if (!doc || doc.isHidden) {
        return res.status(404).send({ message: 'Not found' });
      }

      await transformDocument(doc);
      return res.json(doc);
    } catch (err) {
      return res.status(400).send({ message: 'Bad request' });
    }
  });
};

/**
 * @param {Object} params
 * @param {import('express').IRouter} params.Router
 * @param {import('mongoose').Model} params.model
 * @param {(params: Object) => ?{ error: String}} params.setDefaultValue
 * @param {(document: Object) => any } params.transformDocument removes/transforms some fields
 *                                                              from the returned document
 */
const postFactory = ({
  router,
  model,
  validate = () => {},
  setDefaultValue = () => {},
  transformDocument = () => {},
}) => {
  router.post(PathRegexes.ROOT, async (req, res) => {
    try {
      const params = req.body;
      const { error: validationError } = validate(params);
      if (validationError) {
        return res
          .status(400)
          .send({ message: errorValidate.details[0].message });
      }

      const currentTimeString = new Date().toISOString();
      params.createdAt = currentTimeString;
      params.lastModified = currentTimeString;

      const newDoc = new model(params);
      setDefaultValue(newDoc);

      const savedDoc = await newDoc.save();
      await transformDocument(savedDoc);
      return res.json(savedDoc);
    } catch (err) {
      res.status(400).send({ message: 'Create failed' });
    }
  });
};

/**
 * @param {Object} params
 * @param {import('express').IRouter} params.Router
 * @param {import('mongoose').Model} params.model
 * @param {(document: Object) => any } params.transformDocument removes/transforms some fields
 *                                                              from the returned document
 */
const hideFactory = ({ router, model, transformDocument = () => {} }) => {
  router.delete(PathRegexes.ID, async (req, res) => {
    const params = req.body;
    const paramsId = req.path.slice(1);

    try {
      const getOneFilter = { _id: paramsId };
      const doc = await model.findOne(getOneFilter);

      if (!doc || doc.isHidden) {
        return res.status(404).send({ message: 'No record' });
      }

      const currentTimeString = new Date().toISOString();

      const updatedDoc = await model.findOneAndUpdate(
        getOneFilter,
        {
          isHidden: true,
          hiddenAt: currentTimeString,
        },
        {
          new: true,
        }
      );

      if (!updatedDoc) {
        return res.status(404).send({ message: 'No record' });
      }

      await transformDocument(updatedDoc);

      return res.json(updatedDoc);
    } catch (err) {
      return res.status(400).send({ message: 'Delete failed' });
    }
  });
};

/**
 * @param {Object} params
 * @param {import('express').IRouter} params.Router
 * @param {import('mongoose').Model} params.model
 * @param {(document: Object) => any } params.transformDocument removes/transforms some fields
 *                                                              from the returned document
 */
const putFactory = ({
  router,
  model,
  validate = () => {},
  transformDocument = () => {},
}) => {
  router.put(PathRegexes.ID, async (req, res) => {
    const params = req.body;
    const paramsId = req.path.slice(1);

    try {
      const { error: validationError } = validate(params);
      if (validationError) {
        return res
          .status(400)
          .send({ message: validationError.details[0].message });
      }
      const getOneFilter = { _id: paramsId };
      const doc = await model.findOne(getOneFilter);

      if (!doc) {
        return res.status(404).send({ message: 'No record' });
      }

      const currentTimeString = new Date().toISOString();
      params.lastModified = currentTimeString;

      const updatedDoc = await model.findOneAndUpdate(getOneFilter, params, {
        new: true,
      });

      if (!updatedDoc) {
        return res.status(404).send({ message: 'No record' });
      }
      await transformDocument(updatedDoc);
      return res.json(updatedDoc);
    } catch (err) {
      return res.status(400).send({ message: 'Update failed' });
    }
  });
};

module.exports = {
  getManyFactory,
  getOneFactory,
  hideFactory,
  postFactory,
  putFactory,
};
