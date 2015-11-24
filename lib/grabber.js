/**
 * Created by cczhang on 2/10/2015.
 */
/*
 * grabber.js - module to provide
 */
// ------------- @ MODULE SCOPE VARIABLES ---------------
var
  request = require('superagent'),
  cheerio = require('cheerio'),
  async   = require('async'),

// Public functions
//
  grab_page, grab_lists, grab_json;
// ============= # MODULE SCOPE VARIABLES ===============

//------------------- @ HELPER FUNCTIONS ------------------
// @ Helper Func //
//
// To ...
// VERSION    : 0.0.1
// PARAMETERS :
// ....       : ...;
// .......    : ...;
// ........   : ...;
//
// .......
//
// # Helper Func //
//==================== # HELPER FUNCTIONS ===================

// ------------------- @ PUBLIC METHODS -------------------
// @ Public Func /grab_page/
//
// To grab specific content from a Web page url
// VERSION    : 0.1.1
// PARAMETERS :
// _url       : url of web page
// _target    : jQuery selection strings for cheerio,
//              an array of jQuery items will be selected;
// callback   : callback function to handle the selected jQuery items;
//
grab_page = function (_url, _grab_target, callback) {
  request.get(_url).end(
    function (err, res) {
      if (err) {
        console.error(err);
      }

      var
        $ = cheerio.load(res.text),
        $items = [];

      $(_grab_target).each(function (idx, item) {
        var
          $item = $(item);
        $items.push($item);
      });
      callback($items);
    }
  );
};
//
// # Public Func /grab_page/

// @ Public Func /grab_lists/
//
// grab each individual page from a url_list
// VERSION       : 0.1.1
// PARAMETERS    :
// _url_list     : url list of web pages
// _target       : jQuery selection strings for cheerio,
//                 an array of jQuery items will be selected;
// _concurrent   : concurrent url request number, must be >= 1;
// callback      : callback function to handle the selected jQuery items,
//                 the second parameter of callback is the index of actual sequence,
//                 (not the index of returning results)
//
grab_lists = function(_url_list, _grab_target, _concurrent, callback) {
  //_url_list.forEach(function(_url, idx) {
  //  grab_page(_url, _grab_target, function($items) {
  //    callback($items, idx);
  //  });
  //});

  if (_concurrent <= 1) _concurrent = 1;

  // control the concurrent url_fetching
  //
  async.mapLimit(
    _url_list, _concurrent,

    function(_url, cb) {
      grab_page(_url, _grab_target, function($items) {
        callback($items, _url_list.indexOf(_url));
      });
      cb(null, _url);
    },

    function(err, result) {
      if (err) {
        console.error('error: ' + err);
      }
      console.log(result);
    }
  );
};
//
// # Public Func /grab_lists/

// @ Public Func /grab_json/
//
// To grab specific api content from a Web page url
// VERSION    : 0.1.1
// PARAMETERS :
// _url       : url of api
// _target    : selected property of the returned json object
// callback   : callback function to handle the json element;
//
grab_json = function (_url, _grab_targets, callback) {
  request.get(_url).end(
    function (err, res) {
      if (err) {
        console.error(err);
      }

      var
        obj   = res.body.content,
        items;

      // If the first _target is an array
      //
      if (_grab_targets) {
        items = obj[_grab_targets];
        callback(items);
      }
      else {
        callback(obj);
      }
    }
  );
};
//
// # Public Func /grab_json/

// =================== # PUBLIC METHODS ===================

// -------------- @ MODULE INITIALIZATION ---------------
module.exports = {
  grab_page  : grab_page,
  grab_multi : grab_lists,
  grab_json  : grab_json
};
// ============== # MODULE INITIALIZATION ===============