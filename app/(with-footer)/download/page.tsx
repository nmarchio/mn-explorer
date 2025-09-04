import { CountryDownloader } from "@/components/CountryDownloader";
import { DownloadGroup } from "@/components/DownloadGroup";

const cdnBaseUrl = "https://dsbprylw7ncuq.cloudfront.net";

const getIndexMetadata = async () => {
  const indexJson = await fetch(`${cdnBaseUrl}/_file_index.json`)
  const {
    countryList,
    fileTypes
  } = await indexJson.json()

  return {
    countryList,
    fileTypes
  }
};

export default async function Download() {
  const {
    countryList,
    fileTypes
  } = await getIndexMetadata();
  return (
    <main className="px-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">Data Download</h1>
        <p>Million Neighborhoods Africa Database (2023) is made available under the Open Database License. <a href="http://opendatacommons.org/licenses/odbl/1.0/"><u>http://opendatacommons.org/licenses/odbl/1.0/</u></a></p>
        <p>The database incorporates multiple sources, including: OpenStreetMap accessed via the Geofabrik download server, 
          DigitizeAfrica building footprints from Maxar Technologies Inc and Ecopia.AI, coastline data from the Daylight Map Distribution, administrative areas from GADM database 4.1, 
          gridded population data from ORNL LandScan 2020 (1km²) and WorldPop 2020 (constrained, 100m²), GHSL Urban Centre database 2015 and OECD/SWAC Africapolis database 2020.</p>
        <p>Please use the following data citation:</p>
        <p>Bettencourt, Luís M.A.; Marchio, Nicholas. (2023). Million Neighborhoods Africa Database. 
          Harvard Dataverse. <a href="https://doi.org/doi:10.7910/DVN/DQY54U."><u>https://doi.org/doi:10.7910/DVN/DQY54U</u></a>.</p>
        <p>And access the published article:</p>
        <p>Bettencourt, Luís M.A., Marchio, Nicholas. Infrastructure deficits and informal settlements in sub-Saharan Africa. 
          Nature (2025). <a href="https://doi.org/10.1038/s41586-025-09465-2."><u>https://doi.org/10.1038/s41586-025-09465-2</u></a>.</p>
        <p>A complete data dictionary is available <a href="https://docs.google.com/spreadsheets/d/1S35EhQcmmHtzuPUkiVllzQOVtpdjkdsHpqvMTJtagi8/edit?usp=sharing"><b><u>here</u></b></a>.</p>
        <p>For any questions or inquiries, please reach out to nmarchio at uchicago.edu</p>
      </div>
      <span className="divider" />
      <div className="flex flex-col mb-4 md:flex-row">
        <div className="md:w-[50%]">
          <p className="mb-2">
            Download all block-level GIS data for sub-Saharan Africa in 
            <a href="https://dsbprylw7ncuq.cloudfront.net/AF/africa_geodata.parquet"> <b><u>a single Parquet file here</u></b> (~8GB).</a>
          </p>
        </div>
        <div className="mt-12 md:mt-0 md:w-[50%]">
          <p>Download block-level GIS data by country:</p>
          <CountryDownloader
            countryList={countryList}
            fileTypes={fileTypes}
            cdnBase={cdnBaseUrl}
          />
        </div>
      </div>
    </main>
  );
}
