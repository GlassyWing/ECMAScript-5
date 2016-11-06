/**
 * Created by manlier on 2016/8/2.
 */
do{
    var name = prompt('What is your name?');
    var correct = confirm("You entered '" + name + "'.\n");
} while (!correct);
alert("Hello, " + name);