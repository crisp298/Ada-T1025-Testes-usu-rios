import { container } from "tsyringe";
import { StudentsService } from "../services/StudentsAndProfessionalsService";
import { fakeStudentsService } from "../services/StudentsAndProfessionalsService";
import {
  StudentsRepository,
  fakeStudentsRepository,
} from "../repositories/StudentsRepository";

const environment = process.env.NODE_ENV;

const registerUserService = () => {
  container.registerSingleton(
    "UsersService",
    environment === "test"
      ? fakeStudentsService
      : StudentsService
  );
};

const registerEventsRepository = () => {
  container.registerSingleton(
    "StudentsRepository",
    environment === "test" ? fakeStudentsRepository : StudentsRepository
  );
};

registerUserService();
registerEventsRepository();