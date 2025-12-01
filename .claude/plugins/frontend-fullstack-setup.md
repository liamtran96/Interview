---
name: frontend-fullstack-setup
type: plugin
category: frontend
description: Complete React + TypeScript + Tailwind + shadcn/ui setup
estimated_tokens: ~25k
---

# Plugin: Frontend Fullstack Setup

## Overview

Sets up a production-ready frontend application using modern best practices: React 18+, TypeScript, Vite, Tailwind CSS, and shadcn/ui component library.

**Use this plugin when you need to:** Bootstrap a new frontend project or modernize existing project.

## What This Plugin Does

- ✅ Creates Vite + React + TypeScript project
- ✅ Configures Tailwind CSS with JIT mode
- ✅ Sets up shadcn/ui component library
- ✅ Adds dark mode support
- ✅ Configures responsive design utilities
- ✅ Sets up ESLint + Prettier
- ✅ Creates sample components demonstrating patterns

## Architecture

**Micro-Skills Used:**
- `frontend-core/tailwind-setup` - Install and configure Tailwind CSS
- `frontend-core/tailwind-responsive` - Setup responsive breakpoints
- `frontend-core/tailwind-darkmode` - Implement dark mode
- `frontend-core/react-vite-setup` - Create Vite + React project (assumed exists)
- `frontend-core/shadcn-setup` - Setup shadcn/ui (assumed exists)

**Agents Coordinated:**
- `code-reviewer` - Review final setup for best practices

**Estimated Context Usage:** ~25k tokens (vs ~55k if loading all frontend skills at once)

## Workflow

### Phase 1: Project Foundation (5 min)
**Goal:** Create base React + TypeScript project with Vite

1. **Initialize Vite Project**
   - Load skill: `frontend-core/react-vite-setup`
   - Action:
     ```bash
     npm create vite@latest my-app -- --template react-ts
     cd my-app
     npm install
     ```
   - Output: Working React app with hot reload

2. **Verify Base Setup**
   ```bash
   npm run dev     # Should start on localhost:5173
   ```

### Phase 2: Styling Setup (8 min)
**Goal:** Configure Tailwind CSS and responsive design

3. **Install Tailwind CSS**
   - Load skill: `frontend-core/tailwind-setup`
   - Action: Follow skill's Quick Start guide
   - Output: Tailwind utilities available, JIT mode enabled

4. **Configure Responsive Design**
   - Load skill: `frontend-core/tailwind-responsive`
   - Action: Test responsive breakpoints with sample component
   - Output: Mobile-first responsive patterns working

5. **Setup Dark Mode**
   - Load skill: `frontend-core/tailwind-darkmode`
   - Action: Configure class-based dark mode with toggle
   - Output: Dark mode toggle working, persisted to localStorage

### Phase 3: Component Library (10 min)
**Goal:** Add shadcn/ui components

6. **Initialize shadcn/ui**
   - Load skill: `frontend-core/shadcn-setup`
   - Action:
     ```bash
     npx shadcn-ui@latest init
     npx shadcn-ui@latest add button card
     ```
   - Output: Pre-built, customizable components ready

7. **Create Sample Page**
   - Action: Build demo page using all setup features
   - Code:
     ```tsx
     import { useState } from 'react'
     import { Button } from '@/components/ui/button'
     import { Card } from '@/components/ui/card'

     function App() {
       const [dark, setDark] = useState(false)

       const toggleDark = () => {
         document.documentElement.classList.toggle('dark')
         setDark(!dark)
       }

       return (
         <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
           <div className="container mx-auto">
             <div className="flex justify-between items-center mb-8">
               <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                 My App
               </h1>
               <Button onClick={toggleDark}>
                 {dark ? '🌞' : '🌙'}
               </Button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               <Card className="p-6">
                 <h2 className="text-xl font-semibold mb-2">Feature 1</h2>
                 <p className="text-gray-600 dark:text-gray-400">
                   Responsive design works on all devices
                 </p>
               </Card>

               <Card className="p-6">
                 <h2 className="text-xl font-semibold mb-2">Feature 2</h2>
                 <p className="text-gray-600 dark:text-gray-400">
                   Dark mode with smooth transitions
                 </p>
               </Card>

               <Card className="p-6">
                 <h2 className="text-xl font-semibold mb-2">Feature 3</h2>
                 <p className="text-gray-600 dark:text-gray-400">
                   shadcn/ui components ready to use
                 </p>
               </Card>
             </div>
           </div>
         </div>
       )
     }

     export default App
     ```

