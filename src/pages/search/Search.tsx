import { useMemo } from "react";
import { AutoComplete } from "antd";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { searchPlaces } from "../../features/locations/searchSlice";
import { Place } from "../../types/search";
import { Card } from "antd";
import "./style.css";

const { Meta } = Card;

const Search = () => {
  const dispatch = useDispatch<any>();
  const isLoading = useSelector((state: any) => state.search.isLoading);
  const results = useSelector((state: any) => state.search.results);

  const getPanelValue = debounce((query: string) => {
    if (query.trim() !== "") {
      dispatch(searchPlaces(query));
    } else {
      dispatch(searchPlaces(""));
    }
  }, 300);

  const onSelect = (data: string) => {
    console.log("onSelect", data);
  };

  const options: any[] = useMemo(() => {
    return results.map((place: Place) => ({ value: place.name }));
  }, [results]);

  return (
    <Card hoverable  className="container">
      <Meta title="MayBank Autocomplete" />
      <AutoComplete
        options={options}
        style={{ width: "100%" }}
        onSelect={onSelect}
        onSearch={(text) => getPanelValue(text)}
        placeholder="Search places..."
      >
      </AutoComplete>
      {isLoading && <p>Loading...</p>}
    </Card>
  );
};

export default Search;
