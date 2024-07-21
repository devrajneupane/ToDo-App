import expect from "expect";
import express from "express";
import jwt from "jsonwebtoken";
import request from "supertest";
import { StatusCodes } from "http-status-codes";

import router from "../../routes";
import { env } from "../../config";
import { IUser } from "../../interface/User";
import { genericErrorHandler } from "../../middleware/errorHandler";

describe("Auth Integration Test Suite", () => {
  const app = express();

  app.use(express.json());
  app.use(router);
  app.use(genericErrorHandler);

  describe("Login API test", () => {
    it("Should login user and return tokens", async () => {
      const userCredentials = {
        email: "bob@email.com",
        password: "Bob@1234",
      };

      const res = await request(app).post("/auth/login").send(userCredentials);

      expect(res.status).toEqual(StatusCodes.OK);
      expect(res.body).toHaveProperty("accessToken");
      expect(res.body).toHaveProperty("refreshToken");

      // Verify the tokens
      const decodedAccessToken = jwt.verify(
        res.body.accessToken,
        env.jwt.secret!,
      ) as IUser;
      const decodedRefreshToken = jwt.verify(
        res.body.refreshToken,
        env.jwt.secret!,
      ) as IUser;

      expect(decodedAccessToken.email).toEqual(userCredentials.email);
      expect(decodedRefreshToken.email).toEqual(userCredentials.email);
    });

    it("Should return Unauthorized error for invalid password", async () => {
      const invalidCredentials = {
        email: "bob@email.com",
        password: "wrongpassword",
      };

      const res = await request(app)
        .post("/auth/login")
        .send(invalidCredentials);
      expect(res.status).toEqual(StatusCodes.UNAUTHORIZED);
      expect(res.body).toHaveProperty("message", "Invalid email or password");
    });
  });
});
