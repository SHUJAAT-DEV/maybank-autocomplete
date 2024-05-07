import debounce from 'lodash/debounce';
import React from 'react';
import { useDispatch } from 'react-redux';
import { searchPlaces } from '../../features/locations/searchSlice';
import Input from '../input/Input';
import './style.css';
import SuggestionItem from './SuggestionItem';


const CustomAutocomplete = () => {
  const dispatch = useDispatch<any>();

  const fetchResultsDebounced = debounce((query: string) => {
    if (query.trim() !== '') {
      dispatch(searchPlaces(query));
    }else{
      dispatch(searchPlaces(''));
    }
  }, 300);

  return (
    <div className='autocomplete'>
      <Input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>fetchResultsDebounced(e.target.value)}
        placeholder="Search places..."
      />
      <SuggestionItem  
        onSelect={console.log}
      />
    </div>
  );
};

export default CustomAutocomplete
