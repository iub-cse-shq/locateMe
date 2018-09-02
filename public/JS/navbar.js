//For ShareOverlay
function openan(event) {
    document.getElementById("myNav").style.width = "100%";
    //console.log("Overlay 1 Called" + " " + event.target.id);
    
    document.getElementById("LockGPSBtn").style.visibility = "hidden";
    // document.getElementById("LockGPSBtn").transitionDuration = "2s";
   createShareLink();
}

function closean(event) {
    document.getElementById("myNav").style.width = "0%";
    //console.log("Overlay 1 Called" + " " + event.target.id);
    document.getElementById("LockGPSBtn").style.visibility = "visible";
}





//for GroupOverlay

function openGrpOvrly(event) {
    document.getElementById("groupOverlay").style.width = "100%";
    //console.log("Overlay group Called" + " " + event.target.id);
    document.getElementById("LockGPSBtn").style.visibility = "hidden";
    
    createGroupTable();
}



function closeGrpOvrly(event) {
    document.getElementById("groupOverlay").style.width = "0%";
    //console.log("Overlay group Called" + " " + event.target);
    document.getElementById("LockGPSBtn").style.visibility = "visible";
    document.getElementById("join-error").style.visibility = "hidden";
    //console.log("CloseGrpOverlay Called");
    cancelJoinGroup(event);
}
//Form for Adding Group

function showAddGroup(event){
    document.getElementById("groupList").style.display = "none";
    document.getElementById("joinGroupForm").style.display = "none";
    document.getElementById("groupForm").style.display = "block";
    //console.log("Add Button Clicked.");
    
}
// For join group
function addGroup(event){
    document.getElementById("groupList").style.display = "none";
    document.getElementById("groupForm").style.display = "none";
    document.getElementById("joinGroupForm").style.display = "block";
    //console.log("Join Button from top Clicked.");
    
}

function cancelCreateGroup(event){
    document.getElementById("groupForm").style.display = "none";
    document.getElementById("groupList").style.display = "block";
    //console.log("Close Button Clicked.");
    
}

function cancelJoinGroup(event){
    document.getElementById("joinGroupForm").style.display = "none";
    document.getElementById("groupList").style.display = "block";
    //console.log("Cancel from Join Group Button Clicked.");
}


