export interface MakersGeneration {
  title: string;
  message?: string;
  teams: MakersTeam[];
}

export interface MakersTeam {
  title: string;
  link?: string;
  description?: string;
  people: MakersPerson[];
}

export type MakersPerson =
  | {
      type: 'raw';
      name: string;
      position?: string;
      imageUrl?: string;
    }
  | {
      type: 'member';
      id: number;
      name: string;
      position?: string;
    };
