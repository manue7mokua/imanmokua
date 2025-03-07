# CLI Portfolio - Iman Mokua

An interactive command-line interface portfolio built with Next.js and TypeScript, featuring a custom terminal emulation.

![Portfolio Demo](public/demo.gif)

## Features

### Terminal Interface

- Custom terminal implementation using xterm.js
- Git-style navigation between different sections
- Command history with up/down arrow keys
- Tab completion for commands
- Markdown rendering with syntax highlighting

### Navigation Structure

```
main/                  - About me, education, and experience
projects/             - My GitHub projects
  ├── pinned/        - Featured projects with details
  └── all-repos/     - Complete list of repositories
blog/                 - Tech blog posts (coming soon)
hackathons/           - Hackathon projects and achievements
```

### Available Commands

- `ls` - List files in current branch
- `cat [filename]` - View the contents of a file
- `git branch` - Show all available branches
- `git checkout [branch]` - Switch to a different branch
- `goback` - Return to parent branch (from nested branches)
- `clear` - Clear the terminal screen
- `social [platform]` - Open social media profiles (github, linkedin, x, instagram)
- `open [project]` - Open project repositories

## Tech Stack

- Next.js
- TypeScript
- xterm.js
- Styled Components

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/manue7mokua/imanmokua.git
cd imanmokua
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/              - Next.js app directory
├── components/       - React components
│   ├── Terminal.tsx  - Main terminal container
│   ├── GitTree.tsx   - Branch navigation tree
│   └── ...
├── styles/          - Global styles and theme
├── types/           - TypeScript type definitions
└── utils/           - Utility functions
    └── commandHandler.ts - Terminal command processing
```

## Usage Tips

- Use Tab for command autocomplete
- Use Up/Down arrows to navigate command history
- Type 'help' to see all available commands
- Use 'git checkout [branch]' to navigate between sections
- Use 'goback' to return to parent branch from nested branches

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- X/Twitter: [@imanmokua](https://x.com/imanmokua)
- Instagram: [@imanmokua](https://www.instagram.com/imanmokua/)
