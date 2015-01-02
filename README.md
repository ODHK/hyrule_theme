# Theme Loader for iPython Notebooks

Until iPython develops an official way of adding themes to iPython Notebooks,
this hack will allow you to load custom CSS and JS in any ipython notebook viewer.

Just include and execute the following in the first cell of your notebook

```javascript
%%javascript

window.load_remote_theme = true
var theme_js = "https://odhk.github.io/hyrule_theme/custom.js";

window.load_local_theme = function(){
    var hostname = document.location.hostname
    return ((hostname == "localhost" || hostname == '127.0.0.1') && !load_remote_theme)
}

var url = load_local_theme() ? document.location.origin + "/files/theme/custom.js" : theme_js

$.getScript(url)
```

The snippet has two options:

* `local_theme` : when true, will load a local theme if the ipython notebook is served on localhost. By default, the local theme files should be placed in a sub-directory alongside the .ipynb file called 'theme'.
* `theme_url` : the url for the javascript file to load. The javascript file should contain logic for injecting styles and functionality. Reference the provided `custom.js` for an example.

