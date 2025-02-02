import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InformationUserService {
  private userInfo: any = null;
  private filial: string | null = null;

  setUserInfo(userInfo: any): void {
    this.userInfo = userInfo;
  }

  getUserInfo(): any {
    return this.userInfo;
  }

  getToken(): string | null {
    return this.userInfo?.token || null;
  }
}
