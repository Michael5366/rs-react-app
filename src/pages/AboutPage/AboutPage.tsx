import { Link } from 'react-router-dom';
import PageHeader from '../../components/Templates/PageHeader/PageHeader';

const AboutPage = () => {
  return (
    <div className="app__about-container">
      <PageHeader level={1}>About the Project</PageHeader>
      <p className="app__about-author">
        This application was created by:{' '}
        <strong>
          <a
            href="https://github.com/Michael5366"
            target="_blank"
            rel="noreferrer"
          >
            Michael Elsky
          </a>
        </strong>
      </p>
      <p>
        The project is part of the educational course from The Rolling Scopes
        School.
      </p>
      <a
        href="https://rs.school/react/"
        target="_blank"
        rel="noopener noreferrer"
        className="app__about-link"
      >
        RS School React Course
      </a>
      <br />
      <Link to="/" className="app__about-back-link">
        ← Back to Search
      </Link>
    </div>
  );
};

export default AboutPage;
