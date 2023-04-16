import { useState } from "react";

import { filtersInitialState } from "../FormTabs/constants";

const useFormTabs = () => {
  const [filterValues, setFilterValues] = useState(filtersInitialState);

  const handleFilterChange = name = event =>{
    setFilterValues({
      filterValues,
      [name]:event.target.value
    })

  }

  return { filterValues };
};

export default useFormTabs;
