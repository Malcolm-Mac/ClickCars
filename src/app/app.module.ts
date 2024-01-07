import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ListingComponent } from './listing/listing.component';
import { FinanceCalculatorComponent } from './finance-calculator/finance-calculator.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { BlogComponent } from './blog/blog.component';
import { ValueMyCarComponent } from './value-my-car/value-my-car.component';
import { VehicleDetailsComponent } from './listing/vehicle-details/vehicle-details.component';
import { InforDataService } from './service/infor-data.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import * as $ from 'jquery';
import { SearchingPipePipe } from './searching-pipe.pipe';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DragScrollModule } from 'ngx-drag-scroll';
import { SimilarCarsComponent } from './listing/similar-cars/similar-cars.component';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DealerSignUpComponent } from './dealer-sign-up/dealer-sign-up.component';
import { SellMyCarComponent } from './sell-my-car/sell-my-car.component';
import { AccountComponent } from './account/account.component';
import { NoVehicleFoundComponent } from './no-vehicle-found/no-vehicle-found.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ProfileComponent } from './account/profile/profile.component';
import { ReceivedLeadsComponent } from './account/received-leads/received-leads.component';
import { ReceivedOffersComponent } from './account/received-offers/received-offers.component';
import { YourVehiclesComponent } from './account/your-vehicles/your-vehicles.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './shared/custom-reuse-strategy';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    ListingComponent,
    FinanceCalculatorComponent,
    ContactUsComponent,
    WhoWeAreComponent,
    AboutUsComponent,
    FaqComponent,
    BlogComponent,
    ValueMyCarComponent,
    VehicleDetailsComponent,
    SimilarCarsComponent,
    SearchingPipePipe,
    DealerSignUpComponent,
    SellMyCarComponent,
    AccountComponent,
    NoVehicleFoundComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    ReceivedLeadsComponent,
    ReceivedOffersComponent,
    YourVehiclesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    DragScrollModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {

  }
}
