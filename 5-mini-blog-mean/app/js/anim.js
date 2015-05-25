/**
 * Created by NICOLÁS on 23/06/2014.
 */

$('#allPosts').click(function(){
    var gotoPos = (($('#centerContent').offset().top) -43);
    $('body, html').animate({
        scrollTop: gotoPos
    }, 500)
});