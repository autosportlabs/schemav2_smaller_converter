"use strict";

var fs = require("fs");
var through = require("through");
var split = require("split");

fs.createReadStream(process.argv[2])
    .pipe(split())
    .pipe(through(function parseJsonLine(line) {
        if (line.trim().length) {
            this.queue(JSON.parse(line));
        }
    }))
    .pipe(through(function transformRecord(rec) {
        if (rec.s.d) {
            var bitMap = 0;
            var values = [];
            
            for (var i = 0; i < rec.s.d.length; i++) {
                var val = rec.s.d[i];
                
                if (val !== null) {
                    bitMap = (bitMap | (1 << i));
                    values.push(val);
                }
            }
            
            rec = {
                s: {
                    // [bitMap, val1, val2, …]
                    d: [bitMap].concat(values)
                }
            };
        }
        
        this.queue(rec);
    }))
    .pipe(through(function stringifyJson(rec) {
        this.queue(JSON.stringify(rec) + "\n");
    }))
    .pipe(process.stdout);
