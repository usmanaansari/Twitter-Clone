
var delete_request = function(){
    fetch('/item/' + document.getElementById("itemid").value, {
        method : "DELETE",
        headers: {"Content-Type": "application/json"},
        params: {id: document.getElementById("itemid").value}
    }).then(response=>{
        if(response.status == 200){
            document.getElementById("deleted").innerHTML = "Deleted tweet!";
            return response.json()
        }
        else{
            document.getElementById("deleted").innerText = "Error deleting item";
        }
    }).catch((error)=>{
        document.getElementById("deleted").innerText = error;
    });
    /*
    var request = new XMLHttpRequest();
    request.open("DELETE", "/item" + document.getElementById("id").value, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
    */
}

function handleError(resp){
    if(!response.ok){
        throw Error(response.statusText)
    }
    return resp;
}
/*
<script>
                document.getElementById("deleteitem_button").addEventListener("click", function(){
                    fetch('/item/' + document.getElementById("itemid").value, {
                        method : "DELETE",
                        headers: {"Content-Type": "application/json"},
                        params: {id: document.getElementById("itemid").value}
                    }).then(response=>{
                        if(response.status == 200){
                            document.getElementById("deleted").innerHTML = "Deleted tweet!";
                            return response.json()
                        }
                        else{
                            document.getElementById("deleted").innerText = "Error deleting item";
                        }
                    }).catch((error)=>{
                        document.getElementById("deleted").innerText = error;
                    });
                });
        </script>
*/