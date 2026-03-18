export interface Review {
  _id: string
  bookId: string
  bookTitle: string
  user: {
    _id: string
    username: string
  }
  reviewText: string
  rating: number
  createdAt: string
  updatedAt?: string
}