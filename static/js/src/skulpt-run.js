document.writeln("<script type='text/javascript' src='http://www.skulpt.org/static/skulpt.min.js'></script>");
document.writeln("<script type='text/javascript' src='http://www.skulpt.org/static/skulpt-stdlib.js'></script>");

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

export default function runit(prog, test_inputs, expected_outputs) {
    var tests_failed = 0;
    var tests_passed = 0;
    var test_failed_callback = function() {
        tests_failed++;
        if (tests_failed + tests_passed >= test_inputs.length) {
            console.log("TESTS FAILED: " + tests_failed);
            console.log("TESTS PASSED: " + tests_passed);
        }
    };
    var test_passed_callback = function() {
        tests_passed++;
        if (tests_failed + tests_passed >= test_inputs.length) {
            console.log("TESTS FAILED: " + tests_failed);
            console.log("TESTS PASSED: " + tests_passed);
        }
    };
    for (var i = 0; i < test_inputs.length; i++) {
        var test_input = test_inputs[i];
        var expected_output = expected_outputs[i];
        var outf = function(text) {
            if (text == "\n") {
                return;
            }
            if (text == expected_output) {
                test_passed_callback();
            } else {
                test_failed_callback();
            }
        };
        Sk.configure({
            output: outf,
            read: builtinRead
        });
        var functionCall = prog;
        functionCall = "def func(num):\n    result = 1\n    for i in range(1, num+1):\n       result *= i\n    return result"
        functionCall = functionCall + "\n" + "print func(" + test_input + ")";

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
                test_failed_callback();
            });
    }
}
