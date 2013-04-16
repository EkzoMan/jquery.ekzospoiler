/*Copyright, Copyleft Alexey "EkzoMan" Misyagin*/
/* 
	Options list:
			text: spoiler container title
			collaper: autocollapse spoiler on init
			animationTimeout: sopiler show/hide animation speed. set 0 for no animation
*/
(function ($) {
    var methods = {
        init: function (options) {
            settings = $.extend({
                text: 'Спойлер',
                collapsed: true,
                animationTimeout: 1000
            }, options);

            return this.each(function () {
                var spoilerControl = '<div class="spoilerControl">' + settings['text'] + '</div>';
				//prevent creating new instance on existing spoiler
				if($(this).data('hasSpoiler')!=undefined)
				{
					return false;
				}
				$(this).data('hasSpoiler', true).prepend(spoilerControl).data('defaultHeight', parseInt($(this).css('height'))).data('collapsed', settings['collapsed']).addClass('spoilerContainer');
                var Control = $(this).find('.spoilerControl');
                $(this).css('height', $(Control).css('height'));

                //Collapse spoiler on start
                if ($(this).data('collapsed') == true) {
                    $(this).css('height', $(Control).css('height'));
					$(Control).addClass('plus');
                }
                else {
                    $(this).css('height',$(this).data('defaultHeight'));
                    $(this).addClass('minus');
                }

                $(Control).click(function () {
                    var spoiler = $(this).parent();
					var animation;
					//Check if preveous animation in progress
                    if($(spoiler).data('currentAnimation')!=undefined){
						$(spoiler).data('currentAnimation').stop();
					}
					//Change collapsed state
					if ($(spoiler).data('collapsed') != true)
                    {
					    $(this).removeClass('minus').addClass('plus');
                        animation=$(spoiler).animate({
                            height: $(this).css('height')
                        }, settings['animationTimeout'],
						   function(){
									  $(spoiler).data('currentAnimation',undefined)
									  }
													 );
						$(spoiler).data('collapsed',true);
                    }
                    else {
					    $(this).removeClass('plus');
						$(this).addClass('minus');
						animation=$(spoiler).animate({
                            height: $(spoiler).data('defaultHeight')
                        }, settings['animationTimeout'],
						   function(){
									  $(spoiler).data('currentAnimation',undefined)
									  }
													 );
                        $(spoiler).data('collapsed',false);
                    }
					//Write current animation to stop if clicked before complete
					$(spoiler).data('currentAnimation',animation);
                });
            });
        },
		destroy: function(){
			return this.each(function () {
				$(this).removeData();
                var control = $(this).find('.spoilerControl');
				var defaultHeight = $(control).css('defaultHeight');
				$(this).removeClass('spoilerContainer');
				$(control).remove();
                $(this).css('height', defaultHeight);
			});
		}
    }

    $.fn.Spoiler = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.Spoiler');
        }

    };


})(jQuery);
