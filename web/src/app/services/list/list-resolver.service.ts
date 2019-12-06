import { Injectable } from '@angular/core';
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { ListService } from './list.service';

@Injectable({
    providedIn: 'root'
})
export class ListResolver implements Resolve<any> {
    constructor(private listService: ListService) {}

    resolve(
        aroute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return this.listService.getTodoList(Number(aroute.params.lid));
    }
}
