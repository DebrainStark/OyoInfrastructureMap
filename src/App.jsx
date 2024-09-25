import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MapComponent from "./Components/Map/Map";
import StatisticsCard from "./Components/Charts/StatisticsCard";
import { ButtonGroup } from "./Components/UI/Button";
import { generateMockData } from "./Data/InfrastructureData";
import { getStatistics } from "./Data/StatsData";
import "./Styles/App.css";

const App = () => {
  const [activeLayer, setActiveLayer] = useState("all");
  const [infrastructureData, setInfrastructureData] = useState([]);
  const [mapCenter, setMapCenter] = useState([8.1574, 3.6147]);
  const [mapZoom, setMapZoom] = useState(8);

  useEffect(() => {
    const generatedData = generateMockData();
    setInfrastructureData(generatedData);
  }, []);

  const filteredData = activeLayer === "all"
    ? infrastructureData
    : infrastructureData.filter((item) => item.type === activeLayer);

  const comparisonData = getStatistics(infrastructureData);

  return (
    <div className="app-container">
       <header className="bg-white shadow-sm py-4">
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <h1 className="mb-0 text-success font-weight-bold">OYO STATE INFRASTRUCTURE MAP</h1>
          <p className="mb-0 text-muted">Visualize and analyze state infrastructure data</p>
        </div>
      </div>
    </header>

      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-lg-8 mb-4">
            <div className="card">
              <div className="card-body p-0">
                <MapComponent
                  mapCenter={mapCenter}
                  mapZoom={mapZoom}
                  filteredData={filteredData}
                  setMapCenter={setMapCenter}
                  setMapZoom={setMapZoom}
                />
              </div>
              <div className="card-footer border-top-0">
                <ButtonGroup
                  activeLayer={activeLayer}
                  setActiveLayer={setActiveLayer}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <StatisticsCard
              data={infrastructureData}
              comparisonData={comparisonData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;