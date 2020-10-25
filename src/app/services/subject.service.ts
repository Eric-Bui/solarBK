import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SubjectService {
  subject = new Subject();

  constructor() {}

  sendChangeTime(time) {
    this.subject.next(time); //Triggering an event
  }
  getChangeTime() {
    return this.subject.asObservable();
  }
}
