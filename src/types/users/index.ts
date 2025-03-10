export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserQuery {
  field: "name" | "email";
  search: string;
  sort: "asc" | "desc";
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
}
