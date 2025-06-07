-- backend/prisma/migrations/xxxxxxxx_update_gasto_relation/migration.sql

PRAGMA foreign_keys=off;
CREATE TABLE "Gasto_new" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descripcion" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL,
    "abono" REAL,
    "gasto" REAL,
    "saldo" REAL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Gasto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "Gasto_new" ("id", "descripcion", "fecha", "abono", "gasto", "saldo", "userId") SELECT "id", "descripcion", "fecha", "abono", "gasto", "saldo", "userId" FROM "Gasto";
DROP TABLE "Gasto";
ALTER TABLE "Gasto_new" RENAME TO "Gasto";
PRAGMA foreign_keys=on;