import * as React from "react";

import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";

import Authenticator from "@/services/auth/components/Authenticator";

import LoginForm from "@/components/LoginForm";
import PageContainer from "@/components/PageContainer";
import LoadingPageContent from "@/components/LoadingPageContent";

export interface AuthenticateProps {
  role?: string;
}
const Authenticate: React.SFC<AuthenticateProps> = ({ role, children }) => (
  <Authenticator
    requiresLogin={({ login, isLoggingIn }) => (
      <Dialog fullScreen open>
        <PageContainer title="Login" variant="subpage">
          <LoginForm onSubmit={login} disabled={isLoggingIn} />
          {isLoggingIn && <LoadingPageContent />}
        </PageContainer>
      </Dialog>
    )}
  >
    {({ user }) => {
      if (role && user.role !== role) {
        return <Typography variant="h6">Access Denied.</Typography>;
      }
      return children;
    }}
  </Authenticator>
);
export default Authenticate;
