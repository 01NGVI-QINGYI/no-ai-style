import { fileURLToPath } from "node:url";
import { apply as applyFilesystemProvider } from "@deepseek-ai/dsh-skill-filesystem";

const skillsRoot = fileURLToPath(new URL("./skills/", import.meta.url));

export const name = "no-ai-style";
export const inject = ["skills", "agents"];

export function apply(ctx) {
  applyFilesystemProvider(ctx, {
    providerName: name,
    includeDefaultRoots: false,
    bundledSkillDir: skillsRoot,
    watch: false,
  });
}
