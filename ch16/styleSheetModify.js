/**
 * Created by manlier on 2016/9/6.
 */
var ss = document.styleSheets[0];
var rules = ss.cssRules || ss.rules;
for(var i = 0; i < rules.length; i++) {
    var rule = rules[i];
    if(!rule.selectorText) continue; // 跳过@import和非样式规则

    var selector = rule.selectorText;
    var ruleText = rule.style.cssText;

    if(selector == 'h1') {
        if(ss.insertRule) ss.insertRule("h1 {" + ruleText + "}", rules.length);
        else if(ss.addRule) ss.addRule("h2", ruleText, rules.length);
    }

    if(rule.style.textDecoration) {
        if(ss.deleteRule) ss.deleteRule(i);
        else if(ss.removeRule) ss.removeRule(i);
        i--;
    }
}