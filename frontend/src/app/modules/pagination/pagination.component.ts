import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() totalPages!: number;
  @Input() currentPage = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  pageNumbers: number[] = []; 
  maxPagesToShow: number = 5;  // Máximo de páginas exibidas (ajustável)

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages'] || changes['currentPage']) {
      this.updatePageNumbers();
    }
  }

  updatePageNumbers(): void {
    this.pageNumbers = [];
    const startPage = Math.max(1, this.currentPage - Math.floor(this.maxPagesToShow / 2));
    const endPage = Math.min(this.totalPages, startPage + this.maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      this.pageNumbers.push(i);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.updatePageNumbers(); // Atualiza os números exibidos
      this.pageChange.emit(page); // Emite o evento com o número da página
    }
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  isPageActive(page: number): boolean {
    return page === this.currentPage;
  }
}
