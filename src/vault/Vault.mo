import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Option "mo:base/Option";
import Debug "mo:base/Debug";
import ICRC1 "mo:icrc1-mo/ICRC1";
import ICRC2 "mo:icrc2-mo/ICRC2";

shared ({ caller = _owner }) actor class Vault  (
    args: {
        tokenId: Text;
    }
) = this{
    let token = actor (args.tokenId) : actor {
        icrc1_transfer: (args : ICRC1.TransferArgs) -> async ICRC1.TransferResult;
        icrc2_approve: (args : ICRC2.ApproveArgs) -> async ICRC2.ApproveResponse;
        icrc1_balance_of: shared query (args : ICRC1.Account) -> async ICRC1.Balance;
        icrc1_fee:() -> async ICRC1.Balance
    };

    public shared func balance_of() : async ICRC1.Balance {
        try{
            let result = await token.icrc1_balance_of({
                owner =  Principal.fromActor(this);
                subaccount = null
            });

            return result;
        } catch (err) {
             throw err
        }
    };

    public shared ({ caller }) func claim() : async ICRC1.TransferResult {
        let amount: Nat = 1_0000_0000;
        // TODO: check if the caller has enough balance to claim
        try {
            let fee = await token.icrc1_fee();
            let result = await token.icrc1_transfer({
                from_subaccount = null;
                to = {
                    owner = caller;
                    subaccount = null
                };
                amount = amount;
                fee = Option.make(fee);
                memo = null;
                created_at_time=null;
            });
            Debug.print("user claimed" #Principal.toText(caller));

            result;

        } catch (err) {
            throw err
        }
    };
};