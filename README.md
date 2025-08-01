# Solo Sudoku

## Features

- See puzzle
- See difficulty rating of puzzle
- Navigate puzzle with arrow keys
- fill in cells using number keys
- remove cell value with backspace or 0
- Check for Mistakes
- Reset Puzzle
- unit tests
- auto-solve simple
- auto-solve hard
- Generate puzzles
-

## Roadmap

- add font awesome
- horizontal layout
- no-distractions mode
- footer

## New Features

- mistake highlighting
- timer
- number buttons for mobile
- hint / hints used
- game history
- Create a library for sudoku gen
  - custom sudoku difficulty params

## Difficulties

For the current implementation, we just use Legacy. Which is actually kinda cool because you'll be surprised.

- Legacy: hole positions + minBound (aka, try 50, see what you get)
- Crude: targeted range of holes + minBound (aka. 32-35 holes)
- Graded: rank techniques and dig as much as grade allows
- Balanced Grading: Complexity score which allows several harder rank holes
- Hybrid Grading: Rank techniques + bounds

### Grading Techniques

#### Beginner

You can directly put a value

- Last cell in row
- Hidden singles

#### Very Easy

You can directly exclude a value, leading to a value

- Direct pointing
- Direct claiming

#### Easy

You can exclude a value, narrowing down possibilities

- Pointing / Naked Pairs
- Claiming

#### Medium

You can exclude a value based on (double) superposition

- X-wing
- Hidden pairs
- naked triplets

#### Hard

Triple superposition

- Swordfish
- Hidden triplets
- Skyscraper
- etc..

#### Very Hard

lots of holes

- complex, partial trial and error

#### Impossible

as much holes as possible

- brute force probably required

Anyways for now we stick with Leagcy Difficulty.
