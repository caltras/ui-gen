const fs = require("fs-extra");
const path = require('path');
const _ = require('lodash');
const routeTemplate = fs.readFileSync(path.join(__dirname, '../assets/template/react/routes.js.tpl'),'utf8');
const app = fs.readFileSync(path.join(__dirname, `../assets/template/react/app.js.tpl`), 'utf8');

const createSrcFolder = (type) =>{
    if (!fs.existsSync(path.join(__dirname,'../..',`target/templates/${type}`))){
        fs.mkdirSync(path.join(__dirname,'../..',`target/templates/${type}`));
    }
    if (!fs.existsSync(path.join(__dirname,'../..',`target/templates/${type}/src`))){
        fs.mkdirSync(path.join(__dirname,'../..',`target/templates/${type}/src`));
    }
}
module.exports = (projectName, metadata, templates, type, persist=true) =>{
    const packageJSON = fs.readFileSync(path.join(__dirname, `../assets/template/${type}/package.json.tpl`), 'utf8');
    const domains = Object.keys(templates)
    const routesTemplates = [];
    const imports = [];
    const mapTemplates = {};
    const routes = {};
    
    createSrcFolder(type);

    domains.forEach ( (d) => {
        const pages = Object.keys(templates[d]);
        //user
        pages.forEach( (k) => {
            const page = templates[d][k];

            mapTemplates[`templates/${type}/${d}/${k}.js`] = page;
            // import Home from '../components/home';
            imports.push(`import ${_.capitalize(d)}${_.capitalize(k)} from '../${d}/${d}.${k}';`);
            routesTemplates.push(`<Route exact={true} path="/${d}/${k}" component={${_.capitalize(d)}${_.capitalize(k)}}/>`)
            if ( !routes[d] ){
                routes[d] = [];
            }
            routes[d].push(k);

            if (persist){
                // create, update, list
                if (!fs.existsSync(path.join(__dirname,'../..',`target/templates/${type}/src`))){
                    fs.mkdirSync(path.join(__dirname,'../..',`target/templates/${type}/src`));
                }
                
                if (!fs.existsSync(path.join(__dirname,'../..',`target/templates/${type}/src/${d}`))){
                    fs.mkdirSync(path.join(__dirname,'../..',`target/templates/${type}/src/${d}`));
                }

                fs.writeFileSync(path.join(__dirname,'../..',`target/templates/${type}/src/${d}/${d}.${k}.js`), 
                                mapTemplates[`templates/${type}/${d}/${k}.js`],
                                'utf8');
                
            }
            
        });
    });

    const actions = Object.keys(routes).map( (domain) => {
        return `<ul>${_.capitalize(domain)}
            ${routes[domain].map ( action => {
                return `<li>
                            <Link to="/${domain}/${action}">${_.capitalize(action)}</Link>
                        </li>`;
            }).join('\n')}
        </ul>`
    } );
    if (persist) {
        if (!fs.existsSync(path.join(__dirname,'../..',`target/templates/${type}/src/routes`))){
            fs.mkdirSync(path.join(__dirname,'../..',`target/templates/${type}/src/routes`));
        }
        fs.writeFileSync(path.join(__dirname,'../..',`target/templates/${type}/src/routes/routes.js`), 
                                routeTemplate
                                    .format('routes', routesTemplates.join('\n        '))
                                    .format('imports', imports.join(`\n`))
                                    .format('actions', actions.join('\n')),
                                'utf8');
                                    
        fs.writeFileSync(path.join(__dirname,'../..',`target/templates/${type}/package.json`), 
                            packageJSON.format('project', _.kebabCase(projectName)), 
                            'utf8');
        
        fs.copySync(path.join(__dirname, `../assets/template/${type}/app.js.tpl`), path.join(__dirname,'../..',`target/templates/${type}/src/index.js`));
        

        fs.copyFileSync(path.join(__dirname, `../assets/template/${type}/style.css`),path.join(__dirname,'../..',`target/templates/${type}/src/style.css`));
        
        fs.copySync(path.join(__dirname, `../assets/template/${type}/public`), path.join(__dirname,'../..',`target/templates/${type}/public`));
        fs.copySync(path.join(__dirname, `../assets/template/${type}/locales`), path.join(__dirname,'../..',`target/templates/${type}/src/locales`));
    }

    return mapTemplates;
}