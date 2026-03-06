import styles from "./css/Home.module.css"
import bookshelf from "../assets/bookshelf.avif"
import bookpaper from "../assets/bookpaper.avif"

const HomePage = () => {
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
            För att dela dina egna tankar om böcker du läst gör du det enkelt
            genom att logga in HÄR. Har du inget konto? Ingen fara!
            Du registrerar dig snabbt och smidigt HÄR.
          </p>
        </div>
      </section>
    </>
  )
}

export default HomePage