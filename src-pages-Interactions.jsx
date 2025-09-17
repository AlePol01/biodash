import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { drugInteractions } from '@/lib/data'

export function Interactions() {
  const [medications, setMedications] = useState('')
  const [supplements, setSupplements] = useState('')
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckInteractions = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Parse inputs
    const medicationList = medications.split(',').map(m => m.trim().toLowerCase())
    const supplementList = supplements.split(',').map(s => s.trim().toLowerCase())

    // Find interactions
    const foundInteractions = []
    
    for (const interaction of drugInteractions) {
      const drugMatch = medicationList.some(med => 
        med.includes(interaction.drug.toLowerCase()) || 
        interaction.drug.toLowerCase().includes(med)
      )
      const supplementMatch = supplementList.some(sup => 
        sup.includes(interaction.supplement.toLowerCase()) || 
        interaction.supplement.toLowerCase().includes(sup)
      )
      
      if (drugMatch && supplementMatch) {
        foundInteractions.push(interaction)
      }
    }

    setResults(foundInteractions)
    setShowResults(true)
    setIsLoading(false)
  }

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
      case 'moderate':
        return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800'
      case 'low':
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800'
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Drug-Supplement Interaction Checker</h2>
        <p className="text-muted-foreground">Identify potential interactions between your medications and supplements</p>
      </div>

      {/* Interaction Checker Form */}
      <Card>
        <CardHeader>
          <CardTitle>Check for Interactions</CardTitle>
          <CardDescription>
            Enter your medications and supplements below. Separate multiple items with commas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCheckInteractions} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="medications">Prescription Medications</Label>
              <Textarea
                id="medications"
                value={medications}
                onChange={(e) => setMedications(e.target.value)}
                placeholder="e.g., Warfarin, Metformin, Levothyroxine"
                className="min-h-[80px]"
              />
              <p className="text-xs text-muted-foreground">
                Include all prescription medications you're currently taking
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplements">Supplements & Vitamins</Label>
              <Textarea
                id="supplements"
                value={supplements}
                onChange={(e) => setSupplements(e.target.value)}
                placeholder="e.g., Vitamin E, Calcium, Magnesium, Omega-3"
                className="min-h-[80px]"
              />
              <p className="text-xs text-muted-foreground">
                Include vitamins, minerals, herbs, and other dietary supplements
              </p>
            </div>

            <Button 
              type="submit" 
              disabled={!medications.trim() || !supplements.trim() || isLoading}
              className="w-full"
            >
              {isLoading ? 'Checking Interactions...' : 'Check for Interactions'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results Section */}
      {showResults && (
        <Card>
          <CardHeader>
            <CardTitle>Interaction Results</CardTitle>
            <CardDescription>
              {results.length === 0 
                ? 'No documented interactions found' 
                : `Found ${results.length} potential interaction${results.length > 1 ? 's' : ''}`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-green-600 text-4xl mb-4">✅</div>
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
                  No Interactions Found
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  No documented interactions were found between the entered medications and supplements. 
                  However, this doesn't guarantee safety - always consult your healthcare provider.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((interaction, index) => (
                  <div key={index} className={`rounded-lg border p-4 ${getSeverityColor(interaction.severity)}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">
                          {interaction.drug} + {interaction.supplement}
                        </h4>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                          interaction.severity === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          interaction.severity === 'Moderate' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                          {interaction.severity} Risk
                        </span>
                      </div>
                      {interaction.severity === 'High' && <span className="text-2xl">⚠️</span>}
                    </div>
                    
                    <div className="space-y-2">
                      <p className="font-medium">Description:</p>
                      <p className="text-sm">{interaction.description}</p>
                      
                      <p className="font-medium">Mechanism:</p>
                      <p className="text-sm">{interaction.mechanism}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                ⚠️ Important Disclaimer
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                This interaction checker is for educational purposes only and may not include all possible interactions. 
                Always consult with your healthcare provider, pharmacist, or other qualified healthcare professional 
                before making any changes to your medication or supplement regimen. This tool does not replace 
                professional medical advice.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Educational Information */}
      <Card>
        <CardHeader>
          <CardTitle>Understanding Drug-Supplement Interactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Common Interaction Types:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Absorption interference (e.g., Calcium + antibiotics)</li>
                <li>• Liver enzyme induction/inhibition</li>
                <li>• Enhanced or reduced drug effects</li>
                <li>• Increased bleeding risk</li>
                <li>• Electrolyte imbalances</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Safety Tips:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Always inform your healthcare provider about supplements</li>
                <li>• Space doses appropriately when recommended</li>
                <li>• Monitor for unusual symptoms</li>
                <li>• Read supplement labels carefully</li>
                <li>• Consider third-party tested supplements</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}