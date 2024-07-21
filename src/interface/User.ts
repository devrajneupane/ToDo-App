import { UUID } from "crypto";

import { ROLE } from "../enums/Role";

export interface IUser {
  id: UUID;
  name: string;
  email: string;
  password: string;
  permissions: ROLE[];
}

export interface IGetUserQuery {
  q?: string;
  page?: number;
  size?: number;
}

export interface Params {
  id?: UUID;
}
