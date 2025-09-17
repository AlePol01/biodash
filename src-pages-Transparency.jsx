import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { transparencyDatabase, regulatoryInfo } from '@/lib/data'

export function Transparency() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  const filteredProducts = transparencyDatabase.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Supplement Transparency Database</h2>
        <p className="text-muted-foreground">
          Research verified ingredient information, certifications, and regulatory status
        </p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="max-w-md mx-auto">
            <Label htmlFor="search">Search Supplements</Label>
            <Input
              id="search"
              type="text"
              placeholder="Search by name or ingredient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Card 
            key={product.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedProduct(product)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription>
                <div className="space-y-2">
                  <p><strong>Certifications:</strong> {product.certifications.join(', ')}</p>
                  <p className="text-xs">Click for detailed information</p>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span><strong>Status:</strong> {product.knownContaminants}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {product.certifications.slice(0, 2).map((cert, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && searchTerm && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No products found matching your search.</p>
          </CardContent>
        </Card>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-2xl">{selectedProduct.name}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedProduct(null)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-2">Verified Ingredients</h4>
                <ul className="space-y-1">
                  {selectedProduct.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-sm bg-muted p-2 rounded">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">Third-Party Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.certifications.map((cert, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full"
                    >
                      ✓ {cert}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">Contaminant Status</h4>
                <p className="text-sm bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 p-3 rounded border border-green-200 dark:border-green-800">
                  {selectedProduct.knownContaminants}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">Regulatory Notes</h4>
                <p className="text-sm bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 p-3 rounded border border-yellow-200 dark:border-yellow-800">
                  {selectedProduct.regulatoryNotes}
                </p>
              </div>

              <div className="pt-4 border-t">
                <Button onClick={() => setSelectedProduct(null)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Educational Information */}
      <Card>
        <CardHeader>
          <CardTitle>Understanding Supplement Regulation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">FDA Oversight</h4>
              <p className="text-sm text-muted-foreground">
                {regulatoryInfo.fdaOversight}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Third-Party Testing</h4>
              <p className="text-sm text-muted-foreground">
                {regulatoryInfo.thirdPartyTesting}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Proprietary Blends Issue</h4>
            <p className="text-sm text-muted-foreground mb-3">
              {regulatoryInfo.proprietaryBlends}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Common Industry Problems</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {regulatoryInfo.commonIssues.map((issue, index) => (
                <li key={index}>• {issue}</li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              🔍 How to Use This Database
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              This curated database provides transparency information for common supplements. 
              Look for third-party certifications like NSF, USP, or ConsumerLab when choosing supplements. 
              Avoid products with proprietary blends where ingredient amounts are hidden.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}