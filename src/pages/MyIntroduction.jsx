import { useEffect, useState, useMemo } from "react";

export default function AllStudentIntroductions() {
  const API_URL = "https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1";

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0); // slideshow index

  // Checkbox filters
  const [filters, setFilters] = useState({
    name: true,
    mascot: true,
    image: true,
    personal: true,
    backgrounds: true,
    classes: true,
    extra: true,
    quote: true,
    links: true,
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // -------- FILTER + SEARCH --------
  const filteredStudents = useMemo(() => {
    const q = query.toLowerCase();
    return students.filter((s) => {
      const fullName = `${s.name.first} ${s.name.last}`.toLowerCase();
      return fullName.includes(q);
    });
  }, [students, query]);

  // Reset index when filter changes
  useEffect(() => {
    setIndex(0);
  }, [filteredStudents.length]);

  if (loading) return <p>Loading students…</p>;

  if (filteredStudents.length === 0)
    return (
      <main>
        <h2>0 Introductions Found</h2>
        <p>No students match your search.</p>
      </main>
    );

  const student = filteredStudents[index];

  // Slideshow controls
  const next = () => setIndex((i) => (i + 1) % filteredStudents.length);
  const prev = () => setIndex((i) => (i - 1 + filteredStudents.length) % filteredStudents.length);

  return (
    <main>
      <h1>Student Introductions</h1>

      {/* Search box */}
      <input
        type="text"
        placeholder="Search by student name…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "0.5rem", width: "60%", maxWidth: "400px" }}
      />

      {/* Counter */}
      <p>
        <strong>{filteredStudents.length}</strong> introduction(s) found
      </p>

      {/* Checkboxes */}
      <fieldset style={{ marginBottom: "1rem" }}>
        <legend>Show / Hide Fields</legend>

        {Object.entries(filters).map(([key, value]) => (
          <label key={key} style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={value}
              onChange={() =>
                setFilters((prev) => ({ ...prev, [key]: !prev[key] }))
              }
            />
            {" "}
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
        ))}
      </fieldset>

      {/* Slideshow navigation */}
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={prev}>Previous</button>
        <button onClick={next} style={{ marginLeft: "1rem" }}>Next</button>
      </div>

      {/* ——— STUDENT INTRODUCTION ——— */}
      <section style={{ border: "1px solid #555", padding: "1rem", borderRadius: "8px" }}>
        {filters.name && (
          <h2>
            {student.name.first} {student.name.last}
          </h2>
        )}

        {filters.image && student.media?.hasImage && (
          <figure style={{ textAlign: "center" }}>
            <img
              src={`https://dvonb.xyz${student.media.src}`}
              alt="Profile"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
            />
            {student.media.caption && <figcaption>{student.media.caption}</figcaption>}
          </figure>
        )}

        {filters.mascot && (
          <p><strong>Mascot:</strong> {student.mascot}</p>
        )}

        {filters.extra && (
          <>
            <p><strong>Prefix:</strong> {student.prefix}</p>
            <p><strong>Fun Fact:</strong> {student.funFact}</p>
          </>
        )}

        {filters.personal && (
          <p><strong>Personal Statement:</strong> {student.backgrounds.personal}</p>
        )}

        {filters.backgrounds && (
          <>
            <h3>Backgrounds</h3>
            <ul>
              <li><strong>Professional:</strong> {student.backgrounds.professional}</li>
              <li><strong>Academic:</strong> {student.backgrounds.academic}</li>
              <li><strong>Subject:</strong> {student.backgrounds.subject}</li>
            </ul>
          </>
        )}

        {filters.classes && (
          <>
            <h3>Courses</h3>
            <ul>
              {student.courses?.map((c, i) => (
                <li key={i}>
                  {c.dept} {c.num}: {c.name} — {c.reason}
                </li>
              ))}
            </ul>
          </>
        )}

        {filters.quote && (
          <>
            <h3>Quote</h3>
            <p style={{ textAlign: "center" }}>
              “{student.quote.text}” — {student.quote.author}
            </p>
          </>
        )}

        {filters.links && (
          <>
            <h3>Links</h3>
            <ul>
              {Object.entries(student.links).map(([key, value]) => (
                <li key={key}>
                  <a href={value} target="_blank" rel="noopener noreferrer">
                    {key}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  );
}
