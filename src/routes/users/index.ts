import { UserQuery } from "./../../types/users/index";
import { Request, Response, Router } from "express";
import { mockUsers } from "../../mock-data";

const router = Router();

router.get(
  "/api/users",
  (request: Request<{}, {}, {}, UserQuery>, response: Response) => {
    const { field, search, sort } = request.query;
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
  (request: Request<{ id: string }, {}, {}, UserQuery>, response: Response) => {
    const parsedId = Number(request.params.id);

    if (isNaN(parsedId)) {
      response.status(400).send({ message: "Bad request!!!!" });
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

export default router;
