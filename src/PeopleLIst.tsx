import { People } from "DataApi/people.interface";
import { Country } from "DataApi/country.interface";

interface PeopleIntefrace {
  people: People[];
  searchInput: string;
}

export interface PeopleCountry extends People {
  country_data?: Country;
}

interface CountryInterface {
  countries: Country[];
}

const PeopleList = (props: PeopleIntefrace & CountryInterface) => {
  const { people, searchInput, countries } = props;

  const convertArrayToObject = (array, key) => {
    const initialValue = {};

    const obj = array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
    return obj;
  };

  const countriesObj = convertArrayToObject(countries, "alpha2Code");

  console.log(countriesObj);

  const PeopleCountriesData = () => {
    return people.map((p, index) => {
      let countryAlt = countriesObj[p.country]?.name || "";

      return (
        <div className="list-persons-countries" key={index}>
          {`Person name: ${p.first_name.trim()} from `}
          <img
            src={`https://countryflagsapi.com/png/${p.country}`}
            alt={`${countryAlt}`}
          ></img>
        </div>
      );
    });
  };

  return (
    <div className="persons-countries">
      {searchInput !== "" && PeopleCountriesData()}
    </div>
  );
};

export default PeopleList;
