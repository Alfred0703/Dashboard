import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { SettingsComponent } from './settings/settings.component';
import { ChartsyncComponent } from './dashboard/sync/chartsync/chartsync.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'help', component: TutorialComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'sync', component: ChartsyncComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
