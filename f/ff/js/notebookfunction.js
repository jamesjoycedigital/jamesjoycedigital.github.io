$.getScript("../../ff/js/fn.js", function () {
  console.log("loaded footnotes");
});

function snippet_href(href, code) {
  folder = 'chicken'
  dirs = [
    'c01all', 'c02all', 'c03all', 'c04all', 'c05all', 'c06all', 'c07all', 'c08all', 'c09all', 'c10all',
    'c11all', 'c12all', 'c13all', 'c14all', 'c15all', 'c16all', 'c17all', 'c18all', 'n01all', 'n02all', 'n03all',
    'n04all', 'n05all', 'n06all', 'n07all', 'n08all', 'n09all', 'n10all', 'n11all', 'n12all', 'n13all', 'n14all',
    'n15all', 'n16all', 'n17all', 'n18all', 'n19all', 'n20all', 'n21all', 'n22all', 'n23all', 'n24all', 'n25all',
    'n26all', 'n27all', 'n28all', 'n29all', 'n30all', 'n31all', 'n32all', 'n33all', 'n34all', 'n35all', 'n36all',
    'n37all', 'n38all', 'n39all', 'n40all', 'n41all', 'n42all', 'n43all', 'n44all', 'n45all', 'n46all', 'n47all',
    'n48all', 'n49all', 'n50all', 'n51all', 'n52all', 'n53all', 'n54all', 'n55all', 'n56all', 'n57all', 'n58all',
    'n59all', 'n60all', 'n63all', 'sd1all', 'sd2all', 'sh1all', 'sh2all', 'sh3all', 'sh4all', 'sh5all', 'sh6all',
    'sh7all', 'sh8all', 'ssaall', "fnbdetails"
  ];

  for (let i in dirs) {
    dir = dirs[i]
    // Assumes any href with just anchors are links to notebook descriptions
    if (href.startsWith('#')) {
      folder = "fnbdetails"
    }
    else if (href.includes(dir)) {
      folder = dir
    }
  }

  href = "/f/ff/snippet/" + folder + "/" + code
  href = href.toLowerCase()
  console.log(href)
  return href
}

var nb_history = [];
current = null;

$(document).on("click", "a", function () {
  if ($(this).attr("name")) {
    code = $(this).attr("name")
    href = $(this).attr("href");
    href = snippet_href(href, code)

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
