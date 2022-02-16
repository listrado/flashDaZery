import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public result = '';
  public carregar = '';
  public name = 'ronaldo';
  public search!: string;

  onKey(event: any) { this.name = event.target.value}
  onSubmit(event: any) { return event.target.player.value}

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) { }

  promise1(nome: string) : Promise<string>{
    return new Promise((resolve, reject) => {
      if(nome === 'L'){
        setTimeout(() => {
          resolve('seja bem vindo ' + nome);
        }, 1000);
      }
      else(
        reject('quem e voce? oque faz aqui')
      )
    })
  }
  observable1(nome: string) : Observable<string>{
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next('seja bem vindo ' + nome);
      }, 2000);
      setTimeout(() => {
        subscriber.next('é ' + nome + ' certo?');
      }, 3000);
      setTimeout(() => {
        subscriber.next(nome + ' ta ai ainda?');
      }, 4000);
      setTimeout(() => {
        subscriber.next('tanto faz vai assim mesmo');
      }, 5000);
      setTimeout(() => {
        subscriber.next('seja bem vindo ' + nome);
      }, 6000);
      setTimeout(() => {
        subscriber.complete;
      }, 7000);
    })
  }
  observable2(nome: string) : Observable<string>{
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next('|');
      }, 2000);
      setTimeout(() => {
        subscriber.next('/');
      }, 3000);
      setTimeout(() => {
        subscriber.next('--');
      }, 4000);
      setTimeout(() => {
        subscriber.next('\\');
      }, 5000);
      setTimeout(() => {
        subscriber.next('|');
      }, 6000);
    })
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.search = this.router.url.toString().split("=")[1];

      }
    );

    if(this.search){
      this.name = this.search;
    }

    this.observable1('').subscribe(
      result => console.log(),
      erro => console.log('erro'),
      () => console.log('fim'));

    this.promise1('L').then(result => this.result = result).catch(erro => console.log(erro))

    this.observable1(this.name).subscribe(result =>  this.result = result);

    /*const observer = {
      next: valor => console.log('next: ', valor),
      error: erro => console.log('erro: ', erro),
      complete: () => console.log("fim")
    }*/


    (async () => { 
      for(var i = 1; i <= 15; i++){
        await this.delay(4000);
        console.log(i);
        this.observable2('').subscribe(result =>  this.carregar = result);
      }
    })();


  
  }

}
  