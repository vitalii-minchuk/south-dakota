export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserQuery {
  type: "name" | "email";
  search: string;
}
