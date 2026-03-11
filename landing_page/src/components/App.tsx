import { useEffect, useState } from "react";
import SiteCard from "./SiteCard";

export type Site = {
  name: string;
  description: string;
  logoName: string;
  indexPath: string;
};

type AppConfig = {
  sites: Site[];
};

const App = () => {
  const [sites, setSites] = useState<Site[]>([]);

  const loadConfig = async (): Promise<AppConfig> => {
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
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-center bg-stone-800">
      <h1 className="pb-5 text-center text-5xl font-bold text-slate-400">
        Available Apps
      </h1>
      <div className="mx-auto grid w-[90%] grid-cols-[repeat(auto-fit,400px)] justify-center gap-5">
        {sites.map((site) => (
          <SiteCard key={site.name} {...site} />
        ))}
      </div>
    </div>
  );
};

export default App;
