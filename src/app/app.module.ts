import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// Must export the config
export const firebaseConfig = {
    apiKey: 'AIzaSyCBUCTO-MI3ru8ZM_aTDjLIKTwjcXpNGt0',
    authDomain: 'luncher-d3328.firebaseapp.com',
    databaseURL: 'https://luncher-d3328.firebaseio.com',
    storageBucket: 'luncher-d3328.appspot.com',
    messagingSenderId: '153306133881'
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    OrderModule,
    UserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(firebaseConfig,myFirebaseAuthConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
