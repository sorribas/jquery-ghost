jQuery Ghost is a simple, lightweight "ghost text" implementation.  Ghost text appears on `<input>` fields when they are empty and unfocused.  When the user clicks or tabs into the field, the ghost text disappears.  If the field is still empty when they leave the field, the ghost text reappears.

This plugin uses the fields' `title=` attributes to control the ghost text and applies the `"ghosted"` class to fields which currently contain ghost text, which allows the ghost text to be styled via CSS and excluded from form submissions (using JavaScript).

#### Why the `title=` attribute? ####

1. using an attribute won't interfere with browsers' form auto-filling
2. using a standard attribute preserves markup validation
3. the `title=` attribute's semantic meaning is very close to that of ghost text
4. it degrades gracefully when JavaScript is disabled (the text is still available by hovering over the field)

#### How can I change / remove ghost text? ####

Although jQuery Ghost isn't implemented as a jQuery UI widget (the overhead and extra dependency don't seem warranted), its interface mimics that of a widget.  See the examples below.

#### Usage notes ####

* Removing ghost text from a field sets its `title=` attribute to the current ghost text, *not* its original value.  This is only relevant if you changed the ghost text between creating and destroying it.
* jQuery Ghost applies a class to ghosted fields, but does not iteslf apply any styles.  If you want your ghost text to have a particular appearance, you'll need to attach it to the `.ghosted` class yourself.  (See the example below.)
* No checks are made to prevent ghosted text from being applied to non-`<input>` elements.  In theory, ghost text can be applied to any element for which `$elem.val()` has meaning, such as `<textarea>`s.

#### Examples ####

Apply ghost text to all input fields in the document which have `title=` attributes:

    $("input[title]").ghost();

Style ghost text:

    /* make ghosted text grey and italic */
    input.ghosted { color: #999; font-style: italic; }

Prevent ghosted text from being submitted, traditional forms:

    $("#myForm").submit(function() {
        $(this).find("input.ghosted").val("");
    });

Prevent ghosted text from being submitted, AJAX forms:

    $("#myForm").submit(function() {
        var $this = $(this), $ghosts = $this.find("input.ghosted").val("");

        $.post("form.json", $this.serialize(), callback);

        $ghosts.blur(); // blur events trigger ghost behavior on empty fields
    });

Retrieve a field's ghost text:

    $input.ghost("option", "text");

Change a field's ghost text:

    $input.ghost("option", "text", "New ghost text");

Remove ghost text behavior from a field:

    $input.ghost("destroy");
