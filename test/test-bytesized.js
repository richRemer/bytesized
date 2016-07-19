var expect = require("expect.js"),
    bytesized = require("../");

describe("bytesized", function() {
    describe("(number)", function() {
        it("should return the number unaltered", function() {
            expect(bytesized(0)).to.be(0);
            expect(bytesized(100)).to.be(100);
            expect(bytesized(0.42)).to.be(0.42);
            expect(bytesized(Infinity)).to.be(Infinity);
            expect(isNaN(bytesized(NaN))).to.be(true);
        });
    });
    
    describe("(string)", function() {
        it("should return numeric value for numeric strings", function() {
            expect(bytesized("0")).to.be(0);
            expect(bytesized("100")).to.be(100);
            expect(bytesized("0.42")).to.be(0.42);
        });
        
        it("should convert SI-prefixed units", function() {
            expect(bytesized("42YB")).to.be(42 * Math.pow(1000, 8));
            expect(bytesized("42ZB")).to.be(42 * Math.pow(1000, 7));
            expect(bytesized("42EB")).to.be(42 * Math.pow(1000, 6));
            expect(bytesized("42PB")).to.be(42 * Math.pow(1000, 5));
            expect(bytesized("42TB")).to.be(42 * Math.pow(1000, 4));
            expect(bytesized("42GB")).to.be(42 * Math.pow(1000, 3));
            expect(bytesized("42MB")).to.be(42 * Math.pow(1000, 2));
            expect(bytesized("42kB")).to.be(42 * Math.pow(1000, 1));
            expect(bytesized("42B")).to.be(42);
        });
        
        it("should convert IEC-prefixed units", function() {
            expect(bytesized("42YiB")).to.be(42 * Math.pow(1024, 8));
            expect(bytesized("42ZiB")).to.be(42 * Math.pow(1024, 7));
            expect(bytesized("42EiB")).to.be(42 * Math.pow(1024, 6));
            expect(bytesized("42PiB")).to.be(42 * Math.pow(1024, 5));
            expect(bytesized("42TiB")).to.be(42 * Math.pow(1024, 4));
            expect(bytesized("42GiB")).to.be(42 * Math.pow(1024, 3));
            expect(bytesized("42MiB")).to.be(42 * Math.pow(1024, 2));
            expect(bytesized("42KiB")).to.be(42 * Math.pow(1024, 1));
        });
        
        it("should ignore unit case", function() {
            expect(bytesized("42B")).to.be(bytesized("42b"));
            expect(bytesized("42KiB")).to.be(bytesized("42kib"));
            expect(bytesized("42Kib")).to.be(bytesized("42kiB"));
            expect(bytesized("42eb")).to.be(bytesized("42EB"));
        });
        
        it("should treat hyphen-prefix as negation", function() {
            expect(bytesized("-42kb")).to.be(-1 * bytesized("42kb"));
        });

        it("should accept a single space between number and unit", function() {
            expect(bytesized("42KiB")).to.be(bytesized("42 KiB"));
        });
        
        it("should throw error on other values", function() {
            expect(bytesized.bind(null, "42 Goobers")).to.throwError();
            expect(bytesized.bind(null, "42  KiB")).to.throwError();
            expect(bytesized.bind(null, " 42 KiB")).to.throwError();
            expect(bytesized.bind(null, "42 KiB of data")).to.throwError();
        });
    });
    
    describe("(object)", function() {
        it("should throw an error", function() {
            expect(bytesized.bind(null, {})).to.throwError();
        });
    });
});
