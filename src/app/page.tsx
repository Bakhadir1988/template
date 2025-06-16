import { Input } from "@/shared/ui";

export default function Home() {
  return (
    <div className="container">
      <h1>Главная страница</h1>

      <Input placeholder="Инпут" />
      <Input label="label" placeholder="Инпут" />
      <Input error="Ошибка" label="label" placeholder="Инпут" />
      <Input fullWidth placeholder="Инпут" />
    </div>
  );
}
