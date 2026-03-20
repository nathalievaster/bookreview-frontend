import { NavLink, useNavigate } from "react-router-dom"
import styles from "./Header.module.css"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"

const Header = () => {

  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  // States för logga ut-modal
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [loggedOut, setLoggedOut] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setLoggedOut(true)

    let count = 3
    const interval = setInterval(() => {
      count--
      setCountdown(count)
      if (count === 0) {
        clearInterval(interval)
        navigate("/")
        setShowLogoutModal(false)
      }
    }, 1000)
  }

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
            <button onClick={() => setShowLogoutModal(true)} className={styles.logoutButton}>
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

        <NavLink to="/" onClick={() => setMenuOpen(false)}>Startsida</NavLink>

        {user && (
          <NavLink to="/mypage" onClick={() => setMenuOpen(false)}>Mina sidor</NavLink>
        )}

        {user && (
          <NavLink to="/readinglist" onClick={() => setMenuOpen(false)}>Läslista</NavLink>
        )}

        {user?.role === "admin" && (
          <NavLink to="/admin" onClick={() => setMenuOpen(false)}>Admin</NavLink>
        )}

        <NavLink to="/search" onClick={() => setMenuOpen(false)}>Sök böcker</NavLink>

      </nav>

      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
      )}

      {showLogoutModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            {!loggedOut ? (
              <>
                <p>Är du säker på att du vill logga ut?</p>
                <button className="add-btn" onClick={handleLogout}>Ja, logga ut</button>
                <button className="delete-btn" onClick={() => setShowLogoutModal(false)}>Avbryt</button>
              </>
            ) : (
              <p>Du är utloggad. Du dirigeras om till startsidan om {countdown} sekunder.</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Header