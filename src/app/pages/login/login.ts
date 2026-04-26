import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  template: `
    <div class="login-container">
      <div class="login-box">
        <h2>Inicia Sesión</h2>
        <p>Para ver tu historial o hacer pedidos necesitas una cuenta.</p>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Correo Electrónico</label>
            <input type="email" formControlName="email" placeholder="usuario@ejemplo.com" />
            @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
              <span class="error">Ingresa un correo válido.</span>
            }
          </div>
          
          <div class="form-group">
            <label>Contraseña</label>
            <input type="password" formControlName="password" placeholder="••••••••" />
            @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
              <span class="error">Mínimo 6 caracteres.</span>
            }
          </div>
          
          <button type="submit" [disabled]="loginForm.invalid">Entrar</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex; justify-content: center; align-items: center; min-height: 70vh;
      animation: fadeUp 0.4s ease both;
    }
    .login-box {
      background: var(--surface2); border: 1px solid var(--border);
      border-radius: var(--radius-lg); padding: 30px; width: 100%; max-width: 400px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    }
    h2 { color: var(--text1); font-size: 1.5rem; margin-bottom: 8px; }
    p { color: var(--text2); font-size: 0.9rem; margin-bottom: 24px; }
    .form-group { margin-bottom: 16px; display: flex; flex-direction: column; gap: 6px; }
    label { font-size: 0.85rem; font-weight: 600; color: var(--text2); }
    input { padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border); background: var(--surface); color: var(--text1); transition: 0.2s; }
    input:focus { border-color: var(--accent); outline: none; }
    .error { color: #f44336; font-size: 0.8rem; }
    button { background: var(--accent); color: white; border: none; padding: 14px; border-radius: var(--radius-sm); font-weight: 700; cursor: pointer; transition: 0.2s; margin-top: 8px; width: 100%; }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    button:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(255,107,53,0.3); }
    
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private authSvc = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.authSvc.login(this.loginForm.value.email!);
      this.router.navigate(['/']);
    }
  }
}
