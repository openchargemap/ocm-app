import { Component } from '@angular/core';

/**
 * Small collapsible key explaining the marker icons used on the charging map.
 * The icons here must stay in sync with Utils.getIconForPOI().
 */
@Component({
    selector: 'app-map-legend',
    templateUrl: 'map-legend.component.html',
    styleUrls: ['map-legend.component.scss'],
    standalone: false
})
export class MapLegendComponent {

  expanded = false;

  readonly groups = [
    {
      labelKey: 'ocm.explore.mapKeyPower',
      items: [
        { icon: 'assets/images/icons/map/level3_operational_icon.png', labelKey: 'ocm.explore.mapKeyHigh' },
        { icon: 'assets/images/icons/map/level2_operational_icon.png', labelKey: 'ocm.explore.mapKeyMedium' },
        { icon: 'assets/images/icons/map/level1_operational_icon.png', labelKey: 'ocm.explore.mapKeyLow' },
        { icon: 'assets/images/icons/map/level0_operational_icon.png', labelKey: 'ocm.explore.mapKeyUnspecified' }
      ]
    },
    {
      labelKey: 'ocm.explore.mapKeyStatus',
      items: [
        { icon: 'assets/images/icons/map/level2_operational_icon.png', labelKey: 'ocm.explore.mapKeyOperational' },
        { icon: 'assets/images/icons/map/level2_nonoperational_icon.png', labelKey: 'ocm.explore.mapKeyUnavailable' },
        { icon: 'assets/images/icons/map/level0_nonoperational_icon.png', labelKey: 'ocm.explore.mapKeyPlanned' },
        { icon: 'assets/images/icons/map/level2_private_icon.png', labelKey: 'ocm.explore.mapKeyPrivate' }
      ]
    }
  ];
}
