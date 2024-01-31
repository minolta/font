import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Pm } from "./pm";

@Injectable({
  providedIn: "root",
})
export class DustService  {
  constructor(public http: HttpClient) {
  }

  getGraph(id:number, s:any, e:any) {
    let url = environment + "/pm/findbydate";
    return this.http.post<Pm[]>(url, { id: id, s: s, e: e });
  }
}
