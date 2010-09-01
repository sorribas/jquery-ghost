// Copyright (c) 2010, Ben Blank
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
//
// * Redistributions of source code must retain the above copyright
//   notice, this list of conditions and the following disclaimer.
//
// * Redistributions in binary form must reproduce the above copyright
//   notice, this list of conditions and the following disclaimer in the
//   documentation and/or other materials provided with the distribution.
//
// * Neither the name of 535 Design nor the names of its contributors
//   may be used to endorse or promote products derived from this
//   software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED.	IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

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

				if ($this.data("ghost")) return;

				$this.data("ghost", $this.attr("title"))
				     .removeAttr("title")
				     .focus(ghost_focus)
				     .blur(ghost_blur);

				ghost_blur.call(this);
			});
		} else if (method === "destroy") {
			return this.each(function() {
				var $this = $(this);

				if (!$this.data("ghost")) return;

				ghost_focus.call(this);

				$this.attr("title", $this.data("ghost"))
				     .removeData("ghost")
				     .unbind("focus", ghost_focus)
				     .unbind("blur", ghost_blur);
			});
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
