import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service/user.service';
 
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-8">
 
      <!-- Header -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-white tracking-tight">👤 Utilisateurs</h2>
        <p class="text-slate-500 text-sm mt-1">Gérer les comptes utilisateurs</p>
      </div>
 
      <!-- Formulaire -->
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
        <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
          {{ editingId ? '✏️ Modifier l\'utilisateur' : '➕ Nouvel utilisateur' }}
        </h3>
        <div class="flex flex-wrap gap-3">
          <input
            [(ngModel)]="form.username"
            placeholder="Username"
            class="flex-1 min-w-36 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
          <input
            [(ngModel)]="form.email"
            placeholder="Email"
            class="flex-1 min-w-48 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
          <input
            [(ngModel)]="form.password"
            placeholder="Password"
            type="password"
            class="flex-1 min-w-36 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
          <button
            (click)="editingId ? update() : create()"
            class="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors cursor-pointer">
            {{ editingId ? 'Modifier' : 'Ajouter' }}
          </button>
          <button
            *ngIf="editingId"
            (click)="cancelEdit()"
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
              <th class="text-right text-xs font-semibold text-slate-500 uppercase tracking-widest px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users; let odd = odd"
                [class]="odd ? 'bg-slate-900' : 'bg-slate-950'"
                class="border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors">
              <td class="px-6 py-4 text-slate-600 text-sm font-mono">#{{ user.id }}</td>
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
                <div class="flex justify-end gap-2">
                  <button (click)="edit(user)"
                    class="text-xs bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white border border-slate-700 hover:border-indigo-500 px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                    ✏️ Modifier
                  </button>
                  <button (click)="delete(user.id)"
                    class="text-xs bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white border border-slate-700 hover:border-red-500 px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                    🗑️ Supprimer
                  </button>
                </div>
              </td>
            </tr>
            <tr *ngIf="users.length === 0">
              <td colspan="4" class="px-6 py-16 text-center text-slate-600 text-sm">
                Aucun utilisateur — ajoutez-en un !
              </td>
            </tr>
          </tbody>
        </table>
 
        <div class="px-6 py-3 border-t border-slate-800 text-xs text-slate-600">
          {{ users.length }} utilisateur(s) au total
        </div>
      </div>
    </div>
  `
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  form = { username: '', email: '', password: '' };
  editingId: number | null = null;
 
  constructor(private userService: UserService) {}
  ngOnInit() { this.load(); }
 
  load()   { this.userService.getAllUsers().subscribe(d => this.users = d); }
  create() { this.userService.createUser(this.form).subscribe(() => { this.resetForm(); this.load(); }); }
  edit(u: any) { this.editingId = u.id; this.form = { username: u.username, email: u.email, password: '' }; }
  update() { this.userService.update(this.editingId!, this.form).subscribe(() => { this.resetForm(); this.load(); }); }
  delete(id: number) { if (confirm('Supprimer cet utilisateur ?')) this.userService.delete(id).subscribe(() => this.load()); }
  cancelEdit() { this.resetForm(); }
  resetForm() { this.form = { username: '', email: '', password: '' }; this.editingId = null; }
}