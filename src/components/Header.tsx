import { NavLink } from "react-router-dom"
import styles from "./Header.module.css"

const Header = () => {

  const { user, logout } = useAuth()

  return (
    <header className={styles.header}>
      <ul className={styles.navList}>
        <li><NavLink to="/" className={styles.navLink}>Startsida</NavLink></li>
        <li><NavLink to="/mypage" className={styles.navLink}>Mina sidor</NavLink></li>
        <li>
          {
            !user ? <NavLink to="/login" className={styles.navLink}>Logga in</NavLink> : <button onClick={logout} className={styles.logoutButton}>Logga ut</button>
          }
        </li>
      </ul>
    </header>
  )
}

export default Header