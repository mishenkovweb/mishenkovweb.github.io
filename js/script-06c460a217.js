$(function(){
    /* Inits */
    initPopup();
    initToggle();
    initScroll();
    initCarousel();
    initReviews();
    initCarAnimation();
    initInstructorPopup();
    initCategoryPopup();


    /* Functions */

    function initPopup() {
        if (!$('.fancybox').length) return;

        $(document).on('init', '.fancybox', function() {
            var
                defaults = {
                    maxWidth: 960,
                    autoResize: true,
                    padding: 0,
                    helpers: {
                        media: {},
                        overlay: {
                            locked: true
                        }
                    },
                    tpl: {
                        closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                        next     : '<a title="Далее" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                        prev     : '<a title="Назад" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
                    }
                },
                $el = $(this),
                group = $el.attr('data-fancybox-group'),
                options = eval('[' + $el.data('fancybox-options') + ']')[0]
            ;

            if (group) $el = $('[data-fancybox-group="' + group + '"]');

            $.extend(defaults, options);

            $el.fancybox(defaults);
        });

        $('.fancybox').trigger('init');
    }


    function initToggle() {
        if (!$('.toggle').length) return;

        $('.toggle').on('click', function(event){
            event.preventDefault();
            $($(this).toggleClass('open').attr('href')).fadeToggle('slow');
        });
    }


    function initScroll() {
        if (!$('.scroll').length) return;

        $('.scroll').click(function(event){
            event.preventDefault();
            var hrefId = $(this).attr('href');
            var posTop = $(hrefId).offset().top;
            $('html, body').animate({scrollTop: posTop}, 1000);
        });
    }


    function initCarousel() {
        if (!$('div.owl-carousel').length) return;

        $(document).on('init', 'div.owl-carousel', function() {
            var
                $carousel = $(this),
                defaults = {
                    loop: true,
                    margin: 30,
                    nav: true
                },
                options = {}
            ;

            if ( $carousel.data('owl-options') ) {
                options = eval('[' + $carousel.data('owl-options') + ']')[0];
                $.extend(defaults, options);
            }

            $carousel.owlCarousel(defaults);
        });

        $('div.owl-carousel').trigger('init');
    }

    function initReviews(){
        $('.more__link').on('click', function(event) {
            event.preventDefault();

            var
                $container = $(this).closest('div.container'),
                $hidden_items = $('.hidden-item', $container)
            ;

            if(!$hidden_items.length) {
                $(this).hide();
                return;
            }

            $hidden_items.slice(0, 3).slideDown().removeClass('hidden-item');
            $('.more').css('display', 'none');
        });
    }

    function initInstructorPopup() {
        $('.instructors [href="#popup-instructor"]').click(function(){
            var src = $(this).parent().find('.hidden');

            var popup = $('#popup-instructor');
            popup.find('.instructor__age span').text(src.find('.age').text())
            popup.find('.instructor__exp span').text(src.find('.exp').text())
            popup.find('.instructor__car span').text(src.find('.car').text())
            popup.find('.instructor__quote span').text(src.find('.quote').text());

            popup.find('.instructor__name').text(src.parent().find('.instructors__name').text());
            popup.find('.instructor__img').attr('src', src.parent().find('.instructors__img').attr('src'));
        })
    }

    function initCategoryPopup() {
        $('.price [href="#popup-category"]').click(function(){

            var src = $(this).parent().find('.hidden'),
                popup = $('#popup-category'),
                cat = src.parent().find('.price__title').attr("data-category"),
                price = src.parent().find('.price__number.sale').text();

            if (window.matchMedia("(max-width: 767px)").matches) {
                popup.find('.form__header').html("Учиться на категорию&nbsp;" + cat + "<span> "+ price.slice(0, price.length - 1) + " руб.</span>");

            } else {
                popup.find('.category__name').html(src.parent().find('.price__title').html());
                popup.find('.category__list').html(src.parent().find('.list').html());
                popup.find('.category__price').html(src.parent().find('.price__number.sale').html());
                popup.find('.category__offer').html(src.parent().find('.offer').html());
            }
        })
    }

    function initCarAnimation(){
        var animating = 0;
        var animated = 0;

        var animations = [$('.animation-1 svg'), $('.animation-2 svg')];

        $(window).on('resize scroll', function(){

            var offsetY = $(window).scrollTop();

            animations[0].css('padding-left', $(window).width() / 2 - 525);
            animations[1].css('margin-left', $(window).width() / 2 - 780);

            if (offsetY >= 400 && animating == 0) animate(animations[0]);
            if (offsetY >= 3300 && animating == 1 && animated == 1) animate(animations[1]);

        }).trigger('scroll');

        function animate(animation){
            var car = animation.find('.car');
            var am = animation.find('.am');

            am[0].beginElement();
            car.fadeIn(1000);

            $(am[0]).on('beginEvent', function(){
                car.attr('transform','rotate(90,20,40)');
            });

            $(am[0]).on('endEvent', function(){
                animated++;
                car.fadeOut(300);
            });

            animating++;
        }

        //перезапуск каждые 5 секунд при условии, что анимация закончилась
        setInterval(function(){
            // if(animated == 2){
            // 		animated = 0;
            // 		animating = 0;
            // }
            // if ( animated == 0 ){
            // 	animate(animations[0]);
            // }
            // if( animated == 1 ) {
            // 	animate(animations[1]);
            // }
        }, 5000);
    }

    if($('body').hasClass('version-dp1')){
      $(".burger").click(function(){
        $('.dp1').toggleClass('active');
      });
    }

});

