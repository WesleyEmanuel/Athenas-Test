const Person = require("../models/Person");

module.exports = {
  async store(req, resp) {
    const { first_name, last_name, adress_name, gender, birthday } = req.body;

    const person = await Person.create({
      first_name,
      last_name,
      adress_name,
      gender,
      birthday,
    });

    return resp.status(201).json(person);
  },

  async index(req, resp) {
    const persons = await Person.findAll();
    return resp.status(200).json({ persons });
  },
};
