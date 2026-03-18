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
  // State för att hålla koll om boken är tillagd eller ej
  const [isAdded, setIsAdded] = useState(false)

  // Hämtar api-nyckel från .env
  const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

  // Kolla om användaren redan recenserat boken
  const hasReviewed = reviews.some(review => review.user._id === user?._id)
  console.log("reviews:", reviews)
console.log("user:", user)

  useEffect(() => {
    fetchBook()
    fetchReviews()
  }, [id])

  // Hämta böckerna som ligger i läslstan
  useEffect(() => {
    const fetchReadingList = async () => {
      const token = localStorage.getItem("token")
      if (!token) return

      const res = await fetch("http://localhost:5000/api/readinglist", {
        headers: { Authorization: `Bearer ${token}` }
      })

      const data = await res.json()
      setIsAdded(data.some((entry: { bookId: string }) => entry.bookId === id))
    }

    fetchReadingList()
  }, [id])

  // Funktion för att lägga till i läslistan
  const handleAddToReadingList = async () => {
    if (!book) return
    const token = localStorage.getItem("token")

    await fetch("http://localhost:5000/api/readinglist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        bookId: id,
        bookTitle: book.title,
        bookImage: book.image,
        status: "want_to_read"
      })
    })

    setIsAdded(true)
  }
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

    // Ett skydd ifall book är null
    if (!book) return

    const token = localStorage.getItem("token")

    await fetch("http://localhost:5000/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        bookId: id,
        bookTitle: book.title,
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

          {user && !hasReviewed && (
            <button className="delete-btn" onClick={() => setShowForm(!showForm)}>
              Skriv recension
            </button>
          )}

          {user && hasReviewed && (
            <p>Du har redan skrivit en recension för denna bok.</p>
          )}
          {user && (
            <button
              className={isAdded ? styles.addedBtn : "add-btn"}
              onClick={handleAddToReadingList}
              disabled={isAdded}>
              {isAdded ? "Tillagd" : "+ Läslista"}
            </button>
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