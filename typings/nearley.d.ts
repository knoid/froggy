declare module "*.ne" {
  import { CompiledRules } from "nearley";

  const compiledRules: CompiledRules;
  export default compiledRules;
}
