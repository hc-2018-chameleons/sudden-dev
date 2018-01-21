document.writeln("<script type='text/javascript' src='http://www.skulpt.org/static/skulpt.min.js'></script>");
document.writeln("<script type='text/javascript' src='http://www.skulpt.org/static/skulpt-stdlib.js'></script>");
import store from "./store"
import {testResults} from "./actions/round"

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
            store.dispatch(testResults({passed:tests_passed, failed:tests_failed}));
        }
    };
    var test_passed_callback = function() {
        tests_passed++;
        if (tests_failed + tests_passed >= test_inputs.length) {
            console.log("TESTS FAILED: " + tests_failed);
            console.log("TESTS PASSED: " + tests_passed);
            store.dispatch(testResults({passed:tests_passed, failed:tests_failed}));
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
                console.log("FAIL: Expected " + expected_output + ", got " + text);
                test_failed_callback();
            }
        };
        Sk.configure({
            output: outf,
            read: builtinRead
        });
        var functionCall = prog;
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
                document.getElementById('error-box').innerHTML=err.toString();
                test_failed_callback();
            });
    }
}
