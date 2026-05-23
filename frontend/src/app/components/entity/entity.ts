// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { EntityService } from '../../services/entity-service/entity.service';

// @Component({
//   selector: 'app-entities',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   template: `
//     <div class="p-8">

//       <!-- Header -->
//       <div class="mb-8">
//         <h2 class="text-2xl font-bold text-white tracking-tight">📦 Entités</h2>
//         <p class="text-slate-500 text-sm mt-1">Gérer les entités de l'application</p>
//       </div>

//       <!-- Formulaire -->
//       <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
//         <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
//          Remplir les champs pour ajouter un nouveau
//         </h3>
//         <div class="flex gap-3">
//           <input
//             [(ngModel)]="form.name"
//             placeholder="Nom de l'entité"
//             class="flex-1 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
//           />
//           <button
//             (click)="editingId ? update() : create()"
//             class="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors cursor-pointer">
//             {{ editingId ? 'Modifier' : 'Ajouter' }}
//           </button>
//           <button
//             *ngIf="editingId"
//             (click)="cancelEdit()"
//             class="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors cursor-pointer">
//             Annuler
//           </button>
//         </div>
//       </div>

//       <!-- Table -->
//       <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
//         <table class="w-full">
//           <thead>
//             <tr class="border-b border-slate-800">
//               <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-widest px-6 py-4 w-16">ID</th>
//               <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-widest px-6 py-4">Nom</th>
//               <th class="text-right text-xs font-semibold text-slate-500 uppercase tracking-widest px-6 py-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr *ngFor="let entity of entities; let odd = odd"
//                 [class]="odd ? 'bg-slate-900' : 'bg-slate-950'"
//                 class="border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors">
//               <td class="px-6 py-4 text-slate-600 text-sm font-mono">#{{ entity.id }}</td>
//               <td class="px-6 py-4">
//                 <div class="flex items-center gap-3">
//                   <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
//                   <span class="text-white text-sm font-medium">{{ entity.name }}</span>
//                 </div>
//               </td>
//               <td class="px-6 py-4">
//                 <div class="flex justify-end gap-2">
//                   <button (click)="edit(entity)"
//                     class="text-xs bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white border border-slate-700 hover:border-indigo-500 px-3 py-1.5 rounded-lg transition-all cursor-pointer">
//                     ✏️ Modifier
//                   </button>
//                   <button (click)="delete(entity.id)"
//                     class="text-xs bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white border border-slate-700 hover:border-red-500 px-3 py-1.5 rounded-lg transition-all cursor-pointer">
//                     🗑️ Supprimer
//                   </button>
//                 </div>
//               </td>
//             </tr>
//             <tr *ngIf="entities.length === 0">
//               <td colspan="3" class="px-6 py-16 text-center text-slate-600 text-sm">
//                 Aucune entité — ajoutez-en une !
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         <div class="px-6 py-3 border-t border-slate-800 text-xs text-slate-600">
//           {{ entities.length }} entité(s) au total
//         </div>
//       </div>
//     </div>
//   `
// })
// export class EntitiesComponent implements OnInit {
//   entities: any[] = [];
//   form = { name: '' };
//   editingId: number | null = null;

//   constructor(private entityService: EntityService) {}
//   ngOnInit() { this.load(); }

//   load()   { this.entityService.getAllEntities().subscribe(d => this.entities = d); }
//   create() { this.entityService.createEntity(this.form).subscribe(() => { this.resetForm(); this.load(); }); }
//   edit(e: any) { this.editingId = e.id; this.form = { name: e.name }; }
//   update() { this.entityService.update(this.editingId!, this.form).subscribe(() => { this.resetForm(); this.load(); }); }
//   delete(id: number) { if (confirm('Supprimer cette entité ?')) this.entityService.delete(id).subscribe(() => this.load()); }
//   cancelEdit() { this.resetForm(); }
//   resetForm() { this.form = { name: '' }; this.editingId = null; }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntityService } from '../../services/entity-service/entity.service';

