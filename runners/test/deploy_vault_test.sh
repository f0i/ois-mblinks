# This script is used to deploy and configure an ICRC token canister on the Internet Computer network.
# Ensure you have dfx (the DFINITY Canister SDK) installed and configured before running this script.


# --- Configuration Section ---

# Identity configuration. Replace '{production_identity}' with your production identity name. This identity needs to be a controller for your canister
PRODUCTION_IDENTITY="bootcamp"
dfx identity use $PRODUCTION_IDENTITY

# Canister identitfication - You need to create this canister either via dfx or throught the nns console
PRODUCTION_CANISTER="y55ob-myaaa-aaaal-qjheq-cai"

#check your cycles. The system needs at least 2x the archiveCycles below to create the archive canister.  We suggest funding the initial canister with 4x the cycles configured in archiveCycles and then using a tool like cycle ops to monitor your cycles. You will need to add the created archive canisters(created after the first maxActiveRecords are created) to cycleops manually for it to be monitored.
LOGO_FILE="./assets/logo.txt"

# Token configuration
TOKEN_NAME="Pedro"
TOKEN_SYMBOL="PED"
TOKEN_LOGO=$(cat $LOGO_FILE)
TOKEN_DECIMALS=8
TOKEN_FEE=10000
MAX_SUPPLY=null
MIN_BURN_AMOUNT=10000
MAX_MEMO=64
MAX_ACCOUNTS=100000000
SETTLE_TO_ACCOUNTS=99999000

# Automatically fetches the principal ID of the currently used identity.
ADMIN_PRINCIPAL=$(dfx identity get-principal)

dfx build token --check

# Deploy the canister with the specified configuration.
dfx deploy token --argument "(opt record {icrc1 = opt record {
  name = opt \"$TOKEN_NAME\";
  symbol = opt \"$TOKEN_SYMBOL\";
  logo = opt \"$TOKEN_LOGO\";
  decimals = $TOKEN_DECIMALS;
  fee = opt variant { Fixed = $TOKEN_FEE};
  minting_account = opt record{
    owner = principal \"$ADMIN_PRINCIPAL\";
    subaccount = null;
  };
  max_supply = $MAX_SUPPLY;
  min_burn_amount = opt $MIN_BURN_AMOUNT;
  max_memo = opt $MAX_MEMO;
  advanced_settings = null;
  metadata = null;
  fee_collector = null;
  transaction_window = null;
  permitted_drift = null;
  max_accounts = opt $MAX_ACCOUNTS;
  settle_to_accounts = opt $SETTLE_TO_ACCOUNTS;
}; 
icrc2 = opt record{
  max_approvals_per_account = opt 10000;
  max_allowance = opt variant { TotalSupply = null};
  fee = opt variant { ICRC1 = null};
  advanced_settings = null;
  max_approvals = opt 10000000;
  settle_to_approvals = opt 9990000;
}; 
icrc3 = opt record {
  maxActiveRecords = 3000;
  settleToRecords = 2000;
  maxRecordsInArchiveInstance = 100000000;
  maxArchivePages = 62500;
  archiveIndexType = variant {Stable = null};
  maxRecordsToArchive = 8000;
  archiveCycles = 20_000_000_000_000;
  supportedBlocks = vec {};
  archiveControllers = null;
};
icrc4 = opt record {
  max_balances = opt 200;
  max_transfers = opt 200;
  fee = opt variant { ICRC1 = null};
};})" 


TOKEN_CANISTER=$(dfx canister id token)

echo "== Token canister ID: $TOKEN_CANISTER =="


dfx deploy vault --argument "(record { 
  tokenId = \"$TOKEN_CANISTER\";
})"
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
})" 

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