import { useEffect, useState } from "react"
import styles from "./css/MyPage.module.css"
import type { Review } from "../types/review.types"

const AdminPage = () => {

  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {

    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:5000/api/reviews", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await res.json()

    setReviews(data)
    setLoading(false)
  }

  const deleteReview = async (id: string) => {

    const token = localStorage.getItem("token")

    await fetch(`http://localhost:5000/api/reviews/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    setReviews(reviews.filter(review => review._id !== id))
  }

  if (loading) {
    return <p>Laddar recensioner...</p>
  }

  return (
    <div className={styles.container}>

      <h1>Adminpanel</h1>

      {reviews.length === 0 && (
        <p>Inga recensioner finns.</p>
      )}

      <section className={styles.reviewSection}>
        <h2>Alla recensioner</h2>
        {reviews.map(review => (

          <div key={review._id} className={styles.reviewCard}>

            <div className={styles.reviewHeader}>

              <span className={styles.user}>
                {review.user.username}
              </span>

              <span className={styles.rating}>
                ⭐ {review.rating}/5
              </span>

            </div>

            <p className={styles.text}>
              {review.reviewText}
            </p>

            <button className="delete-btn" onClick={() => deleteReview(review._id)}>Ta bort recension</button>

          </div>

        ))}

      </section>

    </div>
  )
}

export default AdminPage