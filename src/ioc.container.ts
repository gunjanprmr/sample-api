import  { Container } from "inversify";
import HealthController from "./controllers/health.controller";
import UserController from "./controllers/user.controller";
import HealthService from "./services/health.service";
import UserService from "./services/user.service";


let container = new Container();

// Controllers
container.bind(HealthController).toSelf();;
container.bind(UserController).toSelf();

// Services
container.bind<HealthService>("HealthService").to(HealthService).inSingletonScope();
container.bind<UserService>("UserService").to(UserService).inSingletonScope();

export default container;
