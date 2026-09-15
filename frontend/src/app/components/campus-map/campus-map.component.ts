import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';
import { NavPanelComponent } from '../nav-panel/nav-panel.component';
import { FloorSelectorComponent } from '../floor-selector/floor-selector.component';
import { DemoControlComponent } from '../demo-control/demo-control.component';
import { MapService } from '../../services/map.service';
import { Location } from '../../models/location.model';
import { CAMPUS_CENTER, DEFAULT_ZOOM, CATEGORIES } from '../../utils/constants';
import * as L from 'leaflet';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-campus-map',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    SearchBarComponent,
    CategoryFilterComponent,
    NavPanelComponent,
    FloorSelectorComponent,
    DemoControlComponent
  ],
  templateUrl: './campus-map.component.html',
  styleUrls: ['./campus-map.component.scss']
})
export class CampusMapComponent implements AfterViewInit, OnDestroy {
  private map!: L.Map;
  private markersLayer = L.layerGroup();
  private routeLayer = L.layerGroup();
  private campusVectorLayer = L.layerGroup();
  private subs = new Subscription();
  private resizeListener = () => {
    if (this.map) this.map.invalidateSize();
  };

  currentFloor = 'G';
  hasMultiFloor = true;

  constructor(
    public mapService: MapService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.initMap();
    this.setupSubscriptions();
    this.locateUser();

    // Ensure Leaflet recalculates viewport dimensions after Angular flex render
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 150);

    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    window.removeEventListener('resize', this.resizeListener);
    if (this.map) this.map.remove();
  }

  private initMap() {
    this.map = L.map('map', {
      center: CAMPUS_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: false,
      maxZoom: 22,
      minZoom: 15
    });

    // OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 22,
      attribution: '© OpenStreetMap contributors • CUTM Paralakhemundi'
    }).addTo(this.map);

    L.control.zoom({ position: 'bottomright' }).addTo(this.map);

    // Layer groups
    this.campusVectorLayer.addTo(this.map);
    this.markersLayer.addTo(this.map);
    this.routeLayer.addTo(this.map);

    // Draw Campus Grounds & Arterial Roads (guarantees vivid graphics even if tiles are loading)
    this.drawCampusBase();

    // Load GeoJSON building footprints
    fetch('/assets/data/campus_buildings.geojson')
      .then(res => res.json())
      .then(geojson => {
        L.geoJSON(geojson, {
          style: (feature) => {
            const id = feature?.properties?.id || '';
            const name = (feature?.properties?.name || '').toLowerCase();
            let color = '#1565C0';

            if (name.includes('aryabhatta') || id.includes('ARYABHATTA')) color = '#1565C0';
            else if (name.includes('admin') || id.includes('ADMIN')) color = '#1976D2';
            else if (name.includes('library') || id.includes('LIBRARY')) color = '#00897B';
            else if (name.includes('hostel') || id.includes('HOSTEL')) color = '#5E35B1';
            else if (name.includes('canteen') || name.includes('food')) color = '#EF6C00';
            else if (name.includes('sports') || name.includes('ground')) color = '#2E7D32';
            else if (name.includes('medical') || name.includes('health')) color = '#C62828';
            else if (name.includes('gate')) color = '#6D4C41';
            else if (name.includes('agri')) color = '#558B2F';
            else if (name.includes('workshop')) color = '#455A64';

            return {
              color: color,
              weight: 2,
              fillColor: color,
              fillOpacity: 0.35,
              opacity: 0.9
            };
          },
          onEachFeature: (feature, layer) => {
            const name = feature.properties?.name || 'Campus Building';
            const id = feature.properties?.id || '';
            const isAryabhatta = name.toLowerCase().includes('aryabhatta') || id.includes('ARYABHATTA');

            // Permanent crisp campus badge
            layer.bindTooltip(`<b>${name}</b>`, {
              permanent: true,
              direction: 'center',
              className: 'campus-building-label'
            });

            // Interactive Building Details Popup
            const popupEl = document.createElement('div');
            popupEl.style.cssText = 'min-width: 210px; font-family: Roboto, sans-serif; padding: 4px;';
            popupEl.innerHTML = `
              <div style="font-size: 10px; font-weight: 700; color: #00897B; text-transform: uppercase; margin-bottom: 2px;">Campus Facility</div>
              <h3 style="margin: 0 0 6px 0; font-size: 15px; font-weight: 800; color: #1565C0;">${name}</h3>
              <div style="font-size: 12px; color: #5F6368; margin-bottom: 10px;">Centurion University of Technology and Management</div>
              ${isAryabhatta ? `
                <div style="background: #E3F2FD; border: 1px solid #90CAF9; border-radius: 8px; padding: 8px; margin-bottom: 10px; font-size: 11px; color: #0D47A1; font-weight: 600; line-height: 1.4;">
                  📍 3-Floor Interactive CAD Model with GPS-Free Indoor Positioning Active
                </div>
                <button id="btn-enter-indoor" style="width: 100%; padding: 8px 12px; background: #1565C0; color: white; border: none; border-radius: 8px; font-weight: 700; font-size: 12px; cursor: pointer; box-shadow: 0 2px 8px rgba(21,101,192,0.3);">
                  🚀 Enter Live Indoor Nav
                </button>
              ` : `
                <button id="btn-nav-building" style="width: 100%; padding: 8px 12px; background: #1565C0; color: white; border: none; border-radius: 8px; font-weight: 700; font-size: 12px; cursor: pointer;">
                  📍 Set as Route Destination
                </button>
              `}
            `;

            layer.bindPopup(popupEl);
            layer.on('popupopen', () => {
              if (isAryabhatta) {
                const btn = popupEl.querySelector('#btn-enter-indoor');
                if (btn) btn.addEventListener('click', () => this.router.navigate(['/navigate']));
              } else {
                const btn = popupEl.querySelector('#btn-nav-building');
                if (btn) {
                  btn.addEventListener('click', () => {
                    const matchLoc = this.mapService.locations.value.find(l => l.name === name || l.id === id);
                    if (matchLoc) {
                      this.mapService.setEnd(matchLoc);
                      layer.closePopup();
                    }
                  });
                }
              }
            });
          }
        }).addTo(this.campusVectorLayer);
      })
      .catch(() => {
        // Fallback handled by drawCampusBase()
      });
  }

  private drawCampusBase() {
    // 1. Campus Perimeter & Lush Turf Lawn
    const campusBounds: [number, number][] = [
      [18.7755, 84.0915],
      [18.7755, 84.0970],
      [18.7818, 84.0970],
      [18.7818, 84.0915]
    ];
    L.polygon(campusBounds, {
      color: '#A5D6A7',
      weight: 2,
      fillColor: '#E8F5E9',
      fillOpacity: 0.45,
      dashArray: '6 4'
    }).addTo(this.campusVectorLayer);

    // 2. Central Garden / Quadrangle
    const centralGarden: [number, number][] = [
      [18.7778, 84.0934],
      [18.7778, 84.0946],
      [18.7788, 84.0946],
      [18.7788, 84.0934]
    ];
    L.polygon(centralGarden, {
      color: '#81C784',
      weight: 1.5,
      fillColor: '#C8E6C9',
      fillOpacity: 0.65
    }).addTo(this.campusVectorLayer);

    // 3. Campus Main Ring Road Network
    const ringRoadCoords: [number, number][] = [
      [18.7770, 84.0930], // Main Gate
      [18.7778, 84.0934], // Admin Corner
      [18.7785, 84.0940], // Aryabhatta Front
      [18.7795, 84.0950], // Agri / Workshop
      [18.7808, 84.0942], // Hostels
      [18.7792, 84.0928], // Library Road
      [18.7770, 84.0930]  // Loop back
    ];
    L.polyline(ringRoadCoords, {
      color: '#CFD8DC',
      weight: 8,
      opacity: 0.8
    }).addTo(this.campusVectorLayer);

    L.polyline(ringRoadCoords, {
      color: '#FFFFFF',
      weight: 1.5,
      dashArray: '6 6',
      opacity: 0.95
    }).addTo(this.campusVectorLayer);
  }

  private setupSubscriptions() {
    this.subs.add(
      combineLatest([
        this.mapService.locations,
        this.mapService.activeCategory
      ]).subscribe(([locs, cat]) => {
        this.renderMarkers(locs, cat);
      })
    );

    this.subs.add(
      this.mapService.selectedLocation.subscribe(loc => {
        if (loc) {
          this.map.flyTo([loc.latitude, loc.longitude], 19, { animate: true, duration: 1 });
        }
      })
    );

    this.subs.add(
      this.mapService.currentRoute.subscribe(rt => {
        this.routeLayer.clearLayers();
        if (rt && rt.path) {
          const latLngs = rt.path.map(p => L.latLng(p[0], p[1]));
          const polyline = L.polyline(latLngs, {
            color: '#1976d2',
            weight: 5,
            className: 'animated-route'
          }).addTo(this.routeLayer);
          this.map.fitBounds(polyline.getBounds(), { padding: [60, 60] });
          
          L.marker(latLngs[0], {
             icon: L.divIcon({ className: 'route-marker start', html: '<div class="inner"></div>' })
          }).addTo(this.routeLayer);
          
          L.marker(latLngs[latLngs.length - 1], {
             icon: L.divIcon({ className: 'route-marker end', html: '<div class="inner"></div>' })
          }).addTo(this.routeLayer);
        }
      })
    );
  }

  private renderMarkers(locations: Location[], activeCategory: string | null) {
    this.markersLayer.clearLayers();
    if (!locations || locations.length === 0) return;

    locations.forEach(loc => {
      // 1. Active Category Filter Check
      if (activeCategory && activeCategory !== 'all') {
        const matchesCategory = loc.category?.toLowerCase() === activeCategory.toLowerCase();
        if (!matchesCategory) return;
      }

      // 2. Floor Filter Check
      const targetFloor = this.currentFloor === 'G' ? 0 : this.currentFloor === 'B' ? -1 : parseInt(this.currentFloor, 10);
      const locFloor = (loc.floor === null || loc.floor === undefined) ? 0 : loc.floor;
      if (this.currentFloor !== 'All' && !isNaN(targetFloor) && locFloor !== targetFloor) return;

      const catInfo = CATEGORIES.find(c => c.id === loc.category);
      const color = catInfo ? catInfo.color : '#1565C0';
      const icon = catInfo ? catInfo.icon : 'place';

      const iconHtml = `
        <div style="background-color: ${color}; width: 28px; height: 28px; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; border: 2px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.35);">
          <i class="material-icons" style="font-size: 16px; line-height: 1;">${icon}</i>
        </div>
      `;
      
      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-marker',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14]
      });

      const marker = L.marker([loc.latitude, loc.longitude], { icon: customIcon }).addTo(this.markersLayer);
      
      const popupContent = document.createElement('div');
      popupContent.innerHTML = `
        <div style="min-width: 190px; font-family: Roboto, sans-serif; padding: 2px;">
          <div style="font-size: 10px; font-weight: 700; color: ${color}; text-transform: uppercase; margin-bottom: 2px;">${catInfo ? catInfo.label : loc.category}</div>
          <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #1A1A2E;">${loc.name}</h3>
          <div style="margin: 0 0 10px 0; font-size: 12px; color: #5F6368; display: flex; align-items: center; gap: 6px;">
            <span>Floor ${locFloor === 0 ? 'G (Ground)' : locFloor}</span>
            ${loc.isAccessible ? '<span style="color: #2E7D32; font-weight: 600;">• Accessible</span>' : ''}
          </div>
          <div style="display: flex; gap: 6px;">
            <button id="btn-to-${loc.id}" style="flex: 1; padding: 6px 10px; background: #1565C0; color: white; border: none; border-radius: 6px; font-weight: 700; font-size: 12px; cursor: pointer;">
              Navigate
            </button>
            <button id="btn-detail-${loc.id}" style="padding: 6px 10px; background: #F0F4F8; color: #1565C0; border: 1px solid #CFD8DC; border-radius: 6px; font-weight: 700; font-size: 12px; cursor: pointer;">
              Details
            </button>
          </div>
        </div>
      `;
      
      marker.bindPopup(popupContent);
      marker.on('popupopen', () => {
        const btnNav = popupContent.querySelector(`#btn-to-${loc.id}`) as HTMLElement;
        if (btnNav) {
           btnNav.onclick = () => {
             this.mapService.setEnd(loc);
             marker.closePopup();
           };
        }
        const btnDetail = popupContent.querySelector(`#btn-detail-${loc.id}`) as HTMLElement;
        if (btnDetail) {
           btnDetail.onclick = () => {
             this.router.navigate(['/destination', loc.id]);
           };
        }
      });
    });
  }

  onFloorChange(f: string) {
    this.currentFloor = f;
    this.renderMarkers(this.mapService.locations.value, this.mapService.activeCategory.value);
  }

  private locateUser() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        L.circleMarker([pos.coords.latitude, pos.coords.longitude], {
          radius: 8, fillColor: '#4285F4', color: '#fff', weight: 2, fillOpacity: 1
        }).addTo(this.map);
      });
    }
  }
}
