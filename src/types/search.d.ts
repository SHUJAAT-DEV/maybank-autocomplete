export interface Place {
    id:number,
    name: string;
    latitude: number;
    longitude: number;
    description: string;
}

export interface SearchState {
  query: string;
  isLoading: boolean;
  results: Place[];
}
