var imported = document.createElement('script');
imported.src = 'http://www.skulpt.org/static/skulpt.min.js';
document.head.appendChild(imported);
imported = document.createElement('script');
// imported.src = 'http://www.skulpt.org/static/skulpt-stdlib.js';
// document.head.appendChild(imported);
// imported = document.createElement('script');
imported.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js';
document.head.appendChild(imported);
function outf(text) {
    console.log("Program Output: " + text);
    // var mypre = document.getElementById("output");
    // mypre.innerHTML = mypre.innerHTML + text;
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

export default function runit(prog) {
    //var prog = document.getElementById("firepad"); // Get the code written by user here
    console.log(prog);
    // var mypre = document.getElementById("output");
    // mypre.innerHTML = '';
    // Sk.pre = "output";
    Sk.configure({
        output: outf,
        read: builtinRead
    });
    var test_input = "5"; // TODO: replace by test input
    var functionCall = prog;
    var functionCall = functionCall + "\n" + "print func(" + test_input + ")";
    console.log(functionCall);
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
    var myPromise = Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("<stdin>", false, functionCall, true);
    });
    myPromise.then(function(mod) {
            console.log('Compiled successfully');
        },
        function(err) {
            console.log("Program didn't compile!")
            console.log(err.toString());
        });
}
