import { NewUser, UserQuery } from "./../../types/users/index";
import { Request, Response, Router } from "express";
import { User } from "../../types/users";
import { mockUsers } from "../../mock-data";

const router = Router();

router.get(
  "/api/users",
  (request: Request<{}, {}, {}, UserQuery>, response: Response) => {
    const {
      query: { field, search, sort },
    } = request;
    if (field && search) {
      const filteredUsers = mockUsers.filter((el) =>
        el[field].includes(search)
      );

      if (!filteredUsers.length) {
        response.status(404).send({ message: "Not found" });
        return;
      }
      response.status(200).send(filteredUsers);
      return;
    }
    if (field && sort) {
      const sortedUsers = mockUsers.sort((a, b) => {
        if (sort === "asc") {
          return a[field].localeCompare(b[field]);
        }
        return b[field].localeCompare(a[field]);
      });
      response.send(sortedUsers);
      return;
    }
    response.status(200).send(mockUsers);
  }
);

router.get(
  "/api/users/:id",
  (request: Request<{ id: string }, {}, {}, {}>, response: Response) => {
    const parsedId = Number(request.params.id);

    if (isNaN(parsedId)) {
      response.status(400).send({ message: "Bad request!" });
      return;
    }

    const user = mockUsers.find((el) => el.id === parsedId);

    if (!user) {
      response.status(404).send({ message: "Not found" });
      return;
    }

    response.send(user);
  }
);

router.post(
  "/api/users",
  (request: Request<{}, {}, NewUser, {}>, response: Response) => {
    const newUser = request.body;
    let newId = 1;
    for (let index = 0; index < mockUsers.length; index++) {
      if (!mockUsers.length) {
        break;
      }
      const existingId = mockUsers[index].id + 1;
      if (
        mockUsers
          .sort((a, b) => a.id - b.id)
          .every((el) => el.id !== existingId)
      ) {
        newId = existingId;
        break;
      }
    }

    if (!newUser.email || !newUser.name || !newUser.password) {
      response.status(400).send({ message: "Bad request" });
      return;
    }

    mockUsers.push({ ...newUser, id: newId });
    response.status(201).send({ ...newUser, id: newId });
  }
);
export default router;
