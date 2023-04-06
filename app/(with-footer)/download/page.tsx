import { CountryDownloader } from "@/components/CountryDownloader";
import { DownloadGroup } from "@/components/DownloadGroup";

const getCountryList = async () => {
  // const countryList = await fetch("cdn.net/index_of_countries.json")
  // const countryListJson = await countryList.json()
  // return countryListJson
  return [
    {
      name: "Kenya",
      filepath: "kenya",
    },
    {
      name: "South Africa",
      filepath: "south_africa",
    },
  ];
};

// hard coded implementation
// const countryList = [
//   {
//     name: "Kenya",
//     filepath: "kenya",
//   },
//   {
//     name: "South Africa",
//     filepath: "south_africa",
//   },
// ];

const fileTypes = [
  {
    name: "Shapefile",
    extension: "zip",
  },
  {
    name: "Parquet",
    extension: "parquet",
  },
  {
    name: "CSV / Excel",
    extension: "csv",
  },
  {
    name: "GeoJSON",
    extension: "geojson",
  },
];

const cdnBase = "https://cloudfront1234.net";

export default async function Download() {
  // dynamic fetch
  const countryList = await getCountryList();
  return (
    <main className="px-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">Data Download</h1>
        <p>Data is provided for free download under the following license:</p>
        <pre>A good license!</pre>
        <p>Use the following citation:</p>
        <pre>A good citation!</pre>
        <p>For any questions, press inquieries reach out to...</p>
      </div>
      <span className="divider" />
      <div className="flex flex-col mb-4 md:flex-row">
        <div className="md:w-[50%]">
          <p className="mb-2">
            Download <b>all</b> data (subsaharan Africa):
          </p>
          <DownloadGroup
            fileTypes={fileTypes}
            cdnBase={cdnBase}
            filename="million_neighborhoods_africa_data"
          />
        </div>
        <div className="mt-12 md:mt-0 md:w-[50%]">
          <p>Download by country</p>
          <CountryDownloader
            countryList={countryList}
            fileTypes={fileTypes}
            cdnBase={cdnBase}
          />
        </div>
      </div>
    </main>
  );
}
