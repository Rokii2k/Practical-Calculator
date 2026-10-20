
"use strict";

const form = document.querySelector("#calculator-form");
const firstInput = document.querySelector("#first-number");
const secondInput = document.querySelector("#second-number");
const operationInput = document.querySelector("#operation");
const resultOutput = document.querySelector("#result");
const messageOutput = document.querySelector("#message");
const resetButton = document.querySelector("#reset-button");

function showMessage(message, isError = false) {
    messageOutput.textContent = message;
    messageOutput.classList.toggle("error", isError);
}

function formatNumber(number) {
    if (!Number.isFinite(number)) {
        return String(number);
    }

    

    return new Intl.NumberFormat("sl-SI", {
        maximumFractionDigits: 10
    }).format(cleaned);
}

function calculate(first, second, operation) {
    switch (operation) {
        case "add":
            return first + second;

        case "subtract":
            return first - second;

        case "multiply":
            return first * second;

        case "divide":
            if (second === 0) {
                throw new Error("Deljenje z nič ni dovoljeno.");
            }
            return first / second;

        default:
            throw new Error("Na voljo so samo štiri matematične operacije");
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!firstInput.value.trim() || !secondInput.value.trim()) {
        resultOutput.textContent = "—";
        showMessage("Vnesi obe števili.", true);
        return;
    }

    const first = firstInput.valueAsNumber;
    const second = secondInput.valueAsNumber;
    const operation = operationInput.value;

    if (!Number.isFinite(first) || !Number.isFinite(second)) {
        resultOutput.textContent = "—";
        showMessage("Vnesena vrednost ni veljavno število.", true);
        return;
    }

    try {
        const answer = calculate(first, second, operation);

        if (!Number.isFinite(answer)) {
            throw new Error("Rezultat je zunaj podprtega številskega območja.");
        }

        resultOutput.textContent = formatNumber(answer);
        showMessage("Izračun je bil uspešno izveden.");
    } catch (error) {
        resultOutput.textContent = "Napaka";
        showMessage(error.message, false);
    }
});

resetButton.addEventListener("click", () => {
    resultOutput.textContent = "Tukaj bo prikazan rezultat.";
    showMessage("Vnesi obe števili in izberi operacijo.");
});
