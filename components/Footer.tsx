export default function Footer() {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div>
        <img src="/mansueto_logo.png" className="max-w-md w-full mb-4" />
        <p>
          1155 E 60th Street
          <br />
          Chicago, IL 60637
          <br />
          (773) 702-7894
          <br />
          <p className="my-4">
            © {new Date().getUTCFullYear()} The
            University of Chicago <br />
            All rights reserved
          </p>
        </p>
      </div>
      <div>
        <span className="footer-title">Million Neighborhoods</span>
        <a className="link link-hover" href="/">Map</a>
        <a className="link link-hover" href="/about">About</a>
        <a className="link link-hover" href="/download">Download</a>
        {/* <a className="link link-hover">Publication</a> */}
      </div>
      <div>
        <span className="footer-title">Contributing Organizations</span>
        <a className="link link-hover" href="https://www.uchicago.edu/" target="_blank" rel="noopener noreferer">University of Chicago</a>
        <a className="link link-hover" href="https://miurban.uchicago.edu/" target="_blank" rel="noopener noreferer">Mansueto Institute for Urban Innovation</a>
        <a className="link link-hover" href="https://openspatial.io/" target="_blank" rel="noopener noreferer">Open Spatial Lab @ DSI</a>
        <a className="link link-hover" href="https://rcc.uchicago.edu/" target="_blank" rel="noopener noreferer">Research Computing Center</a>
      </div>
    </footer>
  );
}
