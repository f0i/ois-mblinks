CLIENT_DIR="src/blink_client"
ORIGINAL_DIR=$(pwd)

TOKEN_CANISTER=$(dfx canister id token)
VAULT_CANISTER=$(dfx canister id vault)

cd $CLIENT_DIR
echo "==== Preparing .env file ===="
echo "VITE_ICP_HOST=http://127.0.0.1:4943" > .env
echo "VITE_TOKEN_CANISTER_ID=$TOKEN_CANISTER" >> .env
echo "VITE_VAULT_CANISTER_ID=$VAULT_CANISTER" >> .env

npm run build
cd $ORIGINAL_DIR

dfx deploy blink 