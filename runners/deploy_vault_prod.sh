TOKEN_CANISTER = $(dfx canister id token --ic)

dfx deploy vault --argument "(record { 
  tokenId = \"$TOKEN_CANISTER\";
})" --ic
VAULT_CANISTER=$(dfx canister id vault)

dfx canister call token icrc1_transfer "(record { 
  memo = null; 
  created_at_time=null;
  from_subaccoint = null;
  amount = 1000_0000_0000;
  to = record { 
    owner = principal \"$VAULT_CANISTER\";
    subaccount = null;
  };
  fee = null
})" --ic

dfx canister call vault balance_of --ic
