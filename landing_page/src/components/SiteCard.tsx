import type { Site } from "./App";

const SiteCard = ({ name, description, logoPath, indexPath }: Site) => {
  return (
    <a className="siteRef" href={indexPath}>
      <div className="siteCard">
        <div className="siteHeader">
          <h1>{name}</h1>
        </div>
        <div className="siteBody">
          <div className="siteLogo">
            <img alt={`${name} logo`} src={logoPath} />
          </div>
          <div className="siteDesc">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default SiteCard;
