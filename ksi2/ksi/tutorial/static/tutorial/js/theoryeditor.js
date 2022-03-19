editors = []
inputs = []
outputs = []
files = {}
efiles = {}
tinputs = []
toutputs = []
tuserputs = []
ttfiles = []

var nn//для evaluatePython
    for(i=0; i<info.length; i++){
        var editor = ace.edit("editor"+i);
        editor.setTheme("ace/theme/github");
        editor.session.setMode("ace/mode/python");
        document.getElementById('editor'+i).style.fontSize='16px';
        editor.setOptions({
            minLines: info[i]['code'].split('\n').length+1,
            maxLines: info[i]['code'].split('\n').length+1
        })
        editor.setValue(info[i]['code'])
        editor.clearSelection()
        editors.push(editor)

        var einput = ace.edit("einput"+i);
        einput.setTheme("ace/theme/github");
        einput.session.setMode("ace/mode/plain_text");
        einput.setOptions({
            minLines: info[i]['in'].split('\n').length+4,
            maxLines: info[i]['in'].split('\n').length+4
        })
        document.getElementById('einput'+i).style.fontSize='16px';
        einput.setValue(info[i]["in"])
        einput.clearSelection()
        inputs.push(einput)

        var eoutput = ace.edit("eoutput"+i);
        eoutput.setTheme("ace/theme/github");
        eoutput.session.setMode("ace/mode/plain_text");
        eoutput.setOptions({
            minLines: info[i]['in'].split('\n').length+4,
            maxLines: info[i]['in'].split('\n').length+4
        })
        document.getElementById('eoutput'+i).style.fontSize='16px';
        eoutput.setReadOnly('true');
        eoutput.clearSelection()
        outputs.push(eoutput)

        if (info[i]['withfile']==1){
            var efile = ace.edit("efile"+i);
            efile.setTheme("ace/theme/github");
            efile.session.setMode("ace/mode/plain_text");
            efile.setOptions({
            minLines: info[i]['filecontent'].split('\n').length+1,
            maxLines: info[i]['filecontent'].split('\n').length+1
        })
            document.getElementById('efile'+i).style.fontSize='16px';
            document.getElementById('efile'+i).style.display='none';
            efiles[i] = efile
        }
    }

    var in_test, out_test;

    function addToOutput(s,n) {
      outputs[n].setValue(outputs[n].getValue()+s);
      outputs[n].clearSelection()
    }
    for(i=0; i<info.length; i++){
    outputs[i].setValue('Подождите...\n');
    outputs[i].clearSelection()
    }
    async function main(){
        await loadPyodide({ indexURL : pyodide_path });
        for(i=0; i<info.length; i++){
            outputs[i].setValue('Готово!\n');
            outputs[i].clearSelection()
            if(info[i]['withfile']==1){
                document.getElementById("efile"+i).style.display = 'block'
                document.getElementById("efile_title"+i).style.display = 'block'
                fname = info[i]['filename']
                fcontent = info[i]['filecontent']
                pyodide.runPython(`
                from js import fname, fcontent
                abcdefgh = open(fname, "w+")
                abcdefgh.write(fcontent)
                abcdefgh.close()
                `)
                efiles[i].setValue(fcontent)
                efiles[i].clearSelection()
            }
        }
    }
    var pyodideReadyPromise = main();

//    function loadFile(n){
//    document.getElementById("efile"+n).style.display = 'block'
//    document.getElementById("efile_title"+n).style.display = 'block'
//    files[n] = document.getElementById("file"+n).files[0];
//    var reader = new FileReader();
//    reader.readAsBinaryString(files[n]);
//    reader.onload = evt => {
//    content = evt.target.result;
//    efiles[n].setValue(content)
//        }
//    }

    async function evaluatePython(n) {
    document.getElementById("button_loading"+n).style.display = 'inline-flex'
    document.getElementById("button_title"+n).textContent = 'Выполняется'
    in_main = inputs[n].getValue()
    outputs[n].setValue("")
    nn = n
    await pyodideReadyPromise;
    pyodide.runPython(`
    from js import pyodide, info, nn
    pyodide.globals.clear()
    from js import in_main, addToOutput
    import sys,io
    sys.stdout = io.StringIO()
    in_main = iter(in_main.split('\\n'))
    def main_in():
        return next(in_main)
    input = main_in

`);
      try {
        let output = await pyodide.runPythonAsync(editors[nn].getValue());
        document.getElementById("button_loading"+n).style.display = 'none'
        document.getElementById("button_title"+n).textContent = 'Запустить'
//        if(info[0]['withimg']==1){
//        console.log(output)
//                    pyodide.runPython(`
//            import io, base64
//            buf = io.BytesIO()
//            buf.truncate(0)
//            plt.savefig(buf, format='png')
//            buf.seek(0)
//            img_str = 'data:image/png;base64,' + base64.b64encode(buf.read()).decode('UTF-8')
//        `)
//        document.getElementById("pyplotfigure").src=pyodide.globals.img_str
//        }
        addToOutput(pyodide.runPython("sys.stdout.getvalue()"),nn);
      } catch(err) {
        document.getElementById("button_loading"+n).style.display = 'none'
        document.getElementById("button_title"+n).textContent = 'Запустить'
        addToOutput(pyodide.runPython("sys.stdout.getvalue()"),nn);
        addToOutput(err,nn);
      }
    }

