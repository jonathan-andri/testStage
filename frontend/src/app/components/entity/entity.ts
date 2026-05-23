import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntityService } from '../../services/entity-service/entity.service';

@Component({
  selector: 'app-entities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-8">

      <!-- Header -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-white tracking-tight">📦 Entités</h2>
        <p class="text-slate-500 text-sm mt-1">Gérer les entités de l'application</p>
      </div>

      <!-- Formulaire -->
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
        <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
          {{ editingId ? '✏️ Modifier l\'entité' : '➕ Nouvelle entité' }}
        </h3>
        <div class="flex gap-3">
          <input
            [(ngModel)]="form.name"
            placeholder="Nom de l'entité"
            class="flex-1 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
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
              <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-widest px-6 py-4">Nom</th>
              <th class="text-right text-xs font-semibold text-slate-500 uppercase tracking-widest px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let entity of entities; let odd = odd"
                [class]="odd ? 'bg-slate-900' : 'bg-slate-950'"
                class="border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors">
              <td class="px-6 py-4 text-slate-600 text-sm font-mono">#{{ entity.id }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span class="text-white text-sm font-medium">{{ entity.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex justify-end gap-2">
                  <button (click)="edit(entity)"
                    class="text-xs bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white border border-slate-700 hover:border-indigo-500 px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                    ✏️ Modifier
                  </button>
                  <button (click)="delete(entity.id)"
                    class="text-xs bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white border border-slate-700 hover:border-red-500 px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                    🗑️ Supprimer
                  </button>
                </div>
              </td>
            </tr>
            <tr *ngIf="entities.length === 0">
              <td colspan="3" class="px-6 py-16 text-center text-slate-600 text-sm">
                Aucune entité — ajoutez-en une !
              </td>
            </tr>
          </tbody>
        </table>

        <div class="px-6 py-3 border-t border-slate-800 text-xs text-slate-600">
          {{ entities.length }} entité(s) au total
        </div>
      </div>
    </div>
  `
})
export class EntitiesComponent implements OnInit {
  entities: any[] = [];
  form = { name: '' };
  editingId: number | null = null;

  constructor(private entityService: EntityService) {}
  ngOnInit() { this.load(); }

  load()   { this.entityService.getAllEntities().subscribe(d => this.entities = d); }
  create() { this.entityService.createEntity(this.form).subscribe(() => { this.resetForm(); this.load(); }); }
  edit(e: any) { this.editingId = e.id; this.form = { name: e.name }; }
  update() { this.entityService.update(this.editingId!, this.form).subscribe(() => { this.resetForm(); this.load(); }); }
  delete(id: number) { if (confirm('Supprimer cette entité ?')) this.entityService.delete(id).subscribe(() => this.load()); }
  cancelEdit() { this.resetForm(); }
  resetForm() { this.form = { name: '' }; this.editingId = null; }
}