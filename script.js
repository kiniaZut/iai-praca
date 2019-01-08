$(document).ready(function(){
    // language popup
    $('.selected_language').on('click', function(){
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
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                }
            },
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
    $('.product_minus').on('click', function(){
        calculate_amount('minus');
        return false;
    });
    $('.product_plus').on('click', function(){
        calculate_amount('plus');
        return false;
    });
    $('.amount_products').on('change', function(){
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
    $('.slider_product .container_item_slider').on('click', function(){
        $('.slider_product .container_item_slider').removeClass('select_foto');
        $(this).addClass('select_foto');
        var foto = $(this).find('img').attr('src');
        $(".product_large_foto img").attr("src", foto);
    });

    // questions client toggle
    $('.questions_client').on('click', function(){
        $(this).find('div').toggle();
    });

    // mobile - move elemnets to toggle mobile menu
    function changeWindow(){
        if ($(window).width() < 760) {
            nav_link_to_hamburger();
            toogle_menu_link();
            $('.nav_level_2').removeClass('no_mobile');
            $('.nav_level_2').css('display', 'none');
        } else {
            nav_link_to_menu();
            $('.toggle_menu_item').off('click');
            $('.nav_item_level_1').removeClass('toggle_menu_item');
            $('.nav_level_2').addClass('no_mobile');
        }
    }

    changeWindow();

    $(window).resize(function() {
        changeWindow();
    });

    function toogle_menu_link(){
        if(!$('.toggle_menu_item').length){
            $('.nav_item_level_1').addClass('toggle_menu_item');
            $('.nav_item_level_1 > a:not(:last-child)').off().on('click', function(ev) {
                $('.toggle_menu_item > ul').not($(this).parent().find('> ul')).slideUp();
                $(this).parent().find('> ul').slideToggle();
                ev.stopPropagation();
                return false;
            });
        }
    }

    // navigacji -> menu
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
            $('.option_product').after($('.check_product'), $('.to_basket'));
            $('.products_description').prepend($('h1'));
            $('.mobile_left').css('left', '0px'); 
        }
    }

    // nav -> hamburgera // mobile
    function nav_link_to_hamburger(){
        if(!$('#nav_mobile_menu').length){
            $('#basket_container').removeClass('container');
            $("header").prepend("<div id='mobile_menu' class='col-md-2'><span class='hamburger_svg mobile_left'><i class='fas fa-bars'></i></span><div id='nav_mobile_menu'></div></div>");
            $('#nav_mobile_menu').prepend($('.hide_mobile#top_search'), $('.hide_mobile#top_menu'), $('.hide_mobile#top_link_your_account'), $('.hide_mobile#top_contact_links'), $('.hide_mobile#top_language'));
            $('#rank_counter > img').attr('src', 'rank_red.png');
            // show basket svg and hide normal basket
            $("#links_basket").hide();
            // toggle menu mobile
            var flag_mobile_left = 1;
            $('.hamburger_svg').on('click', function(){
                if(flag_mobile_left){

                    $(".mobile_left").animate({
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
                    $(".mobile_left, #nav_mobile_menu").animate({
                        left: "-=250"
                        }, 200, function() {
                        $('.mobile_left').css('left', '0px'); 
                        $('#nav_mobile_menu').toggle();
                    });
                    flag_mobile_left = 1;
                }
            })
            $('#product_container').prepend($('h1'));
            $('.option_product').after($('.to_basket'), $('.check_product'));
            $('.mobile_left').css('left', '0px'); 
        }
    }
});
