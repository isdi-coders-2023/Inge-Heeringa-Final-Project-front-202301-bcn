import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { uiFeature } from "./reducers/ui.reducer";

@NgModule({
  imports: [StoreModule.forFeature(uiFeature)],
})
export class UiModule {}
