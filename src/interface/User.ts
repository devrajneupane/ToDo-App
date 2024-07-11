import { UUID } from "crypto";

import { ROLE } from "../enums/Role";

export interface IUser {
  id: UUID;
  name: string;
  email: string;
  password: string;
  permissions: ROLE[];
}

export interface GetUserQuery {
  q?: string;
}

export interface Params {
  id?: UUID;
}
