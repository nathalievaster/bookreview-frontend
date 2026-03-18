export interface ReadingListEntry {
  _id: string
  bookId: string
  bookTitle: string
  bookImage?: string
  status: "want_to_read" | "reading" | "done"
}