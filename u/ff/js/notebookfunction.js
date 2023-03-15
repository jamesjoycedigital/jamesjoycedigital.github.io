$.getScript("../../ff/js/fn.js", function () {
  console.log("loaded footnotes");
});

function snippet_href(href,code){  
folder ='chicken'
dirs = [
  "gn1all",
  "jn0all",
  "jn1all",
  "jn2all",
  "pn1all",
  "s12all",
  "s13all",
  "s14all",
  "s15all",
  "s16all",
  "s17all",
  "s18all",
  "s19all",
  "un1all",
  "un2all",
  "un3all",
  "un4all",
  "un5all",
  "un6all",
  "un7all",
];

for (dir in dirs){
  if (href.includes(dir)){
    folder = dir
  }
} 

href = "/u/ff/snippet/"+folder+"/"+code
console.log(href)
return href
}

var nb_history = [];
current = null;

$(document).on("click", "a", function () {
  if ($(this).attr("name")) {
    code = $(this).attr("name")
    href = $(this).attr("href");
    href = snippet_href(href,code)    
   
    $.ajax({
      url: href,
      type: "GET",
      success: function (result) {
        $("#notebook").html(result);
        title = $("#notebook").find("#stitle").text();
        console.log(title);
        $("#note-title").html(title);
        $("#myModal").modal("show");
        nb_history.push(current);
        current = { title: title, nbunit: result };
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
  var myPopOverContent = footnotes[code];
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
