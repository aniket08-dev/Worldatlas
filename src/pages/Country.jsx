import { useEffect, useState, useTransition } from "react";
import { getCountry } from "../api/postApi";
import { Loader } from "../Components/UI/Loader";
import { CountryCard } from "../Components/Layout/CountryCard";
import { SearchFilter } from "../Components/UI/SearchFilter";

export const Country = () => {
  const [isPending, startTransition] = useTransition();
  const [country, setCountry] = useState([]);
  const [search, setSearch] = useState();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    startTransition(async () => {
      const res = await getCountry();
      console.log(res.data);
      setCountry(res.data);
    });
  }, []);
        console.log(search,filter);

       const searchCountry = (country) =>{
        if(search){
            return country.name.common.toLowerCase().includes(search.toLowerCase());
        }
        else{
            return country;
        }
       }

       const filterRegion = (country) => {
        if (filter === "all") return country;
        return country.region === filter;
      };

     const filterCountry =  country.filter((country)=> searchCountry(country) && filterRegion(country) )

        
  if (isPending)
    return (
      <div className="loader-section">
        <Loader />
      </div>
    );
  return (
    <>
      <section className="country-section">
        <SearchFilter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          country = {country}
          setCountry = {setCountry}
        />
        <ul className="grid grid-four-cols">
          {filterCountry.map((curr, index) => {
            return <CountryCard country={curr} key={index} />;
          })}
        </ul>
      </section>
    </>
  );
};
