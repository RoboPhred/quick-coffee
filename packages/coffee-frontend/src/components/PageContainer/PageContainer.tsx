import * as React from "react";

import Container from "./components/Container";
import BackButton from "./components/BackButton";
import AppDrawerButton from "./components/AppDrawerButton";
import BottomNavigation from "./components/BottomNavigation";

export interface PageContainerProps {
  title?: string;
  variant: "app" | "subpage" | "barista";
}

type Props = PageContainerProps;
const PageContainer: React.SFC<Props> = ({ variant, title, children }) => (
  <Container
    title={title}
    leftIcon={(variant === "subpage" && <BackButton />) || <AppDrawerButton />}
    navigation={
      ((variant === "app" || variant === "barista") && (
        <BottomNavigation variant={variant} />
      )) ||
      undefined
    }
  >
    {children}
  </Container>
);
export default PageContainer;
