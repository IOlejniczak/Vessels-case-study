import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstUseBadgeComponent } from './components/first-use-badge/first-use-badge.component';

@NgModule({
    imports: [CommonModule],
    declarations: [FirstUseBadgeComponent],
    exports: [FirstUseBadgeComponent],
})
export class UiModule {}
