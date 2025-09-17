import { useTheme } from "./ThemeProvider"
import { Button } from "./ui/button"

export function Layout({ children, currentSection, onSectionChange }) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold">BioDash</h1>
            <span className="text-sm text-muted-foreground">Supplement Safety & Tracking</span>
          </div>

          <nav className="flex items-center space-x-6">
            <button
              className={`nav-link ${currentSection === 'dashboard' ? 'active' : ''}`}
              onClick={() => onSectionChange('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`nav-link ${currentSection === 'supplements' ? 'active' : ''}`}
              onClick={() => onSectionChange('supplements')}
            >
              Supplements
            </button>
            <button
              className={`nav-link ${currentSection === 'interactions' ? 'active' : ''}`}
              onClick={() => onSectionChange('interactions')}
            >
              Interactions
            </button>
            <button
              className={`nav-link ${currentSection === 'transparency' ? 'active' : ''}`}
              onClick={() => onSectionChange('transparency')}
            >
              Transparency
            </button>
            <button
              className={`nav-link ${currentSection === 'health' ? 'active' : ''}`}
              onClick={() => onSectionChange('health')}
            >
              Health Log
            </button>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-9 w-9"
              >
                {theme === "dark" ? (
                  <span className="text-sm">☀️</span>
                ) : (
                  <span className="text-sm">🌙</span>
                )}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSectionChange('auth')}
              >
                Sign Out
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        {children}
      </main>
    </div>
  )
}