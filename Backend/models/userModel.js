module.exports = (sequelize, DataTypes) => {
    const userSchema = sequelize.define("userSchema", {
        firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return userSchema;
  };