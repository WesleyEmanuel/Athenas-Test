const { Model, DataTypes } = require("sequelize");

class Person extends Model {
  static init(sequelize) {
    super.init(
      {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        adress_name: DataTypes.STRING,
        gender: DataTypes.STRING,
        birthday: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Person;
