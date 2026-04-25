export const SearchFilter = ({search,setSearch,filter,setFilter,country,setCountry}) =>{
    const handleInputChange = (e) =>{
        e.preventDefault();
        setSearch(e.target.value)
    }

    const handleSelectChange = (e) =>{
        e.preventDefault();
        setFilter(e.target.value)
    }

    const sortCountries = (value) => {
        const sortCountry = [...country].sort((a, b) => {
          return value === "asc"
            ? a.name.common.localeCompare(b.name.common)
            : b.name.common.localeCompare(a.name.common);
        });
        setCountry(sortCountry);
      }; 
    return <section className="section-searchFilter container">
        <input type="text" placeholder="Search" value={search} onChange={handleInputChange}/>
        <div>
            <button onClick={()=>sortCountries('asc')}>Asc</button>
        </div>
        <div>
            <button onClick={()=>sortCountries('des')}>Des</button>
        </div>
        <div>
        <select
          className="select-section"
          value={filter}
          onChange={handleSelectChange}
        >
          <option value="all">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </section>
}