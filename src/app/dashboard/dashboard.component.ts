import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../services/shared/auth.service';
import { MenuService } from './../services/menu/menu.service';
import { ToastService } from './../services/toast/toast.service';


import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from "@angular/forms";




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser = {
    name : String,
    email : String
  };

  closeResult = '';
  createForm: FormGroup;

  items : Item[] = []





  constructor(
    public authService: AuthService,
    public menuService: MenuService,
    public toastService: ToastService,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal,
    public fb: FormBuilder
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe(res => {
      this.currentUser.name = res.msg.name;
      this.currentUser.email = res.msg.email;
      // console.log(this.currentUser)
    });

    this.getItems();

    this.createForm = this.fb.group({
      category: [''],
      item: [''],
      price: ['']
    })

  }

  ngOnInit(): void {
  }

  createItem() {
   
    this.menuService.createItem(this.createForm.value).subscribe(
      data => {
        
        // console.log(data);
        this.modalService.dismissAll();
        this.createForm.reset();
        this.getItems();
        this.showSuccess();

      }, 
      
      error => {   
        // console.log(error)
      },
      
      () => {
        // do something when operation successfully complete
      });
    //Consuming service    



  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  getItems(){
    this.menuService.getItems().subscribe(
      data => {
        
        // console.log(data);
        // this.data = data;
        this.items = data;

      }, 
      
      error => {   
        // console.log(error)
      },
      
      () => {
        // do something when operation successfully complete
      });
    //Consuming service  
  }

  showSuccess() {
    this.toastService.show('Item Created!', {
      classname: 'bg-success text-light',
      delay: 2000 ,
      autohide: true,
      // headertext: 'Toast Header'
    });
  }

}


interface Item {
  category: Object;
  item: Object;
  price: number;
}