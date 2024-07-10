CLIENT_DIR="src/blink_client"
ORIGINAL_DIR=$(pwd)

cd $CLIENT_DIR
npm run build
cd $ORIGINAL_DIR

dfx deploy blink 
