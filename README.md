orz-grabber is a node.js module used to grab webpage content. 

You can either grab a single webpage or multiple webpage, in jQuery collection or JSON format according to your needs.

Some websites limit the concurrent url requests to certain number; with orz-grabber you can set the concurrent url requests limits, and orz-grabber will get back to you once all requests have been completed. 

TO INSTALL:

npm install orz-grabber


TO USE:

var grabber = requier('orz-grabber');

USAGE EXAMPLE:

// Print out list of article titles
//
  grab_page(site_url, $_jQuery_selector, function($items) {
    var
      items = [];
	  
    $items.forEach(function(item, idx) {
      items.push({
        index   : idx + 1,
        title   : item.attr('title'),
        href    : item.attr('href')
      });
      console.log(items);
    });
  });
  
// Grab multiple pages
//  
  grab_multi(site_url_list, $_jQuery_selector, concurrent_limit, function($items, idx) {
	// Do something with $items and its corresponding index
	// ......
  });