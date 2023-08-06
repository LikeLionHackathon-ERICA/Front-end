import { useState } from "react";
import ProblemCard from "../components/problem/ProblemCard";
import { useEffect } from "react";
import axios from "axios";

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
    <div className="flex flex-col justify-center p-2 gap-2">
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
  );
}
