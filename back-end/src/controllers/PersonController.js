const { where, Op } = require("sequelize");
const Person = require("../models/Person");

module.exports = {
  async store(req, resp) {
    const { first_name, last_name, adress_name, gender, birthday } = req.body;

    const person = await Person.create({
      first_name: first_name.toLowerCase(),
      last_name: last_name.toLowerCase(),
      adress_name: adress_name.toLowerCase(),
      gender: gender.toLowerCase(),
      birthday,
    });

    return resp.status(201).json(person);
  },

  async index(req, resp) {
    function capitalized(str) {
      return str[0].toUpperCase() + str.substr(1);
    }
    const { search } = req.params;

    if (!search) {
      const persons = await Person.findAll();
      return resp.status(200).json({
        persons: persons.map((person) => {
          return {
            id: person.id,
            first_name: capitalized(person.first_name),
            last_name: capitalized(person.last_name),
            adress_name: capitalized(person.adress_name),
            gender: capitalized(person.gender),
            birthday: person.birthday,
          };
        }),
      });
    } else {
      const person = await Person.findAll({
        where: {
          first_name: { [Op.like]: `%${search.toLowerCase()}%` },
        },
      });
      if (!person) {
        return resp.status(204).json({ error: "Person not found" });
      }
      return resp.status(200).json(
        person.map((person) => {
          return {
            id: person.id,
            first_name: capitalized(person.first_name),
            last_name: capitalized(person.last_name),
            adress_name: capitalized(person.adress_name),
            gender: capitalized(person.gender),
            birthday: person.birthday,
          };
        })
      );
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
          first_name: first_name.toLowerCase(),
          last_name: last_name.toLowerCase(),
          adress_name: adress_name.toLowerCase(),
          gender: gender.toLowerCase(),
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
