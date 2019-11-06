import { Component, OnChanges } from '@angular/core';

@Component({
    selector: 'stars',
    templateUrl: './stars.component.html',
    styleUrls: ['./stars.component.css']

})

export class StarsComponent implements OnChanges{
    raiting: number = 4;
    starWidth: number;
    ngOnChanges(): void {
        this.starWidth = this.raiting * 75 / 5;
    }
}