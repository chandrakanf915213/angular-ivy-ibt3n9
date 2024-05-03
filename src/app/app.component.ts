import { Component, VERSION } from '@angular/core';
import { EntryKeyValue } from './entry-key-value';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;

  ekvs: EntryKeyValue[] = [
    {
      key: 'first',
      value: 'First Item'
    },
    {
      key: 'second',
      value: 'Second Item'
    },
    {
      key: 'third',
      value: 'Third Item'
    },
  ];
  public readonly BODY_TEXTAREA = 'BODY_TEXTAREA';

  public drag_handler(event: any) {
    //console.log(`drag_handler:`);
    //console.log(event);
    var data = event.dataTransfer.getData("Text");
    document.getElementById("paragraph").innerHTML = "<span class='blink'>Paragraph: Started</span> to drag the <span style='color:green'>" + data + "</span> element.";
    //console.log(data);
  }

  public dragend_handler(event: any) {
    //console.log(`dragend_handler:`);
    //console.log(event);
    var data = event.dataTransfer.getData("Text");
    document.getElementById("paragraph2").innerHTML = "Paragraph2: Finished dragging the <span style='color:blue'>" + data + "</span> element.";
    //console.log(data);
  }

  public dragenter_handler(event: any) {
    //console.log(`dragenter_handler:`);
    //console.log(event);
    if ( event.target.className == "droptarget" ) {
      document.getElementById("paragraph").innerHTML = "Paragraph: Entered the dropzone";
      event.target.style.backgroundColor = "lightblue";
      event.target.style.border = "3px dotted red";
    }

  }

  public dragleave_handler(event: any) {
    //console.log(`dragleave_handler:`);
    //console.log(event);
    event.currentTarget.style.background = "white";
    if ( event.target.className == "droptarget" ) {
      document.getElementById("paragraph").innerHTML = "Paragraph: Left the dropzone";
      event.target.style.border = "";
    }
  }

  public dragstart_handler(event: any) {
    //console.log(`dragstart_handler:`);
    //console.log(event);
    //console.log(event.target);
    
    const crt = event.target.cloneNode(true);

    crt.style.animation = "blinker 1s linear infinite;";
    crt.style.backgroundColor = "#D1F8D1";
    crt.style.color = "darkred";
    crt.style.position = "absolute";
    crt.style.borderWidth = "initial";
    crt.style.borderStyle = "dashed";
    crt.style.borderColor = "blue";
    crt.style.top = "-1000px";
    crt.style.right = "0px";
    crt.className += " blink";
    const value = event.target.dataset.value;
    crt.innerText = value;
    
    document.body.appendChild(crt);
    event.dataTransfer.setDragImage(crt, 0, 0);
    //event.dataTransfer.setData('text/plain', event.target.innerText);
    event.dataTransfer.setData('text/plain', value);
    document.getElementById("paragraph2").innerHTML = "Paragraph2: Starting dragging the <span style='color:red'>" + event.target.innerText + "</span> element.";
  }

  public drop_handler(event: any) {
    //console.log(`drop_handler:`);
    //console.log(event);
   
    event.preventDefault();

    var data = event.dataTransfer.getData("Text");
    document.getElementById("paragraph").innerHTML = "Paragraph: The element  <span style='color:green'>" + data + "</span> was dropped.";

    event.currentTarget.style.background = "white";
  }

  public dragover_handler(event: any) {
    //console.log(`dragover_handler:`);
    //console.log(event);

    event.currentTarget.style.background = "lightgray";
    event.preventDefault();
  }
}
