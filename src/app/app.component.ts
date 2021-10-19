import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from './service/api.service';
import { TaskModel } from './task.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  formValue : FormGroup;
  taskModelObj : TaskModel = new TaskModel();
  taskList:any;
  showAdde!: boolean;
  showUpdate!: boolean;

  constructor(private formbuilder : FormBuilder, private api : ApiService) { }

  ngOnInit() {
    this.formValue = this.formbuilder.group({
      taskName : ['', Validators.required],
      projectName : ['', Validators.required],
      comments : ['']
    })
    this.getTaskList();
  }
  // clickAddTask(){
  //   this.formValue.reset();
  //   this.showAdde = true;
  //   this.showUpdate = false;
  // }
  postTaskDetails(){
    this.taskModelObj.taskName = this.formValue.value.taskName;
    this.taskModelObj.projectName = this.formValue.value.projectName;
    this.taskModelObj.comments = this.formValue.value.comments;
    if(this.formValue.valid){
      
    
    this.api.postTask(this.taskModelObj).subscribe(res=>{
      console.log(res);
      alert("Task added sucessfully");
      let ref = document.getElementById('cancel');
      ref.click();
      this.formValue.reset();
      this.getTaskList();
    },
    error=>{
      alert("something went wrong");
    })
  }else{
    alert("Please fill the form");
  }
  }


  getTaskList(){
    this.api.getTask().subscribe(res=>{
      this.taskList = res;
    })
  }

  deletedTask(item:any){
    this.api.deleteTask(item.id).subscribe(res=>{
      console.log("Task Deleted");
      this.getTaskList();
    })
  }

  onEdit(item:any){
    // this.showAdde = false;
    // this.showUpdate = true;
    this.taskModelObj.id = item.id;
    this.formValue.controls['taskName'].setValue(item.taskName);
    this.formValue.controls['projectName'].setValue(item.projectName);
    this.formValue.controls['comments'].setValue(item.comments);
  }
  updateTaskDetails(){
    this.taskModelObj.taskName = this.formValue.value.taskName;
    this.taskModelObj.projectName = this.formValue.value.projectName;
    this.taskModelObj.comments = this.formValue.value.comments;

    this.api.updatedTask(this.taskModelObj, this.taskModelObj.id)
    .subscribe(res=>{
      alert("Updated sucessfully");
      let ref = document.getElementById('cancel');
      ref.click();
      this.formValue.reset();
      this.getTaskList();
    })
  }

}
