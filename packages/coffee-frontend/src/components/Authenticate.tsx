import * as React from "react";

import Dialog from "@material-ui/core/Dialog";

import Authenticator from "@/services/auth/components/Authenticator";

import LoginForm from "@/components/LoginForm";
import AppPageContainer from "@/components/AppPageContainer";
import LoadingPageContent from "@/components/LoadingPageContent";

const Authenticate: React.SFC = ({ children }) => (
  <Authenticator
    requiresLogin={({ login, isLoggingIn }) => (
      <Dialog fullScreen open>
        <AppPageContainer title="Login">
          <LoginForm onSubmit={login} disabled={isLoggingIn} />
          {isLoggingIn && <LoadingPageContent />}
        </AppPageContainer>
      </Dialog>
    )}
  >
    {children}
  </Authenticator>
);
export default Authenticate;
