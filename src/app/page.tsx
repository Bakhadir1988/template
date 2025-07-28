"use client";

import { FilterWidget } from "../widgets/FilterWidget";

export default function Home() {
  const handleApply = (selected: Record<string, unknown>) => {
    console.log("Выбранные значения:", selected);
  };

  return (
    <div className="container">
      <h1>Главная страница</h1>
      <FilterWidget sectId="e8748942" onApply={handleApply} />
    </div>
  );
}
