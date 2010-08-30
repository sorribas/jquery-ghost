(function($){
	function ghost_focus() {
		var $this = $(this);

		if ($.trim($this.val()) === $this.data("ghost")) {
			$this.val("");
			$this.removeClass("ghosted");
		}
	}

	function ghost_blur() {
		var $this = $(this);
		var val = $.trim($this.val());
		var ghost = $this.data("ghost");

		if (val === "" || val === ghost) {
			$this.val(ghost);
			$this.addClass("ghosted");
		}
	}

	$.fn.ghost = function(method, option, value) {
		if (method === undefined && option === undefined && value === undefined) {
			return this.each(function() {
				var $this = $(this);

				if ($this.data("ghost")) {
					throw "ghost text has already been applied";
				}

				$this.data("ghost", $this.attr("title")).removeAttr("title");
			}).focus(ghost_focus).blur(ghost_blur).blur();
		} else if (method === "destroy") {
			return this.each(function() {
				var $this = $(this);

				$this.attr("title", $this.data("ghost")).removeData("ghost");

				if ($this.hasClass("ghosted")) {
					$this.val("");
					$this.removeClass("ghosted");
				}
			}).unbind("focus", ghost_focus).unbind("blur", ghost_blur);
		} else if (method === "option") {
			if (option !== "text") {
				throw "invalid option '" + option + "'"
			}

			if (typeof value === "undefined") {
				return this.data("ghost");
			} else {
				return this.each(function() {
					var $this = $(this);

					if ($this.hasClass("ghosted")) {
						$this.val(value);
					}
				}).data("ghost", value);
			}
		} else {
			throw "no such method '" + method + "'";
		}
	};
})(jQuery);
