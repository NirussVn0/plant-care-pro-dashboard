
import { Entity } from "../base/BaseClasses";

export interface PlantProps {
  name: string;
  scientificName?: string;
  species?: string;
  imageUrl?: string;
  waterScheduleDays: number; // Frequency in days
  lastWateredDate?: Date;
  lightRequirement: 'LOW' | 'MEDIUM' | 'HIGH';
  humidityRequirement: 'LOW' | 'MEDIUM' | 'HIGH';
  location: string; // e.g., 'Living Room'
  acquiredDate: Date;
}

export class Plant extends Entity<PlantProps> {
  
  private constructor(props: PlantProps, id?: string) {
    super(props, id);
  }

  public static create(props: PlantProps, id?: string): Plant {
    // Validation logic here (SOLID - Single Responsibility: Creation)
    if (!props.name) {
      throw new Error("Plant name is required");
    }
    return new Plant(props, id);
  }

  // Domain Logic (SOLID - Rich Domain Model)
  public isWateringDue(): boolean {
    if (!this.props.lastWateredDate) return true;
    
    const nextWaterDate = new Date(this.props.lastWateredDate);
    nextWaterDate.setDate(nextWaterDate.getDate() + this.props.waterScheduleDays);
    
    const today = new Date();
    // Reset time components for accurate date comparison
    today.setHours(0,0,0,0);
    nextWaterDate.setHours(0,0,0,0);

    return today >= nextWaterDate;
  }

  public water(): void {
    this.props.lastWateredDate = new Date();
  }

  // Getters
  get name(): string { return this.props.name; }
  get species(): string | undefined { return this.props.species; }
  get imageUrl(): string | undefined { return this.props.imageUrl; }
  get schedule(): number { return this.props.waterScheduleDays; }
  get location(): string { return this.props.location; }
  get light(): string { return this.props.lightRequirement; }
  get humidityRequirement(): string { return this.props.humidityRequirement; }
  get lastWateredDate(): Date | undefined { return this.props.lastWateredDate; }
}
