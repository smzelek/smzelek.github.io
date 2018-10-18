import { Component, ElementRef, ViewChildren, QueryList } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChildren('bio') bioSections: QueryList<ElementRef>;
    showingSummaries: Array<boolean> = [false, false];

    showSummaries() {
        this.bioSections.forEach((e: ElementRef, i: number) => {
            const viewRect = e.nativeElement.getBoundingClientRect();
            const parent = e.nativeElement.parentElement;
            const parentRect = parent.getBoundingClientRect();
            this.showingSummaries[i] = parent.scrollTop + parentRect.top > e.nativeElement.offsetTop + viewRect.height;
            console.log(parent.scrollTop , parentRect.top, e.nativeElement.offsetTop + viewRect.height)
            // console.log(parent.scrollTop, parentRect.y, -viewRect.top)
            // console.log(e.nativeElement.offsetTop)
            // console.log(viewRect, topCutoff);
        });
    }
}
