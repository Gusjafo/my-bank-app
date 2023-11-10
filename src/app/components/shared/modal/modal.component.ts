import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Output() delete = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Input() message = ''

  deleteProduct() {
    this.delete.emit();
  }

  closeModal() {
    this.close.emit();
  }

}
