import { isNumber } from '../utils';

// explanation
// checkout  http://jorendorff.github.io/calc/calculator-parser.js

function Parser() {
    let tokens = [];
    let position = 0;
    return {
        peek: () => {
            return tokens[position];
        },
        consume: () => {
            position++;
        },
        tokenizeExpression: function(str) {
            let res = [];
            let regexp = /([0-9]+|\S)/g;
        
            let token;
        
            while (token = regexp.exec(str)) {
                res.push(token[1]);
            }
        
            return res;
        },
        parsePrimaryExpr: function() {
            var t = this.peek();
            console.log('Log parser before if block',t);

            if (isNumber(t)) {
                this.consume(t);
                return { type: "number", value: t };
            } else if (t === "(") {
                this.consume(t);
                var expr = this.parseExpression();
                if (this.peek() !== ")")
                    throw new SyntaxError("Expected )");
                    this.consume(")");

                return expr;
            } else {
                console.log('Log parser in else block',expr);
                throw new SyntaxError("Expected a number or parentheses");
            }
        },
        parseMulExpr: function() {
            var expr = this.parsePrimaryExpr();
            var t = this.peek();
            while (t === "*" || t === "/") {
                this.consume(t);
                var rhs = this.parsePrimaryExpr();
                expr = { type: t, left: expr, right: rhs };
                t = this.peek();
            }
            return expr;
        },
        parseExpression: function() {
            var expr = this.parseMulExpr();
            var t = this.peek();
            while (t === "+" || t === "-") {
                this.consume(t);
                var rhs = this.parseMulExpr();
                expr = { type: t, left: expr, right: rhs };
                t = this.peek();
            }
            return expr;
        },
        parse: function(str) {
            tokens = this.tokenizeExpression(str);
            return this.parseExpression();
        }
    }

}

export default Parser;
