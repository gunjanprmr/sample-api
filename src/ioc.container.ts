import  { Container } from "inversify";
import HealthController from "./controllers/health.controller";
import HealthService from "./services/health.service";


let container = new Container();

// Controllers
container.bind(HealthController).to(HealthController);

// Services
container.bind<HealthService>("HealthService").to(HealthService).inSingletonScope()

export default container;
