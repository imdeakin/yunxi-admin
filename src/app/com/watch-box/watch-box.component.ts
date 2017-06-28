import { Component,ElementRef,Input,Output,DoCheck,OnInit,EventEmitter } from '@angular/core';
import { ScrollbarServer } from '../../serv/scrollbar-server';

@Component({
    selector:'watch-box',
    templateUrl:'./watch-box.component.html',
    styleUrls:['./watch-box.component.css']
})

export class WatchBoxComponent implements OnInit,DoCheck{
    @Input() public content:string = '';

constructor(private scrollbarServer:ScrollbarServer,private elf:ElementRef){
    
}

public ngOnInit():void{

}

public ngDoCheck():void{

}

}