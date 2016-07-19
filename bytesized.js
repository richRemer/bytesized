/**
 * Convert SI or EIC data unit to number.
 * @param {string|number} value
 * @returns {number}
 */
function bytesized(value) {
    if (typeof value === "number") return value;
}

module.exports = bytesized;
