VAULT_PRICIPAL=2ocnb-eaaaa-aaaal-qjhka-cai

echo "Send token to $VAULT_PRICIPAL"
dfx canister call token icrc1_transfer "(record { 
  memo = null; 
  created_at_time=null;
  from_subaccoint = null;
  amount = 1000_0000_0000;
  to = record { 
    owner = principal \"$VAULT_PRICIPAL\";
    subaccount = null;
  };
  fee = null
})" --ic