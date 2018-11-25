import * as React from "react";
import { connect } from "react-redux";

import { autobind } from "core-decorators";

import { stringify as stringifyQuery } from "query-string";
import { mapKeys } from "lodash-es";

import { RouteComponentProps, withRouter } from "react-router";

import { FavoriteItem } from "coffee-types";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { deleteFavorite } from "@/services/favorites/actions/delete-favorite";

import ItemOrderOptions from "@/components/ItemOrderOptions";

export interface FavoriteCardProps {
  className?: string;
  favorite: FavoriteItem;
}

const mapDispatchToProps = {
  deleteFavorite
};
type DispatchProps = typeof mapDispatchToProps;

type Props = FavoriteCardProps & RouteComponentProps & DispatchProps;
class FavoriteCard extends React.Component<Props> {
  render() {
    const { className, favorite } = this.props;
    return (
      <Card className={className}>
        <CardContent>
          <Typography color="textSecondary">{favorite.itemName}</Typography>
          <Typography variant="h6">{favorite.favoriteName}</Typography>
          {favorite.options && (
            <ItemOrderOptions
              itemId={favorite.itemId}
              options={favorite.options}
            />
          )}
        </CardContent>
        <CardActions>
          <Button size="small" onClick={this._onOrder}>
            Order
          </Button>
          <Button size="small" onClick={this._onDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  }

  @autobind()
  private _onOrder() {
    const { history, favorite } = this.props;

    const options = stringifyQuery(
      mapKeys(favorite.options, (_, key) => `option-${key}`)
    );
    history.push(`/order-item/${favorite.itemId}?${options}`);
  }

  @autobind()
  private _onDelete() {
    const { favorite, deleteFavorite } = this.props;
    deleteFavorite(favorite.id);
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(FavoriteCard));
