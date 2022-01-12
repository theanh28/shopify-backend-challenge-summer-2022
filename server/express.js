const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50MB' }));

const inventorysRoute = require('./api/entities/inventorys/inventorys.route');
const warehousesRoute = require('./api/entities/warehouses/warehouses.route');

// express router routes to different APIs group based on document type
app.use('/inventorys', inventorysRoute);
app.use('/warehouses', warehousesRoute);

module.exports = app;