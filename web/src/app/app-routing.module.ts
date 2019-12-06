import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import { UserResolver } from './services/user/user-resolver.service';
import { ListResolver } from './services/list/list-resolver.service';

const routes: Routes = [
    { path: '', redirectTo: '/user', pathMatch: 'full' },
    {
        path: 'user',
        component: UserComponent,
        resolve: { response: UserResolver }
    },
    {
        path: 'user/list/:lid',
        component: TodoListComponent,
        resolve: { list: ListResolver }
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
    providers: [UserResolver]
})
export class AppRoutingModule {}
