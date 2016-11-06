/**
 * Created by manlier on 2016/8/1.
 */
var pattern = /Java/g;
var text = "JavaScript is more fun that Java";
var result;
while((result = pattern.exec(text)) != null) {
    alert("Matched '" + result[0] + "'" +
        " at position " + result.index + 
        "; next search begins at " + pattern.lastIndex);
}