//Костыль для удаления виджета
(function(){
    var bodyNode = document.querySelector("body");
    var config = {childList: true};
    var entranceWidgetNode;
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            entranceWidgetNode = document.querySelector(".lander-widget-bottom-buttons");
            if (entranceWidgetNode) {
                entranceWidgetNode.remove();
                observer.disconnect();
            }
        });
    });
    observer.observe(bodyNode, config);
})();



//Смена телефона для виджета
// (function(){
//     document.addEventListener("DOMContentLoaded", function(event) {
//         var phoneLinkNode = document.querySelector(".lander-widget-bottom-buttons__call-wrap");
//         phoneLinkNode.href = "88001008921";
//     });
// })();

$(function(){
    /* Inits */
    initPopup();
    initToggle();
    initScroll();
    initMetroBlock();
    initTab();


    /* Functions */
    function initMetroBlock() {
        initStyledScroll();
        var $branch =  $('.branches__branch');

        $('#branches_num').text(
            $branch.length
        );

        changeInfo($($branch[0]));

        function changeInfo(el){
            var $container = el.data('id'),
                $info = $('#branch_info').empty();

            el.siblings().removeClass('active');
            el.addClass('active');

            $('.branches__content[data-id="' + $container + '"]').clone().appendTo($info).show();

            var map = $info.find('iframe').data('src');
            $info.find('iframe').attr('src', map);
        }

        $branch.on('click', function() {
            var el = $(this);
            changeInfo(el);
        });

    }

    function initPopup() {
        if (!$('.fancybox-metro').length) return;

        if (window.matchMedia("(max-width: 768px)").matches) {
            $('.fancybox-metro').fancybox({
                maxWidth: 1545,
                autoResize: true,
                padding: 0,
                helpers: {
                    media: {},
                    overlay: {
                        locked: true
                    }
                }
            });
        }
    }

    function initToggle() {
        if (!$('.toggle').length) return;

        $('.toggle').on('click', function(event){
            event.preventDefault();
            $($(this).toggleClass('open').attr('href')).fadeToggle('slow');
        });
    }


    function initScroll() {
        if (!$('.scroll').length) return;

        $('.scroll').click(function(event){
            event.preventDefault();
            var hrefId = $(this).attr('href');
            var posTop = $(hrefId).offset().top;
            $('html, body').animate({scrollTop: posTop}, 1000);
        });
    }


    function initStyledScroll(){
        $('.scroll-pane').jScrollPane({
            verticalDragMinHeight: 19,
            verticalDragMaxHeight: 19,
            autoReinitialise: true,
            autoReinitialiseDelay: 500
        });
    }


    function initTab(){
        if (!$('.tab').length) return;

        $('.tab').on('click', function(){
            var href = $(this).data('href') || $(this).attr('href');

            $(this).siblings('.tab').removeClass('active-tab');
            $(this).addClass('active-tab');

            $(href).siblings('.tab-content').hide();
            $(href).show();
        });
    }

});
