WALLET_PRICIPAL=tnpkb-asm5y-7bfpb-ft7ee-7hq4j-wdixs-lenks-syvfm-nbowf-mgvtf-hae


echo "Send token to wallet $WALLET_PRICIPAL"
dfx canister call token icrc1_transfer "(record { 
  memo = null; 
  created_at_time=null;
  from_subaccoint = null;
  amount = 1000_0000_0000;
  to = record { 
    owner = principal \"$WALLET_PRICIPAL\";
    subaccount = null;
  };
  fee = null
})" --ic