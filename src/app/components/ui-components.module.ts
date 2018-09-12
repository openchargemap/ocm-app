import { PlaceSearch } from './place-search/place-search';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PoiDetails } from './poi-details/poi-details';
import { RoutePlanner } from './route-planner/route-planner';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, IonicModule, FormsModule, TranslateModule],
    exports: [PlaceSearch, PoiDetails, RoutePlanner],
    declarations: [PlaceSearch, PoiDetails, RoutePlanner],
    providers: [],
})

export class UIComponentsModule {
}
