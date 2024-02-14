import { DetailTools } from '../../shared/components';
import { PageBaseLayout } from '../../shared/layouts';

export const Dashboard = () => {
  return(
    <PageBaseLayout 
      tittle='Home Page'
      toolsBar={(
        <DetailTools showSaveAndExitButton showNewButton showLoadingSaveAndExitButton showBackButton/>
      )}>
        Testing
    </PageBaseLayout>
  );
};