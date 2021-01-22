import { Component, OnInit } from '@angular/core';
import { MenuService } from './../services/menu/menu.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  data : Item[] = []


  constructor(public menuService: MenuService) { 
    this.menuService.getItems().subscribe(
      data => {
        
        console.log(data);
        this.data = data;
        // let isBurger = data[].category
        // console.log(isBurger)

      }, 
      
      error => {   
        console.log(error)
      },
      
      () => {
        // do something when operation successfully complete
      });
    //Consuming service  
  }

  ngOnInit(): void {
  }

}


interface Item {
  category: String;
  item: String;
  price: number;
}