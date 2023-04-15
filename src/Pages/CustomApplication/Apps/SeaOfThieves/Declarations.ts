export type ResponseAPI = {
  vols: Vol[];
};

export type Vol = {
  id: number;
  chest: Chest;
  count: number;
};

export type Chest = {
  id: number;
  name: string;
  image: string;
};
