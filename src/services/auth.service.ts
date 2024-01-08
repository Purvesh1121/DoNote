import bcrypt from "bcrypt";
import config from "../config";
import { ICreateUser } from "../types/auth";
import { DatabaseSource } from "../loaders/database";
import { User } from "../entity/User";
import { DEFAULT_MESSAGES } from "../utils/constants";
import { IResult } from "../types/common";
import { createResponse } from "../utils/response";
const { jwtSecret, jwtExpiresIn, saltRounds } = config;

// repositories
const userRepository = DatabaseSource.getRepository(User);

export const signup = async (signupData: ICreateUser) => {
  // create password hash
  const hash = await bcrypt.hash(signupData?.password, saltRounds);

  const user = new User();
  user.firstname = signupData?.firstname;
  user.lastname = signupData?.lastname;
  user.email = signupData?.email;
  user.password = hash;

  const savedUser = await userRepository.save(user);
  return createResponse(true, DEFAULT_MESSAGES.SUCCESSFUL, savedUser);
};

export const login = async (loginData: any) => {};
