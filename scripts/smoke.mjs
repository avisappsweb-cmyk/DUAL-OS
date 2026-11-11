import { createServer } from 'vite'
import { renderToString } from 'react-dom/server'
import React from 'react'

const server = await createServer({
  root: process.cwd(),
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const html = renderToString(React.createElement(App))
  const checks = [
    ['status bar', html.includes('status-bar')],
    ['dynamic island', html.includes('di-compact')],
    ['home grid', html.includes('hs-grid')],
    ['dock', html.includes('dock')],
    ['search pill', html.includes('hs-search-pill')],
    ['app icons', (html.match(/app-icon-art/g) || []).length > 20],
    ['widgets', html.includes('widget-medium') && html.includes('widget-small')],
    ['folders', html.includes('folder-tile')],
  ]
  let failed = 0
  for (const [name, ok] of checks) {
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`)
    if (!ok) failed++
  }
  console.log(`Rendered HTML length: ${html.length}`)
  if (failed > 0) process.exit(1)
} finally {
  await server.close()
}
