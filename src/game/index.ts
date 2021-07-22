import zipLoader from "../shared/zipLoader";
import movie from "./movie";
import Resources from "./Resources";

async function main() {
  const zipFile = await zipLoader();
  document.getElementById("drop-legend").remove();
  const resources = new Resources(zipFile);
  movie(resources, document.body);
}

main().catch((e) => {
  throw e;
});
