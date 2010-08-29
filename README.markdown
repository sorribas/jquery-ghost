jQuery Ghost is a simple, lightweight "ghost text" implementation.  Ghost text appears on `<input>` fields when they are empty and unfocused.  When the user clicks or tabs into the field, the ghost text disappears.  If the field is still empty when they leave the field, the ghost text reappears.

This plugin uses the fields' `title=` attributes to control the ghost text and applies the `"ghosted"` class to fields which currently contain ghost text, which allows the ghost text to be styled via CSS and excluded from form submissions (using JavaScript).

#### Why the `title=` attribute?

1. using an attribute won't interfere with browsers' form auto-filling
2. using a standard attribute preserves markup validation
3. the `title=` attribute's semantic meaning is very close to that of ghost text

#### How can I change / remove ghost text?

This version doesn't support changing or removing ghost text, at least not directly (this will be added in the near future).  Below is an example of changing the ghost text.  Currently, the only way to remove ghost text completely is to remove the elements' `blur` and `focus` handlers, though it can be approximated by changing the ghost text to an empty string.

#### Examples

Apply ghost text to all input fields in the document which have `title=` attributes:

    $("input[title]").ghost();

Style ghost text:

    /* ghosted text is faded and italic */
    input.ghosted { color: #999; font-style: italic; }

Preventing ghosted text from being submitted, traditional forms:

    $("#myForm").submit(function() {
        $(this).find("input.ghosted").val("");
    });

Preventing ghosted text from being submitted, AJAX forms:

    $("#myForm").submit(function() {
        var $this = $(this), $ghosts = $this.find("input.ghosted").val("");

        $.post("form.json", $this.serialize(), callback());

        $ghosts.blur(); // blur events trigger ghost behavior on empty fields
    });

Changing a field's ghost text; the `title=` attribute is only used at setup time:

    var old_ghost = $input.data("ghost");

    if ($input.val() === old_ghost) $input.val("");

    $input.data("ghost", "New ghost text").blur();
