var template = `
    <ul>
        <% for(var i=0; i< data.supplies.length;i++) { %>
            <li><%= data.supplies[i] %></li>
        <% } %>
    </ul>
`;

var parseStr = compile(template);  // this is parse function in string
var parse = eval(parseStr);  // this is parse function
//(function parse(data) {
//    var output = "";
//
//    function echo(html) {
//        output += html;
//    }
//
//    echo(`
//        <ul>
//            `);  for(var i=0; i< data.supplies.length;i++) {
//     echo(`
//                <li>`);
//     echo(  data.supplies[i]  );
//     echo(`</li>
//            `);  }
//     echo(`
//        </ul>
//    `)
//
//    return output;
//})
var container = document.getElementById('container');
container.innerHTML = parse({ supplies: ["broom", "mop", "cleaner"] });

function compile(template) {
    // put everything outside of JS code into echo
    var evalExpr = /<%=(.+?)%>/g;
    var expr = /<%([\s\S]+?)%>/g;

    template = template
        .replace(evalExpr, '`); \n echo( $1 ); \n echo(`')
        .replace(expr, '`); $1 \n echo(`');

    template = 'echo(`' + template + '`)';


    var script =
    `(function parse(data) {
        var output = "";

        function echo(html) {
            output += html;
        }

        ${ template }

        return output;
    })`;

    return script;
}