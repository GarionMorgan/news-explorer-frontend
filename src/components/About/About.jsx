import "./About.css";

function About() {
  return (
    <div className="about">
      <div className="about__author_image"></div>
      <div className="about__author_info">
        <h2 className="about__header">About the author</h2>
        <p className="about__text">
          Hi, I’m Garion — a software developer with a strong foundation in both
          frontend and backend technologies. I work with HTML, CSS, JavaScript,
          React, and Git on the client side, and specialize in Express, Node.js,
          Python, MongoDB, Nginx, and PM2 for backend development and
          deployment. My passion lies in creating efficient, scalable, and
          user-friendly web applications. I’m constantly learning and adapting
          to new technologies to deliver the best solutions.
        </p>
        <p className="about__text">
          During my time in the TripleTen Software Engineering program, I gained
          hands-on experience building full-stack applications using
          technologies like React, Express.js, MongoDB, and Node.js. I learned
          to write secure, production-ready code with robust validation,
          authentication, and deployment practices. This foundation enables me
          to help customers by delivering scalable, user-focused solutions that
          solve real-world problems with clarity, reliability, and impact.
        </p>
      </div>
    </div>
  );
}
export default About;
