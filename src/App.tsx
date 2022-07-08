import React, { useEffect } from "react";
import { getCountries, getPeople } from "./DataApi";
import { People } from "DataApi/people.interface";
import { Country } from "DataApi/country.interface";
import PeopleList from "PeopleLIst";
import Practice from "Practice";

const App: React.FunctionComponent = () => {
  const [people, setPeople] = React.useState<[] | People[]>([]);

  const [countries, setCounries] = React.useState<[] | Country[]>([]);
  const [peopleSearchValue, setPeopleSearchValue] = React.useState("");
  const [highlight, setHighlight] = React.useState(false);

  useEffect(() => {
    const searchCountries = async (search?: string) => {
      const result = await getCountries({ search });
      const res = result.searchResults;
      console.log(res);
      setCounries(res);
    };

    searchCountries();
  }, []);

  useEffect(() => {
    const searchPeople = async (search?: string) => {
      const result = await getPeople({ search });
      const people = result.searchResults;

      // let peopleCountries = countries && people.map((p)=>{
      //   let country = countries.find((country) => country.alpha2Code === p.country);
      //   if(country) p.country_data = country;
      //   return p;
      //   })
      setPeople(people);
    };

    searchPeople(peopleSearchValue);
    if (peopleSearchValue.length > 0) {
      return;
    }
    setHighlight(true);
    const timer = setTimeout(() => {
      setHighlight(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [peopleSearchValue]);

  console.log(people, "test");

  const onChangeHandler = (e) => {
    // console.log(people);
    setPeopleSearchValue(e.target.value);
  };

  return (
    <div className="pageWrapper">
      <form>
        <div className="search-component">
          <label>Search person name</label>
          <input onChange={onChangeHandler} />
        </div>
        <div className="listWrapper">
          <div>
            <PeopleList
              people={people}
              countries={countries}
              searchInput={peopleSearchValue}
            />
          </div>
        </div>
      </form>

      <Practice />
    </div>
  );
};

export default App;
