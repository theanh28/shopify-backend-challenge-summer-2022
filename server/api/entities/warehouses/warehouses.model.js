const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const warehousesSchema = new Schema({
  name: String,
  address: { type: String, default: '' },
  createdAt: Date,
  isHidden: Boolean, // delete ~ set isHidden to true and set hiddenDate. (Future: crob job delete hidden job some time after hiddenDate)
  hiddenAt: Date, // undelete ~ set isHidden to false (default: undefined, save db space)
  lastModified: Date,
});

warehousesSchema.index(
  {
    name: 'text',
  },
  {
    name: 'textSearch', // search by warehouse name (future)
    weights: {
      name: 10,
    }
  }
);

warehousesSchema.virtual('id').get(function () {
  return this._id;
})

warehousesSchema.set('toJSON', {
  virtuals: true, // add virtual field whenever we call toJSON on model
  versionKey: false, // exclude __v
  transform: function (doc, ret, options) {
    delete ret._id;
    return ret;
  },
});

const Warehouse = mongoose.model('Warehouse', warehousesSchema, 'warehouses');

const validate = (warehouse) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    address: Joi.alternatives().try(Joi.string(), null),
  });

  return schema.validate(warehouse);
};

module.exports = {
  Warehouse,
  validate,
};
