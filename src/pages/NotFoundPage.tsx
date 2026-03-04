import { Link } from "react-router-dom"

function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <h2>Sidan finns inte. </h2>
      <p>Sidan du försöker hitta finns inte eller har tagits bort.</p>

      <Link to="/">Gå tillbaka till startsidan.</Link>
    </div>
  )
}

export default NotFoundPage