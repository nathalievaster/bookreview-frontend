import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import type { ReadingListEntry } from "../types/readinglist.types"
import styles from "./css/ReadingListPage.module.css"

const statusLabel: Record<string, string> = {
  want_to_read: "Vill läsa",
  reading: "Läser just nu",
  done: "Klar"
}

const ReadingListPage = () => {
  const { user } = useAuth()
  const [list, setList] = useState<ReadingListEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchList()
  }, [])

  const fetchList = async () => {
    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:5000/api/readinglist", {
      headers: { Authorization: `Bearer ${token}` }
    })

    const data = await res.json()
    setList(data)
    setLoading(false)
  }

  const handleStatusChange = async (id: string, status: string) => {
    const token = localStorage.getItem("token")

    const res = await fetch(`http://localhost:5000/api/readinglist/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    })

    const updated = await res.json()
    setList(list.map(entry => entry._id === id ? updated : entry))
  }

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token")

    await fetch(`http://localhost:5000/api/readinglist/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })

    setList(list.filter(entry => entry._id !== id))
  }

  if (loading) return <p>Laddar läslistan...</p>

  return (
    <div>
      <h1>Min läslista</h1>

      {list.length === 0 && <p>Du har inga böcker i din läslista ännu.</p>}

      {list.map(entry => (
        <div key={entry._id}>
          {entry.bookImage && <img src={entry.bookImage} alt={entry.bookTitle} />}
          <h3>{entry.bookTitle}</h3>

          <select
            value={entry.status}
            onChange={(e) => handleStatusChange(entry._id, e.target.value)}
          >
            <option value="want_to_read">Vill läsa</option>
            <option value="reading">Läser just nu</option>
            <option value="done">Klar</option>
          </select>

          <p>{statusLabel[entry.status]}</p>

          <button className="delete-btn" onClick={() => handleDelete(entry._id)}>Ta bort</button>
        </div>
      ))}
    </div>
  )
}

export default ReadingListPage