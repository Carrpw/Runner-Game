// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    // The username cannot be null, must be a proper username before creation, and has to be between 1 & 15 characters.
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
       len: [1, 15]
      }
    },
    // The password cannot be null and has to be between 1 & 15 characters.
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 15]
      }
    },
    score: {
      type: DataTypes.INTEGER
    },
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};
