(self.webpackChunkzio_sample_site=self.webpackChunkzio_sample_site||[]).push([[76524],{76524:function(){!function(e){function n(e,n){return e.replace(/<<(\d+)>>/g,(function(e,r){return"(?:"+n[+r]+")"}))}function r(e,r,a){return RegExp(n(e,r),a||"")}var a=RegExp("\\b(?:"+("Adj BigInt Bool Ctl Double false Int One Pauli PauliI PauliX PauliY PauliZ Qubit Range Result String true Unit Zero"+" "+"Adjoint adjoint apply as auto body borrow borrowing Controlled controlled distribute elif else fail fixup for function if in internal intrinsic invert is let mutable namespace new newtype open operation repeat return self set until use using while within").trim().replace(/ /g,"|")+")\\b"),i=n(/<<0>>(?:\s*\.\s*<<0>>)*/.source,[/\b[A-Za-z_]\w*\b/.source]),t={keyword:a,punctuation:/[<>()?,.:[\]]/},s=/"(?:\\.|[^\\"])*"/.source;e.languages.qsharp=e.languages.extend("clike",{comment:/\/\/.*/,string:[{pattern:r(/(^|[^$\\])<<0>>/.source,[s]),lookbehind:!0,greedy:!0}],"class-name":[{pattern:r(/(\b(?:as|open)\s+)<<0>>(?=\s*(?:;|as\b))/.source,[i]),lookbehind:!0,inside:t},{pattern:r(/(\bnamespace\s+)<<0>>(?=\s*\{)/.source,[i]),lookbehind:!0,inside:t}],keyword:a,number:/(?:\b0(?:x[\da-f]+|b[01]+|o[0-7]+)|(?:\B\.\d+|\b\d+(?:\.\d*)?)(?:e[-+]?\d+)?)l?\b/i,operator:/\band=|\bor=|\band\b|\bnot\b|\bor\b|<[-=]|[-=]>|>>>=?|<<<=?|\^\^\^=?|\|\|\|=?|&&&=?|w\/=?|~~~|[*\/+\-^=!%]=?/,punctuation:/::|[{}[\];(),.:]/}),e.languages.insertBefore("qsharp","number",{range:{pattern:/\.\./,alias:"operator"}});var o=function(e,n){for(var r=0;r<n;r++)e=e.replace(/<<self>>/g,(function(){return"(?:"+e+")"}));return e.replace(/<<self>>/g,"[^\\s\\S]")}(n(/\{(?:[^"{}]|<<0>>|<<self>>)*\}/.source,[s]),2);e.languages.insertBefore("qsharp","string",{"interpolation-string":{pattern:r(/\$"(?:\\.|<<0>>|[^\\"{])*"/.source,[o]),greedy:!0,inside:{interpolation:{pattern:r(/((?:^|[^\\])(?:\\\\)*)<<0>>/.source,[o]),lookbehind:!0,inside:{punctuation:/^\{|\}$/,expression:{pattern:/[\s\S]+/,alias:"language-qsharp",inside:e.languages.qsharp}}},string:/[\s\S]+/}}})}(Prism),Prism.languages.qs=Prism.languages.qsharp}}]);
//# sourceMappingURL=76524-09a4511d519e35cf3af6.js.map