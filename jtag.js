
(function($) {
    var tags = [];
    var inputCtx = null;
    var tokenCtx = null;
    var config = {
        delimiters: [',', '|'],
        onAddTag: null,
        onRemoveTag: null
    }

    var _createTag = function(token) {
        if (tags.indexOf(token) > -1)
            return;
        tags.push(token);
        if (config.onAddTag)
            config.onAddTag();
        tokenCtx.append('<span title="Remove tag">' + token + '</span>');
        inputCtx.val("");
        tokenCtx.find('span').last().on('click', function() {
            _removeTag($(this).text());
        });
    }

    var _removeTag = function(token) {
        var index = tags.indexOf(token);
        $(tokenCtx.find('span')[index]).remove();
        tags.splice(index, 1);
        if (config.onRemoveTag)
            config.onRemoveTag();
    }

    function initialize(options) {
        if (typeof options === 'undefined')
            return false;
        config.delimiters = options.delimiters || [',', '|'];
        config.onAddTag = options.onAddTag || null;
        config.onRemoveTag = options.onRemoveTag || null;
    }

    $.fn.tag = function(options) {
        initialize(options);

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
                for (var i = 0; i < config.delimiters.length; i++) {
                    if (config.delimiters[i] == String.fromCharCode(keycode))
                        _createTag($(this).val());
                };
            }
        });

    }
})(jQuery);
