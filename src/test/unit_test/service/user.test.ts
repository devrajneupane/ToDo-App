import sinon from "sinon";
import expect from "expect";
import bcrypt from "bcrypt";

import {
  createUser,
  getUserInfo,
  updateUser,
  deleteUser,
  getUserByEmail,
} from "../../../service/userService";
import { ROLE } from "../../../enums/Role";
import { IUser } from "../../../interface/User";
import { NotFound } from "../../../error/NotFound";
import { UserModel } from "../../../model/userModel";
import { ConflictError } from "../../../error/ConflictError";

describe("User Service Test Suite", () => {
  describe("getUserInfo", () => {
    let userModelGetUserByIdStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUserByIdStub = sinon.stub(UserModel, "getUserInfo");
    });

    afterEach(() => {
      userModelGetUserByIdStub.restore();
    });

    it("Should throw error when user is not found ", async () => {
      userModelGetUserByIdStub.resolves(undefined);
      const userId = "06f44fc3-3b48-4e2e-abfe-b5abab5d933f";

      expect(async () => await getUserInfo(userId)).rejects.toThrow(
        new NotFound(`User with id ${userId} not found`),
      );
    });

    it("Should return the user when user is found", async () => {
      const user: IUser = {
        id: "06f44fc3-3b48-4e2e-abfe-b5abab5d933f",
        name: "bob",
        email: "bob@email.com",
        password: "Bob@12345",
        permissions: [ROLE.USER],
      };
      userModelGetUserByIdStub.resolves(user);
      const res = await getUserInfo("06f44fc3-3b48-4e2e-abfe-b5abab5d933f");
      expect(res.data).toStrictEqual(user);
    });
  });

  describe("createUser", () => {
    let bcryptHashStub: sinon.SinonStub;
    let userModelCreateUserStub: sinon.SinonStub;
    let userModelGetUserByEmailStub: sinon.SinonStub;

    beforeEach(() => {
      bcryptHashStub = sinon.stub(bcrypt, "hash");
      userModelCreateUserStub = sinon.stub(UserModel, "createUser");
      userModelGetUserByEmailStub = sinon.stub(UserModel, "getUserByEmail");
    });

    afterEach(() => {
      bcryptHashStub.restore();
      userModelCreateUserStub.restore();
      userModelGetUserByEmailStub.restore();
    });

    it("Should throw conflict error when user already exists", async () => {
      bcryptHashStub.resolves("hashedPassword");
      const user: IUser = {
        id: "06f44fc3-3b48-4e2e-abfe-b5abab5d933f",
        name: "bob",
        email: "bob@email.com",
        password: "hashedPassword",
        permissions: [ROLE.USER],
      };
      userModelGetUserByEmailStub.resolves(user);
      userModelCreateUserStub.restore();
      await expect(
        createUser({
          id: "06f44fc3-3b48-4e2e-abfe-b5abab5d933f",
          name: "bob",
          email: "bob@email.com",
          password: "hashedPassword",
          permissions: [ROLE.USER],
        }),
      ).rejects.toThrow(
        new ConflictError("User with same email already exists"),
      );
    });

    it("Should create a new user when user does not exist", async () => {
      userModelGetUserByEmailStub.resolves(undefined);
      const stubUser = {
        id: "06f44fc3-3ba8-4e2e-abfe-b5abab5d933f",
        name: "huber",
        email: "huber@email.com",
        password: "hashedPassword",
        permissions: [ROLE.USER],
      };

      bcryptHashStub.resolves("hashedPassword");
      userModelCreateUserStub.resolves(stubUser);

      const user = await createUser({
        name: "huber",
        email: "huber@email.com",
        password: "hashedPassword",
      } as IUser);

      expect(bcryptHashStub.callCount).toBe(1);
      expect(userModelCreateUserStub.callCount).toBe(1);
      expect(user.data).toStrictEqual(stubUser);
    });
  });

  describe("updateUser", () => {
    let userModelUpdateUserStub: sinon.SinonStub;

    beforeEach(() => {
      userModelUpdateUserStub = sinon.stub(UserModel, "updateUser");
    });

    afterEach(() => {
      userModelUpdateUserStub.restore();
    });

    it("Should update user data", async () => {
      const user = {
        id: "06f44fc3-3b48-4e2e-abfe-b5abab5d944f",
        name: "rash",
        email: "rush@email.com",
      };
      userModelUpdateUserStub.resolves(user);

      const res = await updateUser("06f44fc3-3b48-4e2e-abfe-b5abab5d944f", {
        name: "rash",
      });

      expect(res.data).toStrictEqual(user);
    });

    it("Should throw an error when user is not found", async () => {
      userModelUpdateUserStub.resolves(null);

      const userId = "06f44fc3-3b48-4e2e-abfe-b5bbbb5d944f";

      expect(
        async () => await updateUser(userId, { name: "mark" }),
      ).rejects.toThrow(new NotFound(`User with id ${userId} does not exists`));
    });
  });

  describe("deleteUser", () => {
    let userModelDeleteUserStub: sinon.SinonStub;

    beforeEach(() => {
      userModelDeleteUserStub = sinon.stub(UserModel, "deleteUser");
    });

    afterEach(() => {
      userModelDeleteUserStub.restore();
    });

    it("Should delete user when user is found", async () => {
      userModelDeleteUserStub.resolves(true);

      const res = await deleteUser("06f44fc3-3b48-4e2e-abfe-b5abab5d933f");

      expect(res.message).toStrictEqual("User deleted successfully");
    });

    it("Should throw an error when user is not found", async () => {
      userModelDeleteUserStub.resolves(false);

      const userId = "06f44fc3-3b48-4e2e-abfe-b5abab5d944f";

      expect(() => deleteUser(userId)).rejects.toThrow(
        new NotFound(`User with id ${userId} does not exists`),
      );
    });
  });

  describe("getUserByEmail", () => {
    let userModelGetUserByEmailStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUserByEmailStub = sinon.stub(UserModel, "getUserByEmail");
    });

    afterEach(() => {
      userModelGetUserByEmailStub.restore();
    });

    it("Should return user data when email is found", async () => {
      const stubbedUser = {
        id: "06f44fc3-3b48-4e2e-abfe-a5abab5d933f",
        name: "user",
        email: "user@email.com",
        password: "hashedPassword",
        permissions: [ROLE.USER],
      };
      userModelGetUserByEmailStub.resolves(stubbedUser);

      const res = await getUserByEmail("user@email.com");

      expect(res).toStrictEqual(stubbedUser);
    });

    it("Should throw an error when email is not found", async () => {
      userModelGetUserByEmailStub.resolves(undefined);

      const email = "random@email.com";

      expect(async () => await getUserByEmail(email)).rejects.toThrow(
        new NotFound(`User with email ${email} does not exists`),
      );
    });
  });
});
