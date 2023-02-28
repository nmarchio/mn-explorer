export default function Footer() {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div>
        <img src="/mansueto_logo.png" className="max-w-md mb-4" />
        <p>
          1155 E 60th Street
          <br />
          Chicago, IL 60637
          <br />
          (773) 702-7894
          <br />
          <div className="divider"></div>© {new Date().getUTCFullYear()} The
          University of Chicago <br />
          All rights reserved
        </p>
      </div>
      <div>
        <span className="footer-title">Million Neighborhoods</span>
        <a className="link link-hover">Map</a>
        <a className="link link-hover">About</a>
        <a className="link link-hover">Download</a>
        <a className="link link-hover">Publication</a>
      </div>
      <div>
        <span className="footer-title">Contributing Organizations</span>
        <a className="link link-hover">University of Chicago</a>
        <a className="link link-hover">Mansueto Institute for Urban Innovation</a>
        <a className="link link-hover">Open Spatial Lab @ DSI</a>
        <a className="link link-hover">Research Computing Center</a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
    </footer>
  );
}
