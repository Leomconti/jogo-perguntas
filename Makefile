# Initialize the project
init:
	@echo "Initializing the project..."
	@cp back/.env.example back/.env
	@cp front/.env.example front/.env
	@echo "Environment files copied."
	@echo "Installing dependencies..."
	@cd back && pnpm install
	@cd front && pnpm install
	@echo "Dependencies installed."
	@echo "Project initialization finished."
	@echo "Next steps:"
	@echo "1. Start a postgres database"
	@echo "2. Run database migrations on back"
	@echo "3. pnpm run dev on back and front"

.PHONY: init
