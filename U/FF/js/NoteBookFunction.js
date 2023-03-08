var lastcodes = [];
var lastcode = '';


$(document).on("click", "a", function () {
    var code = $(this).attr('name');
    console.log(code);

    if ($(this).attr('name')) {
        var code = $(this).attr('name');
        $.ajax({
            url: "/home/noteu/" + code, success: function (result) {
                $("#notebook").html(result.html);
                $("#note-title").html(result.title);
                $('#myModal').modal('show');
                lastcodes.push(lastcode);
                lastcode = code;
            }
        });
        return false;

    }
    else {
        return true;
    }
});

function back() {

    if (lastcodes.length < 2) {
        return;
    }
    var code = lastcodes.pop();

    $.ajax({
        url: "/home/noteu/" + code, success: function (result) {
            $("#notebook").html(result.html);
            $("#note-title").html(result.title);
            $('#myModal').modal('show');
            lastcode = code;
            return false;
        }
    });
    return true;

}


$('[target="foot"]').on('mouseenter', function() {
    var code = this.id;
    var myPopOverContent;
    $.ajax({ 
                          async:false,                 
                          url: "/home/noteu/" + code, success: function (result) {
                              myPopOverContent = result.html;                                                 
                          }
                      });
    $(this).data('container', 'body');
    $(this).data('toggle', 'popover');
    $(this).data('placement', 'top');
    $(this).data('title', 'Foot-Note');
    $(this).data('html', true);    

    $(this).data('content', myPopOverContent);
    $(this).popover('show');
});

$('[target="foot"]').on('mouseout', function() {
    $(this).popover('hide');
});


// $(document).ready(function () {
//     var isVisible = false;
  
//     var hideAllPopovers = function() {
//          $('[target="foot"]').each(function() {
//               $(this).popover('hide');
//           });  
//     };
//       $('[target="foot"]').popover({
//           html: true, content: function () {
//               var code = this.id;
//               $.ajax({                  
//                   url: "/home/noteu/" + code, success: function (result) {
//                       $('.popover-content').html(result.html);
//                       console.log('popover');                    
//                   }
//               });
//           }
//           , trigger: 'manual'
//           , placement: 'right', title: "Foot-Note"
          
//       }).on('click', function(e) {
//           // if any other popovers are visible, hide them
//           if(isVisible) {
//               hideAllPopovers();
//           }
  
//           $(this).popover('show');
  
//           // handle clicking on the popover itself
//           $('.popover').off('click').on('click', function(e) {
//               e.stopPropagation(); // prevent event for bubbling up => will not get caught with document.onclick
//           });
  
//           isVisible = true;
//           e.stopPropagation();
//       });
  
//      $(document).on('click', function(e) {
//           hideAllPopovers();
//           isVisible = false;
//       }); 
    
    
//   });