import React from "react";
import { categories } from "../../../utils/data";

const SelectInput = ({ postCategoryToEdit, handlePostCategoryChange }) => {
  return (
    <select
      className="p-3 border-[1px] border-gray-100 rounded-lg bg-transparent text-gray-400"
      onChange={handlePostCategoryChange}
    >
      <option value="" disabled selected={postCategoryToEdit} hidden>
        Select a category
      </option>
      {categories.map((category, index) => (
        <option
          key={category.name + index}
          value={category.name}
          className="text-black"
          selected={postCategoryToEdit === category.name}
        >
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
