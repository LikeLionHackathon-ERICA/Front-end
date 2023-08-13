import { useEffect, useState } from "react";
import HeaderTitle from "../components/UI/HeaderTitle";
import SelectInput from "../components/classpage/SelectInput";
import ClassCard from "../components/classpage/ClassCard";
import { useFetchClasses } from "../hook/useFetchClasses";

export default function Class() {
  const { classes, loading } = useFetchClasses();
  const [selectedOption, setSelectedOption] = useState("전체");
  const filteredClasses =
    selectedOption === "전체"
      ? classes
      : classes.filter((c) => c.category === selectedOption);
  return (
    <section className="bg-white min-h-screen">
      <HeaderTitle />
      <SelectInput onOptionChange={setSelectedOption} />
      <section className="flex flex-col gap-2 px-6">
        <div id="ClassCard" className="border-b-2 py-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <span className="text-xl text-gray-600">Loading...</span>
            </div>
          ) : (
            <ClassCard classes={filteredClasses} />
          )}
        </div>
      </section>
    </section>
  );
}
