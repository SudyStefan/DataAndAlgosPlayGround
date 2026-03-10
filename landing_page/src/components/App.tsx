import { useEffect, useState } from "react";
import "../styles//App.css";
import SiteCard from "./SiteCard";

export type Site = {
  name: string;
  description: string;
  logoPath: string;
  indexPath: string;
};

function App() {
  const [sites, setSites] = useState<Site[]>([]);

  const loadConfig = async (): Promise<any> => {
    const response = await fetch("./sites.json");
    if (!response.ok) {
      throw new Error("Failed to fetch sites.json!");
    }

    const config = await response.json();
    return config;
  };

  useEffect(() => {
    loadConfig()
      .then((config) => setSites(config.sites))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="siteContainer">
        <h1>Available Apps</h1>
        <div className="cardGrid">
          {sites.map((site) => (
            <SiteCard key={site.name} {...site} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
