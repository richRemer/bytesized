/**
 * Convert SI or EIC data unit to number.
 * @param {string|number} value
 * @returns {number}
 */
function bytesized(value) {
    var parsed, neg, base, unit;

    if (typeof value === "number") return value;
    
    if (/^-?[0-9]+$/.test(value)) return parseInt(value);
    if (/^-?[0-9]+\.[0-9]+$/.test(value)) return parseFloat(value);
    
    parsed = /^(-?)([0-9]+(\.[0-9]+)?) ?([a-z]+)$/i.exec(value);

    if (parsed) {
        neg = parsed[1] === "-" ? -1 : 1;
        base = (parsed[3] ? parseFloat : parseInt)(parsed[2]);
        unit = unitsize(parsed[4]);

        if (unit === undefined) {
            throw new Error("invalid format");
        }
        
        return neg * base * unit;
    } else {
        throw new Error("invalid format");
    }
}

/**
 * Convert unit to numeric factor.
 * @param {string} unit
 * @returns {number}
 */
function unitsize(unit) {
    switch (unit.toLowerCase()) {
        case "b": return 1;
        case "kb": return 1000;
        case "mb": return 1000000;
        case "gb": return 1000000000;
        case "tb": return 1000000000000;
        case "pb": return 1000000000000000;
        case "eb": return 1000000000000000000;
        case "zb": return 1000000000000000000000;
        case "yb": return 1000000000000000000000000;
        case "kib": return Math.pow(1024, 1);
        case "mib": return Math.pow(1024, 2);
        case "gib": return Math.pow(1024, 3);
        case "tib": return Math.pow(1024, 4);
        case "pib": return Math.pow(1024, 5);
        case "eib": return Math.pow(1024, 6);
        case "zib": return Math.pow(1024, 7);
        case "yib": return Math.pow(1024, 8);
        default: return undefined;
    }
}

module.exports = bytesized;
