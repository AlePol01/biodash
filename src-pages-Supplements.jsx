import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Label, Select } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function Supplements() {
  const [supplements, setSupplements] = useState([])
  const [sideEffects, setSideEffects] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [showSideEffectForm, setShowSideEffectForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: 'Daily',
    startDate: '',
    endDate: '',
    notes: ''
  })
  const [sideEffectData, setSideEffectData] = useState({
    supplementId: '',
    description: '',
    severity: 'Mild',
    dateOccurred: ''
  })

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSideEffectChange = (e) => {
    setSideEffectData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleAddSupplement = (e) => {
    e.preventDefault()
    const newSupplement = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    }
    setSupplements(prev => [...prev, newSupplement])
    setFormData({
      name: '',
      dosage: '',
      frequency: 'Daily',
      startDate: '',
      endDate: '',
      notes: ''
    })
    setShowAddForm(false)
  }

  const handleAddSideEffect = (e) => {
    e.preventDefault()
    const selectedSupplement = supplements.find(s => s.id === parseInt(sideEffectData.supplementId))
    const newSideEffect = {
      id: Date.now(),
      ...sideEffectData,
      supplementName: selectedSupplement?.name,
      createdAt: new Date().toISOString()
    }
    setSideEffects(prev => [...prev, newSideEffect])
    setSideEffectData({
      supplementId: '',
      description: '',
      severity: 'Mild',
      dateOccurred: ''
    })
    setShowSideEffectForm(false)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Supplement Management</h2>
          <p className="text-muted-foreground">Track your supplements and monitor side effects</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          Add Supplement
        </Button>
      </div>

      {/* Add Supplement Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Supplement</CardTitle>
            <CardDescription>Enter details about your supplement</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddSupplement} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Supplement Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Vitamin D3"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input
                    id="dosage"
                    name="dosage"
                    value={formData.dosage}
                    onChange={handleInputChange}
                    placeholder="e.g., 2000 IU, 500mg"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select
                    id="frequency"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleInputChange}
                  >
                    <option value="Daily">Daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="As needed">As needed</option>
                    <option value="Weekly">Weekly</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Why are you taking this supplement?"
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit">Add Supplement</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Supplements List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Supplements</CardTitle>
          <CardDescription>Currently tracked supplements</CardDescription>
        </CardHeader>
        <CardContent>
          {supplements.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No supplements logged yet</p>
              <Button onClick={() => setShowAddForm(true)}>
                Add Your First Supplement
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {supplements.map((supplement) => (
                <div key={supplement.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold">{supplement.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        <strong>Dosage:</strong> {supplement.dosage} | <strong>Frequency:</strong> {supplement.frequency}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        <strong>Started:</strong> {formatDate(supplement.startDate)}
                        {supplement.endDate && ` | Ended: ${formatDate(supplement.endDate)}`}
                      </p>
                      {supplement.notes && (
                        <p className="text-sm mt-2 bg-muted p-2 rounded">
                          <strong>Notes:</strong> {supplement.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="destructive">Delete</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Side Effects Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Side Effects Tracking</CardTitle>
            <CardDescription>Monitor adverse reactions to your supplements</CardDescription>
          </div>
          <Button 
            onClick={() => setShowSideEffectForm(true)}
            disabled={supplements.length === 0}
          >
            Report Side Effect
          </Button>
        </CardHeader>
        <CardContent>
          {showSideEffectForm && (
            <form onSubmit={handleAddSideEffect} className="space-y-4 mb-6 p-4 border rounded-lg bg-muted">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplementId">Associated Supplement</Label>
                  <Select
                    id="supplementId"
                    name="supplementId"
                    value={sideEffectData.supplementId}
                    onChange={handleSideEffectChange}
                    required
                  >
                    <option value="">Select supplement...</option>
                    {supplements.map((supplement) => (
                      <option key={supplement.id} value={supplement.id}>
                        {supplement.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="severity">Severity</Label>
                  <Select
                    id="severity"
                    name="severity"
                    value={sideEffectData.severity}
                    onChange={handleSideEffectChange}
                  >
                    <option value="Mild">Mild</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Severe">Severe</option>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={sideEffectData.description}
                  onChange={handleSideEffectChange}
                  placeholder="Describe the side effect you experienced"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOccurred">Date Occurred</Label>
                <Input
                  id="dateOccurred"
                  name="dateOccurred"
                  type="date"
                  value={sideEffectData.dateOccurred}
                  onChange={handleSideEffectChange}
                  required
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit">Report Side Effect</Button>
                <Button type="button" variant="outline" onClick={() => setShowSideEffectForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {sideEffects.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted-foreground">No side effects reported yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sideEffects.map((effect) => (
                <div key={effect.id} className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-red-800 dark:text-red-200">
                        {effect.supplementName}
                      </h4>
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                        <strong>Severity:</strong> {effect.severity}
                      </p>
                      <p className="text-sm mt-2">{effect.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Occurred on {formatDate(effect.dateOccurred)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}