import { useEffect, useState } from 'react';
import { getSkills } from '../api';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error

  useEffect(() => {
    getSkills()
      .then((data) => {
        setSkills(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  const grouped = skills.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section className="section section--ink" id="skills">
      <div className="wrap">
        <div className="section__header">
          <span className="section__index">FIG. 03</span>
          <h2>Skills</h2>
          <span className="rule" aria-hidden="true" />
        </div>

        {status === 'loading' && (
          <p className="state-note">Loading skills from the API…</p>
        )}

        {status === 'error' && (
          <p className="state-note">
          Experience in deploying, managing, and scaling cloud-based network infrastructures. Ensures secure and flexible system architecture.
          </p>
        )}

        {status === 'ready' &&
          Object.entries(grouped).map(([category, items]) => (
            <div className="skills-group" key={category}>
              <p className="skills-group__label">
                {category}
                <span className="rule" aria-hidden="true" />
              </p>
              <div className="skills-grid">
                {items.map((skill) => (
                  <div className="skill-chip" key={skill.id}>
                    <div className="skill-chip__top">
                      <span className="skill-chip__name">{skill.name}</span>
                      <span className="skill-chip__pct">{skill.proficiency}%</span>
                    </div>
                    <div className="skill-chip__bar">
                      <div
                        className="skill-chip__fill"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
