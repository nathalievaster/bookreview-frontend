import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import styles from "./css/LoginPage.module.css"

const LoginPage = () => {

  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Nollställ felmeddelanden
    setEmailError("")
    setPasswordError("")
    setError("")

    // Validering
    let hasError = false

    if (!email.trim()) {
      setEmailError("Fyll i e-postadress")
      hasError = true
    }

    if (!password.trim()) {
      setPasswordError("Fyll i lösenord")
      hasError = true
    }

    if (hasError) return

    try {
      await login({ email, password })
      navigate("/")
    } catch {
      setError("Fel användarnamn eller lösenord")
    }
  }

  return (
    <div className={styles.container}>

      <h1>Logga in</h1>

      <form onSubmit={handleSubmit} className={styles.form}>

        <input type="text" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} />
        {emailError && <p className={styles.error}>{emailError}</p>}

        <input type="password" placeholder="Lösenord" value={password}
          onChange={(e) => setPassword(e.target.value)} />
        {passwordError && <p className={styles.error}>{passwordError}</p>}

        {error && <p className={styles.error}>{error}</p>}

        <button className="add-btn" type="submit">Logga in</button>
        <p>Inget konto än?</p>
        <button className="add-btn" onClick={() => navigate("/register")}>Registrera dig här</button>

      </form>

    </div>
  )
}

export default LoginPage