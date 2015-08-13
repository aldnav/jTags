# jTag
Simple implementation of tagging via jQuery.

![alt text](http://i.imgur.com/5TmWuFe.png "jTag")
##Usage
---
In order for jTag to work, grab a copy of jQuery and include both jQuery and
jtag script like so:
``` html
<script type="text/javascript" src="jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="jtag.js"></script>
```
Now you would be able to create tags for the following markup:
``` html
<div id="tags" data-target="tag-input">
    <input id="tag-input" type="text" placeholder="Add category">
</div>
<!-- and in the scripts -->
<script type="text/javascript">
    $('#tag-input').tag();
</script>
```
There are functionalities available with jTag, such as:
``` javascript
    $('#tag-input').tag({
        tags: ['ubuntu', 'mac os', 'windows 10'],
        delimiters: [',', '|'],
        onAddTag: function() {
            alert('A tag was added!');
        },
        onRemoveTag: function() {
            alert('A tag was removed!');
        }
    });
```
Feel free to contribute!
