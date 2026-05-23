// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.html',
//   styleUrl: './app.css'
// })
// export class App {
//   protected readonly title = signal('test');
// }

import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="flex h-screen bg-slate-950 text-slate-100 font-mono overflow-hidden">

      <!-- Sidebar -->
      <aside class="w-60 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div class="p-6 border-b border-slate-800">
          <h1 class="text-lg font-bold text-white tracking-tight">Test</h1>
        </div>

        <nav class="flex-1 p-4 space-y-1">
          <p class="text-xs text-slate-600 uppercase tracking-widest mb-3 px-3">Menu</p>

          <a routerLink="/users" routerLinkActive="bg-indigo-600 text-white"
             class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm">
            <span class="text-base">👤</span> Utilisateurs
          </a>

          <a routerLink="/entities" routerLinkActive="bg-indigo-600 text-white"
             class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm">
            <span class="text-base">🏢</span> Projets
          </a>
        </nav>
      </aside>

      <!-- Main content -->
      <main class="flex-1 overflow-y-auto bg-slate-950">
        <router-outlet />
      </main>
    </div>
  `
})
export class App {}