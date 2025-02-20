import { useEffect, useState } from "react";

function App() {
  const [odds, setOdds] = useState(null);

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const response = await fetch("https://odds.p.rapidapi.com/v4/sports?regions=us", {
          headers: {
            "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY as string,
            "x-rapidapi-host": "odds.p.rapidapi.com",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log("Betting Odds API Response:", data);
        setOdds(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOdds();
  }, []);

  return (
    <div>
      <h1>Stat Trick</h1>
      <h2>Betting Odds Data (Check Console)</h2>
      <pre>{odds ? JSON.stringify(odds, null, 2) : "Loading..."}</pre>
    </div>
  );
}

export default App;
