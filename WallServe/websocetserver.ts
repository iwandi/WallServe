


/** Global variables */
export var history = [];
export var clients = [];


// Array with some colors
var colors = ['red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange'];
// ... in random order
colors.sort(function (a, b) { return <any>(Math.random() > 0.5); });


export class websocetserverinstance{
    
    public connection: any; 
    

    public HandleMessage (message) {

        if (message.type === 'utf8') { // accept only text

            try {
            var json = JSON.parse(message.utf8Data);

            console.log(json);

            if (json == null) { console.log((new Date()) + 'JSON CALL WTF: ' + message.utf8Data); return; }
            
            console.log((new Date()) + 'JSON Data: ' + json.Type + " - "+ json.Name + " - " + json.Password);

                if (json.Type == "LogIn") {
                    
                    
                }
                else if (json.Type == "ChatMessage") { 
                   
                }

            } catch (e) { console.log((new Date()) + 'JSON CALL WTF: ' + message.utf8Data + "\n ERROR:"+e); }
        }
    }

    public close(connection) {

    }
}