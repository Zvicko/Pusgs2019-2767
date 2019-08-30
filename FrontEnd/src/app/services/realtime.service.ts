import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

declare var $;
@Injectable({
  providedIn: 'root'
})
export class RealtimeService {
  private proxy: any;  
  private proxyName: string = 'notifications';  
  private connection: any;  
  public connectionExists: Boolean; 

  public notificationReceived: EventEmitter < string >; 
  constructor() {
    this.notificationReceived = new EventEmitter<string>();
    this.connectionExists = false;  
    // create a hub connection  
    this.connection = $.hubConnection("http://localhost:52295/");
    let jwt = localStorage.jwt
    this.connection.qs = { "token" : `Bearer ${jwt}` };
    // create new proxy with the given name 
    this.proxy = this.connection.createHubProxy(this.proxyName);  

   }

   public startConnection(): Observable<Boolean> { 
      
    return Observable.create((observer) => {
       
        this.connection.start()
        .done((data: any) => {  
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id)
            this.connectionExists = true;

            observer.next(true);
            observer.complete();
        })
        .fail((error: any) => {  
            console.log('Could not connect ' + error);
            this.connectionExists = false;

            observer.next(false);
            observer.complete(); 
        });  
      });
  }

  public registerForTimerEvents() : Observable<string> {
      
    return Observable.create((observer) => {

        this.proxy.on('setRealTime', (data: string) => {  
            console.log('received time: ' + data);  
            observer.next(data);
        });  
    });      
  }

  public StopTimer() {
      this.proxy.invoke("StopTimeServerUpdates");
  }

  public StartTimer() {
      this.proxy.invoke("TimeServerUpdates");
  }
}
