$(document).ready(function () {
    // Mengambil elemen display dari HTML menggunakan jQuery.
    const $display = $("#display");

    let currentInput = "0";
    let firstNumber = null;
    let selectedOperator = null;
    let waitingForSecondNumber = false;

    function updateDisplay() {
        $display.text(currentInput);
    }

    function clearCalculator() {
        currentInput = "0";
        firstNumber = null;
        selectedOperator = null;
        waitingForSecondNumber = false;
        updateDisplay();
    }

    function calculate(a, b, operator) {
        switch (operator) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                return b === 0 ? "Error" : a / b;
            default:
                return b;
        }
    }

    $(".number").on("click", function () {
        const number = String($(this).data("number"));

        if (currentInput === "Error") {
            clearCalculator();
        }

        if (waitingForSecondNumber) {
            currentInput = number;
            waitingForSecondNumber = false;
        } else {
            currentInput = currentInput === "0" ? number : currentInput + number;
        }

        updateDisplay();
    });

    $(".operator").on("click", function () {
        if (currentInput === "Error") return;

        const operator = $(this).data("operator");
        const inputNumber = Number(currentInput);

        if (selectedOperator !== null && !waitingForSecondNumber) {
            const result = calculate(firstNumber, inputNumber, selectedOperator);

            if (result === "Error" || !Number.isFinite(result)) {
                currentInput = "Error";
                firstNumber = null;
                selectedOperator = null;
                waitingForSecondNumber = true;
                updateDisplay();
                return;
            }

            currentInput = String(Number(result.toPrecision(12)));
            firstNumber = Number(currentInput);
        } else {
            firstNumber = inputNumber;
        }

        selectedOperator = operator;
        waitingForSecondNumber = true;
    });


    $("#equals").on("click", function () {
        if (selectedOperator === null || waitingForSecondNumber || currentInput === "Error") {
            return;
        }

        const secondNumber = Number(currentInput);
        const result = calculate(firstNumber, secondNumber, selectedOperator);

        currentInput = result === "Error" || !Number.isFinite(result)
            ? "Error"
            : String(Number(result.toPrecision(12)));

        firstNumber = null;
        selectedOperator = null;
        waitingForSecondNumber = true;
        updateDisplay();
    });

    $("#clear").on("click", function () {
        clearCalculator();
    });
});
