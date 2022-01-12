const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Warehouse } = require('../warehouses/warehouses.model');

const inventorysSchema = new Schema({
  name: String,
  desc: { type: String, default: '' },
  createdAt: Date,
  isHidden: Boolean, // delete ~ set isHidden to true and set hiddenDate. (Future: crob job delete hidden job some time after hiddenDate)
  hiddenAt: Date, // undelete ~ set isHidden to false (default: undefined, save db space)
  lastModified: Date,
  warehouses: [
    {
      _id: false, // tell mongoose not to generate _id for this object
      id: { type: Schema.Types.ObjectId, ref: Warehouse.modelName },
    },
  ],
});

inventorysSchema.index(
  {
    name: 'text',
  },
  {
    name: 'textSearch', // search by inventory name (future)
    weights: {
      name: 10,
    }
  }
);

inventorysSchema.virtual('id').get(function () {
  return this._id;
})

inventorysSchema.set('toJSON', {
  virtuals: true, // add virtual field whenever we call toJSON on model
  versionKey: false, // exclude __v
  transform: function (doc, ret, options) {
    delete ret._id;
    return ret;
  },
});

const Inventory = mongoose.model('Inventory', inventorysSchema, 'inventorys');

const validate = (inventory) => {
  const schema = Joi.object({
    name: Joi.string().required(), // name of inventory is a must-have
    desc: Joi.alternatives().try(Joi.string(), null),
    warehouses: Joi.array().items(
      Joi.object({
        id: Joi.string().required(),
      })
    ),
  });

  return schema.validate(inventory);
};

module.exports = {
  Inventory,
  validate,
};
