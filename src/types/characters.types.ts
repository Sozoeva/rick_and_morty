interface IInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface IOriginLocation {
  name: string;
  url: string;
}

interface ICharacters {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: IOriginLocation;
  location: IOriginLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ICharactersRes {
  info: IInfo;
  results: ICharacters[];
}
