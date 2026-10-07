import * as Yup from 'yup';
import User from '../models/User.js';
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';
class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const { email, password } = request.body;

    const isValid = await schema.isValid(request.body, {
      abortEarly: false,
      strict: true,
    });

    const emailOrPasswordIncorrect = () => {
      return response
        .status(400)
        .json({ error: 'E-mail ou senha incorretos!!!' });
    };

    if (!isValid) {
      emailOrPasswordIncorrect();
    }

    const existinUser = await User.findOne({
      where: {
        email,
      },
    });
    if (!existinUser) {
      emailOrPasswordIncorrect();
    }

    const isPasswordCorrect = await bycrypt.compare(
      password,
      existinUser.password_hash,
    );

    if (!isPasswordCorrect) {
      emailOrPasswordIncorrect();
    }
    const token = jwt.sign(
      { id: existinUser.id, admin: existinUser.admin, name:existinUser.name },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      },
    );
    return response.status(200).json({
      id: existinUser.id,
      name: existinUser.name,
      email: existinUser.email,
      admin: existinUser.admin,
      token,
    });
  }
}
export default new SessionController();
