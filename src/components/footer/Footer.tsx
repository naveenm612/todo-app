import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        Created By  <strong className="name">Naveen M</strong>
      </div>

      <div className="footer-center">
        <span>Enhanced Todo App</span> • <span>React</span> • <span>TypeScript</span>
      </div>

      <div className="footer-right">
        <a
          href="https://github.com/naveenm612/todo-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>{" "}
        •{" "}
        <a
          href="https://todo-app-seven-pearl.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Deployed on Vercel
        </a>
      </div>
    </footer>
  );
};

export default Footer;
