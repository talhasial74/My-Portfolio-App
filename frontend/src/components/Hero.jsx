import { profile } from '../profileData';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero__inner">
        <div className="title-block">
          <span className="title-block__corner title-block__corner--tl" aria-hidden="true" />
          <span className="title-block__corner title-block__corner--tr" aria-hidden="true" />
          <span className="title-block__corner title-block__corner--bl" aria-hidden="true" />
          <span className="title-block__corner title-block__corner--br" aria-hidden="true" />

          <p className="title-block__eyebrow">
            {profile.role}
            <span className="rule" aria-hidden="true" />
            FIG. 01
          </p>

          <h1>
            {profile.name.split(' ')[0]} <span className="accent">{profile.name.split(' ').slice(1).join(' ')}</span>
          </h1>

          <p className="tagline">{profile.tagline}</p>

          <div className="hero__ctas">
            <a className="btn btn--primary" href="#projects">
              View projects →
            </a>
            <a className="btn btn--ghost" href="#contact">
              Get in touch
            </a>
          </div>
        </div>
      </div>

      <div className="hero__coords" aria-hidden="true">
        {profile.location.toUpperCase()}
        <br />
        SCALE 1:1 — REV. 2026
      </div>
    </section>
  );
}
