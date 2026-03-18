import styles from "./Footer.module.css"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>Boktok</div>

      <div className={styles.columns}>
        <div className={styles.column}>
          <h4>Besök oss</h4>
          <p>Biblioteksgatan 5a</p>
          <p>Bästkusten</p>
        </div>

        <div className={styles.column}>
          <h4>Utforska</h4>
          <p>Sök böcker</p>
          <p>Min läslista</p>
          <p>Mina recensioner</p>
        </div>

        <div className={styles.column}>
          <h4>Följ oss</h4>
          <p><FaFacebook /> Facebook</p>
          <p><FaInstagram /> Instagram</p>
          <p><FaTwitter /> Twitter</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>2026 Boktok AB – Läsning är livet</p>
      </div>
    </footer>
  )
}

export default Footer