import { assertValidStyle } from '@nx/react/src/utils/assertion';
import {
    extractLayoutDirectory,
    getWorkspaceLayout,
    joinPathFragments,
    names,
    Tree,
    logger,
} from '@nx/devkit';
import { Linter } from '@nx/linter';
import { DashboardGeneratorSchema } from '../schema';

export interface NormalizedSchema extends DashboardGeneratorSchema {
    projectName: string;
    appProjectRoot: string;
    outputPath: string;
    //   e2eProjectName: string;
    //   e2eProjectRoot: string;
    // e2eTestRunner: string
    // parsedTags: string[];
    // fileName: string;
    //   styledModule: null | string;
    //   js?: boolean;
}

export function normalizeOptions(host: Tree, options: DashboardGeneratorSchema): NormalizedSchema {

    const name = names(options.name).fileName;
    const appsDir = getWorkspaceLayout(host).appsDir;
    // const appsDir = "apps"
    const projectName = name.replace(new RegExp('/', 'g'), '-');
    // const e2eProjectName = `${projectName}-e2e`;

    const appProjectRoot = joinPathFragments(appsDir, name);
    const outputPath = joinPathFragments('dist', appProjectRoot);

    // const parsedTags = options.tags
    //     ? options.tags.split(',').map((s) => s.trim())
    //     : [];

    // logger.warn("if any warning is need")
    
    return {
        ...options,
        appProjectRoot,
        // linter: options.linter || Linter.EsLint,
        name,
        outputPath,
        // parsedTags,
        projectName,
        // unitTestRunner: options.unitTestRunner || 'jest',
    };
}