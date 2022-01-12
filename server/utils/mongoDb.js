const mongoose = require('mongoose');
const { Inventory } = require('../api/entities/inventorys/inventorys.model');
const { Warehouse } = require('../api/entities/warehouses/warehouses.model');

let cachedDb;

const connectToDatabase = (connectionString) => {
  if (
    cachedDb &&
    cachedDb.connections &&
    cachedDb.connections[0] &&
    cachedDb.connections[0].readyState
  ) {
    // using existing db connection
    return Promise.resolve();
  }

  return (
    mongoose
      .connect(connectionString)
      .then((db) => {
        cachedDb = db;
        // init index for searching (future)
        return Promise.all([
          Inventory.init(),
          Warehouse.init(),
        ])
      }).then(() => {
        return cachedDb;
      })
  )
}

module.exports = {
  connectDb: connectToDatabase,
}