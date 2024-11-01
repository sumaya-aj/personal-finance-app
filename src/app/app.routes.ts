import { Routes } from '@angular/router';
import { DashboardOverviewComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import { PotsOverviewComponent } from './pots/pots-overview/pots-overview.component';
import { BudgetsOverviewComponent } from './budgets/budgets-overview/budgets-overview.component';
import { TransactionsListComponent } from './transactions/transactions-list/transactions-list.component';
import { RecurringBillsOverviewComponent } from './recurring-bills/recurring-bills-overview/recurring-bills-overview.component';

export const routes: Routes = [
    { path: 'overview', component: DashboardOverviewComponent },
    { path: 'transactions', component: TransactionsListComponent },
    { path: 'budgets', component: BudgetsOverviewComponent },
    { path: 'pots', component: PotsOverviewComponent },
    { path: 'recurring-bills', component: RecurringBillsOverviewComponent }

];
