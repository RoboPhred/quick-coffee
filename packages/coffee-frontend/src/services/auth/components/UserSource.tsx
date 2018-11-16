import * as React from "react";

import { UserTokenPayload } from "coffee-types";

import { getUserToken } from "../api";

export interface UserSourceRenderProps {
  isLoading: boolean;
  user: UserTokenPayload | null;
  errorMessage: string | null;
}
export interface UserSourceProps {
  children(props: UserSourceRenderProps): JSX.Element | null;
}

type Props = UserSourceProps;
type State = UserSourceRenderProps;
export default class UserSource extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const user = getUserToken();
    this.state = {
      isLoading: false,
      user,
      errorMessage: null
    };
  }

  render() {
    const { children } = this.props;
    return React.Children.only(children(this.state));
  }
}
