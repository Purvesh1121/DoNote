import bcrypt from "bcrypt";
import config from "../config";
import { ICreateUser, ILoginUser } from "../types/auth";
import { DatabaseSource } from "../loaders/database";
import { User } from "../entity/User";
import { DEFAULT_MESSAGES } from "../utils/constants";
import { createResponse } from "../utils/response";
import LoggerModule from "../loaders/logger";
import jwt from "jsonwebtoken";
const { jwtSecret, jwtExpiresIn, saltRounds } = config;
const Logger = LoggerModule("Auth_Service");

// repositories
const userRepository = DatabaseSource.getRepository(User);

export const signup = async (signupData: ICreateUser) => {
  try {
    // create password hash
    const hash = await bcrypt.hash(signupData?.password, saltRounds);

    const user = new User();
    user.firstname = signupData?.firstname;
    user.lastname = signupData?.lastname;
    user.email = signupData?.email;
    user.password = hash;

    const savedUser = await userRepository.save(user);
    return createResponse(true, DEFAULT_MESSAGES.SUCCESSFUL, savedUser);
  } catch (error) {
    Logger.error(error);
    return createResponse(
      false,
      error?.message || DEFAULT_MESSAGES.INTERNAL_ERR
    );
  }
};

export const login = async (loginData: ILoginUser) => {
  try {
    // check if user exists with given email
    const { email, password } = loginData;
    const existingUser = await userRepository.findOneBy({ email });

    if (!existingUser) {
      return createResponse(false, DEFAULT_MESSAGES.USER_NOT_FOUND);
    }
    // check password and generate jwt
    const match = await comparePassword(password, existingUser?.password);
    if (!match) {
      Logger.error("Password match failed");
      return createResponse(false, DEFAULT_MESSAGES.INVALID_CREDENTIALS);
    }

    const payload = {
      userId: existingUser?.userId,
    };

    const accessToken = jwt.sign(payload, jwtSecret, {
      expiresIn: jwtExpiresIn,
    });
    return createResponse(true, DEFAULT_MESSAGES.SUCCESSFUL, { accessToken });
  } catch (error) {
    Logger.error(error);
    return createResponse(
      false,
      error?.message || DEFAULT_MESSAGES.INTERNAL_ERR
    );
  }
};

const comparePassword = async (
  plainTextPassword: string,
  passwordHash: string
) => {
  return await bcrypt.compare(plainTextPassword, passwordHash);
};
