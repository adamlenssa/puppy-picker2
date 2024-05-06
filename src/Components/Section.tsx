import { ReactNode } from "react";
import { useGlobalContext } from "./GlobalContext";
import { TActiveTab } from "../types";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { favoritedDogs, unfavoritedDogs, activeTab, setActiveTab } =
    useGlobalContext();
  const toggleTab = (tab: TActiveTab) => {
    if (tab === activeTab) {
      setActiveTab("all");
    } else {
      setActiveTab(tab);
    }
  };
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${activeTab === "favorited" && "active"}`}
            onClick={() => {
              toggleTab("favorited");
            }}
          >
            favorited ( {favoritedDogs.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${activeTab == "unfavorited" && "active"}`}
            onClick={() => {
              toggleTab("unfavorited");
            }}
          >
            unfavorited ( {unfavoritedDogs.length} )
          </div>
          <div
            className={`selector ${activeTab == "form" && "active"}`}
            onClick={() => {
              toggleTab("form");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
