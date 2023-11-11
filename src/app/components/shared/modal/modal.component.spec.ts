import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { EventEmitter } from '@angular/core';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
    });
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit delete event when deleteProduct is called', () => {
    let emitted = false;
    component.delete.subscribe(() => (emitted = true));

    component.deleteProduct();

    expect(emitted).toBe(true);
  });

  it('should emit close event when closeModal is called', () => {
    let emitted = false;
    component.close.subscribe(() => (emitted = true));

    component.closeModal();

    expect(emitted).toBe(true);
  });

  it('should have a default empty message', () => {
    expect(component.message).toBe('');
  });

  it('should update message when @Input message is set', () => {
    const newMessage = 'New Message';
    component.message = newMessage;

    expect(component.message).toBe(newMessage);
  });
});
