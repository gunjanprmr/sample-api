import  { Container } from "inversify";
import HealthController from "./controllers/health.controller";
import UserController from "./controllers/user.controller";
import UserRepository from "./repositories/user.repository";
import HealthService from "./services/health.service";
import LoggerService from "./services/logger.service";
import UserService from "./services/user.service";


let container = new Container();

// Controllers
container.bind(HealthController).toSelf();;
container.bind(UserController).toSelf();

// Services
container.bind<HealthService>("HealthService").to(HealthService).inSingletonScope();
container.bind<UserService>("UserService").to(UserService).inSingletonScope();
container.bind<LoggerService>("LoggerService").to(LoggerService).inSingletonScope();

// Repository
container.bind<UserRepository>("UserRepository").to(UserRepository).inSingletonScope

export default container;
