import app from "./app";
import { prisma } from "./db";

async function main() {
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Running on port ${process.env.PORT || 8080}`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

module.exports = app;
