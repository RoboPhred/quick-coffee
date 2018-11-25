import * as React from "react";

import { autobind } from "core-decorators";

import { withRouter, RouteComponentProps } from "react-router";

import MenuItem, { MenuItemProps } from "@material-ui/core/MenuItem";

export interface MenuItemLinkProps
  extends Omit<MenuItemProps, "href" | "component"> {
  to: string;
}

type Props = MenuItemLinkProps & RouteComponentProps;
class MenuItemLink extends React.Component<Props> {
  render() {
    const { children, history, to, staticContext, ...props } = this.props;
    return (
      <MenuItem
        {...props}
        component="a"
        href={history.createHref({ pathname: to })}
        onClick={this._onClick}
      >
        {children}
      </MenuItem>
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
export default withRouter(MenuItemLink);

function isModifiedEvent(event: React.MouseEvent<any>) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
