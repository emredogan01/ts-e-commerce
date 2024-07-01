"use client";

import React, { Suspense, useEffect } from "react";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { useCheckBoxFilterState } from "./helpers";

interface IFilters {
  type: "model" | "brand";
  values: string[];
  name: string;
}

const CheckBoxFilter: React.FC<IFilters> = ({ type, values, name }) => {
  const {
    searchTerm,
    selectedItem,
    handleCheckboxChange,
    handleSearchTermChange,
  } = useCheckBoxFilterState(type, null);

  useEffect(() => {}, []);

  const filteredValues = values.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-gray-400">{name}</h4>
      <div className="bg-orange-200 p-1 rounded-md flex flex-col gap-2">
        <Input
          className="outline-none"
          placeholder={`Search ${name}`}
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <div className="h-[200px] overflow-y-auto px-1 py-1">
          {filteredValues.length > 0 ? (
            filteredValues.map((item) => (
              <div key={item} className="flex items-center">
                <Checkbox
                  id={item}
                  onCheckedChange={() => handleCheckboxChange(item)}
                  checked={selectedItem === item.toLowerCase()}
                />
                <label htmlFor={item} className="ml-2 text-sm font-light py-1">
                  {item}
                </label>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 text-sm">
              No results found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CheckBoxFilterWithSuspense: React.FC<IFilters> = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <CheckBoxFilter {...props} />
  </Suspense>
);

export default CheckBoxFilterWithSuspense;
