export default function Footer() {
  return (
    <footer className="app-footer">
      <p className="footer-name">
        Built by <strong>AAKASH</strong>
      </p>

      <div className="footer-links">
        <a
          href="https://github.com/aako-aakash/BARE-METAL"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>

        <span>·</span>

        <a
          href="https://www.linkedin.com/in/akash-kumar-saw-bb1630258"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()}
      </p>
    </footer>
  )
}
