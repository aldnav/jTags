
(function($) {
    var tags = [];
    var inputCtx = null;
    var tokenCtx = null;
    var config = {
        delimiters: [',', '|'],
        onAddTag: null,
        onRemoveTag: null
    }
    /** Adds a tag from list of tags
     * @param  {String}
     */
    var _createTag = function(token) {
        token = token.trim();
        if (tags.indexOf(token) > -1 || token.length <= 0)
            return;
        tags.push(token);
        if (config.onAddTag)
            config.onAddTag();
        tokenCtx.append('<span title="Remove tag">' + token + '</span>');
        setTimeout(function() {
            inputCtx.val("");
        }, 0);
        tokenCtx.find('span').last().on('click', function() {
            _removeTag($(this).text());
        });
    }
    /** Removes the tag from list of tags
     * @param  {String}
     */
    var _removeTag = function(token) {
        var index = tags.indexOf(token);
        if (index <= -1)
            return false;
        $(tokenCtx.find('span')[index]).remove();
        tags.splice(index, 1);
        if (config.onRemoveTag)
            config.onRemoveTag();
    }
    /** Initialize configuration for jtags
     * @param  {Object}
     */
    function initialize(options) {
        if (typeof options === 'undefined')
            return false;
        config.delimiters = options.delimiters || [',', '|'];
        config.onAddTag = options.onAddTag || null;
        config.onRemoveTag = options.onRemoveTag || null;
    }
    /** Initialize tags if tags are already provided
     * @param  {Object}
     */
    function initialize_tags(options) {
        if (typeof options === 'undefined')
            return false;
        _tags = options.tags || [];
        for (var i = 0; i < _tags.length; i++) {
            _createTag(_tags[i]);
        };
    }
    /** Hook 'tag' to any jQuery element
     * @param  {Object}
     */
    $.fn.tag = function(options) {
        initialize(options);

        inputCtx = $(this);
        inputCtx.parent().on('click', function() {
            inputCtx.focus();
        });
        inputCtx.parent().prepend("<div class='tokens'></div>");
        tokenCtx = inputCtx.parent().find('.tokens');
        initialize_tags(options);

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
        // needed keydown event to listen for nonprintable keys (Backspace)
        inputCtx.on('keydown', function(e) {
            e.stopPropagation();
            if (e.keyCode)
                var keycode = e.keyCode;
            if (keycode == 8 && $(this).val().length <= 0) {
                _removeTag(tags[tags.length-1]);
            }
        });

    }
})(jQuery);
