import { SelectOptionType } from "@types";
import React from "react";
import SelectOption, { ISelectOptionProps } from "@components/select/SelectOption";

type ISelectStatusBookingTypeProps = Omit<
  ISelectOptionProps,
  "name" | "label" | "options" | "placeholder" | "type"
>;

const StatusOptions: SelectOptionType[] = [
  {
    label: "Requested",
    value: "Requested",
  },
  {
    label: "Booked",
    value: "Booked",
  },
  {
    label: "Ongoing",
    value: "Ongoing",
  },
  {
    label: "Done",
    value: "Done",
  },
  {
    label: "No Show",
    value: "No Show",
  },
  {
    label: "Canceled",
    value: "Canceled",
  },
];

const SelectStatusBooking: React.FC<ISelectStatusBookingTypeProps> = (props) => {
  return (
    <SelectOption
      type="base-select"
      options={StatusOptions}
      label="Status"
      name="status"
      placeholder="Pilih Status Karyawan"
      {...props}
    />
  );
};

export default SelectStatusBooking;
