import { useState, useEffect } from 'react'
import { Layout } from '@/components/Layout'
import { Dashboard } from '@/pages/Dashboard'
import { Auth } from '@/pages/Auth'
import { Supplements } from '@/pages/Supplements'
import { Interactions } from '@/pages/Interactions'
import { Transparency } from '@/pages/Transparency'
import { HealthLog } from '@/pages/HealthLog'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [currentSection, setCurrentSection] = useState('dashboard')

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('biodash-user')
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('biodash-user')
      }
    }
  }, [])

  const handleLogin = (user) => {
    setCurrentUser(user)
    localStorage.setItem('biodash-user', JSON.stringify(user))
    setCurrentSection('dashboard')
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('biodash-user')
    setCurrentSection('auth')
  }

  const handleSectionChange = (section) => {
    if (section === 'auth') {
      handleLogout()
    } else {
      setCurrentSection(section)
    }
  }

  // Show auth if no user
  if (!currentUser) {
    return <Auth onLogin={handleLogin} />
  }

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard onSectionChange={handleSectionChange} />
      case 'supplements':
        return <Supplements />
      case 'interactions':
        return <Interactions />
      case 'transparency':
        return <Transparency />
      case 'health':
        return <HealthLog />
      default:
        return <Dashboard onSectionChange={handleSectionChange} />
    }
  }

  return (
    <Layout 
      currentSection={currentSection} 
      onSectionChange={handleSectionChange}
    >
      {renderCurrentSection()}
    </Layout>
  )
}

export default App