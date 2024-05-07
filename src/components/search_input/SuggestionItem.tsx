import { Place } from "../../types/search";
import { useSelector } from "react-redux";

const SuggestionItem = ({onSelect}:{onSelect:(place:Place)=>void}) => {
    const isLoading = useSelector((state: any) => state.search.isLoading);
    const results = useSelector((state: any) => state.search.results);
  return (
    <>
      {isLoading && <div className="loading">Loading...</div>}
      <ul className="dropdown-list">
        {results.map((result:Place, index:number) => (
          <li key={index} onClick={() => onSelect(result)}>
            {result.description}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SuggestionItem
