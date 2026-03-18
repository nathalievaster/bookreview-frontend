import styles from "./css/Home.module.css"
import bookshelf from "../assets/bookshelf.avif"
import bookpaper from "../assets/bookpaper.avif"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <>
      <section className={styles.section}>
        <img className={styles.rounded} src={bookshelf} alt="Bokhylla" />
        <div>
          <h1>Välkommen till Boktok!</h1>
          <p>
            Har du svårt att komma på vilken bok du ska dyka ner i härnäst?
            Eller vill du läsa andras tankar om boken du precis läst klart?
            Här på Boktok kan du, utan eget konto, söka bland böcker
            och läsa andra användares recensioner.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.second}`}>
        <img src={bookpaper} alt="Blad ur flera böcker" />
        <div>
          <h2>Vill du bidra med egna recensioner?</h2>
          <p>
            För att dela dina egna tankar om böcker du läst behöver du vara inloggad.
          </p>
          <button className={styles.buttonlinks} onClick={() => navigate("/login")}>
            Logga in
          </button>
          <p>
            Har du inget konto? Ingen fara, det går snabbt och smidigt att komma igång.
          </p>
          <button className={styles.buttonlinks} onClick={() => navigate("/register")}>
            Registrera dig
          </button>
        </div>
      </section>
    </>
  )
}

export default HomePage