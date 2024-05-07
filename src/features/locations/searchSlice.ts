import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPlaces } from '../../api/api';
import { Place } from '../../types/search';

interface SearchState {
  query: string;
  isLoading: boolean;
  results: Place[];
}

const initialState: SearchState = {
  query: '',
  isLoading: false,
  results: [],
};

export const searchPlaces = createAsyncThunk(
  'search/searchPlaces',
  async (query: string, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const results = await fetchPlaces(query);
      return results;
    } catch (error) {
      console.error('Error fetching places:', error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setSearchResults(state, action: PayloadAction<Place[]>) {
      state.results = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchPlaces.fulfilled, (state, action) => {
      state.results = action.payload;
    });
  },
});

export const {setLoading, setSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
