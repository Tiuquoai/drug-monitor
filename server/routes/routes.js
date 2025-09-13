const express = require('express');
const router = express.Router();

// gọi service để render EJS views
const services = require('../services/render');

// gọi controller để xử lý CRUD với MongoDB
const controller = require('../controller/controller');

// ----------------- View Routes -----------------
// Home page
router.get('/', services.home);

// Quản lý thuốc
router.get('/manage', services.manage);

// Xem liều dùng hằng ngày
router.get('/dosage', services.dosage);

// Tính toán mua thuốc
router.get('/purchase', services.purchase);

// Form thêm thuốc
router.get('/add-drug', services.addDrug);

// Form update thuốc
router.get('/update-drug', services.updateDrug);

// ----------------- API Routes (CRUD) -----------------
// Create
router.post('/api/drugs', controller.create);

// Read (all hoặc by id query)
router.get('/api/drugs', controller.find);

// Update by id
router.put('/api/drugs/:id', controller.update);

// Delete by id
router.delete('/api/drugs/:id', controller.delete);

module.exports = router;


