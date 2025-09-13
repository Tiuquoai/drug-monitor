const Drugdb = require('../model/model');

// ===================== CREATE =====================
exports.create = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Content cannot be empty!" });
  }

  try {
    // validate đơn giản (có thể tách riêng middleware)
    if (!req.body.name || req.body.name.length < 3) {
      return res.status(400).send({ message: "Drug name must be at least 3 characters" });
    }
    if (req.body.perDay < 1 || req.body.perDay > 90) {
      return res.status(400).send({ message: "perDay must be between 1 and 90" });
    }

    const drug = new Drugdb({
      name: req.body.name,
      card: req.body.card,
      pack: req.body.pack,
      perDay: req.body.perDay,
      dosage: req.body.dosage
    });

    const data = await drug.save();
    console.log(`${data.name} added to the database`);
    res.status(201).send(data); // trả JSON
  } catch (err) {
    res.status(500).send({
      message: err.message || "There was an error while adding the drug"
    });
  }
};

// ===================== READ (FIND) =====================
exports.find = async (req, res) => {
  try {
    if (req.query.id) {
      const id = req.query.id;
      const data = await Drugdb.findById(id);

      if (!data) {
        return res.status(404).send({ message: "Cannot find drug with id: " + id });
      }
      res.send(data);
    } else {
      const drugs = await Drugdb.find();
      res.send(drugs);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "An error occurred while retrieving drug information"
    });
  }
};

// ===================== UPDATE =====================
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Cannot update with empty data" });
  }

  try {
    const id = req.params.id;
    const data = await Drugdb.findByIdAndUpdate(id, req.body, {
      new: true // trả về object sau khi update
    });

    if (!data) {
      return res.status(404).send({ message: `Drug with id: ${id} not found` });
    }
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: "Error updating drug information" });
  }
};

// ===================== DELETE =====================
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Drugdb.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).send({ message: `Cannot delete drug with id: ${id}. Please check id` });
    }
    res.send({ message: `${data.name} was deleted successfully!` });
  } catch (err) {
    res.status(500).send({ message: "Could not delete Drug with id=" + id });
  }
};
