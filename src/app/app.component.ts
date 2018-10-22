import { Component, ElementRef, ViewChildren, QueryList, HostListener } from '@angular/core';
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
    @ViewChildren('section') sections: QueryList<ElementRef>;

    currentSection = 0;
    wasMessageSent = false;

    constructor() {

    }

    showSummaries() {
        this.currentSection = this.sections.toArray().findIndex((e: ElementRef, i: number) => {
            const view = e.nativeElement.getBoundingClientRect();
            return view.top + view.height / 2 > 0;
        });
    }

    scrollToSection(i: number) {
        this.sections.toArray()[i].nativeElement.scrollIntoView();
    }

    @HostListener('document:keydown.arrowup', ['$event'])
    prevSection(event: KeyboardEvent) {
        this.currentSection = Math.max(0, this.currentSection - 1);
        event.preventDefault();
        this.scrollToSection(this.currentSection);
    }

    @HostListener('document:keydown.arrowdown', ['$event'])
    nextSection(event: KeyboardEvent) {
        this.currentSection = Math.min(this.sections.length - 1, this.currentSection + 1);
        event.preventDefault();
        this.scrollToSection(this.currentSection);
    }

    sentMessage() {
        this.wasMessageSent = true;
    }
}
