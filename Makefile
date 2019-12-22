default: dev

dev:
	clear;
	npm run dev;

prod:
	npm run build;
	rm -f dist/*.map dist/*.*.*;

start:
	npm run compress;
	npm run start;
