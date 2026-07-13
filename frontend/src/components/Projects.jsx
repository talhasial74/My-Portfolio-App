import { useEffect, useState } from 'react';
import { getProjects } from '../api';

const STATUS_LABEL = {
  shipped: 'Shipped',
  in_progress: 'In progress',
  archived: 'Archived'
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section className="section section--paper" id="projects">
      <div className="wrap">
        <div className="section__header">
          <span className="section__index">FIG. 04</span>
          <h2>Projects</h2>
          <span className="rule" aria-hidden="true" />
        </div>

        {status === 'loading' && <p className="state-note">Loading projects from the API…</p>}

        {status === 'error' && (
          <p className="state-note">
            Multi-Tier Web Application on AWS/Azure:
            Deploy a 3-tier architecture (web, app, database) using EC2/VMs, load balancer, and managed database services with proper subnetting and security groups.
          </p>
        )}

        {status === 'ready' && projects.length === 0 && (
          <p className="state-note">
            No projects yet — insert some rows into the `projects` table (see seed.sql)
            to see them appear here.
          </p>
        )}

        {status === 'ready' && projects.length > 0 && (
          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="project-card__media">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} />
                  ) : (
                    <span>NO PREVIEW IMAGE</span>
                  )}
                </div>

                <div className="project-card__body">
                  <div className="project-card__head">
                    <h3>{project.title}</h3>
                    <span className={`stamp stamp--${project.status}`}>
                      {STATUS_LABEL[project.status] || project.status}
                    </span>
                  </div>

                  <p className="project-card__desc">{project.description}</p>

                  {project.tech_stack && (
                    <div className="project-card__tags">
                      {project.tech_stack.split(',').map((tech) => (
                        <span className="tag" key={tech}>
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="project-card__links">
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noreferrer">
                        Code ↗
                      </a>
                    )}
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noreferrer">
                        Live ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
