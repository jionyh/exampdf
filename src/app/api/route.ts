import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

type PacientType = { cod: string; name: string; date: string; exame: string };

export async function POST(req: Request) {
  const res = await req.json();

  const pacientData: Array<PacientType> = [];

  for (let i of res) {
    pacientData.push({
      cod: i.id,
      name: i.nome,
      exame: i.exame,
      date: i.horario.slice(0, 12),
    });
  }

  try {
    const create = await prisma.pacient.createMany({ data: pacientData });
    return NextResponse.json(create);
  } catch (e) {
    return NextResponse.json({ error: true });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const param = searchParams.get("page") || "1";
  const nome = searchParams.get("name") || "";
  const exame = searchParams.get("exam") || "";

  let exam = exame === "all" ? "" : exame;
  let exam2 = exame === "tc" ? "tomo" : exame;

  try {
    const page = parseInt(param) || 1;
    const pageSize = 50;

    const patients = await prisma.pacient.findMany({
      where: {
        name: {
          contains: nome,
        },
        OR: [
          {
            exame: {
              contains: exam,
              mode: "insensitive",
            },
          },
          {
            exame: {
              contains: exam2,
              mode: "insensitive",
            },
          },
        ],
      },

      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { date: "desc" }, // Adjust the ordering as needed
    });

    const response = {
      page,
      data: patients,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: true, message: "An error occurred." });
  }
}
