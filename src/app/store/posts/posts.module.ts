import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { postsFeature } from "./posts.reducer";

@NgModule({
  imports: [StoreModule.forFeature(postsFeature)],
})
export class PostsModule {}
