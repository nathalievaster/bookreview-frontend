import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import type { ReactNode } from "react"

interface Props {
  children: ReactNode
}

const AdminRoute = ({ children }: Props) => {
  const { user } = useAuth()

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />
  }

  return children
}

export default AdminRoute