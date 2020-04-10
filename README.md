# QLearning
Implementation of a Q-Learning algorithm.

## Todo
- [x] QL - algorithm
- [ ] DeepQ Learning
- [ ] more examples
- [ ] SARSA algorithm

## Run
Start a server an run `index.html`.

## Example One
Think of following grid world / environment:
<br><br>

![Example One](https://github.com/moritzmitterdorfer/QLearning/blob/master/grid.png)

<br><br>
Here, R is the Agent in the environment. Its goal is to reach the terminal state G by moving from one field to another. The agent must not go into the traps denoted by  '---'.

### Actions
- 0: NORTH
- 1: SOUTH
- 2: WEST
- 3: EAST

### Rewards
- +1000 at G
- -1000 at trap (---)
- -1 any other field
- -10 if he moves out of the world

### Result
The agent is able to solve the problem with the minimum number of moves.

![Result](https://github.com/moritzmitterdorfer/QLearning/blob/master/output_img.png)
