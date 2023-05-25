import { CountryDownloader } from "@/components/CountryDownloader";
import { DownloadGroup } from "@/components/DownloadGroup";

const cdnBaseUrl = "dsbprylw7ncuq.cloudfront.net";

const getIndexMetadata = async () => {
  const indexJson = await fetch(`{${cdnBaseUrl}.net/_file_index.json`)
  // const indexJson = await indexJson.json()
  // return indexJson
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
            cdnBase={cdnBaseUrl}
            filename="million_neighborhoods_africa_data"
          />
        </div>
        <div className="mt-12 md:mt-0 md:w-[50%]">
          <p>Download by country</p>
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
