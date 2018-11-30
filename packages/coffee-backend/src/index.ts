require("source-map-support").install();

import { Container } from "microinject";

import Entrypoint from "./contracts/Entrypoint";

import containerModule from "./module";

const container = new Container();
container.load(containerModule);

const entrypoints = container.getAll(Entrypoint);
entrypoints.forEach(entrypoint => entrypoint.start());
