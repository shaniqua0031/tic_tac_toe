# Tic-Tac-Toe vs AI 🎮

A fully functional, responsive Tic-Tac-Toe game where you compete against an intelligent AI opponent with three difficulty levels.

## Features

✨ **Player vs AI Gameplay** - Challenge the computer to a classic game of Tic-Tac-Toe

🎯 **Three Difficulty Levels:**
- **Easy** 🟢 - AI makes mostly random moves with occasional smart decisions
- **Medium** 🟡 - AI blocks winning opportunities and tries to win
- **Hard** 🔴 - Optimal Minimax algorithm AI that plays perfectly

📊 **Score Tracking** - Keep track of your wins, losses, and draws across multiple rounds

🔥 **Win Streak Counter** - Monitor your consecutive victories

🏆 **Automatic Winner Detection** - Instant recognition of wins with highlighted winning combinations

🤖 **Realistic AI Thinking** - Brief delay before AI moves for a natural feel

🎨 **Modern, Polished UI** - Clean design with smooth animations and transitions

📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices

♿ **Accessible Design** - Semantic HTML, keyboard support, and screen reader friendly

🌙 **Dark Theme** - Eye-friendly dark interface perfect for extended play sessions

## Technologies

- **Next.js 15** - React framework for production
- **React 18** - UI component library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## Installation

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Steps

1. **Clone or navigate to the project directory:**
   ```bash
   cd tic-tac-toe
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Select Difficulty Level** - Choose from Easy, Medium, or Hard using the dropdown
2. **Make Your Move** - Click any empty cell on the board to place your X
3. **AI Responds** - The AI automatically places its O after your move
4. **Win Conditions:**
   - Get three in a row horizontally, vertically, or diagonally to win
   - Block the AI from getting three in a row
   - If the board fills up with no winner, it's a draw
5. **Restart Game** - Click "🔄 Restart Game" to play another round with the same difficulty and keep your score
6. **New Game** - Click "🆕 New Game" to reset everything and start fresh

## AI Difficulty Explained

### Easy 🟢
The Easy AI makes random legal moves most of the time. Occasionally it might make a smart move, but it's designed for beginners who want a good chance of winning.

**Strategy:**
- Randomly selects from available cells
- No advanced planning
- Predictable and beatable

### Medium 🟡
The Medium AI provides a moderate challenge by implementing a decision-making strategy:

**Strategy:**
1. **Win** - If it can complete three in a row, it will
2. **Block** - If you can win on your next move, it will block you
3. **Strategic** - 30% chance to take center (4) or corners (0, 2, 6, 8)
4. **Random** - Otherwise picks a random available cell

This creates an opponent that feels intelligent without being unbeatable.

### Hard 🔴
The Hard AI uses the **Minimax Algorithm** - a game theory strategy that evaluates all possible future game states and chooses the mathematically optimal move.

**Algorithm Details:**
- Recursively explores all possible move sequences
- Scores terminal states: AI win (+10), Player win (-10), Draw (0)
- Considers game depth (prefers faster wins, slower losses)
- Generates perfect play against optimal opponent strategies
- Very difficult or impossible to beat for most players

**Scoring System:**
- AI Win: +10 points
- Player Win: -10 points
- Draw: 0 points
- Depth bonus/penalty to prefer faster wins and slower losses

## Project Structure

```
tic-tac-toe/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main game page
│   └── globals.css         # Global styles and animations
├── components/
│   ├── TicTacToe.tsx       # Main game component with state management
│   ├── Board.tsx           # Game board component
│   ├── Cell.tsx            # Individual cell component
│   ├── ScoreBoard.tsx      # Score and round display
│   ├── DifficultySelector.tsx # Difficulty selection dropdown
│   ├── GameStatus.tsx      # Current game status display
│   └── GameControls.tsx    # Restart and New Game buttons
├── lib/
│   └── gameLogic.ts        # All game logic and AI algorithms
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── next.config.js          # Next.js configuration
└── README.md               # This file
```

## Game Rules

- The human player is always **X**
- The AI opponent is always **O**
- Players alternate turns (human first)
- A player cannot select an occupied cell
- The game ends when:
  - One player gets three in a row (Win)
  - All nine cells are filled with no winner (Draw)
- No moves are allowed after the game ends
- Changing difficulty takes effect on the next round
- **Restart Game** - Resets board but keeps score and difficulty
- **New Game** - Resets everything including score

## Animations & Visual Feedback

- **Fade In** - UI elements animate in smoothly
- **Cell Placement** - Placed symbols have a scale animation
- **Winning Highlight** - Winning cells pulse with a golden glow
- **Hover States** - Cells highlight on hover (when playable)
- **Button Press** - Buttons scale slightly when clicked
- **Status Updates** - Game status message animates with appropriate colors

## Keyboard & Accessibility

- **Semantic HTML** - Proper button and label elements
- **ARIA Labels** - Each cell has descriptive aria-labels
- **Focus States** - Visible focus indicators on all interactive elements
- **Color Contrast** - High contrast text for readability
- **Responsive Touch** - Works well on touch screens and mobile devices
- **Screen Reader Support** - Compatible with assistive technologies

## Building for Production

```bash
npm run build
npm run start
```

The production build optimizes the application for deployment.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Optimized Rendering** - React hooks prevent unnecessary re-renders
- **Efficient AI** - Minimax uses memoization for improved performance
- **Small Bundle** - Minimal dependencies for fast load times
- **CSS Optimization** - Tailwind purges unused styles in production

## Troubleshooting

**AI takes too long to move on Hard difficulty:**
- This is normal for the first few moves; Minimax evaluates many possibilities
- Performance improves as the board fills up

**Game feels laggy:**
- Clear your browser cache
- Ensure you're on a recent version of Node.js
- Try a different browser

**Styles not loading:**
- Run `npm run dev` to rebuild
- Clear browser cache with Ctrl+Shift+Delete

## Future Enhancements

- Sound effects for moves and game events
- Different game themes
- Multiplayer mode
- Game replay feature
- Statistics and game history
- Time tracking for moves
- Leaderboard system

## License

This project is open source and available for educational and personal use.

## Credits

Built as a demonstration of modern web development practices including:
- React hooks and state management
- TypeScript for type safety
- Tailwind CSS for responsive design
- Game theory algorithms (Minimax)
- Accessibility standards (WCAG)

---

Enjoy the game! 🎮 Can you beat the Hard AI? 🤖
