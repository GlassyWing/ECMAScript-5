/**
 * Created by manlier on 2016/4/5.
 */

function Con() {

}



Con.prototype = {
  f: function() {
      this.g();
      Con.k();
  },

    g: function() {
        console.log("g");
    }
};

Con.k = function() {
    console.log("k");
};

var con = new Con();
con.f();