import { useState, useContext, useEffect } from 'react';

const Search = ({ defaultData, setCurrentData }) => {
  const [searchInput, setSearchInput] = useState('');

  const searchQuery = (formData) => {
    if (formData.get('searchEmployeeName') !== '') {
      const filterData = defaultData.filter((d) =>
        d.name.match(formData.get('searchEmployeeName'))
      );
      setCurrentData(filterData);
      return;
    }

    setCurrentData(defaultData);
  };
  // const searchQuery = () => {
  //   if (searchInput !== '') {
  //     const filterData = defaultData.filter((d) => d.name.match(searchInput));
  //     setCurrentData(filterData);
  //     return;
  //   }

  //   setCurrentData(defaultData);
  // };

  return (
    <form className="flex gap-5" action={searchQuery}>
      <input
        className="rounded-lg p-3 bg-white text-background"
        type="text"
        name="searchEmployeeName"
        id="searchEmployeeName"
        placeholder="Search Employee Name"
        value={searchInput}
        onChange={(e) => setSearchInput(e.currentTarget.value)}
      />
      <button className="rounded-lg p-3 bg-white text-background" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
