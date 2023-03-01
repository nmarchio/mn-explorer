"use client";

import React from "react";
import { DownloadGroup } from "./DownloadGroup";

export const CountryDownloader: React.FC<{
  countryList: { name: string; filepath: string }[];
  fileTypes: {
    name: string;
    extension: string;
  }[];
  cdnBase: string;
}> = ({ countryList, fileTypes, cdnBase }) => {
  const [selectedCountry, setSelectedCountry] = React.useState<
    typeof countryList[0] | null
  >(null);
  return (
    <>
      <select
        className="select w-full max-w-xs"
        onChange={(e) => {
          const selectedCountry = countryList.find(
            (country) => country.name === e.target.value
          );
          selectedCountry && setSelectedCountry(selectedCountry);
        }}
      >
        <option disabled selected>
          {selectedCountry ? selectedCountry.name : "Choose a country"}
        </option>
        {countryList.map((country) => (
          <option key={country.name} value={country.name}>{country.name}</option>
        ))}
      </select>
      {selectedCountry && <div className="my-4">
        <DownloadGroup
          fileTypes={fileTypes}
          cdnBase={cdnBase}
          filename={selectedCountry.filepath}
          />

      </div>}
    </>
  );
};
