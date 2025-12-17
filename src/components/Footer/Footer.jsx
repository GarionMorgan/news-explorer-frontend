import "./Footer.css";
import linkedInIcon from "../../assets/linkedin_icon.svg";
import githubIcon from "../../assets/github_icon.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__api_info">
        <p className="footer__text">
          © 2025 News Explorer, Powered by News API
        </p>
      </div>
      <div className="footer__links">
        <div className="footer__links-text">
          <a href="/" className="footer__links_link">
            Home
          </a>
          <a
            href="https://tripleten.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__links_link"
          >
            TripleTen
          </a>
        </div>
        <div className="footer__links-icons">
          <a
            href="https://github.com/GarionMorgan"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__links_link"
          >
            <img
              src={githubIcon}
              alt="GitHub"
              className="footer__links_link_image"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/garion-morgan/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__links_link"
          >
            <img
              src={linkedInIcon}
              alt="LinkedIn"
              className="footer__links_link_image"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
