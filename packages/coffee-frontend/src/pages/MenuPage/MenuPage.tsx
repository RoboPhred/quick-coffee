import * as React from "react";

import { createStyles, withStyles } from "@material-ui/core/styles";

import ItemListSource from "@/services/menu/components/ItemListSource";

import PageContainer from "@/components/PageContainer";
import LoadingPageContent from "@/components/LoadingPageContent";
import ErrorDisplay from "@/components/ErrorDisplay";

import Menu from "./components/Menu";

const styles = createStyles({
  menu: {
    width: "100%",
    height: "100%"
  }
});

type Props = StyleProps<typeof styles>;
const MenuPage: React.SFC<Props> = ({ classes }) => (
  <ItemListSource>
    {({ isLoading, errorMessage, items }) => (
      <PageContainer title="Menu" variant="app">
        {isLoading && <LoadingPageContent />}
        {errorMessage && <ErrorDisplay errorMessage={errorMessage} />}
        {items && <Menu className={classes.menu} items={items} />}
      </PageContainer>
    )}
  </ItemListSource>
);

export default withStyles(styles)(MenuPage);
