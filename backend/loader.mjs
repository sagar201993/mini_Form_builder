// loader.mjs
import { resolve as resolveTs } from "ts-node/esm";
import * as tsConfigPaths from "tsconfig-paths";

export { resolve, load, getFormat, transformSource };

const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig();
const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths);

function resolve(specifier, context, defaultResolve) {
  const mappedSpecifier = matchPath(specifier);
  return resolveTs(mappedSpecifier || specifier, context, defaultResolve);
}

async function load(url, context, defaultLoad) {
  return defaultLoad(url, context, defaultLoad);
}

function getFormat(url, context, defaultGetFormat) {
  return defaultGetFormat(url, context, defaultGetFormat);
}

async function transformSource(source, context, defaultTransformSource) {
  return defaultTransformSource(source, context, defaultTransformSource);
}
