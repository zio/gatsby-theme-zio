(self.webpackChunkzio_sample_site=self.webpackChunkzio_sample_site||[]).push([[83259],{83259:function(){!function(t){var n=t.util.clone(t.languages.javascript),e="(?:\\{<S>*\\.{3}(?:[^{}]|<BRACES>)*\\})";function a(t,n){return t=t.replace(/<S>/g,(function(){return"(?:\\s|//.*(?!.)|/\\*(?:[^*]|\\*(?!/))\\*/)"})).replace(/<BRACES>/g,(function(){return"(?:\\{(?:\\{(?:\\{[^{}]*\\}|[^{}])*\\}|[^{}])*\\})"})).replace(/<SPREAD>/g,(function(){return e})),RegExp(t,n)}e=a(e).source,t.languages.jsx=t.languages.extend("markup",n),t.languages.jsx.tag.pattern=a("</?(?:[\\w.:-]+(?:<S>+(?:[\\w.:$-]+(?:=(?:\"(?:\\\\[^]|[^\\\\\"])*\"|'(?:\\\\[^]|[^\\\\'])*'|[^\\s{'\"/>=]+|<BRACES>))?|<SPREAD>))*<S>*/?)?>"),t.languages.jsx.tag.inside.tag.pattern=/^<\/?[^\s>\/]*/,t.languages.jsx.tag.inside["attr-value"].pattern=/=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/,t.languages.jsx.tag.inside.tag.inside["class-name"]=/^[A-Z]\w*(?:\.[A-Z]\w*)*$/,t.languages.jsx.tag.inside.comment=n.comment,t.languages.insertBefore("inside","attr-name",{spread:{pattern:a("<SPREAD>"),inside:t.languages.jsx}},t.languages.jsx.tag),t.languages.insertBefore("inside","special-attr",{script:{pattern:a("=<BRACES>"),alias:"language-javascript",inside:{"script-punctuation":{pattern:/^=(?=\{)/,alias:"punctuation"},rest:t.languages.jsx}}},t.languages.jsx.tag);var s=function t(n){return n?"string"==typeof n?n:"string"==typeof n.content?n.content:n.content.map(t).join(""):""},g=function n(e){for(var a=[],g=0;g<e.length;g++){var i=e[g],o=!1;if("string"!=typeof i&&("tag"===i.type&&i.content[0]&&"tag"===i.content[0].type?"</"===i.content[0].content[0].content?a.length>0&&a[a.length-1].tagName===s(i.content[0].content[1])&&a.pop():"/>"===i.content[i.content.length-1].content||a.push({tagName:s(i.content[0].content[1]),openedBraces:0}):a.length>0&&"punctuation"===i.type&&"{"===i.content?a[a.length-1].openedBraces++:a.length>0&&a[a.length-1].openedBraces>0&&"punctuation"===i.type&&"}"===i.content?a[a.length-1].openedBraces--:o=!0),(o||"string"==typeof i)&&a.length>0&&0===a[a.length-1].openedBraces){var c=s(i);g<e.length-1&&("string"==typeof e[g+1]||"plain-text"===e[g+1].type)&&(c+=s(e[g+1]),e.splice(g+1,1)),g>0&&("string"==typeof e[g-1]||"plain-text"===e[g-1].type)&&(c=s(e[g-1])+c,e.splice(g-1,1),g--),e[g]=new t.Token("plain-text",c,null,c)}i.content&&"string"!=typeof i.content&&n(i.content)}};t.hooks.add("after-tokenize",(function(t){"jsx"!==t.language&&"tsx"!==t.language||g(t.tokens)}))}(Prism)}}]);
//# sourceMappingURL=83259-582493162def73b9a977.js.map