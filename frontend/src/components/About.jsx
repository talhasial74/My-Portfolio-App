import { profile } from '../profileData';

export default function About() {
  return (
    <section className="section section--paper" id="about">
      <div className="wrap">
        <div className="section__header">
          <span className="section__index">FIG. 02</span>
          <h2>About</h2>
          <span className="rule" aria-hidden="true" />
        </div>

        <div className="about">
          <div className="about__bio">
            {profile.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <dl className="spec-sheet">
            <div className="spec-sheet__row">
              <dt>Name</dt>
              <dd>{profile.name}</dd>
            </div>
            <div className="spec-sheet__row">
              <dt>Role</dt>
              <dd>{profile.role}</dd>
            </div>
            <div className="spec-sheet__row">
              <dt>Location</dt>
              <dd>{profile.location}</dd>
            </div>
            <div className="spec-sheet__row">
              <dt>Status</dt>
              <dd>{profile.availability}</dd>
            </div>
            <div className="spec-sheet__row">
              <dt>Resume</dt>
              <dd>
                <a href={profile.resumeUrl}>Download ↓</a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
