export function parseStringToEth(number: string) {
    let finalNumber = "";
    for (let i = 0; i < number.length; i++) {
        if (number[i] === ",") {
            finalNumber = finalNumber + "";
        } else if (number[i] === ".") {
            return Number(finalNumber);
        } else {
            finalNumber = finalNumber + number[i];
        }
    }
    return Number(finalNumber);
}