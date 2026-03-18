import { NavLink } from "react-router-dom"
import styles from "./Header.module.css"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"

const Header = () => {

  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className={styles.header}>

        <div className={styles.logo}>
          <NavLink to="/">BOKTOK</NavLink>
        </div>

        <div className={styles.rightSection}>

          {!user ? (
            <NavLink to="/login" className={styles.navLinkLogin}>
              Logga in
            </NavLink>
          ) : (
            <button onClick={logout} className={styles.logoutButton}>
              Logga ut
            </button>
          )}

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>

        </div>

      </header>

      <nav className={`${styles.sideMenu} ${menuOpen ? styles.open : ""}`}>

        <button
          className={styles.closeBtn}
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </button>

        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          Startsida
        </NavLink>

        {user && (
          <NavLink to="/mypage" onClick={() => setMenuOpen(false)}>
            Mina sidor
          </NavLink>
        )}

        {user?.role === "admin" && (
          <NavLink to="/admin" onClick={() => setMenuOpen(false)}>
            Admin
          </NavLink>
        )}

        <NavLink to="/search" onClick={() => setMenuOpen(false)}>
          Sök böcker
        </NavLink>

      </nav>

      {menuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}

export default Header