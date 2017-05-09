import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app',
    styleUrls: [
        './app.component.css'
    ],
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    public contentHeight = 0;
    public mainWidth = 0;

    public ngOnInit(): void {
        this.mainWidth = window.innerWidth - 300;
        this.contentHeight = window.innerHeight - 83;
        window.addEventListener('resize', (e) => {
            console.log('resize');
            this.mainWidth = window.innerWidth - 300;
            this.contentHeight = window.innerHeight - 83;
        })
    }
}
