import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./css/LoginPage.module.css"

const RegisterPage = () => {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
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

        <input type="text" placeholder="Användarnamn" value={username} onChange={(e) => setUsername(e.target.value)}/>

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>

        <input type="password" placeholder="Lösenord" value={password} onChange={(e) => setPassword(e.target.value)}/>

        <button className="add-btn" type="submit">Skapa konto</button>

      </form>

      {error && (
        <p className={styles.error}>
          {error}
        </p>
      )}

    </div>
  )
}

export default RegisterPage