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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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

        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <input type="password" placeholder="Lösenord" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button className="add-btn" type="submit">Logga in</button>
        <p>Inget konto än?</p>
        <button className="add-btn" onClick={() => navigate("/register")}>Registrera dig här</button>

      </form>

      {error && (<p className={styles.error}> {error}</p>)}
    </div>
  )
}

export default LoginPage