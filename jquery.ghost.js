(function($){
	$.fn.ghost = function() {
		return this.each(function() {
			var $this = $(this);

			$this.data("ghost", $this.attr("title")).removeAttr("title");
		}).focus(function() {
			var $this = $(this);

			if ($this.val() === $this.data("ghost")) {
				$this.val("");
				$this.removeClass("ghosted");
			}
		}).blur(function() {
			var $this = $(this);
			var val = $.trim($this.val());
			var ghost = $this.data("ghost");

			if (val === "" || val === ghost) {
				$this.val(ghost);
				$this.addClass("ghosted");
			}
		}).blur();
	};
})(jQuery)
