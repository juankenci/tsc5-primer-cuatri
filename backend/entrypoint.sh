# entrypoint.sh
npm install
npx sequelize db:create
npx sequelize db:migrate
npm run migrations
npm start