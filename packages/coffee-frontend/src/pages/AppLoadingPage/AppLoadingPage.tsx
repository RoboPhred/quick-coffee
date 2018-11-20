import * as React from "react";

import PageContainer from "@/components/PageContainer";
import LoadingPageContent from "@/components/LoadingPageContent";

const AppLoading: React.SFC = () => (
  <PageContainer variant="subpage">
    <LoadingPageContent />
  </PageContainer>
);
export default AppLoading;
