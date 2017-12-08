//For ShareOverlay
function openan(event) {
    document.getElementById("myNav").style.width = "100%";
    console.log("Overlay 1 Called" + " " + event.target.id);
    
    document.getElementById("LockGPSBtn").style.visibility = "hidden";
    // document.getElementById("LockGPSBtn").transitionDuration = "2s";
   createShareLink();
}

function closean(event) {
    document.getElementById("myNav").style.width = "0%";
    console.log("Overlay 1 Called" + " " + event.target.id);
    document.getElementById("LockGPSBtn").style.visibility = "visible";
}

//for GroupOverlay

function openGrpOvrly(event) {
    document.getElementById("groupOverlay").style.width = "100%";
    console.log("Overlay group Called" + " " + event.target.id);
    document.getElementById("LockGPSBtn").style.visibility = "hidden";
    
    // adding group rows
    var rows = '';
    $.each(person.groups, function(i,g){
        rows += '<tr>'+
                '<th scope="row">'+(i+1)+'</th>'+
                '<td>'+g.name+'</td>'+
                '<td>'+
                '<button type="button" class="btn btn-info mr-1" onclick="copyLink('+i+')"><i class="fa fa-facebook" aria-hidden="true"></i>Copy Invite Link</button>'+
                '<input style="display:none" type="text" id="group-link-'+i+'" value="'+g._id+'" >'+
                '<button type="button" class="btn btn-primary" onclick="viewGroup('+i+')"><i class="fa fa-facebook" aria-hidden="true"></i>View Group</button></td>'+
                '</tr>';
    });
    $('#groupTable').html(rows);
}

function closeGrpOvrly(event) {
    document.getElementById("groupOverlay").style.width = "0%";
    console.log("Overlay group Called" + " " + event.target.id);
    document.getElementById("LockGPSBtn").style.visibility = "visible";
}
//Form for Adding Group

function showAddGroup(event){
    document.getElementById("groupList").style.display = "none";
    document.getElementById("joinGroupForm").style.display = "none";
    document.getElementById("groupForm").style.display = "block";
    console.log("Add Button Clicked.");
    
}
// For join group
function addGroup(event){
    document.getElementById("groupList").style.display = "none";
    document.getElementById("groupForm").style.display = "none";
    document.getElementById("joinGroupForm").style.display = "block";
    console.log("Join Button Clicked.");
    
}

function cancelCreateGroup(event){
    document.getElementById("groupForm").style.display = "none";
    document.getElementById("groupList").style.display = "block";
    console.log("Close Button Clicked.");
    
}


