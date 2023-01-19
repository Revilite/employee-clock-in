const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model{
  checkPassword(pw){
    return bcrypt.compare(pw, this.password);
  }
  checkCode(code){
    return bcrypt.compare(code, this.userCode);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,

    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      },
    },
    fullName: {
      type: DataTypes.STRING
    },
    isClockedIn: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    userCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timeClockedIn: {
      type: DataTypes.TIME
    },
    timeClockedOut: {
      type: DataTypes.TIME
    }
  },
  {
    hooks: {
      beforeCreate: async (newUserData) =>{
        newUserData.email = await newUserData.email.toLowerCase();
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        newUserData.userCode = await bcrypt.hash(newUserData.userCode, 10);


        return newUserData
      },
      beforeUpdate: async (updatedUserData) =>{
        updatedUserData.email = await updatedUserData.email.toLowerCase();
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "user"
  }
);

module.exports = User;