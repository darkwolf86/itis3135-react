import { useEffect, useState } from "react";

export default function MyIntroduction() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL =
    "https://dvonb.xyz/api/2025-fall/itis-3135/students/jwatki49";

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setStudent(data);
      } catch (err) {
        console.error("Failed to fetch student data:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p>Loading introduction…</p>;
  if (!student) return <p>No introduction found.</p>;

  return (
    <main>
      <section>
        <h2>
          {student.name.first} {student.name.last}
        </h2>

        {/* Profile Image */}
        {student.media?.hasImage && (
          <figure style={{ textAlign: "center" }}>
            <img
              src={`https://dvonb.xyz${student.media.src}`}
              alt="Profile"
              style={{ maxWidth: "100%", height: "auto", display: "inline-block" }}
            />
            {student.media.caption && <figcaption>{student.media.caption}</figcaption>}
          </figure>
        )}

        {/* Basic Info */}
        <ul>
          <li><strong>Prefix:</strong> {student.prefix}</li>
          <li><strong>Mascot:</strong> {student.mascot}</li>
          <li><strong>Fun Fact:</strong> {student.funFact}</li>
        </ul>

        {/* Backgrounds */}
        <h3>Backgrounds</h3>
        <ul>
          <li><strong>Personal:</strong> {student.backgrounds.personal}</li>
          <li><strong>Professional:</strong> {student.backgrounds.professional}</li>
          <li><strong>Academic:</strong> {student.backgrounds.academic}</li>
          <li><strong>Subject:</strong> {student.backgrounds.subject}</li>
        </ul>

        {/* Courses */}
        <h3>Courses</h3>
        <ul>
          {student.courses?.map((c, i) => (
            <li key={i}>
              {c.dept} {c.num}: {c.name} — {c.reason}
            </li>
          ))}
        </ul>

        {/* Quote */}
        <h3>Quote</h3>
        <p style={{ textAlign: "center" }}>
          “{student.quote.text}” — {student.quote.author}
        </p>

        {/* Links */}
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
      </section>
    </main>
  );
}
