import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { environment } from "src/environments/environment";

const routes: Routes = [
  {
    path: "calendar/:id",
    children: [
      {
        path: "posterboard",
        loadChildren: () =>
          import("./posterboard/posterboard.module").then(
            (m) => m.PosterboardModule
          ),
      },
      {
        path: "tile",
        loadChildren: () =>
          import("./tile/tile.module").then((m) => m.TileModule),
      },
      {
        path: "stream",
        loadChildren: () =>
          import("./stream/stream.module").then((m) => m.StreamModule),
      },
      {
        path: "agenda",
        loadChildren: () =>
          import("./agenda/agenda.module").then((m) => m.AgendaModule),
      },
      {
        path: "month",
        loadChildren: () =>
          import("./month/month.module").then((m) => m.MonthModule),
      },
      {
        path: "week",
        loadChildren: () =>
          import("./week/week.module").then((m) => m.WeekModule),
      },
      {
        path: "",
        redirectTo: environment.defaultView,
        pathMatch: "full",
      },
    ],
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
