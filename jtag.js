
(function($) {
    var delimiters = [',', '|'];
    var tags = [];
    var inputCtx = null;
    var tokenCtx = null;

    var _createTag = function(token) {
        tags.push(token);
        tokenCtx.append('<span>' + token + '</span>');
        inputCtx.val("");
    }

    $.fn.tag = function() {
        inputCtx = $(this);
        inputCtx.parent().on('click', function() {
            inputCtx.focus();
        });
        inputCtx.parent().prepend("<div class='tokens'></div>");
        tokenCtx = inputCtx.parent().find('.tokens');

        inputCtx.on('keypress', function(e) {
            e.stopPropagation();
            if (e.keyCode)
                var keycode = e.keyCode;
            else
                var keycode = e.charCode;
            if (keycode == 13){
            // check if Return is pressed or
                _createTag($(this).val());
            } else {
            // check if character is a delimiter
                for (var i = 0; i < delimiters.length; i++) {
                    if (delimiters[i] == String.fromCharCode(keycode))
                        _createTag($(this).val());
                };
            }
        });
    }
})(jQuery);
