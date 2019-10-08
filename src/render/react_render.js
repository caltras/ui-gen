const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const routeTemplate = fs.readFileSync(path.join(__dirname, '../assets/template/react/routes.js.tpl'),'utf8');

module.exports = (metadata, templates, type, persist=true) =>{
    const domains = Object.keys(templates)
    const routes = [];
    const imports = [];
    const mapTemplates = {};
    domains.forEach ( (d) => {
        const pages = Object.keys(templates[d]);
        //user
        pages.forEach( (k) => {
            const page = templates[d][k];

            mapTemplates[`templates/${type}/${d}/${k}.js`] = page;

            if (persist){
                // create, update, list
                if (!fs.existsSync(path.join(__dirname,'../..',`target/templates`))){
                    fs.mkdirSync(path.join(__dirname,'../..',`target/templates`));
                }
                if (!fs.existsSync(path.join(__dirname,'../..',`target/templates/${type}`))){
                    fs.mkdirSync(path.join(__dirname,'../..',`target/templates/${type}`));
                }
                
                if (!fs.existsSync(path.join(__dirname,'../..',`target/templates/${type}/${d}`))){
                    fs.mkdirSync(path.join(__dirname,'../..',`target/templates/${type}/${d}`));
                }

                fs.writeFileSync(path.join(__dirname,'../..',`target/templates/${type}/${d}/${d}.${k}.js`), 
                                mapTemplates[`templates/${type}/${d}/${k}.js`],
                                'utf8');
                // import Home from '../components/home';
                imports.push(`import ${_.capitalize(d)}${_.capitalize(k)} from '../${d}/${d}.${k}';`);
                routes.push(`<Route exact={true} path="/${d}/${k}" component={${_.capitalize(d)}${_.capitalize(k)}}/>`)
            }
            
        });
    });
    if (!fs.existsSync(path.join(__dirname,'../..',`target/templates/${type}/routes`))){
        fs.mkdirSync(path.join(__dirname,'../..',`target/templates/${type}/routes`));
    }
    fs.writeFileSync(path.join(__dirname,'../..',`target/templates/${type}/routes/routes.js`), 
                            routeTemplate.format('routes', routes.join('\n        ')).format('imports', imports.join(`\n`)),
                            'utf8');
    fs.copyFileSync(path.join(__dirname, `../assets/template/${type}/app.js.tpl`),path.join(__dirname,'../..',`target/templates/${type}/app.js`));


    return mapTemplates;
}