import { Component } from '@angular/core';
import { MenuService } from '../../../services/admin/menu.service';
import { CommonModule } from '@angular/common';
import { Menu } from '../../../models/menu';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, ReactiveFormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  title = 'Menu Management';
  formDisabled = true;
  menus: Menu[] = [];
  activeMenus: Menu[] = [];
  menuForm: FormGroup;
  m!: Menu;
  editMode = false;
  router : Router;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private menuService: MenuService, router : Router) {
    this.menuForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(15)]],
      url: ['', [Validators.required, Validators.pattern(/^\w+$/)]],
      isActive: [false],
    });
    this.router = router;
  }

  ngOnInit(): void {
    this.getMenus();
    this.getActiveMenus();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.menuService.getMenuById(params['id']).subscribe((menu: Menu) => {
          this.menuForm.patchValue({
            title: menu.title,
            url: menu.url,
            isActive: menu.isActive,
          });
          this.m = menu;
          this.editMode = true;
          this.formDisabled = false;
        });
      } else {
        this.menuForm.reset();
        this.editMode = false;
        this.formDisabled = true;
      }
    });
  }

  getMenus(): void {
    this.menuService.getMenus().subscribe({
      next:
      (menus: Menu[]) => {
      this.menus = menus;
    },
    error: error => {
      console.log(error);
      this.router.navigate(['/unauthorised']);
    }
  });
  }
  getActiveMenus(): void {
    this.menuService.getActiveMenus().subscribe({
      next:
      (menus: Menu[]) => {
      this.activeMenus = menus;
    },
    error: error => {
      console.log(error);
      this.router.navigate(['/unauthorised']);
    }
  });
  }
  onSubmit(): void {
    if (this.editMode) {
      console.log('edit mode');
      console.log(this.menuForm.value);
      this.menuService.updateMenu(this.m.id, this.menuForm.value).subscribe(() => {
        this.getMenus();
        this.menuForm.reset();
        this.formDisabled = true;
        this.editMode = false;
      });
    } else {
      console.log(this.menuForm.value);
      if (this.menuForm.value.isActive == null) {
        this.menuForm.value.isActive = false;
      }
      this.menuService.createMenu(this.menuForm.value).subscribe(() => {
        this.getMenus();
        this.getActiveMenus();
        this.menuForm.reset();
        this.formDisabled = true;
      });
    }
  }

  resetForm(): void {
    this.menuForm.reset();
    this.formDisabled = true;
    this.editMode = false;
  }

  onEdit(menu: Menu): void {
    this.formDisabled = false;
    this.m = menu;
    this.menuForm.patchValue({
      title: menu.title,
      url: menu.url.split('/')[3],
      isActive: menu.isActive,
    });
    
    this.editMode = true;
    this.getActiveMenus();
  }

  onDelete(id: number): void {
    this.menuService.deleteMenu(id).subscribe(() => {
      this.getMenus();
      this.getActiveMenus();
    });
  }

  isFormDisabled(): void {
    this.formDisabled = false;
    this.editMode = false;
    this.menuForm.reset();
  }
}
