// src\app\core\services\personal-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PersonalDataService {
  readonly fullName = 'Antonio Jesús Marchena Guerrero';
  readonly email = 'antonioj.marchena.dev@gmail.com';
  readonly phone = '+34 634 81 76 19';
  readonly linkedin = 'https://linkedin.com/in/aj-marchena';
  readonly github = 'https://github.com/AJMG-95';
}