### Phase 4: Quality Assurance (5 min)
**Goal:** Verify setup and code quality

8. **Code Review**
   - Call agent: `code-reviewer`
   - Purpose: Validate setup follows best practices
   - Expected outcome: Clean, production-ready codebase

## Context Optimization Strategy

**Lazy Loading Timeline:**
```
Phase 1: Load react-vite-setup      → +5k tokens
         Execute, then unload        → -5k tokens

Phase 2: Load tailwind-setup         → +6k tokens
         Load tailwind-responsive    → +4k tokens
         Load tailwind-darkmode      → +5k tokens
         Execute all, then unload    → -15k tokens

Phase 3: Load shadcn-setup           → +7k tokens
         Execute, then unload        → -7k tokens

Phase 4: Call code-reviewer          → agent manages own context
```

**Peak Context:** ~15k tokens (Phase 2)
**Average Context:** ~8k tokens
**Savings:** 55% vs loading all skills at once (~55k tokens)

## Success Criteria

Plugin is successful when:
- [ ] `npm run dev` starts development server without errors
- [ ] TypeScript compilation has no type errors
- [ ] Tailwind utilities work in components (colors, spacing, etc.)
- [ ] Responsive breakpoints work (test mobile, tablet, desktop)
- [ ] Dark mode toggle switches themes smoothly
- [ ] Dark mode preference persists across page reloads
- [ ] shadcn/ui components render correctly with variants
- [ ] `npm run build` creates production bundle successfully
- [ ] Code reviewer approves setup (no critical issues)

## Usage Example

### Scenario: Create dashboard app

**Invocation:**
```bash
# Using /cook command
/cook setup frontend fullstack app for admin dashboard

# Or direct
Use plugin: frontend-fullstack-setup
Project name: admin-dashboard
Include: authentication pages, user management
```

**Expected Output:**
```
admin-dashboard/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── DarkModeToggle.tsx
│   │   └── Layout.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

**Verification:**
```bash
cd admin-dashboard
npm run dev        # Should start on localhost:5173
npm run build      # Should compile without errors

# Test checklist:
# 1. Open in browser - page loads
# 2. Click dark mode toggle - theme switches
# 3. Refresh page - dark mode persists
# 4. Resize browser - responsive layout works
# 5. Open DevTools - no console errors
```

## Customization Options

### Option 1: Add React Router
**When to use:** Multi-page application
**Modify:** Add after Phase 1
```bash
npm install react-router-dom
```

### Option 2: Skip shadcn/ui
**When to use:** Different component library preferred
**Modify:** Skip Phase 3, step 6

### Option 3: Add State Management (Zustand)
**When to use:** Complex app state
**Modify:** Add after Phase 1
```bash
npm install zustand
```

### Option 4: Add React Query
**When to use:** Data fetching
**Modify:** Add after Phase 1
```bash
npm install @tanstack/react-query
```

## Troubleshooting

### Issue 1: Tailwind classes not working
**Symptoms:** Styles not applied in components
**Cause:** Tailwind not configured in PostCSS or content paths wrong
**Fix:**
```bash
# Verify postcss.config.js exists with tailwindcss plugin
# Check tailwind.config.js content array includes your files
# Restart dev server
npm run dev
```

### Issue 2: shadcn/ui import errors
**Symptoms:** Can't resolve '@/components/ui/*'
**Cause:** Path alias not configured
**Fix:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Issue 3: Dark mode not persisting
**Symptoms:** Resets to light on page refresh
**Cause:** Not saving to localStorage
**Fix:** Use `useDarkMode` hook from `tailwind-darkmode` skill

## Related Plugins

- `backend-fullstack-setup`: Create API backend for this frontend
- `component-library-setup`: Extends with Storybook + testing
- `deploy-vercel`: Deploy this app to Vercel

## Performance Metrics

**Context Usage:**
- All frontend skills loaded: ~55k tokens
- This plugin (optimized): ~25k tokens
- **Savings:** 55% reduction

**Time Estimate:**
- Simple app: 10-15 minutes
- Medium app (with routing): 15-20 minutes
- Complex app (with auth, state): 25-30 minutes

**Bundle Size (typical):**
- Development: ~2-3MB (unoptimized)
- Production: ~150-250KB (optimized + gzipped)

---

**Plugin Version:** 1.0
**Last Updated:** 2025-12-01
**Maintained by:** Skills Team
