function Navbar({ darkMode, setDarkMode, search, setSearch }) {
  return (
    <header className="header">
      <a className="brand" href="#home" aria-label="LearnHub home">
        <div className="brand-icon">D</div>
        <div>
          <h2>LearnHub</h2>
          <p>Make learning yours</p>
        </div>
      </a>

      <nav className="nav-links" aria-label="Main navigation">
        <a href="#home">Home</a>
        <a href="#courses">Courses</a>
        <a href="#tasks">To-do List</a>
      </nav>

      <div className="nav-right">
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Find a course..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search courses"
          />
        </label>

        <button
          className="theme-btn"
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <div className="avatar" title="Dafni's profile" aria-label="Dafni">D</div>
      </div>
    </header>
  );
}

export default Navbar;
