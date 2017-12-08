function copyLink(i){
    var e = $('#group-link-'+i).show().select();
    document.execCommand("copy");
    e.hide();
    console.log('copied to clipboard!');
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
        $.each(group.persons, function(i,p){
            console.log(p);
            FB.api(
                "/"+p.fid+"/picture?type=small",
                function (response) {
                  if (response && !response.error) {
                    var image = response.data.url;
                    console.log(response);
                    var marker = new google.maps.Marker({
                        position: {lng: p.long, lat: p.lat},
                        map: map,
                        title: p.name,
                        animation: google.maps.Animation.DROP,
                        icon: image
                    });
                    
                    // aLat += p.lat*1;
                    // aLong += p.long*1;
                    // n++;
                  }
                }
            );
            
        });
        
        // console.log(aLat/n +", "+aLong/n);
        // map.setCenter({lat: aLat/n, lng: aLong/n});
        map.setCenter({lat: person.lat, lng: person.long});
        map.setZoom(12);
        
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
    }).fail(function(res){
        console.log(res);
        console.log("Group failed!");
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
    }).fail(function(res){
        console.log(res);
        console.log("Group join failed!");
        $('#join-error').text("Yikes! Cant join this group. Try another.");
    }); 
});
