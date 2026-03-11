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

  return (
    <div className={styles.container}>

        <h1>Mina sidor</h1>
        <section className={styles.profileSection}>
          <h2>Användaruppgifter</h2>

        <p><strong>Användarnamn:</strong> {user?.username}</p>

        {user?.email && (
          <p><strong>Email:</strong> {user.email}</p>
          
        )}

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

            <p>{review.reviewText}</p>

          </div>

        ))}

      </section>

    </div>
  )
}

export default MyPage