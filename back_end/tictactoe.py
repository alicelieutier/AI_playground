import json

def next_move(data):
  # return first empty cell
  possible_cells = ((i, j) for i in range(3) for j in range(3))
  p1 = {tuple(position) for position in data['moves']['p1']}
  p2 = {tuple(position) for position in data['moves']['p2']}

  cell = next(possible_cells)
  try:
    while cell in p1 or cell in p2:
      print(cell)
      cell = next(possible_cells)
    return json.dumps({'play': cell})
  except StopIteration as e:
    raise Exception('No more space on grid') from e


if __name__ == "__main__":
  test_data = {
    "you": "p1",
    "moves": {
      "p1": [[0,0],[0,1],[0,2]],
      "p2": [[2,1],[2,0]]
    }
  }
  assert(next_move(test_data) == '{"play": [1, 0]}')

  full_grid = {
    "you": "p1",
    "moves": {
      "p1": [[0,0],[0,1],[0,2],[2,1],[2,0]],
      "p2": [[1,0],[1,2],[1,1], [2,2]]
    }
  }
  # next_move(full_grid)  # <-- should raise

# you = X
#__0
#X0_
#X__
