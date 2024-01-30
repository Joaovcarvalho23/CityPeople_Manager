import { ToolsBar } from '../../shared/components';
import { PageBaseLayout } from '../../shared/layouts';

export const Dashboard = () => {
  return(
    <PageBaseLayout 
      tittle='Home Page'
      toolsBar={(
        <ToolsBar />
      )}>
        Testing
    </PageBaseLayout>
  );
};