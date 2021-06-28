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



// The cancell button. Closes/hides the dialogbox/form cancels add or edit action 
$(".btnCancel").click(function(){
    $("#dlgAttraction").hide();
});

// Ajax call for the save button, and this btn is links to the add_attraction php file
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
           refreshAttractions(); // there seem to be  a problem here.
           //layer is supposed to refresh after new point is added, but it doesn't
       }
   });
});

// function to edit an existing feature/attraction, retrieves it by feature id
function editAttraction(id) {
    $("#dlgAttraction").show();
    $("#addButtons").hide();
    $("#editButtons").show();
    $.ajax({
        url:'find_attraction.php',
        type:'POST',
        data:{id:id},
        success:function(response){
            objAttraction=JSON.parse(response);
            $("#idDisplay").html(id);
            $("#name").val(objAttraction.name);
            $("#latitude").val(objAttraction.latitude);
            $("#longitude").val(objAttraction.longitude);
            $("#category").val(objAttraction.category);
            $("#website").val(objAttraction.web);
            $("#image").val(objAttraction.image);
        },
        error:function(xhr, status, error){
            console.log(xhr);
            console.log(status);
            console.log(error);
    }
    })
}

// update the info of a fuature. Update button
$("#btnUpdate").click(function(){
    $.ajax({
       url:'update_attraction.php',
       type:'POST',
       data:{
           id:$("#idDisplay").html(),
           name:$("#name").val(),
           image:$("#image").val(),
           web:$("#website").val(),
           category:$("#category").val(),
           latitude:$("#latitude").val(),
           longitude:$("#longitude").val()
       },
       success:function(response){
//                       alert(response);
           $("#dlgAttraction").hide();
           refreshAttractions();
       }
   });
});

// delete an existing feature. Delete button
$("#btnDelete").click(function(){
    if (confirm("Are you sure you want to delete this attraction?")){
        $.ajax({
           url:'delete_attraction.php',
           type:'POST',
           data:{
               id:$("#idDisplay").html(),
           },
           success:function(response){
//                          alert(response);
               $("#dlgAttraction").hide();
               refreshAttractions();
           }
       });
    }
});
