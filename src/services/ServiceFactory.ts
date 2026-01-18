import { IPlantService, PlantService } from "./plant/PlantService";
import { ITaskService, TaskService } from "./task/TaskService";
import { IUserService, UserService } from "./user/UserService";

class ServiceFactory {
  private static plantService: IPlantService;
  private static taskService: ITaskService;
  private static userService: IUserService;

  static getPlantService(): IPlantService {
    if (!this.plantService) {
      this.plantService = new PlantService();
    }
    return this.plantService;
  }

  static getTaskService(): ITaskService {
    if (!this.taskService) {
      this.taskService = new TaskService();
    }
    return this.taskService;
  }

  static getUserService(): IUserService {
    if (!this.userService) {
      this.userService = new UserService();
    }
    return this.userService;
  }
}

export default ServiceFactory;
