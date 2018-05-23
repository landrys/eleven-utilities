import { NgModule } from '@angular/core';
import {MatListModule, MatExpansionModule, MatDividerModule, MatInputModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatRadioModule, MatTabsModule, MatMenuModule, MatCardModule, MatIconModule, MatToolbarModule, MatChipsModule, MatButtonModule, MatCheckboxModule} from '@angular/material';

@NgModule({
      imports: [MatListModule, MatExpansionModule, MatDividerModule, MatInputModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatRadioModule, MatTabsModule, MatMenuModule, MatCardModule, MatIconModule, MatToolbarModule, MatChipsModule, MatButtonModule, MatCheckboxModule],
        exports: [MatListModule, MatExpansionModule, MatDividerModule, MatInputModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatRadioModule, MatTabsModule, MatMenuModule, MatCardModule, MatIconModule, MatToolbarModule, MatChipsModule, MatButtonModule, MatCheckboxModule],
})

export class AppMaterialModule { }
