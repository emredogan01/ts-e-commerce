"use client";

import CheckBoxFilter from "@/components/CheckboxFilter";
import RadioFilters from "@/components/RadioFilters";
import React from "react";
import fetchFilterNames from "@/store/filterNames";

const FilterContainer = () => {
  const models = fetchFilterNames((state) => state.models);
  const brands = fetchFilterNames((state) => state.brands);

  return (
    <div className="pl-1 min-w-[200px]">
      <RadioFilters />
      <CheckBoxFilter name="Models" type="model" values={models} />
      <CheckBoxFilter name="Brands" type="brand" values={brands} />
    </div>
  );
};

export default FilterContainer;
