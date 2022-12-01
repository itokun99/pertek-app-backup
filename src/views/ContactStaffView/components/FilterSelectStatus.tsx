import SelectOption from "@components/select/SelectOption";
import React from "react";

// todo: make global filter
const FilterSelectStatus: React.FC = () => {
  return (
    <SelectOption
      label="Status"
      name="status"
      type="base-select"
      options={[]}
      onChange={() => {}}
    />
  );
};

export default FilterSelectStatus;
