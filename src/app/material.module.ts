import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { OverlayModule } from '@angular/cdk/overlay';
import { BidiModule } from '@angular/cdk/bidi';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PortalModule } from '@angular/cdk/portal';
import { MatPaginatorModule } from '@angular/material/paginator';

const myModules = [
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatMenuModule,
  MatListModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatTableModule,
  MatSortModule,
  MatDialogModule,
  MatOptionModule,
  MatSelectModule,
  BidiModule, 
  PortalModule, 
  ScrollingModule,
  OverlayModule,
  MatPaginatorModule,
];

@NgModule({
  imports: [...myModules],
  exports: [...myModules],
})
export class MaterialModule {}