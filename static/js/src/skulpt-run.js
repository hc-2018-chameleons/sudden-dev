document.writeln("<script type='text/javascript' src='http://www.skulpt.org/static/skulpt.min.js'></script>");
document.writeln("<script type='text/javascript' src='http://www.skulpt.org/static/skulpt-stdlib.js'></script>");
function outf(text) {
    console.log("Program Output: " + text);
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

export default function runit(prog) {
    console.log(prog);
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
