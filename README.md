# MyReactFullFramework

A simple Express.js server written in TypeScript that serves a static HTML frontend.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the TypeScript code:
   ```bash
   npm run build
   ```

3. Start the server:
   ```bash
   npm start
   ```

## Development

To run in development mode with ts-node:
```bash
npm run dev
```

The server will start on http://localhost:3000

## Project Structure

- `src/server.ts` - Express.js server code
- `public/index.html` - Frontend HTML file
- `dist/` - Compiled JavaScript output (generated after build)
