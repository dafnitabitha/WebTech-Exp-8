import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import StatCard from "./components/StatCard.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [newTask, setNewTask] = useState("");

  const [tasks, setTasks] = useState([
    { id: 1, title: "Finish UI design assignment", done: false },
    { id: 2, title: "Review Python notes", done: true },
    { id: 3, title: "Prepare for weekly quiz", done: false }
  ]);

  const courses = [
    { name: "UI / UX Design", code: "DES101", progress: 84, icon: "🎨" },
    { name: "Python Programming", code: "CS102", progress: 76, icon: "🐍" },
    { name: "Data Structures", code: "CS203", progress: 62, icon: "🧩" },
    { name: "Digital Marketing", code: "MKT104", progress: 91, icon: "📣" },
    { name: "Web Development", code: "WEB205", progress: 70, icon: "💻" }
  ];

  const filteredCourses = courses.filter((course) =>
    `${course.name} ${course.code}`.toLowerCase().includes(search.toLowerCase())
  );

  function addTask(event) {
    event.preventDefault();
    if (!newTask.trim()) return;

    setTasks((current) => [
      ...current,
      { id: Date.now(), title: newTask.trim(), done: false }
    ]);
    setNewTask("");
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((item) => item.id !== id));
  }

  const completedTasks = tasks.filter((item) => item.done).length;
  const taskProgress = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        search={search}
        setSearch={setSearch}
      />

      <main className="dashboard">
        <section className="welcome-section" id="home">
          <div>
            <p className="eyebrow">YOUR LEARNING SPACE</p>
            <h1>Hey Dafni, ready to shine? ✨</h1>
            <p className="welcome-text">
              Keep curious, keep learning, and celebrate every little win.
            </p>
          </div>

          <div className="focus-card">
            <span className="focus-icon" aria-hidden="true">🌿</span>
            <div>
              <strong>Today's focus</strong>
              <p>One step at a time</p>
            </div>
          </div>
        </section>

        <section className="stats-grid" aria-label="Learning statistics">
          <StatCard title="Active Courses" value="5" icon="📚" color="#ccfbf1" note="Keep it going" />
          <StatCard title="Tasks Due" value={String(tasks.filter((item) => !item.done).length)} icon="✅" color="#ffedd5" note="Stay on track" />
          <StatCard title="Attendance" value="95%" icon="🗓️" color="#dbeafe" note="Great consistency" />
          <StatCard title="Average Grade" value="A−" icon="⭐" color="#fef3c7" note="Lovely progress" />
        </section>

        <section className="content-grid">
          <div className="panel courses-panel" id="courses">
            <div className="section-heading">
              <div>
                <p className="eyebrow">GROW YOUR SKILLS</p>
                <h2>My Courses</h2>
              </div>
              <span className="count-badge">{filteredCourses.length} courses</span>
            </div>

            <div className="course-list">
              {filteredCourses.map((course) => (
                <article className="course-item" key={course.code}>
                  <div className="course-icon" aria-hidden="true">{course.icon}</div>
                  <div className="course-info">
                    <div className="course-title-row">
                      <h3>{course.name}</h3>
                      <span className="course-code">{course.code}</span>
                    </div>
                    <div
                      className="progress-track"
                      role="progressbar"
                      aria-valuenow={course.progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-label={`${course.name} completion`}
                    >
                      <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                    </div>
                    <span className="progress-label">{course.progress}% completed</span>
                  </div>
                </article>
              ))}

              {filteredCourses.length === 0 && (
                <p className="empty-message">No courses match your search. Try another keyword.</p>
              )}
            </div>
          </div>

          <div className="panel tasks-panel" id="tasks">
            <div className="section-heading">
              <div>
                <p className="eyebrow">A LITTLE PLAN GOES A LONG WAY</p>
                <h2>My To-do List</h2>
              </div>
              <span className="count-badge">{completedTasks}/{tasks.length} done</span>
            </div>

            <form className="task-form" onSubmit={addTask}>
              <input
                type="text"
                placeholder="Add a task for today..."
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
                aria-label="New task"
              />
              <button type="submit" className="add-btn">Add +</button>
            </form>

            <div className="task-list">
              {tasks.map((item) => (
                <div className={`task-item ${item.done ? "completed" : ""}`} key={item.id}>
                  <label className="task-label">
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => toggleTask(item.id)}
                    />
                    <span>{item.title}</span>
                  </label>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => deleteTask(item.id)}
                    aria-label={`Delete ${item.title}`}
                    title="Delete task"
                  >
                    ×
                  </button>
                </div>
              ))}

              {tasks.length === 0 && (
                <p className="empty-message">All clear! Add a task whenever you're ready.</p>
              )}
            </div>

            <div className="task-summary">
              <span>Weekly task progress</span>
              <strong>{taskProgress}%</strong>
            </div>
            <div className="progress-track summary-track">
              <div className="progress-fill" style={{ width: `${taskProgress}%` }} />
            </div>

            <div className="encouragement">
              <span aria-hidden="true">💡</span>
              <p><strong>Friendly reminder:</strong> Take short breaks and give yourself credit for your progress.</p>
            </div>
          </div>
        </section>

        <footer className="footer" id="profile">
          <p>© 2026 LearnHub · Dafni's student dashboard</p>
          <p>Learn with purpose. Grow with confidence. 🌱</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
