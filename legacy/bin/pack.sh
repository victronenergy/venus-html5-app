npm run build
rm -r www
mkdir www
mkdir www/app
cp -r dist/* www/app
rm venus-data.zip
zip -r venus-data.zip www
rm -r www
