import { join } from 'path';
import {
    generateFiles,
    joinPathFragments,
    names,
    offsetFromRoot as OffsetFromRoot,
    readJson,
    toJS,
    Tree,
    updateJson
} from '@nx/devkit';
import { getRelativePathToRootTsConfig } from '@nx/js';
import { NormalizedSchema } from './normalize-schema';

export function createApplicationFiles(host: Tree, options: NormalizedSchema) {
    const offsetFromRoot = OffsetFromRoot(options.appProjectRoot);
    const layoutTypeSrcPath = joinPathFragments(
        offsetFromRoot,
        options.appProjectRoot,
        '.next/types/**/*.ts'
    );
    const layoutTypeDistPath = joinPathFragments(
        offsetFromRoot,
        options.outputPath,
        '.next/types/**/*.ts'
    );
    const templateVariables = {
        ...names(options.name),
        ...options,
        dot: '.',
        tmpl: '',
        offsetFromRoot,
        layoutTypeSrcPath,
        layoutTypeDistPath,
        rootTsConfigPath: getRelativePathToRootTsConfig(host, options.appProjectRoot),
        stylesExt: 'css',
    };

    generateFiles(
        host,
        join(__dirname, '../files'),
        options.appProjectRoot,
        templateVariables
    );

    // RSC is not possible to unit test without extra helpers for data fetching. Leaving it to the user to figure out.
    // host.delete(
    //     joinPathFragments(
    //         options.appProjectRoot,
    //         'specs',
    //         `index.spec.${options.js ? 'jsx' : 'tsx'}`
    //     )
    // );

    updateJson(host, 'tsconfig.base.json', (json) => {
        json.compilerOptions.paths[`${options.name}/*`] = [`${options.appProjectRoot}/*`]
        return json;
    });

    host.delete(`${options.appProjectRoot}/.babelrc`);

    if (options.management === "nx") {
        host.delete(`${options.appProjectRoot}/package.json`);
    }

    // if (options.js) {
    //     host.delete(`${options.appProjectRoot}/index.d.ts`);
    //     toJS(host);
    //     host.delete(`${options.appProjectRoot}/next-env.d.js`);
    // }
}