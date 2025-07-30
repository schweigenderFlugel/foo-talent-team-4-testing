# Set Development Environment
export ENVIRONMENT=development

# Execute FastAPI app
cd "$(dirname "$0")/.."
pipenv run python api/main.py