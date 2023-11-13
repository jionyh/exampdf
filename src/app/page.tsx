"use client";

import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { AiOutlineFilePdf } from "react-icons/ai";
import { Search } from "@/components/search";
import { Pagination } from "@/components/pagination";
import Head from "next/head";
import Loader from "@/components/loader";

type PacientData = {
  id: string;
  cod: string;
  name: string;
  date: string;
  exame: string;
};

export default function Home() {
  const [data, setData] = useState<Array<PacientData>>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [exam, setExam] = useState("");
  const [actualPage, setActualPage] = useState(1);

  <Head>
    <title>CID</title>
  </Head>;

  const getData = async (name?: string, pageNumber?: number) => {
    setLoading(true);
    const page = pageNumber || 1;
    const nome = name || "";

    const res = await fetch(
      `http://localhost:3333/api?page=${page}&name=${nome}&exam=${exam}`
    );
    const pacients = await res.json();
    setData(pacients.data);
    setLoading(false);
  };

  const handleSearch = () => {
    getData(name);
  };

  const nextPage = () => {
    const page = actualPage + 1;
    setActualPage(page);
    getData(name, page);
  };

  const backPage = () => {};

  useEffect(() => {
    setActualPage(1);
    getData();
  }, []);
  return (
    <div>
      <main className="container w-[1024px] m-auto">
        <Search
          name={name}
          setName={setName}
          search={handleSearch}
          selectedExam={setExam}
        />
        {data.length === 0 && (
          <div className="h-screen flex items-center justify-center">
            <Loader />
          </div>
        )}

        {data.length > 0 && (
          <>
            <table className="w-full text-left m-auto border-collapse border border-slate-500 ">
              <tr className="h-10 border border-slate-500 bg-blue-200 text-slate-700">
                <th className="text-center w-32">Data</th>
                <th className="pl-4 w-[40%]">Nome Paciente</th>
                <th className="">Exame</th>
                <th className="w-28">Baixar PDF</th>
              </tr>
              {data.map((i) => (
                <tr
                  key={i.id}
                  className="text-sm h-8 border border-slate-500 even:bg-slate-100 odd:bg-slate-200 "
                >
                  <td className="text-xs text-center">
                    {dayjs(i.date).format("DD/MM/YYYY HH:mm")}
                  </td>
                  <td className="pl-4 w-[40%] text-sm">{i.name}</td>
                  <td className="">{i.exame}</td>
                  <Link
                    className="flex items-center justify-center"
                    target="_blank"
                    href={`/pdfs/pdf_${i.cod}.pdf`}
                  >
                    <td className="">
                      <AiOutlineFilePdf
                        size={20}
                        className="border-red-400 border h-full w-full flex items-center"
                      />
                    </td>
                  </Link>
                </tr>
              ))}
            </table>
            <Pagination
              backPage={backPage}
              nextPage={nextPage}
              page={actualPage}
            />
          </>
        )}
      </main>
    </div>
  );
}
