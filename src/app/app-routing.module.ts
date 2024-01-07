import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqComponent } from './faq/faq.component';
import { FinanceCalculatorComponent } from './finance-calculator/finance-calculator.component';
import { HomeComponent } from './home/home.component';
import { ListingComponent } from './listing/listing.component';
import { VehicleDetailsComponent } from './listing/vehicle-details/vehicle-details.component';
import { ValueMyCarComponent } from './value-my-car/value-my-car.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { DealerSignUpComponent } from './dealer-sign-up/dealer-sign-up.component'
import { NoVehicleFoundComponent } from './no-vehicle-found/no-vehicle-found.component';
import { SellMyCarComponent } from './sell-my-car/sell-my-car.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { AuthguardGuard } from './helper/authguard.guard';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { YourVehiclesComponent } from './account/your-vehicles/your-vehicles.component';
import { ReceivedOffersComponent } from './account/received-offers/received-offers.component';
import { ReceivedLeadsComponent } from './account/received-leads/received-leads.component';
import { ProfileComponent } from './account/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cars', component: ListingComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'blogs', component: BlogComponent },
  { path: 'who-we-are', component: WhoWeAreComponent },
  { path: 'finance-calculator', component: FinanceCalculatorComponent },
  { path: 'value-my-car', component: ValueMyCarComponent },
  { path: 'listing', component: ListingComponent },
  { path: 'listing-dealer/:dealershipname', component: ListingComponent },
  { path: 'Vehicle-details', component: VehicleDetailsComponent },
  { path: 'dealer-sign-up', component: DealerSignUpComponent },
  { path: 'no-vehicle-found', component: NoVehicleFoundComponent },
  { path: 'sell-my-car', component: SellMyCarComponent },
  {
    path: 'account', component: AccountComponent, canActivate: [AuthguardGuard],
    children: [
      { path: 'your-vehicles', component: YourVehiclesComponent },
      { path: 'offers', component: ReceivedOffersComponent },
      { path: 'leads', component: ReceivedLeadsComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
