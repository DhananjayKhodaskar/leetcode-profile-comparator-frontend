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
    if (category === "All") {
      // If "All" is selected, set selectedCategories to an empty array
      setPaginationData((prevData) => ({
        ...prevData,
        page: 1,
        selectedCategories: [],
      }));
    } else {
      // Update the selectedCategories in paginationData state
      setPaginationData((prevData) => ({
        ...prevData,
        page: 1,
        selectedCategories: [category],
      }));
    }
  };

  return (
    <Select
      onValueChange={handleValueChange}
      value={
        paginationData?.selectedCategories?.length > 0
          ? paginationData.selectedCategories[0]
          : "All"
      }
    >
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem key="all" value="All">
            All
          </SelectItem>
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
