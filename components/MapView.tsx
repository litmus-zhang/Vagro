"use client";

import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { CountryData } from "@/lib/countries-data";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface MapViewProps {
  filteredCountries: CountryData[];
}

export default function MapView({ filteredCountries }: MapViewProps) {
  const [content, setContent] = useState("");

  const countryMap = new Map(
    filteredCountries.map((country) => [country.code, country])
  );

  return (
    <div className="w-full">
      <div className="border rounded-lg p-4 shadow-lg bg-white">
        <ComposableMap
          projectionConfig={{
            scale: 147,
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryData = countryMap.get(geo.id);
                const isFiltered = filteredCountries.length > 0 && !countryData;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isFiltered ? "#E0E0E0" : "#DDD"}
                    stroke="#FFF"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: {
                        fill: isFiltered ? "#E0E0E0" : "#F53",
                        outline: "none",
                        cursor: countryData ? "pointer" : "default",
                      },
                      pressed: {
                        fill: isFiltered ? "#E0E0E0" : "#E42",
                        outline: "none",
                      },
                    }}
                    onMouseEnter={() => {
                      if (countryData) {
                        setContent(countryData.code);
                      }
                    }}
                    onMouseLeave={() => {
                      setContent("");
                    }}
                    data-tooltip-id="country-tooltip"
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
      <Tooltip
        id="country-tooltip"
        render={() => {
          if (!content) return null;
          const country = countryMap.get(content);
          if (!country) return null;
          
          return (
            <div className="text-left p-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{country.flag}</span>
                <div className="font-bold text-lg">{country.name}</div>
              </div>
              <div className="space-y-1 text-sm">
                <div><span className="font-semibold">Local Name:</span> {country.localName}</div>
                <div><span className="font-semibold">Code:</span> {country.code}</div>
                <div><span className="font-semibold">Dial Code:</span> {country.dialCode}</div>
                <div><span className="font-semibold">Currency:</span> {country.currency} ({country.currencySymbol})</div>
                <div><span className="font-semibold">Currency Code:</span> {country.currencyCode}</div>
              </div>
            </div>
          );
        }}
        className="!bg-gray-900 !text-white !rounded-lg !p-3 !opacity-100 !z-50"
        style={{ maxWidth: "350px" }}
      />
    </div>
  );
}
