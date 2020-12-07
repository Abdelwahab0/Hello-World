const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../util/validators');
const User = require('../../models/User');
const { SECRET_KEY } = require('../../config');

function generateToken(user) {
  return jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username,
  }, SECRET_KEY, { expiresIn: '1h' });
}
module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      const user = await User.findOne({ username });
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('user not found', { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }

      const token = generateToken(user);

      return {
        // eslint-disable-next-line no-underscore-dangle
        ...user._doc,
        id: user.id,
        token,
      };
    },
    // eslint-disable-next-line no-unused-vars
    async register(_,
      {
        registerInput: {
          username, email, password, confirmPassword,
        },
      }) {
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
      const user = await User.findOne({ username });
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        });
      }
      // eslint-disable-next-line no-param-reassign
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);
      return {
        // eslint-disable-next-line no-underscore-dangle
        ...res._doc,
        id: res.id,
        token,
      };
    },
  },
};
