var Module=typeof pyodide._module!=="undefined"?pyodide._module:{};if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH;if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}else{throw"using preloaded data can only be done on a web page or in a web worker"}var PACKAGE_NAME="optlang.data";var REMOTE_PACKAGE_BASE="optlang.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata["remote_package_size"];var PACKAGE_UUID=metadata["package_uuid"];function fetchRemotePackage(packageName,packageSize,callback,errback){var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.8",true,true);Module["FS_createPath"]("/lib/python3.8","site-packages",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages","optlang",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages/optlang","tests",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages/optlang/tests","data",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages","optlang-1.5.1-py3.8.egg-info",true,true);function processPackageData(arrayBuffer){assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:299365,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,1125,2498,3795,4788,5800,6804,7927,8874,10232,11321,11992,13067,14100,15005,16001,17153,18613,19774,20686,21749,22946,23551,24751,25744,26779,27669,28762,29801,30876,31563,32585,33436,34412,35328,36436,37490,38362,39435,40398,41578,43068,44256,45147,46429,47775,48796,49922,51346,52449,53765,55238,56434,57545,58478,59507,60606,61562,62675,63449,64556,65534,66761,67716,68641,69645,70464,71344,72829,73887,74801,75806,76820,77712,78747,79698,80687,81436,82328,83288,84428,85415,86511,87888,88811,89550,90347,91428,92492,93915,95385,96331,97508,98306,99334,100499,101656,102739,103585,104702,105833,106940,107905,108966,110215,111378,112663,113843,115024,116126,117141,118216,118830,119931,120848,121833,122787,123758,124880,126386,127467,128401,129468,130150,131154,132075,133034,133962,134995,135913,136847,137771,138603,139585,140576,141952,143187,144195,145035,146191,147222,148205,149032,149988,150960,152030,152826,154192,155471,156609,158025,158990,160091,161169,162334,163877,165079,166057,166841,167729,168685,169483,170251,171100,171767,172508,173179,174076,174891,175707,176284,177014,177777,178486,179355,180589,181262,182406,183255,184184,185189,186113,187015,187846,188684,189284,190170,191035,191914,193119,194322,195411,196142,196718,197451,198609,199708,200701,201561,202493,203447,204259,204939,205678,206295,207108,207909,208560,209427,210070,210695,211917,212732,213407,213923,214857,215673,216468,217478,218581,219782,220919,221842,222643,223395,224029,224451,225363,226126,227314,228488,229330,230186,231034,231791,232312,233083,233920,234723,235363,236155,237356,238499,239275,240055,240852,241725,242322,243175,244097,245069,245814,246804,247470,248590,249677,250319,251190,252032,252888,253706,254823,256073,257273,258016,259360,260552,261436,262695,263838,264743,266050,267161,268221,269352,270674,271453,272217,273141,274069,274912,275781,276544,277323,278071,278856,279633,280479,281742,282562,283448,284265,285240,286214,287418,288474,289457,290527,291605,293144,294549,295751,297038,298030,299071],sizes:[1125,1373,1297,993,1012,1004,1123,947,1358,1089,671,1075,1033,905,996,1152,1460,1161,912,1063,1197,605,1200,993,1035,890,1093,1039,1075,687,1022,851,976,916,1108,1054,872,1073,963,1180,1490,1188,891,1282,1346,1021,1126,1424,1103,1316,1473,1196,1111,933,1029,1099,956,1113,774,1107,978,1227,955,925,1004,819,880,1485,1058,914,1005,1014,892,1035,951,989,749,892,960,1140,987,1096,1377,923,739,797,1081,1064,1423,1470,946,1177,798,1028,1165,1157,1083,846,1117,1131,1107,965,1061,1249,1163,1285,1180,1181,1102,1015,1075,614,1101,917,985,954,971,1122,1506,1081,934,1067,682,1004,921,959,928,1033,918,934,924,832,982,991,1376,1235,1008,840,1156,1031,983,827,956,972,1070,796,1366,1279,1138,1416,965,1101,1078,1165,1543,1202,978,784,888,956,798,768,849,667,741,671,897,815,816,577,730,763,709,869,1234,673,1144,849,929,1005,924,902,831,838,600,886,865,879,1205,1203,1089,731,576,733,1158,1099,993,860,932,954,812,680,739,617,813,801,651,867,643,625,1222,815,675,516,934,816,795,1010,1103,1201,1137,923,801,752,634,422,912,763,1188,1174,842,856,848,757,521,771,837,803,640,792,1201,1143,776,780,797,873,597,853,922,972,745,990,666,1120,1087,642,871,842,856,818,1117,1250,1200,743,1344,1192,884,1259,1143,905,1307,1111,1060,1131,1322,779,764,924,928,843,869,763,779,748,785,777,846,1263,820,886,817,975,974,1204,1056,983,1070,1078,1539,1405,1202,1287,992,1041,294],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};compressedData["data"]=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData},true);Module["removeRunDependency"]("datafile_optlang.data")}Module["addRunDependency"]("datafile_optlang.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/lib/python3.8/site-packages/optlang/__init__.py",start:0,end:3226,audio:0},{filename:"/lib/python3.8/site-packages/optlang/coinor_cbc_interface.py",start:3226,end:33810,audio:0},{filename:"/lib/python3.8/site-packages/optlang/container.py",start:33810,end:40766,audio:0},{filename:"/lib/python3.8/site-packages/optlang/cplex_interface.py",start:40766,end:81714,audio:0},{filename:"/lib/python3.8/site-packages/optlang/duality.py",start:81714,end:89381,audio:0},{filename:"/lib/python3.8/site-packages/optlang/exceptions.py",start:89381,end:90849,audio:0},{filename:"/lib/python3.8/site-packages/optlang/expression_parsing.py",start:90849,end:97021,audio:0},{filename:"/lib/python3.8/site-packages/optlang/glpk_exact_interface.py",start:97021,end:102228,audio:0},{filename:"/lib/python3.8/site-packages/optlang/glpk_interface.py",start:102228,end:138045,audio:0},{filename:"/lib/python3.8/site-packages/optlang/gurobi_interface.py",start:138045,end:168013,audio:0},{filename:"/lib/python3.8/site-packages/optlang/inspyred_interface.py",start:168013,end:180990,audio:0},{filename:"/lib/python3.8/site-packages/optlang/interface.py",start:180990,end:241782,audio:0},{filename:"/lib/python3.8/site-packages/optlang/osqp_interface.py",start:241782,end:275671,audio:0},{filename:"/lib/python3.8/site-packages/optlang/scipy_interface.py",start:275671,end:300503,audio:0},{filename:"/lib/python3.8/site-packages/optlang/symbolics.py",start:300503,end:304868,audio:0},{filename:"/lib/python3.8/site-packages/optlang/util.py",start:304868,end:315874,audio:0},{filename:"/lib/python3.8/site-packages/optlang/_version.py",start:315874,end:316371,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/__init__.py",start:316371,end:316982,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/abstract_test_cases.py",start:316982,end:357326,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/test_change_solver.py",start:357326,end:361083,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/test_coinor_cbc_interface.py",start:361083,end:388855,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/test_container.py",start:388855,end:397928,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/test_cplex_interface.py",start:397928,end:430795,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/test_duality.py",start:430795,end:438598,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/test_elements.py",start:438598,end:444335,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/test_expression_parsing.py",start:444335,end:447832,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/test_glpk_exact_interface.py",start:447832,end:467329,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/test_glpk_interface.py",start:467329,end:491674,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/test_gurobi_interface.py",start:491674,end:518607,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/test_inspyred_interface.py",start:518607,end:520698,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/test_interface.py",start:520698,end:530357,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/test_io.py",start:530357,end:534318,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/test_netlib_cplex_interface.py",start:534318,end:541396,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/test_netlib_glpk_exact_interface.py",start:541396,end:547366,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/test_netlib_glpk_interface.py",start:547366,end:553999,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/test_netlib_gurobi_interface.py",start:553999,end:561490,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/test_osqp_interface.py",start:561490,end:588169,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/test_scipy_interface.py",start:588169,end:600581,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/test_symbolics.py",start:600581,end:600836,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/test_util.py",start:600836,end:610452,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/data/__init__.py",start:610452,end:610452,audio:0},{filename:"/lib/python3.8/site-packages/optlang/tests/data/parse_the_final_netlib_results.py",start:610452,end:612028,audio:0},{filename:"/lib/python3.8/site-packages/optlang-1.5.1-py3.8.egg-info/PKG-INFO",start:612028,end:621509,audio:0},{filename:"/lib/python3.8/site-packages/optlang-1.5.1-py3.8.egg-info/SOURCES.txt",start:621509,end:623296,audio:0},{filename:"/lib/python3.8/site-packages/optlang-1.5.1-py3.8.egg-info/dependency_links.txt",start:623296,end:623297,audio:0},{filename:"/lib/python3.8/site-packages/optlang-1.5.1-py3.8.egg-info/requires.txt",start:623297,end:623363,audio:0},{filename:"/lib/python3.8/site-packages/optlang-1.5.1-py3.8.egg-info/top_level.txt",start:623363,end:623371,audio:0},{filename:"/lib/python3.8/site-packages/optlang-1.5.1-py3.8.egg-info/zip-safe",start:623371,end:623372,audio:0}],remote_package_size:303461,package_uuid:"03728794-5f03-48d6-8243-16dfca5f02ed"})})();