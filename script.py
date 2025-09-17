import json
import os

# Create the project structure first
project_structure = {
    'biodash/': [
        'package.json',
        'vite.config.mjs',
        'tailwind.config.mjs', 
        'postcss.config.js',
        '.gitignore',
        'README.md',
        'public/',
        'src/'
    ],
    'biodash/public/': [
        'vite.svg'
    ],
    'biodash/src/': [
        'main.jsx',
        'App.jsx',
        'index.css',
        'components/',
        'pages/',
        'lib/'
    ],
    'biodash/src/components/': [
        'Layout.jsx',
        'ThemeProvider.jsx',
        'ui/'
    ],
    'biodash/src/components/ui/': [
        'button.jsx',
        'card.jsx',
        'input.jsx',
        'table.jsx',
        'textarea.jsx'
    ],
    'biodash/src/pages/': [
        'Dashboard.jsx',
        'Supplements.jsx',
        'Interactions.jsx',
        'Transparency.jsx',
        'HealthLog.jsx',
        'Auth.jsx'
    ],
    'biodash/src/lib/': [
        'data.js',
        'utils.js'
    ]
}

print("Project structure for BioDash:")
for folder, files in project_structure.items():
    print(f"\n{folder}")
    for file in files:
        print(f"  - {file}")