import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIcon, MatIconModule } from "@angular/material/icon";

@NgModule({
  exports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule],
})
export class MaterialModule {}
