import CalculadoraVisitor from "../grammar/CalculadoraVisitor.js";

// This class defines a complete generic visitor for a parse tree produced by CalculadoraParser.

export default class CustomVisitor extends CalculadoraVisitor {
	constructor(variables) {
		super()
		this.variables = variables
	}

	extractId(str) {
		let index = str.indexOf('=')
		return str.slice(0, index)
	}

	// Visit a parse tree produced by CalculadoraParser#file.
	visitFile(ctx) {
		return [this.visitChildren(ctx), this.variables];
	}

	// Visit a parse tree produced by CalculadoraParser#printExpr.
	visitPrintExpr(ctx) {
		return this.visitChildren(ctx);
	}

	// Visit a parse tree produced by CalculadoraParser#assign.
	visitAssign(ctx) {
		let id = this.extractId(ctx.getText())
		let value = this.visitChildren(ctx)[2];
		this.variables[id] = value
		return value;
	}

	// Visit a parse tree produced by CalculadoraParser#timesDiv.
	visitTimesDiv(ctx) {
		const operation_data = this.visitChildren(ctx);
		return ctx.operation.type == ctx.TIMES().symbol.type
			? operation_data[0] * operation_data[2]
			: operation_data[0] / operation_data[2];
	}

	// Visit a parse tree produced by CalculadoraParser#plusSubtraction.
	visitPlusSubtraction(ctx) {
		const operation_data = this.visitChildren(ctx);
		return ctx.operation.type == ctx.PLUS().symbol.type
			? operation_data[0] + operation_data[2]
			: operation_data[0] - operation_data[2];
	}

	// Visit a parse tree produced by CalculadoraParser#implicitMultExpr.
	visitImplicitMultExpr(ctx) {
		let results = this.visitChildren(ctx);
		return results[0] * results[1];
	}

	// Visit a parse tree produced by CalculadoraParser#parentheses.
	visitParentheses(ctx) {
		let visit = this.visitChildren(ctx);
		return visit[1];
	}

	// Visit a parse tree produced by CalculadoraParser#number.
	visitNumber(ctx) {
		return Number(ctx.getText());
	}

	// Visit a parse tree produced by CalculadoraParser#id.
	visitId(ctx) {
		let key = ctx.getText()
		return (key in this.variables) ? this.variables[key] : 0;
	}
}
