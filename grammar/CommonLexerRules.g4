lexer grammar CommonLexerRules;

ID 	: [A-Za-z]+ ;
INT : [0-9]+ ;
NEWLINE : '\r'? '\n' ;
SPACES  :   [ \t\r\n]+ -> skip ;