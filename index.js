const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'));
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));
hljs.registerLanguage('java', require('highlight.js/lib/languages/java'));
hljs.registerLanguage('go', require('highlight.js/lib/languages/go'));
hljs.registerLanguage('rust', require('highlight.js/lib/languages/rust'));
hljs.registerLanguage('yaml', require('highlight.js/lib/languages/yaml'));
const colors = {keyword:'#C4B5FD',literal:'#FDBA74',number:'#FDBA74',string:'#A7F3D0',regexp:'#A7F3D0',comment:'#A9B8CB',doctag:'#A9B8CB',title:'#93C5FD',attr:'#93C5FD',attribute:'#93C5FD',name:'#93C5FD',built_in:'#67E8F9',type:'#67E8F9',variable:'#FDE68A',params:'#EFF6FF',punctuation:'#CBD5E1'};
const escape = value => value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
/** A bounded, deterministic HTML fragment. No CSS stylesheet or browser dependency.
 * Code remains exact; unrecognised languages and oversized input remain plain text.
 */
function highlightCodeHTML(code, language = '') {
  if (typeof code !== 'string') throw new TypeError('Code must be a string');
  if (typeof language !== 'string' || code.length > 20000 || !hljs.getLanguage(language.toLowerCase())) return escape(code);
  try {
    return hljs.highlight(code,{language:language.toLowerCase(),ignoreIllegals:true}).value
      .replace(/<span class="([^"]+)">/g,(_,classes)=>{
        const token=classes.split(/\s+/).find(name=>name.startsWith('hljs-'))?.slice(5);
        return `<span style="color:${colors[token] || '#EFF6FF'}">`;
      });
  } catch { return escape(code); }
}
module.exports = {highlightCodeHTML};
