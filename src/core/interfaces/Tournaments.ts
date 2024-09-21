export interface ITournament {
  id: string;
  name: string;
  start: string;
  end: string;
  winnerTeam?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateTournament {
  name: string;
  start: string;
  end: string;
}

export interface IUpdateTournament {
  name?: string;
  start?: string;
  end?: string;
  winnerTeam?: string;
}
