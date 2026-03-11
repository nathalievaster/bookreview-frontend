import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import styles from "./css/MyPage.module.css"
import type { Review } from "../types/review.types"
import { useNavigate } from "react-router-dom"

const MyPage = () => {

  const { user } = useAuth()

  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  // States för redigera recension
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")
  const [editRating, setEditRating] = useState(5)

  useEffect(() => {
    fetchMyReviews()
  }, [])

  const fetchMyReviews = async () => {

    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:5000/api/reviews/myreviews", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await res.json()

    setReviews(data)
    setLoading(false)
  }

  if (loading) {
    return <p>Laddar dina recensioner...</p>
  }

  // Radera recension
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token")

    await fetch(`http://localhost:5000/api/reviews/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    setReviews(reviews.filter(r => r._id !== id))
  }

  // Starta redigering
  const handleEdit = (review: Review) => {
    setEditingReviewId(review._id)
    setEditText(review.reviewText)
    setEditRating(review.rating)
  }

  // Spara redigering
  const handleUpdate = async (id: string) => {
    const token = localStorage.getItem("token")

    const res = await fetch(`http://localhost:5000/api/reviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        reviewText: editText,
        rating: editRating
      })
    })

    const updated = await res.json()

    setReviews(reviews.map(r => r._id === id ? updated : r))
    setEditingReviewId(null)
  }

  return (
    <div className={styles.container}>

      <h1>Mina sidor</h1>
      <section className={styles.profileSection}>
        <h2>Användaruppgifter</h2>

        <p><strong>Användarnamn:</strong> {user?.username}</p>
        <p><strong>Email:</strong> {user?.email}</p>

      </section>

      <section className={styles.reviewSection}>

        <h2>Mina recensioner</h2>

        {reviews.length === 0 && (
          <p>Du har inte skrivit några recensioner ännu.</p>
        )}

        {reviews.map(review => (

          <div key={review._id} className={styles.reviewCard}>

            <div className={styles.reviewHeader}>
              <h2>{review.bookTitle}</h2>

              <button className="add-btn" onClick={() => navigate(`/books/${review.bookId}`)}>Gå till bok</button>

              <span>
                ⭐ {review.rating}/5
              </span>

            </div>

            {editingReviewId === review._id ? (
              <form className={styles.editForm} onSubmit={(e) => {e.preventDefault() 
              handleUpdate(review._id)}}>
                <textarea value={editText} onChange={(e) => setEditText(e.target.value)} />
                <select value={editRating} onChange={(e) => setEditRating(Number(e.target.value))} >
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </select>

                <button className="add-btn" onClick={() => handleUpdate(review._id)}>Spara</button>
              </form>
            ) : (
              <p>{review.reviewText}</p>
            )}

            {editingReviewId !== review._id && (
            <button className="add-btn" onClick={() => handleEdit(review)}>Redigera</button>)}

            {editingReviewId !== review._id && (
            <button className="delete-btn" onClick={() => handleDelete(review._id)}>Ta bort</button>)}
          </div>

        ))}

      </section>

    </div>
  )
}

export default MyPage