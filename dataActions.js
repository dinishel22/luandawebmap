// show the form to add new attraction/point of interest when the map is clicked
mymap.on('click', function(e){
    $("#dlgAttraction").show();
    $("#form").show();
    $("#table").hide();
    $("#addButtons").show();
    $("#editButtons").hide();
    $("#latitude").val(e.latlng.lat.toFixed(5));
    $("#longitude").val(e.latlng.lng.toFixed(5));
    $("#idDisplay").html("New");
});



// Ajax call for the cancell button
$(".btnCancel").click(function(){
    $("#dlgAttraction").hide();
});

// Ajax call for the save buttons
$("#btnSave").click(function(){
    $.ajax({
       url:'add_attraction.php',
       type:'POST',
       data:{
           name:$("#name").val(),
           image:$("#image").val(),
           web:$("#website").val(),
           category:$("#category").val(),
           latitude:$("#latitude").val(),
           longitude:$("#longitude").val()
       },
       success:function(response){
           alert(response);
           $("#dlgAttraction").hide();
           refreshAttractions();
       }
   });
});
