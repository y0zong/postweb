import { convertNxGenerator, GeneratorCallback, runTasksInSerial, Tree, } from '@nx/devkit';
import { initGenerator as jsInitGenerator } from '@nx/js';
import { DashboardGeneratorSchema } from './schema';
import { normalizeOptions } from './utils/normalize-schema';
import { reactInitGenerator } from '@nx/react';
import { updateDependencies } from './utils/update-depencies';
import { addGitIgnoreEntry } from './utils/update-gitignore';
import { createApplicationFiles } from './utils/create-app-files';
import { addProject } from './utils/app-project';

export async function dashboardGenerator(tree: Tree, schema: DashboardGeneratorSchema) {
  const tasks: GeneratorCallback[] = [];
  const options = normalizeOptions(tree, schema);

  tasks.push(await jsInitGenerator(tree, { ...options, skipFormat: true, }));

  // !todo: TEST
  // if (!schema.unitTestRunner || schema.unitTestRunner === 'jest') {
  //   const { jestInitGenerator } = ensurePackage<typeof import('@nx/jest')>(
  //     '@nx/jest',
  //     nxVersion
  //   );
  //   const jestTask = await jestInitGenerator(host, schema);
  //   tasks.push(jestTask);
  // }
  // if (!schema.e2eTestRunner || schema.e2eTestRunner === 'cypress') {
  //   const { cypressInitGenerator } = ensurePackage<
  //     typeof import('@nx/cypress')
  //   >('@nx/cypress', nxVersion);
  //   const cypressTask = await cypressInitGenerator(host, {});
  //   tasks.push(cypressTask);
  // }

  tasks.push(await reactInitGenerator(tree, { ...options, skipFormat: true, skipBabelConfig: true, }));

  if (options.management !== "nx") {
    tasks.push(updateDependencies(tree));
  }

  addGitIgnoreEntry(tree);
  createApplicationFiles(tree, options);
  addProject(tree, options);

  runTasksInSerial(...tasks)
}

// export const applicationSchematic = convertNxGenerator(dashboardGenerator);
export default dashboardGenerator
