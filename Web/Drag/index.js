$(function() {
  function dragConnect(class1, class2) {
    $(`.${class1}`).draggable();

    /* dragstart */
   $(`.${class1}`).on('dragstart', function() {
        $(`.${class2}`).each(function() {
            $(this).trigger('dragstart');
        });
    });

    /* drag */
    $(`.${class1}`).on('drag', function() {
        var maintop = $(this).css('top');
        var mainleft = $(this).css('left');

        $(`.${class2}`).each(function() {
            $(this).trigger('drag');
            $(this).css('margin-left', mainleft);
            $(this).css('position', 'absolute');
        });

        $(`.${class2}`).css('margin-top', maintop);
        $(`.${class1}`).css('position', 'absolute');
    });

   $(`.${class1}`).on('dragstop', function() {
        var maintop = $(this).css('top');
        var mainleft = $(this).css('left');

        $(`.${class2}`).each(function() {
            $(this).trigger('dragstop');
            $(this).css('margin-left', mainleft);
            $(this).css('position', 'absolute');
        });

       $(`.${class2}`).css('margin-top', maintop);
       $(`.${class1}`).css('position', 'absolute');
    });


    /* test different actions on .followers */
    $(`.${class2}`).on('dragstart', function() {
        // do something
    });

    $(`.${class2}`).on('drag', function() {
        // do something
    });

    $(`.${class2}`).on('dragstop', function() {
        // do something
    });
  }
  dragConnect('top', 'box');
  dragConnect('top2', 'box2');
  dragConnect('top3', 'box3');
});
