import { PlaceSearch } from './place-search/place-search';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PoiDetails } from './poi-details/poi-details';
import { RoutePlanner } from './route-planner/route-planner';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NullableTranslatePipe } from '../pipes/NullableTranslatePipe';
import { EquipmentDetailsComponent } from './equipment-details/equipment-details';
import { PoiListComponent } from './poi-list/poi-list';
import { PoiLocationEditorComponent } from './poi-location-editor/poi-location-editor';
import { PoiEquipmentEditorComponent } from './poi-equipment-editor/poi-equipment-editor';
import { OperatorLookupComponent } from './operator-lookup/operator-lookup.component';


@NgModule({
    imports: [CommonModule, IonicModule, FormsModule, TranslateModule],
    exports: [
        PlaceSearch,
        PoiDetails,
        PoiListComponent,
        EquipmentDetailsComponent,
        RoutePlanner,
        NullableTranslatePipe,
        PoiLocationEditorComponent,
        PoiEquipmentEditorComponent,
        OperatorLookupComponent
    ],
    declarations: [
        PlaceSearch,
        PoiDetails,
        PoiListComponent,
        EquipmentDetailsComponent,
        RoutePlanner,
        NullableTranslatePipe,
        PoiLocationEditorComponent,
        PoiEquipmentEditorComponent,
        OperatorLookupComponent
    ],
    providers: [DecimalPipe],
})

export class UIComponentsModule {
}
