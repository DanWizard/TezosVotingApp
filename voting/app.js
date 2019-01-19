var contractAddress;
var keys;
var account;
function loadData() {
   eztz.node.setProvider("http://localhost:8732")
   contractAddress = "KT1APT7FhRFhMNCayfPKjpuP3HNyGVhYXeXj"
   mnemonic = "name glory clean fat busy dash receive title wedding orbit lens hazard syrup pattern shrimp"
   keys = eztz.crypto.generateKeys(mnemonic, "password")
   account = keys.pkh;
   console.log(keys);
   eztz.rpc.getBalance(account).then(function(res) {
     console.log(res);
     var num = res/1000000;
     console.log(account);
     $("#balance").html(num);
     $("#account").html(account);
   });
   eztz.contract.watch(contractAddress, 2, function(s){
     console.log("New storage", s);
     var candidateList = s.args[0];
     for (var i=1; i<= candidateList.length; i++){
       $("#candidate-"+i).html(candidateList[i-1].args[1].int);
     }
   })
 }

function voteForCandidate() {
   var candidate = $("#candidate").val();
   console.log(candidate)
   eztz.contract.send(contractAddress, account, keys, 0, '\"'+candidate+'\"', "0100000", 100000, 60000).then(function(res){
     console.log(res);
     $("#msg").html("Please wait for the transaction to complete");
   }).catch(function(e){
     console.log(candidate ,e);
     $("#msg").html("Errors: " + e.error + " - " + e.errors[1].with.args[0].string)
   })
 }
