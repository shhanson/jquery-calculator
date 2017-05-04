$(document).ready(function() {

    let input = [];
    $('#clear').click(function() {
        $('#screen').find('span').remove();
        input = [];
    });

    $('span').not('#clear').not('#equals').click(function() {
        if ($('screen').has($('#error'))) {
            $('#error').remove();
        }

        $('#screen').append("<span>" + $(this).text() + "</span>");
        input.push($(this).text());
        console.log(input);
    });

    $('#equals').click(function() {
        evaluateExpression();
    })

    function evaluateExpression() {
        let result = "";

        if (inputIsValid()) {
            let operand1 = "";
            let operand2 = "";
            let operatorIndex = -1;
            if(input[indexOfFirstOperator(input)] === "-" || input[indexOfFirstOperator(input)] === "+"){
                //console.log("SLICE: " + input.slice(1));
                operatorIndex = indexOfFirstOperator(input.slice(1))+1;
            } else {
                operatorIndex = indexOfFirstOperator(input);
            }
            //console.log("OPERATOR INDEX: " + operatorIndex);

            for (let i = 0; i < operatorIndex; i++) {
                operand1 += input[i];
            }

            for (let i = operatorIndex + 1; i < input.length; i++) {
                operand2 += input[i];
            }

            // if (operand2.length === 0) {
            //     operand2 = "0";
            // }

            operand1 = parseInt(operand1);
            operand2 = parseInt(operand2);

            if (input[operatorIndex] === "÷" && operand2 === 0) {
                //console.log("DIVIDE BY ZERO ERROR");
                $('#screen').html("<span id='error'>ERROR</span>");
                input = [];
                return;
            }

            switch (input[operatorIndex]) {
                case "+":
                    result = operand1 + operand2;
                    break;
                case "-":
                    result = operand1 - operand2;
                    break;
                case "x":
                    result = operand1 * operand2;
                    break;
                case "÷":
                    result = operand1 / operand2;
                    break;
                default:
                       //console.log("SWITCH STATEMENT ERROR");
                    $('#screen').html("<span id='error'>ERROR</span>");
            }

            $('#screen').html("<span>" + result + "</span>");

        } else {
            //console.log("INVALID INPUT ERROR");
            $('#screen').html("<span id='error'>ERROR</span>");
        }

        input = [];

    }

    function inputIsValid() {

        //No numbers or operators
        if (input.length === 0) {
            return false;
        }

        if (isOperator(input[0])) {
            if(input[0] !== "-" && input[0] !== "+"){
            //    console.log("TRIGGERED!")
                return false;
            }

        }

        if (isOperator(input[input.length - 1])) {
            return false;
        }

        // if (hasMultipleOperators(input)) {
        //     return false;
        // }

        return true;

    }

    function isOperator(val) {
        return val === "-" || val === "+" || val === "x" || val === "÷";
    }

    function hasOperator(expression) {
        return expression.includes("÷") || expression.includes("x") || expression.includes("-") || expression.includes("+");
    }

    function indexOfFirstOperator(expression) {
        if (hasOperator(expression)) {
            for (let i = 0; i < expression.length; i++) {
                if (isOperator(expression[i])) {
                    return i;
                }
            }
        }
        return -1;
    }

    function hasMultipleOperators(expression) {
        return expression.includes("x", indexOfFirstOperator(input) + 1) || expression.includes("÷", indexOfFirstOperator(input) + 1)
    }



}); //End all code
