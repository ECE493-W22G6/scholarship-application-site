## Python version: 3.10.3

To change python version, install `pyenv` and run the following commands:
`pyenv install 3.10.3`
`pyenv local 3.10.3` (within the server directory)

This server uses poetry as a package manager. To install dependencies, run
`poetry install`

### Running instructions

To run the server:
`poetry run flask run`.

This will start a local server at port 5000

## Test instructions

### Running instructions

To run the tests:
`poetry run python -m unittest tests/test_server.py`

## Misc info

### Env file

`.flaskenv`: points to the flask app (api/api.py) and enables flask debug mode (development)
