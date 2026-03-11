export interface Review {
  _id: string
  bookId: string
  bookTitle: string
  user: {
    id: string
    username: string
  }
  reviewText: string
  rating: number
  createdAt: string
  updatedAt?: string
}