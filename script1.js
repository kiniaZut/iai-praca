$(document).ready(function(){
    // language popup
    $('.selected_language').click(function(){
        $('.select_language_popup').toggle();
    });

    // slider product
    $('.slider_product').slick({
        infinite: true,
        vertical: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        nextArrow: '<button type="button" class="slick-prev"><img src="./down-arrow_slick.png"></button>',
        prevArrow: '<button type="button" class="slick-next"><img src="./up-arrow_slick.png"></button>',
        responsive: [
            {
              breakpoint: 760,
              settings: {
                dots: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                vertical: false,
                arrows: false
              }
            }
          ]
    });

    // counter product basket
    $('.product_minus').click(function(){
        calculate_amount('minus');
        return false;
    });
    $('.product_plus').click(function(){
        calculate_amount('plus');
        return false;
    });
    $('.amount_products').change(function(){
        calculate_amount('0');
    });

    function calculate_amount(operation){
        var value_products = $('.amount_products').val(),
        new_val = value_products.match(/^[0-9]+(\.[0-9]{1,2})?$/g);
        if(new_val && new_val > 0){
            if(operation == 'plus'){
                value_products = parseInt(new_val) + parseInt(1);
            }else if(operation == 'minus'){
                if(new_val == 1){
                    value_products = 1;
                }else{
                    value_products = parseInt(new_val) - parseInt(1);
                }
            }
            $('.amount_products').val(value_products);
        }else{
            $('.amount_products').val(1);
        }
    }


    // slider - view foto + add class .select_foto
    $('.slider_product .container_item_slider').click(function(){
        $('.slider_product .container_item_slider').each(function(){
            $(this).removeClass('select_foto');
        });
        $(this).addClass('select_foto');
        var foto = $(this).find('img').attr('src');
        $(".product_large_foto img").attr("src", foto);
    });

    if ($(window).width() < 760) {
        nav_link_to_hamburger();
        toogle_menu_link();
    } else {
        nav_link_to_menu();
        $('.nav_item_level_1 > a').removeClass('toggle_menu_item');
    }
    // mobile - move elemnets to toggle mobile menu
    $(window).resize(function() {
        if ($(window).width() < 760) {
            nav_link_to_hamburger();
            toogle_menu_link();
        } else {
            nav_link_to_menu();
            $('.nav_item_level_1 > a').removeClass('toggle_menu_item');
        }
    });

    // questions client toggle
    $('.questions_client').click(function(){
        $(this).find('div').toggle();
    });

    function toogle_menu_link(){
        $('.nav_item_level_1').addClass('toggle_menu_item');
        $('.nav_level_2').hide();
        $('.toggle_menu_item').click(function(){
            $(this).find('.nav_level_2').toggle();
        });
    }

    // przeniesienie navigacji do menu
    function nav_link_to_menu(){
        if($('#nav_mobile_menu').length){
            $('#basket_container').addClass('container');
            $('header').prepend($('#top_contact_links'));
            $('#basket_container').after($('#top_menu'));
            $('#top_logo').after($('#top_search'));
            $('#top_basket').prepend($('#top_language'));
            $('#top_language').after($('#top_link_your_account'));
            $('#rank_counter > img').attr('src', 'rank.png');

            // hide basket svg and show normal basket
            $("#links_basket").show();
            $("#mobile_menu").remove();
        }
    }

    // przeniesienie navigacji do hamburgera // mobile
    function nav_link_to_hamburger(){
        if($('#nav_mobile_menu').length == 0){
            $('#basket_container').removeClass('container');
            $("header").prepend("<div id='mobile_menu' class='col-md-2'><span class='hamburger_svg mobile_left'><i class='fas fa-bars'></i></span><div id='nav_mobile_menu'></div></div>");
            $('#nav_mobile_menu').prepend($('.hide_mobile#top_language'));
            $('#nav_mobile_menu').prepend($('.hide_mobile#top_contact_links'));
            $('#nav_mobile_menu').prepend($('.hide_mobile#top_link_your_account'));
            $('#nav_mobile_menu').prepend($('.hide_mobile#top_menu'));
            $('#nav_mobile_menu').prepend($('.hide_mobile#top_search'));
            $('#rank_counter > img').attr('src', 'rank_red.png');
            // show basket svg and hide normal basket
            $("#links_basket").hide();
            // toggle menu mobile
            var flag_mobile_left = 1;
            $('.hamburger_svg').click(function(){
                if(flag_mobile_left){
                    $( ".mobile_left" ).animate({
                        left: "+=250"
                        }, 200, function() {
                        $('.mobile_left').css('left', '250px'); 
                    });
                    $('#nav_mobile_menu').animate({
                        left: "0"
                    }, 100, function(){
                        $('#nav_mobile_menu').toggle();
                    });
                    flag_mobile_left = 0;
                }else{
                    $( ".mobile_left, #nav_mobile_menu" ).animate({
                        left: "-=250"
                        }, 200, function() {
                        $('.mobile_left').css('left', '0px'); 
                        $('#nav_mobile_menu').toggle();
                    });
                    flag_mobile_left = 1;
                }
            })
        }
    }
});