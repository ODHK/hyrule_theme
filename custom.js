/*
Theme Loader for iPython Notebooks

Until iPython develops an official way of adding themes to iPython Notebooks,
this hack will allow you to load custom CSS and JS in any ipython notebook viewer.

Just include the following in the first cell

%%javascript
$.getScript("http://localhost:8000/custom.js")

*/
// Hide the theme Cell
$('#notebook .cell:first').hide()

var base_url = 'http://localhost:8000/theme/'
var css_url = base_url + 'custom.css'

$('<link>')
  .appendTo($('head'))
  .attr({type : 'text/css', rel : 'stylesheet'})
  .attr('href', css_url);

// Create events for jQuery show and hide methods

(function ($) {
      $.each(['show', 'hide'], function (i, ev) {
        var el = $.fn[ev];
        $.fn[ev] = function () {
          this.trigger(ev);
          return el.apply(this, arguments);
        };
      });
    })(jQuery);

// Insert stylised elements

$('<img>')
  .prependTo($('h1'))
  .attr({src : 'assets/nodes.png', alt : 'break', class : 'lead'});

// Render Resources

$('.rendered_html').on('show', function() {
    var resource_img = $('[alt="resource"]').map(function(i,e){return $(e).attr('src')})
	var resource_text = $('[alt="resource"]').siblings('a').map(function(i,e){return $(e).text()})
	var resource_links = $('[alt="resource"]').siblings('a').map(function(i,e){return $(e).attr('href')})

	$('[alt="resource"]').each(function(i,e){
		$p = $(e).parent('p');
		$p.empty()
			.addClass('resource-container')
			.append('<a>')
			.find('a')
			.attr('href', resource_links[i])			
			.append('<div>')
			.find('div')
			.css('background-image','url(' + resource_img[i]+')')
			.parent()
			.append('<p>')
			.find('p')
			.text(resource_text[i])
	})
})

$('.rendered_html').trigger('show')

