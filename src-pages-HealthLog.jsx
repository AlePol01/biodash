import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Label, Select } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function HealthLog() {
  const [healthLogs, setHealthLogs] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    mood: 3,
    energy: 3,
    sleepQuality: 'Good',
    notes: ''
  })

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newLog = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    }
    setHealthLogs(prev => [...prev, newLog].sort((a, b) => new Date(b.date) - new Date(a.date)))
    setFormData({
      date: new Date().toISOString().split('T')[0],
      mood: 3,
      energy: 3,
      sleepQuality: 'Good',
      notes: ''
    })
    setShowAddForm(false)
  }

  const exportData = () => {
    const csvContent = [
      ['Date', 'Mood (1-5)', 'Energy (1-5)', 'Sleep Quality', 'Notes'],
      ...healthLogs.map(log => [
        log.date,
        log.mood,
        log.energy,
        log.sleepQuality,
        log.notes.replace(/,/g, ';') // Replace commas to avoid CSV issues
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'health-log-export.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getMoodEmoji = (mood) => {
    const emojis = ['😢', '😔', '😐', '😊', '😄']
    return emojis[mood - 1] || '😐'
  }

  const getEnergyIcon = (energy) => {
    const icons = ['🔋', '🔋', '🔋', '⚡', '⚡⚡']
    return icons[energy - 1] || '🔋'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Personal Health Log</h2>
          <p className="text-muted-foreground">Track daily wellness metrics and identify patterns</p>
        </div>
        <div className="flex space-x-2">
          {healthLogs.length > 0 && (
            <Button variant="outline" onClick={exportData}>
              Export Data
            </Button>
          )}
          <Button onClick={() => setShowAddForm(true)}>
            Add Entry
          </Button>
        </div>
      </div>

      {/* Add Entry Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Log Daily Health Metrics</CardTitle>
            <CardDescription>Record your subjective wellness indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sleepQuality">Sleep Quality</Label>
                  <Select
                    id="sleepQuality"
                    name="sleepQuality"
                    value={formData.sleepQuality}
                    onChange={handleInputChange}
                  >
                    <option value="Poor">Poor</option>
                    <option value="Fair">Fair</option>
                    <option value="Good">Good</option>
                    <option value="Excellent">Excellent</option>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mood">Mood (1-5 scale)</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      id="mood"
                      name="mood"
                      min="1"
                      max="5"
                      value={formData.mood}
                      onChange={handleInputChange}
                      className="flex-1"
                    />
                    <span className="text-2xl w-8">{getMoodEmoji(formData.mood)}</span>
                    <span className="text-sm text-muted-foreground w-8">{formData.mood}/5</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="energy">Energy Level (1-5 scale)</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      id="energy"
                      name="energy"
                      min="1"
                      max="5"
                      value={formData.energy}
                      onChange={handleInputChange}
                      className="flex-1"
                    />
                    <span className="text-xl w-8">{getEnergyIcon(formData.energy)}</span>
                    <span className="text-sm text-muted-foreground w-8">{formData.energy}/5</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any observations about your health, supplements, or lifestyle today?"
                  rows={3}
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit">Log Entry</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Health Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
          <CardDescription>Your logged health metrics over time</CardDescription>
        </CardHeader>
        <CardContent>
          {healthLogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No health entries yet</p>
              <Button onClick={() => setShowAddForm(true)}>
                Add Your First Entry
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {healthLogs.map((log) => (
                <div key={log.id} className="border rounded-lg p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{formatDate(log.date)}</h4>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <span>Mood:</span>
                        <span className="text-lg">{getMoodEmoji(log.mood)}</span>
                        <span>{log.mood}/5</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>Energy:</span>
                        <span className="text-lg">{getEnergyIcon(log.energy)}</span>
                        <span>{log.energy}/5</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>Sleep:</span>
                        <span className="font-medium">{log.sleepQuality}</span>
                      </div>
                    </div>
                  </div>
                  {log.notes && (
                    <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                      <p className="text-sm text-muted-foreground mb-1">Notes:</p>
                      <p className="text-sm">{log.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Simple Analytics */}
      {healthLogs.length >= 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Health Insights</CardTitle>
            <CardDescription>Basic patterns from your logged data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {(healthLogs.reduce((sum, log) => sum + parseInt(log.mood), 0) / healthLogs.length).toFixed(1)}
                </div>
                <p className="text-sm text-muted-foreground">Average Mood</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {(healthLogs.reduce((sum, log) => sum + parseInt(log.energy), 0) / healthLogs.length).toFixed(1)}
                </div>
                <p className="text-sm text-muted-foreground">Average Energy</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {healthLogs.length}
                </div>
                <p className="text-sm text-muted-foreground">Total Entries</p>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>💡 Tip:</strong> Look for patterns between your supplement intake and wellness metrics. 
                Consider tracking for at least 2-4 weeks to identify meaningful trends.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}