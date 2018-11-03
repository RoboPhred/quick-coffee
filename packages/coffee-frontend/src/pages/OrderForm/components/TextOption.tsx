import * as React from "react";

import Input from "@material-ui/core/Input";

import { TextItemOption } from "@/services/inventory/types";

export interface TextOptionProps {
  className?: string;
  option: TextItemOption;
}

type Props = TextOptionProps;

const TextOption: React.SFC<Props> = ({ className, option }) => (
  <Input
    className={className}
    defaultValue={option.default}
    placeholder={option.placeholder}
  />
);
export default TextOption;
