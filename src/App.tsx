import { useState } from "react";
import "./App.css";

function App() {
  const [birthdate, setBirthdate] = useState<string>("");
  const [years, setYears] = useState<number | null>(null);
  const [months, setMonths] = useState<number | null>(null);

  const handleBirthdateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const birthdateValue = event.target.value;
    setBirthdate(birthdateValue);

    const today = new Date();
    const birthDate = new Date(birthdateValue);

    let yearsDiff = today.getFullYear() - birthDate.getFullYear();
    let monthsDiff = today.getMonth() - birthDate.getMonth();

    if (monthsDiff < 0 || (monthsDiff === 0 && today.getDate() < birthDate.getDate())) {
      yearsDiff--;
      monthsDiff += 12;
    }

    setYears(yearsDiff);
    setMonths(monthsDiff);
  };

  return (
    <div data-tauri-drag-region className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-2xl font-bold mb-6">Age en années et mois</h1>
      <input className="border border-gray-400 rounded-lg w-fit px-5" type="date" placeholder="dd-mm-yyyy" onChange={handleBirthdateChange} />
      <div className="flex items-center space-x-4 my-5">
        <label className="text-lg text-center font-semibold">
          Années
          <div className="px-3 py-2 border border-gray-400 rounded-lg w-32">
            {years !== null ? years : ""}
          </div>
        </label>
        <label className="text-lg text-center font-semibold">
          Mois
          <div className="px-3 py-2 border border-gray-400 rounded-lg w-32">
            {months !== null ? months : ""}
          </div>
        </label>
      </div>
    </div>
  );
}

export default App;
