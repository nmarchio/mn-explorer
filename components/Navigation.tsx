export default function Navigation() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/">Million Neighborhoods</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/map">Map</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/download">Download</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
