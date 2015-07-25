var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var mongoose = require('mongoose');
var models = require('../models/Dashboard.js');
var Dashboard = models.Dashboard;
var EnvSchema = models.EnvSchema;


/* GET users listing. */
router.get('/', function(req, res, next) {
  Dashboard.find(function (err, dashboards) {
    if (err) return next(err);
    res.json(dashboards);
  });
});

/* GET /dashboardRoutes/id */
router.get('/:id', function(req, res, next) {
  Dashboard.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /dashboardRoutes/id */
router.get('/child/:id', function(req, res, next) {
  
  Dashboard.find({'envDetails._id': req.params.id}, function (err, dashboards) {
  	var subdoc = dashboards[0].envDetails.id(req.params.id);
  	//console.log(post[0]._id);
    if (err) return next(err);
    res.json(subdoc);
  });
});

/* DELETE /todos/:id */
router.delete('/:id', function(req, res, next) {
  Dashboard.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


/*
=====================
CHROME POSTMAN CONFIGUARATION:
HEADER
    Content-Type = applicaion/json
POST BODY
    RAW and JSON
=====================

*********=====================*********
             EXAMPLE JSON:
*********=====================*********

{"dashboard":
    {"envName":"PRD", "envDetails": [
        {       
                "hostnme": "dohqdcro01-PRD",
                "ip": "10.21.31.61",
                "cpu":"-------",
                "memory":"-------",
                "disk":"-------",
                "downtime": "10:30 to 10:45",
                "version": "Linux version 2.6.32-504.8.1.el6.x86_64 (mockbuild@x86-002.build.bos.redhat.com) (gcc version 4.4.7 20120313 (Red Hat 4.4.7-9) (GCC) ) #1 SMP Fri Dec 19 12:09:25 EST 2014",
                "hostDetails":
                [
                    {
                        "hostHdrName":"tomcat",
                        "hostDetails":
                        [
                            {"hostname": "FLT", "status": "UP", "path": "/softwares/jboss/ews2.0/tomcat7/AS_UAT_FLT", "host": "dohqdcro01", "port": "1112"},
                            {"hostname": "SHP", "status": "DOWN", "path": "/softwares/jboss/ews2.0/tomcat7/AS_UAT_FLT", "host": "dohqdcro01", "port": "1112"},
                            {"hostname": "CGH", "status": "UP", "path": "/softwares/jboss/ews2.0/tomcat7/AS_UAT_FLT", "host": "dohqdcro01", "port": "1112"},
                            {"hostname": "EIX", "status": "UP", "path": "/softwares/jboss/ews2.0/tomcat7/AS_UAT_FLT", "host": "dohqdcro01", "port": "1112"}
                        ]  
                    },
                    {
                        "hostHdrName":"database",
                        "hostDetails":
                        [
                            {"hostname": "1qdcro01", "status": "UP", "path": "/softwares/jboss/ews2.0/tomcat7/AS_UAT_FLT", "host": "dohqdcro01", "port": "1112"}
                        ]  
                    },
                    {
                        "hostHdrName":"infinispan",
                        "hostDetails":
                        [
                            {"hostname": "infinispan", "status": "UP", "path": "/softwares/jboss/ews2.0/tomcat7/AS_UAT_FLT", "host": "dohqdcro01", "port": "1112"}
                        ]  
                    },
                    {
                        "hostHdrName":"httpd",
                        "hostDetails":
                        [
                            {"hostname": "httpd", "status": "UP", "path": "/softwares/jboss/ews2.0/tomcat7/AS_UAT_FLT", "host": "dohqdcro01", "port": "1112"}
                        ]  
                    },
                    {
                        "hostHdrName":"zookeeper",
                        "hostDetails":
                        [
                            {"hostname": "zookeeper", "status": "UP", "path": "/softwares/jboss/ews2.0/tomcat7/AS_UAT_FLT", "host": "dohqdcro01", "port": "1112"}
                        ]  
                    },
                    {
                        "hostHdrName":"msgBroker",
                        "hostDetails":
                        [
                            {"hostname": "msgBroker", "status": "UP", "path": "/softwares/jboss/ews2.0/tomcat7/AS_UAT_FLT", "host": "dohqdcro01", "port": "1112"}
                        ]  
                    }

                ],
                "keyValues": [{"keyHdrName":"Logs", "keyValueData":[{"key":"FLT","value":"/softwares/logs/AS_UAT_FLT"},
                                                                    {"key":"SHP","value":"/softwares/logs/AS_UAT_SHP"},
                                                                    {"key":"CGH","value":"/softwares/logs/AS_UAT_CGH"},
                                                                    {"key":"EIX","value":"/softwares/logs/AS_UAT_EIX"},
                                                                    {"key":"Infinispan","value":"/softwares/logs/infinispan"}
                                                                    ]},
                            {"keyHdrName":"MEMORY INFO", "keyValueData":[
                                                                    {"key":"MemTotal","value":"11160644 KB"},
                                                                    {"key":"MemFree","value":"141164 KB"},
                                                                    {"key":"Buffers","value":"21132 KB"},
                                                                    {"key":"cc","value":"bb"},
                                                                    {"key":"cc","value":"bb"},
                                                                    {"key":"cc","value":"bb"},
                                                                    {"key":"cc","value":"bb"}
                                                                    ]},
                            {"keyHdrName":"CPU INFO", "keyValueData":[
                                                                    {"key":"MemTotal","value":"11160644 KB"},
                                                                    {"key":"MemFree","value":"141164 KB"},
                                                                    {"key":"Buffers","value":"21132 KB"},
                                                                    {"key":"cc","value":"bb"},
                                                                    {"key":"cc","value":"bb"},
                                                                    {"key":"cc","value":"bb"},
                                                                    {"key":"cc","value":"bb"}
                                                                    ]},
                            {"keyHdrName":"DISK", "keyValueData":[
                                                                    {"key":"MemTotal","value":"11160644 KB"},
                                                                    {"key":"MemFree","value":"141164 KB"},
                                                                    {"key":"Buffers","value":"21132 KB"},
                                                                    {"key":"cc","value":"bb"},
                                                                    {"key":"cc","value":"bb"},
                                                                    {"key":"cc","value":"bb"},
                                                                    {"key":"cc","value":"bb"}
                                                                    ]}
                                                                    
                            ],
                "activities":{"recent": [{"keyHdrName":"Recent", "keyValueData":[{"key":"FLT","value":"/softwares/logs/AS_UAT_FLT"},
                                                                    {"key":"SHP","value":"/softwares/logs/AS_UAT_SHP"},
                                                                    {"key":"CGH","value":"/softwares/logs/AS_UAT_CGH"},
                                                                    {"key":"EIX","value":"/softwares/logs/AS_UAT_EIX"},
                                                                    {"key":"Infinispan","value":"/softwares/logs/infinispan"}
                                                                    ]}],
                            "planned": [{"keyHdrName":"Planned", "keyValueData":[{"key":"FLT","value":"/softwares/logs/AS_UAT_FLT"},
                                                                    {"key":"SHP","value":"/softwares/logs/AS_UAT_SHP"},
                                                                    {"key":"CGH","value":"/softwares/logs/AS_UAT_CGH"},
                                                                    {"key":"EIX","value":"/softwares/logs/AS_UAT_EIX"},
                                                                    {"key":"Infinispan","value":"/softwares/logs/infinispan"}
                                                                    ]}]
                            }
        },
        {       
                "hostnme": "dohqdcro02-PRD",
                "ip": "10.21.31.61",
                "cpu":"-------",
                "memory":"-------",
                "disk":"-------",
                "downtime": "10:30 to 10:45",
                "version": "Linux version 2.6.32-504.8.1.el6.x86_64 (mockbuild@x86-002.build.bos.redhat.com) (gcc version 4.4.7 20120313 (Red Hat 4.4.7-9) (GCC) ) #1 SMP Fri Dec 19 12:09:25 EST 2014",
                "hostDetails":
                [
                    {
                        "hostHdrName":"tomcat",
                        "hostDetails":
                        [
                            {"hostname": "FLT", "status": "UP", "path": "/softwares/jboss/ews2.0/tomcat7/AS_UAT_FLT", "host": "dohqdcro01", "port": "1112"},
                            {"hostname": "SHP", "status": "DOWN", "path": "/softwares/jboss/ews2.0/tomcat7/AS_UAT_FLT", "host": "dohqdcro01", "port": "1112"},
                            {"hostname": "CGH", "status": "UP", "path": "/softwares/jboss/ews2.0/tomcat7/AS_UAT_FLT", "host": "dohqdcro01", "port": "1112"},
                            {"hostname": "EIX", "status": "UP", "path": "/softwares/jboss/ews2.0/tomcat7/AS_UAT_FLT", "host": "dohqdcro01", "port": "1112"}
                        ]  
                    },
                    {
                        "hostHdrName":"database",
                        "hostDetails":
                        [
                            {"hostname": "1qdcro01", "status": "UP", "path": "/softwares/jboss/ews2.0/tomcat7/AS_UAT_FLT", "host": "dohqdcro01", "port": "1112"}
                        ]  
                    },
                    {
                        "hostHdrName":"infinispan",
                        "hostDetails":
                        [
                            {"hostname": "infinispan", "status": "UP", "path": "/softwares/jboss/ews2.0/tomcat7/AS_UAT_FLT", "host": "dohqdcro01", "port": "1112"}
                        ]  
                    },
                    {
                        "hostHdrName":"httpd",
                        "hostDetails":
                        [
                            {"hostname": "httpd", "status": "UP", "path": "/softwares/jboss/ews2.0/tomcat7/AS_UAT_FLT", "host": "dohqdcro01", "port": "1112"}
                        ]  
                    },
                    {
                        "hostHdrName":"zookeeper",
                        "hostDetails":
                        [
                            {"hostname": "zookeeper", "status": "UP", "path": "/softwares/jboss/ews2.0/tomcat7/AS_UAT_FLT", "host": "dohqdcro01", "port": "1112"}
                        ]  
                    },
                    {
                        "hostHdrName":"msgBroker",
                        "hostDetails":
                        [
                            {"hostname": "msgBroker", "status": "UP", "path": "/softwares/jboss/ews2.0/tomcat7/AS_UAT_FLT", "host": "dohqdcro01", "port": "1112"}
                        ]  
                    }

                ],
                "keyValues": [{"keyHdrName":"Logs", "keyValueData":[{"key":"FLT","value":"/softwares/logs/AS_UAT_FLT"},
                                                                    {"key":"SHP","value":"/softwares/logs/AS_UAT_SHP"},
                                                                    {"key":"CGH","value":"/softwares/logs/AS_UAT_CGH"},
                                                                    {"key":"EIX","value":"/softwares/logs/AS_UAT_EIX"},
                                                                    {"key":"Infinispan","value":"/softwares/logs/infinispan"}
                                                                    ]},
                            {"keyHdrName":"MEMORY INFO", "keyValueData":[
                                                                    {"key":"MemTotal","value":"11160644 KB"},
                                                                    {"key":"MemFree","value":"141164 KB"},
                                                                    {"key":"Buffers","value":"21132 KB"},
                                                                    {"key":"cc","value":"bb"},
                                                                    {"key":"cc","value":"bb"},
                                                                    {"key":"cc","value":"bb"},
                                                                    {"key":"cc","value":"bb"}
                                                                    ]},
                            {"keyHdrName":"CPU INFO", "keyValueData":[
                                                                    {"key":"MemTotal","value":"11160644 KB"},
                                                                    {"key":"MemFree","value":"141164 KB"},
                                                                    {"key":"Buffers","value":"21132 KB"},
                                                                    {"key":"cc","value":"bb"},
                                                                    {"key":"cc","value":"bb"},
                                                                    {"key":"cc","value":"bb"},
                                                                    {"key":"cc","value":"bb"}
                                                                    ]},
                            {"keyHdrName":"DISK", "keyValueData":[
                                                                    {"key":"MemTotal","value":"11160644 KB"},
                                                                    {"key":"MemFree","value":"141164 KB"},
                                                                    {"key":"Buffers","value":"21132 KB"},
                                                                    {"key":"cc","value":"bb"},
                                                                    {"key":"cc","value":"bb"},
                                                                    {"key":"cc","value":"bb"},
                                                                    {"key":"cc","value":"bb"}
                                                                    ]}
                                                                    
                            ],
                "activities":{"recent": [{"keyHdrName":"Recent", "keyValueData":[{"key":"FLT","value":"/softwares/logs/AS_UAT_FLT"},
                                                                    {"key":"SHP","value":"/softwares/logs/AS_UAT_SHP"},
                                                                    {"key":"CGH","value":"/softwares/logs/AS_UAT_CGH"},
                                                                    {"key":"EIX","value":"/softwares/logs/AS_UAT_EIX"},
                                                                    {"key":"Infinispan","value":"/softwares/logs/infinispan"}
                                                                    ]}],
                            "planned": [{"keyHdrName":"Planned", "keyValueData":[{"key":"FLT","value":"/softwares/logs/AS_UAT_FLT"},
                                                                    {"key":"SHP","value":"/softwares/logs/AS_UAT_SHP"},
                                                                    {"key":"CGH","value":"/softwares/logs/AS_UAT_CGH"},
                                                                    {"key":"EIX","value":"/softwares/logs/AS_UAT_EIX"},
                                                                    {"key":"Infinispan","value":"/softwares/logs/infinispan"}
                                                                    ]}]
                            }
        }
    ]}
}

*/
/* POST /dashboard */
router.post('/', function(req, res, next) {
    var dashboard = new Dashboard(req.body.dashboard);
    dashboard.save(function(err){
    if(err)
         return next(err);
    else
         res.json(dashboard);
});
});


module.exports = router;
