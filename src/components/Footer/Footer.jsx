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
        <button className="footer__links_link">Home</button>
        <button className="footer__links_link">TripeTen</button>
        <button className="footer__links_link">
          <img
            src={githubIcon}
            alt="GitHub"
            className="footer__links_link_image"
          />
        </button>
        <button className="footer__links_link">
          <img
            src={linkedInIcon}
            alt="LinkedIn"
            className="footer__links_link_image"
          />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
