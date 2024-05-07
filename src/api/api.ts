
import { Place } from "../types/search";
import mockData from '../data/mockData.json';

// simulate fetching data from an API
export const fetchPlaces = (query: string): Promise<Place[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
        const filteredResults = query?mockData.filter(place =>
            place.name.toLowerCase().includes(query.toLowerCase())): [];
      resolve(filteredResults);
    }, 500);
  });
};
