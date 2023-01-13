const { where, Op } = require("sequelize");
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
    const { search } = req.params;

    if (!search) {
      const persons = await Person.findAll();
      return resp.status(200).json({ persons });
    } else {
      const person = await Person.findAll({
        where: {
          first_name: { [Op.like]: `%${search}%` },
        },
      });
      if (!person) {
        return resp.status(204).json({ error: "Person not found" });
      }
      return resp.status(200).json(person);
    }
  },

  async update(req, resp) {
    const { id } = req.params;
    const { first_name, last_name, adress_name, gender, birthday } = req.body;

    const person = await Person.findByPk(id);

    if (!person) {
      return resp.status(204).json({ error: "Person not found" });
    } else {
      const result = await Person.update(
        {
          first_name,
          last_name,
          adress_name,
          gender,
          birthday,
        },
        {
          where: {
            id,
          },
        }
      );
      return resp.status(200).json({
        message: "Person updated successfully",
        personId: result,
      });
    }
  },

  async delete(req, resp) {
    const { id } = req.params;

    const person = await Person.findByPk(id);

    if (!person) {
      return resp.status(204).json({ message: "Person not found" });
    }

    const result = await Person.destroy({
      where: {
        id,
      },
    });

    return resp.status(200).json(result);
  },
};
