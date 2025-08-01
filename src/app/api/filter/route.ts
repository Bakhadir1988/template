import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { sect_id } = await request.json();

    if (!sect_id) {
      return NextResponse.json(
        { error: "sect_id is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://litra-adm.workup.spb.ru/api/?comp=filter&sect_id=${sect_id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Filter API error:", error);
    return NextResponse.json(
      { error: "Ошибка загрузки фильтров" },
      { status: 500 }
    );
  }
}
