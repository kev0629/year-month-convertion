import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [years, setYears] = useState<number | ''>('');
  const [months, setMonths] = useState<number | ''>('');

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  const handleYearsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const yearsValue = event.target.value;
    setYears(yearsValue !== '' ? parseFloat(yearsValue) : '');
    setMonths(yearsValue !== '' ? parseFloat(yearsValue) * 12 : '');
  };

  const handleMonthsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const monthsValue = event.target.value;
    setMonths(monthsValue !== '' ? parseFloat(monthsValue) : '');
    setYears(monthsValue !== '' ? Math.floor(parseFloat(monthsValue) / 12) : '');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Conversion des années en mois</h1>
      <div className="flex items-center space-x-4">
        <label className="text-lg font-semibold">
          Années:
          <input
            type="number"
            step="0.  1"
            className="px-3 py-2 border border-gray-400 rounded-lg w-32"
            value={years}
            onChange={handleYearsChange}
          />
        </label>
        <span className="text-lg font-semibold">=</span>
        <label className="text-lg font-semibold">
          Mois:
          <input
            type="number"
            step="0.1"
            className="px-3 py-2 border border-gray-400 rounded-lg w-32"
            value={months}
            onChange={handleMonthsChange}
          />
        </label>
      </div>
    </div>
  );
}

export default App;
