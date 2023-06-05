import { Tree, addDependenciesToPackageJson } from "@nx/devkit";

export function updateDependencies(host: Tree) {
    return addDependenciesToPackageJson(
        host,
        {
            '@nx/next': require("../../../../package.json").version,
            next: "13.4.4",
            react: "18.2.0",
            'react-dom': "18.2.0",
            tslib: "5.1.0",
        },
        {
            'eslint-config-next': "13.4.4",
        }
    );
}