import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import theme from './theme'
import Login from './Login'
import Signup from './Signup'
import { AuthProvider, useAuth } from './AuthContext'

// Create a client
const queryClient = new QueryClient()

function Dashboard() {
  return <div>Welcome to your Dashboard!</div>
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? children : <Navigate to="/login" />
}

function App() {
  const { isLoggedIn, login, logout } = useAuth()
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Router>
          <nav style={{ marginBottom: 16 }}>
            <Link to="/">Home</Link> |{' '}
            <Link to="/dashboard">Dashboard</Link> |{' '}
            {!isLoggedIn && <><Link to="/login">Login</Link> | <Link to="/signup">Signup</Link></>}
            {isLoggedIn && <button onClick={logout}>Logout</button>}
          </nav>
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={login} />} />
            <Route path="/signup" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Signup onSignup={login} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default function AppWithProvider() {
  return <AuthProvider><App /></AuthProvider>
}
