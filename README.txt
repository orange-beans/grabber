orz-grabber is a node.js module used to grab webpage content. 

You can either grab a single webpage or multiple webpage, in jQuery collection or JSON format according to your needs.

Some websites limit the concurrent url requests to certain number. With grabber you can also set the concurrent url requests and let grabber get back to you once all requests have been completed. 


// ------------------- @ PUBLIC METHODS -------------------
// @ Public Func /grab_page/
//
// To grab specific content from a Web page url
// VERSION    : 0.0.1
// PARAMETERS :
// _url       : url of web page
// _target    : jQuery selection strings for cheerio,
//              an array of jQuery items will be selected;
// callback   : callback function to handle the selected jQuery items;


// @ Public Func /grab_lists/
//
// grab each individual page from a url_list
// VERSION       : 0.0.1
// PARAMETERS    :
// _url_list     : url list of web pages
// _target       : jQuery selection strings for cheerio,
//                 an array of jQuery items will be selected;
// _concurrent   : concurrent url request number, must be >= 1;
// callback      : callback function to handle the selected jQuery items,
//                 the second parameter of callback is the index of actual sequence,
//                 (not the index of returning results)



// @ Public Func /grab_json/
//
// To grab specific api content from a Web page url
// VERSION    : 0.0.1
// PARAMETERS :
// _url       : url of api
// _target    : selected property of the returned json object
// callback   : callback function to handle the json element;

