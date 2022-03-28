editors = []
inputs = []
outputs = []
files = []
efiles = []
tinputs = []
toutputs = []
tuserputs = []
ttfiles = []

var nn//для evaluatePython
if (info[0]['withfile']==1){
var modified_test_file = test_file.split('\n----\n')
}
if(info[0]['withtest']){
    right_tests = 0
    all_tests = test_obj.length 
    for(i=0; i<test_obj.length; i++){
        var tinput = ace.edit("tinput"+i);
        tinput.setTheme("ace/theme/github");
        tinput.session.setMode("ace/mode/plain_text");
        document.getElementById('tinput'+i).style.fontSize='16px';
        tinput.setReadOnly('true');
        tinput.setValue(test_obj[i]["in"])
        tinput.clearSelection()
        tinputs.push(tinput)

        var toutput = ace.edit("toutput"+i);
        toutput.setTheme("ace/theme/github");
        toutput.session.setMode("ace/mode/plain_text");
        document.getElementById('toutput'+i).style.fontSize='16px';
        toutput.setReadOnly('true');
        toutput.setValue(test_obj[i]["out"])
        toutput.clearSelection()
        toutputs.push(toutput)

        var tuserput = ace.edit("tuserput"+i);
        tuserput.setTheme("ace/theme/github");
        tuserput.session.setMode("ace/mode/plain_text");
        document.getElementById('tuserput'+i).style.fontSize='16px';
        tuserput.setReadOnly('true');
        tuserput.setValue('Тут будет ваш ответ...')
        tuserput.clearSelection()
        tuserputs.push(tuserput)

        if(info[0]['withfile']){
        var ttfile = ace.edit("ttfile"+i);
        ttfile.setTheme("ace/theme/github");
        ttfile.session.setMode("ace/mode/plain_text");
        document.getElementById('ttfile'+i).style.fontSize='16px';
        ttfile.setReadOnly('true');
        ttfile.setValue(modified_test_file[i])
        ttfile.clearSelection()
        ttfiles.push(ttfile)
        }
    }
}
    for(i=0; i<info.length; i++){
        var editor = ace.edit("editor"+i);
        editor.setTheme("ace/theme/github");
        editor.session.setMode("ace/mode/python");
        document.getElementById('editor'+i).style.fontSize='16px';
        editor.setOptions({
            minLines: info[i]['ml'],
            maxLines: info[i]['ml']
        })
        //editor.setValue(info[0]['code'])
        editors.push(editor)

        var einput = ace.edit("einput"+i);
        einput.setTheme("ace/theme/github");
        einput.session.setMode("ace/mode/plain_text");
        document.getElementById('einput'+i).style.fontSize='16px';
        if(i==0 && info[0]["withtest"]==1){
            einput.setValue(test_obj[0]["in"])
            einput.clearSelection()
        }
        else{
        einput.setValue('')
        }
        inputs.push(einput)

        var eoutput = ace.edit("eoutput"+i);
        eoutput.setTheme("ace/theme/github");
        eoutput.session.setMode("ace/mode/plain_text");
        document.getElementById('eoutput'+i).style.fontSize='16px';
        eoutput.setReadOnly('true');
        outputs.push(eoutput)

        if (info[i]['withfile']==1){
        var efile = ace.edit("efile"+i);
        efile.setTheme("ace/theme/github");
        efile.session.setMode("ace/mode/plain_text");
        document.getElementById('efile'+i).style.fontSize='16px';
        document.getElementById('efile'+i).style.display='none';
        efiles.push(efile)
        }
    }

    var in_test, out_test;

    function addToOutput(s,n) {
      outputs[n].setValue(outputs[n].getValue()+s);
      outputs[n].clearSelection()
    }
    for(i=0; i<info.length; i++){
    outputs[i].setValue('Подождите...\n');
    }
    async function main(){
        await loadPyodide({ indexURL : pyodide_path });
        for(i=0; i<info.length; i++){
            outputs[i].setValue('Готово!\n');
        }
        if(info[0]['withfile']==1){
        pyodide.runPython(`
        from js import  modified_test_file
        for i in range(len(modified_test_file)):
            abcdefgh = open(str(i)+'.txt', "w+")
            abcdefgh.write(modified_test_file[i])
            abcdefgh.close()
        `)
        }
    }
    var pyodideReadyPromise = main();

    function loadFile(n){
    document.getElementById("efile"+n).style.display = 'block'
    document.getElementById("efile_title"+n).style.display = 'block'
    files[n] = document.getElementById("file"+n).files[0];
    var reader = new FileReader();
    reader.readAsBinaryString(files[n]);
    reader.onload = evt => {
    content = evt.target.result;
    efiles[n].setValue(content)
        }
    }

    async function evaluatePython(n) {
    document.getElementById("button_loading"+n).style.display = 'inline-flex'
    document.getElementById("button_title"+n).textContent = 'Выполняется'
    if (info[n]['withfile']==1){
    f = files[n]
    }
    in_main = inputs[n].getValue()
    outputs[n].setValue("")
    nn = n
    await pyodideReadyPromise;
    pyodide.runPython(`
    from js import pyodide, info, nn
    if info[nn].withfile==1:
        from js import files,efiles
        if files:
            abcdefgh = open(files[nn].name, "w+")
            abcdefgh.write(efiles[nn].getValue())
            abcdefgh.close()
        else:
            print('Файл не загружен!')
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
        if(info[0]['withimg']==1){
        console.log(output)
        pyodide.runPython(`
import io, base64
buf = io.BytesIO()
buf.truncate(0)
if 'plt' in globals():
    plt.savefig(buf, format='png')
    buf.seek(0)
    img_str = 'data:image/png;base64,' + base64.b64encode(buf.read()).decode('UTF-8')
`)
        document.getElementById("pyplotfigure").src=pyodide.globals.img_str
        }
        addToOutput(pyodide.runPython("sys.stdout.getvalue()"),nn);
      } catch(err) {
        document.getElementById("button_loading"+n).style.display = 'none'
        document.getElementById("button_title"+n).textContent = 'Запустить'
        addToOutput(err,nn);
      }
    }

    async function testAll(){
        await pyodideReadyPromise;
        allCorrect = true;
        right_tests  = 0
        for(var i=0; i<test_obj.length; i++){
            in_test = test_obj[i]["in"]
            out_test = test_obj[i]["out"]
            id_test = test_obj[i]["id"]
            pyodide.runPython(`
from js import in_test, out_test,pyodide, addToOutput
import sys
import io
sys.stdout = io.StringIO()
in_test = iter(in_test.split('\\n'))
def test_input():
    return next(in_test)
input = test_input
            `);
            try {
        let output = await pyodide.runPythonAsync(editors[0].getValue());
        if (info[0]['withfile']==1){
            await pyodide.runPythonAsync('test_with_file('+i+')');
        }
        o = pyodide.runPython("sys.stdout.getvalue()")
        tuserputs[i].setValue(o)
        tuserputs[i].clearSelection()
        if (o!=out_test){
            allCorrect = false
            document.getElementById("test"+i).classList.add('bg-danger')
        }
        else{
            right_tests += 1
            document.getElementById("test"+i).classList.remove('bg-danger')
            document.getElementById("test"+i).classList.add('bg-success')
        }
      } catch(err) {
        allCorrect = false
        tuserputs[i].setValue(pyodide.runPython("sys.stdout.getvalue()"));
        tuserputs[i].clearSelection()
        document.getElementById("test"+i).classList.add('bg-danger')
      }
        }
    
        $.ajax({
            headers: {'X-CSRFToken': csrftoken},
            type: 'POST',
            url: '/update_solution/',
            data : {slug: info[0]['slug'],
                    user: user_name,
                    solution: editors[0].getValue(),
                    ratio : right_tests/all_tests,
                    },
            
        })  
        if(allCorrect){
            $.ajax({
                headers: {'X-CSRFToken': csrftoken},
                type: 'POST',
                url: '/success_solution/',
                data : {slug: info[0]['slug'],
                        user: user_name,
                        solution: editors[0].getValue()
                        },
                success: function(sol_data){
                    sol_data = JSON.parse(sol_data)
                    var asolution = ace.edit("author-solution");
                    asolution.setTheme("ace/theme/github");
                    asolution.session.setMode("ace/mode/python");
                    document.getElementById("author-solution").style.fontSize='16px';
                    document.getElementById("author-solution").style.display='block';
                    document.getElementById("wrong-test").style.display='none';
                    document.getElementById("right-test").style.display='block';
                    document.getElementById("author-solution-title").style.display='block';
                    asolution.setOptions({
                        minLines: 12,
                        maxLines: 12
                    })
                    asolution.setReadOnly('true');
                    asolution.setValue(sol_data['author_solution'])
                    asolution.clearSelection()
                    var i = 0
                    for(var key in sol_data['other']){

                        var usolution = ace.edit("user_solution"+i);
                        usolution.setTheme("ace/theme/github");
                        usolution.session.setMode("ace/mode/python");
                        document.getElementById("user_solution"+i).style.fontSize='16px';
                        document.getElementById("user_solution"+i).style.display='block';
                        document.getElementById("user-solution-title").style.display='block';
                        document.getElementById("username"+i).style.display='block';
                        document.getElementById("username"+i).innerHTML=key;

                        usolution.setOptions({
                            minLines: Math.min(sol_data['other'][key].split('\n').length, 30)+1,
                            maxLines: Math.min(sol_data['other'][key].split('\n').length, 30)+1
                        })
                        usolution.setReadOnly('true');
                        usolution.setValue(sol_data['other'][key])
                        usolution.clearSelection()
                        i++
                    }
                }
            })
        }
        else{
        document.getElementById("wrong-test").style.display='block';
        document.getElementById("right-test").style.display='none';
        }
    }