@Component({
  selector: 'app-entities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex h-full">

      <!-- Liste principale -->
      <div class="flex-1 p-8 overflow-y-auto">

        <div class="mb-8">
          <h2 class="text-2xl font-bold text-white tracking-tight">📦 Entités / Projets</h2>
          <p class="text-slate-500 text-sm mt-1">Gérer les projets de l'application</p>
        </div>

        <!-- Formulaire -->
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
          <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
            {{ editingId ? "Modifier le projet" : "Nouveau projet" }}
          </h3>
          <div class="flex gap-3">
            <input [(ngModel)]="form.name" placeholder="Nom du projet"
              class="flex-1 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition" />
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
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-widest px-6 py-4">Nom</th>
                <th class="text-left text-xs font-semibold text-slate-500 uppercase tracking-widest px-6 py-4">Membres</th>
                <th class="text-right text-xs font-semibold text-slate-500 uppercase tracking-widest px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let entity of entities; let odd = odd"
                  (click)="selectEntity(entity)"
                  [class.bg-emerald-600]="selectedEntity?.id === entity.id"
                  [class.bg-slate-950]="!odd && selectedEntity?.id !== entity.id"
                  [class.bg-slate-900]="odd && selectedEntity?.id !== entity.id"
                  class="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors cursor-pointer">
                <td class="px-6 py-4 text-slate-400 text-sm font-mono">#{{ entity.id }}</td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0"></div>
                    <span class="text-white text-sm font-medium">{{ entity.name }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span *ngIf="entity.userEntities?.length > 0"
                        class="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full">
                    {{ entity.userEntities.length }} membre(s)
                  </span>
                  <span *ngIf="!entity.userEntities?.length" class="text-xs text-slate-600 italic">aucun</span>
                </td>
                <td class="px-6 py-4" (click)="$event.stopPropagation()">
                  <div class="flex justify-end gap-2">
                    <button (click)="edit(entity)"
                      class="text-xs bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white border border-slate-700 px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                      ✏️
                    </button>
                    <button (click)="delete(entity.id)"
                      class="text-xs bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white border border-slate-700 px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
              <tr *ngIf="entities.length === 0">
                <td colspan="4" class="px-6 py-16 text-center text-slate-600 text-sm">Aucun projet</td>
              </tr>
            </tbody>
          </table>
          <div class="px-6 py-3 border-t border-slate-800 text-xs text-slate-600">
            {{ entities.length }} projet(s) · cliquez sur une ligne pour voir ses membres
          </div>
        </div>
      </div>

      <!-- Panneau latéral -->
      <div *ngIf="selectedEntity"
           class="w-80 bg-slate-900 border-l border-slate-800 flex flex-col">

        <div class="p-5 border-b border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg">
              📦
            </div>
            <div>
              <p class="text-white font-semibold text-sm">{{ selectedEntity.name }}</p>
              <p class="text-slate-500 text-xs">{{ selectedEntity.userEntities?.length || 0 }} membre(s)</p>
            </div>
          </div>
          <button (click)="selectedEntity = null"
            class="text-slate-500 hover:text-white transition-colors cursor-pointer text-xl leading-none">✕</button>
        </div>

        <div class="flex-1 overflow-y-auto p-5">
          <p class="text-xs text-slate-500 uppercase tracking-widest mb-4">
            Membres du projet
          </p>
          <div *ngIf="selectedEntity.userEntities?.length > 0; else noMembers" class="space-y-2">
            <div *ngFor="let ue of selectedEntity.userEntities"
                 class="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xs font-bold flex-shrink-0">
                {{ ue.user.username[0].toUpperCase() }}
              </div>
              <div class="min-w-0">
                <p class="text-white text-sm font-medium truncate">{{ ue.user.username }}</p>
                <p class="text-slate-500 text-xs truncate">{{ ue.user.email }}</p>
              </div>
            </div>
          </div>
          <ng-template #noMembers>
            <div class="text-center py-10">
              <p class="text-slate-600 text-sm">Aucun membre</p>
              <p class="text-slate-700 text-xs mt-1">Assignez des users depuis la page Users</p>
            </div>
          </ng-template>
        </div>

        <div class="p-4 border-t border-slate-800">
          <button (click)="edit(selectedEntity)"
            class="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors cursor-pointer">
            ✏️ Modifier ce projet
          </button>
        </div>
      </div>

    </div>
  `
})
export class EntitiesComponent implements OnInit {
  entities: any[]     = [];
  selectedEntity: any = null;
  form = { name: '' };
  editingId: number | null = null;

  constructor(private entityService: EntityService) {}
  ngOnInit() { this.load(); }

  load() {
    this.entityService.getAllEntities().subscribe(d => {
      this.entities = d;
      if (this.selectedEntity)
        this.selectedEntity = this.entities.find(e => e.id === this.selectedEntity.id) || null;
    });
  }

  create() { this.entityService.createEntity(this.form).subscribe(() => { this.resetForm(); this.load(); }); }
  edit(e: any) { this.editingId = e.id; this.form = { name: e.name }; }
  update() { this.entityService.update(this.editingId!, this.form).subscribe(() => { this.resetForm(); this.load(); }); }
  delete(id: number) {
    if (confirm('Supprimer ce projet ?'))
      this.entityService.delete(id).subscribe(() => {
        if (this.selectedEntity?.id === id) this.selectedEntity = null;
        this.load();
      });
  }

  selectEntity(entity: any) {
    this.selectedEntity = this.selectedEntity?.id === entity.id ? null : entity;
  }

  cancelEdit() { this.resetForm(); }
  resetForm()  { this.form = { name: '' }; this.editingId = null; }
}