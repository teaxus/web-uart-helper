var xml2js = require("xml2js");
var fs = require("fs");
var Buffer = require('buffer').Buffer
var Blob = require('buffer').Blob

debugger
var xml_string = fs.readFileSync("server/test.xml", "ASCII");
var parser = new xml2js.Parser({
  explicitChildren: true,
  preserveChildrenOrder: true,
});
parser.parseString(xml_string, function (err, result) {
  console.dir(result);
  console.log("Done");
});

// xmlreader.read(xml_string, function (errors, dom) {
//   if (null !== errors) {
//     console.log(errors);
//     return;
//   }
//   dom.protocol.each(function(item){
//     console.log(item)
//   })
//   console.log(dom.protocol);
//   console.log(dom.protocol.text());
// });
