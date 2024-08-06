import { Component, computed, DestroyRef, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink] 
})
export class UserTasksComponent {
  //userId= input.required<string>();
  private usersService = inject(UsersService);
  private activedRoute = inject(ActivatedRoute);
  private destoryRef = inject(DestroyRef);
  userName='';

  //userName = computed(()=> this.usersService.users.find(u => u.id === this.userId())?.name);

  ngOnInit(): void {
    console.log(this.activedRoute);
    const subscription = this.activedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.userName =
          this.usersService.users.find((u) => u.id === paramMap.get('userId'))
            ?.name || '';
      },
    });

    this.destoryRef.onDestroy(()=> subscription.unsubscribe());
  }
}
