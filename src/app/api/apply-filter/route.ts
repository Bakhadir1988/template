import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const response = await fetch("https://litra-adm.workup.spb.ru/api/", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Apply filter API error:", error);
    return NextResponse.json(
      { error: "Ошибка применения фильтра" },
      { status: 500 }
    );
  }
}
