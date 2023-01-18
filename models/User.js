const { userInfo } = require("os");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class User extends Model{}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING
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
      type: DataTypes.BOOLEAN
    },
    userCode: {
      type: DataTypes.INTEGER
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