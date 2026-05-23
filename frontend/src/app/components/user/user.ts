import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service/user.service';
import { EntityService } from '../../services/entity-service/entity.service';
import { UserEntityService } from '../../services/user-entity-service/user-entity.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex h-full">

      <!-- Liste principale -->
      <div class="flex-1 p-8 overflow-y-auto">

        <!-- Header -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-white tracking-tight">👤 Utilisateurs</h2>
          <p class="text-slate-500 text-sm mt-1">Gérer les comptes et leurs projets</p>
        </div>

        <!-- Formulaire -->
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
          <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
            {{ editingId ? "Modifier l'utilisateur" : "Nouvel utilisateur" }}
          </h3>
          <div class="flex flex-wrap gap-3 mb-4">
            <input [(ngModel)]="form.username" placeholder="Username"
              class="flex-1 min-w-32 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition" />
            <input [(ngModel)]="form.email" placeholder="Email"
              class="flex-1 min-w-44 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition" />
            <input [(ngModel)]="form.password" placeholder="Password" type="password"
              class="flex-1 min-w-32 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition" />
          </div>

          <!-- Sélection des projets -->
          <div class="mb-4">
            <p class="text-xs text-slate-500 uppercase tracking-widest mb-3">Assigner des projets</p>
            <div *ngIf="allEntities.length > 0; else noEntities" class="flex flex-wrap gap-2">
              <label *ngFor="let entity of allEntities"
                     class="flex items-center gap-2 cursor-pointer border rounded-lg px-3 py-2 text-sm transition-all"
                     [class.border-indigo-500]="isSelected(entity.id)"
                     [class.bg-indigo-600]="isSelected(entity.id)"
                     [class.text-white]="isSelected(entity.id)"
                     [class.border-slate-700]="!isSelected(entity.id)"
                     [class.bg-slate-800]="!isSelected(entity.id)"
                     [class.text-slate-400]="!isSelected(entity.id)">
                <input type="checkbox"
                       [checked]="isSelected(entity.id)"
                       (change)="toggleEntity(entity.id)"
                       class="accent-white" />
                {{ entity.name }}
              </label>
            </div>
            <ng-template #noEntities>
              <p class="text-slate-600 text-xs italic">Aucun projet disponible — créez-en dans Entities.</p>
            </ng-template>
          </div>

          <div class="flex gap-3">
            <button (click)="editingId ? update() : create()"
              class="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors cursor-pointer">
              {{ editingId ? 'Modifier' : 'Ajouter' }}
            </button>
            <button *ngIf="editingId" (click)="cancelEdit()"
              class="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors cursor-pointer">
              Annuler
            </button>
          </div>
        </div>

        <!-- Table -->
        <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <table class="w-full">
            <thead>
              <tr class="border-b border-slate-800">
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-widest px-6 py-4 w-16">ID</th>
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-widest px-6 py-4">Username</th>
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-widest px-6 py-4">Email</th>
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-widest px-6 py-4">Projets</th>
                <th class="text-right text-xs font-semibold text-slate-500 uppercase tracking-widest px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of users; let odd = odd"
                  (click)="selectUser(user)"
                  [class.bg-indigo-600]="selectedUser?.id === user.id"
                  [class.bg-slate-950]="!odd && selectedUser?.id !== user.id"
                  [class.bg-slate-900]="odd && selectedUser?.id !== user.id"
                  class="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors cursor-pointer">
                <td class="px-6 py-4 text-slate-400 text-sm font-mono">#{{ user.id }}</td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xs font-bold">
                      {{ user.username[0].toUpperCase() }}
                    </div>
                    <span class="text-white text-sm font-medium">{{ user.username }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-slate-400 text-sm">{{ user.email }}</td>
                <td class="px-6 py-4">
                  <span *ngIf="user.userEntities?.length > 0"
                        class="text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2.5 py-1 rounded-full">
                    {{ user.userEntities.length }} projet(s)
                  </span>
                  <span *ngIf="!user.userEntities?.length" class="text-xs text-slate-600 italic">aucun</span>
                </td>
                <td class="px-6 py-4" (click)="$event.stopPropagation()">
                  <div class="flex justify-end gap-2">
                    <button (click)="edit(user)"
                      class="text-xs bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white border border-slate-700 px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                      ✏️
                    </button>
                    <button (click)="delete(user.id)"
                      class="text-xs bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white border border-slate-700 px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
              <tr *ngIf="users.length === 0">
                <td colspan="5" class="px-6 py-16 text-center text-slate-600 text-sm">Aucun utilisateur</td>
              </tr>
            </tbody>
          </table>
          <div class="px-6 py-3 border-t border-slate-800 text-xs text-slate-600">
            {{ users.length }} utilisateur(s) · cliquez sur une ligne pour voir ses projets
          </div>
        </div>
      </div>

      <!-- Panneau latéral -->
      <div *ngIf="selectedUser"
           class="w-80 bg-slate-900 border-l border-slate-800 flex flex-col">

        <div class="p-5 border-b border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
              {{ selectedUser.username[0].toUpperCase() }}
            </div>
            <div>
              <p class="text-white font-semibold text-sm">{{ selectedUser.username }}</p>
              <p class="text-slate-500 text-xs">{{ selectedUser.email }}</p>
            </div>
          </div>
          <button (click)="selectedUser = null"
            class="text-slate-500 hover:text-white transition-colors cursor-pointer text-xl leading-none">✕</button>
        </div>

        <div class="flex-1 overflow-y-auto p-5">
          <p class="text-xs text-slate-500 uppercase tracking-widest mb-4">
            Projets ({{ selectedUser.userEntities?.length || 0 }})
          </p>
          <div *ngIf="selectedUser.userEntities?.length > 0; else noProjets" class="space-y-2">
            <div *ngFor="let ue of selectedUser.userEntities"
                 class="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 flex items-center gap-3">
              <div class="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></div>
              <span class="text-white text-sm">{{ ue.entity.name }}</span>
            </div>
          </div>
          <ng-template #noProjets>
            <div class="text-center py-10">
              <p class="text-slate-600 text-sm">Aucun projet assigné</p>
            </div>
          </ng-template>
        </div>

        <div class="p-4 border-t border-slate-800">
          <button (click)="edit(selectedUser)"
            class="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors cursor-pointer">
            ✏️ Modifier cet utilisateur
          </button>
        </div>
      </div>

    </div>
  `
})
export class UsersComponent implements OnInit {
  users: any[]       = [];
  allEntities: any[] = [];
  selectedEntityIds: number[] = [];
  selectedUser: any  = null;
  form = { username: '', email: '', password: '' };
  editingId: number | null = null;

  constructor(
    private userService: UserService,
    private entityService: EntityService,
    private userEntityService: UserEntityService
  ) {}

  ngOnInit() {
    this.load();
    this.entityService.getAllEntities().subscribe(d => this.allEntities = d);
  }

  load() {
    this.userService.getAllUsers().subscribe(d => {
      this.users = d;
      if (this.selectedUser)
        this.selectedUser = this.users.find(u => u.id === this.selectedUser.id) || null;
    });
  }

  isSelected(id: number)  { return this.selectedEntityIds.includes(id); }

  toggleEntity(id: number) {
    this.selectedEntityIds = this.isSelected(id)
      ? this.selectedEntityIds.filter(e => e !== id)
      : [...this.selectedEntityIds, id];
  }

  // create() {
  //   this.userService.createUser({ ...this.form, entityIds: this.selectedEntityIds })
  //     .subscribe(() => { this.resetForm(); this.load(); });
  // }

  create() {
    this.userService.createUser({ ...this.form })
    .subscribe(() => { this.resetForm(); this.load(); });
    this.userEntityService.createUserEntity({ userId: this.editingId!, entityId: this.selectedEntityIds }).subscribe(() => {
      this.resetForm(); this.load();
    }); 
  }
//   create() {
//     console.log(this.form)
//   this.userService.createUser({ ...this.form })
//     .pipe(
//       switchMap(newUser => {
//         // Si aucun projet sélectionné, on skip
//         if (this.selectedEntityIds.length === 0) return of(null);

//         // Crée une UserEntity pour chaque projet sélectionné
//         const requests = this.selectedEntityIds.map(entityId =>
//           this.userEntityService.createUserEntity({
//             userId: newUser.id,   // ← l'ID vient de la réponse du user créé
//             entityId: entityId
//           })
//         );

//         // Lance tous les appels en parallèle
//         return forkJoin(requests);
//       })
//     )
//     .subscribe(() => {
//       this.resetForm();
//       this.load();
//     });
// }

  edit(user: any) {
    this.editingId = user.id;
    this.form = { username: user.username, email: user.email, password: '' };
    this.selectedEntityIds = user.userEntities?.map((ue: any) => ue.entityId) || [];
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  update() {
    this.userService.update(this.editingId!, { ...this.form, entityIds: this.selectedEntityIds })
      .subscribe(() => { this.resetForm(); this.load(); });
  }

  delete(id: number) {
    if (confirm('Supprimer cet utilisateur ?'))
      this.userService.delete(id).subscribe(() => {
        if (this.selectedUser?.id === id) this.selectedUser = null;
        this.load();
      });
  }

  selectUser(user: any) {
    this.selectedUser = this.selectedUser?.id === user.id ? null : user;
  }

  cancelEdit() { this.resetForm(); }
  resetForm()  {
    this.form = { username: '', email: '', password: '' };
    this.editingId = null;
    this.selectedEntityIds = [];
  }
}