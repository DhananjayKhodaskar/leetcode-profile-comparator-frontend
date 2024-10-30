import * as React from "react";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectCategoryDropdown({
  categories,
  paginationData,
  setPaginationData,
}) {
  const handleValueChange = (category) => {
    // Update the selectedCategories in paginationData state
    setPaginationData((prevData) => ({
      ...prevData,
      page: 1,
      selectedCategories: [category],
    }));
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
