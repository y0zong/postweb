export interface DashboardGeneratorSchema {
  name: string;
  management: "standalone" | "nx" | "turborepo"
}
