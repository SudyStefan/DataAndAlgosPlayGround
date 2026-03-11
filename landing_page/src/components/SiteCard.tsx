import type { Site } from "./App";
import { cn } from "../helpers/utils";

const SiteCard = ({ name, description, logoName, indexPath }: Site) => {
  return (
    <a className="siteRef" href={indexPath}>
      <div
        className={cn(
          "flex h-full flex-col items-center justify-center",
          "rounded-xl border border-amber-100 bg-stone-600",
          "p-5 shadow-sm",
          "transition-all duration-200 ease-in-out",
          "hover:scale-105 hover:shadow-lg",
        )}
      >
        <div className="flex min-h-[20%]">
          <h1 className="pb-5 text-center text-2xl font-bold text-slate-400">
            {name}
          </h1>
        </div>
        <div className="flex w-full grow flex-row flex-wrap justify-center">
          <div className="grow basis-2/5">
            <img
              alt={`${name} Logo`}
              src={logoName}
              className="h-auto max-w-full rounded-lg"
            />
          </div>
          <div className="grow basis-3/5">
            <p className="font-semibold text-slate-400">{description}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default SiteCard;
