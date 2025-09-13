const Drugdb = require('../model/model');

// ===================== CREATE =====================
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Content cannot be empty!" });
    }

    const drug = new Drugdb({
        name: req.body.name,
        card: req.body.card,
        pack: req.body.pack,
        perDay: req.body.perDay,
        dosage: req.body.dosage
    });

    drug
        .save()
        .then(data => {
            console.log(`${data.name} added to the database`);
            res.status(201).send(data); // trả JSON
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "There was an error while adding the drug"
            });
        });
};

// ===================== READ (FIND) =====================
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;

        Drugdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Cannot find drug with id: " + id });
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving drug with id: " + id });
            });

    } else {
        Drugdb.find()
            .then(drugs => {
                res.send(drugs);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "An error occurred while retrieving drug information"
                });
            });
    }
};

// ===================== UPDATE =====================
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Cannot update with empty data" });
    }

    const id = req.params.id;
    Drugdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Drug with id: ${id} not found` });
            } else {
                res.send(data); // trả JSON đã update
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating drug information" });
        });
};

// ===================== DELETE =====================
exports.delete = (req, res) => {
    const id = req.params.id;

    Drugdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete drug with id: ${id}. Please check id` });
            } else {
                res.send({ message: `${data.name} was deleted successfully!` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete Drug with id=" + id });
        });
};
