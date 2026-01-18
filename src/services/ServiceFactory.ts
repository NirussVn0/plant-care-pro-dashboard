import { IPlantService, PlantService } from "./plant/PlantService";
import { ITaskService, TaskService } from "./task/TaskService";
import { IUserService, UserService } from "./user/UserService";
import { ICareLogService, CareLogService } from "./care_log/CareLogService";

/**
 * Factory class for creating and managing service instances.
 * Implements Singleton pattern for each service to ensure single instance usage.
 */
class ServiceFactory {
  private static plantService: IPlantService;
  private static taskService: ITaskService;
  private static userService: IUserService;
  private static careLogService: ICareLogService;

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

  static getCareLogService(): ICareLogService {
    if (!this.careLogService) {
      this.careLogService = new CareLogService();
    }
    return this.careLogService;
  }
}

export default ServiceFactory;
