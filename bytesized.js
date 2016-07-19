/**
 * Convert SI or EIC data unit to number.
 * @param {string|number} value
 * @returns {number}
 */
function bytesized(value) {
    var parsed;

    if (typeof value === "number") return value;
    
    if (/^-?[0-9]+$/.test(value)) return parseInt(value);
    if (/^-?[0-9]+\.[0-9]+$/.test(value)) return parseFloat(value);
    
    parsed = /^(-?)([0-9]+(\.[0-9]+)?) ?([a-z]+)$/.exec(value);

    if (parsed) {
        
    } else {
        throw new Error("invalid format");
    }
}

module.exports = bytesized;
