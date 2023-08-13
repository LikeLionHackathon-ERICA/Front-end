import Select from "react-select";

const options = [
  { value: "option1", label: "전체" },
  { value: "option2", label: "학습/교육" },
  { value: "option3", label: "건강/운동" },
  { value: "option4", label: "취미" },
  { value: "option5", label: "기타" },
];
const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "2px solid #68D391",
    boxShadow: "none",

    "&:hover": {
      borderColor: "#4299E1",
    },
  }),
};
function SelectInput({ onOptionChange }) {
  return (
    <div className="flex items-center gap-4 px-6 mt-6">
      <label
        htmlFor="topicSelect"
        className="block text-lg font-bold text-primary"
      >
        관심사
      </label>
      <Select
        options={options}
        styles={customStyles}
        isSearchable={false}
        id="topicSelect"
        defaultValue={options[0]}
        onChange={(selectedOption) => {
          onOptionChange(selectedOption.label);
        }}
      />
    </div>
  );
}
export default SelectInput;
