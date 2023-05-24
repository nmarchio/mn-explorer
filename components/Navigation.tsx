export default function Navigation() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/">
          Million Neighborhoods
        </a>
      </div>
      <div className="flex-none hidden md:block">
        <ul className="menu menu-horizontal px-1">
          <li>

      <div className="tooltip" data-tip={'asdfasdfasdf '}>
            <button className="btn">Hover me</button>
          </div>
          </li>
          {/* <li>
            <a href="/">Map</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/download">Download</a>
          </li> */}
        </ul>
      </div>
      <div className="dropdown dropdown-end md:hidden">
        <label tabIndex={0} className="btn m-0 btn-sm btn-ghost">
          <svg viewBox="0 0 100 100" className="fill w-4 h-4" style={{fill:'black'}}>
            <path d="m5 21.875c0-4.6602 3.7773-8.4375 8.4375-8.4375h73.125c4.6602 0 8.4375 3.7773 8.4375 8.4375s-3.7773 8.4375-8.4375 8.4375h-73.125c-4.6602 0-8.4375-3.7773-8.4375-8.4375zm81.562 19.688h-73.125c-4.6602 0-8.4375 3.7773-8.4375 8.4375s3.7773 8.4375 8.4375 8.4375h73.125c4.6602 0 8.4375-3.7773 8.4375-8.4375s-3.7773-8.4375-8.4375-8.4375zm0 28.125h-73.125c-4.6602 0-8.4375 3.7773-8.4375 8.4375s3.7773 8.4375 8.4375 8.4375h73.125c4.6602 0 8.4375-3.7773 8.4375-8.4375s-3.7773-8.4375-8.4375-8.4375z" />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52"
        >
          {/* <li>
            <a href="/map">Map</a>
          </li> */}
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
