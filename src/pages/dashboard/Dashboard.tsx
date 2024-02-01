import { DetailTools } from '../../shared/components';
import { PageBaseLayout } from '../../shared/layouts';

export const Dashboard = () => {
  return(
    <PageBaseLayout 
      tittle='Home Page'
      toolsBar={(
        <DetailTools showSaveAndExitButton/>
      )}>
        Testing
    </PageBaseLayout>
  );
};