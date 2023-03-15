

$(document).ready(function () {
    $('[data-toggle=offcanvas]').click(function () {
        $('.row-offcanvas').toggleClass('active');
    });
});

$(function () {

    $('.list-group-item').on('click', function () {
        $('.fa', this)
            .toggleClass('fa-angle-right')
            .toggleClass('fa-angle-down');
    });

});


$(document).ready(function () {
    activateNav();
    offsetAnchor();
    safariNavFix();
    window.addEventListener("hashchange", offsetAnchor);





    $('#checknotelinks').change(function () {     
    if (this.checked) {
        $("a[name]").css('color', '#008cba');
    } else {
        $("a[name]").css('color', '#222');
    }
});

$('#checkfootlinks').change(function () {
    if (this.checked) {
        $("a[target='foot']").show();
    } else {
        $("a[target='foot']").hide();
    }
});
 });   



function offsetAnchor() {

    // This if statement is optional. It is just making sure that
    // there is a valid anchor to offset from.
    if (location.hash.length !== 0) {
        var name = location.hash.replace("#", "");
        if ($("a[name='" + name + "']").length)
        {
            $('#myModal').modal('hide');
            $("a[name='" + name + "']").addClass('target');
            var position = $("a[name='" + name + "']").offset().top;
            var offset = position - 100;
            $('html,body').animate({ scrollTop: offset }, 10); //1ms as fast as will go 
        }
             

    }

};






function activateNav() {

    var loc = window.location.pathname;

    $('#sidebar').find('a').each(function () {
       
        if ($(this).attr('href')) {
            aref = $(this).attr('href').replace(/\.\.\//g, '');
            
            if (loc.includes(aref)) {

                $(this).toggleClass('active', true);
                $(this).parent().toggleClass('in', true);
                
                var head = $(this).parent().parent();
                if (head.attr('class') === 'list-group collapse') {
                    head.toggleClass('in', true);
                }
                    
            }
        }

    });

}

function safariNavFix() {

    $('.navbar-toggle').attr('href', '#');

}


