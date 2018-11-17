import * as React from "react";

import AppPageContainer from "@/components/SubPageContainer";
import LoadingPageContent from "@/components/LoadingPageContent";

const AppLoading: React.SFC = () => (
  <AppPageContainer>
    <LoadingPageContent />
  </AppPageContainer>
);
export default AppLoading;
