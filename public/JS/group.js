

function copyLink(i){
    var e = $('#group-link-'+i).show().select();
    document.execCommand("copy");
    e.hide();
    console.log('copied to clipboard!');
}

function createGroupTable(){
    // adding group rows
    var rows = '';
    $.each(person.groups, function(i,g){
        rows += '<tr>'+
                '<th scope="row">'+(i+1)+'</th>'+
                '<td>'+g.name+'</td>'+
                '<td>'+
                '<button type="button" class="btn btn-info mr-1" onclick="copyLink('+i+')">'+
                '<i class="fa fa-clipboard" aria-hidden="true"></i>Copy Invite Code</button>'+
                '<input style="display:none" type="text" id="group-link-'+i+'" value="'+g._id+'" >'+
                '<button type="button" class="btn btn-primary" onclick="viewGroup('+i+')">'+
                '<i class="fa fa-eye" aria-hidden="true"></i>View Group</button></td>'+
                '</tr>';
    });
    $('#groupTable').html(rows);
}

function showChatBtn(event){
    $("#GroupChat").show();
}

function viewGroup(i){
    $.ajax({
        method: "POST",
        url: "/api/groups/"+person.groups[i]._id,
        data: {
            accessToken: person.accessToken,
        }
    }).done(function(res){
        // var aLat = 0;
        // var aLong = 0;
        // var n = 0;
        var group = res;
        console.log(res);
        initMap();
        showChatBtn();
        $.each(group.persons, function(i,p){
            console.log(p);
            //FB.api(
                // "/"+p.fid+"/picture?type=small",
                // function (response) {
                //   if (response && !response.error) {
                //     var image = response.data.url;
                //     console.log(response);
                //     var marker = new google.maps.Marker({
                //         position: {lng: p.long, lat: p.lat},
                //         map: map,
                //         title: p.name,
                //         icon: image
                //     });
                //     console.log(p+" marker rendered.");
                //     // aLat += p.lat*1;
                //     // aLong += p.long*1;
                //     // n++;
                //   }
                // }
            var img = "https://graph.facebook.com/"+p.fid+"/picture?type=small";
            var marker = new google.maps.Marker({
                position: {lng: p.long, lat: p.lat},
                map: map,
                title: p.name,
                icon: img
            });
            
        });
        
        // console.log(aLat/n +", "+aLong/n);
        // map.setCenter({lat: aLat/n, lng: aLong/n});
        map.setCenter({lat: person.lat, lng: person.long});
        map.setZoom(12);
        closeGrpOvrly();
        
    }).fail(function(res){
        console.log(res);
        console.log("Group fetch failed!");
    });
    
}

$('#CreateNewGroup').click(function(){
   $.ajax({
        method: "POST",
        url: "/api/groups",
        data: {
            accessToken: person.accessToken,
            persons: [person._id],
            name: $('#groupName').val(),
            // pass: $('#groupPassword').val()
        }
    }).done(function(res){
        console.log(res);
        person.groups.push(res);
        console.log("Group created!");
        alert("Group Created. Share Invite Link");
        closeGrpOvrly();
        $('#groupForm').hide();
        
        createGroupTable();
    }).fail(function(res){
        console.log(res);
        console.log("Group failed!");
        alert("Group Creation Failed. Try Again Later!");
    });
});

$('#JoinNewGroup').click(function(){
    var link = $('#joinLink').val();
    var id = link.substring(link.lastIndexOf('/')+1);
    console.log(id);
   $.ajax({
        method: "POST",
        url: "/api/groups/join/"+id,
        data: {
            accessToken: person.accessToken,
            person: person._id,
        }
    }).done(function(res){
        console.log(res);
        person.groups.push(res);
        
        console.log("Group joined!");
        createGroupTable();
        
        
        //i will fix it. wait. 
        //okkk
        
        closeGrpOvrly();
        
        
    }).fail(function(res){
        console.log(res);
        console.log("Group join failed!");
        $('#join-error').text("Yikes! Cant join this group. Try another.");
    }); 
});
