import { ListingTools } from '../../shared/components';
import { PageBaseLayout } from '../../shared/layouts';

export const Dashboard = () => {
  return(
    <PageBaseLayout 
      tittle='Home Page'
      toolsBar={(
        <ListingTools
          showSearchInput
          newButtonText='New'
        />
      )}>
        Testing
    </PageBaseLayout>
  );
};