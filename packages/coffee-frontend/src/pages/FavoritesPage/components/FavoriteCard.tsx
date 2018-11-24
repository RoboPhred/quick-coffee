import * as React from "react";

import { FavoriteItem } from "coffee-types";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import ItemOrderOptions from "@/components/ItemOrderOptions";

export interface FavoriteCardProps {
  className?: string;
  favorite: FavoriteItem;
}

const FavoriteCard: React.SFC<FavoriteCardProps> = ({
  className,
  favorite
}) => (
  <Card className={className}>
    <CardContent>
      <Typography color="textSecondary">{favorite.itemName}</Typography>
      <Typography variant="h6">{favorite.favoriteName}</Typography>
      {favorite.options && (
        <ItemOrderOptions itemId={favorite.itemId} options={favorite.options} />
      )}
    </CardContent>
  </Card>
);
export default FavoriteCard;
