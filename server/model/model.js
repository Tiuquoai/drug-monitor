const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // bỏ khoảng trắng thừa
        // unique: true   // ⚠ nếu bạn muốn tên thuốc không trùng thì mới bật
    },
    dosage: {
        type: String,
        required: true,
        trim: true
    },
    card: {
        type: Number,
        required: true,
        min: 1
    },
    pack: {
        type: Number,
        required: true,
        min: 1
    },
    perDay: {
        type: Number,
        required: true,
        min: 1,
        max: 90 // giới hạn theo yêu cầu middleware
        // ❌ KHÔNG để unique
    }
}, {
    timestamps: true // tự động thêm createdAt & updatedAt
});

const DrugDB = mongoose.model('drugs', schema);

module.exports = DrugDB;
