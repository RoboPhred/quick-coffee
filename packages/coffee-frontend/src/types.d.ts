/**
 * Properties passed to a component when withStyles is used.
 */
type StyleProps<T> = { classes: { [K in keyof T]: string } };

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
