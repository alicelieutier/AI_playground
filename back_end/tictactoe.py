import json

def next_move(data):
  grid = data['grid']
  possible_cells = ((i, j) for i in range(3) for j in range(3))
  empty_cells = ((i, j) for (i, j) in possible_cells if len(grid[i][j]) == 0)
  try:
    return {'play': next(empty_cells)}
  except StopIteration:
    return {'error': 'No empty space left in grid'}

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


