import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImagenModalPage } from './imagen-modal.page';

describe('ImagenModalPage', () => {
  let component: ImagenModalPage;
  let fixture: ComponentFixture<ImagenModalPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ImagenModalPage],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(ImagenModalPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/*
this.fotoService.deleteFoto(id).then(async (res) => {

      this.toastr.error('Hecho', 'Imagen eliminada',);
    }, (err) => {

    });
 */
