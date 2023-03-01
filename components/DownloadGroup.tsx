export const DownloadGroup: React.FC<{
  fileTypes: {
    name: string;
    extension: string;
  }[];
  cdnBase: string;
  filename: string;
}> = ({ fileTypes, cdnBase, filename }) => {
  return (
    <div className="btn-group">
      {fileTypes.map((fileType) => (
        <a
          className="btn btn-sm btn-outline mr-1"
          href={`${cdnBase}/${filename}.${fileType.extension}`}
          download
        >
          {fileType.name}
        </a>
      ))}
    </div>
  );
};
