const express = require('express');
const route = express.Router();

// gọi service để render EJS
const services = require('../services/render');

// gọi controller để xử lý CRUD với MongoDB
const controller = require('../controller/controller');

// ----------------- View Routes -----------------
route.get('/', services.home);
route.get('/manage', services.manage);
route.get('/dosage', services.dosage);
route.get('/purchase', services.purchase);
route.get('/add-drug', services.addDrug);
route.get('/update-drug', services.updateDrug);

// ----------------- API Routes (CRUD) -----------------
route.post('/api/drugs', controller.create);      // thêm thuốc mới
route.get('/api/drugs', controller.find);         // lấy danh sách thuốc
route.put('/api/drugs/:id', controller.update);   // update thuốc theo id
route.delete('/api/drugs/:id', controller.delete);// xóa thuốc theo id

module.exports = route;
