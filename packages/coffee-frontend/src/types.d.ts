/**
 * Properties passed to a component when withStyles is used.
 */
type StyleProps<T> = { classes: { [K in keyof T]: string } };
