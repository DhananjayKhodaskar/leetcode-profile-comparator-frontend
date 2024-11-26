import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectStatusDropdown({
  statuses,
  paginationData,
  setPaginationData,
}) {
  const handleValueChange = (status) => {
    if (status === "All") {
      // If "All" is selected, clear the selected status
      setPaginationData((prevData) => ({
        ...prevData,
        page: 1,
        selectedStatus: null,
      }));
    } else {
      // Update the selectedStatus in paginationData state
      setPaginationData((prevData) => ({
        ...prevData,
        page: 1,
        selectedStatus: status,
      }));
    }
  };

  return (
    <Select
      onValueChange={handleValueChange}
      value={paginationData?.selectedStatus || "All"} // Default to "All" if no status is selected
    >
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem key="all" value="All">
            All
          </SelectItem>
          {statuses?.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
