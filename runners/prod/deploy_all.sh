
CLIENT_DIR="src/blink_client"
ORIGINAL_DIR=$(pwd)
dfx deploy token --ic
TOKEN_CANISTER=$(dfx canister id token --ic)

dfx deploy vault --argument "(record { 
    tokenId = \"$TOKEN_CANISTER\"; 
})" --ic
VAULT_CANISTER=$(dfx canister id vault --ic)

cd $CLIENT_DIR
echo "==== Preparing .env file ===="
echo "VITE_ICP_HOST=https://ic0.app" > .env
echo "VITE_TOKEN_CANISTER_ID=$TOKEN_CANISTER" >> .env
echo "VITE_VAULT_CANISTER_ID=$VAULT_CANISTER" >> .env
npm run build 
cd $ORIGINAL_DIR

dfx deploy blink --ic