import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { transparencyDatabase, sampleSupplements, sampleSideEffects, sampleHealthMetrics } from '@/lib/data'

export function Dashboard({ onSectionChange }) {
  const activeSupplements = sampleSupplements.length
  const totalSideEffects = sampleSideEffects.length
  const healthEntries = sampleHealthMetrics.length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's your supplement tracking overview.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Supplements</CardTitle>
            <span className="text-2xl">💊</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{activeSupplements}</div>
            <p className="text-xs text-muted-foreground">Currently tracking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Side Effects Logged</CardTitle>
            <span className="text-2xl">⚠️</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalSideEffects}</div>
            <p className="text-xs text-muted-foreground">Total reported</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Entries</CardTitle>
            <span className="text-2xl">📊</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{healthEntries}</div>
            <p className="text-xs text-muted-foreground">Days tracked</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to manage your supplements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => onSectionChange('supplements')}
            >
              <span className="mr-2">➕</span>
              Add New Supplement
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => onSectionChange('interactions')}
            >
              <span className="mr-2">🔍</span>
              Check Interactions
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => onSectionChange('health')}
            >
              <span className="mr-2">📝</span>
              Log Health Metrics
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Supplements</CardTitle>
            <CardDescription>Your latest supplement entries</CardDescription>
          </CardHeader>
          <CardContent>
            {sampleSupplements.length > 0 ? (
              <div className="space-y-3">
                {sampleSupplements.slice(0, 3).map((supplement) => (
                  <div key={supplement.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium">{supplement.name}</p>
                      <p className="text-sm text-muted-foreground">{supplement.dosage}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {supplement.frequency}
                    </span>
                  </div>
                ))}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full mt-2"
                  onClick={() => onSectionChange('supplements')}
                >
                  View All Supplements →
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground mb-2">No supplements logged yet</p>
                <Button size="sm" onClick={() => onSectionChange('supplements')}>
                  Add Your First Supplement
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Transparency Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Supplement Transparency Database</CardTitle>
          <CardDescription>Research ingredients, certifications, and regulatory status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {transparencyDatabase.slice(0, 3).map((product) => (
              <div key={product.id} className="border rounded p-3 hover:bg-accent cursor-pointer transition-colors">
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {product.certifications.join(', ')}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-green-600">✓ {product.knownContaminants}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button 
              variant="outline" 
              onClick={() => onSectionChange('transparency')}
            >
              Explore Full Database →
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Educational Notice */}
      <Card className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
        <CardHeader>
          <CardTitle className="text-orange-800 dark:text-orange-200">Important Notice</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-orange-700 dark:text-orange-300">
            This application is for tracking and educational purposes only. Always consult with healthcare 
            professionals before making decisions about supplements. The supplement industry has limited 
            regulation - use this tool to make more informed choices.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}