import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="app__about">
      <section className="about__intro">
        <h1>👋 Hi, I&apos;m Michael Elsky</h1>
        <p>
          A self-taught frontend developer based in Russia with a passion for
          building clean, interactive UIs. My journey began back in 2004 with a
          degree in Applied Informatics in Economics.
        </p>
      </section>

      <section className="about__story">
        <h2>🛤 My Story</h2>
        <p>
          Life threw some tough challenges at me - a long-term health issue put
          my academic and career plans on hold. But I never stopped exploring.
          From online games and music to anime voiceovers, I kept my creativity
          alive.
        </p>
        <p>
          In 2016, I discovered frontend development and instantly felt a
          connection. I dove into HTML and CSS, and eventually, JavaScript and
          React followed.
        </p>
      </section>

      <section className="about__rss">
        <h2>🚀 Enter RSSchool</h2>
        <p>
          In 2023, with my health finally under control, I joined{' '}
          <a
            href="https://rs.school/"
            target="_blank"
            rel="noopener noreferrer"
          >
            RS School
          </a>
          . It became a turning point - I learned not just tech skills, but also
          teamwork, project management, and how to build real-world apps.
        </p>
      </section>

      <section className="about__now">
        <h2>📌 What I&apos;m Doing Now</h2>
        <ul>
          <li>Improving my English skills 🗣️</li>
          <li>Working on open-source and portfolio projects 💻</li>
          <li>Sharpening my React & TypeScript knowledge ⚛️</li>
        </ul>
      </section>

      <footer className="about__footer">
        <p>
          Thanks for reading! Feel free to explore more of the app or visit{' '}
          <Link to="/">Home</Link>.
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;
