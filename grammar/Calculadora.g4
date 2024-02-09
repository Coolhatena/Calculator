grammar Calculadora;
import CommonLexerRules;

file: stat+;         

stat: expr			#printExpr
	| ID '=' expr 	#assign
	;

expr: 	
		'('expr')'                        		#parentheses
    	| expr expr								#implicitMultExpr
		// Operation es un atributo
		| expr operation=(TIMES|DIV) expr     	#timesDiv
        | expr operation=(PLUS|MINUS) expr    	#plusSubtraction
        | INT              						#number
		| ID									#id
        ;

PLUS    :   '+';
MINUS   :   '-';
TIMES   :   '*';
DIV     :   '/';