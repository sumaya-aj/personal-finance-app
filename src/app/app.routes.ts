import { Routes } from '@angular/router';
import { DashboardOverviewComponent } from './features/dashboard/dashboard-overview/dashboard-overview.component';
import { BudgetsOverviewComponent } from './features/budgets/budgets-overview/budgets-overview.component';
import { PotsOverviewComponent } from './features/pots/components/pots-overview/pots-overview.component';
import { RecurringBillsOverviewComponent } from './features/recurring-bills/recurring-bills-overview/recurring-bills-overview.component';
import { TransactionsListComponent } from './features/transactions/components/transactions-list/transactions-list.component';

export const routes: Routes = [
    { path: 'overview', component: DashboardOverviewComponent },
    { path: 'transactions', component: TransactionsListComponent },
    { path: 'budgets', component: BudgetsOverviewComponent },
    { path: 'pots', component: PotsOverviewComponent },
    { path: 'recurring-bills', component: RecurringBillsOverviewComponent }

];
