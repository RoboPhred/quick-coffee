import * as React from "react";

import { autobind } from "core-decorators";

import { withRouter, RouteComponentProps } from "react-router";

import ListItem, { ListItemProps } from "@material-ui/core/ListItem";

export interface MenuItemProps
  extends Omit<ListItemProps, "href" | "component"> {
  to: string;
}

type Props = MenuItemProps & RouteComponentProps;
class ListItemLink extends React.Component<Props> {
  render() {
    const { children, history, to, staticContext, ...props } = this.props;
    return (
      <ListItem
        {...props}
        component="a"
        href={history.createHref({ pathname: to })}
        onClick={this._onClick}
      >
        {children}
      </ListItem>
    );
  }

  @autobind()
  private _onClick(event: React.MouseEvent<HTMLAnchorElement>) {
    // Code copied from implementation of Link in react-router-dom
    const { onClick, target, history } = this.props;

    if (onClick) {
      onClick(event);
    }

    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      (!target || target === "_self") && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();

      history.push(this.props.to);
    }
  }
}
export default withRouter(ListItemLink);

function isModifiedEvent(event: React.MouseEvent<any>) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
