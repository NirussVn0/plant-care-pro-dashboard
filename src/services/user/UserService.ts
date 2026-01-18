import { User } from "@/models/User";

export interface IUserService {
  getCurrentUser(): Promise<User>;
}

export class UserService implements IUserService {
  private mockUser: User = {
    id: 'u1',
    name: 'Sage',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4L-yeUJzasM-KnmHpRaGOy4Q0P6W1DT_fcBCYMI9VHN5JwqkgvIC1iIDeTi10qij1hTQSCBtghVVq5gdUQbTVQGaIGNbMhwQFFENUUDdf0_33CoO0HSQ_ZDqjOFUpFEqR-10Jroz1pIw6wVySVHaCNY9TXc2S-vUJwgOnA_hpHFbXpxnDFve4_NymV5jhbKa4ngCnE4S3x9sOy6HUhz9Fj6uRNdqj8_xgtAQ-Dgjcfg64jFQOvUX-Vgm04VBriTnh66Q0mOeJAQ',
    level: 'Master Gardener',
    xp: 2500,
    nextLevelXp: 3500,
    streakDays: 12,
    totalPlants: 42
  };

  async getCurrentUser(): Promise<User> {
    return new Promise((resolve) => setTimeout(() => resolve(this.mockUser), 200));
  }
}
