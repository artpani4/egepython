var Module=typeof pyodide._module!=="undefined"?pyodide._module:{};if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH;if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}else{throw"using preloaded data can only be done on a web page or in a web worker"}var PACKAGE_NAME="xlrd.data";var REMOTE_PACKAGE_BASE="xlrd.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata["remote_package_size"];var PACKAGE_UUID=metadata["package_uuid"];function fetchRemotePackage(packageName,packageSize,callback,errback){var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.8",true,true);Module["FS_createPath"]("/lib/python3.8","site-packages",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages","xlrd",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages","xlrd-2.0.1-py3.8.egg-info",true,true);Module["FS_createPath"]("/","bin",true,true);function processPackageData(arrayBuffer){assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:204316,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,1428,2723,4175,5472,6848,8160,9328,10491,12005,13581,14552,16032,17189,18304,19639,20819,22291,23560,24787,25863,26967,28142,29239,30351,31571,32648,33759,34907,35939,37151,38211,39306,40370,41506,42676,43502,44578,45697,46915,48182,49482,50717,51892,52911,53953,55193,56023,57202,58327,59401,60696,61791,63052,64380,65405,66726,67938,69228,70457,71645,72952,74311,75496,76497,77513,78431,79629,80813,81493,82737,83764,85069,86446,87349,88489,89200,89942,90700,91501,92206,92912,93711,94761,95634,96367,97467,98972,100328,101577,102774,103759,104507,105310,106364,107386,108316,109366,110250,111155,112084,113091,114323,115425,116432,116964,118035,119122,120203,121038,121990,122876,123906,125127,125858,126814,127726,128941,130134,131527,132991,134062,135390,136365,137599,138600,139765,140876,141681,142593,143650,144531,145605,146662,147630,148582,149401,150485,151401,152470,153503,154544,155535,156482,157455,158280,159277,160364,161175,161958,162892,163665,164861,166055,167166,168292,169419,170580,171605,172597,173808,174977,176157,177428,178741,179993,181283,182680,183765,184972,186212,187305,188749,190073,191355,192502,193739,195008,196455,197541,198753,199859,200944,201978,203048,203999],sizes:[1428,1295,1452,1297,1376,1312,1168,1163,1514,1576,971,1480,1157,1115,1335,1180,1472,1269,1227,1076,1104,1175,1097,1112,1220,1077,1111,1148,1032,1212,1060,1095,1064,1136,1170,826,1076,1119,1218,1267,1300,1235,1175,1019,1042,1240,830,1179,1125,1074,1295,1095,1261,1328,1025,1321,1212,1290,1229,1188,1307,1359,1185,1001,1016,918,1198,1184,680,1244,1027,1305,1377,903,1140,711,742,758,801,705,706,799,1050,873,733,1100,1505,1356,1249,1197,985,748,803,1054,1022,930,1050,884,905,929,1007,1232,1102,1007,532,1071,1087,1081,835,952,886,1030,1221,731,956,912,1215,1193,1393,1464,1071,1328,975,1234,1001,1165,1111,805,912,1057,881,1074,1057,968,952,819,1084,916,1069,1033,1041,991,947,973,825,997,1087,811,783,934,773,1196,1194,1111,1126,1127,1161,1025,992,1211,1169,1180,1271,1313,1252,1290,1397,1085,1207,1240,1093,1444,1324,1282,1147,1237,1269,1447,1086,1212,1106,1085,1034,1070,951,317],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};compressedData["data"]=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData},true);Module["removeRunDependency"]("datafile_xlrd.data")}Module["addRunDependency"]("datafile_xlrd.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/lib/python3.8/site-packages/xlrd/__init__.py",start:0,end:7320,audio:0},{filename:"/lib/python3.8/site-packages/xlrd/biffh.py",start:7320,end:23971,audio:0},{filename:"/lib/python3.8/site-packages/xlrd/book.py",start:23971,end:81498,audio:0},{filename:"/lib/python3.8/site-packages/xlrd/compdoc.py",start:81498,end:102589,audio:0},{filename:"/lib/python3.8/site-packages/xlrd/formatting.py",start:102589,end:148162,audio:0},{filename:"/lib/python3.8/site-packages/xlrd/formula.py",start:148162,end:242617,audio:0},{filename:"/lib/python3.8/site-packages/xlrd/info.py",start:242617,end:242653,audio:0},{filename:"/lib/python3.8/site-packages/xlrd/sheet.py",start:242653,end:349459,audio:0},{filename:"/lib/python3.8/site-packages/xlrd/timemachine.py",start:349459,end:351216,audio:0},{filename:"/lib/python3.8/site-packages/xlrd/xldate.py",start:351216,end:359150,audio:0},{filename:"/lib/python3.8/site-packages/xlrd-2.0.1-py3.8.egg-info/PKG-INFO",start:359150,end:362848,audio:0},{filename:"/lib/python3.8/site-packages/xlrd-2.0.1-py3.8.egg-info/SOURCES.txt",start:362848,end:363226,audio:0},{filename:"/lib/python3.8/site-packages/xlrd-2.0.1-py3.8.egg-info/dependency_links.txt",start:363226,end:363227,audio:0},{filename:"/lib/python3.8/site-packages/xlrd-2.0.1-py3.8.egg-info/requires.txt",start:363227,end:363289,audio:0},{filename:"/lib/python3.8/site-packages/xlrd-2.0.1-py3.8.egg-info/top_level.txt",start:363289,end:363294,audio:0},{filename:"/bin/runxlrd.py",start:363294,end:379370,audio:0}],remote_package_size:208412,package_uuid:"0cb93492-0f95-4367-aabe-0eb09ac61471"})})();