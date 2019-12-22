rm -r ./build;

echo "build bot";
cd bot;
npm run tsc;

echo "build back-end";
cd ../www;
npm run build;

echo "build front-end";
cd client;
npm run build;

echo "go back";
cd ../..;

echo "copy bot";
cp -r ./bot/dist ./build/bot/dist;
cp ./bot/package.json ./build/bot/package.json;

echo "copy back-end";
cp -r ./www/dist ./build/www/dist;
cp ./www/package.json ./build/www/package.json;
cp ./www/.env ./build/www/.env;
cp ./www/ormconfig.json ./build/www/ormconfig.json;

echo "copy front-end";
cp -r ./www/client/.next ./build/www/client/.next;
cp ./www/client/package.json ./build/www/client/package.json;

echo "done!";