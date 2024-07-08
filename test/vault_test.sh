dfx canister call vault balance_of

dfx identity use alice
ALICE_PRINCIPAL=$(dfx identity get-principal)

echo "=================="
echo "Alice's principal ID: $(dfx identity get-principal)"
echo "Balance"
dfx canister call token icrc1_balance_of "(record { 
    owner = principal \"$ALICE_PRINCIPAL\";
    subaccount = null;
})" --query

echo "=================="
echo "Claim from Vault"
dfx canister call vault claim

echo "=================="
echo "Post Claim Balance"
dfx canister call token icrc1_balance_of "(record { 
    owner = principal \"$ALICE_PRINCIPAL\";
    subaccount = null;
})" --query