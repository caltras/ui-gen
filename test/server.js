/*var http = require('http');
var mockserver = require('mockserver');
 
http.createServer(mockserver(__dirname+'/mocks')).listen(8000);
*/
const uuid = require('uuid/v1');
const fs = require('fs');
const express = require('express')();
var bodyParser = require('body-parser'); 
var cors = require('cors');
var whitelist = ['http://localhost:3000', 'http://localhost:8000']
var corsOptions = {
  origin: function (origin, callback) {
    if (origin){
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }else{
        callback(null, true);
    }
  }
}

express.use(cors(corsOptions));

const app  = () => {
    this.routes = {};
    this.db = {};
    this.load  = (pathRef, parent={}) => {
        const directories = fs.readdirSync(pathRef, 'utf8');

        directories.forEach( d => {
            const lstat = fs.lstatSync(pathRef+'/'+d);
            if (lstat.isDirectory() ) {
                parent[d] = {};
                this.load(pathRef+'/'+d, parent[d]);
            } else {
                if (lstat.isFile() && d.indexOf('.json') > -1 ) {
                    try {
                        this.db[d.replace('.json', '')] = JSON.parse(fs.readFileSync(pathRef+'/'+d, 'utf8'));
                    }catch(e){
                        this.db[d.replace('.json', '')] = [];
                    }
                }
            }
        });
        return parent;
    }
    this.$get = (domain, isRoot=false)=>{
        return (req, resp) => {
            if( isRoot){
                resp.status(200);
                resp.send('API');
            } else {
                if (this.db[domain]){
                    if (req.params.id){
                        resp.status(200);
                        resp.json(this.db[domain].find( v => v.id == req.params.id));
                    } else {
                        resp.status(200);
                        resp.json(this.db[domain]);
                    }
                } else{
                    resp.status(400);
                    resp.send();
                }
            }
        };
    }
    this.$post = (domain)=>{
        return (req, resp) => {
            const body = req.body;
            if (this.db[domain]){
                const idx = this.db[domain].findIndex (obj => {
                    return obj.id = body.id;
                });
                if (idx > -1) {
                    this.db[domain][idx] = body;
                    resp.status(200);
                    resp.json(this.db[domain][idx]);
                } else {
                    resp.status(400);
                    resp.send();
                }
            } else{
                resp.status(500)
                resp.send('Domain not found');
            }
        };
    }
    this.$put = (domain)=>{
        const self = this;
        return (req, resp) => {
            const body = req.body;
            if (this.db[domain]){

                body.id = uuid();
                self.db[domain].push(body);
                resp.status(200);
                resp.json(self.db[domain][body.id]);
            
            } else {
                resp.status(500)
                resp.send('Domain not found');
            }
        };
    }
    this.$delete = (domain)=>{
        return (req, resp) => {
            const id = req.params.id;
            if (this.db[domain]){
                this.db[domain] = this.db[domain].filter( (obj) => {
                    return obj.id != id;
                });
                resp.status(200);
                resp.send();
            
            } else {
                resp.status(500)
                resp.send('Domain not found');
            }
        };
    }
    this.createRoutes = (ref, key, prefix='', isRoot=false)=>{
        express.get(prefix+'/'+key, this.$get(key, isRoot));
        if (!isRoot){
            express.get(prefix+'/'+key+'/:id', this.$get(key));
            express.post(prefix+'/'+key, this.$post(key));
            express.delete(prefix+'/'+key+'/:id', this.$delete(key));
            express.put(prefix+'/'+key, this.$put(key));
        }
        if (ref[key]){
            Object.keys(ref[key]).forEach( (r) => {
                this.createRoutes(ref[key], r, prefix+'/'+key);
            });
        }
    }

    this.run =  () => {
        this.routes = this.load(__dirname+'/mocks');
        express.use( bodyParser.json());       // to support JSON-encoded bodies
        express.use(bodyParser.urlencoded({     // to support URL-encoded bodies
            extended: false
        }));

        Object.keys(this.routes).forEach( (r) => {
            this.createRoutes(this.routes, r, '', true);
        });
        
        
        express.listen(8000);
    }
    return this;
}

app().run();