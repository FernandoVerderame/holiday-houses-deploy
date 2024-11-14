// Importo PrismaClient
const { PrismaClient } = require("@prisma/client");

// Inizializzo Prisma
const prisma = new PrismaClient();

// Validazione tramite slug delle foto
const validationSlug = {
    slug: {
        in: ["params"],
        custom: {
            options: async (value) => {
                const slug = await prisma.apartment.findUnique({ where: { slug: value } });

                if (!slug) throw new Error(`Non esiste un appartamento con slug: ${value}!`);

                return true;
            }

        }
    }
}

module.exports = validationSlug;