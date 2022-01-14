import  { Container } from "inversify";
import HealthController from "./controllers/health.controller";
import UserController from "./controllers/user.controller";
import UserRepository from "./repositories/user.repository";
import HealthService from "./services/health.service";
import LoggerService from "./services/logger.service";
import UserService from "./services/user.service";

/**
 *** APPROACH on Dependency Injection and IOC Container ***
 * 
 * IoC container 
 *  - Uses a class constructor to identify and inject its dependencies. 
 * 
 * DI
 *  - Write code that adheres to the SOLID principles.
 *  - Helps in Unit testing.
 *  - Boilerplate code is reduced, as initializing of dependencies is done by the injector component.
 *  - Extending the application becomes easier.
 *  - Helps to enable loose coupling, which is important in application programming.
 */



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
