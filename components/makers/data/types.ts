export interface MakersGeneration {
  title: string;
  teams: Team[];
}

export interface Team {
  title: string;
  link?: string;
  description?: string;
  people: Person[];
}

export interface Person {
  imageUrl?: string;
  name: string;
  position?: string;
}
