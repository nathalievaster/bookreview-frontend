import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./css/LoginPage.module.css"

const RegisterPage = () => {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Nollställ felmeddelanden
    setUsernameError("")
    setEmailError("")
    setPasswordError("")
    setError("")

    // Validering
    let hasError = false

    if (!username.trim()) {
      setUsernameError("Fyll i användarnamn")
      hasError = true
    }

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

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      })

      if (!res.ok) {
        throw new Error()
      }

      navigate("/login")

    } catch {
      setError("Kunde inte registrera användare")
    }
  }

  return (
    <div className={styles.container}>

      <h1>Registrera konto</h1>

      <form onSubmit={handleSubmit} className={styles.form}>

        <input type="text" placeholder="Användarnamn" value={username}
          onChange={(e) => setUsername(e.target.value)} />
        {usernameError && <p className={styles.error}>{usernameError}</p>}

        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} />
        {emailError && <p className={styles.error}>{emailError}</p>}

        <input type="password" placeholder="Lösenord" value={password}
          onChange={(e) => setPassword(e.target.value)} />
        {passwordError && <p className={styles.error}>{passwordError}</p>}

        {error && <p className={styles.error}>{error}</p>}

        <button className="add-btn" type="submit">Skapa konto</button>

      </form>

    </div>
  )
}

export default RegisterPage