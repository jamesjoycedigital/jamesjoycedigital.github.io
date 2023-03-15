$.getScript("../../FF/js/fn.js", function() {
  console.log('loaded footnotes')
});


var nb_history = [];
current = null;

$(document).on("click", "a", function () {
  if ($(this).attr("name")) {
    var code = $(this).attr("name");
    var href = $(this).attr("href").split("#")[0];
    if (!href.includes("../../FF/unbs/")) {
      href = "../../FF/unbs/" + href;
    }

    $.ajax({
      url: href,
      type: "GET",
      success: function (result) {
        nbunit = $(result)
          .find("#" + code)
          .html();
        title = $(result).find("h2").text();
        $("#notebook").html(nbunit);
        $("#note-title").html(title);
        $("#myModal").modal("show");
        nb_history.push(current);
        current = { title: title, nbunit: nbunit };
      },
    });
    return false;
  } else {
    return true;
  }
});

function back() {
  console.log(nb_history.length);
  if (nb_history.length < 2) {
    return;
  }
  item = nb_history.pop();
  nbunit = item["nbunit"];
  title = item["title"];
  $("#notebook").html(nbunit);
  $("#note-title").html(title);
  $("#myModal").modal("show");
  current = item;
}

$('[target="foot"]').on("mouseenter", function () {
  var code = this.id;
  var myPopOverContent = footnotes[code]  
  $(this).data("container", "body");
  $(this).data("toggle", "popover");
  $(this).data("placement", "top");
  $(this).data("title", "Foot-Note");
  $(this).data("html", true);

  $(this).data("content", myPopOverContent);
  $(this).popover("show");
});

$('[target="foot"]').on("mouseout", function () {
  $(this).popover("hide");
});
