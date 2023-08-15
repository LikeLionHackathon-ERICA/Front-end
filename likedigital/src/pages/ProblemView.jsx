import { useState } from "react";
import ProblemCard from "../components/problem/ProblemCard";
import { useEffect } from "react";
import axios from "axios";
import HeaderTitle from "../components/UI/HeaderTitle";

export default function ProblemView() {
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    axios
      .get("/data/problems.json")
      .then((res) => {
        setProblems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <section className="flex flex-col relative">
      <HeaderTitle />
      <div className="flex flex-col justify-center gap-2 px-6 mt-4">
        {problems.map((problem, index) => (
          <ProblemCard
            key={index}
            title={problem.title}
            phoneNumber={problem.phoneNumber}
            distance={problem.distance}
            status={problem.status}
            category={problem.category}
          />
        ))}
      </div>
    </section>
  );
}
