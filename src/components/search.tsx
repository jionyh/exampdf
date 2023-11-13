"use client";
import React, { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";

type Props = {
  name: string;
  setName: (name: string) => void;
  search: () => void;
  selectedExam: (exam: string) => void;
};

export const Search = ({ setName, name, search, selectedExam }: Props) => {
  const [exam, setExam] = useState("chose");

  const handleSelectExam = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectedExam(e.target.value);
    setExam(e.target.value);
    console.log(exam);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search();
  };

  return (
    <form className="my-3 flex items-center justify-center gap-2 border w-full h-20">
      <div className="border border-blue-400 flex items-center p-2 rounded">
        <MdOutlineSearch size={25} />
        <input
          id="search"
          className="mx-3 p-4 outline-none w-64 h-2 rounded"
          placeholder="Digite o nome do paciente"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="border-l-2 border-blue-400 appearance-none text-gray-400 outline-none py-2 px-7"
          value={exam}
          onChange={handleSelectExam}
        >
          <option disabled={true} value="chose">
            Selecione o Exame...
          </option>
          <option value="all">Todos</option>
          <option value="rx">RX</option>
          <option value="tc">TC</option>
          <option value="resso">RM</option>
          <option value="us">US</option>
          <option value="mamo">Mamografia</option>
          <option value="densit">Densitometria</option>
        </select>
        <button
          className="border ml-5 px-4 py-1 bg-blue-400 text-white  hover:bg-blue-500 rounded"
          onClick={handleSearch}
        >
          {" "}
          Procurar
        </button>
      </div>
    </form>
  );
};
