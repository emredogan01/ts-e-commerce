import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter, useSearchParams } from "next/navigation";
import { urlValues } from "./urlValues";
import { updateSearchParams, getSelectedOption } from "./helpers";

const RadioFilters: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    const selectedValue = getSelectedOption();
    if (selectedValue) {
      setSelectedOption(selectedValue);
    } else {
      setSelectedOption("");
    }
  }, [searchParams]);

  const handleSortChange = (value: string) => {
    setSelectedOption(value);
    const { sortBy, order } = urlValues[value as keyof typeof urlValues];
    const queryParams = {
      sortBy,
      order,
    };
    updateSearchParams(router, queryParams);
  };

  return (
    <div>
      <h4 className="text-gray-400 py-2">Sort By</h4>
      <RadioGroup
        value={selectedOption}
        className="bg-orange-200 p-2 rounded-md flex flex-col gap-4"
        onValueChange={handleSortChange}
      >
        {Object.entries(urlValues).map(([key, { label }]) => (
          <div key={key} className="flex items-center space-x-2">
            <RadioGroupItem
              value={key}
              id={key}
              checked={selectedOption === key}
            />
            <Label htmlFor={key} className="font-light text-sm">
              {label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default RadioFilters;
