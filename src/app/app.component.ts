import { Component, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('slideIn', [
            transition(':enter', [
                style({ transform: 'translateX(-30%)', opacity: 0 }),
                animate('.8s ease-in', style({ transform: 'translateX(0%)', opacity: 1 }))
            ]),
        ])
    ]
})
export class AppComponent {
    @ViewChildren('bio') bioSections: QueryList<ElementRef>;
    showingSummaries: Array<boolean> = [false, false];

    showSummaries() {
        this.bioSections.forEach((e: ElementRef, i: number) => {
            const parent = e.nativeElement.parentElement;
            this.showingSummaries[i] = this.showingSummaries[i] || parent.scrollTop >= ((i + 1) * parent.scrollHeight / this.bioSections.length) - parent.clientHeight;
        });
    }
}
