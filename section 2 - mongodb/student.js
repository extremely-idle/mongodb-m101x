var mongoose = require('mongoose');

/** Function that count occurrences of a substring in a string;
* @param {String} string               The string
* @param {String} subString            The sub string to search for
* @param {Boolean} [allowOverlapping]  Optional. (Default:false)
*
* @author Vitim.us https://gist.github.com/victornpb/7736865/edit
* @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
* @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
*/
function occurrences(string, subString, allowOverlapping) {
 
    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);
 
    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;
 
    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}
 
var schema = new mongoose.Schema({
  name: { type: String, required: true },
  courses: [{ type: String, ref: 'Course' }]
});

/* Returns the student's first name, which we will define
* to be everything up to the first space in the student's name.
* For instance, "William Bruce Bailey" -> "William" */
schema.virtual('firstName').get(function() {
  return this.name.split(" ", 1);
});

/* Returns the student's last name, which we will define
* to be everything after the last space in the student's name.
* For instance, "William Bruce Bailey" -> "Bailey" */
schema.virtual('lastName').get(function() {
  return this.name.split(" ")[(occurrences(this.name, " "))];
});

module.exports = schema;