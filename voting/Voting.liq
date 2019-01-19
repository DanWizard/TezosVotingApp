 (* When the contract is deployed, we will pass in list of candidate contesting in the election. We will have map/associate array with candidate names as
 and 0 as a value.

Will add logic to increment the vote count when someone votes. *)

(* To check to make sure same user not vote multiple times *)
[%% version 0.4]

type storage = {
  candidates : (string, int) map;
  voters : (address, bool) map;
}

let%init init_candidates (candidate_names : string list) =
  let candidates =  List.fold (fun (elt,map) -> Map.add elt 0 map) candidate_names (Map[] : (string, int) map) in
  { candidates = candidates; voters = (Map : (address, bool) map)}

let%entry main
    (parameter : string)
    (storage : storage) =

  (* let addr = Current.source () in
  let storage =
    storage.voters <- match Map.find addr storage.voters with
      | None -> Map.add addr true storage.voters
      | Some x -> failwith ("Voter has already voted", addr)
  in *)

  let storage =
    storage.candidates <- match Map.find parameter storage.candidates with
      | None -> failwith ("Candidate is not valid", parameter)
      | Some x -> Map.add parameter (x + 1) storage.candidates
  in
  (([] : operation list), storage)
