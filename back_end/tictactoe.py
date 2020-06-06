import json

class NoValidMove(Exception):
    "Raised when there are no valide moves left in grid"

    def __init__(self, message):
        self.message = message


def next_move(data):
  grid = data['grid']
  possible_cells = ((i, j) for i in range(3) for j in range(3))
  empty_cells = ((i, j) for (i, j) in possible_cells if len(grid[i][j]) == 0)
  # return first empty cell
  # possible_cells = ((i, j) for i in range(3) for j in range(3))
  # p1 = {tuple(position) for position in data['moves']['p1']}
  # p2 = {tuple(position) for position in data['moves']['p2']}
  # cell = next(possible_cells)
  try:
    return {'play': next(empty_cells)}
  except StopIteration:
    return {'error': 'No empty space left in grid'}
    # raise NoValidMove('No empty space left in grid')


if __name__ == "__main__":
  test_data = {
    "you": "X",
    "grid": [['X','0','X'],['','X',''],['','','']]
  }
  assert(next_move(test_data) == {"play": [1, 0]})

  full_grid = {
    "you": "X",
    "grid": [['X','0','X'],['0','X','0'],['F','o','A']]
  }
  # next_move(full_grid)  # <-- should raise

# you = X
#__0
#X0_
#X__
