import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesComponent } from './sales.component';
import { SaleAccountscomponent } from './saleAccounts/SaleAccounts.component';
import { SalesTermComponent } from './sales-term/sales-term.component';
import { SaleEntryComponent } from './saleEntry/saleEntry.component';
import { SaleReturnComponent } from './saleReturn/saleReturn.component';
import { creditNoteComponent } from './creditDebitNote/creditNote.component';
import { DebitNoteComponent } from './creditDebitNote/debitNote.component';
import { SalesReferencesComponent } from './salesReference/salesReferences.component';
import { SaleQutationComponent } from './sale-qutation/sale-qutation.component';
import { CostSheetComponent } from './costSheet/costSheet.component'
import { InvoiceKnockOffComponent } from './invoice-knock-off/invoice-knock-off.component';
const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    children: [
      { path: 'sales/saleAccounts', component: SaleAccountscomponent, data: { permission: 'Sales.SaleAccounts' } },
      { path: 'sales/sales-term', component: SalesTermComponent, data: { permission: 'Sales.OETerms' } },
      { path: 'sales/saleEntry', component: SaleEntryComponent, data: { permission: 'Sales.SaleEntry' } },
      { path: 'sales/saleReturn', component: SaleReturnComponent, data: { permission: 'Sales.SaleReturn' } },
      // { path: 'sales/creditDebitNote', component: CreditDebitNoteComponent, data: { permission: 'Sales.SaleEntry' }  }, 
      { path: 'sales/creditNote', component: creditNoteComponent, data: { permission: 'Sales.CreditDebitNotes' } },
      { path: 'sales/debitNote', component: DebitNoteComponent, data: { permission: 'Sales.CreditDebitNotes' } },
      { path: 'sales/salesReference', component: SalesReferencesComponent, data: { permission: 'Sales.SalesReferences' } },
      { path: 'sales/sale-qutation', component: SaleQutationComponent, data: { permission: 'Pages.OEQH' } },
      // { path: 'sales/costSheet', component: CostSheetComponent, data: { permission: 'Pages.OECSH' } }
      { path: 'sales/invoice-knock-off', component: InvoiceKnockOffComponent, data: { permission: 'Pages.OEINVKNOCKH' } },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
