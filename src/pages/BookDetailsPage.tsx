import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import styles from "./css/BookDetailsPage.module.css"
import type { Review } from "../types/review.types"

interface Book {
  id: string
  title: string
  author: string
  description?: string
  image?: string
}

const BookDetailsPage = () => {

  const { id } = useParams()
  const { user } = useAuth()

  const [book, setBook] = useState<Book | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [showForm, setShowForm] = useState(false)
  const [reviewText, setReviewText] = useState("")
  const [rating, setRating] = useState(5)

  // Hämtar api-nyckel från .env
  const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

  useEffect(() => {
    fetchBook()
    fetchReviews()
  }, [id])

  const fetchBook = async () => {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`)
    const data = await res.json()

    setBook({
      id: data.id,
      title: data.volumeInfo.title,
      author: data.volumeInfo.authors?.[0] || "Okänd författare",
      description: data.volumeInfo.description,
      image: data.volumeInfo.imageLinks?.thumbnail
    })
  }

  const fetchReviews = async () => {
    const res = await fetch(`http://localhost:5000/api/reviews/${id}`)
    const data = await res.json()
    setReviews(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    await fetch("http://localhost:5000/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        bookId: id,
        reviewText,
        rating
      })
    })

    setReviewText("")
    setRating(5)
    setShowForm(false)

    fetchReviews()
  }

  if (!book) {
    return <p>Laddar bok...</p>
  }

  return (
    <div className={styles.container}>

      <section className={styles.bookSection}>

        {book.image && (
          <img src={book.image} alt={book.title} className={styles.bookImage} />
        )}

        <div className={styles.bookInfo}>
          <h1>{book.title}</h1>
          <h3>{book.author}</h3>

          {book.description && (
            <div dangerouslySetInnerHTML={{ __html: book.description }} />
          )}

          {user && (
            <button className="delete-btn"
              onClick={() => setShowForm(!showForm)}>Skriv recension</button>
          )}

          {showForm && (
            <form onSubmit={handleSubmit} className={styles.reviewForm}>

              <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)}
                placeholder="Skriv din recension..." />

              <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>

              <button className="add-btn" type="submit"> Publicera recension</button>
            </form>
          )}

        </div>

      </section>

      <section className={styles.reviewSection}>

        <h2>Recensioner</h2>

        {reviews.length === 0 && (
          <p>Inga recensioner ännu.</p>
        )}

        {reviews.map(review => (

          <div key={review._id} className={styles.reviewCard}>

            <div className={styles.reviewHeader}>
              <span className={styles.reviewUser}>
                {review.user.username}
              </span>

              <span className={styles.reviewRating}>
                ⭐ {review.rating}/5
              </span>
            </div>

            <p className={styles.reviewText}>
              {review.reviewText}
            </p>

          </div>

        ))}

      </section>

    </div>
  )
}

export default BookDetailsPage