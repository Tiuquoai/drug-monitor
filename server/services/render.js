const axios = require('axios'); // HTTP client để gọi API
const PORT = process.env.PORT || 3100;
const BASE_URI = process.env.BASE_URI || 'http://localhost';

// ================= Trang chủ =================
exports.home = (req, res) => {
  res.render('index', { title: 'Home' });
};

// ================= Thêm thuốc =================
exports.addDrug = (req, res) => {
  res.render('add_drug', { title: 'Add Drug' });
};

// ================= Cập nhật thuốc =================
exports.updateDrug = (req, res) => {
  axios.get(`${BASE_URI}:${PORT}/api/drugs`, { params: { id: req.query.id } })
    .then((response) => {
      res.render('update_drug', {
        drug: response.data,
        title: 'Edit Drug'
      });
    })
    .catch((err) => {
      console.error('Error fetching drug for update:', err.message);
      res.status(500).send('Error loading update drug form');
    });
};

// ================= Quản lý thuốc =================
exports.manage = (req, res) => {
  axios.get(`${BASE_URI}:${PORT}/api/drugs`)
    .then((response) => {
      res.render('manage', {
        drugs: response.data,
        title: 'Manage drug info'
      });
    })
    .catch((err) => {
      console.error('Error fetching drugs for manage:', err.message);
      res.status(500).send('Error loading manage page');
    });
};

// ================= Kiểm tra liều dùng =================
exports.dosage = (req, res) => {
  axios.get(`${BASE_URI}:${PORT}/api/drugs`)
    .then((response) => {
      res.render('dosage', {
        drugs: response.data,
        title: 'Check Dosage'
      });
    })
    .catch((err) => {
      console.error('Error fetching drugs for dosage:', err.message);
      res.status(500).send('Error loading dosage page');
    });
};

// ================= Mua thuốc =================
exports.purchase = (req, res) => {
  axios.get(`${BASE_URI}:${PORT}/api/drugs`)
    .then((response) => {
      res.render('purchase', {
        drugs: response.data,
        title: 'Purchase Drugs'
      });
    })
    .catch((err) => {
      console.error('Error fetching drugs for purchase:', err.message);
      res.status(500).send('Error loading purchase page');
    });
};
