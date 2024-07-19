import sinon from "sinon";
import bcrypt from "bcrypt";
import expect from "expect";
import jwt from "jsonwebtoken";

import { env } from "../../../config";
import { ROLE } from "../../../enums/Role";
import { IUser } from "../../../interface/User";
import { NotFound } from "../../../error/NotFound";
import { login } from "../../../service/authService";
import * as UserService from "../../../service/userService";
import { UnauthorizedError } from "../../../error/UnauthorizedError";

describe("Auth Service Test Suite", () => {
  describe("login", () => {
    let userServiceGetUserByEmailStub: sinon.SinonStub;
    let bcryptCompareStub: sinon.SinonStub;
    let signStub: sinon.SinonStub;

    const user: IUser = {
      id: "06f44fc3-3b48-4e2e-abfe-b5abab5d933f",
      name: "bob",
      email: "bob@email.com",
      password: "Bob@12345",
      permissions: [ROLE.USER],
    };

    beforeEach(() => {
      userServiceGetUserByEmailStub = sinon.stub(UserService, "getUserByEmail");
      bcryptCompareStub = sinon.stub(bcrypt, "compare");
      signStub = sinon.stub(jwt, "sign");
    });

    afterEach(() => {
      userServiceGetUserByEmailStub.restore();
      bcryptCompareStub.restore();
      signStub.restore();
    });

    it("Should throw NotFound error when user does not exist", async () => {
      userServiceGetUserByEmailStub.resolves(undefined);
      const email = "random@email.com";

      expect(
        async () =>
          await login({
            email: email,
            password: "randomPassword",
          }),
      ).rejects.toThrow(
        new NotFound(`User with email ${email} does not exists`),
      );
    });

    it("Should throw Unauthorized error when password is invalid", async () => {
      userServiceGetUserByEmailStub.resolves(user);
      bcryptCompareStub.resolves(false);

      expect(
        async () =>
          await login({ email: "user1@email.com", password: "wrongpassword" }),
      ).rejects.toThrow(new UnauthorizedError("Invalid password received"));
    });

    it("Should throw Internal error when JWT secret is not set", async () => {
      userServiceGetUserByEmailStub.resolves(user);
      bcryptCompareStub.resolves(true);

      const originalSecret = env.jwt.secret;
      env.jwt.secret = undefined;

      expect(
        async () =>
          await login({ email: "bob@email.com", password: "password" }),
      ).rejects.toThrow(new Error("Secret not Setup."));

      env.jwt.secret = originalSecret;
    });

    it("Should return accessToken and refreshToken on successful login", async () => {
      userServiceGetUserByEmailStub.resolves(user);
      bcryptCompareStub.resolves(true);

      signStub.onFirstCall().returns("accessToken");
      signStub.onSecondCall().returns("refreshToken");

      const tokens = login({
        email: "bob@email.com",
        password: "Bob@12345",
      });

      expect(await tokens).toStrictEqual({
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      });
    });
  });
});
