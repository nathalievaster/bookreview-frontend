// Visa sökresultat från Google Books API
import { useEffect, useState, useRef } from "react"
import type { Book } from "../types/book.types"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

import styles from './css/SearchResultsPage.module.css'

const SearchBooksPage = () => {

  const [query, setQuery] = useState("")
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  // State för att hålla koll på vilka böcker som lagts till i läslistan
  const [addedBooks, setAddedBooks] = useState<string[]>([])
  const { user } = useAuth()
  const navigate = useNavigate()

  const hasFetched = useRef(false)
  // Hämtar api-nyckel från .env
  const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

  const fetchBooks = async (searchQuery: string) => {
    setLoading(true)
    setError(null)

    try {

      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=10&key=${API_KEY}`
      )

      if (!res.ok) {
        throw new Error("Kunde inte hämta böcker")
      }

      const data = await res.json()

      const mappedBooks: Book[] = data.items?.map((item: any) => ({
        _id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.[0] || "Okänd författare",
        description: item.volumeInfo.description,
        publishedYear: item.volumeInfo.publishedDate?.slice(0, 4),
        image: item.volumeInfo.imageLinks?.smallThumbnail
      })) || []

      setBooks(mappedBooks)

    } catch (err) {
      setError("Något gick fel vid hämtning av böcker")
    }

    setLoading(false)
  }

  // Använder ref för att undvika "too many requests"
  useEffect(() => {

    if (hasFetched.current) return
    hasFetched.current = true

    fetchBooks("subject:fiction")

  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!query.trim()) return

    setHasSearched(true)
    fetchBooks(query)
  }

  const handleAddToReadingList = async (book: Book) => {
    const token = localStorage.getItem("token")

    await fetch("http://localhost:5000/api/readinglist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        bookId: book._id,
        bookTitle: book.title,
        bookImage: book.image,
        status: "want_to_read"
      })
    })

    setAddedBooks(prev => [...prev, book._id])
  }

  return (
    <>

      <h1>Sök böcker</h1>

      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Sök efter titel eller författare..." value={query}
          onChange={(e) => setQuery(e.target.value)} />
        <button className="add-btn" type="submit">Sök</button>
      </form>

      {loading && <p>Laddar böcker...</p>}

      {error && <p>{error}</p>}

      {!hasSearched && <h2>Populära böcker</h2>}

      {hasSearched && <h2>Sökresultat</h2>}

      <section className={styles.section}>
        {books.map(book => (

          <div key={book._id} className={styles.bookCard}>
            {book.image && (<img src={book.image} alt={book.title} className={styles.bookImage} />)}
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            {book.publishedYear && (<p>{book.publishedYear}</p>)}

            <div className={styles.buttons}>
              <button className="add-btn" onClick={() => navigate(`/books/${book._id}`)}>Läs mer</button>
              {user && (<button className="delete-btn" onClick={() => navigate(`/books/${book._id}`)}>Skriv en recension</button>)}
              {user && (<button
                className={addedBooks.includes(book._id) ? styles.addedBtn : "add-btn"}
                onClick={() => handleAddToReadingList(book)}
                disabled={addedBooks.includes(book._id)}>
                {addedBooks.includes(book._id) ? "Tillagd" : "+ Läslista"}
              </button>)}
            </div>
          </div>
        ))}
      </section>

    </>
  )
}

export default SearchBooksPage