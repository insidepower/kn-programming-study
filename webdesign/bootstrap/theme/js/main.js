$(function(){

  var g_neckline = "";
  var g_price = "";
  var g_train = "";
  var g_silhouette = "";

  function initMultiSelect(){
    $("#neckline-sort").multiselect({
      buttonText: function(options, select) { 
        return "Neckline" + ' <b class="caret"></b>';
      },
      buttonClass: "btn btn-default neckline-sort-btn",
      onChange: function(element, checked){
        var $query="&neckline=";
        var $selected = $("#neckline-sort option:selected");
        $($selected).each(function(){
          if ("multiselect-all" != $(this).attr("value")){
            $query += '"'+$(this).text() + '", ';
          }
        });
        $query = $query.substr(0, $query.length-2);
        if ($query != g_neckline ){
          g_neckline = $query;
          //console.log(g_neckline);
          var $url = "/cl-wedding-gowns.php";
          updateCatalogue($url, "");
        }
      },
      includeSelectAllOption: true
    });

    $("#train-sort").multiselect({
      buttonText: function(options, select) { 
        return "Train" + ' <b class="caret"></b>';
      },
      buttonClass: "btn btn-default train-sort-btn",
      onChange: function(element, checked){
        var $query="&train=";
        var $selected = $("#train-sort option:selected");
        $($selected).each(function(){
          if ("multiselect-all" != $(this).attr("value")){
            $query += '"'+$(this).text() + '", ';
          }
        });
        $query = $query.substr(0, $query.length-2);
        if ($query != g_train ){
          g_train = $query;
          //console.log(g_neckline);
          var $url = "/cl-wedding-gowns.php";
          updateCatalogue($url, "");
        }
      },
      includeSelectAllOption: true
    });

    $("#silhouette-sort").multiselect({
      buttonText: function(options, select) { 
        return "silhouette" + ' <b class="caret"></b>';
      },
      buttonClass: "btn btn-default silhouette-sort-btn",
      onChange: function(element, checked){
        var $query="&silhouette=";
        var $selected = $("#silhouette-sort option:selected");
        $($selected).each(function(){
          if ("multiselect-all" != $(this).attr("value")){
            $query += '"'+$(this).text() + '", ';
          }
        });
        $query = $query.substr(0, $query.length-2);
        if ($query != g_silhouette ){
          g_silhouette = $query;
          //console.log(g_neckline);
          var $url = "/cl-wedding-gowns.php";
          updateCatalogue($url, "");
        }

      },
      includeSelectAllOption: true
    });

    /*
    $('.multiselect').multiselect({
      checkboxName: 'price',
      //buttonClass: 'btn btn-default btn-sm',
      buttonText: function(options, select) {
        if (options.length === 0) {
          return 'Price<b class="caret"></b>';
        } else {
          var $selected = '';
          options.each(function() {
              selected += $(this).text() + ', ';
          });
          return (selected.substr(0, selected.length -2) + 
            ' <b class="caret"></b>');
        }
      },
      onChange: function(element, checked) {
          console.log('Change!element: '+element+"; checked: "+checked);
          console.log('element-value: '+element.attr("value"));
          if ("" != element.attr("value")){
            $.ajax({
              type: "POST",
              url: "/cl-wedding-gowns.php",
              data: "price="+ element.attr("value"),
              success: function(content){
                $("#cl-wedding-gowns").html(content);
                initMultiSelect();
              }
            });
          }
        }
    });
    */
  }

  function updateCatalogue(url, query){
    console.log("updateCl"+query+g_price+g_neckline+g_train);
    $.ajax({
      type: "POST",
      url: url,
      data: query+g_price+g_neckline+g_train+g_silhouette,
      success: function(content){
        content = $(content).find("#cl-photo");
        $("#cl-photo").html(content);
        initMultiSelect();
      }
    });
  }

  $("#cl").on('click', ".neckline-sort-btn", function(){
    var $isPopulate = $("#neckline-sort").children().length;
    if (!$isPopulate){
      $.ajax({
        type: "GET",
        url: '/helper/sort-filter.php',
        data: "cat=neckline",
        success: function(content){
          $("#neckline-sort").html(content);
          initMultiSelect();
          $("#neckline-sort").multiselect('rebuild');
        }
      });
    }
  });

  $("#cl").on('click', ".train-sort-btn", function(){
    var $isPopulate = $("#train-sort").children().length;
    if (!$isPopulate){
      $.ajax({
        type: "GET",
        url: '/helper/sort-filter.php',
        data: "cat=train",
        success: function(content){
          $("#train-sort").html(content);
          initMultiSelect();
          $("#train-sort").multiselect('rebuild');
        }
      });
    }
  });
  
  $("#cl").on('click', ".silhouette-sort-btn", function(){
    var $isPopulate = $("#silhouette-sort").children().length;
    if (!$isPopulate){
      $.ajax({
        type: "GET",
        url: '/helper/sort-filter.php',
        data: "cat=silhouette",
        success: function(content){
          $("#silhouette-sort").html(content);
          initMultiSelect();
          $("#silhouette-sort").multiselect('rebuild');
        }
      });
    }
  });

  //$("#price li").on('click', function(){
  //  event.preventDefault();
  //  var query = "price="+$(this).attr("value");
  //  updateCatalogue(query);
  //});
  $("#cl").on('click', "#paginate a", function(){
    event.preventDefault();
  });

  $("#cl").on('click', "#paginate span", function(){
    event.preventDefault();
    var $target = $("#paginate span").attr("data-target").split('?');
    var $url = $target[0];
    //var $order = $("#order").attr("value").trim();
    //if (""!=g_price){
    //  //$order = "price="+$order;
    //  $order = "&"+g_price;
    //}
    //var $order = (""==g_price)?"":g_price;
    var $query = "page="+$target[1];
    updateCatalogue($url, $query);
  });

  $("#cl").on('click', "#price li", function(){
    event.preventDefault();
    g_price = "&price="+$(this).attr("value");
    var $url = "/cl-wedding-gowns.php";
    updateCatalogue($url, "");
    $("#price li.active").removeClass("active");
    $(this).addClass("active");
  });

  $("#cl").on({ 
    mouseenter: function(){
      $(this).addClass('active');
      $(this).parents(".catalog-header")
                      //.find("img :not(.active)");
                      .find(".cl")
                      .not(".active")
                      .addClass('not-active');
      }, 
    mouseleave: function(){
          //console.log(this);
          $(".cl").removeClass('active not-active');
      }
  }, 
  ".cl"
  );

  initMultiSelect();
        //$imgcol.animate();

    //$(".catalog-header").click(function(){
    //    var $imgimg = $("img").not(".active");
    //    $imgimg.fadeTo("slow", 0.5, function(){
    //        $imgimg.fadeTo("slow", 1.0);
    //    });
    //    //console.log($imgimg);
    //});
});

/* vim: set fdm=indent: */
