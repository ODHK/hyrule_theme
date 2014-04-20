/*
Hyrule Theme Loader for iPython Notebooks

Until iPython develops an official way of adding themes to iPython Notebooks,
this hack will allow you to load custom CSS and JS in any ipython notebook viewer.

Just include the following in the first cell

    %%javascript
    $.getScript("https://raw.githubusercontent.com/ODHK/hyrule_theme/master/custom.js")


Or for Development purposes
    
    %%javascript
    $.getScript("http://localhost:8000/theme/custom.js")

*/

// Theme and Asset URLs, change these to your fork.

var base_url  = 'https://raw.githubusercontent.com/'
var theme_url = 'http://odhk.github.io/hyrule_theme/'
var asset_url = base_url + 'tijptjik/DS_assets/master/'

// Hide the theme Cell

$('.cell:first').hide()

// Load the styles

if (is_local()){
    theme_url = 'http://localhost:8000/theme/'
}  

$('<link>')
  .appendTo($('head'))
  .attr({type : 'text/css', rel : 'stylesheet'})
  .attr('href', theme_url + 'custom.css');

// Insert stylised elements

$('<img>')
  .prependTo($('h1'))
  .attr({src : 'assets/nodes.png', alt : 'break', class : 'lead'});

// Load the assets

if (is_local()){
    asset_url = 'http://localhost:8000/assets/'
}

$('img[src^="assets/"]').each(
    function(){
        var $this = $(this);
        var src = $this.attr('src').split('/')[1];
        $this.attr('src', asset_url + src)
    }
)

// Create events for jQuery show and hide methods

$.each(['show', 'hide'], function (i, ev) {
    var el = $.fn[ev];
    $.fn[ev] = function () {
        this.trigger(ev);
        return el.apply(this, arguments);
    };
});

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

// Helper Functions

function is_local(){
    return (document.location.hostname == "localhost" || document.location.hostname == '127.0.0.1')
}